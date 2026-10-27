export interface Performance {
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
