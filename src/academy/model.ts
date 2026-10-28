import type { Performance } from "./adaptive/model";
import type { ExamSession, ExamResult, ItemAnswer } from "./exercises/model";
export const levels = ["grundlagen", "fachkraft", "meister"] as const;
export type Level = (typeof levels)[number];
export const levelNames: Record<Level, string> = {
  grundlagen: "Grundlagen",
  fachkraft: "Fachkraft",
  meister: "Meisterniveau",
};
export interface Source {
  id: string;
  title: string;
  url?: string;
  access: "unavailable" | "internal" | "consulted";
  accessedAt?: string;
  locator?: string;
  supports?: string;
  license?: string;
  reviewedCommit?: string;
  note: string;
}
export interface Formula {
  id: string;
  title: string;
  expression: string;
  tex?: string;
  variables?: { symbol: string; meaning: string; unit: string }[];
  units: string;
  assumptions: string;
  sourceIds: string[];
  calculatorId?: string;
}
export interface Objective {
  id: string;
  text: string;
}
export interface LearningContent {
  introduction: string;
  derivation?: string[];
  explanation: string;
  connections: string;
  example: string;
  mistakes: string[];
  summary: string;
  deepening: string;
}
export interface Module {
  id: string;
  revision: number;
  domainId: string;
  title: string;
  description: string;
  objectiveIds: string[];
  formulaIds: string[];
  sourceIds: string[];
  termIds: string[];
  questionIds: string[];
  cardIds: string[];
  prerequisites?: string[];
  safety?: string;
  review: "awaiting-expert-review";
  levels: Record<Level, LearningContent>;
  related: {
    kind: "calculator" | "measurement" | "diagnosis" | "case";
    id: string;
    label: string;
    available: boolean;
  }[];
}
export interface AcademyQuestion {
  id: string;
  revision: number;
  moduleId: string;
  level: Level;
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  objectiveId: string;
  sourceIds: string[];
}
export interface Flashcard {
  id: string;
  revision: number;
  moduleId: string;
  front: string;
  back: string;
  sourceIds: string[];
}
export interface Term {
  id: string;
  title: string;
  definition: string;
  moduleIds: string[];
}
export interface Domain {
  id: string;
  title: string;
  description: string;
  chapters: {
    id: string;
    title: string;
    subchapters: {
      id: string;
      title: string;
      moduleIds: string[];
      plannedTopics: string[];
    }[];
  }[];
}
export interface AcademyProgressV2 {
  schemaVersion: 2;
  read: Record<string, { levels: Level[]; revision: number }>;
  answers: Record<
    string,
    {
      optionId: string;
      correct: boolean;
      questionRevision: number;
      answeredAt: string;
    }
  >;
  reviews: Record<
    string,
    {
      cardRevision: number;
      dueAt: string;
      intervalDays: number;
      repetitions: number;
      lastReviewedAt: string;
    }
  >;
  legacySummary: { attempts: number; best: number; last: number | null } | null;
  updatedAt: string | null;
}

export interface AcademyProgress
  extends Omit<AcademyProgressV2, "schemaVersion"> {
  schemaVersion: 3;
  exerciseDraft?: { taskId:string; revision:number; answer:ItemAnswer; bridgeLessonId:string|null; checked:boolean; updatedAt:string };
  performance: Record<string, Performance>;
  exerciseAnswers: Record<
    string,
    {
      answer: ItemAnswer;
      correct: boolean;
      revision: number;
      answeredAt: string;
    }
  >;
  recentModules: { moduleId: string; openedAt: string }[];
  activeExam: ExamSession | null;
  examHistory: ExamResult[];
}
