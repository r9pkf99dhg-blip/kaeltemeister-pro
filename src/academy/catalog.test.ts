import { expect, it } from "vitest";
import {
  academyQuestions,
  domains,
  flashcards,
  formulas,
  modules,
  objectives,
  sources,
  terms,
  workedCycle,
} from "./catalog";
import { levels } from "./model";

it("enthält zwölf strukturierte Fachgebiete, achtzehn vollständige Module und stabile eindeutige IDs", () => {
  expect(domains).toHaveLength(12);
  expect(modules).toHaveLength(18);
  const allIds = [
    ...domains,
    ...domains.flatMap((domain) => domain.chapters),
    ...domains.flatMap((domain) =>
      domain.chapters.flatMap((chapter) => chapter.subchapters),
    ),
    ...modules,
    ...formulas,
    ...objectives,
    ...sources,
    ...academyQuestions,
    ...flashcards,
    ...terms,
  ].map((item) => item.id);
  expect(new Set(allIds).size).toBe(allIds.length);
  for (const id of allIds) expect(id).toMatch(/^[a-z0-9-]+$/);
  for (const domain of domains) {
    expect(domain.chapters.length).toBeGreaterThan(0);
    for (const chapter of domain.chapters)
      for (const sub of chapter.subchapters) {
        expect(sub.moduleIds.length + sub.plannedTopics.length).toBeGreaterThan(
          0,
        );
        for (const id of sub.moduleIds)
          expect(modules.find((module) => module.id === id)?.domainId).toBe(
            domain.id,
          );
      }
  }
});
it("alle Verweise sind gültig und alle drei Niveaus enthalten ausgearbeitete Texte", () => {
  for (const module of modules) {
    expect(module.review).toBe("awaiting-expert-review");
    for (const level of levels) {
      const content = module.levels[level];
      for (const field of [
        "introduction",
        "explanation",
        "connections",
        "example",
        "summary",
        "deepening",
      ] as const)
        expect(content[field].length).toBeGreaterThan(100);
      expect(content.mistakes.length).toBeGreaterThanOrEqual(2);
    }
    expect(
      new Set(levels.map((level) => module.levels[level].explanation)).size,
    ).toBe(3);
    for (const [ids, catalog] of [
      [module.formulaIds, formulas],
      [module.objectiveIds, objectives],
      [module.sourceIds, sources],
      [module.termIds, terms],
      [module.questionIds, academyQuestions],
      [module.cardIds, flashcards],
    ] as const)
      for (const id of ids)
        expect(catalog.some((item) => item.id === id)).toBe(true);
    for (const id of module.questionIds)
      expect(
        academyQuestions.find((question) => question.id === id)?.moduleId,
      ).toBe(module.id);
    for (const id of module.cardIds)
      expect(flashcards.find((card) => card.id === id)?.moduleId).toBe(
        module.id,
      );
  }
  for (const entity of [...formulas, ...academyQuestions, ...flashcards])
    for (const id of entity.sourceIds)
      expect(sources.some((source) => source.id === id)).toBe(true);
  for (const question of academyQuestions) {
    expect(new Set(question.options.map((option) => option.id)).size).toBe(
      question.options.length,
    );
    expect(
      question.options.filter(
        (option) => option.id === question.correctOptionId,
      ),
    ).toHaveLength(1);
    expect(question.explanation.length).toBeGreaterThan(80);
    expect(
      modules.find((module) => module.id === question.moduleId)?.objectiveIds,
    ).toContain(question.objectiveId);
  }
});
it("kennzeichnet Quellenzugriff ehrlich und hält das Modell numerisch konsistent", () => {
  expect(
    sources
      .filter((source) => source.url)
      .every(
        (source) =>
          source.access === "unavailable" ||
          (source.access === "consulted" &&
            !!source.locator &&
            !!source.reviewedCommit),
      ),
  ).toBe(true);
  const {
    massFlowKgS: mass,
    enthalpyKjKg: { h1, h2, h3, h4 },
    expectedKw,
  } = workedCycle;
  expect(mass * (h1 - h4)).toBeCloseTo(expectedKw.evaporator);
  expect(mass * (h2 - h1)).toBeCloseTo(expectedKw.compressorFluid);
  expect(mass * (h2 - h3)).toBeCloseTo(expectedKw.condenser);
  expect(expectedKw.evaporator + expectedKw.compressorFluid).toBeCloseTo(
    expectedKw.condenser,
  );
});
