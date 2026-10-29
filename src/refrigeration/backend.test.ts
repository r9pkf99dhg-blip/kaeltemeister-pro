import { it, expect } from "vitest";
import {
  referenceBackend,
  referenceProof,
  validateCase,
  validateDrawing,
} from "./backend";
import { refrigerationCases } from "./data";
it("lädt alle acht geprüften Fälle ohne freien Zustandssolver und liefert echte vier Zustände", () => {
  expect(referenceProof()).toEqual({
    ok: true,
    cases: 8,
    states: 32,
    failures: [],
  });
  for (const c of refrigerationCases) {
    expect(referenceBackend.case(c.id).ok).toBe(true);
    for (let i = 1; i <= 4; i++)
      expect(referenceBackend.state(c.id, i)).toEqual({
        ok: true,
        value: c.points[i - 1],
      });
  }
});
it("weist unbekannte Fälle, Zustände, freie PH-Abfragen und Diagrammlücken ausdrücklich ab", () => {
  expect(referenceBackend.case("unknown").ok).toBe(false);
  for (const n of [0, 5, NaN, 1.5])
    expect(referenceBackend.state(refrigerationCases[0].id, n).ok).toBe(false);
  expect(referenceBackend.query({ p: 100000, h: 400000 }).ok).toBe(false);
  expect(
    validateDrawing([
      { p: 0, h: 2 },
      { p: 1, h: 3 },
    ]),
  ).toBe(false);
  expect(
    validateDrawing([
      { p: 1, h: NaN },
      { p: 1, h: 3 },
    ]),
  ).toBe(false);
});
it.each([
  "nan",
  "negative-pressure",
  "critical",
  "phase",
  "pressure-ratio",
  "enthalpy",
  "efficiency",
  "entropy",
])("keine stille Darstellung eines korrupten Falls: %s", (kind) => {
  const c = structuredClone(refrigerationCases[0]);
  switch (kind) {
    case "nan":
      c.points[0].h = NaN;
      break;
    case "negative-pressure":
      c.points[0].p = -1;
      break;
    case "critical":
      c.points[1].p = 5e6;
      break;
    case "phase":
      c.points[3].quality = null;
      break;
    case "pressure-ratio":
      c.points[1].p = c.points[0].p;
      break;
    case "enthalpy":
      c.points[3].h += 1;
      break;
    case "efficiency":
      c.etaIs = 1.5;
      break;
    case "entropy":
      c.isentropicOutlet.s += 10;
  }
  expect(validateCase(c).ok).toBe(false);
});
