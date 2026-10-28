export type MotivationMode = "enabled" | "reduced" | "disabled";
export type LearningGoal =
  | "understand"
  | "independent"
  | "mission"
  | "due"
  | "case"
  | "resume";
export interface IndependentEvidence {
  revision: number;
  firstAt: string;
  lastAt: string;
  spacedAt?: string;
}
export interface SessionBaseline {
  revision: number;
  attempts: number;
  correct: number;
  independent: number;
  hint: number;
  worked: number;
  lastCorrect: boolean;
}
export interface LearningSession {
  id: string;
  startedAt: string;
  goal: LearningGoal;
  minutes: number;
  baseline: Record<string, SessionBaseline>;
  pausedAt: string | null;
  pauseMs: number;
}
export interface SessionResult {
  id: string;
  startedAt: string;
  finishedAt: string;
  goal: LearningGoal;
  independentIds: string[];
  hintIds: string[];
  workedIds: string[];
  improvedIds: string[];
  transferIds: string[];
  attempts: number;
}
export interface MasteryState {
  schemaVersion: 1;
  preferredLevel?: "all" | "grundlagen" | "fachkraft" | "meister";
  motivation: MotivationMode;
  goal: LearningGoal;
  focus: boolean;
  minutes: number;
  evidence: Record<string, IndependentEvidence>;
  mission: {
    id: string;
    revision: number;
    step: number;
    seen?: string[];
  } | null;
  session: LearningSession | null;
  history: SessionResult[];
}
export const emptyMastery = (): MasteryState => ({
  schemaVersion: 1,
  motivation: "reduced",
  goal: "understand",
  focus: false,
  minutes: 25,
  evidence: {},
  mission: null,
  session: null,
  history: [],
});

export const goalNames: Record<LearningGoal, string> = {
  understand: "Ein Thema verstehen",
  independent: "Drei verschiedene Aufgaben selbstständig lösen",
  mission: "Eine Fachmission abschließen",
  due: "Fällige Wiederholungen bearbeiten",
  case: "Einen Praxisfall lösen",
  resume: "Einen Lernpfad fortsetzen",
};
