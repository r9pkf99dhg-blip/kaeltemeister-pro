import { parseSchoolAnswer } from "../../technical/foundations";
import { calculateTechnical, toSI } from "../../technical/calculations";
import { parseDecimal } from "../../logic";
import type {
  ExamSnapshot,
  Grade,
  ItemAnswer,
  LearningItem,
  NumericTask,
} from "./model";

export function expectedSI(task: NumericTask): number {
  const values = Object.fromEntries(
    task.givens.map((given) => [
      given.id,
      toSI(given.value, given.unit, given.quantity),
    ]),
  );
  return calculateTechnical(task.calculation, values);
}
export function snapshotItem(item: LearningItem): ExamSnapshot {
  // Kopie trennt eine laufende Prüfung von späteren Änderungen im Katalog.
  return structuredClone(
    item.kind === "numeric" ? { item, expectedSI: expectedSI(item) } : { item },
  );
}
export function gradeSnapshot(
  snapshot: ExamSnapshot,
  answer: ItemAnswer,
): Grade {
  const item = snapshot.item;
  if (!answer.value.trim())
    return {
      status: "unanswered",
      correct: false,
      message:
        "Nicht beantwortet. Der Kenntnisstand ist dadurch noch unbekannt.",
    };
  if (item.kind === "choice") {
    if (!item.options.some((option) => option.id === answer.value))
      return {
        status: "invalid",
        correct: false,
        message: "Bitte wähle eine vorhandene Antwort.",
      };
    const correct = item.correctOptionId === answer.value;
    return {
      status: correct ? "correct" : "incorrect",
      correct,
      message: correct ? "Richtig." : "Noch nicht richtig.",
    };
  }
  try {
    const answerSI = toSI(
      item.quantity === "number" ? parseSchoolAnswer(answer.value) : parseDecimal(answer.value),
      answer.unit,
      item.quantity,
    );
    const expected = snapshot.expectedSI;
    if (expected === undefined || !Number.isFinite(expected))
      throw new Error("Aufgabe nicht auswertbar.");
    const tolerance = Math.max(
      item.absoluteToleranceSI,
      item.relativeTolerance * Math.abs(expected),
    );
    // Kleine Maschinenrundung an exakt der Toleranzgrenze berücksichtigen.
    const correct =
      Math.abs(answerSI - expected) <=
      tolerance +
        Number.EPSILON *
          Math.max(1, Math.abs(expected), Math.abs(answerSI)) *
          8;
    return {
      status: correct ? "correct" : "incorrect",
      correct,
      answerSI,
      message: correct
        ? "Richtig innerhalb der Rechentoleranz."
        : "Noch nicht richtig. Prüfe Umrechnung, Formel und eingesetzte Werte.",
    };
  } catch {
    return {
      status: "invalid",
      correct: false,
      message:
        item.quantity === "number" ? "Bitte gib eine endliche Zahl ein. Dezimalkomma und Punkt sind erlaubt; keine Tausendertrenner." : "Bitte gib eine endliche, nicht negative Zahl mit passender Einheit ein. Dezimalkomma und Punkt sind erlaubt; keine Tausendertrenner.",
    };
  }
}
