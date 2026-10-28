import { beforeEach, expect, it } from "vitest";
import { academyQuestions, flashcards } from "../catalog";
import {
  emptyAcademy,
  answerQuestion,
  reviewCard,
  readAcademy,
  ACADEMY_KEY,
  LEGACY_ACADEMY_KEY,
  validateProgress,
} from "../progress";
import {
  recordOutcome,
  recommendations,
  topicStatistics,
  visitModule,
} from "./algorithm";
import { learningItems } from "../exercises/items";
const now = new Date("2026-10-27T12:00:00Z");
beforeEach(() => localStorage.clear());
it("erfasst falsch/richtig, wahrt Zähler und begründet Empfehlungen", () => {
  const item = learningItems[0];
  let progress = recordOutcome(emptyAcademy(), item, false, now);
  expect(progress.performance[item.id]).toMatchObject({
    attempts: 1,
    correctCount: 0,
    streak: 0,
    intervalDays: 0,
  });
  expect(
    recommendations(progress, now).find((topic) => topic.id === item.topicId)
      ?.reason,
  ).toContain("letzte Antwort war falsch");
  progress = recordOutcome(progress, item, true, now);
  expect(topicStatistics(progress, item.topicId)).toMatchObject({
    attempts: 2,
    correct: 1,
    lastWrong: false,
    weak: true,
  });
  expect(
    recommendations(progress, now).find((topic) => topic.id === item.topicId)
      ?.reason,
  ).toContain("1 von 2");
  expect(validateProgress(progress)).toBe(true);
});
it("plant schwierigere Themen häufiger und verlängert sichere Serien", () => {
  const item = learningItems[0];
  let progress = emptyAcademy();
  for (const days of [1, 3, 7, 14, 30, 30]) {
    progress = recordOutcome(progress, item, true, now);
    expect(progress.performance[item.id].intervalDays).toBe(days);
  }
  progress = recordOutcome(progress, item, false, now);
  expect(progress.performance[item.id].intervalDays).toBe(0);
  progress = recordOutcome(progress, item, true, now);
  expect(progress.performance[item.id].intervalDays).toBe(1);
});
it("benutzt Karten-Selbsteinschätzung nicht als objektiven Kompetenznachweis", () => {
  const progress = reviewCard(emptyAcademy(), flashcards[0].id, true, now);
  expect(topicStatistics(progress, flashcards[0].moduleId).attempts).toBe(0);
  expect(
    recommendations(progress, now).find(
      (topic) => topic.id === flashcards[0].moduleId,
    )?.reason,
  ).toContain("Noch keine bewerteten Antworten");
});
it("erkennt zeitliche Fälligkeit unabhängig von einer falschen letzten Antwort", () => {
  const item = learningItems[0];
  const progress = recordOutcome(emptyAcademy(), item, true, now);
  expect(
    recommendations(progress, new Date(now.getTime() + 86_400_000)).find(
      (topic) => topic.id === item.topicId,
    )?.reason,
  ).toContain("zeitlich");
});
it("begrenzte zuletzt besuchte Module sind eindeutig und sortiert", () => {
  let progress = visitModule(emptyAcademy(), "cycle-basics", now);
  progress = visitModule(progress, "evaporation", now);
  progress = visitModule(progress, "cycle-basics", now);
  expect(progress.recentModules.map((entry) => entry.moduleId)).toEqual([
    "cycle-basics",
    "evaporation",
  ]);
  expect(visitModule(progress, "unknown", now)).toBe(progress);
});
it("übernimmt v2 verlustfrei, ohne unbekannte Versuchszahlen zu erfinden", () => {
  const base = emptyAcademy();
  const v2 = {
    schemaVersion: 2,
    read: { "cycle-basics": { revision: 1, levels: ["grundlagen"] } },
    answers: {
      [academyQuestions[0].id]: {
        optionId: academyQuestions[0].correctOptionId,
        correct: true,
        questionRevision: 1,
        answeredAt: now.toISOString(),
      },
    },
    reviews: {
      [flashcards[0].id]: {
        cardRevision: 1,
        dueAt: now.toISOString(),
        intervalDays: 3,
        repetitions: 2,
        lastReviewedAt: now.toISOString(),
      },
    },
    legacySummary: base.legacySummary,
    updatedAt: now.toISOString(),
  };
  const original = JSON.stringify(v2);
  localStorage.setItem(LEGACY_ACADEMY_KEY, original);
  const loaded = readAcademy();
  expect(loaded.blocked).toBe(false);
  expect(loaded.progress.schemaVersion).toBe(3);
  expect(loaded.progress.answers).toEqual(v2.answers);
  expect(loaded.progress.reviews).toEqual(v2.reviews);
  expect(loaded.progress.read).toEqual(v2.read);
  expect(loaded.progress.performance).toEqual({});
  expect(localStorage.getItem(LEGACY_ACADEMY_KEY)).toBe(original);
  expect(localStorage.getItem(ACADEMY_KEY)).toBeNull();
  expect(
    reviewCard(loaded.progress, flashcards[0].id, true, now).reviews[
      flashcards[0].id
    ].intervalDays,
  ).toBe(7);
});
it("erhält unbekannte oder beschädigte v2-Daten ebenfalls", () => {
  const raw = '{"schemaVersion":99}';
  localStorage.setItem(LEGACY_ACADEMY_KEY, raw);
  expect(readAcademy().blocked).toBe(true);
  expect(localStorage.getItem(LEGACY_ACADEMY_KEY)).toBe(raw);
});
it("behält beim Laden falscher Altantworten den Übungsbedarf, aber keinen erfundenen Zähler", () => {
  const question = academyQuestions[0];
  const progress = emptyAcademy();
  progress.answers[question.id] = {
    optionId: question.options.find(
      (option) => option.id !== question.correctOptionId,
    )!.id,
    correct: false,
    questionRevision: 1,
    answeredAt: now.toISOString(),
  };
  expect(topicStatistics(progress, question.moduleId)).toMatchObject({
    attempts: 0,
    lastWrong: true,
  });
  const corrected = answerQuestion(
    progress,
    question.id,
    question.correctOptionId,
    now,
  );
  expect(topicStatistics(corrected, question.moduleId)).toMatchObject({
    attempts: 1,
    correct: 1,
    lastWrong: false,
  });
});

it("wiederholt Karten bei objektiven Wissenslücken höchstens nach drei Tagen", () => {
  const item = learningItems.find(
    (item) => item.topicId === flashcards[0].moduleId,
  )!;
  let progress = emptyAcademy();
  for (let i = 0; i < 8; i++)
    progress = recordOutcome(progress, item, false, now);
  for (let i = 0; i < 6; i++)
    progress = reviewCard(progress, flashcards[0].id, true, now);
  expect(progress.reviews[flashcards[0].id].intervalDays).toBe(3);
});
it("übernimmt unbekannte Zusatzfelder aus einem v2-Datensatz nicht als neue v3-Funktionen", () => {
  const legacy = {
    schemaVersion: 2,
    read: {},
    answers: {},
    reviews: {},
    legacySummary: null,
    updatedAt: null,
    performance: "unbekannt",
    activeExam: { not: "valid" },
  };
  const raw = JSON.stringify(legacy);
  localStorage.setItem(LEGACY_ACADEMY_KEY, raw);
  const result = readAcademy();
  expect(result.blocked).toBe(false);
  expect(result.progress.performance).toEqual({});
  expect(result.progress.activeExam).toBeNull();
  expect(localStorage.getItem(LEGACY_ACADEMY_KEY)).toBe(raw);
});

it("empfiehlt neuen Lernenden zuerst Grundlagen, ohne nachgewiesene Fehler zu verdrängen", () => {
  const fresh = emptyAcademy();
  expect(recommendations(fresh, now)[0].id).toBe("math-arithmetic");
  const wrong = recordOutcome(
    fresh,
    {
      id: "calc-heat-water",
      topicId: "cycle-basics",
      revision: 1,
      kind: "numeric",
    },
    false,
    now,
  );
  expect(recommendations(wrong, now)[0].id).toBe("cycle-basics");
});
