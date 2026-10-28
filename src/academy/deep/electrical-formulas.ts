import type { Formula } from "../model";
export const electrical_formulas: Formula[] = [
  {
    "id": "ac-period",
    "title": "Frequenz und Periodendauer",
    "expression": "T=\\frac1f,\\quad\\omega=2\\pi f",
    "tex": "T=\\frac1f,\\quad\\omega=2\\pi f",
    "units": "T s, f Hz, ω rad/s",
    "assumptions": "Periodischer reiner Sinus, f > 0.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-rms",
    "title": "Sinus-Effektivwert",
    "expression": "U_\\mathrm{eff}=\\frac{\\hat U}{\\sqrt2}",
    "tex": "U_\\mathrm{eff}=\\frac{\\hat U}{\\sqrt2}",
    "units": "V",
    "assumptions": "Reiner Sinus über ganze Perioden, keine Verallgemeinerung auf andere Signalformen.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-reactance-l",
    "title": "Induktiver Blindwiderstand",
    "expression": "X_L=2\\pi fL",
    "tex": "X_L=2\\pi fL",
    "units": "Ω; f Hz, L H",
    "assumptions": "Ideale lineare Spule, eingeschwungener Sinus.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-reactance-c",
    "title": "Kapazitiver Blindwiderstand",
    "expression": "X_C=\\frac1{2\\pi fC}",
    "tex": "X_C=\\frac1{2\\pi fC}",
    "units": "Ω; f Hz, C F",
    "assumptions": "Idealer Kondensator, f und C > 0, eingeschwungener Sinus.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-impedance",
    "title": "Betrag der Serienimpedanz",
    "expression": "Z=\\sqrt{R^2+(X_L-X_C)^2}",
    "tex": "Z=\\sqrt{R^2+(X_L-X_C)^2}",
    "units": "Ω",
    "assumptions": "Serien-RLC-Kreis, lineare ideale Bauteile und sinusförmiger stationärer Zustand.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-apparent",
    "title": "Scheinleistung",
    "expression": "S=U_\\mathrm{eff}I_\\mathrm{eff}",
    "tex": "S=U_\\mathrm{eff}I_\\mathrm{eff}",
    "units": "VA",
    "assumptions": "Effektivwerte, Einphase. Die Aufgaben verwenden reine Sinusgrößen.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-real",
    "title": "Wirkleistung im Sinusmodell",
    "expression": "P=U_\\mathrm{eff}I_\\mathrm{eff}\\cos\\varphi",
    "tex": "P=U_\\mathrm{eff}I_\\mathrm{eff}\\cos\\varphi",
    "units": "W",
    "assumptions": "Gleichfrequente reine Sinusspannung und Sinusstrom. Keine allgemeine Oberwellenformel.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-reactive",
    "title": "Blindleistung im Sinusmodell",
    "expression": "Q=U_\\mathrm{eff}I_\\mathrm{eff}\\sin\\varphi",
    "tex": "Q=U_\\mathrm{eff}I_\\mathrm{eff}\\sin\\varphi",
    "units": "var",
    "assumptions": "Sinusmodell, φ positiv induktiv. Numerische Aufgaben verwenden positive induktive Beträge.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-factor",
    "title": "Leistungsfaktor und Verschiebung",
    "expression": "\\lambda=\\frac PS=\\cos\\varphi",
    "tex": "\\lambda=\\frac PS=\\cos\\varphi",
    "units": "dimensionslos",
    "assumptions": "S > 0; letzte Gleichheit nur für passende Sinusgrößen, nicht allgemeiner Wirkungsgrad.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-star",
    "title": "Stern: Leiter und Strang",
    "expression": "U_L=\\sqrt3U_\\mathrm{Str},\\quad I_L=I_\\mathrm{Str}",
    "tex": "U_L=\\sqrt3U_\\mathrm{Str},\\quad I_L=I_\\mathrm{Str}",
    "units": "V und A",
    "assumptions": "Symmetrische sinusförmige Dreiphasen-Sternschaltung. Eigene Zeigerableitung.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-delta",
    "title": "Dreieck: Leiter und Strang",
    "expression": "U_L=U_\\mathrm{Str},\\quad I_L=\\sqrt3I_\\mathrm{Str}",
    "tex": "U_L=U_\\mathrm{Str},\\quad I_L=\\sqrt3I_\\mathrm{Str}",
    "units": "V und A",
    "assumptions": "Symmetrische sinusförmige Dreieckschaltung. Eigene Zeigerableitung.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  },
  {
    "id": "ac-three-power",
    "title": "Dreiphasige Wirkleistung",
    "expression": "P=3U_\\mathrm{Str}I_\\mathrm{Str}\\cos\\varphi=\\sqrt3U_LI_L\\cos\\varphi",
    "tex": "P=3U_\\mathrm{Str}I_\\mathrm{Str}\\cos\\varphi=\\sqrt3U_LI_L\\cos\\varphi",
    "units": "W",
    "assumptions": "Symmetrische sinusförmige Last, Leitereffektivwerte UL und IL; eigene Ableitung aus Strangleistung.",
    "sourceIds": [
      "openstax-ac-v06",
      "openstax-precalculus-v06"
    ]
  }
];
