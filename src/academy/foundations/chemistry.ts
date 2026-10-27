import type { FoundationLesson } from "./model";
import type { Formula } from "../model";
const src = ["openstax-chemistry-v05"];
export const chemistrySafety =
  "Theoretischer Lerninhalt. Keine Anleitung zum Mischen, Erhitzen oder Freisetzen von Stoffen. Reale Stoffe und Kältemittel benötigen Sicherheitsdaten, geeignete Ausrüstung und die erforderliche Qualifikation; aus einer Summenformel folgt keine sichere Handhabung.";
export const chemistryLessons: FoundationLesson[] = [
  {
    id: "chemistry-matter",
    domainId: "chemie",
    title: "Stoffe, Eigenschaften und Gemische",
    goal: "Reinstoffe, Verbindungen und Gemische unterscheiden und einfache Massenanteile erklären.",
    why: "Eine spätere Kältemitteldatenbank muss reine Stoffe und Gemische unterscheiden. Ihre Zustands- und Sicherheitseigenschaften dürfen nicht aus einer beliebigen einzelnen Temperatur oder einer ungeprüften Formel abgeleitet werden.",
    basic:
      "Ein Stoff wird durch Eigenschaften beschrieben, etwa seinen Zustand und seine Zusammensetzung. Ein Reinstoff hat eine festgelegte chemische Zusammensetzung; dazu zählen Elemente und Verbindungen. Ein Gemisch enthält mehrere Stoffe. Homogene Gemische sind einheitlich verteilt, heterogene besitzen unterscheidbare Bereiche.",
    reasoning:
      "Fest, flüssig und gasförmig sind Zustände, keine eigene Einteilung in Reinstoff oder Gemisch. Ein Phasenwechsel verändert den Zustand, eine chemische Reaktion dagegen die stoffliche Zusammensetzung. Ein homogenes Gemisch ist nicht automatisch ein Reinstoff, nur weil es gleichmäßig aussieht.",
    transfer:
      "Siede- und andere Stoffeigenschaften hängen von den Bedingungen ab. Reale Gemische können sich beim Phasenwechsel anders als reine Stoffe verhalten. Für Kältemittel wären Zusammensetzung, Druck, Zustand und geprüfte Daten nötig. Dieses Modul erstellt keine Stoffwerttabelle und keine Handhabungsfreigabe.",
    example: String.raw`Ein fiktives Gemisch enthält 3 kg Komponente A und insgesamt 12 kg. Der Massenanteil ist \(w_A=\frac{3}{12}=0{,}25=25\%\). Der Nenner ist die Gesamtmasse, nicht nur die Masse der anderen Komponente. Das Beispiel ist eine abstrakte Bilanz ohne Mischanweisung.`,
    derivation: [
      String.raw`Komponentenmasse und Gesamtmasse müssen dieselbe Einheit besitzen.`,
      String.raw`\(w_A=\frac{m_A}{m_{\mathrm{ges}}}\); die Einheit kg kürzt sich.`,
      String.raw`\(0{,}25\cdot100\%=25\%\). Bei vollständiger Zusammensetzung summieren sich die Massenanteile zu eins.`,
    ],
    mistakes: [
      "Homogen mit rein gleichsetzen oder Zustand und chemische Zusammensetzung verwechseln.",
      "Beim Massenanteil durch die Restmasse statt durch die Gesamtmasse teilen.",
    ],
    summary:
      "Reinstoffe und Gemische unterscheiden sich durch ihre Zusammensetzung. Homogen bedeutet gleichmäßig, nicht chemisch rein. Der Massenanteil ist die Komponentenmasse geteilt durch die Gesamtmasse; alle Angaben brauchen einen klaren Bezug.",
    prerequisites: ["math-percent", "math-units"],
    formulaIds: ["chemistry-mass-fraction"],
    sourceIds: src,
    questions: [
      {
        prompt: "Ist ein homogenes Gemisch immer ein Reinstoff?",
        correct: "Nein, mehrere Stoffe können gleichmäßig verteilt sein.",
        wrong: [
          "Ja, weil es einheitlich aussieht.",
          "Nur im gasförmigen Zustand.",
        ],
        explanation:
          "Homogen beschreibt die gleichmäßige Verteilung. Die chemische Zusammensetzung kann trotzdem mehrere Stoffe enthalten. Gleichmäßiges Aussehen ist kein Nachweis eines Reinstoffs.",
      },
      {
        prompt: "3 kg von insgesamt 12 kg entsprechen welchem Massenanteil?",
        correct: "25 %",
        wrong: ["33,3 %", "400 %"],
        explanation:
          "Komponentenmasse durch Gesamtmasse: 3/12 = 0,25 = 25 %. Die Restmasse von 9 kg wäre der falsche Nenner für den Massenanteil.",
      },
      {
        prompt: "Was verändert ein reiner Phasenwechsel?",
        correct:
          "Den Aggregatzustand, nicht automatisch die chemische Zusammensetzung.",
        wrong: ["Immer die Elementsorte.", "Immer die Zahl der Protonen."],
        explanation:
          "Schmelzen oder Verdampfen ist eine Zustandsänderung. Eine Änderung der chemischen Zusammensetzung erfordert eine andere Betrachtung; Protonenzahlen werden dabei nicht durch einen normalen Phasenwechsel geändert.",
      },
    ],
  },
  {
    id: "chemistry-atoms",
    domainId: "chemie",
    title: "Atome, Moleküle und chemische Formeln",
    goal: "Elementzeichen, Atombau, Moleküle und tiefgestellte Indizes von Reaktionskoeffizienten unterscheiden.",
    why: "Chemische Formeln beschreiben die Zusammensetzung und werden später für Werkstoff- und Kältemittelthemen gebraucht. Sie ersetzen jedoch weder Stoffdaten noch Angaben zu Umweltwirkung, Brennbarkeit oder Verträglichkeit.",
    basic: String.raw`Ein Atom besitzt einen Kern mit Protonen und gegebenenfalls Neutronen sowie eine Elektronenhülle. Die Protonenzahl kennzeichnet das Element. Ein Molekül ist eine gebundene Atomgruppe. In \(\ce{H2O}\) stehen zwei H-Atome und ein O-Atom; ein fehlender Index bedeutet eins.`,
    reasoning: String.raw`Ein tiefgestellter Index gehört zur Formel einer Teilcheneinheit. Ein Koeffizient davor vervielfacht die ganze Einheit: \(\ce{2 H2O}\) beschreibt zwei Wassermoleküle mit insgesamt vier H- und zwei O-Atomen. Isotope unterscheiden sich in der Neutronenzahl, Ionen in ihrer Elektronenbilanz; das sind verschiedene Begriffe.`,
    transfer:
      "Nicht alle Stoffe bestehen aus einzelnen Molekülen. Ionische Festkörper können aus ausgedehnten Gittern bestehen; ihre Formeln geben Verhältnisangaben wieder. Auch Summenformeln unterscheiden nicht jede Strukturvariante. Das Periodensystem ordnet Elemente nach Protonenzahl; eine vollständige interaktive Elementdatenbank ist hier noch nicht enthalten.",
    example: String.raw`Fünf Moleküle \(\ce{CO2}\) enthalten fünf C-Atome und \(5\cdot2=10\) O-Atome. Drei Moleküle \(\ce{H2O}\) enthalten \(3\cdot2=6\) H-Atome und drei O-Atome. Diese Zählung beschreibt Zusammensetzung, nicht das Volumen oder die sichere Handhabung eines Stoffes.`,
    derivation: [
      String.raw`In \(\ce{CO2}\) gehört der Index 2 nur zum O.`,
      String.raw`Ein Koeffizient vor der Formel multipliziert alle enthaltenen Atomzahlen.`,
      String.raw`\(N_{\mathrm{O}}=2\,N_{\mathrm{CO_2}}\); bei fünf Molekülen sind das zehn O-Atome.`,
    ],
    mistakes: [
      "Den Koeffizienten nur auf das erste Element anwenden.",
      "Eine Summenformel als vollständige Aussage über Struktur, Sicherheits- oder Stoffeigenschaften lesen.",
    ],
    summary:
      "Elementzeichen benennen Atomsorten, Indizes die Zusammensetzung einer Teilcheneinheit und Koeffizienten deren Anzahl. Atome, Moleküle, Ionen und Gitter sind verschiedene Beschreibungen und dürfen nicht beliebig gleichgesetzt werden.",
    prerequisites: ["chemistry-matter", "math-arithmetic"],
    formulaIds: ["chemistry-atom-count"],
    sourceIds: src,
    questions: [
      {
        prompt: "Wie viele O-Atome enthält ein CO₂-Molekül?",
        correct: "2",
        wrong: ["1", "3"],
        explanation:
          "Der tiefgestellte Index 2 gehört zum Sauerstoffsymbol O. Kohlenstoff C ohne Index bedeutet ein C-Atom. Die Summe aller Atome wäre drei, aber gefragt sind nur O-Atome.",
      },
      {
        prompt: "Wie viele H-Atome stecken in drei H₂O-Molekülen?",
        correct: "6",
        wrong: ["2", "3"],
        explanation:
          "Jedes H₂O-Molekül enthält zwei H-Atome. Drei ganze Moleküle ergeben 3 × 2 = 6 H-Atome. Der Koeffizient multipliziert die gesamte Formel.",
      },
      {
        prompt:
          "Beschreibt eine Summenformel jede Struktur- und Sicherheitseigenschaft?",
        correct: "Nein, zusätzliche geprüfte Informationen sind nötig.",
        wrong: [
          "Ja, die Formel ersetzt jedes Sicherheitsdatenblatt.",
          "Ja, solange das Molekül klein ist.",
        ],
        explanation:
          "Eine Zusammensetzungsangabe allein beschreibt weder alle Strukturvarianten noch reale Betriebs- oder Gefahrenbedingungen. Dafür sind weitere zuverlässige Stoffinformationen erforderlich.",
      },
    ],
  },
  {
    id: "chemistry-amount",
    domainId: "chemie",
    title: "Stoffmenge, molare Masse und Reaktionsbilanz",
    goal: "Stoffmenge aus Masse und molarer Masse berechnen und einfache Reaktionsgleichungen als Atombilanzen lesen.",
    why: "Stoffmengen verbinden die mikroskopische Teilchenbeschreibung mit messbaren Massen. Für spätere technische Stoffbilanzen muss der Bezug klar sein: mol ist eine andere Größe als kg und verlangt eine passend definierte molare Masse.",
    basic: String.raw`Die Stoffmenge n wird in mol angegeben. Ein mol bezeichnet eine festgelegte große Teilchenanzahl; die Avogadro-Konstante wird hier nur angenähert als \(6{,}022\cdot10^{23}\,\mathrm{mol^{-1}}\) erwähnt. Die molare Masse M verbindet Masse und Stoffmenge: \(n=\frac m M\).`,
    reasoning: String.raw`Wenn M die Masse eines mol derselben Teilchenart beschreibt, enthält eine Masse m genau \(\frac m M\) solcher Mengen. Mit g und g/mol folgt mol; mit SI kg und kg/mol ebenso. Beim Ausgleichen einer Reaktionsgleichung werden Koeffizienten geändert, nicht die Indizes der beteiligten Stoffformeln.`,
    transfer: String.raw`Die rein theoretische Bilanz \(\ce{CH4 + 2 O2 -> CO2 + 2 H2O}\) enthält auf beiden Seiten ein C-, vier H- und vier O-Atome. Sie ist keine Versuchsanleitung und beschreibt weder Reaktionsgeschwindigkeit noch eine sichere Durchführung. Molare Massen müssen zur Teilchenart und vereinbarten Genauigkeit passen.`,
    example: String.raw`Lernannahme für Wasser: M = 18 g/mol, ausdrücklich gerundet. Für m = 9 g gilt \(n=\frac{9\,\mathrm g}{18\,\mathrm{g/mol}}=0{,}5\,\mathrm{mol}\). In SI: \(0{,}009/0{,}018=0{,}5\). Für 44 g eines Stoffes mit vorgegebenem M = 44 g/mol folgt 1 mol. Die Werte sind keine hochgenauen Stoffdaten.`,
    derivation: [
      String.raw`Definition: \(M=\frac m n\) für \(n\ne0\).`,
      String.raw`Beidseitige Umstellung ergibt \(n=\frac m M\), mit \(M>0\).`,
      String.raw`Einheitenprobe: \(\frac{\mathrm{kg}}{\mathrm{kg/mol}}=\mathrm{mol}\).`,
      String.raw`Atombilanz der Reaktion getrennt für C, H und O zählen; nur Koeffizienten anpassen.`,
    ],
    mistakes: [
      "g mit kg/mol kombinieren, ohne den Faktor 1000 umzurechnen.",
      "Zum Ausgleichen die Indizes einer Stoffformel verändern und damit einen anderen Stoff hinschreiben.",
    ],
    summary:
      "Stoffmenge n, Masse m und molare Masse M sind über n = m/M verbunden. Reaktionskoeffizienten erhalten die Atombilanz, während Formelindizes zum jeweiligen Stoff gehören. Gerundete Lernwerte sind keine präzisen Stoffdaten.",
    prerequisites: ["chemistry-atoms", "math-fractions", "math-powers"],
    formulaIds: ["chemistry-amount-rule", "chemistry-reaction-example"],
    sourceIds: src,
    questions: [
      {
        prompt: "9 g bei vorgegebenen 18 g/mol ergeben …",
        correct: "0,5 mol",
        wrong: ["162 mol", "2 mol"],
        explanation:
          "Stoffmenge ist Masse geteilt durch molare Masse: 9/18 = 0,5 mol. Die Einheiten g/(g/mol) ergeben mol; eine Multiplikation wäre hier unpassend.",
      },
      {
        prompt:
          "Was darf beim Ausgleichen einer chemischen Gleichung verändert werden?",
        correct: "Die Koeffizienten vor den Stoffformeln.",
        wrong: [
          "Beliebig die tiefgestellten Indizes.",
          "Die Protonenzahl der Elemente.",
        ],
        explanation:
          "Koeffizienten verändern die Anzahl ganzer Teilcheneinheiten. Formelindizes würden dagegen eine andere Zusammensetzung und damit andere Stoffe beschreiben; sie bleiben erhalten.",
      },
      {
        prompt:
          "Welcher O₂-Koeffizient passt zur Bilanz CH₄ + … O₂ → CO₂ + 2 H₂O?",
        correct: "2",
        wrong: ["1", "4"],
        explanation:
          "Rechts stehen zwei O-Atome im CO₂ und zwei weitere in zwei H₂O, insgesamt vier. Links liefern zwei O₂-Moleküle genau diese vier O-Atome; C und H sind ebenfalls ausgeglichen.",
      },
    ],
  },
];
export const chemistryFormulas: Formula[] = [
  {
    id: "chemistry-mass-fraction",
    title: "Massenanteil",
    expression: "wA = mA / mges",
    tex: String.raw`w_A=\frac{m_A}{m_{\mathrm{ges}}}`,
    units: "kg/kg = 1; als Prozent ×100 %",
    assumptions:
      "Gesamtmasse > 0, Komponentenmasse gehört zum selben betrachteten Gemisch.",
    sourceIds: src,
  },
  {
    id: "chemistry-atom-count",
    title: "Atome aus Teilchenzahl zählen",
    expression: "NAtom = a × NTeilchen",
    tex: String.raw`N_{\mathrm{Atom}}=aN_{\mathrm{Teilchen}}`,
    units: "Teilchenanzahl, dimensionslos",
    assumptions:
      "Formel und betrachtete Atomsorte ausdrücklich angegeben; a ist deren Anzahl pro Teilchen; keine Stoffmengen-/Volumenrechnung.",
    sourceIds: src,
  },
  {
    id: "chemistry-amount-rule",
    title: "Stoffmenge",
    expression: "n = m / M",
    tex: String.raw`n=\frac m M`,
    units: "kg / (kg/mol) = mol",
    assumptions:
      "M > 0 und zu derselben Teilchenart gehörig; Lernwerte ggf. ausdrücklich gerundet.",
    sourceIds: src,
  },
  {
    id: "chemistry-reaction-example",
    title: "Theoretische Reaktionsbilanz",
    expression: "CH₄ + 2 O₂ → CO₂ + 2 H₂O",
    tex: String.raw`\ce{CH4 + 2 O2 -> CO2 + 2 H2O}`,
    units: "Koeffizienten sind Anzahlverhältnisse",
    assumptions:
      "Nur theoretische Atombilanz, keine praktische Durchführung oder Freisetzung.",
    sourceIds: src,
  },
];

for (const lesson of chemistryLessons) lesson.safety = chemistrySafety;
