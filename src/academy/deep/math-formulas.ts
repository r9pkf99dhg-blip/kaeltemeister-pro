import type { Formula } from "../model";
export const math_formulas: Formula[] = [
  {
    "id": "geo-circle",
    "title": "Kreis- und Rohrquerschnitt",
    "expression": "A=\\frac{\\pi d^2}{4}",
    "tex": "A=\\frac{\\pi d^2}{4}",
    "units": "A in m², d in m",
    "assumptions": "Kreisförmiger Querschnitt, d ≥ 0; keine Dimensionierung.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "geo-annulus",
    "title": "Ringfläche",
    "expression": "A_R=\\frac\\pi4(d_a^2-d_i^2)",
    "tex": "A_R=\\frac\\pi4(d_a^2-d_i^2)",
    "units": "m²",
    "assumptions": "0 ≤ d_i < d_a; gleichmäßig kreisrunde Wand.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "geo-volume",
    "title": "Gerades Rohrvolumen",
    "expression": "V=\\frac{\\pi d_i^2}{4}L",
    "tex": "V=\\frac{\\pi d_i^2}{4}L",
    "units": "m³",
    "assumptions": "Konstanter kreisförmiger Innenquerschnitt.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "geo-surface",
    "title": "Zylindermantel",
    "expression": "A_M=\\pi dL",
    "tex": "A_M=\\pi dL",
    "units": "m²",
    "assumptions": "Nur Mantel, keine Stirnflächen.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "geo-pythagoras",
    "title": "Satz des Pythagoras",
    "expression": "c=\\sqrt{a^2+b^2}",
    "tex": "c=\\sqrt{a^2+b^2}",
    "units": "m",
    "assumptions": "Rechter Winkel zwischen a und b; nicht negative Längen.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "geo-trig",
    "title": "Seitenverhältnisse",
    "expression": "\\sin\\alpha=\\frac G H,\\quad\\cos\\alpha=\\frac A H,\\quad\\tan\\alpha=\\frac G A",
    "tex": "\\sin\\alpha=\\frac G H,\\quad\\cos\\alpha=\\frac A H,\\quad\\tan\\alpha=\\frac G A",
    "units": "Seiten in gleicher Längeneinheit; Winkel in rad",
    "assumptions": "Rechtwinkliges Dreieck; spitzer Winkel, A > 0.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "geo-slope",
    "title": "Steigung und Winkel",
    "expression": "s=\\frac{\\Delta h}{L_h}=\\tan\\alpha",
    "tex": "s=\\frac{\\Delta h}{L_h}=\\tan\\alpha",
    "units": "s dimensionslos; Winkel rad",
    "assumptions": "Horizontale Länge > 0, keine normative Gefällevorgabe.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "algebra-domain",
    "title": "Äquivalenz und Definitionsbereich",
    "expression": "\\frac6{x-1}=3\\ \\Leftrightarrow\\ x=3\\quad(x\\ne1)",
    "tex": "\\frac6{x-1}=3\\ \\Leftrightarrow\\ x=3\\quad(x\\ne1)",
    "units": "dimensionslos",
    "assumptions": "Reelle Werte; ursprünglicher Nenner bleibt ausgeschlossen.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "algebra-system",
    "title": "Lineares Zweiersystem",
    "expression": "x=\\frac{ce-bf}{ae-bd}",
    "tex": "x=\\frac{ce-bf}{ae-bd}",
    "units": "Koeffizienten im konsistenten Gleichungssystem",
    "assumptions": "ax+by=c, dx+ey=f; ae−bd ≠ 0.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "algebra-quadratic",
    "title": "Quadratische Gleichung",
    "expression": "x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
    "tex": "x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
    "units": "dimensionslos im Zahlenbeispiel",
    "assumptions": "a ≠ 0, reelle Wurzeln nur bei Diskriminante ≥ 0.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "algebra-interpolation",
    "title": "Lineare Interpolation",
    "expression": "y=y_0+(y_1-y_0)\\frac{x-x_0}{x_1-x_0}",
    "tex": "y=y_0+(y_1-y_0)\\frac{x-x_0}{x_1-x_0}",
    "units": "Konsistente x- und y-Einheiten",
    "assumptions": "Verschiedene x-Stützstellen, x innerhalb des Intervalls; lineares Näherungsmodell.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "algebra-log",
    "title": "Logarithmus",
    "expression": "b^y=x\\ \\Leftrightarrow\\ y=\\log_b x",
    "tex": "b^y=x\\ \\Leftrightarrow\\ y=\\log_b x",
    "units": "dimensionslose Zahlen",
    "assumptions": "b > 0, b ≠ 1, x > 0.",
    "sourceIds": [
      "openstax-precalculus-v06"
    ]
  }
];
