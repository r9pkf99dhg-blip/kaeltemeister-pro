import type { NumericTask } from "./model";
import type { CalculationKind, Quantity } from "../../technical/calculations";
type Given = NumericTask["givens"][number];
const g = (
  id: string,
  label: string,
  value: number,
  unit: string,
  quantity: Quantity,
): Given => ({ id, label, value, unit, quantity });
const voltage = (n: number) => g("voltage", "Spannung", n, "V", "voltage");
const current = (n: number, unit = "A") =>
  g("current", "Stromstärke", n, unit, "current");
const resistance = (n: number, unit = "Ω") =>
  g("resistance", "Widerstand", n, unit, "resistance");
const time = (n: number, unit: string) =>
  g("time", "Zeitspanne", n, unit, "time");
const rows: {
  id: string;
  module: string;
  title: string;
  calculation: CalculationKind;
  quantity: Quantity;
  unit: string;
  givens: Given[];
  steps: string[];
}[] = [
  {
    id: "el-current-charge-a",
    module: "electric-quantities",
    title: "Ladungstransport einer Steuerlast",
    calculation: "charge-current",
    quantity: "current",
    unit: "A",
    givens: [g("charge", "Ladungsmenge", 2, "C", "charge"), time(10, "s")],
    steps: ["I = ΔQ / Δt.", "I = 2 C / 10 s = 0,2 A = 200 mA."],
  },
  {
    id: "el-current-charge-b",
    module: "electric-quantities",
    title: "Mittlerer Steuerstrom über eine Minute",
    calculation: "charge-current",
    quantity: "current",
    unit: "mA",
    givens: [g("charge", "Ladungsmenge", 18, "C", "charge"), time(1, "min")],
    steps: ["1 min = 60 s.", "I = 18 C / 60 s = 0,3 A = 300 mA."],
  },
  {
    id: "el-ohm-current-a",
    module: "electric-uir",
    title: "Strom einer ohmschen Steuerlast",
    calculation: "ohm-current",
    quantity: "current",
    unit: "A",
    givens: [voltage(24), resistance(120)],
    steps: ["I = U/R.", "I = 24 V / 120 Ω = 0,2 A."],
  },
  {
    id: "el-ohm-current-b",
    module: "electric-uir",
    title: "Kiloohm und Milliampere",
    calculation: "ohm-current",
    quantity: "current",
    unit: "mA",
    givens: [voltage(12), resistance(1.2, "kΩ")],
    steps: ["1,2 kΩ = 1200 Ω.", "I = 12/1200 = 0,01 A = 10 mA."],
  },
  {
    id: "el-ohm-voltage-a",
    module: "electric-ohm",
    title: "Spannung am Ersatzwiderstand",
    calculation: "ohm-voltage",
    quantity: "voltage",
    unit: "V",
    givens: [resistance(240), current(100, "mA")],
    steps: ["100 mA = 0,1 A.", "U = R × I = 240 Ω × 0,1 A = 24 V."],
  },
  {
    id: "el-ohm-voltage-b",
    module: "electric-ohm",
    title: "Spannung bei kleiner Last",
    calculation: "ohm-voltage",
    quantity: "voltage",
    unit: "V",
    givens: [resistance(2.2, "kΩ"), current(5, "mA")],
    steps: ["2,2 kΩ = 2200 Ω; 5 mA = 0,005 A.", "U = 2200 × 0,005 = 11 V."],
  },
  {
    id: "el-ohm-resistance-a",
    module: "electric-ohm",
    title: "Widerstand einer fiktiven Steuerlast",
    calculation: "ohm-resistance",
    quantity: "resistance",
    unit: "Ω",
    givens: [voltage(24), current(0.2)],
    steps: ["R = U/I.", "R = 24 V / 0,2 A = 120 Ω."],
  },
  {
    id: "el-ohm-resistance-b",
    module: "electric-ohm",
    title: "Widerstand aus Milliampere",
    calculation: "ohm-resistance",
    quantity: "resistance",
    unit: "kΩ",
    givens: [voltage(12), current(10, "mA")],
    steps: ["10 mA = 0,01 A.", "R = 12/0,01 = 1200 Ω = 1,2 kΩ."],
  },
  {
    id: "el-power-a",
    module: "electric-work",
    title: "Gleichstromleistung einer Modellsteuerung",
    calculation: "dc-power",
    quantity: "power",
    unit: "W",
    givens: [voltage(24), current(0.5)],
    steps: ["P = U × I.", "P = 24 V × 0,5 A = 12 W."],
  },
  {
    id: "el-power-b",
    module: "electric-work",
    title: "Leistung einer kleinen Modelllast",
    calculation: "dc-power",
    quantity: "power",
    unit: "W",
    givens: [voltage(12), current(50, "mA")],
    steps: ["50 mA = 0,05 A.", "P = 12 × 0,05 = 0,6 W."],
  },
  {
    id: "el-energy-a",
    module: "electric-work",
    title: "Arbeit der Modellsteuerung",
    calculation: "electric-energy",
    quantity: "energy",
    unit: "Wh",
    givens: [
      g("power", "Konstante Wirkleistung", 12, "W", "power"),
      time(2, "h"),
    ],
    steps: [
      "2 h = 7200 s.",
      "E = 12 W × 7200 s = 86400 J.",
      "86400/3600 = 24 Wh = 0,024 kWh.",
    ],
  },
  {
    id: "el-energy-b",
    module: "electric-work",
    title: "Arbeit eines fiktiven Begleitheizers",
    calculation: "electric-energy",
    quantity: "energy",
    unit: "kWh",
    givens: [
      g("power", "Konstante Wirkleistung", 150, "W", "power"),
      time(30, "min"),
    ],
    steps: [
      "30 min = 1800 s.",
      "E = 150 × 1800 = 270000 J.",
      "270000/3600000 = 0,075 kWh = 75 Wh.",
    ],
  },
  {
    id: "el-series-a",
    module: "electric-circuits",
    title: "Zwei Modellwiderstände in Reihe",
    calculation: "series-resistance",
    quantity: "resistance",
    unit: "Ω",
    givens: [
      g("r1", "Widerstand 1", 120, "Ω", "resistance"),
      g("r2", "Widerstand 2", 240, "Ω", "resistance"),
    ],
    steps: [
      "Rges = R₁ + R₂.",
      "Rges = 120 Ω + 240 Ω = 360 Ω; größer als beide Einzelwerte.",
    ],
  },
  {
    id: "el-series-b",
    module: "electric-circuits",
    title: "Reihenschaltung mit Kiloohm",
    calculation: "series-resistance",
    quantity: "resistance",
    unit: "kΩ",
    givens: [
      g("r1", "Widerstand 1", 1, "kΩ", "resistance"),
      g("r2", "Widerstand 2", 2.2, "kΩ", "resistance"),
    ],
    steps: [
      "1 kΩ = 1000 Ω; 2,2 kΩ = 2200 Ω.",
      "Rges = 1000 + 2200 = 3200 Ω = 3,2 kΩ.",
    ],
  },
  {
    id: "el-parallel-a",
    module: "electric-circuits",
    title: "Zwei Modellwiderstände parallel",
    calculation: "parallel-resistance",
    quantity: "resistance",
    unit: "Ω",
    givens: [
      g("r1", "Widerstand 1", 120, "Ω", "resistance"),
      g("r2", "Widerstand 2", 240, "Ω", "resistance"),
    ],
    steps: [
      "1/Rges = 1/120 + 1/240 = 3/240.",
      "Rges = 240/3 = 80 Ω; kleiner als 120 Ω.",
    ],
  },
  {
    id: "el-parallel-b",
    module: "electric-circuits",
    title: "Gleiche Widerstände parallel",
    calculation: "parallel-resistance",
    quantity: "resistance",
    unit: "Ω",
    givens: [
      g("r1", "Widerstand 1", 100, "Ω", "resistance"),
      g("r2", "Widerstand 2", 100, "Ω", "resistance"),
    ],
    steps: [
      "1/Rges = 1/100 + 1/100 = 2/100.",
      "Rges = 50 Ω; zwei gleiche parallele Widerstände halbieren den Ersatzwert.",
    ],
  },
];
const sought: Record<string, string> = {
  current: "Stromstärke",
  voltage: "Spannung",
  resistance: "Widerstand",
  power: "Elektrische Leistung",
  energy: "Elektrische Arbeit",
};
const formula: Partial<Record<CalculationKind, string>> = {
  "charge-current": "electric-current-charge",
  "ohm-current": "ohm-current",
  "ohm-voltage": "ohm-voltage",
  "ohm-resistance": "ohm-resistance",
  "dc-power": "dc-electric-power",
  "electric-energy": "electric-energy",
  "series-resistance": "series-resistance",
  "parallel-resistance": "parallel-resistance",
};
export const electricalTasks: NumericTask[] = rows.map((r, i) => ({
  id: r.id,
  revision: 1,
  kind: "numeric",
  topicId: r.module,
  domainId: "elektro",
  level: i % 2 === 0 ? "grundlagen" : "fachkraft",
  title: r.title,
  prompt: `Fiktiver Lernfall aus einer idealisierten Steuerungsumgebung: Berechne ${sought[r.quantity]}. Die vorgegebenen Werte sind keine Hersteller- oder Auslegungsdaten.`,
  article: { kind: "module", id: r.module },
  formulaId: formula[r.calculation],
  calculation: r.calculation,
  givens: r.givens,
  sought: sought[r.quantity],
  quantity: r.quantity,
  answerUnit: r.unit,
  absoluteToleranceSI: r.quantity === "energy" ? 1 : 0.000001,
  relativeTolerance: 0.005,
  sourceIds: [
    "didactic-exercises",
    r.calculation === "charge-current"
      ? "openstax-current-github"
      : ["dc-power", "electric-energy"].includes(r.calculation)
        ? "openstax-electric-github"
        : r.calculation.includes("resistance") &&
            r.module === "electric-circuits"
          ? "openstax-circuits-github"
          : "openstax-ohm-github",
  ],
  hint: "Wähle die gesuchte Größe, rechne in SI um und verwende die angegebene Grundbeziehung.",
  steps: r.steps,
  mistakes: [
    "Milli-, Kilo- oder Zeitfaktoren bei der Umrechnung vergessen.",
    r.calculation === "parallel-resistance"
      ? "Kehrwertbildung am Ende vergessen oder Parallelwerte addieren."
      : "Die Formel falsch umstellen oder Ergebnis ohne passende Einheit angeben.",
  ],
  assumptions:
    "Positive Beträge; ideale, konstante ohmsche Widerstände bzw. konstante Gleichstrom-/Wirkleistung über das Intervall. Keine Verlust- oder Einschaltmodelle. Nur rechnerische Übung, keine praktischen Arbeiten oder Schutzdimensionierung.",
  review: "calculation-tested-expert-review-pending",
}));
