import type { AcademyQuestion, Flashcard } from "../model";

// Veröffentlichte Antwort-IDs bleiben auch beim Umordnen stabil.
export const academyQuestions: AcademyQuestion[] = [
  {
    id: "cycle-q1",
    revision: 1,
    moduleId: "cycle-basics",
    level: "grundlagen",
    objectiveId: "cycle-order",
    prompt: "Welche Reihenfolge beschreibt den Kreislauf ab dem Verdampfer?",
    options: [
      {
        id: "cycle-q1-a",
        text: "Verdampfer → Verflüssiger → Verdichter → Drossel",
      },
      {
        id: "cycle-q1-b",
        text: "Verdampfer → Verdichter → Verflüssiger → Drossel",
      },
      {
        id: "cycle-q1-c",
        text: "Verdampfer → Drossel → Verdichter → Verflüssiger",
      },
    ],
    correctOptionId: "cycle-q1-b",
    explanation:
      "Der Verdichter fördert den Dampf auf das höhere Druckniveau. Nach Wärmeabgabe und Verflüssigung senkt die Drossel den Druck vor dem Verdampfer.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cycle-q2",
    revision: 1,
    moduleId: "cycle-basics",
    level: "grundlagen",
    objectiveId: "cycle-balance-objective",
    prompt:
      "7,5 kW Wärmeaufnahme und 2 kW Fluidleistung: Welche Wärmeabgabe folgt im vereinfachten Modell?",
    options: [
      {
        id: "cycle-q2-a",
        text: "5,5 kW",
      },
      {
        id: "cycle-q2-b",
        text: "7,5 kW",
      },
      {
        id: "cycle-q2-c",
        text: "9,5 kW",
      },
    ],
    correctOptionId: "cycle-q2-c",
    explanation:
      "7,5 + 2 = 9,5 kW. Das setzt unsere stationäre Systemgrenze ohne weitere Wärmeverluste voraus; es ist keine allgemeine Gleichsetzung mit elektrischer Anschlussleistung.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cycle-q3",
    revision: 1,
    moduleId: "cycle-basics",
    level: "fachkraft",
    objectiveId: "cycle-balance-objective",
    prompt: "Welche Einheit ergibt kg/s × kJ/kg?",
    options: [
      {
        id: "cycle-q3-a",
        text: "kJ/s und damit kW",
      },
      {
        id: "cycle-q3-b",
        text: "kWh",
      },
      {
        id: "cycle-q3-c",
        text: "K",
      },
    ],
    correctOptionId: "cycle-q3-a",
    explanation:
      "Die Masseeinheit kürzt sich, es bleibt Energie pro Zeit. Eine Leistung in kW ist nicht mit einer Energiemenge in kWh gleichzusetzen.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cycle-q4",
    revision: 1,
    moduleId: "cycle-basics",
    level: "meister",
    objectiveId: "cycle-balance-objective",
    prompt:
      "7,5/2 = 3,75 aus Q̇₀ und Fluidleistung: Ist das ein belegter elektrischer Geräte-COP?",
    options: [
      {
        id: "cycle-q4-a",
        text: "Ja, immer.",
      },
      {
        id: "cycle-q4-b",
        text: "Nur bei exakt 0 °C Verdampfung.",
      },
      {
        id: "cycle-q4-c",
        text: "Nein, elektrische Leistung und Systemgrenze müssen gesondert bekannt sein.",
      },
    ],
    correctOptionId: "cycle-q4-c",
    explanation:
      "Das Verhältnis verwendet hier Fluidleistung. Für eine elektrische Kennzahl müssen elektrische Eingangsleistung, Hilfsenergien und Betriebsbedingungen passend definiert sein.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "evap-q1",
    revision: 1,
    moduleId: "evaporation",
    level: "grundlagen",
    objectiveId: "evap-state",
    prompt: "Welche Aufgabe erfüllt der Verdampfer?",
    options: [
      {
        id: "evap-q1-a",
        text: "Wärme an das Kühlmedium abgeben",
      },
      {
        id: "evap-q1-b",
        text: "Wärme aufnehmen und Kältemittel verdampfen",
      },
      {
        id: "evap-q1-c",
        text: "Dampf auf höheren Druck verdichten",
      },
    ],
    correctOptionId: "evap-q1-b",
    explanation:
      "Das Kältemittel nimmt Wärme auf; sein Flüssigkeitsanteil verdampft. Der Verdichter übernimmt die Druckerhöhung, der Verflüssiger die Wärmeabgabe.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "evap-q2",
    revision: 1,
    moduleId: "evaporation",
    level: "grundlagen",
    objectiveId: "evap-state",
    prompt: "Was unterscheidet Überhitzung von Verdampfung?",
    options: [
      {
        id: "evap-q2-a",
        text: "Überhitzung erwärmt bereits vollständig gasförmiges Kältemittel.",
      },
      {
        id: "evap-q2-b",
        text: "Beide Begriffe bedeuten exakt dasselbe.",
      },
      {
        id: "evap-q2-c",
        text: "Überhitzung ist das Gefrieren der Flüssigkeit.",
      },
    ],
    correctOptionId: "evap-q2-a",
    explanation:
      "Verdampfen ist ein Phasenwechsel. Überhitzung bezeichnet dagegen den Temperaturabstand des Dampfes oberhalb des passenden Sättigungszustands.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "evap-q3",
    revision: 1,
    moduleId: "evaporation",
    level: "fachkraft",
    objectiveId: "evap-power-objective",
    prompt:
      "ṁ = 0,05 kg/s, h₁ − h₄ = 150 kJ/kg: Welche Verdampferleistung folgt?",
    options: [
      {
        id: "evap-q3-a",
        text: "150 kW",
      },
      {
        id: "evap-q3-b",
        text: "0,333 kW",
      },
      {
        id: "evap-q3-c",
        text: "7,5 kW",
      },
    ],
    correctOptionId: "evap-q3-c",
    explanation:
      "0,05 × 150 = 7,5 kJ/s = 7,5 kW. Die Enthalpiedifferenz umfasst im Modell auch den Phasenwechsel.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "evap-q4",
    revision: 1,
    moduleId: "evaporation",
    level: "meister",
    objectiveId: "evap-power-objective",
    prompt:
      "Reicht ṁLuft × cp × ΔT bei einem Luftkühler mit Entfeuchtung für die gesamte Last?",
    options: [
      {
        id: "evap-q4-a",
        text: "Ja, auch die Kondensationswärme ist enthalten.",
      },
      {
        id: "evap-q4-b",
        text: "Nein, latente Anteile müssen zusätzlich berücksichtigt werden.",
      },
      {
        id: "evap-q4-c",
        text: "Nur wenn cp in J statt kJ eingesetzt wird.",
      },
    ],
    correctOptionId: "evap-q4-b",
    explanation:
      "Die sensible Temperaturänderung erfasst die Entfeuchtung nicht vollständig. Einheitenwechsel beheben keine fehlenden physikalischen Anteile.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "comp-q1",
    revision: 1,
    moduleId: "compression",
    level: "grundlagen",
    objectiveId: "compressor-state",
    prompt: "Was steigt bei üblicher Verdichtung des Kältemitteldampfes?",
    options: [
      {
        id: "comp-q1-a",
        text: "Druck und Temperatur",
      },
      {
        id: "comp-q1-b",
        text: "Nur die Flüssigkeitsmenge",
      },
      {
        id: "comp-q1-c",
        text: "Weder Druck noch Temperatur",
      },
    ],
    correctOptionId: "comp-q1-a",
    explanation:
      "Zugeführte Arbeit erhöht den Druck; die Temperatur steigt im üblichen Prozess ebenfalls. Das Kältemittel wird dabei nicht absichtlich flüssig verdichtet.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "comp-q2",
    revision: 1,
    moduleId: "compression",
    level: "grundlagen",
    objectiveId: "compressor-state",
    prompt: "Warum ist Flüssigkeit im Ansaugbereich problematisch?",
    options: [
      {
        id: "comp-q2-a",
        text: "Sie hat grundsätzlich keinen Druck.",
      },
      {
        id: "comp-q2-b",
        text: "Sie lässt sich kaum komprimieren und kann Schäden verursachen.",
      },
      {
        id: "comp-q2-c",
        text: "Sie enthält keine Energie.",
      },
    ],
    correctOptionId: "comp-q2-b",
    explanation:
      "Ein üblicher Verdichter ist für Dampf ausgelegt. Flüssigkeitsschläge können mechanische Schäden verursachen; der Zustand muss nach Herstellervorgaben beurteilt werden.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "comp-q3",
    revision: 1,
    moduleId: "compression",
    level: "fachkraft",
    objectiveId: "compressor-power-objective",
    prompt: "0,05 kg/s × (440 − 400) kJ/kg ergeben im adiabaten Modell …",
    options: [
      {
        id: "comp-q3-a",
        text: "2 kWh elektrische Energie",
      },
      {
        id: "comp-q3-b",
        text: "40 kW Anschlussleistung",
      },
      {
        id: "comp-q3-c",
        text: "2 kW Fluidleistung",
      },
    ],
    correctOptionId: "comp-q3-c",
    explanation:
      "0,05 × 40 = 2 kW. Das Ergebnis beschreibt die Enthalpiezunahme des Fluids und ist nicht automatisch die elektrische Leistungsaufnahme.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "comp-q4",
    revision: 1,
    moduleId: "compression",
    level: "meister",
    objectiveId: "compressor-power-objective",
    prompt:
      "Welche Druckwerte brauchst du für ein thermodynamisches Druckverhältnis?",
    options: [
      {
        id: "comp-q4-a",
        text: "Absolute Drücke",
      },
      {
        id: "comp-q4-b",
        text: "Beliebige Überdrücke",
      },
      {
        id: "comp-q4-c",
        text: "Nur die Druckdifferenz",
      },
    ],
    correctOptionId: "comp-q4-a",
    explanation:
      "Das Verhältnis wird aus absoluten Drücken gebildet. Bei relativen Manometerwerten muss der passende Umgebungsdruck berücksichtigt werden.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cond-q1",
    revision: 1,
    moduleId: "condensation",
    level: "grundlagen",
    objectiveId: "cond-state",
    prompt: "Was geschieht bei der Kondensation?",
    options: [
      {
        id: "cond-q1-a",
        text: "Flüssigkeit nimmt Wärme auf und wird Dampf.",
      },
      {
        id: "cond-q1-b",
        text: "Dampf gibt Wärme ab und wird Flüssigkeit.",
      },
      {
        id: "cond-q1-c",
        text: "Der Verdichter senkt den Druck.",
      },
    ],
    correctOptionId: "cond-q1-b",
    explanation:
      "Kondensation ist der Übergang von Dampf zu Flüssigkeit unter Wärmeabgabe. Die Druckabsenkung übernimmt im üblichen Kreis das Expansionsorgan.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cond-q2",
    revision: 1,
    moduleId: "condensation",
    level: "grundlagen",
    objectiveId: "cond-state",
    prompt: "Welche Abschnittsfolge ist im Verflüssiger möglich?",
    options: [
      {
        id: "cond-q2-a",
        text: "Enthitzen → kondensieren → unterkühlen",
      },
      {
        id: "cond-q2-b",
        text: "Unterkühlen → verdampfen → verdichten",
      },
      {
        id: "cond-q2-c",
        text: "Verdichten → entspannen → vereisen",
      },
    ],
    correctOptionId: "cond-q2-a",
    explanation:
      "Der überhitzte Dampf wird zuerst enthitzt, dann verflüssigt. Anschließend kann die Flüssigkeit weiter unterkühlt werden; die Ausprägung hängt vom Betrieb ab.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cond-q3",
    revision: 1,
    moduleId: "condensation",
    level: "fachkraft",
    objectiveId: "cond-power-objective",
    prompt:
      "ṁ = 0,05 kg/s, h₂ = 440 und h₃ = 250 kJ/kg: Welche Wärmeabgabe folgt?",
    options: [
      {
        id: "cond-q3-a",
        text: "2 kW",
      },
      {
        id: "cond-q3-b",
        text: "7,5 kW",
      },
      {
        id: "cond-q3-c",
        text: "9,5 kW",
      },
    ],
    correctOptionId: "cond-q3-c",
    explanation:
      "0,05 × (440 − 250) = 9,5 kW. Die Enthalpiebilanz erfasst die gesamte Wärmeabgabe zwischen den definierten Zuständen.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cond-q4",
    revision: 1,
    moduleId: "condensation",
    level: "meister",
    objectiveId: "cond-power-objective",
    prompt: "Beweist hohe Unterkühlung allein eine Überfüllung?",
    options: [
      {
        id: "cond-q4-a",
        text: "Ja, unabhängig vom Anlagenaufbau.",
      },
      {
        id: "cond-q4-b",
        text: "Nein, Last, Aufbau, Sammler und Messort müssen berücksichtigt werden.",
      },
      {
        id: "cond-q4-c",
        text: "Ja, sobald die Temperatur positiv ist.",
      },
    ],
    correctOptionId: "cond-q4-b",
    explanation:
      "Ein einzelner Temperaturabstand ist keine eindeutige Füllmengendiagnose. Der Anlagenkontext und die Messbedingungen müssen zur Hypothese passen.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "sh-q1",
    revision: 1,
    moduleId: "superheat-subcooling",
    level: "grundlagen",
    objectiveId: "sh-measure",
    prompt: "Dampf −4 °C, Sättigung −10 °C: Wie groß ist die Überhitzung?",
    options: [
      {
        id: "sh-q1-a",
        text: "−6 K",
      },
      {
        id: "sh-q1-b",
        text: "14 K",
      },
      {
        id: "sh-q1-c",
        text: "6 K",
      },
    ],
    correctOptionId: "sh-q1-c",
    explanation:
      "−4 − (−10) = 6 K. Die Klammer ist entscheidend; das Abziehen einer negativen Zahl erhöht den Wert.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "sh-q2",
    revision: 1,
    moduleId: "superheat-subcooling",
    level: "grundlagen",
    objectiveId: "sh-measure",
    prompt: "Sättigung 40 °C, Flüssigkeit 35 °C: Welche Unterkühlung folgt?",
    options: [
      {
        id: "sh-q2-a",
        text: "5 K",
      },
      {
        id: "sh-q2-b",
        text: "−5 K",
      },
      {
        id: "sh-q2-c",
        text: "75 K",
      },
    ],
    correctOptionId: "sh-q2-a",
    explanation:
      "40 − 35 = 5 K. Bei der Unterkühlung wird die Flüssigkeitstemperatur von der Sättigungstemperatur abgezogen.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "sh-q3",
    revision: 1,
    moduleId: "superheat-subcooling",
    level: "fachkraft",
    objectiveId: "sh-diagnosis",
    prompt:
      "Welcher Sättigungspunkt ist bei zeotropen Gemischen für die Überhitzung maßgeblich?",
    options: [
      {
        id: "sh-q3-a",
        text: "Bubble (Siedepunkt)",
      },
      {
        id: "sh-q3-b",
        text: "Dew (Taupunkt)",
      },
      {
        id: "sh-q3-c",
        text: "Der Mittelwert beider Punkte",
      },
    ],
    correctOptionId: "sh-q3-b",
    explanation:
      "Dew ist der Bezug für den Dampf. Für die Unterkühlung der Flüssigkeit wird dagegen Bubble verwendet; der örtliche Druck muss jeweils passen.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "sh-q4",
    revision: 1,
    moduleId: "superheat-subcooling",
    level: "meister",
    objectiveId: "sh-diagnosis",
    prompt:
      "Zwei angenommene Fehlergrenzen von je ±0,5 K: Welche konservative Grenze ergibt sich für die Differenz?",
    options: [
      {
        id: "sh-q4-a",
        text: "±0 K",
      },
      {
        id: "sh-q4-b",
        text: "Immer ±0,25 K",
      },
      {
        id: "sh-q4-c",
        text: "±1 K",
      },
    ],
    correctOptionId: "sh-q4-c",
    explanation:
      "Im ungünstigsten Fall addieren sich die Beträge zu 1 K. Das ist eine konservative Fehlergrenze und keine statistische Standardunsicherheit ohne weitere Annahmen.",
    sourceIds: ["openstax-heat-pumps"],
  },
];

export const flashcards: Flashcard[] = [
  {
    id: "cycle-card1",
    revision: 1,
    moduleId: "cycle-basics",
    front: "Wie lautet die Bauteilreihenfolge ab dem Verdampfer?",
    back: "Verdampfer → Verdichter → Verflüssiger → Expansionsorgan → Verdampfer. Wärmeaufnahme auf niedrigem, Wärmeabgabe auf hohem Druckniveau.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "cycle-card2",
    revision: 1,
    moduleId: "cycle-basics",
    front:
      "Warum gibt der Verflüssiger im Modell mehr Wärme ab als der Verdampfer aufnimmt?",
    back: "Die dem Fluid zugeführte Verdichterarbeit kommt hinzu: 7,5 kW + 2 kW = 9,5 kW. Systemgrenze und Verlustannahmen beachten.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "evap-card1",
    revision: 1,
    moduleId: "evaporation",
    front: "Verdampfung oder Überhitzung: Was ist der Unterschied?",
    back: "Verdampfung ist Flüssigkeit → Dampf. Überhitzung ist der Temperaturabstand des vollständig gasförmigen Kältemittels oberhalb der Sättigungstemperatur.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "evap-card2",
    revision: 1,
    moduleId: "evaporation",
    front: "Welche Leistungsformel erfasst den Phasenwechsel im Verdampfer?",
    back: "Q̇₀ = ṁ × (h₁ − h₄). Die Enthalpiedifferenz berücksichtigt Verdampfung und gegebenenfalls Überhitzung. cp × ΔT allein reicht beim Phasenwechsel nicht.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "comp-card1",
    revision: 1,
    moduleId: "compression",
    front: "Was bedeutet adiabatisch?",
    back: "Kein Wärmeaustausch über die Systemgrenze. Zugeführte Arbeit kann trotzdem Temperatur und Enthalpie erhöhen.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "comp-card2",
    revision: 1,
    moduleId: "compression",
    front: "Ist ṁ × (h₂ − h₁) immer die elektrische Leistung?",
    back: "Nein. Unter den genannten Modellannahmen ist es die Fluidleistung. Elektrische Leistung und Verluste müssen getrennt bilanziert werden.",
    sourceIds: ["didactic-cycle"],
  },
  {
    id: "cond-card1",
    revision: 1,
    moduleId: "condensation",
    front: "Welche drei Abschnitte können im Verflüssiger auftreten?",
    back: "Enthitzung des Dampfes, Kondensation und anschließende Unterkühlung der Flüssigkeit.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "cond-card2",
    revision: 1,
    moduleId: "condensation",
    front: "Was beschreibt Unterkühlung und was nicht?",
    back: "Einen Temperaturabstand der Flüssigkeit zur Sättigung, keine Wärmeleistung und keine eindeutige Füllmengendiagnose.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "sh-card1",
    revision: 1,
    moduleId: "superheat-subcooling",
    front: "Dew oder Bubble: Was gehört wohin?",
    back: "Dew/Taupunkt für Überhitzung des Dampfes, Bubble/Siedepunkt für Unterkühlung der Flüssigkeit bei zeotropen Gemischen.",
    sourceIds: ["openstax-heat-pumps"],
  },
  {
    id: "sh-card2",
    revision: 1,
    moduleId: "superheat-subcooling",
    front: "Wie rechnest du Überhitzung und Unterkühlung?",
    back: "Überhitzung = TDampf − TSättigung. Unterkühlung = TSättigung − TFlüssigkeit. Druck, Kältemittel und Messort müssen passen; Unterschiede in K angeben.",
    sourceIds: ["openstax-heat-pumps"],
  },
];
