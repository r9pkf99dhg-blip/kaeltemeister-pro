import { calculateTechnical } from "./technical/calculations";
import { articles } from "./content";

const articleIds = new Set(articles.map((article) => article.id));

export type Progress = {
  read: string[];
  attempts: number;
  best: number;
  last: number | null;
};
export const emptyProgress: Progress = {
  read: [],
  attempts: 0,
  best: 0,
  last: null,
};
export const STORAGE_KEY = "kaeltemeister-pro:progress:v1";
function decodeProgress(raw: string | null): Progress {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object")
      return { ...emptyProgress, read: [] };
    const p = value as Partial<Progress>;
    return {
      read: Array.isArray(p.read)
        ? [
            ...new Set(
              p.read.filter(
                (id): id is string =>
                  typeof id === "string" && articleIds.has(id),
              ),
            ),
          ]
        : [],
      attempts:
        typeof p.attempts === "number" &&
        Number.isSafeInteger(p.attempts) &&
        p.attempts >= 0
          ? p.attempts
          : 0,
      best:
        typeof p.best === "number" && Number.isFinite(p.best)
          ? Math.round(Math.max(0, Math.min(100, p.best)))
          : 0,
      last:
        typeof p.last === "number" && Number.isFinite(p.last)
          ? Math.round(Math.max(0, Math.min(100, p.last)))
          : null,
    };
  } catch {
    return { ...emptyProgress, read: [] };
  }
}
/** Ein Lesefehler ist etwas anderes als ein leerer/ungültiger Datensatz. */
export function readProgress(): { progress: Progress; readFailed: boolean } {
  try {
    return {
      progress: decodeProgress(localStorage.getItem(STORAGE_KEY)),
      readFailed: false,
    };
  } catch {
    return { progress: { ...emptyProgress, read: [] }, readFailed: true };
  }
}

export function loadProgress(): Progress {
  return readProgress().progress;
}

export function parseDecimal(value: string): number {
  const normalized = value.trim().replace(",", ".");
  return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)
    ? Number(normalized)
    : NaN;
}
export function calculateHeat(
  mass: number,
  cp: number,
  delta: number,
  massUnit: string,
  cpUnit: string,
) {
  if (
    ![mass, cp, delta].every(Number.isFinite) ||
    mass < 0 ||
    cp <= 0 ||
    delta < 0
  )
    throw new Error(
      "Bitte gib gültige Werte ein: Massenstrom und Temperaturdifferenz mindestens 0, Wärmekapazität größer als 0.",
    );
  if (
    !["kg/s", "kg/h"].includes(massUnit) ||
    !["kJ/(kg·K)", "J/(kg·K)"].includes(cpUnit)
  ) {
    throw new Error(
      "Bitte wähle unterstützte Einheiten für Massenstrom und Wärmekapazität.",
    );
  }
  const massKgS = massUnit === "kg/h" ? mass / 3600 : mass;
  const cpKj = cpUnit === "J/(kg·K)" ? cp / 1000 : cp;
  let kw: number;
  try {
    kw =
      calculateTechnical("heat", {
        massFlow: massKgS,
        cp: cpKj * 1000,
        deltaT: delta,
      }) / 1000;
  } catch {
    throw new Error(
      "Die Werte sind zu groß. Bitte prüfe deine Eingaben und Einheiten.",
    );
  }
  if (!Number.isFinite(kw) || !Number.isFinite(kw * 1000))
    throw new Error(
      "Die Werte sind zu groß. Bitte prüfe deine Eingaben und Einheiten.",
    );
  return { massKgS, cpKj, kw };
}
export const format = (value: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 6 }).format(value);
