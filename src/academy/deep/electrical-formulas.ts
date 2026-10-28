import type { Formula } from "../model";
export const electrical_formulas: Formula[] = [
  {
    id: "ac-period",
    title: "Frequenz und Periodendauer",
    expression: "T = 1/f, ω = 2πf",
    tex: "T=\\frac1f,\\quad\\omega=2\\pi f",
    units: "T s, f Hz, ω rad/s",
    assumptions: "Periodischer reiner Sinus, f > 0.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "T",
        meaning: "Periodendauer",
        unit: "s",
      },
      {
        symbol: "f",
        meaning: "Frequenz",
        unit: "Hz",
      },
      {
        symbol: "ω",
        meaning: "Kreisfrequenz",
        unit: "rad/s",
      },
    ],
  },
  {
    id: "ac-rms",
    title: "Sinus-Effektivwert",
    expression: "Ueff = Û / √2 (reiner Sinus)",
    tex: "U_\\mathrm{eff}=\\frac{\\hat U}{\\sqrt2}",
    units: "V",
    assumptions:
      "Reiner Sinus über ganze Perioden, keine Verallgemeinerung auf andere Signalformen.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "Ueff",
        meaning: "Effektivwert",
        unit: "V",
      },
      {
        symbol: "Û",
        meaning: "Scheitelwert",
        unit: "V",
      },
    ],
  },
  {
    id: "ac-reactance-l",
    title: "Induktiver Blindwiderstand",
    expression: "XL = 2πfL",
    tex: "X_L=2\\pi fL",
    units: "Ω; f Hz, L H",
    assumptions: "Ideale lineare Spule, eingeschwungener Sinus.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "XL",
        meaning: "induktiver Blindwiderstand",
        unit: "Ω",
      },
      {
        symbol: "f",
        meaning: "Frequenz",
        unit: "Hz",
      },
      {
        symbol: "L",
        meaning: "Induktivität",
        unit: "H",
      },
    ],
  },
  {
    id: "ac-reactance-c",
    title: "Kapazitiver Blindwiderstand",
    expression: "XC = 1/(2πfC)",
    tex: "X_C=\\frac1{2\\pi fC}",
    units: "Ω; f Hz, C F",
    assumptions: "Idealer Kondensator, f und C > 0, eingeschwungener Sinus.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "XC",
        meaning: "kapazitiver Blindwiderstand",
        unit: "Ω",
      },
      {
        symbol: "f",
        meaning: "Frequenz",
        unit: "Hz",
      },
      {
        symbol: "C",
        meaning: "Kapazität",
        unit: "F",
      },
    ],
  },
  {
    id: "ac-impedance",
    title: "Betrag der Serienimpedanz",
    expression: "Z = √(R² + (XL−XC)²)",
    tex: "Z=\\sqrt{R^2+(X_L-X_C)^2}",
    units: "Ω",
    assumptions:
      "Serien-RLC-Kreis, lineare ideale Bauteile und sinusförmiger stationärer Zustand.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "Z",
        meaning: "Impedanzbetrag im Serienkreis",
        unit: "Ω",
      },
      {
        symbol: "R",
        meaning: "ohmscher Anteil",
        unit: "Ω",
      },
      {
        symbol: "XL, XC",
        meaning: "induktiver/kapazitiver Blindwiderstand",
        unit: "Ω",
      },
    ],
  },
  {
    id: "ac-apparent",
    title: "Scheinleistung",
    expression: "S = Ueff Ieff",
    tex: "S=U_\\mathrm{eff}I_\\mathrm{eff}",
    units: "VA",
    assumptions:
      "Effektivwerte, Einphase. Die Aufgaben verwenden reine Sinusgrößen.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "S",
        meaning: "Scheinleistung",
        unit: "VA",
      },
      {
        symbol: "P",
        meaning: "Wirkleistung",
        unit: "W",
      },
      {
        symbol: "Q",
        meaning: "Blindleistung, induktiv positiv",
        unit: "var",
      },
      {
        symbol: "Ueff, Ieff",
        meaning: "Effektivspannung/-strom",
        unit: "V / A",
      },
      {
        symbol: "φ",
        meaning: "Verschiebungswinkel (Strom nacheilend positiv)",
        unit: "rad",
      },
    ],
  },
  {
    id: "ac-real",
    title: "Wirkleistung im Sinusmodell",
    expression: "P = Ueff Ieff cos φ",
    tex: "P=U_\\mathrm{eff}I_\\mathrm{eff}\\cos\\varphi",
    units: "W",
    assumptions:
      "Gleichfrequente reine Sinusspannung und Sinusstrom. Keine allgemeine Oberwellenformel.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "S",
        meaning: "Scheinleistung",
        unit: "VA",
      },
      {
        symbol: "P",
        meaning: "Wirkleistung",
        unit: "W",
      },
      {
        symbol: "Q",
        meaning: "Blindleistung, induktiv positiv",
        unit: "var",
      },
      {
        symbol: "Ueff, Ieff",
        meaning: "Effektivspannung/-strom",
        unit: "V / A",
      },
      {
        symbol: "φ",
        meaning: "Verschiebungswinkel (Strom nacheilend positiv)",
        unit: "rad",
      },
    ],
  },
  {
    id: "ac-reactive",
    title: "Blindleistung im Sinusmodell",
    expression: "Q = Ueff Ieff sin φ",
    tex: "Q=U_\\mathrm{eff}I_\\mathrm{eff}\\sin\\varphi",
    units: "var",
    assumptions:
      "Sinusmodell, φ positiv induktiv. Numerische Aufgaben verwenden positive induktive Beträge.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "S",
        meaning: "Scheinleistung",
        unit: "VA",
      },
      {
        symbol: "P",
        meaning: "Wirkleistung",
        unit: "W",
      },
      {
        symbol: "Q",
        meaning: "Blindleistung, induktiv positiv",
        unit: "var",
      },
      {
        symbol: "Ueff, Ieff",
        meaning: "Effektivspannung/-strom",
        unit: "V / A",
      },
      {
        symbol: "φ",
        meaning: "Verschiebungswinkel (Strom nacheilend positiv)",
        unit: "rad",
      },
    ],
  },
  {
    id: "ac-factor",
    title: "Leistungsfaktor und Verschiebung",
    expression: "λ = P/S, im reinen Sinusmodell auch cos φ",
    tex: "\\lambda=\\frac PS=\\cos\\varphi",
    units: "dimensionslos",
    assumptions:
      "S > 0; letzte Gleichheit nur für passende Sinusgrößen, nicht allgemeiner Wirkungsgrad.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "λ",
        meaning: "Gesamtleistungsfaktor",
        unit: "1",
      },
      {
        symbol: "P",
        meaning: "Wirkleistung",
        unit: "W",
      },
      {
        symbol: "S",
        meaning: "Scheinleistung größer null",
        unit: "VA",
      },
      {
        symbol: "φ",
        meaning: "Verschiebungswinkel",
        unit: "rad",
      },
    ],
  },
  {
    id: "ac-star",
    title: "Stern: Leiter und Strang",
    expression: "Stern: UL = √3 Ustr; IL = Istr",
    tex: "U_L=\\sqrt3U_\\mathrm{Str},\\quad I_L=I_\\mathrm{Str}",
    units: "V und A",
    assumptions:
      "Symmetrische sinusförmige Dreiphasen-Sternschaltung. Eigene Zeigerableitung.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "UL, Ustr",
        meaning: "Leiter-/Strangspannung effektiv",
        unit: "V",
      },
      {
        symbol: "IL, Istr",
        meaning: "Leiter-/Strangstrom effektiv",
        unit: "A",
      },
      {
        symbol: "φ",
        meaning: "gemeinsamer Verschiebungswinkel",
        unit: "rad",
      },
      {
        symbol: "P",
        meaning: "Gesamtwirkleistung",
        unit: "W",
      },
    ],
  },
  {
    id: "ac-delta",
    title: "Dreieck: Leiter und Strang",
    expression: "Dreieck: UL = Ustr; IL = √3 Istr",
    tex: "U_L=U_\\mathrm{Str},\\quad I_L=\\sqrt3I_\\mathrm{Str}",
    units: "V und A",
    assumptions:
      "Symmetrische sinusförmige Dreieckschaltung. Eigene Zeigerableitung.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "UL, Ustr",
        meaning: "Leiter-/Strangspannung effektiv",
        unit: "V",
      },
      {
        symbol: "IL, Istr",
        meaning: "Leiter-/Strangstrom effektiv",
        unit: "A",
      },
      {
        symbol: "φ",
        meaning: "gemeinsamer Verschiebungswinkel",
        unit: "rad",
      },
      {
        symbol: "P",
        meaning: "Gesamtwirkleistung",
        unit: "W",
      },
    ],
  },
  {
    id: "ac-three-power",
    title: "Dreiphasige Wirkleistung",
    expression: "P = 3 Ustr Istr cos φ = √3 UL IL cos φ",
    tex: "P=3U_\\mathrm{Str}I_\\mathrm{Str}\\cos\\varphi=\\sqrt3U_LI_L\\cos\\varphi",
    units: "W",
    assumptions:
      "Symmetrische sinusförmige Last, Leitereffektivwerte UL und IL; eigene Ableitung aus Strangleistung.",
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    variables: [
      {
        symbol: "UL, Ustr",
        meaning: "Leiter-/Strangspannung effektiv",
        unit: "V",
      },
      {
        symbol: "IL, Istr",
        meaning: "Leiter-/Strangstrom effektiv",
        unit: "A",
      },
      {
        symbol: "φ",
        meaning: "gemeinsamer Verschiebungswinkel",
        unit: "rad",
      },
      {
        symbol: "P",
        meaning: "Gesamtwirkleistung",
        unit: "W",
      },
    ],
  },
];
