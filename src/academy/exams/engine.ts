import { academyQuestions } from "../catalog";
import { levels, type AcademyProgress, type Level } from "../model";
import { learningItems } from "../exercises/items";
import { gradeSnapshot, snapshotItem } from "../exercises/engine";
import type { ExamSession, ItemAnswer } from "../exercises/model";
import { recordOutcome } from "../adaptive/algorithm";
export function createExam(
  progress: AcademyProgress,
  domainId: string,
  level: Level,
  minutes: number,
  now = new Date(),
  id: string = crypto.randomUUID(),
): ExamSession {
  if (!levels.includes(level) || ![5, 10, 20].includes(minutes))
    throw new Error(
      "Bitte wähle ein gültiges Niveau und 5, 10 oder 20 Minuten.",
    );
  const pool = learningItems.filter(
    (item) =>
      (domainId === "all" || item.domainId === domainId) &&
      levels.indexOf(item.level) <= levels.indexOf(level),
  );
  // Bekannte Fehler zuerst; stabile Reihenfolge macht die Auswahl nachvollziehbar.
  const ordered = [...pool].sort(
    (a, b) =>
      Number(progress.performance[b.id]?.lastCorrect === false) -
        Number(progress.performance[a.id]?.lastCorrect === false) ||
      a.id.localeCompare(b.id),
  );
  const choices = ordered.filter((item) => item.kind === "choice").slice(0, 3);
  const calculations = ordered
    .filter((item) => item.kind === "numeric")
    .slice(0, 3);
  if (!choices.length || !calculations.length)
    throw new Error(
      "Für diese Auswahl gibt es noch nicht beide Fragetypen. Wähle Kältetechnik, Elektrotechnik oder alle verfügbaren Fachgebiete.",
    );
  const mixed = Array.from(
    { length: Math.max(choices.length, calculations.length) },
    (_, index) => [choices[index], calculations[index]],
  )
    .flat()
    .filter((item) => !!item);
  return {
    id,
    domainId,
    level,
    startedAt: now.toISOString(),
    deadline: new Date(now.getTime() + minutes * 60_000).toISOString(),
    snapshots: mixed.map(snapshotItem),
    responses: {},
  };
}
export function examRemaining(session: ExamSession, now = new Date()): number {
  return Math.max(
    0,
    Math.ceil((Date.parse(session.deadline) - now.getTime()) / 1000),
  );
}
export function setExamAnswer(
  progress: AcademyProgress,
  itemId: string,
  answer: ItemAnswer,
  now = new Date(),
): AcademyProgress {
  const session = progress.activeExam;
  if (
    !session ||
    now.getTime() >= Date.parse(session.deadline) ||
    !session.snapshots.some((snapshot) => snapshot.item.id === itemId)
  )
    return progress;
  return {
    ...progress,
    activeExam: {
      ...session,
      responses: {
        ...session.responses,
        [itemId]: { value: answer.value.slice(0, 200), unit: answer.unit },
      },
    },
  };
}
export function finishExam(
  progress: AcademyProgress,
  now = new Date(),
): AcademyProgress {
  const session = progress.activeExam;
  if (!session) return progress;
  const results = session.snapshots.map((snapshot) => {
    const answer = session.responses[snapshot.item.id] ?? {
      value: "",
      unit: snapshot.item.kind === "numeric" ? snapshot.item.answerUnit : "",
    };
    return { snapshot, answer, grade: gradeSnapshot(snapshot, answer) };
  });
  const correctCount = results.filter((result) => result.grade.correct).length;
  let next = progress;
  for (const result of results) {
    // Unbearbeitet zählt in der Prüfung als 0 Punkte, ist aber kein Beweis für eine Wissenslücke.
    const item = result.snapshot.item;
    if (
      result.grade.status !== "unanswered" &&
      learningItems.some(
        (current) =>
          current.id === item.id && current.revision === item.revision,
      )
    ) {
      if (
        item.kind === "choice" &&
        academyQuestions.some(
          (question) =>
            question.id === item.id && question.revision === item.revision,
        ) &&
        result.grade.status !== "invalid"
      ) {
        next = {
          ...next,
          answers: {
            ...next.answers,
            [item.id]: {
              optionId: result.answer.value,
              correct: result.grade.correct,
              questionRevision: item.revision,
              answeredAt: now.toISOString(),
            },
          },
        };
      }
      next = recordOutcome(next, item, result.grade.correct, now);
    }
  }
  return {
    ...next,
    activeExam: null,
    examHistory: [
      {
        id: session.id,
        domainId: session.domainId,
        level: session.level,
        startedAt: session.startedAt,
        finishedAt: now.toISOString(),
        timedOut: now.getTime() >= Date.parse(session.deadline),
        correctCount,
        total: results.length,
        scorePercent: Math.round((correctCount / results.length) * 100),
        results,
      },
      ...progress.examHistory.filter((result) => result.id !== session.id),
    ].slice(0, 20),
    updatedAt: now.toISOString(),
  };
}
