import { parseArithmetic } from "../../technical/expression";
import { parseSchoolAnswer } from "../../technical/foundations";
import { calculateTechnical, toSI, units } from "../../technical/calculations";
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
      item.answerSyntax==="arithmetic"?parseArithmetic(answer.value):item.quantity === "number" ? parseSchoolAnswer(answer.value) : parseDecimal(answer.value),
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
        "Bitte gib eine endliche Zahl im zulässigen Definitionsbereich mit passender Einheit ein. Im Werkstatt-Zahlenfeld sind begrenzte arithmetische Ausdrücke erlaubt; keine Tausendertrenner oder Einheit im Zahlenfeld.",
    };
  }
}

/** Rückmeldung nutzt denselben Grader; keine zweite Entscheidung über Richtigkeit. */
export function numericFeedback(snapshot: ExamSnapshot, answer: ItemAnswer): {number: string; unit: string} | null {
 const item = snapshot.item;
 if(item.kind !== 'numeric' || !answer.value.trim()) return null;
 const grade = gradeSnapshot(snapshot, answer);
 if(!units[item.quantity].includes(answer.unit)) return {number:'Zahlenwert nicht bewertet, solange die Einheit unpassend ist.',unit:`Die Einheit ${answer.unit || '(leer)'} gehört nicht zur gesuchten Größenart.`};
 if(grade.status === 'invalid') return {number:'Zahlenformat, endliche Arithmetik und Definitionsbereich prüfen.',unit:`${answer.unit} gehört zur gesuchten Größenart; der Zahlenwert ist noch nicht auswertbar.`};
 if(grade.correct) return {number:'Zahlenwert einschließlich Umrechnung liegt in der Rechentoleranz.',unit:`${answer.unit} ist für diese Größe passend; gleichwertige Einheiten sind zugelassen.`};
 const raw = item.answerSyntax === 'arithmetic' ? parseArithmetic(answer.value) : item.quantity === 'number' ? parseSchoolAnswer(answer.value) : parseDecimal(answer.value);
 const alternative = units[item.quantity].find(u => u !== answer.unit && gradeSnapshot(snapshot,{value:String(raw),unit:u}).correct);
 return {number:alternative?`Dein Zahlenwert passt zum Sollwert in ${alternative}. Der tatsächliche Rechenweg ist unbekannt.`:`Der umgerechnete Zahlenwert liegt außerhalb der Rechentoleranz. Prüfe Formel, Umstellung und Einsetzen.`,unit:alternative?`Ausgewählt ist ${answer.unit}; prüfe die Zuordnung von Zahlenwert und Einheit.`:`${answer.unit} gehört zur gesuchten Größenart. Das bestätigt die Umrechnung noch nicht.`};
}
