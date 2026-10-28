/** Stationary fluid-cycle balance; arbitrary enthalpies do not establish real phase validity. */
export const refrigerationKinds = [
  "refrigeration-q0",
  "refrigeration-w",
  "refrigeration-qk",
  "refrigeration-cop",
  "refrigeration-q0-power",
  "refrigeration-w-power",
  "refrigeration-qk-power",
] as const;
export type RefrigerationKind = (typeof refrigerationKinds)[number];
export function cycleBalance(v: Record<string, number>) {
  for (const key of ["h1", "h2", "h3", "h4"])
    if (!Number.isFinite(v[key]))
      throw new Error(
        "Vier endliche spezifische Enthalpien derselben Referenz benötigt.",
      );
  const q0 = v.h1 - v.h4,
    w = v.h2 - v.h1,
    qk = v.h2 - v.h3;
  const scale = Math.max(1, ...[v.h1, v.h2, v.h3, v.h4].map(Math.abs));
  if (Math.abs(v.h3 - v.h4) > Math.max(1e-7, Number.EPSILON * scale * 16))
    throw new Error("Das gewählte Drosselmodell verlangt h4 = h3.");
  if (!(q0 > 0 && w > 0 && qk > 0))
    throw new Error(
      "Das gewählte Kältemodell benötigt positive Kältezufuhr und Verdichterarbeit.",
    );
  const cop = q0 / w;
  if (
    ![q0, w, qk, cop].every(Number.isFinite) ||
    Math.abs(qk - q0 - w) > Math.max(1e-7, Number.EPSILON * scale * 32)
  )
    throw new Error("Keine endliche konsistente Energiebilanz.");
  return { q0, w, qk, cop, residual: qk - q0 - w };
}
export function calculateRefrigeration(
  kind: RefrigerationKind,
  v: Record<string, number>,
) {
  const b = cycleBalance(v);
  const key = kind.replace("refrigeration-", "").replace("-power", "") as
    | "q0"
    | "w"
    | "qk"
    | "cop";
  let result = b[key];
  if (kind.endsWith("-power")) {
    if (!Number.isFinite(v.massFlow) || v.massFlow < 0)
      throw new Error("Endlicher nicht negativer Massenstrom nötig.");
    result *= v.massFlow;
    if (result === 0 && v.massFlow !== 0)
      throw new Error("Numerischer Unterlauf.");
  }
  if (!Number.isFinite(result)) throw new Error("Nicht endliches Ergebnis.");
  return result;
}
