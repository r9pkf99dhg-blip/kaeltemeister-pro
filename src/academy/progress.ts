import { validCycleDraft } from "../refrigeration/draft";
import { validMastery } from "../mastery/validation";
import { validWorkshop, validTrainer, validLab } from "../workshop/validation";
import {
  recordOutcome,
  topicStatistics,
  reviewIntervals,
} from "./adaptive/algorithm";
import {
  record,
  date,
  integer as validInteger,
  validAnswer,
  validSession,
  validResult,
} from "./exams/validation";
import {
  academyQuestions,
  flashcards,
  modules,
  legacyBridges,
} from "./catalog";
import {
  levels,
  type AcademyProgress,
  type AcademyProgressV2,
  type Level,
} from "./model";
import { readProgress } from "../logic";

export const LEGACY_ACADEMY_KEY = "kaeltemeister-pro:progress:v2";
export const ACADEMY_KEY = "kaeltemeister-pro:progress:v3";
export const emptyAcademy = (): AcademyProgress => ({
  schemaVersion: 3,
  performance: {},
  exerciseAnswers: {},
  recentModules: [],
  activeExam: null,
  examHistory: [],
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
export function validateLegacyProgress(
  value: unknown,
): value is AcademyProgressV2 {
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
export function validateProgress(value: unknown): value is AcademyProgress {
  if (
    !record(value) ||
    value.schemaVersion !== 3 ||
    !validateLegacyProgress({ ...value, schemaVersion: 2 }) ||
    !record(value.performance) ||
    !(value.mastery === undefined || validMastery(value.mastery)) ||
    !(value.cycleDraft === undefined || validCycleDraft(value.cycleDraft)) ||
    !(value.labDraft === undefined || validLab(value.labDraft)) ||
    !(
      value.preferences === undefined ||
      (record(value.preferences) &&
        ["simple", "technical"].includes(String(value.preferences.explanation)))
    ) ||
    !(
      value.exerciseDraft === undefined ||
      (record(value.exerciseDraft) &&
        (value.exerciseDraft.workspace === undefined ||
          value.exerciseDraft.workspace === "workshop") &&
        (value.exerciseDraft.workshop === undefined ||
          validWorkshop(value.exerciseDraft.workshop)) &&
        (value.exerciseDraft.trainer === undefined ||
          validTrainer(value.exerciseDraft.trainer)) &&
        typeof value.exerciseDraft.taskId === "string" &&
        value.exerciseDraft.taskId.length <= 120 &&
        validInteger(value.exerciseDraft.revision) &&
        value.exerciseDraft.revision > 0 &&
        validAnswer(value.exerciseDraft.answer) &&
        (value.exerciseDraft.bridgeLessonId === null ||
          (typeof value.exerciseDraft.bridgeLessonId === "string" &&
            value.exerciseDraft.bridgeLessonId.length <= 120)) &&
        typeof value.exerciseDraft.checked === "boolean" &&
        date(value.exerciseDraft.updatedAt))
    ) ||
    !record(value.exerciseAnswers) ||
    !Array.isArray(value.recentModules) ||
    value.recentModules.length > 5 ||
    !value.recentModules.every(
      (entry) =>
        record(entry) &&
        typeof entry.moduleId === "string" &&
        date(entry.openedAt),
    ) ||
    !(value.activeExam === null || validSession(value.activeExam)) ||
    !Array.isArray(value.examHistory) ||
    value.examHistory.length > 20 ||
    !value.examHistory.every(validResult)
  )
    return false;
  for (const entry of Object.values(value.performance)) {
    if (
      !record(entry) ||
      typeof entry.topicId !== "string" ||
      !["choice", "numeric", "card"].includes(String(entry.kind)) ||
      !validInteger(entry.itemRevision) ||
      entry.itemRevision < 1 ||
      !validInteger(entry.attempts) ||
      !validInteger(entry.correctCount) ||
      entry.correctCount > entry.attempts ||
      !validInteger(entry.streak) ||
      entry.streak > 5 ||
      typeof entry.lastCorrect !== "boolean" ||
      !(
        entry.support === undefined ||
        (record(entry.support) &&
          ["independent", "hint", "worked", "unknown"].includes(
            String(entry.support.last),
          ) &&
          ["independent", "hint", "worked"].every((k) =>
            validInteger((entry.support as Record<string, unknown>)[k]),
          ) &&
          Number(entry.support.independent) +
            Number(entry.support.hint) +
            Number(entry.support.worked) <=
            entry.correctCount)
      ) ||
      !date(entry.lastAttemptAt) ||
      !date(entry.dueAt) ||
      !validInteger(entry.intervalDays) ||
      entry.intervalDays > 30
    )
      return false;
  }
  for (const entry of Object.values(value.exerciseAnswers))
    if (
      !record(entry) ||
      !validAnswer(entry.answer) ||
      typeof entry.correct !== "boolean" ||
      !validInteger(entry.revision) ||
      entry.revision < 1 ||
      !date(entry.answeredAt)
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
    const previousRaw = localStorage.getItem(LEGACY_ACADEMY_KEY);
    if (previousRaw !== null) {
      const previous: unknown = JSON.parse(previousRaw);
      if (!validateLegacyProgress(previous)) throw new Error("unsupported-v2");
      // Keine Versuchshistorie aus einer gespeicherten Einzelantwort erfinden.
      return {
        progress: {
          ...emptyAcademy(),
          read: previous.read,
          answers: previous.answers,
          reviews: previous.reviews,
          legacySummary: previous.legacySummary,
          updatedAt: previous.updatedAt,
        },
        blocked: false,
        message: null,
      };
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
  return recordOutcome(
    {
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
    },
    {
      id: question.id,
      topicId: question.moduleId,
      revision: question.revision,
      kind: "choice",
    },
    question.correctOptionId === optionId,
    now,
  );
}
export function needsPractice(
  progress: AcademyProgress,
  moduleId: string,
): boolean {
  return topicStatistics(progress, moduleId).weak;
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
export const intervals = reviewIntervals;
export function reviewCard(
  progress: AcademyProgress,
  cardId: string,
  remembered: boolean,
  now = new Date(),
): AcademyProgress {
  const card = flashcards.find((card) => card.id === cardId);
  if (!card) return progress;
  const adaptive = recordOutcome(
    progress,
    {
      id: card.id,
      topicId: card.moduleId,
      revision: card.revision,
      kind: "card",
    },
    remembered,
    now,
    progress.reviews[cardId]?.cardRevision === card.revision
      ? progress.reviews[cardId].repetitions
      : 0,
  );
  const result = adaptive.performance[card.id];
  const repetitions = result.streak;
  const intervalDays = result.intervalDays;
  const dueAt = result.dueAt;
  return {
    ...adaptive,
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
