import type { Term } from "../model";
export const foundationTerms: Term[] = [
  {
    id: "foundation-variable",
    title: "Variable",
    definition:
      "Platzhalter für einen veränderlichen oder unbekannten Wert. In technischen Formeln zusätzlich Größe und Einheit definieren.",
    moduleIds: ["math-algebra", "math-rearrange"],
  },
  {
    id: "foundation-denominator",
    title: "Nenner",
    definition:
      "Unterer Ausdruck eines Bruchs. Er beschreibt die Teilgröße bzw. den Divisor und darf nicht null sein.",
    moduleIds: ["math-fractions"],
  },
  {
    id: "foundation-equivalence",
    title: "Äquivalenzumformung",
    definition:
      "Umkehrbare Umformung einer Gleichung, die deren Lösungsmenge erhält. Beide Seiten müssen gleich behandelt und Nullbedingungen beachtet werden.",
    moduleIds: ["math-equations", "math-rearrange"],
  },
  {
    id: "foundation-proportion",
    title: "Direkte Proportionalität",
    definition:
      "Zuordnung mit konstantem Quotienten y/x im betrachteten Bereich, bei x ≠ 0. Sie muss fachlich begründet sein.",
    moduleIds: ["math-percent"],
  },
  {
    id: "foundation-power",
    title: "Potenz",
    definition:
      "Bei natürlichem Exponenten ein Produkt gleicher Faktoren. Negative ganzzahlige Exponenten beschreiben Kehrwerte einer von null verschiedenen Basis.",
    moduleIds: ["math-powers"],
  },
  {
    id: "foundation-mass",
    title: "Masse und Gewichtskraft",
    definition:
      "Masse in kg beschreibt unter anderem Trägheit. Gewichtskraft ist eine Kraft in N; für ihre Berechnung muss die Fallbeschleunigung angegeben werden.",
    moduleIds: ["physics-motion"],
  },
  {
    id: "foundation-pressure",
    title: "Druck",
    definition:
      "Im einfachen Modell senkrechte Kraft pro Fläche. SI-Einheit Pa = N/m²; absolute und relative Druckbezüge unterscheiden.",
    moduleIds: ["physics-pressure-density"],
  },
  {
    id: "foundation-density",
    title: "Dichte",
    definition:
      "Masse pro Volumen desselben Stoffzustands, SI-Einheit kg/m³. Kein allgemeiner konstanter Wert für beliebige Drücke oder Temperaturen.",
    moduleIds: ["physics-pressure-density"],
  },
  {
    id: "foundation-heat-energy",
    title: "Wärmemenge",
    definition:
      "Als Wärme übertragene Energie in J. Sie ist weder Temperatur in K noch Wärmeleistung in W.",
    moduleIds: ["physics-heat", "physics-energy"],
  },
  {
    id: "foundation-mixture",
    title: "Gemisch",
    definition:
      "Zusammensetzung aus mehreren Stoffen. Homogen bedeutet gleichmäßig verteilt und nicht automatisch chemisch rein.",
    moduleIds: ["chemistry-matter"],
  },
  {
    id: "foundation-atom",
    title: "Atom",
    definition:
      "Teilchen mit einem Kern und einer Elektronenhülle. Die Protonenzahl definiert das Element; Isotope unterscheiden sich in der Neutronenzahl.",
    moduleIds: ["chemistry-atoms"],
  },
  {
    id: "foundation-electron",
    title: "Elektronen",
    definition:
      "Negativ geladene Bestandteile der Atomhülle. Eine geänderte Elektronenbilanz kann ein Ion ergeben; sie ändert nicht die Protonenzahl des Elements.",
    moduleIds: ["chemistry-atoms"],
  },
  {
    id: "foundation-molecule",
    title: "Molekül",
    definition:
      "Gebundene Atomgruppe; Formelindizes geben die Zusammensetzung einer Teilcheneinheit an. Nicht alle Stoffe sind aus einzelnen Molekülen aufgebaut.",
    moduleIds: ["chemistry-atoms"],
  },
  {
    id: "foundation-mole",
    title: "Mol und Stoffmenge",
    definition:
      "Die Stoffmenge n in mol beschreibt eine festgelegte Teilchenanzahl. Mol ist keine Masseeinheit und benötigt die Angabe der betrachteten Teilchenart.",
    moduleIds: ["chemistry-amount"],
  },
  {
    id: "foundation-molar-mass",
    title: "Molare Masse",
    definition:
      "Masse pro Stoffmenge derselben Teilchenart, in SI kg/mol. Sie verbindet Masse und Stoffmenge über n = m/M für M > 0.",
    moduleIds: ["chemistry-amount"],
  },
];
