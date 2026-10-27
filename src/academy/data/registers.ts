import type { Formula, Objective, Source, Term } from "../model";

/** Gemeinsam verwendeter, fiktiver Referenzfall; keine realen Stoffdaten. */
export const workedCycle = {
  id: "didactic-cycle-example",
  massFlowKgS: 0.05,
  enthalpyKjKg: { h1: 400, h2: 440, h3: 250, h4: 250 },
  expectedKw: { evaporator: 7.5, compressorFluid: 2, condenser: 9.5 },
} as const;

export const sources: Source[] = [
  {
    id: "openstax-heat-pumps",
    title:
      "OpenStax: College Physics 2e, Abschnitt 15.5 – Heat Pumps and Refrigerators",
    url: "https://openstax.org/books/college-physics-2e/pages/15-5-applications-of-thermodynamics-heat-pumps-and-refrigerators",
    access: "unavailable",
    note: "Weiterführende Referenz, in dieser Entwicklungsumgebung am 27.10.2026 durch HTTP 403 nicht abrufbar. Nicht als eingesehener Beleg oder fachliche Freigabe verwendet.",
  },
  {
    id: "didactic-cycle",
    title: "Didaktisches Rechenmodell dieser App",
    access: "internal",
    note: `Eigenes, idealisiertes stationäres Beispiel; frei gewählte Enthalpien h₁ = ${workedCycle.enthalpyKjKg.h1}, h₂ = ${workedCycle.enthalpyKjKg.h2}, h₃ = h₄ = ${workedCycle.enthalpyKjKg.h3} kJ/kg und ṁ = ${workedCycle.massFlowKgS.toLocaleString("de-DE")} kg/s. Keine Stoffdaten eines realen Kältemittels, keine Auslegungs- oder Herstellerwerte. Energie- und Einheitenbilanz rechnerisch geprüft.`,
  },
];
export const formulas: Formula[] = [
  {
    id: "evaporator-power",
    title: "Wärmeaufnahme im Verdampfer",
    expression: "Q̇₀ = ṁ × (h₁ − h₄)",
    units: "kg/s × kJ/kg = kJ/s = kW",
    assumptions:
      "Stationärer Durchfluss, Änderungen kinetischer und potenzieller Energie vernachlässigt. Zustände: 4 nach Drossel, 1 vor Verdichter.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "compressor-power",
    title: "Enthalpiezunahme im Verdichter",
    expression: "ṖFluid = ṁ × (h₂ − h₁)",
    units: "kg/s × kJ/kg = kW",
    assumptions:
      "Näherungsweise adiabater Verdichter, stationärer Betrieb. Fluidleistung ist nicht automatisch elektrische Anschlussleistung.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "condenser-power",
    title: "Wärmeabgabe im Verflüssiger",
    expression: "Q̇c = ṁ × (h₂ − h₃)",
    units: "kg/s × kJ/kg = kW",
    assumptions:
      "Stationärer Betrieb, Wärmeabgabe als positiver Betrag. Zustand 2 nach Verdichter, 3 vor Drossel.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cycle-balance",
    title: "Energiebilanz des idealisierten Kreises",
    expression: "Q̇c = Q̇₀ + ṖFluid",
    units: "kW = kW + kW",
    assumptions:
      "Stationär, Verdichter näherungsweise adiabatisch, sonstige Wärmeverluste vernachlässigt. Mit realer elektrischer Leistung müssen Systemgrenzen und Verluste berücksichtigt werden.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "superheat",
    title: "Überhitzung",
    expression: "ΔTÜ = TDampf − TSättigung(Dew, p)",
    units: "Temperaturdifferenz in K; eine Differenz von 1 °C entspricht 1 K.",
    assumptions:
      "Passendes Kältemittel, gleicher Messort für Druck und Temperatur; bei zeotropen Gemischen Taupunkt verwenden.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "subcooling",
    title: "Unterkühlung",
    expression: "ΔTU = TSättigung(Bubble, p) − TFlüssigkeit",
    units: "Temperaturdifferenz in K.",
    assumptions:
      "Flüssiges Kältemittel, passende Druckreferenz; bei zeotropen Gemischen Siedepunkt verwenden. Kein allgemeiner Sollwert.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "sensible-heat",
    title: "Sensible Wärmeleistung",
    expression: "Q̇ = ṁ × cp × ΔT",
    units: "kg/s × kJ/(kg·K) × K = kW",
    assumptions:
      "Konstant angenommene Wärmekapazität, kein Phasenwechsel; ΔT als positiver Betrag.",
    sourceIds: ["didactic-cycle"],
    calculatorId: "sensible-heat-calculator",
  },
];
export const objectives: Objective[] = [
  {
    id: "cycle-order",
    text: "Die vier Hauptbauteile in der Strömungsrichtung nennen und Wärmeaufnahme von Wärmeabgabe unterscheiden.",
  },
  {
    id: "cycle-balance-objective",
    text: "Eine stationäre Energiebilanz aufstellen und ihre Systemgrenzen benennen.",
  },
  {
    id: "evap-state",
    text: "Verdampfung und Überhitzung unterscheiden und den Verdampferzustand erklären.",
  },
  {
    id: "evap-power-objective",
    text: "Verdampferleistung aus Massenstrom und Enthalpiedifferenz berechnen.",
  },
  {
    id: "compressor-state",
    text: "Druck- und Temperaturanstieg sowie die Bedeutung trockenen Saugdampfs erklären.",
  },
  {
    id: "compressor-power-objective",
    text: "Fluidleistung von elektrischer Leistungsaufnahme unterscheiden.",
  },
  {
    id: "cond-state",
    text: "Enthitzung, Kondensation und Unterkühlung als drei Abschnitte erkennen.",
  },
  {
    id: "cond-power-objective",
    text: "Wärmeabgabe berechnen und mit Verdampfer- und Verdichterleistung vergleichen.",
  },
  {
    id: "sh-measure",
    text: "Überhitzung und Unterkühlung aus zusammengehörigen Messwerten berechnen.",
  },
  {
    id: "sh-diagnosis",
    text: "Tau-/Siedepunkt und Messfehler einordnen, ohne vorschnell eine Füllmengen-Diagnose abzuleiten.",
  },
];
export const terms: Term[] = [
  {
    id: "enthalpie",
    title: "Enthalpie",
    definition:
      "Zustandsgröße h in kJ/kg. Ihre Differenz beschreibt hier den Energieumsatz je Kilogramm im stationären Durchfluss.",
    moduleIds: ["cycle-basics", "evaporation", "compression", "condensation"],
  },
  {
    id: "verdampfung",
    title: "Verdampfung",
    definition: "Übergang von Flüssigkeit zu Dampf unter Wärmeaufnahme.",
    moduleIds: ["evaporation", "cycle-basics"],
  },
  {
    id: "kondensation",
    title: "Kondensation",
    definition: "Übergang von Dampf zu Flüssigkeit unter Wärmeabgabe.",
    moduleIds: ["condensation"],
  },
  {
    id: "ueberhitzung",
    title: "Überhitzung",
    definition:
      "Temperaturabstand eines Dampfes oberhalb der zum örtlichen Druck gehörenden Sättigungstemperatur.",
    moduleIds: ["superheat-subcooling", "evaporation"],
  },
  {
    id: "unterkuehlung",
    title: "Unterkühlung",
    definition:
      "Temperaturabstand einer Flüssigkeit unterhalb der zum örtlichen Druck gehörenden Sättigungstemperatur.",
    moduleIds: ["superheat-subcooling", "condensation"],
  },
  {
    id: "verdichtung",
    title: "Verdichtung",
    definition:
      "Druckerhöhung des gasförmigen Kältemittels durch zugeführte Arbeit.",
    moduleIds: ["compression"],
  },
  {
    id: "taupunkt",
    title: "Taupunkt (Dew)",
    definition:
      "Bei einem zeotropen Kältemittelgemisch: Sättigungszustand auf der Dampfseite für die Überhitzungsbestimmung.",
    moduleIds: ["superheat-subcooling"],
  },
  {
    id: "drosselung",
    title: "Drosselung",
    definition:
      "Druckabsenkung am Expansionsorgan, näherungsweise bei konstanter spezifischer Enthalpie.",
    moduleIds: ["cycle-basics"],
  },
];
