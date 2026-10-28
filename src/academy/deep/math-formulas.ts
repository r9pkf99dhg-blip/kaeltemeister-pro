import type { Formula } from "../model";
export const math_formulas: Formula[] = [
  {
    id: "geo-circle",
    title: "Kreis- und Rohrquerschnitt",
    expression: "A = π d² / 4",
    tex: "A=\\frac{\\pi d^2}{4}",
    units: "A in m², d in m",
    assumptions: "Kreisförmiger Querschnitt, d ≥ 0; keine Dimensionierung.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "A",
        meaning: "Kreisfläche",
        unit: "m²",
      },
      {
        symbol: "d",
        meaning: "Durchmesser",
        unit: "m",
      },
    ],
  },
  {
    id: "geo-annulus",
    title: "Ringfläche",
    expression: "AR = π (da² − di²) / 4",
    tex: "A_R=\\frac\\pi4(d_a^2-d_i^2)",
    units: "m²",
    assumptions: "0 ≤ d_i < d_a; gleichmäßig kreisrunde Wand.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "AR",
        meaning: "Ringfläche",
        unit: "m²",
      },
      {
        symbol: "da",
        meaning: "Außendurchmesser",
        unit: "m",
      },
      {
        symbol: "di",
        meaning: "Innendurchmesser",
        unit: "m",
      },
    ],
  },
  {
    id: "geo-volume",
    title: "Gerades Rohrvolumen",
    expression: "V = π di² L / 4",
    tex: "V=\\frac{\\pi d_i^2}{4}L",
    units: "m³",
    assumptions: "Konstanter kreisförmiger Innenquerschnitt.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "V",
        meaning: "Innenvolumen",
        unit: "m³",
      },
      {
        symbol: "di",
        meaning: "Innendurchmesser",
        unit: "m",
      },
      {
        symbol: "L",
        meaning: "Länge",
        unit: "m",
      },
    ],
  },
  {
    id: "geo-surface",
    title: "Zylindermantel",
    expression: "AM = π d L",
    tex: "A_M=\\pi dL",
    units: "m²",
    assumptions: "Nur Mantel, keine Stirnflächen.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "AM",
        meaning: "Mantelfläche ohne Stirnflächen",
        unit: "m²",
      },
      {
        symbol: "d",
        meaning: "betrachteter Durchmesser",
        unit: "m",
      },
      {
        symbol: "L",
        meaning: "Länge",
        unit: "m",
      },
    ],
  },
  {
    id: "geo-pythagoras",
    title: "Satz des Pythagoras",
    expression: "c = √(a² + b²)",
    tex: "c=\\sqrt{a^2+b^2}",
    units: "m",
    assumptions: "Rechter Winkel zwischen a und b; nicht negative Längen.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "c",
        meaning: "Hypotenuse",
        unit: "m",
      },
      {
        symbol: "a, b",
        meaning: "Katheten am rechten Winkel",
        unit: "m",
      },
    ],
  },
  {
    id: "geo-trig",
    title: "Seitenverhältnisse",
    expression: "sin α = G/H, cos α = A/H, tan α = G/A",
    tex: "\\sin\\alpha=\\frac G H,\\quad\\cos\\alpha=\\frac A H,\\quad\\tan\\alpha=\\frac G A",
    units: "Seiten in gleicher Längeneinheit; Winkel in rad",
    assumptions: "Rechtwinkliges Dreieck; spitzer Winkel, A > 0.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "α",
        meaning: "spitzer Winkel",
        unit: "rad",
      },
      {
        symbol: "G",
        meaning: "Gegenkathete",
        unit: "m",
      },
      {
        symbol: "A",
        meaning: "Ankathete",
        unit: "m",
      },
      {
        symbol: "H",
        meaning: "Hypotenuse",
        unit: "m",
      },
    ],
  },
  {
    id: "geo-slope",
    title: "Steigung und Winkel",
    expression: "s = Δh / Lh = tan α",
    tex: "s=\\frac{\\Delta h}{L_h}=\\tan\\alpha",
    units: "s dimensionslos; Winkel rad",
    assumptions: "Horizontale Länge > 0, keine normative Gefällevorgabe.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "s",
        meaning: "Steigung als Verhältnis",
        unit: "1",
      },
      {
        symbol: "Δh",
        meaning: "Höhenunterschied als Betrag",
        unit: "m",
      },
      {
        symbol: "Lh",
        meaning: "horizontale Projektion",
        unit: "m",
      },
      {
        symbol: "α",
        meaning: "Winkel",
        unit: "rad",
      },
    ],
  },
  {
    id: "algebra-domain",
    title: "Äquivalenz und Definitionsbereich",
    expression: "6/(x−1) = 3 genau dann, wenn x = 3 (x ≠ 1)",
    tex: "\\frac6{x-1}=3\\ \\Leftrightarrow\\ x=3\\quad(x\\ne1)",
    units: "dimensionslos",
    assumptions: "Reelle Werte; ursprünglicher Nenner bleibt ausgeschlossen.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "x",
        meaning: "reelle Unbekannte",
        unit: "1",
      },
    ],
  },
  {
    id: "algebra-system",
    title: "Lineares Zweiersystem",
    expression: "x = (ce − bf)/(ae − bd)",
    tex: "x=\\frac{ce-bf}{ae-bd}",
    units: "Koeffizienten im konsistenten Gleichungssystem",
    assumptions: "ax+by=c, dx+ey=f; ae−bd ≠ 0.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "a, b, c",
        meaning: "erste Gleichung ax+by=c",
        unit: "konsistent zum System",
      },
      {
        symbol: "d, e, f",
        meaning: "zweite Gleichung dx+ey=f",
        unit: "konsistent zum System",
      },
      {
        symbol: "x, y",
        meaning: "gesuchte Variablen",
        unit: "konsistent zum System",
      },
    ],
  },
  {
    id: "algebra-quadratic",
    title: "Quadratische Gleichung",
    expression: "x₁,₂ = (−b ± √(b²−4ac))/(2a)",
    tex: "x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
    units: "dimensionslos im Zahlenbeispiel",
    assumptions: "a ≠ 0, reelle Wurzeln nur bei Diskriminante ≥ 0.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "a, b, c",
        meaning: "Koeffizienten von ax²+bx+c=0",
        unit: "1 im Beispiel",
      },
      {
        symbol: "x₁,₂",
        meaning: "reelle Nullstellen bei nicht negativer Diskriminante",
        unit: "1 im Beispiel",
      },
    ],
  },
  {
    id: "algebra-interpolation",
    title: "Lineare Interpolation",
    expression: "y = y₀ + (y₁−y₀)(x−x₀)/(x₁−x₀)",
    tex: "y=y_0+(y_1-y_0)\\frac{x-x_0}{x_1-x_0}",
    units: "Konsistente x- und y-Einheiten",
    assumptions:
      "Verschiedene x-Stützstellen, x innerhalb des Intervalls; lineares Näherungsmodell.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "x₀, x₁",
        meaning: "Eingangsstützstellen",
        unit: "gleiche x-Einheit",
      },
      {
        symbol: "y₀, y₁",
        meaning: "Ausgangsstützwerte",
        unit: "gleiche y-Einheit",
      },
      {
        symbol: "x, y",
        meaning: "gesuchter Zwischenwert",
        unit: "jeweilige x-/y-Einheit",
      },
    ],
  },
  {
    id: "algebra-log",
    title: "Logarithmus",
    expression: "b hoch y = x entspricht y = log zur Basis b von x",
    tex: "b^y=x\\ \\Leftrightarrow\\ y=\\log_b x",
    units: "dimensionslose Zahlen",
    assumptions: "b > 0, b ≠ 1, x > 0.",
    sourceIds: ["openstax-precalculus-v06"],
    variables: [
      {
        symbol: "b",
        meaning: "Basis positiv, ungleich eins",
        unit: "1",
      },
      {
        symbol: "x",
        meaning: "positives Argument",
        unit: "1",
      },
      {
        symbol: "y",
        meaning: "Exponent bzw. Logarithmus",
        unit: "1",
      },
    ],
  },
];
