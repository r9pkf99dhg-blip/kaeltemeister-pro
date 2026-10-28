import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeEach, expect, it } from "vitest";
import { parseBackup, createBackup, restoreBackup } from "./backup";
import {
  emptyAcademy,
  ACADEMY_KEY,
  validateProgress,
} from "../academy/progress";
import { STORAGE_KEY } from "../logic";
import { createExam, finishExam, setExamAnswer } from "../academy/exams/engine";
import { snapshotItem } from "../academy/exercises/engine";
import { numericTasks } from "../academy/exercises/data";
const oldRaw = readFileSync(
  resolve("src/storage/fixtures/v04-backup.json"),
  "utf8",
);
beforeEach(() => localStorage.clear());
it("importiert eine mit dem echten main-Stand 0.4 erzeugte vollständige Sicherung unverändert", () => {
  const b = parseBackup(oldRaw);
  expect(b.appVersion).toBe("0.4.0");
  expect(
    b.data.academy.examHistory[0].results.some(
      (r) =>
        r.snapshot.item.kind === "numeric" &&
        r.snapshot.item.texSteps !== undefined,
    ),
  ).toBe(false);
  restoreBackup(b, localStorage);
  expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!)).toEqual(
    b.data.academy,
  );
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(b.data.legacy);
  const again = parseBackup(
    JSON.stringify(createBackup(b.data.academy, b.data.legacy, localStorage)),
  );
  expect(again.data).toEqual(b.data);
});
it("erhält neue negative Mathematik-Snapshots und Kompetenzverweise über Backup und Restore", () => {
  const p = emptyAcademy();
  const now = new Date();
  const session = createExam(
    p,
    "mathematik",
    "grundlagen",
    5,
    now,
    "new-math-backup",
  );
  const task = numericTasks.find((t) => t.id === "math-fraction-sub-a")!;
  const slot = session.snapshots.findIndex((s) => s.item.kind === "numeric");
  session.snapshots[slot] = snapshotItem(task);
  let active = { ...p, activeExam: session };
  active = setExamAnswer(
    active,
    task.id,
    { value: "-1/2", unit: "1" },
    now,
  ) as typeof active;
  const completed = finishExam(active, now);
  expect(validateProgress(completed)).toBe(true);
  const b = createBackup(
    completed,
    { read: [], attempts: 0, best: 0, last: null },
    localStorage,
  );
  restoreBackup(parseBackup(JSON.stringify(b)), localStorage);
  const restored = JSON.parse(localStorage.getItem(ACADEMY_KEY)!);
  const result = restored.examHistory[0].results.find(
    (r: { snapshot: { item: { id: string } } }) =>
      r.snapshot.item.id === task.id,
  );
  expect(result.grade.correct).toBe(true);
  expect(result.snapshot.expectedSI).toBe(-0.5);
  expect(result.snapshot.item.requiredCompetencyIds).toContain(
    "competency-fractions",
  );
});
it("weist ungültige neue optionale Snapshot-Felder vor jeder Wiederherstellung ab", () => {
  const b = JSON.parse(oldRaw);
  const numeric = b.data.academy.examHistory[0].results.find(
    (r: { snapshot: { item: { kind: string } } }) =>
      r.snapshot.item.kind === "numeric",
  );
  numeric.snapshot.item.texSteps = [{ bad: true }];
  expect(() => parseBackup(JSON.stringify(b))).toThrow();
  delete numeric.snapshot.item.texSteps;
  numeric.snapshot.item.requiredCompetencyIds = [3];
  expect(() => parseBackup(JSON.stringify(b))).toThrow();
  expect(localStorage.length).toBe(0);
});
it("erhält einen neuen Aufgabenentwurf über Backup und weist beschädigte Entwürfe zurück", () => {
  const p = emptyAcademy();
  p.exerciseDraft = {
    taskId: "calc-heat-water",
    revision: 1,
    answer: { value: "1", unit: "kW" },
    bridgeLessonId: "math-units",
    checked: true,
    updatedAt: new Date().toISOString(),
  };
  const b = createBackup(
    p,
    { read: [], attempts: 0, best: 0, last: null },
    localStorage,
  );
  expect(parseBackup(JSON.stringify(b)).data.academy.exerciseDraft).toEqual(
    p.exerciseDraft,
  );
  const broken = structuredClone(b);
  (
    broken.data.academy.exerciseDraft as unknown as { checked: unknown }
  ).checked = "yes";
  expect(() => parseBackup(JSON.stringify(broken))).toThrow();
  expect(
    validateProgress({
      ...p,
      exerciseDraft: {
        ...p.exerciseDraft,
        answer: { value: "x".repeat(201), unit: "kW" },
      },
    }),
  ).toBe(false);
});
it("importiert die echte 0.5-Sicherung inklusive Karten, Kompetenzversuchen und laufender Prüfung ohne Änderung", () => {
  const raw = readFileSync(
    resolve("src/storage/fixtures/v05-backup.json"),
    "utf8",
  );
  const b = parseBackup(raw);
  expect(b.appVersion).toBe("0.5.0");
  expect(b.data.academy.activeExam?.id).toBe("v05-historical-active");
  expect(b.data.academy.examHistory).toHaveLength(1);
  expect(Object.keys(b.data.academy.reviews)).toHaveLength(1);
  restoreBackup(b, localStorage);
  expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!)).toEqual(
    b.data.academy,
  );
  expect(
    parseBackup(
      JSON.stringify(createBackup(b.data.academy, b.data.legacy, localStorage)),
    ).data,
  ).toEqual(b.data);
});
it("importiert die echte 0.6-Sicherung mit Lernbrückenentwurf und allen historischen Prüfungs-/Kartendaten unverändert", () => {
  const raw = readFileSync(
    resolve("src/storage/fixtures/v06-backup.json"),
    "utf8",
  );
  const backup = parseBackup(raw);
  expect(backup.appVersion).toBe("0.6.0");
  expect(backup.data.academy.activeExam?.id).toBe("v06-historical-active");
  expect(backup.data.academy.exerciseDraft).toMatchObject({
    taskId: "ac-three-a",
    answer: { value: "3200", unit: "W" },
    bridgeLessonId: "electric-three-phase",
    checked: true,
  });
  expect(backup.data.academy.examHistory).toHaveLength(1);
  expect(Object.keys(backup.data.academy.reviews)).toHaveLength(1);
  expect(backup.data.academy.preferences).toBeUndefined();
  restoreBackup(backup, localStorage);
  expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!)).toEqual(
    backup.data.academy,
  );
  expect(
    parseBackup(
      JSON.stringify(
        createBackup(backup.data.academy, backup.data.legacy, localStorage),
      ),
    ).data,
  ).toEqual(backup.data);
});
