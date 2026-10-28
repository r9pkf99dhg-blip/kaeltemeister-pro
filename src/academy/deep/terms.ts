import type { Term } from "../model";
/** Begriffe teilen die Modul-/Formelidentitäten; kein zweites Wörterbuch pro Lernpfad. */
export const deepTerms: Term[] = [
  {
    id: "term-v06-rms",
    title: "Effektivwert",
    definition:
      "Wurzel aus dem zeitlichen Mittel des Quadrats einer periodischen Größe. Nur beim reinen Sinus gleich Scheitelwert geteilt durch √2; beschreibt die gleiche mittlere Widerstandserwärmung wie ein entsprechender Gleichwert.",
    moduleIds: ["electric-ac-wave", "electric-ac-power"],
  },
  {
    id: "term-v06-peak",
    title: "Scheitelwert",
    definition:
      "Größter Betrag einer wechselnden Größe. Nicht mit ihrem Effektivwert oder einfachen zeitlichen Mittelwert gleichsetzen.",
    moduleIds: ["electric-ac-wave"],
  },
  {
    id: "term-v06-phase",
    title: "Phasenverschiebung",
    definition:
      "Relative Verschiebung gleichfrequenter periodischer Verläufe. Hier ist φ positiv, wenn der sinusförmige Strom der Spannung nacheilt.",
    moduleIds: ["electric-ac-wave", "electric-ac-reactance"],
  },
  {
    id: "term-v06-impedance",
    title: "Impedanz",
    definition:
      "Wechselstrom-Zusammenhang von Spannung und Strom einschließlich Phase. Der hier berechnete Betrag Z im idealen Serien-RLC-Modell ist √(R²+(XL−XC)²), in Ω.",
    moduleIds: ["electric-ac-reactance"],
  },
  {
    id: "term-v06-real-power",
    title: "Wirkleistung",
    definition:
      "Zeitlicher Mittelwert der momentanen elektrischen Leistung, in W. Bei gleichfrequenten reinen Sinusgrößen P = Ueff Ieff cos φ; kein allgemeiner Motorwirkungsgrad.",
    moduleIds: ["electric-ac-power", "electric-three-phase", "case-ac"],
  },
  {
    id: "term-v06-reactive-power",
    title: "Blindleistung",
    definition:
      "Im Sinusmodell Q = Ueff Ieff sin φ, in var; bei der hier gewählten Konvention induktiv positiv und kapazitiv negativ. Nicht als mechanischer Energieverbrauch interpretieren.",
    moduleIds: ["electric-ac-power", "case-ac"],
  },
  {
    id: "term-v06-apparent-power",
    title: "Scheinleistung",
    definition:
      "Produkt aus Effektivspannung und Effektivstrom, in VA. Im verwendeten Sinusmodell bilden P, Q und S ein rechtwinkliges Leistungsdreieck; bei Verzerrung ist dieses Modell nicht allgemein ausreichend.",
    moduleIds: ["electric-ac-power", "case-ac"],
  },
  {
    id: "term-v06-power-factor",
    title: "Leistungsfaktor",
    definition:
      "Gesamtleistungsfaktor λ = P/S bei S > 0. Er stimmt im passenden Sinusmodell mit cos φ überein; er ist nicht der Wirkungsgrad und wird bei verzerrten Signalen nicht allein durch den Verschiebungswinkel beschrieben.",
    moduleIds: ["electric-ac-power", "electric-three-phase", "case-ac"],
  },
  {
    id: "term-v06-absolute-pressure",
    title: "Absolutdruck",
    definition:
      "Druck mit dem Bezug Vakuum. Überdruck hat dagegen einen Umgebungsbezug; pabs = pü + pamb bei konsistenter Messreferenz. Umgebungsdruck muss angegeben sein.",
    moduleIds: ["thermo-states", "thermo-cycle-balance"],
  },
  {
    id: "term-v06-conductivity",
    title: "Wärmeleitfähigkeit",
    definition:
      "Stoff-/zustandsabhängige Größe λ in W/(m·K) im Wärmeleitungsmodell. Nicht mit dem flächenbezogenen Wärmedurchgangskoeffizienten U gleichsetzen.",
    moduleIds: ["thermo-transfer", "case-conduction"],
  },
  {
    id: "term-v06-thermal-resistance",
    title: "Wärmewiderstand",
    definition:
      "Temperaturdifferenz geteilt durch stationären Wärmestrom, in K/W. Für die ebene homogene Schicht Rth = d/(λA); gleiche stationäre Serienschichten addieren Widerstände.",
    moduleIds: ["thermo-transfer", "case-conduction"],
  },
  {
    id: "term-v06-u-value",
    title: "U-Wert",
    definition:
      "Wärmedurchgangskoeffizient in W/(m²·K). Das hier verwendete ebene stationäre Modell fasst Schichtleitung und vorgegebene Wärmeübergänge zusammen; reale Wärmebrücken, Feuchte und Geometrie benötigen zusätzliche Prüfung.",
    moduleIds: ["thermo-transfer", "case-conduction"],
  },
];
