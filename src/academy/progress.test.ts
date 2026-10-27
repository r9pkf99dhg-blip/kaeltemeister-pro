import { beforeEach, describe, expect, it, vi } from "vitest";
import { academyQuestions, flashcards, modules } from "./catalog";
import {
  ACADEMY_KEY,
  answerQuestion,
  dueCards,
  emptyAcademy,
  markRead,
  moduleRead,
  needsPractice,
  normalizeSearch,
  readAcademy,
  reviewCard,
  validateProgress,
} from "./progress";
import { STORAGE_KEY } from "../logic";

const now = new Date("2026-10-27T12:00:00.000Z");
beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("Migration ohne Verlust der v1-Daten", () => {
  it("beginnt mit leerem Akademie-Fortschritt", () => {
    const result = readAcademy();
    expect(result.blocked).toBe(false);
    expect(result.progress.read).toEqual({});
    expect(result.progress.answers).toEqual({});
  });
  it("übernimmt nur belegte Grundlagenabschlüsse und erhält aggregierte Quizwerte", () => {
    const original = JSON.stringify({
      read: ["kreislauf", "ueberhitzung", "unterkuehlung"],
      attempts: 3,
      best: 92,
      last: 50,
    });
    localStorage.setItem(STORAGE_KEY, original);
    const { progress } = readAcademy();
    expect(moduleRead(progress, "cycle-basics", "grundlagen")).toBe(true);
    expect(moduleRead(progress, "superheat-subcooling", "grundlagen")).toBe(
      true,
    );
    expect(moduleRead(progress, "cycle-basics", "meister")).toBe(false);
    expect(progress.legacySummary).toEqual({ attempts: 3, best: 92, last: 50 });
    expect(progress.answers).toEqual({});
    expect(localStorage.getItem(STORAGE_KEY)).toBe(original);
    expect(localStorage.getItem(ACADEMY_KEY)).toBeNull(); // Loader schreibt nie selbst.
  });
  it("wertet einen einzelnen alten Temperaturartikel nicht als das ganze kombinierte Modul", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ read: ["ueberhitzung"] }),
    );
    expect(readAcademy().progress.read).toEqual({});
  });
  it("bevorzugt vorhandenes v3 und migriert nicht erneut aus v1", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ read: ["kreislauf"] }));
    localStorage.setItem(ACADEMY_KEY, JSON.stringify(emptyAcademy()));
    expect(readAcademy().progress.read).toEqual({});
  });
  it.each([
    "{",
    "null",
    "[]",
    '{"schemaVersion":99}',
    JSON.stringify({ ...emptyAcademy(), answers: { bad: { correct: true } } }),
  ])("erhält unlesbare/unbekannte aktuelle Daten: %s", (raw) => {
    localStorage.setItem(ACADEMY_KEY, raw);
    expect(readAcademy().blocked).toBe(true);
    expect(localStorage.getItem(ACADEMY_KEY)).toBe(raw);
  });
  it("überschreibt bei blockiertem Lesen nichts", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const write = vi.spyOn(Storage.prototype, "setItem");
    expect(readAcademy().blocked).toBe(true);
    expect(write).not.toHaveBeenCalled();
  });
});

describe("Lesefortschritt und Antwortspeicherung", () => {
  it("speichert Abschluss pro Niveau und dupliziert ihn nicht", () => {
    let progress = markRead(emptyAcademy(), modules[0].id, "grundlagen", now);
    progress = markRead(progress, modules[0].id, "grundlagen", now);
    expect(progress.read[modules[0].id].levels).toEqual(["grundlagen"]);
    expect(moduleRead(progress, modules[0].id, "fachkraft")).toBe(false);
    expect(progress.updatedAt).toBe(now.toISOString());
    expect(validateProgress(progress)).toBe(true);
  });
  it("beachtet eine geänderte Modulrevision", () => {
    const progress = {
      ...emptyAcademy(),
      read: {
        [modules[0].id]: { revision: 99, levels: ["grundlagen" as const] },
      },
    };
    expect(moduleRead(progress, modules[0].id, "grundlagen")).toBe(false);
    expect(
      markRead(progress, modules[0].id, "meister", now).read[modules[0].id]
        .levels,
    ).toEqual(["meister"]);
  });
  it("ignoriert unbekannte Module, Fragen und Antwort-IDs", () => {
    const progress = emptyAcademy();
    expect(markRead(progress, "unknown", "grundlagen")).toBe(progress);
    expect(answerQuestion(progress, "unknown", "x")).toBe(progress);
    expect(answerQuestion(progress, academyQuestions[0].id, "unknown")).toBe(
      progress,
    );
  });
  it("erhält nach Korrektur die nachvollziehbare Empfehlung bei niedriger Trefferquote", () => {
    const question = academyQuestions[0];
    const wrong = question.options.find(
      (option) => option.id !== question.correctOptionId,
    )!;
    let progress = answerQuestion(emptyAcademy(), question.id, wrong.id, now);
    expect(needsPractice(progress, question.moduleId)).toBe(true);
    expect(progress.answers[question.id]).toMatchObject({
      optionId: wrong.id,
      correct: false,
      answeredAt: now.toISOString(),
    });
    progress = answerQuestion(
      progress,
      question.id,
      question.correctOptionId,
      now,
    );
    expect(needsPractice(progress, question.moduleId)).toBe(true);
    expect(progress.performance[question.id]).toMatchObject({
      attempts: 2,
      correctCount: 1,
      lastCorrect: true,
    });
    expect(Object.keys(progress.answers)).toHaveLength(1);
    expect(validateProgress(progress)).toBe(true);
  });
});

describe("Einfache Spaced Repetition", () => {
  it("stellt neue Karten sofort zur Wiederholung bereit", () =>
    expect(dueCards(emptyAcademy(), now)).toHaveLength(flashcards.length));
  it("plant nach 1, 3, 7, 14 und maximal 30 Tagen", () => {
    let progress = emptyAcademy();
    for (const days of [1, 3, 7, 14, 30, 30]) {
      progress = reviewCard(progress, flashcards[0].id, true, now);
      expect(progress.reviews[flashcards[0].id].intervalDays).toBe(days);
      expect(
        Date.parse(progress.reviews[flashcards[0].id].dueAt) - now.getTime(),
      ).toBe(days * 86_400_000);
    }
    expect(validateProgress(progress)).toBe(true);
  });
  it("eine gewusste Karte ist bis exakt zum Termin nicht fällig", () => {
    const progress = reviewCard(emptyAcademy(), flashcards[0].id, true, now);
    expect(
      dueCards(progress, new Date(now.getTime() + 86_400_000 - 1)),
    ).not.toContainEqual(flashcards[0]);
    expect(
      dueCards(progress, new Date(now.getTime() + 86_400_000)),
    ).toContainEqual(flashcards[0]);
  });
  it("setzt eine vergessene Karte auf heute zurück", () => {
    let progress = reviewCard(emptyAcademy(), flashcards[0].id, true, now);
    progress = reviewCard(progress, flashcards[0].id, false, now);
    expect(progress.reviews[flashcards[0].id]).toMatchObject({
      repetitions: 0,
      intervalDays: 0,
      dueAt: now.toISOString(),
    });
    expect(dueCards(progress, now)).toContainEqual(flashcards[0]);
  });
  it("filtert Karten nach Modul und ignoriert unbekannte Karten", () => {
    expect(
      dueCards(emptyAcademy(), now, modules[0].id).every(
        (card) => card.moduleId === modules[0].id,
      ),
    ).toBe(true);
    const progress = emptyAcademy();
    expect(reviewCard(progress, "unknown", true, now)).toBe(progress);
  });
  it("setzt bei neuen Kartenrevisionen die Lernserie zurück", () => {
    const progress = reviewCard(emptyAcademy(), flashcards[0].id, true, now);
    progress.reviews[flashcards[0].id].cardRevision = 99;
    expect(dueCards(progress, now)).toContainEqual(flashcards[0]);
    expect(
      reviewCard(progress, flashcards[0].id, true, now).reviews[
        flashcards[0].id
      ].intervalDays,
    ).toBe(1);
  });
});

it("findet deutsche Fachbegriffe auch mit ae/oe/ue und Großschreibung", () => {
  expect(normalizeSearch(" ÜBERHITZUNG ")).toBe("ueberhitzung");
  expect(normalizeSearch("Kälte")).toBe(normalizeSearch("Kaelte"));
});

it("weist widersprüchliche aktuelle Antworten zurück, statt falsche Lernstatistik zu zeigen", () => {
  const question = academyQuestions[0];
  const progress = answerQuestion(
    emptyAcademy(),
    question.id,
    question.correctOptionId,
    now,
  );
  progress.answers[question.id].correct = false;
  expect(validateProgress(progress)).toBe(false);
});
