import {
  academyQuestions,
  flashcards,
  modules,
  legacyBridges,
} from "./catalog";
import { levels, type AcademyProgress, type Level } from "./model";
import { readProgress } from "../logic";

export const ACADEMY_KEY = "kaeltemeister-pro:progress:v2";
export const emptyAcademy = (): AcademyProgress => ({
  schemaVersion: 2,
  read: {},
  answers: {},
  reviews: {},
  legacySummary: null,
  updatedAt: null,
});
const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
const isDate = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
const integer = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

/** Fehlerhafte oder unbekannte v2-Daten bleiben unverändert: niemals automatisch löschen. */
export function validateProgress(value: unknown): value is AcademyProgress {
  if (
    !isRecord(value) ||
    value.schemaVersion !== 2 ||
    !isRecord(value.read) ||
    !isRecord(value.answers) ||
    !isRecord(value.reviews) ||
    !(value.updatedAt === null || isDate(value.updatedAt))
  )
    return false;
  for (const entry of Object.values(value.read)) {
    if (
      !isRecord(entry) ||
      !integer(entry.revision) ||
      entry.revision < 1 ||
      !Array.isArray(entry.levels) ||
      !entry.levels.every((level) => levels.includes(level as Level))
    )
      return false;
  }
  for (const [questionId, entry] of Object.entries(value.answers)) {
    if (
      !isRecord(entry) ||
      typeof entry.optionId !== "string" ||
      typeof entry.correct !== "boolean" ||
      !integer(entry.questionRevision) ||
      entry.questionRevision < 1 ||
      !isDate(entry.answeredAt)
    )
      return false;
    const currentQuestion = academyQuestions.find(
      (question) => question.id === questionId,
    );
    if (
      currentQuestion &&
      entry.questionRevision === currentQuestion.revision &&
      (!currentQuestion.options.some(
        (option) => option.id === entry.optionId,
      ) ||
        entry.correct !== (entry.optionId === currentQuestion.correctOptionId))
    )
      return false;
  }
  for (const entry of Object.values(value.reviews)) {
    if (
      !isRecord(entry) ||
      !integer(entry.cardRevision) ||
      entry.cardRevision < 1 ||
      !isDate(entry.dueAt) ||
      !isDate(entry.lastReviewedAt) ||
      !integer(entry.intervalDays) ||
      !integer(entry.repetitions)
    )
      return false;
  }
  const legacy = value.legacySummary;
  if (
    legacy !== null &&
    (!isRecord(legacy) ||
      !integer(legacy.attempts) ||
      typeof legacy.best !== "number" ||
      !Number.isFinite(legacy.best) ||
      legacy.best < 0 ||
      legacy.best > 100 ||
      !(
        legacy.last === null ||
        (typeof legacy.last === "number" &&
          Number.isFinite(legacy.last) &&
          legacy.last >= 0 &&
          legacy.last <= 100)
      ))
  )
    return false;
  return true;
}
export function readAcademy(): {
  progress: AcademyProgress;
  blocked: boolean;
  message: string | null;
} {
  try {
    const raw = localStorage.getItem(ACADEMY_KEY);
    if (raw !== null) {
      const value: unknown = JSON.parse(raw);
      if (!validateProgress(value)) throw new Error("unsupported");
      return { progress: value, blocked: false, message: null };
    }
    const legacy = readProgress();
    if (legacy.readFailed) throw new Error("unreadable");
    const progress = emptyAcademy();
    progress.legacySummary = {
      attempts: legacy.progress.attempts,
      best: legacy.progress.best,
      last: legacy.progress.last,
    };
    for (const bridge of legacyBridges) {
      if (bridge.articleIds.every((id) => legacy.progress.read.includes(id))) {
        progress.read[bridge.moduleId] = {
          levels: ["grundlagen"],
          revision: 1,
        };
      }
    }
    return { progress, blocked: false, message: null };
  } catch {
    return {
      progress: emptyAcademy(),
      blocked: true,
      message:
        "Akademie-Fortschritt konnte nicht sicher gelesen werden. Vorhandene Daten werden nicht überschrieben. Du kannst vorübergehend lernen; bitte lade die Seite erneut. Bei unbekannter Datenversion zuerst eine passende App-Version verwenden.",
    };
  }
}
export function markRead(
  progress: AcademyProgress,
  moduleId: string,
  level: Level,
  now = new Date(),
): AcademyProgress {
  const module = modules.find((item) => item.id === moduleId);
  if (!module || !levels.includes(level)) return progress;
  const previous = progress.read[moduleId];
  const readLevels =
    previous?.revision === module.revision ? previous.levels : [];
  return {
    ...progress,
    updatedAt: now.toISOString(),
    read: {
      ...progress.read,
      [moduleId]: {
        revision: module.revision,
        levels: [...new Set([...readLevels, level])],
      },
    },
  };
}
export function answerQuestion(
  progress: AcademyProgress,
  questionId: string,
  optionId: string,
  now = new Date(),
): AcademyProgress {
  const question = academyQuestions.find((item) => item.id === questionId);
  if (!question || !question.options.some((option) => option.id === optionId))
    return progress;
  return {
    ...progress,
    updatedAt: now.toISOString(),
    answers: {
      ...progress.answers,
      [questionId]: {
        optionId,
        correct: question.correctOptionId === optionId,
        questionRevision: question.revision,
        answeredAt: now.toISOString(),
      },
    },
  };
}
export function needsPractice(
  progress: AcademyProgress,
  moduleId: string,
): boolean {
  return academyQuestions.some(
    (question) =>
      question.moduleId === moduleId &&
      progress.answers[question.id]?.questionRevision === question.revision &&
      progress.answers[question.id].correct === false,
  );
}
export function moduleRead(
  progress: AcademyProgress,
  moduleId: string,
  level: Level,
): boolean {
  const module = modules.find((item) => item.id === moduleId);
  return (
    !!module &&
    progress.read[moduleId]?.revision === module.revision &&
    progress.read[moduleId].levels.includes(level)
  );
}
export const intervals = [1, 3, 7, 14, 30] as const;
export function reviewCard(
  progress: AcademyProgress,
  cardId: string,
  remembered: boolean,
  now = new Date(),
): AcademyProgress {
  const card = flashcards.find((card) => card.id === cardId);
  if (!card) return progress;
  const repetitions = remembered
    ? Math.min(
        (progress.reviews[cardId]?.cardRevision === card.revision
          ? progress.reviews[cardId].repetitions
          : 0) + 1,
        intervals.length,
      )
    : 0;
  const intervalDays = remembered ? intervals[repetitions - 1] : 0;
  const dueAt = new Date(
    now.getTime() + intervalDays * 86_400_000,
  ).toISOString();
  return {
    ...progress,
    updatedAt: now.toISOString(),
    reviews: {
      ...progress.reviews,
      [cardId]: {
        cardRevision: card.revision,
        repetitions,
        intervalDays,
        dueAt,
        lastReviewedAt: now.toISOString(),
      },
    },
  };
}
export function dueCards(
  progress: AcademyProgress,
  now = new Date(),
  moduleId?: string,
) {
  return flashcards.filter(
    (card) =>
      (!moduleId || card.moduleId === moduleId) &&
      (!progress.reviews[card.id] ||
        progress.reviews[card.id].cardRevision !== card.revision ||
        Date.parse(progress.reviews[card.id].dueAt) <= now.getTime()),
  );
}
export function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("de")
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
