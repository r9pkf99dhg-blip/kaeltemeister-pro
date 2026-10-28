import type { CalculationKind, Quantity } from "../../technical/calculations";
import type { Level } from "../model";
export interface ArticleRef {
  kind: "module" | "note";
  id: string;
}
export interface ItemBase {
  id: string;
  revision: number;
  topicId: string;
  domainId: string;
  level: Level;
  title: string;
  prompt: string;
  article: ArticleRef;
  formulaId?: string;
  requiredCompetencyIds?: string[];
}
export interface NumericTask extends ItemBase {
  kind: "numeric";
  calculation: CalculationKind;
  givens: {
    id: string;
    label: string;
    value: number;
    unit: string;
    quantity: Quantity;
  }[];
  sought: string;
  quantity: Quantity;
  answerUnit: string;
  absoluteToleranceSI: number;
  relativeTolerance: number;
  sourceIds: string[];
  hint?: string;
  steps: string[];
  texSteps?: string[];
  mistakes: string[];
  assumptions: string;
  review: "calculation-tested-expert-review-pending";
}
export interface ChoiceTask extends ItemBase {
  kind: "choice";
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}
export type LearningItem = NumericTask | ChoiceTask;
export interface ItemAnswer {
  value: string;
  unit: string;
}
export interface Grade {
  status: "correct" | "incorrect" | "invalid" | "unanswered";
  correct: boolean;
  message: string;
  answerSI?: number;
}
export interface ExamSnapshot {
  item: LearningItem;
  expectedSI?: number;
}
export interface ExamSession {
  id: string;
  domainId: string;
  level: Level;
  startedAt: string;
  deadline: string;
  snapshots: ExamSnapshot[];
  responses: Record<string, ItemAnswer>;
}
export interface ExamResult {
  id: string;
  domainId: string;
  level: Level;
  startedAt: string;
  finishedAt: string;
  timedOut: boolean;
  scorePercent: number;
  correctCount: number;
  total: number;
  results: { snapshot: ExamSnapshot; answer: ItemAnswer; grade: Grade }[];
}
