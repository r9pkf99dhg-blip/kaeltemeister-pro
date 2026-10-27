/** Aktuelle Inhaltsverträge. Das geplante gemeinsame System steht in docs/CONTENT_MODEL.md. */
export interface Article {
  /** Dauerhafte ID; wird im vorhandenen Lernfortschritt gespeichert. */
  id: string;
  title: string;
  category: string;
  minutes: number;
  intro: string;
  sections: { title: string; text: string }[];
  takeaway: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Nullbasierter Index in options. Inhaltsprüfungen sichern die gültigen Grenzen. */
  correct: number;
  explanation: string;
}
