import { beforeEach, expect, it } from "vitest";
import {
  ACADEMY_KEY,
  LEGACY_ACADEMY_KEY,
  emptyAcademy,
} from "../academy/progress";
import { STORAGE_KEY, emptyProgress } from "../logic";
import {
  createBackup,
  dataKeys,
  JOURNAL_KEY,
  MAX_BACKUP_BYTES,
  migrateV2ForBackup,
  parseBackup,
  recoverRestore,
  restoreBackup,
  type StoragePort,
} from "./backup";

beforeEach(() => localStorage.clear());
const backup = () =>
  createBackup(
    emptyAcademy(),
    { ...emptyProgress, read: [], attempts: 3, best: 75, last: 50 },
    localStorage,
  );
it("exportiert und importiert alle aktuellen Daten und die unveränderte v2-Rückfallkopie", () => {
  const v2 = {
    schemaVersion: 2,
    read: {},
    answers: {},
    reviews: {},
    legacySummary: null,
    updatedAt: null,
  };
  localStorage.setItem(LEGACY_ACADEMY_KEY, JSON.stringify(v2));
  const original = backup();
  const decoded = parseBackup(JSON.stringify(original));
  restoreBackup(decoded, localStorage);
  expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!)).toEqual(
    original.data.academy,
  );
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(
    original.data.legacy,
  );
  expect(localStorage.getItem(LEGACY_ACADEMY_KEY)).toBe(JSON.stringify(v2));
  expect(localStorage.getItem(JOURNAL_KEY)).toBeNull();
  expect(migrateV2ForBackup(v2).schemaVersion).toBe(3);
});
it.each(["{", "null", "[]", '{"format":"wrong"}'])(
  "weist kaputte/unpassende JSON-Dateien ab: %s",
  (raw) => expect(() => parseBackup(raw)).toThrow(),
);
it.each([
  (b: ReturnType<typeof backup>) => {
    b.schemaVersion = 99 as 1;
  },
  (b: ReturnType<typeof backup>) => {
    delete (b.data.academy as Partial<typeof b.data.academy>).reviews;
  },
  (b: ReturnType<typeof backup>) => {
    b.data.legacy.attempts = "3" as unknown as number;
  },
  (b: ReturnType<typeof backup>) => {
    b.data.academy.recentModules = [
      { moduleId: "a", openedAt: b.exportedAt },
      { moduleId: "a", openedAt: b.exportedAt },
    ];
  },
  (b: ReturnType<typeof backup>) => {
    b.data.academy.read.a = {
      revision: 1,
      levels: ["grundlagen", "grundlagen"],
    };
  },
])(
  "validiert Version, Pflichtfelder, Typen und Duplikate vor jeglichem Schreiben",
  (mutate) => {
    const b = backup();
    mutate(b);
    localStorage.setItem(STORAGE_KEY, "unverändert");
    expect(() => restoreBackup(b, localStorage)).toThrow();
    expect(localStorage.getItem(STORAGE_KEY)).toBe("unverändert");
  },
);
it("verwirft doppelte JSON-Schlüssel und sehr große Dateien", () => {
  expect(() =>
    parseBackup(
      JSON.stringify(backup()).replace(
        '"schemaVersion":1',
        '"schemaVersion":1,"schemaVersion":1',
      ),
    ),
  ).toThrow("Doppelter");
  expect(() => parseBackup(" ".repeat(MAX_BACKUP_BYTES + 1))).toThrow("5 MiB");
});
it("weist gefährliche Schlüssel und unbekannte Einstellungen ab", () => {
  const raw = JSON.stringify(backup()).replace(
    '"settings":{}',
    '"settings":{"__proto__":{}}',
  );
  expect(() => parseBackup(raw)).toThrow("Schlüssel");
  expect(() =>
    parseBackup(
      JSON.stringify(backup()).replace(
        '"settings":{}',
        '"settings":{"unknown":1}',
      ),
    ),
  ).toThrow("Pflichtfelder");
});
it("rollt einen Fehler mitten im Schreiben vollständig zurück", () => {
  const b = backup();
  localStorage.setItem(STORAGE_KEY, "alt-v1");
  localStorage.setItem(ACADEMY_KEY, "alt-v3");
  const before = dataKeys.map((k) => localStorage.getItem(k));
  let once = false;
  const storage: StoragePort = {
    getItem: (k) => localStorage.getItem(k),
    removeItem: (k) => localStorage.removeItem(k),
    setItem: (k, v) => {
      if (k === ACADEMY_KEY && !once) {
        once = true;
        throw new Error("Quota");
      }
      localStorage.setItem(k, v);
    },
  };
  expect(() => restoreBackup(b, storage)).toThrow("zurückgesichert");
  expect(dataKeys.map((k) => localStorage.getItem(k))).toEqual(before);
});
it("hält das Rücknahmejournal bei anhaltendem Fehler und repariert beim nächsten Start", () => {
  const b = backup();
  localStorage.setItem(STORAGE_KEY, "alt");
  localStorage.setItem(ACADEMY_KEY, "alter-v3-stand");
  const before = dataKeys.map((k) => localStorage.getItem(k));
  const storage: StoragePort = {
    getItem: (k) => localStorage.getItem(k),
    removeItem: (k) => localStorage.removeItem(k),
    setItem: (k, v) => {
      if (k === ACADEMY_KEY) throw new Error("disk");
      localStorage.setItem(k, v);
    },
  };
  expect(() => restoreBackup(b, storage)).toThrow("Schreiben ist gesperrt");
  expect(localStorage.getItem(JOURNAL_KEY)).not.toBeNull();
  expect(recoverRestore(localStorage)).toContain("zurückgenommen");
  expect(dataKeys.map((k) => localStorage.getItem(k))).toEqual(before);
});
it("überschreibt nichts, wenn das Journal selbst nicht gespeichert werden kann", () => {
  const b = backup();
  const storage: StoragePort = {
    getItem: (k) => localStorage.getItem(k),
    removeItem: (k) => localStorage.removeItem(k),
    setItem: () => {
      throw new Error("quota");
    },
  };
  expect(() => restoreBackup(b, storage)).toThrow();
  expect(localStorage.length).toBe(0);
});
it("behält bestätigte Daten bei unterbrochenem Aufräumen und blockiert beschädigtes Journal", () => {
  localStorage.setItem(STORAGE_KEY, "neu");
  localStorage.setItem(
    JOURNAL_KEY,
    JSON.stringify({ phase: "committed", previous: [null, null, null, null] }),
  );
  expect(recoverRestore(localStorage)).toContain("erfolgreich");
  expect(localStorage.getItem(STORAGE_KEY)).toBe("neu");
  localStorage.setItem(JOURNAL_KEY, "{");
  expect(() => recoverRestore(localStorage)).toThrow();
  expect(localStorage.getItem(STORAGE_KEY)).toBe("neu");
});
it("weist doppelte Prüfungs-IDs und Aufgaben innerhalb eines Ergebnisses zurück", async () => {
  const { createExam, finishExam } = await import("../academy/exams/engine");
  const b = backup();
  const now = new Date();
  const finished = finishExam(
    {
      ...b.data.academy,
      activeExam: createExam(
        b.data.academy,
        "elektro",
        "grundlagen",
        5,
        now,
        "duplicate",
      ),
    },
    now,
  );
  b.data.academy = finished;
  b.data.academy.examHistory.push(structuredClone(finished.examHistory[0]));
  expect(() => parseBackup(JSON.stringify(b))).toThrow("Doppelte");
  b.data.academy.examHistory.pop();
  const result = b.data.academy.examHistory[0];
  result.results[1] = structuredClone(result.results[0]);
  expect(() => parseBackup(JSON.stringify(b))).toThrow("Doppelte");
});
it("erhält v1-Bestände und erkennt eine echte v2-Migration ohne erfundene Zähler", () => {
  const v2 = {
    schemaVersion: 2,
    read: { "cycle-basics": { levels: ["grundlagen"], revision: 1 } },
    answers: {},
    reviews: {},
    legacySummary: { attempts: 4, best: 75, last: 50 },
    updatedAt: null,
  };
  const migrated = migrateV2ForBackup(v2);
  expect(migrated.read).toEqual(v2.read);
  expect(migrated.performance).toEqual({});
  localStorage.setItem(LEGACY_ACADEMY_KEY, JSON.stringify(v2));
  const b = createBackup(
    migrated,
    { read: ["kreislauf"], attempts: 4, best: 75, last: 50 },
    localStorage,
  );
  restoreBackup(parseBackup(JSON.stringify(b)), localStorage);
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(b.data.legacy);
  expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!)).toEqual(migrated);
});
it.each([...dataKeys, "commit-marker"])(
  "stellt bei Fehler am Schreibschritt %s den genauen vorherigen Bestand wieder her",
  (failureAt) => {
    const b = backup();
    for (const k of dataKeys) localStorage.setItem(k, `vorher:${k}`);
    const previous = dataKeys.map((k) => localStorage.getItem(k));
    let failed = false;
    const storage: StoragePort = {
      getItem: (k) => localStorage.getItem(k),
      removeItem: (k) => localStorage.removeItem(k),
      setItem: (k, value) => {
        const matches =
          failureAt === "commit-marker"
            ? k === JOURNAL_KEY && JSON.parse(value).phase === "committed"
            : k === failureAt;
        if (matches && !failed) {
          failed = true;
          throw new Error("simulierter Schreibfehler");
        }
        localStorage.setItem(k, value);
      },
    };
    // v2 ist beim Ziel null, daher tritt dort removeItem statt setItem auf.
    if (failureAt === LEGACY_ACADEMY_KEY) {
      storage.removeItem = (k) => {
        if (k === failureAt && !failed) {
          failed = true;
          throw new Error("remove failed");
        }
        localStorage.removeItem(k);
      };
    }
    expect(() => restoreBackup(b, storage)).toThrow("zurückgesichert");
    expect(dataKeys.map((k) => localStorage.getItem(k))).toEqual(previous);
    expect(localStorage.getItem(JOURNAL_KEY)).toBeNull();
  },
);
it("führt einen abgeschlossenen Import trotz fehlgeschlagenem Aufräumen beim nächsten Start fort", () => {
  const b = backup();
  const storage: StoragePort = {
    getItem: (k) => localStorage.getItem(k),
    setItem: (k, v) => localStorage.setItem(k, v),
    removeItem: (k) => {
      if (k === JOURNAL_KEY) throw new Error("cleanup");
      localStorage.removeItem(k);
    },
  };
  restoreBackup(b, storage);
  expect(JSON.parse(localStorage.getItem(JOURNAL_KEY)!).phase).toBe(
    "committed",
  );
  expect(recoverRestore(localStorage)).toContain("erfolgreich");
  expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!)).toEqual(
    b.data.academy,
  );
});
