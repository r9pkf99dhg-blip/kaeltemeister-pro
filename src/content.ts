import type { Article, QuizQuestion } from "./content-types";

export const articles = [
  {
    id: "kreislauf",
    title: "Den Kältekreislauf verstehen",
    category: "Grundlagen",
    minutes: 7,
    intro:
      "Vier Bauteile. Ein Kreislauf. Und ein Prinzip: Wärme von einem kälteren Ort an einen wärmeren Ort transportieren.",
    sections: [
      {
        title: "Warum wird es überhaupt kalt?",
        text: "Eine Kälteanlage erzeugt keine „Kälte“, sondern entzieht einem Raum oder Stoff Wärme. Das Kältemittel nimmt diese Wärme im Verdampfer auf und gibt sie im Verflüssiger wieder ab. Der Verdichter benötigt dafür Antriebsenergie.",
      },
      {
        title: "1 · Verdampfen: Wärme aufnehmen",
        text: "Nach dem Expansionsventil liegt das Kältemittel als Flüssigkeits-Dampf-Gemisch auf niedrigem Druckniveau vor. Im Verdampfer nimmt es Wärme aus seiner Umgebung auf. Die Flüssigkeit verdampft. Am Ausgang ist das Kältemittel im normalen Betrieb vollständig gasförmig und etwas überhitzt.",
      },
      {
        title: "2 · Verdichten: Druck und Temperatur erhöhen",
        text: "Der Verdichter saugt den Dampf an und verdichtet ihn. Dabei steigen Druck und Temperatur. Flüssigkeit soll nicht in den Verdichter gelangen: Sie lässt sich kaum komprimieren und kann Schäden verursachen. Die aufgenommene elektrische Leistung wird dem Kreislauf als Energie zugeführt.",
      },
      {
        title: "3 · Verflüssigen: Wärme abgeben",
        text: "Der heiße Dampf gibt im Verflüssiger Wärme an die Umgebung ab und kondensiert auf hohem Druckniveau. Die abgegebene Wärme setzt sich näherungsweise aus der aufgenommenen Kälteleistung und der zugeführten Verdichterleistung zusammen. Anschließend kann die Flüssigkeit weiter unterkühlt werden.",
      },
      {
        title: "4 · Entspannen: Druck absenken",
        text: "Das Expansionsorgan drosselt das flüssige Kältemittel auf den Verdampfungsdruck. Die Drosselung verläuft näherungsweise isenthalp, also bei gleicher spezifischer Enthalpie. Ein Teil der Flüssigkeit verdampft dabei sofort. Das kalte Gemisch strömt wieder zum Verdampfer.",
      },
    ],
    takeaway:
      "Verdampfer → Verdichter → Verflüssiger → Expansionsorgan. Wärmeaufnahme auf der Niederdruckseite, Wärmeabgabe auf der Hochdruckseite.",
  },
  {
    id: "ueberhitzung",
    title: "Überhitzung richtig einordnen",
    category: "Anlagenpraxis",
    minutes: 5,
    intro:
      "Überhitzung zeigt dir, wie weit der Kältemitteldampf über seiner Sättigungstemperatur liegt.",
    sections: [
      {
        title: "Was bedeutet Überhitzung?",
        text: "Überhitzung ist die Differenz zwischen der tatsächlichen Dampftemperatur und der zum örtlichen Druck gehörenden Sättigungstemperatur. Formel: Überhitzung = Dampftemperatur − Sättigungstemperatur. Temperaturdifferenzen gibst du in Kelvin (K) an.",
      },
      {
        title: "Ein Beispiel aus der Praxis",
        text: "Du ermittelst am Verdampferaustritt aus dem Druck eine Sättigungstemperatur von −10 °C und misst dort eine Rohrtemperatur von −4 °C. Die Überhitzung beträgt: −4 − (−10) = 6 K. Druck und Temperatur müssen sich auf denselben Messort beziehen; Druckverluste sind zu berücksichtigen.",
      },
      {
        title: "Warum messen wir sie?",
        text: "Eine passende Überhitzung hilft, einen trockenen Dampf am Verdampferaustritt sicherzustellen. Sehr geringe Überhitzung kann auf Flüssigkeitsmitriss hindeuten. Eine hohe Überhitzung kann zum Beispiel bei zu geringer Kältemittelzufuhr oder zusätzlicher Erwärmung der Saugleitung auftreten. Ein Messwert allein liefert keine eindeutige Fehlerdiagnose.",
      },
      {
        title: "Worauf musst du achten?",
        text: "Bei zeotropen Gemischen verwendest du für die Überhitzung den Taupunkt (Dew). Wähle am Messgerät das richtige Kältemittel und die passende Druckreferenz. Befestige den Temperaturfühler mit gutem thermischem Kontakt und isoliere die Messstelle. Sollwerte richten sich nach Hersteller und Betriebsbedingungen.",
      },
    ],
    takeaway:
      "Überhitzung = gemessene Dampftemperatur − Sättigungstemperatur am gleichen Druck. Bei Gemischen: Taupunkt verwenden.",
  },
  {
    id: "unterkuehlung",
    title: "Unterkühlung sicher bestimmen",
    category: "Anlagenpraxis",
    minutes: 5,
    intro:
      "Unterkühlung beschreibt den Temperaturabstand einer Flüssigkeit zu ihrer Sättigungstemperatur.",
    sections: [
      {
        title: "Was ist Unterkühlung?",
        text: "Nach der vollständigen Verflüssigung kann das flüssige Kältemittel weiter abkühlen. Unterkühlung = Sättigungstemperatur − gemessene Flüssigkeitstemperatur. Auch diese Temperaturdifferenz wird in Kelvin angegeben.",
      },
      {
        title: "So rechnest du",
        text: "Die zum örtlichen Druck gehörende Sättigungstemperatur beträgt 40 °C. Die Flüssigkeitsleitung hat an dieser Stelle 35 °C. Daraus folgt: 40 − 35 = 5 K Unterkühlung. Verwende zusammengehörige Druck- und Temperaturmessungen.",
      },
      {
        title: "Wozu ist das gut?",
        text: "Unterkühlung bietet eine Reserve gegen vorzeitige Dampfblasenbildung in der Flüssigkeitsleitung. Druckverluste und Wärmeeintrag können diese Reserve verringern. Dampf vor dem Expansionsorgan kann dessen Versorgung beeinträchtigen. Die passende Unterkühlung hängt von Anlage und Herstellerangaben ab.",
      },
      {
        title: "Gemische und Diagnose",
        text: "Bei zeotropen Gemischen nutzt du für die Unterkühlung den Siedepunkt (Bubble). Leite aus einem einzelnen Unterkühlungswert keine pauschale Aussage zur Füllmenge ab: Anlagenaufbau, Sammler, Last und Messort beeinflussen den Wert. Arbeiten am Kältekreis gehören in qualifizierte Hände.",
      },
    ],
    takeaway:
      "Unterkühlung = Sättigungstemperatur − Flüssigkeitstemperatur. Bei Gemischen: Siedepunkt verwenden.",
  },
] satisfies Article[];

export const questions = [
  {
    question: "Wo nimmt das Kältemittel Wärme aus dem zu kühlenden Raum auf?",
    options: [
      "Im Verflüssiger",
      "Im Verdampfer",
      "Im Verdichter",
      "Im Sammler",
    ],
    correct: 1,
    explanation:
      "Im Verdampfer nimmt das Kältemittel Wärme auf und verdampft dabei auf niedrigem Druckniveau.",
  },
  {
    question: "Was bewirkt der Verdichter im normalen Betrieb?",
    options: [
      "Er senkt Druck und Temperatur.",
      "Er verflüssigt das Kältemittel direkt.",
      "Er erhöht Druck und Temperatur des Dampfes.",
      "Er entspannt die Flüssigkeit.",
    ],
    correct: 2,
    explanation:
      "Der Verdichter führt Arbeit zu und verdichtet gasförmiges Kältemittel. Druck und Temperatur steigen.",
  },
  {
    question: "Was geschieht im Verflüssiger?",
    options: [
      "Das Kältemittel gibt Wärme ab und kondensiert.",
      "Das Kältemittel nimmt Raumwärme auf.",
      "Der Druck wird auf Verdampfungsdruck abgesenkt.",
      "Der Verdichter wird mit Flüssigkeit versorgt.",
    ],
    correct: 0,
    explanation:
      "Im Verflüssiger wird Wärme an die Umgebung abgegeben. Aus Dampf wird Flüssigkeit.",
  },
  {
    question:
      "Welche Zustandsgröße bleibt bei einer idealisierten Drosselung gleich?",
    options: ["Temperatur", "Druck", "Dichte", "Spezifische Enthalpie"],
    correct: 3,
    explanation:
      "Die Drosselung am Expansionsorgan wird näherungsweise als isenthalp betrachtet.",
  },
  {
    question:
      "Sättigungstemperatur −10 °C, Dampftemperatur −4 °C: Wie groß ist die Überhitzung?",
    options: ["−6 K", "6 K", "14 K", "−14 K"],
    correct: 1,
    explanation:
      "Überhitzung = −4 − (−10) = 6 K. Eine Temperaturdifferenz wird in Kelvin angegeben.",
  },
  {
    question:
      "Sättigungstemperatur 40 °C, Flüssigkeitstemperatur 35 °C: Wie groß ist die Unterkühlung?",
    options: ["75 K", "−5 K", "5 K", "0 K"],
    correct: 2,
    explanation: "Unterkühlung = 40 − 35 = 5 K.",
  },
  {
    question:
      "Welchen Sättigungspunkt nutzt du bei zeotropen Gemischen für die Überhitzung?",
    options: [
      "Den Taupunkt (Dew)",
      "Den Siedepunkt (Bubble)",
      "Den Gefrierpunkt",
      "Immer 0 °C",
    ],
    correct: 0,
    explanation:
      "Für überhitzten Dampf ist der Taupunkt maßgeblich; für unterkühlte Flüssigkeit der Siedepunkt.",
  },
  {
    question: "Warum soll keine Flüssigkeit in den Verdichter gelangen?",
    options: [
      "Weil Flüssigkeit immer wärmer als Dampf ist.",
      "Weil sonst der Druck sofort auf null fällt.",
      "Weil Flüssigkeit keinen Wärmetransport erlaubt.",
      "Weil Flüssigkeit kaum komprimierbar ist und Schäden verursachen kann.",
    ],
    correct: 3,
    explanation:
      "Flüssigkeitsschläge können den Verdichter beschädigen. Er ist für die Verdichtung von Dampf ausgelegt.",
  },
  {
    question: "Welche Einheit ergibt kg/s × kJ/(kg·K) × K?",
    options: ["kWh", "kW", "kg/h", "°C"],
    correct: 1,
    explanation:
      "kg und K kürzen sich. Es bleibt kJ/s und damit kW, also eine Leistung.",
  },
  {
    question:
      "Wasser: ṁ = 0,5 kg/s, cp = 4,18 kJ/(kg·K), ΔT = 5 K. Wie groß ist Q̇?",
    options: ["1,045 kW", "41,8 kW", "10,45 kW", "104,5 kW"],
    correct: 2,
    explanation:
      "Q̇ = 0,5 × 4,18 × 5 = 10,45 kW. Das gilt für sensible Wärme ohne Phasenwechsel.",
  },
  {
    question: "Was bedeutet „sensible Wärme“?",
    options: [
      "Wärme, die eine Temperaturänderung ohne Phasenwechsel bewirkt.",
      "Nur die Verdampfungswärme.",
      "Eine elektrische Spannung.",
      "Die gesamte Wärme bei Kondensation.",
    ],
    correct: 0,
    explanation:
      "Sensible Wärme verändert die Temperatur. Bei einem Phasenwechsel muss zusätzlich latente Wärme berücksichtigt werden.",
  },
  {
    question: "Welche Aussage zur Anlagenbeurteilung ist richtig?",
    options: [
      "Ein einzelner Messwert bestimmt immer die Füllmenge.",
      "Jede Anlage braucht exakt 5 K Überhitzung.",
      "Messorte spielen keine Rolle.",
      "Herstellerangaben und Betriebsbedingungen müssen berücksichtigt werden.",
    ],
    correct: 3,
    explanation:
      "Messwerte hängen von Anlage, Last und Messort ab. Allgemeingültige Sollwerte ersetzen keine Herstellerangaben.",
  },
] satisfies QuizQuestion[];
