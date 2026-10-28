import { expect, it } from "vitest";
import { deepClaims } from "../academy/deep/claims";
import { deepSources, sourceEvaluations } from "../academy/deep/sources";
import { math_formulas } from "../academy/deep/math-formulas";
import { electrical_formulas } from "../academy/deep/electrical-formulas";
import { thermal_formulas } from "../academy/deep/thermal-formulas";
import { math_tasks } from "../academy/deep/math-tasks";
import { electrical_tasks } from "../academy/deep/electrical-tasks";
import { thermal_tasks } from "../academy/deep/thermal-tasks";
import { modules, sources } from "../academy/catalog";
import { competencyGraph } from "../academy/deep/graph";
it("jede neue Formel und jeder Zahlenfall besitzen eine nachvollziehbare Aussage mit begrenztem Prüfumfang", () => {
  const ids = new Set(deepClaims.map((c) => c.id));
  expect(ids.size).toBe(deepClaims.length);
  for (const item of [
    ...math_formulas,
    ...electrical_formulas,
    ...thermal_formulas,
    ...math_tasks,
    ...electrical_tasks,
    ...thermal_tasks,
  ])
    expect(ids.has(`claim-${item.id}`)).toBe(true);
  for (const c of deepClaims) {
    expect(c.humanReview).toBeNull();
    expect(c.checks).not.toContain("approved");
    expect(c.checks).toContain("humanRequired");
    expect(c.assumptions.length).toBeGreaterThan(10);
    expect(c.limitations.length).toBeGreaterThan(50);
    expect(c.section.length).toBeGreaterThan(30);
    for (const id of c.moduleIds)
      expect(modules.some((m) => m.id === id)).toBe(true);
    const source = sources.find((s) => s.id === c.sourceId);
    expect(source).toBeTruthy();
    if (c.checks.includes("sourced")) expect(source!.access).toBe("consulted");
  }
});
it("unzugängliche Primärquellen bleiben offen und Quellen sind nach Eignung statt nur Linkzahl bewertet", () => {
  expect(deepSources.filter((s) => s.access === "unavailable")).toHaveLength(5);
  for (const s of deepSources) {
    expect(sourceEvaluations.some((e) => e.sourceId === s.id)).toBe(true);
    if (s.access === "consulted") {
      expect(s.reviewedCommit).toMatch(/^[0-9a-f]{40}$/);
      expect(s.locator).toBeTruthy();
    }
  }
  const graph = competencyGraph();
  expect(graph.every((c) => c.taskIds.length > 0)).toBe(true);
  expect(
    graph.find((c) => c.id === "competency-three-phase")?.formulaIds,
  ).toContain("ac-three-power");
});
