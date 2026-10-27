import { schoolKinds } from "../../technical/foundations";
import { units } from "../../technical/calculations";
import { levels } from "../model";
import type {
  LearningItem,
  ExamSession,
  ExamResult,
  ExamSnapshot,
} from "../exercises/model";
export const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
export const date = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
export const integer = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
const text = (value: unknown): value is string => typeof value === "string";
const texts = (value: unknown) => Array.isArray(value) && value.every(text);
const finite = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);
export function validItem(value: unknown): value is LearningItem {
  if (
    !record(value) ||
    !["id", "topicId", "domainId", "title", "prompt"].every((key) =>
      text(value[key]),
    ) ||
    !integer(value.revision) ||
    value.revision < 1 ||
    !levels.includes(value.level as (typeof levels)[number]) ||
    !record(value.article) ||
    !["module", "note"].includes(String(value.article.kind)) ||
    !text(value.article.id)
  )
    return false;
  if (value.kind === "choice")
    return (
      Array.isArray(value.options) &&
      value.options.length > 1 &&
      value.options.every(
        (option) => record(option) && text(option.id) && text(option.text),
      ) &&
      value.options.some((option) => option.id === value.correctOptionId) &&
      text(value.explanation)
    );
  return (
    value.kind === "numeric" &&
    [
      ...schoolKinds,
      "amount", "speed", "force", "mechanical-work", "power-from-energy", "pressure", "density", "sensible-energy",
      "charge-current",
      "ohm-current",
      "ohm-voltage",
      "ohm-resistance",
      "electric-energy",
      "series-resistance",
      "parallel-resistance",
      "heat",
      "mass-flow",
      "temperature-difference",
      "superheat",
      "subcooling",
      "dc-power",
      "cooling-cop",
      "heating-cop",
    ].includes(String(value.calculation)) &&
    text(value.quantity) &&
    Object.hasOwn(units, value.quantity) &&
    text(value.answerUnit) &&
    units[value.quantity as keyof typeof units].includes(value.answerUnit) &&
    finite(value.absoluteToleranceSI) &&
    value.absoluteToleranceSI >= 0 &&
    finite(value.relativeTolerance) &&
    value.relativeTolerance >= 0 &&
    text(value.sought) &&
    text(value.assumptions) &&
    texts(value.sourceIds) &&
    texts(value.steps) &&
    (value.texSteps === undefined || texts(value.texSteps)) &&
    texts(value.mistakes) &&
    Array.isArray(value.givens) &&
    value.givens.every(
      (given) =>
        record(given) &&
        text(given.id) &&
        text(given.label) &&
        finite(given.value) &&
        text(given.unit) &&
        text(given.quantity) &&
        Object.hasOwn(units, given.quantity) &&
        units[given.quantity as keyof typeof units].includes(given.unit),
    )
  );
}
export function validSnapshot(value: unknown): value is ExamSnapshot {
  return (
    record(value) &&
    validItem(value.item) &&
    (value.item.kind === "choice" ||
      (finite(value.expectedSI) && (value.expectedSI >= 0 || value.item.quantity === "number")))
  );
}
export function validAnswer(value: unknown) {
  return (
    record(value) &&
    text(value.value) &&
    value.value.length <= 200 &&
    text(value.unit)
  );
}
export function validSession(value: unknown): value is ExamSession {
  return (
    record(value) &&
    text(value.id) &&
    text(value.domainId) &&
    levels.includes(value.level as (typeof levels)[number]) &&
    date(value.startedAt) &&
    date(value.deadline) &&
    Date.parse(value.deadline) > Date.parse(value.startedAt) &&
    Array.isArray(value.snapshots) &&
    value.snapshots.length >= 2 &&
    value.snapshots.length <= 10 &&
    value.snapshots.every(validSnapshot) &&
    new Set(value.snapshots.map((snapshot) => snapshot.item.id)).size ===
      value.snapshots.length &&
    record(value.responses) &&
    Object.values(value.responses).every(validAnswer)
  );
}
export function validResult(value: unknown): value is ExamResult {
  return (
    record(value) &&
    text(value.id) &&
    text(value.domainId) &&
    levels.includes(value.level as (typeof levels)[number]) &&
    date(value.startedAt) &&
    date(value.finishedAt) &&
    typeof value.timedOut === "boolean" &&
    finite(value.scorePercent) &&
    value.scorePercent >= 0 &&
    value.scorePercent <= 100 &&
    integer(value.correctCount) &&
    integer(value.total) &&
    value.total > 0 &&
    value.total <= 10 &&
    value.correctCount <= value.total &&
    Array.isArray(value.results) &&
    value.results.length === value.total &&
    value.results.every(
      (result) =>
        record(result) &&
        validSnapshot(result.snapshot) &&
        validAnswer(result.answer) &&
        record(result.grade) &&
        typeof result.grade.correct === "boolean" &&
        ["correct", "incorrect", "invalid", "unanswered"].includes(
          String(result.grade.status),
        ) &&
        text(result.grade.message) &&
        result.grade.correct === (result.grade.status === "correct"),
    ) &&
    value.results.filter(
      (result) =>
        record(result) && record(result.grade) && result.grade.correct === true,
    ).length === value.correctCount &&
    Math.round((value.correctCount / value.total) * 100) === value.scorePercent
  );
}
