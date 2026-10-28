import type { Formula } from "../model";
export const thermal_formulas: Formula[] = [
  {
    "id": "thermo-pressure-abs",
    "title": "Absolut- und Überdruck",
    "expression": "p_\\mathrm{abs}=p_\\mathrm{ü}+p_\\mathrm{amb}",
    "tex": "p_\\mathrm{abs}=p_\\mathrm{ü}+p_\\mathrm{amb}",
    "units": "Pa",
    "assumptions": "Gleicher Messort, Umgebungsdruck vorgegeben; numerische Aufgabe positiver Überdruck.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-specific-volume",
    "title": "Spezifisches Volumen",
    "expression": "v=\\frac Vm=\\frac1\\rho",
    "tex": "v=\\frac Vm=\\frac1\\rho",
    "units": "m³/kg",
    "assumptions": "Homogene Dichte, Masse und Volumen positiv.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-mass-volume",
    "title": "Volumenstrom zu Massenstrom",
    "expression": "\\dot m=\\rho\\dot V",
    "tex": "\\dot m=\\rho\\dot V",
    "units": "kg/s",
    "assumptions": "Dichte und Volumenstrom am selben Zustand und Ort, stationär.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-latent",
    "title": "Latente Energie",
    "expression": "Q=mL",
    "tex": "Q=mL",
    "units": "J",
    "assumptions": "Vorgegebener Übergangswert L für einen definierten Phasenwechsel; kein realer Stoffwert behauptet.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-conduction",
    "title": "Ebene Wärmeleitung",
    "expression": "\\dot Q=\\lambda A\\frac{\\Delta T}{d}",
    "tex": "\\dot Q=\\lambda A\\frac{\\Delta T}{d}",
    "units": "W",
    "assumptions": "Stationär, eindimensional, homogen, ebene Schicht, λ konstant, keine inneren Quellen.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-resistance",
    "title": "Wärmewiderstand",
    "expression": "R_\\mathrm{th}=\\frac d{\\lambda A}",
    "tex": "R_\\mathrm{th}=\\frac d{\\lambda A}",
    "units": "K/W",
    "assumptions": "Ebene homogene Schicht, d, λ und A positiv.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-layers",
    "title": "Zwei leitende Schichten",
    "expression": "\\dot Q=\\frac{A\\Delta T}{d_1/\\lambda_1+d_2/\\lambda_2}",
    "tex": "\\dot Q=\\frac{A\\Delta T}{d_1/\\lambda_1+d_2/\\lambda_2}",
    "units": "W",
    "assumptions": "Gleiche Fläche, stationär, ideale Kontakte, keine Wärmeübergangswiderstände oder Wärmebrücken.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-u",
    "title": "Wärmedurchgangskoeffizient",
    "expression": "U=\\frac1{\\frac1{\\alpha_i}+\\frac{d_1}{\\lambda_1}+\\frac{d_2}{\\lambda_2}+\\frac1{\\alpha_a}}",
    "tex": "U=\\frac1{\\frac1{\\alpha_i}+\\frac{d_1}{\\lambda_1}+\\frac{d_2}{\\lambda_2}+\\frac1{\\alpha_a}}",
    "units": "W/(m²·K)",
    "assumptions": "Ebene stationäre Schichten, vorgegebene positive α- und λ-Werte, keine Feuchte oder Wärmebrücken.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-first-law",
    "title": "Erster Hauptsatz, geschlossen",
    "expression": "\\Delta U=Q-W",
    "tex": "\\Delta U=Q-W",
    "units": "J",
    "assumptions": "Geschlossenes System, Q positiv hinein, W positiv vom System an Umgebung.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-enthalpy",
    "title": "Spezifische Enthalpie",
    "expression": "h=u+pv,\\quad\\dot Q_0=\\dot m(h_1-h_4)",
    "tex": "h=u+pv,\\quad\\dot Q_0=\\dot m(h_1-h_4)",
    "units": "h J/kg, Q̇ W",
    "assumptions": "Stationärer Verdampfer ohne Wellenarbeit; vernachlässigte kinetische/potenzielle Änderungen, geeignete Zustandsdaten.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  },
  {
    "id": "thermo-cycle",
    "title": "Ideale Kreislaufbilanz",
    "expression": "\\dot Q_k=\\dot Q_0+P_\\mathrm{Fluid}",
    "tex": "\\dot Q_k=\\dot Q_0+P_\\mathrm{Fluid}",
    "units": "W",
    "assumptions": "Stationär, passende Fluid-Systemgrenze, keine weiteren Wärme-/Arbeitsflüsse; nicht automatisch elektrische Eingangsleistung.",
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ]
  }
];
