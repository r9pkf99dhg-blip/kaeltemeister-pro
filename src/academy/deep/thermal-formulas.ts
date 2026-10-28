import type { Formula } from "../model";
export const thermal_formulas: Formula[] = [
  {
    id: "thermo-pressure-abs",
    title: "Absolut- und Überdruck",
    expression: "pabs = pü + pamb",
    tex: "p_\\mathrm{abs}=p_\\mathrm{ü}+p_\\mathrm{amb}",
    units: "Pa",
    assumptions:
      "Gleicher Messort, Umgebungsdruck vorgegeben; numerische Aufgabe positiver Überdruck.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "pabs",
        meaning: "Absolutdruck",
        unit: "Pa",
      },
      {
        symbol: "pü",
        meaning: "Überdruck relativ zur Umgebung",
        unit: "Pa",
      },
      {
        symbol: "pamb",
        meaning: "vorgegebener Umgebungsdruck",
        unit: "Pa",
      },
    ],
  },
  {
    id: "thermo-specific-volume",
    title: "Spezifisches Volumen",
    expression: "v = V/m = 1/ρ",
    tex: "v=\\frac Vm=\\frac1\\rho",
    units: "m³/kg",
    assumptions: "Homogene Dichte, Masse und Volumen positiv.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "v",
        meaning: "spezifisches Volumen",
        unit: "m³/kg",
      },
      {
        symbol: "V",
        meaning: "Volumen",
        unit: "m³",
      },
      {
        symbol: "m",
        meaning: "Masse",
        unit: "kg",
      },
      {
        symbol: "ρ",
        meaning: "Dichte am betrachteten Zustand",
        unit: "kg/m³",
      },
    ],
  },
  {
    id: "thermo-mass-volume",
    title: "Volumenstrom zu Massenstrom",
    expression: "ṁ = ρ V̇",
    tex: "\\dot m=\\rho\\dot V",
    units: "kg/s",
    assumptions:
      "Dichte und Volumenstrom am selben Zustand und Ort, stationär.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "ṁ",
        meaning: "Massenstrom",
        unit: "kg/s",
      },
      {
        symbol: "ρ",
        meaning: "Dichte am selben Zustand und Ort",
        unit: "kg/m³",
      },
      {
        symbol: "V̇",
        meaning: "Betriebsvolumenstrom",
        unit: "m³/s",
      },
    ],
  },
  {
    id: "thermo-latent",
    title: "Latente Energie",
    expression: "Q = m L",
    tex: "Q=mL",
    units: "J",
    assumptions:
      "Vorgegebener Übergangswert L für einen definierten Phasenwechsel; kein realer Stoffwert behauptet.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "Q",
        meaning: "latente Energie als Betrag",
        unit: "J",
      },
      {
        symbol: "m",
        meaning: "umgewandelte Masse",
        unit: "kg",
      },
      {
        symbol: "L",
        meaning: "vorgegebene spezifische Übergangsenergie",
        unit: "J/kg",
      },
    ],
  },
  {
    id: "thermo-conduction",
    title: "Ebene Wärmeleitung",
    expression: "Q̇ = λ A ΔT / d",
    tex: "\\dot Q=\\lambda A\\frac{\\Delta T}{d}",
    units: "W",
    assumptions:
      "Stationär, eindimensional, homogen, ebene Schicht, λ konstant, keine inneren Quellen.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "Q̇",
        meaning: "Wärmestrombetrag",
        unit: "W",
      },
      {
        symbol: "λ",
        meaning: "konstante Wärmeleitfähigkeit",
        unit: "W/(m·K)",
      },
      {
        symbol: "A",
        meaning: "Fläche",
        unit: "m²",
      },
      {
        symbol: "ΔT",
        meaning: "Temperaturdifferenz als Betrag",
        unit: "K",
      },
      {
        symbol: "d",
        meaning: "Schichtdicke",
        unit: "m",
      },
    ],
  },
  {
    id: "thermo-resistance",
    title: "Wärmewiderstand",
    expression: "Rth = d/(λ A)",
    tex: "R_\\mathrm{th}=\\frac d{\\lambda A}",
    units: "K/W",
    assumptions: "Ebene homogene Schicht, d, λ und A positiv.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "Rth",
        meaning: "Wärmewiderstand",
        unit: "K/W",
      },
      {
        symbol: "d",
        meaning: "Dicke",
        unit: "m",
      },
      {
        symbol: "λ",
        meaning: "Wärmeleitfähigkeit",
        unit: "W/(m·K)",
      },
      {
        symbol: "A",
        meaning: "Fläche",
        unit: "m²",
      },
    ],
  },
  {
    id: "thermo-layers",
    title: "Zwei leitende Schichten",
    expression: "Q̇ = A ΔT / (d₁/λ₁ + d₂/λ₂)",
    tex: "\\dot Q=\\frac{A\\Delta T}{d_1/\\lambda_1+d_2/\\lambda_2}",
    units: "W",
    assumptions:
      "Gleiche Fläche, stationär, ideale Kontakte, keine Wärmeübergangswiderstände oder Wärmebrücken.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "d₁, d₂",
        meaning: "Schichtdicken",
        unit: "m",
      },
      {
        symbol: "λ₁, λ₂",
        meaning: "konstante Leitfähigkeiten",
        unit: "W/(m·K)",
      },
      {
        symbol: "A",
        meaning: "gemeinsame Fläche",
        unit: "m²",
      },
      {
        symbol: "ΔT",
        meaning: "Gesamttemperaturdifferenz",
        unit: "K",
      },
      {
        symbol: "Q̇",
        meaning: "Wärmestrombetrag",
        unit: "W",
      },
    ],
  },
  {
    id: "thermo-u",
    title: "Wärmedurchgangskoeffizient",
    expression: "U = 1/(1/αi + d₁/λ₁ + d₂/λ₂ + 1/αa)",
    tex: "U=\\frac1{\\frac1{\\alpha_i}+\\frac{d_1}{\\lambda_1}+\\frac{d_2}{\\lambda_2}+\\frac1{\\alpha_a}}",
    units: "W/(m²·K)",
    assumptions:
      "Ebene stationäre Schichten, vorgegebene positive α- und λ-Werte, keine Feuchte oder Wärmebrücken.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "U",
        meaning: "Wärmedurchgangskoeffizient",
        unit: "W/(m²·K)",
      },
      {
        symbol: "αi, αa",
        meaning: "vorgegebene Wärmeübergangskoeffizienten",
        unit: "W/(m²·K)",
      },
      {
        symbol: "d₁, d₂",
        meaning: "Dicken",
        unit: "m",
      },
      {
        symbol: "λ₁, λ₂",
        meaning: "Leitfähigkeiten",
        unit: "W/(m·K)",
      },
    ],
  },
  {
    id: "thermo-first-law",
    title: "Erster Hauptsatz, geschlossen",
    expression: "ΔU = Q − W",
    tex: "\\Delta U=Q-W",
    units: "J",
    assumptions:
      "Geschlossenes System, Q positiv hinein, W positiv vom System an Umgebung.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "ΔU",
        meaning: "Änderung der inneren Energie",
        unit: "J",
      },
      {
        symbol: "Q",
        meaning: "Wärme hinein positiv",
        unit: "J",
      },
      {
        symbol: "W",
        meaning: "Arbeit vom System nach außen positiv",
        unit: "J",
      },
    ],
  },
  {
    id: "thermo-enthalpy",
    title: "Spezifische Enthalpie",
    expression: "h = u + p v; Q̇₀ = ṁ (h₁ − h₄)",
    tex: "h=u+pv,\\quad\\dot Q_0=\\dot m(h_1-h_4)",
    units: "h J/kg, Q̇ W",
    assumptions:
      "Stationärer Verdampfer ohne Wellenarbeit; vernachlässigte kinetische/potenzielle Änderungen, geeignete Zustandsdaten.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "h, u",
        meaning: "spezifische Enthalpie/innere Energie",
        unit: "J/kg",
      },
      {
        symbol: "p",
        meaning: "Absolutdruck",
        unit: "Pa",
      },
      {
        symbol: "v",
        meaning: "spezifisches Volumen",
        unit: "m³/kg",
      },
      {
        symbol: "ṁ",
        meaning: "Massenstrom",
        unit: "kg/s",
      },
      {
        symbol: "h₁, h₄",
        meaning: "Verdampferaustritts-/Eintrittsenthalpie",
        unit: "J/kg",
      },
      {
        symbol: "Q̇₀",
        meaning: "Wärmeaufnahmeleistung",
        unit: "W",
      },
    ],
  },
  {
    id: "thermo-cycle",
    title: "Ideale Kreislaufbilanz",
    expression: "Q̇k = Q̇₀ + PFluid",
    tex: "\\dot Q_k=\\dot Q_0+P_\\mathrm{Fluid}",
    units: "W",
    assumptions:
      "Stationär, passende Fluid-Systemgrenze, keine weiteren Wärme-/Arbeitsflüsse; nicht automatisch elektrische Eingangsleistung.",
    sourceIds: ["openstax-thermal-v06", "openstax-physics-v05"],
    variables: [
      {
        symbol: "Q̇k",
        meaning: "Wärmeabgabe am Verflüssiger",
        unit: "W",
      },
      {
        symbol: "Q̇₀",
        meaning: "Wärmeaufnahme am Verdampfer",
        unit: "W",
      },
      {
        symbol: "PFluid",
        meaning: "dem Fluid zugeführte Verdichterarbeit pro Zeit",
        unit: "W",
      },
    ],
  },
];
