import type { ExplanationPair } from "../language/Explanation";
export const componentNames = [
  "Verdichter",
  "Verflüssiger",
  "Expansionsorgan",
  "Verdampfer",
];
export const componentExplanations: ExplanationPair[] = [
  {
    simple:
      "Der Verdichter braucht Antriebsenergie. Er saugt Dampf an und verdichtet ihn auf höheren Druck. Der Dampf wird dabei im betrachteten Modell wärmer. Flüssigkeit gehört hier nicht hinein.",
    technical:
      "1 → 2: adiabate Verdichtung von überhitztem Dampf auf Verflüssigungsdruck. Die spezifische Fluidarbeit ist w = h₂ − h₁ > 0. Im ideal-isentropen Vergleich bleibt s konstant. Elektrische Verluste sind darin nicht enthalten.",
  },
  {
    simple:
      "Hier gibt das Kältemittel Wärme an die Umgebung ab: Der Dampf kühlt ab, wird flüssig und wird im Referenzmodell anschließend etwas unterkühlt. Bei der Verflüssigung ändert sich die Temperatur eines reinen Stoffs bei gleichem Druck nicht.",
    technical:
      "2 → 3: isobare Wärmeabgabe im verlustfreien Modell: Enthitzung, Kondensation und Unterkühlung. Für das reine Kältemittel ist die Kondensation bei konstantem Druck isotherm. qₖ = h₂ − h₃; das ist abgegebene Wärme pro Masse, keine elektrische Leistung.",
  },
  {
    simple:
      "An der Drossel fällt der Druck ab. Ein Teil der Flüssigkeit verdampft. Im Modell wird weder Arbeit gewonnen noch Wärme übertragen. Die Enthalpie bleibt gleich, obwohl Temperatur und Flüssigkeitsanteil sich ändern.",
    technical:
      "3 → 4: stationäre adiabate Drossel ohne Wellenarbeit; Änderungen kinetischer und potenzieller Energie vernachlässigt. Daraus folgt h₄ = h₃. Der Austritt ist hier ein Nassdampfgemisch, keine isentrope Expansion.",
  },
  {
    simple:
      "Das kalte Gemisch nimmt Wärme auf. Flüssigkeit verdampft. Danach wird der Dampf im Modell noch etwas überhitzt, damit am Verdichter Dampf ankommt. Wärme wird transportiert; Kälte wird nicht als Stoff erzeugt.",
    technical:
      "4 → 1: isobare Wärmezufuhr mit Verdampfung und anschließender Überhitzung. q₀ = h₁ − h₄ > 0 umfasst die modellierte gesamte Verdampferstrecke. Ob alle Anteile dem Nutzkühlraum zugutekommen, hängt von der realen Systemgrenze ab.",
  },
];
export const stateDescriptions = [
  {
    title: "Verdampferaustritt / Verdichtereintritt",
    pressure: "Niederdruck",
    phase: "Überhitzter Dampf",
    simple:
      "Der Dampf hat Wärme aufgenommen und strömt zum Verdichter. Er ist wärmer als die Siedetemperatur bei diesem Druck.",
    technical:
      "Zustand 1: überhitzter Dampf auf Verdampfungsdruck. Überhitzung = T₁ − T_sat(p₁); die Temperatur allein legt den Phasenzustand nicht fest.",
  },
  {
    title: "Verdichteraustritt / Verflüssigereintritt",
    pressure: "Hochdruck",
    phase: "Überhitzter Dampf",
    simple:
      "Der Dampf steht nach dem Verdichten unter hohem Druck. Die zugeführte Arbeit hat seine Energie erhöht.",
    technical:
      "Zustand 2: überhitzter Dampf auf Verflüssigungsdruck. h₂ liegt wegen der zugeführten Fluidarbeit über h₁; der reale Vergleichsfall mit η_is = 0,75 braucht bei gleichen Ein-/Austrittsdrücken mehr Fluidarbeit als der isentrope Fall.",
  },
  {
    title: "Verflüssigeraustritt / Drosseleintritt",
    pressure: "Hochdruck",
    phase: "Unterkühlte Flüssigkeit",
    simple:
      "Das Kältemittel ist flüssig. Es ist kälter als die Siedetemperatur bei diesem hohen Druck.",
    technical:
      "Zustand 3: unterkühlte Flüssigkeit auf Verflüssigungsdruck. Unterkühlung = T_sat(p₃) − T₃. Die im Referenzfall festgelegte Unterkühlung wird nicht mit der Überhitzung verwechselt.",
  },
  {
    title: "Drosselaustritt / Verdampfereintritt",
    pressure: "Niederdruck",
    phase: "Flüssigkeit-Dampf-Gemisch",
    simple:
      "Nach der Drossel liegen Flüssigkeit und Dampf gleichzeitig vor. Das Gemisch kann im Verdampfer Wärme aufnehmen.",
    technical:
      "Zustand 4: Zweiphasengemisch bei Verdampfungsdruck mit h₄ = h₃. Der Dampfgehalt x ist ein Massenanteil zwischen 0 und 1; er ist für überhitzten Dampf oder unterkühlte Flüssigkeit nicht definiert.",
  },
];
