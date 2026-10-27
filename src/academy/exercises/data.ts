import { taskCompetencies } from "../foundations/competencies";
import { chemistryTasks } from "../foundations/chemistry-tasks";
import { physicsTasks } from "../foundations/physics-tasks";
import { mathematicsTasks } from "../foundations/tasks";
import { solutionNotation } from "../../math/legacy-solutions";
import { electricalTasks } from "./electrical";
import type { NumericTask } from "./model";
export const learningNotes = [
  {
    id: "electric-power-note",
    title: "Elektrische Wirkleistung im Gleichstromkreis",
    domainId: "elektro",
    text: "Für stationären Gleichstrom gilt P = U × I. Volt × Ampere ergeben Watt. Beispiel: 24 V × 2 A = 48 W. Das ist keine Leitungsdimensionierung oder Anleitung zur Arbeit an Spannung. Für Wechsel- und Drehstrom sind je nach System Effektivwerte, Phasenzahl und Leistungsfaktor erforderlich; P = U × I ist dort nicht pauschal als Wirkleistung zulässig.",
    formulaIds: ["dc-electric-power"],
    sourceIds: ["didactic-exercises"],
  },
  {
    id: "cop-note",
    title: "COP: Nutzen und Systemgrenze",
    domainId: "kaelte",
    text: "Eine Leistungszahl ist der dimensionslose Quotient aus thermischem Nutzen und zugehöriger elektrischer Leistung am gleichen Betriebspunkt. Kälteleistungszahl ε = Q̇₀ / Pel; Heiz-COP = Q̇Heiz / Pel. Beide Leistungen benötigen dieselbe Einheit und passende Systemgrenzen. Eine momentane Leistungszahl ist keine Jahresarbeitszahl. Messunsicherheit, Hilfsenergien und Betriebszustand müssen dokumentiert werden.",
    formulaIds: ["cooling-cop", "heating-cop"],
    sourceIds: ["didactic-exercises"],
  },
] as const;
const shared = {
  revision: 1,
  kind: "numeric" as const,
  review: "calculation-tested-expert-review-pending" as const,
  relativeTolerance: 0.005,
  sourceIds: ["didactic-exercises"],
};
export const numericTasks: NumericTask[] = [
  {
    ...shared,
    id: "calc-heat-water",
    topicId: "cycle-basics",
    domainId: "kaelte",
    level: "grundlagen",
    title: "Sensible Wärmeleistung",
    prompt:
      "Ein angenommener Wasserstrom wird um 5 K abgekühlt. Berechne den Betrag der sensiblen Wärmeleistung.",
    article: { kind: "module", id: "cycle-basics" },
    formulaId: "sensible-heat",
    calculation: "heat",
    sourceIds: ["didactic-exercises", "openstax-heat-capacity-github"],
    givens: [
      {
        id: "massFlow",
        label: "Massenstrom",
        value: 0.5,
        unit: "kg/s",
        quantity: "mass-flow",
      },
      {
        id: "cp",
        label: "Wärmekapazität",
        value: 4.18,
        unit: "kJ/(kg·K)",
        quantity: "specific-heat",
      },
      {
        id: "deltaT",
        label: "Temperaturdifferenz",
        value: 5,
        unit: "K",
        quantity: "temperature-difference",
      },
    ],
    sought: "Sensible Wärmeleistung",
    quantity: "power",
    answerUnit: "kW",
    absoluteToleranceSI: 5,
    hint: "Rechne cp in J/(kg·K) um. Das SI-Ergebnis ist in Watt.",
    steps: [
      "cp = 4,18 × 1000 = 4180 J/(kg·K).",
      "Q̇ = 0,5 × 4180 × 5 = 10 450 W.",
      "10 450 W / 1000 = 10,45 kW.",
    ],
    mistakes: [
      "J und kJ oder W und kW verwechseln.",
      "Die Formel für einen Phasenwechsel verwenden.",
    ],
    assumptions:
      "cp = 4,18 kJ/(kg·K) ist ein Näherungswert für Wasser um 20 °C. Stationär, cp konstant angenommen, kein Phasenwechsel.",
  },
  {
    ...shared,
    id: "calc-mass-flow",
    topicId: "evaporation",
    domainId: "kaelte",
    level: "fachkraft",
    title: "Benötigter Massenstrom",
    prompt:
      "Auf einer sensiblen Flüssigkeitsseite sollen 8,36 kW bei 4 K Temperaturdifferenz transportiert werden. Welcher Massenstrom ist erforderlich?",
    article: { kind: "module", id: "evaporation" },
    formulaId: "sensible-mass-flow",
    calculation: "mass-flow",
    sourceIds: ["didactic-exercises", "openstax-heat-capacity-github"],
    givens: [
      {
        id: "heat",
        label: "Wärmeleistung",
        value: 8.36,
        unit: "kW",
        quantity: "power",
      },
      {
        id: "cp",
        label: "Wärmekapazität",
        value: 4.18,
        unit: "kJ/(kg·K)",
        quantity: "specific-heat",
      },
      {
        id: "deltaT",
        label: "Temperaturdifferenz",
        value: 4,
        unit: "K",
        quantity: "temperature-difference",
      },
    ],
    sought: "Massenstrom",
    quantity: "mass-flow",
    answerUnit: "kg/s",
    absoluteToleranceSI: 0.001,
    hint: "Stelle Q̇ = ṁ × cp × ΔT nach ṁ um.",
    steps: [
      "Q̇ = 8360 W, cp = 4180 J/(kg·K).",
      "ṁ = 8360 / (4180 × 4) = 0,5 kg/s.",
      "Alternativ: 0,5 × 3600 = 1800 kg/h.",
    ],
    mistakes: [
      "Nur durch ΔT statt durch cp × ΔT teilen.",
      "kg/h als kg/s einsetzen.",
    ],
    assumptions:
      "Fiktiver stationärer Wasserfall mit konstant angenommenem cp um 20 °C; kein Phasenwechsel auf dieser Seite.",
  },
  {
    ...shared,
    id: "calc-temperature-difference",
    topicId: "evaporation",
    domainId: "kaelte",
    level: "fachkraft",
    title: "Temperaturdifferenz bestimmen",
    prompt:
      "Ein sensibler Wasserstrom transportiert 12,54 kW. Bestimme die erforderliche Temperaturdifferenz.",
    article: { kind: "module", id: "evaporation" },
    formulaId: "sensible-temperature-difference",
    calculation: "temperature-difference",
    sourceIds: ["didactic-exercises", "openstax-heat-capacity-github"],
    givens: [
      {
        id: "heat",
        label: "Wärmeleistung",
        value: 12.54,
        unit: "kW",
        quantity: "power",
      },
      {
        id: "massFlow",
        label: "Massenstrom",
        value: 0.5,
        unit: "kg/s",
        quantity: "mass-flow",
      },
      {
        id: "cp",
        label: "Wärmekapazität",
        value: 4180,
        unit: "J/(kg·K)",
        quantity: "specific-heat",
      },
    ],
    sought: "Temperaturdifferenz",
    quantity: "temperature-difference",
    answerUnit: "K",
    absoluteToleranceSI: 0.02,
    hint: "Teile W durch Massenstrom und Wärmekapazität.",
    steps: ["12,54 kW = 12 540 W.", "ΔT = 12 540 / (0,5 × 4180) = 6 K."],
    mistakes: [
      "12,54 kW wie 12,54 W behandeln.",
      "Für eine Temperaturdifferenz 273,15 addieren.",
    ],
    assumptions:
      "Sensibler, stationärer Wärmeübergang, konstantes cp. Eine Temperaturdifferenz von 1 K entspricht einer Differenz von 1 °C.",
  },
  {
    ...shared,
    id: "calc-superheat",
    topicId: "superheat-subcooling",
    domainId: "kaelte",
    level: "grundlagen",
    title: "Überhitzung berechnen",
    prompt: "Bestimme die Überhitzung aus den zusammengehörigen Temperaturen.",
    article: { kind: "module", id: "superheat-subcooling" },
    formulaId: "superheat",
    calculation: "superheat",
    givens: [
      {
        id: "vaporTemperature",
        label: "Dampftemperatur",
        value: -4,
        unit: "°C",
        quantity: "temperature",
      },
      {
        id: "saturationTemperature",
        label: "Sättigungstemperatur (Dew)",
        value: -10,
        unit: "°C",
        quantity: "temperature",
      },
    ],
    sought: "Überhitzung",
    quantity: "temperature-difference",
    answerUnit: "K",
    absoluteToleranceSI: 0.02,
    hint: "Dampftemperatur minus Sättigungstemperatur. Achte auf die Klammer.",
    steps: [
      "TDampf = 269,15 K; TSättigung = 263,15 K.",
      "ΔTÜ = 269,15 − 263,15 = 6 K.",
      "Gleichwertig: −4 − (−10) = 6 K.",
    ],
    mistakes: [
      "−4 − 10 statt −4 − (−10) rechnen.",
      "Bubble statt Dew bei einem zeotropen Gemisch verwenden.",
    ],
    assumptions:
      "Fiktive Messwerte am selben Ort, korrektes Kältemittel und Dew-Bezug vorausgesetzt. Keine Stoffdatentabelle und kein Sollwert.",
  },
  {
    ...shared,
    id: "calc-subcooling",
    topicId: "superheat-subcooling",
    domainId: "kaelte",
    level: "grundlagen",
    title: "Unterkühlung berechnen",
    prompt:
      "Bestimme die Unterkühlung aus den zusammengehörigen Temperaturen der Flüssigkeitsseite.",
    article: { kind: "module", id: "superheat-subcooling" },
    formulaId: "subcooling",
    calculation: "subcooling",
    givens: [
      {
        id: "saturationTemperature",
        label: "Sättigungstemperatur (Bubble)",
        value: 40,
        unit: "°C",
        quantity: "temperature",
      },
      {
        id: "liquidTemperature",
        label: "Flüssigkeitstemperatur",
        value: 35,
        unit: "°C",
        quantity: "temperature",
      },
    ],
    sought: "Unterkühlung",
    quantity: "temperature-difference",
    answerUnit: "K",
    absoluteToleranceSI: 0.02,
    hint: "Bei Unterkühlung: Sättigung minus Flüssigkeit.",
    steps: [
      "TSättigung = 313,15 K; TFlüssigkeit = 308,15 K.",
      "ΔTU = 313,15 − 308,15 = 5 K.",
    ],
    mistakes: [
      "Die Reihenfolge wie bei der Überhitzung wählen.",
      "Aus 5 K eine pauschale Füllmengendiagnose ableiten.",
    ],
    assumptions:
      "Fiktive Messwerte, gleicher örtlicher Druck, korrekte Bubble-Zuordnung vorausgesetzt. Kein universeller Sollwert.",
  },
  {
    ...shared,
    id: "calc-electric-dc",
    topicId: "electric-power-topic",
    domainId: "elektro",
    level: "grundlagen",
    title: "Elektrische Gleichstromleistung",
    prompt:
      "Eine stationäre Gleichstromlast wird mit 24 V versorgt und nimmt 2 A auf. Welche Leistung wird umgesetzt?",
    article: { kind: "note", id: "electric-power-note" },
    formulaId: "dc-electric-power",
    calculation: "dc-power",
    sourceIds: ["didactic-exercises", "openstax-electric-github"],
    givens: [
      {
        id: "voltage",
        label: "Gleichspannung",
        value: 24,
        unit: "V",
        quantity: "voltage",
      },
      {
        id: "current",
        label: "Gleichstrom",
        value: 2,
        unit: "A",
        quantity: "current",
      },
    ],
    sought: "Elektrische Leistung",
    quantity: "power",
    answerUnit: "W",
    absoluteToleranceSI: 0.1,
    hint: "Für diesen Gleichstromfall gilt P = U × I.",
    steps: ["P = 24 V × 2 A = 48 W.", "48 W = 0,048 kW."],
    mistakes: [
      "Spannung durch Strom teilen; das wäre Widerstand.",
      "Die Gleichstromformel pauschal als Wirkleistung für Wechsel-/Drehstrom einsetzen.",
    ],
    assumptions:
      "Ausschließlich stationärer Gleichstromfall mit konstanten Werten. Keine Anleitung zur Arbeit an elektrischen Anlagen.",
  },
  {
    ...shared,
    id: "calc-cooling-cop",
    topicId: "cycle-basics",
    domainId: "kaelte",
    level: "fachkraft",
    title: "Kälteleistungszahl",
    prompt:
      "Eine Anlage liefert 7,5 kW Nutzkälte bei 2,5 kW zugehöriger elektrischer Leistung. Berechne die Kälteleistungszahl.",
    article: { kind: "note", id: "cop-note" },
    formulaId: "cooling-cop",
    calculation: "cooling-cop",
    sourceIds: ["didactic-exercises", "openstax-cop-github"],
    givens: [
      {
        id: "coolingPower",
        label: "Nutzkälteleistung",
        value: 7.5,
        unit: "kW",
        quantity: "power",
      },
      {
        id: "electricPower",
        label: "Elektrische Leistung",
        value: 2.5,
        unit: "kW",
        quantity: "power",
      },
    ],
    sought: "Kälteleistungszahl ε",
    quantity: "ratio",
    answerUnit: "1",
    absoluteToleranceSI: 0.01,
    hint: "Thermischen Nutzen durch elektrische Leistung teilen.",
    steps: [
      "Beide Leistungen in W: 7500 und 2500.",
      "ε = 7500 / 2500 = 3.",
      "W/W kürzt sich; das Ergebnis ist dimensionslos.",
    ],
    mistakes: [
      "Die Leistungen vertauschen.",
      "Eine momentane Leistungszahl als Jahresarbeitszahl bezeichnen.",
    ],
    assumptions:
      "Fiktive, zeitlich zusammengehörige Leistungen mit gleicher Systemgrenze. Kein garantierter Gerätekennwert.",
  },
  {
    ...shared,
    id: "calc-heating-cop",
    topicId: "cycle-basics",
    domainId: "kaelte",
    level: "meister",
    title: "Heiz-COP und Kälteleistungszahl trennen",
    prompt:
      "Eine idealisierte Wärmepumpe gibt 10 kW Heizleistung bei 2,5 kW elektrischer Leistung ab. Bestimme den Heiz-COP.",
    article: { kind: "note", id: "cop-note" },
    formulaId: "heating-cop",
    calculation: "heating-cop",
    sourceIds: ["didactic-exercises", "openstax-cop-github"],
    givens: [
      {
        id: "heatingPower",
        label: "Nutzheizleistung",
        value: 10,
        unit: "kW",
        quantity: "power",
      },
      {
        id: "electricPower",
        label: "Elektrische Leistung",
        value: 2.5,
        unit: "kW",
        quantity: "power",
      },
    ],
    sought: "Heiz-COP",
    quantity: "ratio",
    answerUnit: "1",
    absoluteToleranceSI: 0.01,
    hint: "Nutzen ist die Heizleistung, nicht die aufgenommene Kälteleistung.",
    steps: [
      "COPHeiz = 10 000 W / 2500 W = 4.",
      "Im verlustfrei idealisierten selben Kreis wäre Q̇₀ = 10 − 2,5 = 7,5 kW.",
      "Dessen Kälteleistungszahl wäre 7,5 / 2,5 = 3.",
    ],
    mistakes: [
      "Heiz-COP und Kälteleistungszahl gleichsetzen.",
      "Die Modellbeziehung ohne Prüfung der Systemgrenzen auf jede Messanordnung übertragen.",
    ],
    assumptions:
      "Fiktiver stationärer Betriebspunkt; elektrische Leistung passend abgegrenzt. Kein saisonaler oder Herstellerkennwert.",
  },
];

numericTasks.push(...electricalTasks);

for (const task of numericTasks) task.texSteps = solutionNotation[task.id];

numericTasks.push(...mathematicsTasks);

numericTasks.push(...physicsTasks);

numericTasks.push(...chemistryTasks);

for (const task of numericTasks) task.requiredCompetencyIds = taskCompetencies(task);
