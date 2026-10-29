import {
  refrigerantData as data,
  refrigerationCases,
  type RefrigerationCase,
  type StatePoint,
  type PHPoint,
} from "./data";
import { caseBalance } from "./balance";
export type PropertyResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };
export interface PropertyBackend {
  readonly id: string;
  readonly mode: "reference";
  readonly freeStateQueries: false;
  readonly mixtures: false;
  case: (id: string) => PropertyResult<RefrigerationCase>;
  state: (id: string, point: number) => PropertyResult<StatePoint>;
  query: (inputs: Record<string, number>) => PropertyResult<StatePoint>;
}
const fail = <T>(message: string): PropertyResult<T> => ({
  ok: false,
  message,
});
const finite = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v);
export function validateCase(
  c: RefrigerationCase,
): PropertyResult<RefrigerationCase> {
  try {
    if (
      c.points.length !== 4 ||
      !finite(c.evaporationC) ||
      !finite(c.condensationC) ||
      !(c.evaporationC < c.condensationC) ||
      ![c.superheatK, c.subcoolingK].every((v) => finite(v) && v > 0) ||
      !(finite(c.etaIs) && c.etaIs > 0 && c.etaIs <= 1)
    )
      throw Error("Ungeeignete Betriebsbedingungen.");
    for (const p of [...c.points, c.isentropicOutlet])
      if (
        ![p.p, p.h, p.T, p.s, p.rho].every(finite) ||
        !(
          p.p > 0 &&
          p.p < data.metadata.criticalP &&
          p.T > 0 &&
          p.T < data.metadata.eosTmax &&
          p.rho > 0
        ) ||
        !(
          p.quality === null ||
          (finite(p.quality) && p.quality >= 0 && p.quality <= 1)
        )
      )
        throw Error(
          "Fehlender, nicht endlicher oder außerhalb des freigegebenen Bereichs liegender Zustand.",
        );
    const [a, b, c3, d] = c.points;
    if (
      !(b.p > a.p && Math.abs(a.p - d.p) < 0.01 && Math.abs(b.p - c3.p) < 0.01)
    )
      throw Error("Druckniveaus sind inkonsistent.");
    if (
      a.quality !== null ||
      b.quality !== null ||
      c3.quality !== null ||
      d.quality === null ||
      !(d.quality > 0 && d.quality < 1) ||
      !(a.T > c.evaporationC + 273.15 && c3.T < c.condensationC + 273.15)
    )
      throw Error(
        "Phasen passen nicht zum freigegebenen überhitzten/unterkühlten Modell.",
      );
    if (
      Math.abs(c.isentropicOutlet.s - a.s) > 0.001 ||
      Math.abs((c.isentropicOutlet.h - a.h) / (b.h - a.h) - c.etaIs) > 1e-7
    )
      throw Error("Verdichtervergleich ist nicht konsistent.");
    if (
      c.compression.some((p) => !finite(p.p) || !finite(p.h) || p.p <= 0) ||
      (c.etaIs < 1 && c.compression.length > 0)
    )
      throw Error("Nicht freigegebener Verdichtungspfad.");
    caseBalance(c);
    return { ok: true, value: c };
  } catch (e) {
    return fail(
      e instanceof Error
        ? e.message
        : "Der Referenzfall ist nicht sicher darstellbar.",
    );
  }
}
export const referenceBackend: PropertyBackend = {
  id: data.metadata.id,
  mode: "reference",
  freeStateQueries: false,
  mixtures: false,
  case(id) {
    const c = refrigerationCases.find((c) => c.id === id);
    return c
      ? validateCase(c)
      : fail(
          "Dieser Fall ist nicht im freigegebenen Katalog. Bitte einen der angebotenen Referenzfälle wählen.",
        );
  },
  state(id, point) {
    if (!Number.isInteger(point) || point < 1 || point > 4)
      return fail("Bitte einen Zustand von 1 bis 4 auswählen.");
    const c = this.case(id);
    return c.ok
      ? { ok: true, value: c.value.points[point - 1] }
      : fail(c.message);
  },
  query() {
    return fail(
      "Freie Zustandspaare und Mischungen werden in Version 0.8 nicht berechnet. Es werden ausschließlich unveränderte Referenzfälle verwendet.",
    );
  },
};
export function validateDrawing(points: readonly PHPoint[]) {
  return (
    points.length > 1 &&
    points.every(
      (p) =>
        finite(p.h) && finite(p.p) && p.p > 0 && p.p < data.metadata.criticalP,
    )
  );
}
export function referenceProof() {
  const failures = refrigerationCases
    .map((c) => referenceBackend.case(c.id))
    .filter((r) => !r.ok);
  const curves = [
    data.saturation.map((p) => ({ p: p.p, h: p.liquidH })),
    data.saturation.map((p) => ({ p: p.p, h: p.vaporH })),
    ...Object.values(data.qualityLines),
    ...data.isotherms.flatMap((i) => i.segments),
  ];
  return {
    ok: failures.length === 0 && curves.every(validateDrawing),
    cases: refrigerationCases.length,
    states: refrigerationCases.length * 4,
    failures: failures.map((r) => r.message),
  };
}
