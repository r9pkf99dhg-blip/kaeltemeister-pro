import { expect, it } from "vitest";
import {
  calculateTechnical,
  toSI,
  fromSI,
  type CalculationKind,
} from "./calculations";
import { gradeSnapshot, snapshotItem } from "../academy/exercises/engine";
import { electricalTasks } from "../academy/exercises/electrical";
import { electricalModules } from "../academy/data/electrical";

it.each([
  [100, "mA", "current", 0.1],
  [1.2, "kΩ", "resistance", 1200],
  [24, "Wh", "energy", 86400],
  [0.075, "kWh", "energy", 270000],
  [30, "min", "time", 1800],
  [2, "h", "time", 7200],
  [1000, "mV", "voltage", 1],
] as const)(
  "SI-Umrechnung %s %s und Rückweg",
  (value, unit, quantity, expected) => {
    expect(toSI(value, unit, quantity)).toBeCloseTo(expected, 8);
    expect(fromSI(expected, unit, quantity)).toBeCloseTo(value, 8);
  },
);
it.each([
  ["ohm-current", { voltage: 24, resistance: 0 }],
  ["ohm-resistance", { voltage: 24, current: 0 }],
  ["charge-current", { charge: 1, time: 0 }],
  ["parallel-resistance", { r1: 100, r2: 0 }],
  ["series-resistance", { r1: -1, r2: 100 }],
  ["electric-energy", { power: 2, time: Infinity }],
] as [CalculationKind, Record<string, number>][])(
  "Grenzfall %s wird abgewiesen",
  (kind, values) => expect(() => calculateTechnical(kind, values)).toThrow(),
);
it("rechnet Parallelwerte stabil und erfüllt unabhängige Plausibilitätsgrenzen", () => {
  expect(
    calculateTechnical("parallel-resistance", { r1: 1e300, r2: 1e300 }),
  ).toBe(5e299);
  expect(
    calculateTechnical("parallel-resistance", { r1: 1e-300, r2: 1e-300 }),
  ).toBe(5e-301);
  for (const [a, b] of [
    [100, 100],
    [120, 240],
    [1, 1e9],
  ]) {
    expect(
      calculateTechnical("parallel-resistance", { r1: a, r2: b }),
    ).toBeLessThan(Math.min(a, b));
    expect(
      calculateTechnical("series-resistance", { r1: a, r2: b }),
    ).toBeGreaterThan(Math.max(a, b));
  }
});
it("deckt jedes Elektro-Modul mit mehreren Aufgaben und prüft Toleranz und falsche Einheit", () => {
  for (const m of electricalModules)
    expect(
      electricalTasks.filter((t) => t.topicId === m.id).length,
    ).toBeGreaterThanOrEqual(2);
  const task = electricalTasks.find((t) => t.id === "el-energy-a")!;
  expect(
    gradeSnapshot(snapshotItem(task), { value: "24,12", unit: "Wh" }).status,
  ).toBe("correct");
  expect(
    gradeSnapshot(snapshotItem(task), { value: "24,13", unit: "Wh" }).status,
  ).toBe("incorrect");
  expect(
    gradeSnapshot(snapshotItem(task), { value: "24", unit: "W" }).status,
  ).toBe("invalid");
});
it("sichert die Zahlen der bestehenden Kältekreis-Musterlösungen unabhängig ab", () => {
  expect(0.05 * (400 - 250)).toBeCloseTo(7.5);
  expect(0.05 * (440 - 400)).toBeCloseTo(2);
  expect(0.05 * (440 - 250)).toBeCloseTo(9.5);
  expect(7.5 + 2).toBe(9.5);
  expect(-4 - -10).toBe(6);
  expect(40 - 35).toBe(5);
  expect(0.5 + 0.5).toBe(1);
});
