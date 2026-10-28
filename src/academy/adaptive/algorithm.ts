import type { AcademyProgress } from "../model";
import type { Performance } from "./model";
import { learningItems, learningTopics } from "../exercises/items";
import { modules, academyQuestions } from "../catalog";
export const reviewIntervals = [1, 3, 7, 14, 30] as const;
export function recordOutcome(
  progress: AcademyProgress,
  item: {
    id: string;
    topicId: string;
    revision: number;
    kind: "choice" | "numeric" | "card";
  },
  correct: boolean,
  now = new Date(),
  knownStreak?: number,
  support?: "independent" | "hint" | "worked",
): AcademyProgress {
  const old =
    progress.performance[item.id]?.itemRevision === item.revision
      ? progress.performance[item.id]
      : undefined;
  const attempts = Math.min((old?.attempts ?? 0) + 1, Number.MAX_SAFE_INTEGER);
  const correctCount = Math.min(
    (old?.correctCount ?? 0) + Number(correct),
    attempts,
  );
  const streak =
    support && support !== "independent"
      ? 0
      : correct
        ? Math.min((knownStreak ?? old?.streak ?? 0) + 1, 5)
        : 0;
  const weakTopic = topicStatistics(progress, item.topicId).weak;
  const intervalDays =
    support === "worked"
      ? 0
      : support === "hint"
        ? correct
          ? 1
          : 0
        : correct
          ? Math.min(reviewIntervals[streak - 1], weakTopic ? 3 : 30)
          : 0;
  const oldSupport = old?.support;
  const evidence =
    support || oldSupport
      ? {
          independent: oldSupport?.independent ?? 0,
          hint: oldSupport?.hint ?? 0,
          worked: oldSupport?.worked ?? 0,
          last: support ?? ("unknown" as const),
        }
      : undefined;
  if (
    evidence &&
    support &&
    correct &&
    evidence.independent + evidence.hint + evidence.worked < correctCount
  )
    evidence[support]++;
  const entry: Performance = {
    ...(evidence ? { support: evidence } : {}),
    topicId: item.topicId,
    itemRevision: item.revision,
    kind: item.kind,
    attempts,
    correctCount,
    streak,
    lastCorrect: correct,
    lastAttemptAt: now.toISOString(),
    intervalDays,
    dueAt: new Date(now.getTime() + intervalDays * 86_400_000).toISOString(),
  };
  const updated = {
    ...progress,
    updatedAt: now.toISOString(),
    performance: { ...progress.performance, [item.id]: entry },
  };
  return visitModule(updated, item.topicId, now);
}
export function topicStatistics(progress: AcademyProgress, topicId: string) {
  // Nur objektive, aktuelle Aufgaben/Fragen bewerten Wissenslücken; Karten sind Selbsteinschätzung.
  const entries = Object.entries(progress.performance)
    .filter(
      ([id, entry]) =>
        entry.topicId === topicId &&
        entry.kind !== "card" &&
        learningItems.some(
          (item) => item.id === id && item.revision === entry.itemRevision,
        ),
    )
    .map(([, entry]) => entry);
  const attempts = entries.reduce((sum, entry) => sum + entry.attempts, 0);
  const correct = entries.reduce((sum, entry) => sum + entry.correctCount, 0);
  const legacyWrong = academyQuestions.some(
    (question) =>
      question.moduleId === topicId &&
      progress.answers[question.id]?.questionRevision === question.revision &&
      !progress.performance[question.id] &&
      progress.answers[question.id].correct === false,
  );
  const lastWrong = legacyWrong || entries.some((entry) => !entry.lastCorrect);
  return {
    attempts,
    correct,
    lastWrong,
    accuracy: attempts ? correct / attempts : null,
    weak: lastWrong || (attempts >= 2 && correct / attempts < 0.75),
  };
}
export function recommendations(progress: AcademyProgress, now = new Date()) {
  return learningTopics
    .map((topic) => {
      const stats = topicStatistics(progress, topic.id);
      const due = Object.entries(progress.performance).filter(
        ([id, entry]) =>
          entry.kind !== "card" &&
          entry.topicId === topic.id &&
          Date.parse(entry.dueAt) <= now.getTime() &&
          learningItems.some(
            (item) => item.id === id && item.revision === entry.itemRevision,
          ),
      ).length;
      const read =
        topic.moduleId && progress.read[topic.moduleId]?.levels.length;
      let reason: string;
      let priority: number;
      if (stats.lastWrong) {
        reason =
          "Mindestens eine letzte Antwort war falsch. Wiederhole Erklärung und eine passende Aufgabe.";
        priority = 4;
      } else if (due) {
        reason = `${due} bereits bearbeitete Fragen/Aufgaben sind zeitlich zur Wiederholung fällig.`;
        priority = 3;
      } else if (stats.weak) {
        reason = `${stats.correct} von ${stats.attempts} bewerteten Versuchen richtig; die bisherige Trefferquote liegt unter 75 %.`;
        priority = 2;
      } else if (!stats.attempts) {
        reason = read
          ? "Bereits gelesen, aber noch keine bewerteten Antworten. Prüfe dein Verständnis."
          : "Noch keine bewerteten Antworten. Ein sinnvoller Einstieg, keine festgestellte Wissenslücke.";
        priority = 1;
      } else {
        reason =
          "Aktuell keine besondere Wiederholung nötig. Freiwillige Vertiefung ist möglich.";
        priority = 0;
      }
      const prerequisites = topic.moduleId
        ? (modules.find((m) => m.id === topic.moduleId)?.prerequisites ?? [])
        : [];
      const missingPrerequisites = prerequisites.filter((id) => {
        const current = modules.find((m) => m.id === id);
        return (
          !current ||
          progress.read[id]?.revision !== current.revision ||
          !progress.read[id].levels.includes("grundlagen")
        );
      });
      if (priority === 1 && missingPrerequisites.length)
        reason += ` Empfohlene Grundlagen noch nicht gelesen: ${missingPrerequisites.map((id) => modules.find((m) => m.id === id)?.title ?? id).join(", ")}.`;
      return {
        ...topic,
        ...stats,
        due,
        reason,
        priority,
        missingPrerequisites,
      };
    })
    .sort(
      (a, b) =>
        b.priority - a.priority ||
        (a.priority === 1
          ? a.missingPrerequisites.length +
            (a.moduleId ? 0 : 1) -
            (b.missingPrerequisites.length + (b.moduleId ? 0 : 1))
          : 0) ||
        a.title.localeCompare(b.title, "de"),
    );
}
export function visitModule(
  progress: AcademyProgress,
  moduleId: string,
  now = new Date(),
): AcademyProgress {
  if (!modules.some((module) => module.id === moduleId)) return progress;
  return {
    ...progress,
    updatedAt: now.toISOString(),
    recentModules: [
      { moduleId, openedAt: now.toISOString() },
      ...progress.recentModules.filter((entry) => entry.moduleId !== moduleId),
    ].slice(0, 5),
  };
}
export function dueLearningItems(progress: AcademyProgress, now = new Date()) {
  return learningItems.filter((item) => {
    const entry = progress.performance[item.id];
    return (
      entry?.itemRevision === item.revision &&
      Date.parse(entry.dueAt) <= now.getTime()
    );
  });
}
