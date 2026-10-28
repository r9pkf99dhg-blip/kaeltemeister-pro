import type { Formula } from "../academy/model";
export const labFormulas: Formula[] = [
  {
    id: "lab-heat-cp",
    title: "Spezifische Wärmekapazität aus Wärmeleistung",
    expression: "cp = Q̇/(ṁ ΔT)",
    tex: String.raw`c_p=\frac{\dot Q}{\dot m\Delta T}`,
    units: "J/(kg·K)",
    assumptions:
      "Stationärer sensibler Betrag, Q̇, ṁ und ΔT positiv, cp konstant, kein Phasenwechsel.",
    sourceIds: ["openstax-thermal-v06"],
    variables: [
      {
        symbol: "c_p",
        meaning: "spezifische Wärmekapazität",
        unit: "J/(kg·K)",
      },
      {
        symbol: String.raw`\dot Q`,
        meaning: "Wärmeleistungsbetrag",
        unit: "W",
      },
      { symbol: String.raw`\dot m`, meaning: "Massenstrom", unit: "kg/s" },
      {
        symbol: String.raw`\Delta T`,
        meaning: "Temperaturdifferenzbetrag",
        unit: "K",
      },
    ],
  },
  {
    id: "lab-dc-i2r",
    title: "Ohmsche Gleichstromleistung über Strom",
    expression: "P = I² R",
    tex: "P=I^2R",
    units: "W",
    assumptions:
      "Stationäres ohmsches Gleichstrommodell, R > 0; keine Bauteil-/Schutzdimensionierung.",
    sourceIds: ["openstax-electric-github", "openstax-ohm-github"],
    variables: [
      { symbol: "P", meaning: "Wirkleistung", unit: "W" },
      { symbol: "I", meaning: "Gleichstrom", unit: "A" },
      { symbol: "R", meaning: "ohmscher Widerstand", unit: "Ω" },
    ],
  },
  {
    id: "lab-dc-u2r",
    title: "Ohmsche Gleichstromleistung über Spannung",
    expression: "P = U²/R",
    tex: String.raw`P=\frac{U^2}R`,
    units: "W",
    assumptions: "Stationäres ohmsches Gleichstrommodell, R > 0.",
    sourceIds: ["openstax-electric-github", "openstax-ohm-github"],
    variables: [
      { symbol: "P", meaning: "Wirkleistung", unit: "W" },
      { symbol: "U", meaning: "Gleichspannung", unit: "V" },
      { symbol: "R", meaning: "ohmscher Widerstand", unit: "Ω" },
    ],
  },
  {
    id: "lab-cylinder-total",
    title: "Geschlossene Vollzylinderoberfläche",
    expression: "A = πdL + πd²/2",
    tex: String.raw`A=\pi dL+2\frac{\pi d^2}{4}`,
    units: "m²",
    assumptions:
      "Gerader geschlossener Vollzylinder, Mantel plus zwei Kreisflächen. Kein offenes Rohr und keine hydraulische Auslegung.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      { symbol: "A", meaning: "gesamte geometrische Oberfläche", unit: "m²" },
      { symbol: "d", meaning: "Vollzylinderdurchmesser", unit: "m" },
      { symbol: "L", meaning: "Zylinderlänge", unit: "m" },
    ],
  },
  {
    id: "lab-capacitive-q",
    title: "Kapazitive Blindleistung im Sinusmodell",
    expression: "Q = −UI√(1−cos²φ)",
    tex: String.raw`Q=-U_\mathrm{eff}I_\mathrm{eff}\sqrt{1-\cos^2\varphi}`,
    units: "var",
    assumptions:
      "Passive reine Sinusgrößen, kapazitiver voreilender Strom, −90° ≤ φ ≤ 0°. cos φ von 0 bis 1; Q induktiv positiv, kapazitiv negativ. Keine Oberwellenverallgemeinerung.",
    sourceIds: ["openstax-ac-v06"],
    variables: [
      { symbol: "Q", meaning: "kapazitive Blindleistung", unit: "var" },
      {
        symbol: String.raw`U_\mathrm{eff},I_\mathrm{eff}`,
        meaning: "Effektivspannung und -strom",
        unit: "V / A",
      },
      {
        symbol: String.raw`\varphi`,
        meaning: "Verschiebungswinkel (Strom nacheilend positiv)",
        unit: "rad",
      },
    ],
  },
];
