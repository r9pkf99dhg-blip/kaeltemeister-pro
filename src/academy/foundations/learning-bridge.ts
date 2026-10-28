import { errorPatterns } from "../deep/error-patterns";
import type { ItemAnswer } from "../exercises/model";
import type { AcademyProgress } from "../model";
import type { NumericTask } from "../exercises/model";
import { academyQuestions, modules } from "../catalog";
import { learningItems } from "../exercises/items";
import { competencies, taskCompetencies } from "./competencies";
/** Empfehlung, keine Diagnose: Eine falsche Gesamtantwort beweist keine einzelne fehlende Kompetenz. */
export function bridgeRecommendations(
  progress: AcademyProgress,
  task: NumericTask,
  answer?: ItemAnswer,
) {
  const patterns = answer ? errorPatterns(task, answer) : [];
  const ids = [
    ...new Set([
      ...(task.requiredCompetencyIds ?? taskCompetencies(task)),
      ...patterns.flatMap((p) =>
        competencies.filter((c) => c.lessonId === p.lessonId).map((c) => c.id),
      ),
    ]),
  ];
  return ids
    .flatMap((id) => {
      const competency = competencies.find((c) => c.id === id);
      if (!competency) return [];
      const module = modules.find((m) => m.id === competency.lessonId);
      if (!module) return [];
      const items = learningItems.filter((i) => i.topicId === module.id);
      const wrong =
        items.some(
          (i) =>
            progress.performance[i.id]?.itemRevision === i.revision &&
            progress.performance[i.id].lastCorrect === false,
        ) ||
        academyQuestions.some(
          (q) =>
            q.moduleId === module.id &&
            progress.answers[q.id]?.questionRevision === q.revision &&
            progress.answers[q.id].correct === false,
        );
      const read =
        progress.read[module.id]?.revision === module.revision &&
        progress.read[module.id].levels.includes("grundlagen");
      const assessed = items.some(
        (i) =>
          progress.performance[i.id]?.itemRevision === i.revision &&
          progress.performance[i.id].attempts > 0,
      );
      return [
        {
          ...competency,
          priority: patterns.some((p) => p.lessonId === module.id)
            ? 4
            : wrong
              ? 3
              : !read
                ? 2
                : !assessed
                  ? 1
                  : 0,
          reason:
            patterns.find((p) => p.lessonId === module.id)?.observation ??
            (wrong
              ? "In dieser Grundlage war mindestens eine letzte bewertete Antwort falsch. Eine Wiederholung könnte helfen."
              : !read
                ? "Diese benötigte Grundlage ist noch nicht als gelesen markiert. Das ist kein Nachweis einer Wissenslücke."
                : !assessed
                  ? "Die Grundlage ist gelesen; ein bewerteter Übungsstand ist noch nicht bekannt."
                  : "Diese Grundlage gehört zur Aufgabe und kann aufgefrischt werden. Ein konkreter Fehlergrund ist nicht bewiesen."),
        },
      ];
    })
    .sort(
      (a, b) => b.priority - a.priority || a.title.localeCompare(b.title, "de"),
    );
}
