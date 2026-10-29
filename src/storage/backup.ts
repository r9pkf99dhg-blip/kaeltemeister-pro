import { articles } from "../content";
import type { Progress } from "../logic";
import { STORAGE_KEY } from "../logic";
import type { AcademyProgress } from "../academy/model";
import {
  ACADEMY_KEY,
  LEGACY_ACADEMY_KEY,
  emptyAcademy,
  validateLegacyProgress,
  validateProgress,
} from "../academy/progress";

/** Kleiner synchroner Port: später durch einen transaktionalen IndexedDB-Adapter ersetzbar. */
export type StoragePort = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export const JOURNAL_KEY = "kaeltemeister-pro:restore-journal:v1";
export const GENERATION_KEY = "kaeltemeister-pro:storage-generation:v1";
export const MAX_BACKUP_BYTES = 5 * 1024 * 1024;
export const dataKeys = [
  STORAGE_KEY,
  LEGACY_ACADEMY_KEY,
  ACADEMY_KEY,
  GENERATION_KEY,
] as const;
export interface Backup {
  format: "kaeltemeister-pro-backup";
  schemaVersion: 1;
  appVersion: string;
  exportedAt: string;
  data: {
    academy: AcademyProgress;
    legacy: Progress;
    legacyV2: string | null;
    settings: Record<string, never>;
  };
}
export function validLegacy(value: unknown): value is Progress {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const p = value as Progress;
  const score = (n: unknown) =>
    typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 100;
  return (
    Array.isArray(p.read) &&
    p.read.every(
      (id) => typeof id === "string" && articles.some((a) => a.id === id),
    ) &&
    new Set(p.read).size === p.read.length &&
    Number.isSafeInteger(p.attempts) &&
    p.attempts >= 0 &&
    score(p.best) &&
    (p.last === null || score(p.last))
  );
}
function assertUnique(values: unknown[], label: string) {
  if (new Set(values).size !== values.length)
    throw new Error(`Doppelte Datensätze: ${label}.`);
}
function checkStructure(value: unknown, depth = 0, budget = { nodes: 0 }) {
  if (++budget.nodes > 100000 || depth > 32)
    throw new Error(
      "Die Dateistruktur ist zu groß oder zu tief verschachtelt.",
    );
  if (value && typeof value === "object")
    for (const [key, child] of Object.entries(value)) {
      if (["__proto__", "constructor", "prototype"].includes(key))
        throw new Error("Die Datei enthält nicht erlaubte Schlüssel.");
      checkStructure(child, depth + 1, budget);
    }
}
function checkDuplicates(p: AcademyProgress) {
  assertUnique(
    p.recentModules.map((e) => e.moduleId),
    "letzte Module",
  );
  assertUnique(
    p.examHistory.map((e) => e.id),
    "Prüfungen",
  );
  if (p.activeExam && p.examHistory.some((e) => e.id === p.activeExam!.id))
    throw new Error("Prüfung ist gleichzeitig aktiv und abgeschlossen.");
  for (const entry of Object.values(p.read))
    assertUnique(entry.levels, "Leseniveaus");
  const snapshots = [
    ...p.examHistory.flatMap((e) => {
      assertUnique(
        e.results.map((r) => r.snapshot.item.id),
        "Prüfungsaufgaben",
      );
      return e.results.map((r) => r.snapshot);
    }),
    ...(p.activeExam?.snapshots ?? []),
  ];
  for (const { item } of snapshots) {
    if (item.kind === "choice")
      assertUnique(
        item.options.map((o) => o.id),
        "Antwortoptionen",
      );
    else
      assertUnique(
        item.givens.map((g) => g.id),
        "gegebene Größen",
      );
  }
}
// JSON erlaubt doppelte Objektschlüssel syntaktisch; JSON.parse würde frühere Werte still verwerfen.
function rejectDuplicateKeys(raw: string) {
  const stack: (Set<string> | null)[] = [];
  const token = /"(?:\\.|[^"\\])*"|[{}\[\]]/g;
  for (const match of raw.matchAll(token)) {
    const s = match[0];
    if (s === "{") stack.push(new Set());
    else if (s === "[") stack.push(null);
    else if (s === "}" || s === "]") stack.pop();
    else {
      let next = match.index! + s.length;
      while (/\s/.test(raw[next] ?? "") && next < raw.length) next++;
      if (raw[next] !== ":") continue;
      const key: string = JSON.parse(s);
      const keys = stack.at(-1);
      if (keys?.has(key)) throw new Error(`Doppelter JSON-Schlüssel: ${key}.`);
      keys?.add(key);
    }
  }
}
export function parseBackup(raw: string): Backup {
  if (new Blob([raw]).size > MAX_BACKUP_BYTES)
    throw new Error(
      "Die Sicherung ist größer als 5 MiB. Bitte eine kleinere Sicherung verwenden.",
    );
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error("Die Datei ist kein gültiges JSON.");
  }
  rejectDuplicateKeys(raw);
  checkStructure(value);
  if (!value || typeof value !== "object")
    throw new Error("Die Sicherung ist unvollständig.");
  const b = value as Backup;
  if (b.format !== "kaeltemeister-pro-backup")
    throw new Error("Das ist keine KälteMeister-Pro-Sicherung.");
  if (b.schemaVersion !== 1)
    throw new Error(
      `Sicherungsversion ${String(b.schemaVersion)} wird nicht unterstützt. Bitte eine passende App-Version verwenden.`,
    );
  if (
    typeof b.appVersion !== "string" ||
    typeof b.exportedAt !== "string" ||
    !Number.isFinite(Date.parse(b.exportedAt)) ||
    !b.data ||
    !validateProgress(b.data.academy) ||
    !validLegacy(b.data.legacy) ||
    !b.data.settings ||
    Array.isArray(b.data.settings) ||
    typeof b.data.settings !== "object" ||
    Object.keys(b.data.settings).length > 0
  )
    throw new Error(
      "Pflichtfelder, Datentypen oder Lernstände sind ungültig. Vorhandene Daten bleiben unverändert.",
    );
  if (b.data.legacyV2 !== null) {
    if (typeof b.data.legacyV2 !== "string")
      throw new Error("Die v2-Rückfallkopie ist ungültig.");
    let previous: unknown;
    try {
      rejectDuplicateKeys(b.data.legacyV2);
      previous = JSON.parse(b.data.legacyV2);
    } catch {
      throw new Error("Die v2-Rückfallkopie ist beschädigt.");
    }
    if (!validateLegacyProgress(previous))
      throw new Error("Die v2-Rückfallkopie ist ungültig.");
  }
  checkDuplicates(b.data.academy);
  return b;
}
export function createBackup(
  academy: AcademyProgress,
  legacy: Progress,
  storage: StoragePort,
  now = new Date(),
): Backup {
  const backup: Backup = {
    format: "kaeltemeister-pro-backup",
    schemaVersion: 1,
    appVersion: "0.8.0",
    exportedAt: now.toISOString(),
    data: {
      academy,
      legacy,
      legacyV2: storage.getItem(LEGACY_ACADEMY_KEY),
      settings: {},
    },
  };
  // Export darf keine defekte Datei als wiederherstellbare Sicherung ausgeben.
  return parseBackup(JSON.stringify(backup));
}
export function migrateV2ForBackup(value: unknown): AcademyProgress {
  if (!validateLegacyProgress(value))
    throw new Error("Ungültiger v2-Lernstand.");
  return {
    ...emptyAcademy(),
    read: value.read,
    answers: value.answers,
    reviews: value.reviews,
    legacySummary: value.legacySummary,
    updatedAt: value.updatedAt,
  };
}
function applyRaw(storage: StoragePort, values: (string | null)[]) {
  dataKeys.forEach((key, index) => {
    const value = values[index];
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  });
}
export function recoverRestore(storage: StoragePort): string | null {
  const raw = storage.getItem(JOURNAL_KEY);
  if (raw === null) return null;
  const journal = JSON.parse(raw) as {
    phase: string;
    previous: (string | null)[];
  };
  if (
    !["pending", "committed"].includes(journal.phase) ||
    !Array.isArray(journal.previous) ||
    journal.previous.length !== dataKeys.length ||
    !journal.previous.every((v) => v === null || typeof v === "string")
  )
    throw new Error(
      "Wiederherstellungsjournal ist beschädigt. Schreiben bleibt gesperrt.",
    );
  if (journal.phase === "pending") applyRaw(storage, journal.previous);
  storage.removeItem(JOURNAL_KEY);
  return journal.phase === "pending"
    ? "Eine unterbrochene Wiederherstellung wurde zurückgenommen. Der vorherige Lernstand ist wiederhergestellt."
    : "Datensicherung erfolgreich wiederhergestellt.";
}
export function restoreBackup(backup: Backup, storage: StoragePort) {
  // Erneut prüfen: Vorschau ist keine Vertrauensgrenze.
  const b = parseBackup(JSON.stringify(backup));
  if (storage.getItem(JOURNAL_KEY) !== null)
    throw new Error(
      "Eine Wiederherstellung ist noch offen. Bitte zuerst die Seite neu laden.",
    );
  const previous = dataKeys.map((key) => storage.getItem(key));
  const journal = { phase: "pending", previous };
  storage.setItem(JOURNAL_KEY, JSON.stringify(journal)); // Vor jeglicher Änderung dauerhaft sichern.
  try {
    applyRaw(storage, [
      JSON.stringify(b.data.legacy),
      b.data.legacyV2,
      JSON.stringify(b.data.academy),
      crypto.randomUUID(),
    ]);
    storage.setItem(
      JOURNAL_KEY,
      JSON.stringify({ ...journal, phase: "committed" }),
    );
  } catch {
    try {
      applyRaw(storage, previous);
      storage.removeItem(JOURNAL_KEY);
    } catch {
      throw new Error(
        "Wiederherstellung und Rücknahme konnten nicht abgeschlossen werden. Schreiben ist gesperrt. Bitte Speicherplatz freigeben und die Seite neu laden; das Journal bewahrt den vorherigen Stand.",
      );
    }
    throw new Error(
      "Wiederherstellung fehlgeschlagen. Alle vorherigen Daten wurden zurückgesichert.",
    );
  }
  // Nach Commit ist ein Fehler beim Aufräumen kein fehlgeschlagener Import.
  try {
    storage.removeItem(JOURNAL_KEY);
  } catch {
    /* Wiederanlauf entfernt das bereits bestätigte Journal. */
  }
}
