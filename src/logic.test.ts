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
  expect(articles.length).toBeGreaterThan(0);
});

describe("Zusätzliche Grenzfälle des Rechners", () => {
  it.each([
    ["kg/h", "kJ/(kg·K)", 1800, 4.18],
    ["kg/s", "J/(kg·K)", 0.5, 4180],
  ])(
    "rechnet auch gemischte Einheiten %s und %s um",
    (massUnit, cpUnit, mass, cp) => {
      expect(calculateHeat(mass, cp, 5, massUnit, cpUnit).kw).toBeCloseTo(
        10.45,
      );
    },
  );
  it("liefert bei gleicher Temperatur Nullleistung", () => {
    expect(calculateHeat(1, 4.18, 0, "kg/s", "kJ/(kg·K)").kw).toBe(0);
  });
  it.each([
    ["l/s", "kJ/(kg·K)"],
    ["kg/s", "kWh/(kg·K)"],
    ["", ""],
  ])("weist unbekannte Einheiten %s / %s zurück", (massUnit, cpUnit) => {
    expect(() => calculateHeat(1, 4, 5, massUnit, cpUnit)).toThrow(
      "unterstützte Einheiten",
    );
  });
  it("weist auch einen Überlauf bei der Umrechnung in Watt zurück", () => {
    expect(() => calculateHeat(1e306, 1, 1, "kg/s", "kJ/(kg·K)")).toThrow(
      "zu groß",
    );
  });
});

describe("Robustheit gespeicherter Daten", () => {
  it.each([
    "null",
    "42",
    '"alt"',
    "[]",
    '{"read":null}',
    '{"read":{},"attempts":1.5}',
  ])("verträgt unerwartete Daten: %s", (raw) => {
    localStorage.setItem(STORAGE_KEY, raw);
    expect(loadProgress()).toEqual(emptyProgress);
  });
  it("erhält gültige IDs aller aktuellen Artikel ohne eine zweite ID-Liste", () => {
    const read = articles.map((article) => article.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ read }));
    expect(loadProgress().read).toEqual(read);
  });
  it("begrenzt Prozentwerte und weist unsichere Versuchszähler zurück", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        best: -5,
        last: 103,
        attempts: Number.MAX_SAFE_INTEGER + 1,
      }),
    );
    expect(loadProgress()).toEqual({ ...emptyProgress, best: 0, last: 100 });
  });
});

it("stellt eindeutige, vollständige Artikel und eindeutige Antwortmöglichkeiten bereit", () => {
  expect(new Set(articles.map((article) => article.id)).size).toBe(
    articles.length,
  );
  for (const article of articles) {
    expect(article.id).toMatch(/^[a-z0-9-]+$/);
    expect(article.minutes).toBeGreaterThan(0);
    expect(article.sections.length).toBeGreaterThan(0);
    for (const section of article.sections) {
      expect(section.title.trim()).not.toBe("");
      expect(section.text.trim()).not.toBe("");
    }
    expect(article.takeaway.trim()).not.toBe("");
  }
  for (const question of questions) {
    expect(Number.isInteger(question.correct)).toBe(true);
    expect(question.correct).toBeGreaterThanOrEqual(0);
    expect(question.correct).toBeLessThan(question.options.length);
    expect(new Set(question.options).size).toBe(question.options.length);
  }
});
it("sperrt automatische Speicherung beschädigter Altbestände, ohne Originale zu ändern", async () => {
  const { readProgress } = await import("./logic");
  for (const raw of ["{", '{"read":[],"attempts":"1","best":0,"last":null}']) {
    localStorage.setItem(STORAGE_KEY, raw);
    expect(readProgress().readFailed).toBe(true);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(raw);
  }
});
