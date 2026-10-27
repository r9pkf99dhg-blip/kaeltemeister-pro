import { expect, it } from "vitest";
import { articles, questions } from "../content";
import {
  academyQuestions,
  flashcards,
  formulas,
  modules,
  sources,
  terms,
} from "../academy/catalog";
import { numericTasks } from "../academy/exercises/data";
import { reviewRegister, reviewMarkdown } from "./register";
it("erfasst sämtliche Artikel, Niveaus, Fragen, Karten, Formeln, Aufgaben und Fachbegriffe", () => {
  expect(new Set(reviewRegister.map((e) => e.id)).size).toBe(
    reviewRegister.length,
  );
  for (const [kind, contents] of [
    ["article", articles],
    ["question", academyQuestions],
    ["card", flashcards],
    ["formula", formulas],
    ["numeric", numericTasks],
    ["term", terms],
  ] as const) {
    for (const content of contents)
      expect(
        reviewRegister.some(
          (e) => e.kind === kind && e.contentId === content.id,
        ),
      ).toBe(true);
  }
  expect(
    reviewRegister.filter((e) => e.kind === "legacy-question"),
  ).toHaveLength(questions.length);
  expect(reviewRegister.filter((e) => e.kind === "module")).toHaveLength(
    modules.length * 3,
  );
});
it("behauptet keine menschliche Fachprüfung und hält Belege getrennt", () => {
  for (const e of reviewRegister) {
    expect(e.status).not.toBe("independent");
    expect(e.independentReviewer).toBeNull();
    expect(e.questions.length).toBeGreaterThan(0);
    for (const id of e.sourceIds)
      expect(sources.some((s) => s.id === id)).toBe(true);
    if (e.status === "sourced")
      expect(
        e.sourceIds.some(
          (id) => sources.find((s) => s.id === id)?.access === "consulted",
        ),
      ).toBe(true);
  }
  expect(reviewMarkdown()).toContain("Fachprüfer/in: ____________________");
});
