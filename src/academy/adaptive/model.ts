export interface Performance {
  support?: {
    independent: number;
    hint: number;
    worked: number;
    last: "independent" | "hint" | "worked" | "unknown";
  };
  topicId: string;
  itemRevision: number;
  kind: "choice" | "numeric" | "card";
  attempts: number;
  correctCount: number;
  streak: number;
  lastCorrect: boolean;
  lastAttemptAt: string;
  dueAt: string;
  intervalDays: number;
}
