import {
  record,
  validAnswer,
  integer,
  date,
} from "../academy/exams/validation";
import { worksheetKeys } from "./model";
export function validWorkshop(v: unknown): boolean {
  return (
    record(v) &&
    (v.responses === undefined ||
      (record(v.responses) &&
        Object.keys(v.responses).length <= 30 &&
        Object.values(v.responses).every(validAnswer))) &&
    (v.checkedIds === undefined ||
      (Array.isArray(v.checkedIds) &&
        v.checkedIds.length <= 30 &&
        v.checkedIds.every((s) => typeof s === "string" && s.length <= 120))) &&
    typeof v.entryId === "string" &&
    v.entryId.length <= 120 &&
    [
      "choice",
      "numeric",
      "formula",
      "rearrangement",
      "conversion",
      "error",
      "steps",
      "decision",
    ].includes(String(v.kind)) &&
    ["guided", "independent"].includes(String(v.mode)) &&
    record(v.fields) &&
    worksheetKeys.every(
      (k) =>
        typeof (v.fields as Record<string, unknown>)[k] === "string" &&
        String((v.fields as Record<string, unknown>)[k]).length <= 2000,
    ) &&
    [0, 1, 2, 3].includes(Number(v.help)) &&
    typeof v.help === "number" &&
    integer(v.step) &&
    v.step <= 30 &&
    record(v.choices) &&
    Object.keys(v.choices).length <= 30 &&
    Object.values(v.choices).every(
      (s) => typeof s === "string" && s.length <= 120,
    ) &&
    typeof v.solutionOpen === "boolean"
  );
}
export function validTrainer(v: unknown): boolean {
  return (
    record(v) &&
    typeof v.caseId === "string" &&
    v.caseId.length <= 120 &&
    integer(v.index) &&
    v.index <= 20 &&
    typeof v.answer === "string" &&
    v.answer.length <= 120 &&
    typeof v.checked === "boolean" &&
    typeof v.correct === "boolean"
  );
}
export function validLab(v: unknown): boolean {
  return (
    record(v) &&
    typeof v.calculatorId === "string" &&
    v.calculatorId.length <= 120 &&
    date(v.updatedAt) &&
    record(v.values) &&
    Object.keys(v.values).length <= 12 &&
    Object.values(v.values).every(
      (x) =>
        validAnswer(x) && String((x as { unit: string }).unit).length <= 40,
    )
  );
}
