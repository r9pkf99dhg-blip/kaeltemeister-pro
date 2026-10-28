import type { AcademyProgress } from "../model";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  emptyAcademy,
  validateProgress,
  ACADEMY_KEY,
  readAcademy,
} from "../progress";
import { createExam, examRemaining, finishExam, setExamAnswer } from "./engine";
import { useAcademyProgress } from "../useAcademyProgress";
import { learningItems } from "../exercises/items";
const now = new Date("2026-10-27T12:00:00Z");
beforeEach(() => localStorage.clear());
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
it("erstellt einen gemischten, niveaugefilterten Prüfungs-Snapshot", () => {
  const session = createExam(
    emptyAcademy(),
    "elektro",
    "grundlagen",
    5,
    now,
    "exam-test",
  );
  expect(
    new Set(session.snapshots.map((snapshot) => snapshot.item.kind)).size,
  ).toBe(2);
  expect(
    session.snapshots.every(
      (snapshot) =>
        snapshot.item.domainId === "elektro" &&
        snapshot.item.level === "grundlagen",
    ),
  ).toBe(true);
  expect(examRemaining(session, now)).toBe(300);
  expect(session.snapshots[0].item).not.toBe(
    learningItems.find((item) => item.id === session.snapshots[0].item.id),
  );
  expect(validateProgress({ ...emptyAcademy(), activeExam: session })).toBe(
    true,
  );
});
it("weist unbestückte Fachgebiete und unzulässige Zeitlimits zurück", () => {
  expect(() =>
    createExam(emptyAcademy(), "lueftung", "meister", 5, now),
  ).toThrow("beide Fragetypen");
  expect(() =>
    createExam(emptyAcademy(), "all", "grundlagen", 0, now),
  ).toThrow();
});
it("bewertet gemischte Antworten, erhält Ergebnis und zählt nur einmal", () => {
  const session = createExam(
    emptyAcademy(),
    "all",
    "grundlagen",
    5,
    now,
    "once",
  );
  let progress: AcademyProgress = { ...emptyAcademy(), activeExam: session };
  for (const snapshot of session.snapshots) {
    const item = snapshot.item;
    progress = setExamAnswer(
      progress,
      item.id,
      {
        value:
          item.kind === "choice"
            ? item.correctOptionId
            : String(snapshot.expectedSI),
        unit:
          item.kind === "choice"
            ? ""
            : item.quantity === "power"
              ? "W"
              : item.answerUnit,
      },
      now,
    );
  }
  const finished = finishExam(progress, new Date(now.getTime() + 1000));
  expect(finished.examHistory[0].scorePercent).toBe(100);
  expect(finished.activeExam).toBeNull();
  expect(finishExam(finished, new Date(now.getTime() + 2000))).toBe(finished);
  expect(validateProgress(finished)).toBe(true);
});
it("akzeptiert keine Antwort nach der Deadline, Nichtantworten werden keine behauptete Wissenslücke", () => {
  const progress = {
    ...emptyAcademy(),
    activeExam: createExam(emptyAcademy(), "all", "grundlagen", 5, now),
  };
  const expired = new Date(now.getTime() + 300_000);
  expect(
    setExamAnswer(
      progress,
      progress.activeExam.snapshots[0].item.id,
      { value: "x", unit: "" },
      expired,
    ),
  ).toBe(progress);
  const finished = finishExam(progress, expired);
  expect(finished.examHistory[0]).toMatchObject({
    scorePercent: 0,
    timedOut: true,
  });
  expect(
    finished.examHistory[0].results.every(
      (result) => result.grade.status === "unanswered",
    ),
  ).toBe(true);
  expect(finished.performance).toEqual({});
});
it("stellt eine laufende Prüfung wieder her und beendet sie auch außerhalb der Prüfungsansicht", () => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  const progress = {
    ...emptyAcademy(),
    activeExam: createExam(
      emptyAcademy(),
      "all",
      "grundlagen",
      5,
      now,
      "restored",
    ),
  };
  localStorage.setItem(ACADEMY_KEY, JSON.stringify(progress));
  const hook = renderHook(useAcademyProgress);
  expect(hook.result.current.progress.activeExam?.id).toBe("restored");
  act(() => vi.advanceTimersByTime(300_000));
  expect(hook.result.current.progress.activeExam).toBeNull();
  expect(hook.result.current.progress.examHistory).toHaveLength(1);
  act(() => vi.advanceTimersByTime(10_000));
  expect(hook.result.current.progress.examHistory).toHaveLength(1);
  expect(readAcademy().progress.examHistory[0].timedOut).toBe(true);
  hook.unmount();
});
it("begrenzt den Prüfungsverlauf auf 20 Ergebnisse", () => {
  let progress = emptyAcademy();
  for (let index = 0; index < 23; index++)
    progress = finishExam(
      {
        ...progress,
        activeExam: createExam(
          progress,
          "all",
          "grundlagen",
          5,
          now,
          `exam-${index}`,
        ),
      },
      now,
    );
  expect(progress.examHistory).toHaveLength(20);
  expect(progress.examHistory[0].id).toBe("exam-22");
  expect(validateProgress(progress)).toBe(true);
});

it("weist beschädigte Prüfungs-Snapshots oder widersprüchliche Ergebnisse zurück", () => {
  const session = createExam(
    emptyAcademy(),
    "all",
    "grundlagen",
    5,
    now,
    "corrupt",
  );
  const progress = { ...emptyAcademy(), activeExam: session };
  const broken = structuredClone(progress);
  broken.activeExam.deadline = "kein Datum";
  expect(validateProgress(broken)).toBe(false);
  const result = finishExam(progress, now);
  result.examHistory[0].scorePercent = 100;
  expect(validateProgress(result)).toBe(false);
});

it("übernimmt aktuelle Prüfungsantworten in die gemeinsame letzte Modulantwort", () => {
  const session = createExam(
    emptyAcademy(),
    "kaelte",
    "grundlagen",
    5,
    now,
    "shared-answer",
  );
  const item = session.snapshots.find(
    (snapshot) => snapshot.item.kind === "choice",
  )!.item;
  if (item.kind !== "choice") throw new Error("Keine Auswahlfrage");
  const progress = setExamAnswer(
    { ...emptyAcademy(), activeExam: session },
    item.id,
    { value: item.correctOptionId, unit: "" },
    now,
  );
  const finished = finishExam(progress, now);
  expect(finished.answers[item.id]).toMatchObject({
    correct: true,
    optionId: item.correctOptionId,
  });
});
it("bewertet ältere Snapshots historisch, ohne aktuelle Statistiken zu überschreiben", () => {
  const session = createExam(
    emptyAcademy(),
    "kaelte",
    "grundlagen",
    5,
    now,
    "old-revision",
  );
  const snapshot = session.snapshots.find(
    (entry) => entry.item.kind === "choice",
  )!;
  if (snapshot.item.kind !== "choice") throw new Error("Keine Auswahlfrage");
  snapshot.item.revision = 99;
  const progress = setExamAnswer(
    { ...emptyAcademy(), activeExam: session },
    snapshot.item.id,
    { value: snapshot.item.correctOptionId, unit: "" },
    now,
  );
  const finished = finishExam(progress, now);
  expect(finished.examHistory[0].correctCount).toBe(1);
  expect(finished.performance).toEqual({});
});
it("stellt den neuen Thermodynamikpfad auf jedem angebotenen Niveau mit beiden Fragetypen bereit", () => {
  for (const level of ["grundlagen", "fachkraft", "meister"] as const) {
    const exam = createExam(
      emptyAcademy(),
      "thermodynamik",
      level,
      5,
      new Date(),
      "thermo-level-" + level,
    );
    expect(exam.snapshots.some((s) => s.item.kind === "numeric")).toBe(true);
    expect(exam.snapshots.some((s) => s.item.kind === "choice")).toBe(true);
  }
});
