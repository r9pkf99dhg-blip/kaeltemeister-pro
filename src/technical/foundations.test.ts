import { expect, it } from "vitest";
import { calculateSchool, parseSchoolAnswer } from "./foundations";
import { gradeSnapshot, snapshotItem } from "../academy/exercises/engine";
import { mathematicsTasks } from "../academy/foundations/tasks";
import { validateProgress, emptyAcademy } from "../academy/progress";
import { rearrangementCases } from "../academy/foundations/trainer-data";
it("rechnet unabhängige Vorzeichen-, Bruch-, Prozent-, Gleichungs- und Wurzelreferenzen", () => {
  expect(calculateSchool("math-order", { a: -8, b: 3, c: 4 })).toBe(4);
  expect(
    calculateSchool("math-fraction-subtract", { n1: 1, d1: 4, n2: 3, d2: 4 }),
  ).toBe(-0.5);
  expect(calculateSchool("math-percent-value", { base: 200, rate: 0.15 })).toBe(
    30,
  );
  expect(calculateSchool("math-linear", { a: 2, b: 5, c: -3 })).toBe(-4);
  expect(calculateSchool("math-root", { value: 0.81 })).toBe(0.9);
});
it.each(["1/0", "1/2/3", "1e3", "1.000,5", "Infinity", "abc"])(
  "weist unklare Schulantwort %s zurück",
  (v) => expect(parseSchoolAnswer(v)).toBeNaN(),
);
it("akzeptiert einfache Brüche und negative Antworten nur für mathematische Zahlen", () => {
  expect(parseSchoolAnswer(" -1 / 2 ")).toBe(-0.5);
  expect(parseSchoolAnswer("0,75")).toBe(0.75);
  const task = mathematicsTasks.find((t) => t.id === "math-fraction-sub-a")!;
  expect(
    gradeSnapshot(snapshotItem(task), { value: "-1/2", unit: "1" }).correct,
  ).toBe(true);
  expect(
    validateProgress({
      ...emptyAcademy(),
      exerciseAnswers: {
        [task.id]: {
          revision: 1,
          answer: { value: "-1/2", unit: "1" },
          correct: true,
          answeredAt: new Date().toISOString(),
        },
      },
    }),
  ).toBe(true);
});
it("weist Nullnenner, nicht endliche Werte und nicht reelle Wurzeln zurück", () => {
  expect(() => calculateSchool("math-linear", { a: 0, b: 1, c: 2 })).toThrow();
  expect(() => calculateSchool("math-root", { value: -1 })).toThrow();
  expect(() =>
    calculateSchool("math-power", { base: 0, exponent: -1 }),
  ).toThrow();
  expect(() =>
    calculateSchool("math-power", { base: 0, exponent: 0 }),
  ).toThrow();
  expect(() =>
    calculateSchool("math-order", { a: Infinity, b: 2, c: 3 }),
  ).toThrow();
});
it("sichert sämtliche im Umstellungstrainer verwendeten Proben unabhängig ab", () => {
  expect(rearrangementCases).toHaveLength(15);
  expect(120 * 0.2).toBe(24);
  expect(24 * 2).toBe(48);
  expect(1 * 4180 * 10).toBe(41800);
  expect(600 / 0.003).toBe(200000);
  expect(8 / 0.01).toBe(800);
});
