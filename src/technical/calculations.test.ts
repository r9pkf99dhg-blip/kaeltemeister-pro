import { describe, expect, it } from "vitest";
import { calculateTechnical, fromSI, toSI } from "./calculations";
import { numericTasks, learningNotes } from "../academy/exercises/data";
import {
  expectedSI,
  gradeSnapshot,
  snapshotItem,
} from "../academy/exercises/engine";
import { domains, formulas, modules } from "../academy/catalog";
import { calculateHeat } from "../logic";

// Unabhängig vorgegebene Referenzergebnisse, nicht mit der Produktfunktion erzeugt.
const references: Record<string, number> = {
  "calc-heat-water": 10450,
  "calc-mass-flow": 0.5,
  "calc-temperature-difference": 6,
  "calc-superheat": 6,
  "calc-subcooling": 5,
  "calc-electric-dc": 48,
  "calc-cooling-cop": 3,
  "calc-heating-cop": 4,
  "el-current-charge-a": 0.2,
  "el-current-charge-b": 0.3,
  "el-ohm-current-a": 0.2,
  "el-ohm-current-b": 0.01,
  "el-ohm-voltage-a": 24,
  "el-ohm-voltage-b": 11,
  "el-ohm-resistance-a": 120,
  "el-ohm-resistance-b": 1200,
  "el-power-a": 12,
  "el-power-b": 0.6,
  "el-energy-a": 86400,
  "el-energy-b": 270000,
  "el-series-a": 360,
  "el-series-b": 3200,
  "el-parallel-a": 80,
  "el-parallel-b": 50,
  "math-order-a":4,"math-order-b":2,
  "math-fraction-add-a":.75,"math-fraction-sub-a":-.5,"math-fraction-mul-a":.5,"math-fraction-div-a":5/6,
  "math-percent-a":30,"math-percent-b":.15,"math-proportion-a":20,
  "math-term-a":18,"math-term-b":-4,"math-linear-a":6,"math-linear-b":-4,
  "math-rearrange-a":120,"math-rearrange-b":1200,"math-unit-a":1800,"math-unit-b":86400,
  "chemistry-fraction-a":.25,"chemistry-fraction-b":.2,"chemistry-atoms-a":10,"chemistry-atoms-b":6,
  "chemistry-amount-a":.5,"chemistry-amount-b":1,
  "physics-speed-a":3,"physics-speed-b":1,"physics-force-a":10,"physics-force-b":20,
  "physics-work-a":150,"physics-work-b":10,"physics-power-a":20,
  "physics-pressure-a":200000,"physics-pressure-b":50000,"physics-density-a":800,
  "physics-heat-a":41800,"physics-heat-b":20900,
  "math-power-a":8,"math-power-b":.001,"math-root-a":12,"math-root-b":.9,
};
describe("Alle Rechenaufgaben", () => {
  it.each(numericTasks.map((task) => [task.id, task] as const))(
    "%s stimmt mit unabhängigem SI-Referenzwert überein",
    (id, task) => {
      expect(expectedSI(task)).toBeCloseTo(references[id], 8);
      const answer = {
        value: String(
          fromSI(references[id], task.answerUnit, task.quantity),
        ).replace(".", ","),
        unit: task.answerUnit,
      };
      expect(gradeSnapshot(snapshotItem(task), answer).status).toBe("correct");
      expect(formulas.some((formula) => formula.id === task.formulaId)).toBe(
        true,
      );
      expect(domains.some((domain) => domain.id === task.domainId)).toBe(true);
      expect(
        (task.article.kind === "module" ? modules : learningNotes).some(
          (article) => article.id === task.article.id,
        ),
      ).toBe(true);
      expect(task.steps.length).toBeGreaterThan(1);
      expect(task.mistakes.length).toBeGreaterThan(1);
      expect(task.review).toBe("calculation-tested-expert-review-pending");
    },
  );
  it("deckt jede geforderte Aufgabenart ab, ohne eine fehlende Referenz still zu übergehen", () =>
    expect(numericTasks.map((task) => task.id).sort()).toEqual(
      Object.keys(references).sort(),
    ));
  it("akzeptiert äquivalente Leistungseinheiten und kg/h", () => {
    expect(
      gradeSnapshot(snapshotItem(numericTasks[0]), {
        value: "10450",
        unit: "W",
      }).correct,
    ).toBe(true);
    expect(
      gradeSnapshot(snapshotItem(numericTasks[1]), {
        value: "1800",
        unit: "kg/h",
      }).correct,
    ).toBe(true);
    expect(
      gradeSnapshot(snapshotItem(numericTasks[5]), {
        value: "0,048",
        unit: "kW",
      }).correct,
    ).toBe(true);
  });
  it("prüft die Toleranzgrenze und weist einen Einheitenfehler zurück", () => {
    const snapshot = snapshotItem(numericTasks[0]);
    expect(
      gradeSnapshot(snapshot, { value: "10502.25", unit: "W" }).correct,
    ).toBe(true);
    expect(
      gradeSnapshot(snapshot, { value: "10502.26", unit: "W" }).correct,
    ).toBe(false);
    expect(gradeSnapshot(snapshot, { value: "10.45", unit: "W" }).correct).toBe(
      false,
    );
  });
  it.each(["", "abc", "-3", "Infinity", "1e309", "1.000,5"])(
    "behandelt ungültige Eingabe %s sicher",
    (value) => {
      expect(["invalid", "unanswered"]).toContain(
        gradeSnapshot(snapshotItem(numericTasks[0]), { value, unit: "kW" })
          .status,
      );
    },
  );
  it("lehnt unpassende Einheiten ab", () =>
    expect(
      gradeSnapshot(snapshotItem(numericTasks[0]), { value: "10", unit: "K" })
        .status,
    ).toBe("invalid"));
  it("friert die Werte und Lösung eines Aufgaben-Snapshots ein", () => {
    const item = structuredClone(numericTasks[0]);
    const snapshot = snapshotItem(item);
    item.givens[0].value = 999;
    item.steps[0] = "Geändert";
    expect(snapshot.expectedSI).toBe(10450);
    expect(snapshot.item).not.toBe(item);
    expect(
      gradeSnapshot(snapshot, { value: "10,45", unit: "kW" }).correct,
    ).toBe(true);
  });
});
describe("SI-Logik und physikalische Grenzen", () => {
  it("unterscheidet absolute Temperatur und Differenz", () => {
    expect(toSI(-10, "°C", "temperature")).toBeCloseTo(263.15);
    expect(toSI(5, "K", "temperature-difference")).toBe(5);
    expect(() => toSI(5, "°C", "temperature-difference")).toThrow();
    expect(() => toSI(-274, "°C", "temperature")).toThrow();
  });
  it("hält den vorhandenen Rechner konsistent mit der gemeinsamen Engine", () => {
    expect(
      calculateHeat(1800, 4180, 5, "kg/h", "J/(kg·K)").kw * 1000,
    ).toBeCloseTo(
      calculateTechnical("heat", { massFlow: 0.5, cp: 4180, deltaT: 5 }),
    );
  });
  it("weist fehlende Größen, Nullnenner und Überläufe zurück", () => {
    expect(() =>
      calculateTechnical("mass-flow", { heat: 100, cp: 4, deltaT: 0 }),
    ).toThrow();
    expect(() =>
      calculateTechnical("temperature-difference", {
        heat: 100,
        massFlow: 0,
        cp: 4,
      }),
    ).toThrow();
    expect(() =>
      calculateTechnical("cooling-cop", {
        coolingPower: 100,
        electricPower: 0,
      }),
    ).toThrow();
    expect(() =>
      calculateTechnical("dc-power", { voltage: 1e308, current: 1e308 }),
    ).toThrow();
    expect(() => calculateTechnical("heat", {})).toThrow();
    expect(() =>
      calculateTechnical("superheat", {
        vaporTemperature: 260,
        saturationTemperature: 270,
      }),
    ).toThrow();
  });
});
