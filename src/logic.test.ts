import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  calculateHeat,
  emptyProgress,
  loadProgress,
  parseDecimal,
  STORAGE_KEY,
} from "./logic";
import { articles, questions } from "./content";

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
describe("Wärmeleistungsrechnung", () => {
  it("berechnet das Wasserbeispiel in kW", () =>
    expect(calculateHeat(0.5, 4.18, 5, "kg/s", "kJ/(kg·K)").kw).toBeCloseTo(
      10.45,
    ));
  it("rechnet kg/h und J korrekt um", () => {
    const result = calculateHeat(1800, 4180, 5, "kg/h", "J/(kg·K)");
    expect(result).toEqual({ massKgS: 0.5, cpKj: 4.18, kw: 10.45 });
  });
  it("erlaubt Nullleistung", () =>
    expect(calculateHeat(0, 4.18, 5, "kg/s", "kJ/(kg·K)").kw).toBe(0));
  it.each([
    [NaN, 4, 5],
    [-1, 4, 5],
    [1, 0, 5],
    [1, 4, -5],
    [Infinity, 4, 5],
    [1e308, 4, 5],
  ])("weist ungültige Eingaben zurück (%s, %s, %s)", (mass, cp, delta) =>
    expect(() => calculateHeat(mass, cp, delta, "kg/s", "kJ/(kg·K)")).toThrow(),
  );
  it("versteht Dezimalkomma und Punkt", () => {
    expect(parseDecimal("0,5")).toBe(0.5);
    expect(parseDecimal(" 4.18 ")).toBe(4.18);
  });
  it.each(["", " ", "2x", "1,2,3", "Infinity", "1.000,5"])(
    "weist unklare Eingabe %s zurück",
    (value) => expect(parseDecimal(value)).toBeNaN(),
  );
});
describe("Lokaler Fortschritt", () => {
  it("beginnt ohne gespeicherte Daten bei null", () =>
    expect(loadProgress()).toEqual(emptyProgress));
  it("liest gespeicherten Fortschritt", () => {
    const p = { read: ["kreislauf"], best: 75, attempts: 2, last: 50 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    expect(loadProgress()).toEqual(p);
  });
  it("verkraftet beschädigte Daten", () => {
    localStorage.setItem(STORAGE_KEY, "{");
    expect(loadProgress()).toEqual(emptyProgress);
  });
  it("bereinigt unbekannte Artikel und fehlerhafte Zahlen", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        read: ["kreislauf", "kreislauf", "x", 1],
        best: 999,
        attempts: -1,
        last: "x",
      }),
    );
    expect(loadProgress()).toEqual({
      read: ["kreislauf"],
      best: 100,
      attempts: 0,
      last: null,
    });
  });
  it("funktioniert bei gesperrtem Browserspeicher", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(loadProgress()).toEqual(emptyProgress);
  });
});
it("hat mindestens zehn eindeutige Fragen mit gültigen Lösungen und Erklärungen", () => {
  expect(questions.length).toBeGreaterThanOrEqual(10);
  expect(new Set(questions.map((q) => q.question)).size).toBe(questions.length);
  for (const q of questions) {
    expect(q.options).toHaveLength(4);
    expect(q.options[q.correct]).toBeTruthy();
    expect(q.explanation.length).toBeGreaterThan(20);
  }
  expect(articles).toHaveLength(3);
});
