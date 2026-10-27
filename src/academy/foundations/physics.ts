import type { FoundationLesson } from "./model";
import type { Formula } from "../model";
const src = ["openstax-physics-v05"];
export const physicsLessons: FoundationLesson[] = [
  {
    id: "physics-motion",
    domainId: "physik",
    title: "Bewegung, Masse und Kraft",
    goal: "Geschwindigkeit, Beschleunigung, Masse und resultierende Kraft unterscheiden und berechnen.",
    why: "Bewegte Bauteile und Antriebe lassen sich nur beurteilen, wenn Masse nicht mit Gewichtskraft verwechselt wird. Die Lernfälle erklären Größen und Bilanzideen; sie sind keine Anleitung zur Prüfung oder Wartung laufender Maschinen.",
    basic: String.raw`Mittlere Geschwindigkeit ist Weglänge durch Zeit: \(v=\frac s t\). Beschleunigung beschreibt die Änderung der Geschwindigkeit pro Zeit. Masse in kg kennzeichnet Trägheit; eine Kraft in N kann die Bewegung ändern. Im einfachen Modell gilt für die resultierende Kraft \(F_{\mathrm{res}}=ma\).`,
    reasoning:
      "Newtons erster Grundsatz: Ohne resultierende Kraft bleibt ein Körper in Ruhe oder bewegt sich gleichförmig geradlinig. Der zweite beschreibt die Beschleunigung durch die Resultierende, nicht durch eine beliebige einzelne Kraft. Wechselwirkungskräfte wirken auf unterschiedliche Körper und dürfen nicht als Kräfte am selben Körper weggekürzt werden.",
    transfer:
      "Gewichtskraft ist eine Kraft aus dem Gravitationsfeld, Masse bleibt eine andere Größe. Für F_G = mg müsste die örtliche oder ausdrücklich angenommene Fallbeschleunigung angegeben werden. Bei einer realen Maschine sind Reibung, Lastwechsel und Richtungen zusätzlich zu modellieren; unsere Aufgaben behandeln nur positive Beträge.",
    example: String.raw`Ein fiktiver Wagen legt gleichförmig 12 m in 4 s zurück: \(v=\frac{12}{4}=3\,\mathrm{m/s}\). Ein Körper mit m = 20 kg erfährt die Beschleunigung a = 0,5 m/s²: \(F_{\mathrm{res}}=20\cdot0{,}5=10\,\mathrm N\). Die beiden Fälle dürfen nicht zu einer unbegründeten Maschinenprognose vermischt werden.`,
    derivation: [
      String.raw`\(v=\frac s t\) ist eine mittlere Weggeschwindigkeit; bei gleichförmiger Bewegung konstant.`,
      String.raw`\(a=\frac{\Delta v}{\Delta t}\) für die betrachtete Richtung und Zeitspanne.`,
      String.raw`\(1\,\mathrm N=1\,\mathrm{kg\,m/s^2}\); damit passt \(ma\) zur Kraft.`,
    ],
    mistakes: [
      "Masse in kg und Gewichtskraft in N gleichsetzen.",
      "Eine Einzelkraft mit der Resultierenden verwechseln oder aus konstanter Geschwindigkeit eine Beschleunigung ableiten.",
    ],
    summary:
      "Geschwindigkeit beschreibt Bewegung, Beschleunigung deren Änderung. Die resultierende Kraft ist im einfachen Newton-Modell Masse mal Beschleunigung. Masse und Gewichtskraft haben verschiedene Einheiten und Bedeutungen.",
    prerequisites: ["math-units", "math-rearrange"],
    formulaIds: ["physics-speed", "physics-force"],
    sourceIds: src,
    questions: [
      {
        prompt: "12 m in 4 s ergeben welche mittlere Geschwindigkeit?",
        correct: "3 m/s",
        wrong: ["48 m/s", "0,333 m/s"],
        explanation:
          "Weglänge durch Zeit: 12/4 = 3 m/s. Die Rechnung liefert einen Mittelwert; gleichförmige Bewegung ist für einen konstanten Momentanwert eine zusätzliche Annahme.",
      },
      {
        prompt: "Welche Einheit gehört zur Masse?",
        correct: "kg",
        wrong: ["N", "Pa"],
        explanation:
          "Kilogramm ist die SI-Einheit der Masse. Newton gehört zur Kraft, Pascal zum Druck. Die Gewichtskraft ist deshalb nicht einfach eine andere Bezeichnung für die Masse.",
      },
      {
        prompt: "Welche Kraft steht in F = ma?",
        correct: "Die resultierende Kraft am betrachteten Körper.",
        wrong: [
          "Jede beliebige Einzelkraft unabhängig von anderen.",
          "Nur die Reibungskraft in jedem Fall.",
        ],
        explanation:
          "Die Summe aller betrachteten Kräfte bestimmt die Beschleunigung. Einzelkräfte können sich aufheben oder ergänzen. Die Systemgrenze und Richtung müssen zur Bilanz passen.",
      },
    ],
  },
  {
    id: "physics-energy",
    domainId: "physik",
    title: "Arbeit, Energie und Leistung",
    goal: "Mechanische Arbeit, Energie, Leistung und Wirkungsgrad mit passenden Systemgrenzen erklären.",
    why: "Verdichter übertragen Energie an das Fluid; elektrische Aufnahme und thermischer Nutzen sind unterschiedliche Bilanzgrößen. Eine Energiemenge wird erst durch den Zeitbezug zu einer mittleren Leistung. Das verbindet die Physik mit den vorhandenen COP- und Elektro-Lernfällen.",
    basic: String.raw`Bei konstanter Kraft parallel zum Weg gilt \(W=Fs\). Energieübertragung wird in Joule angegeben. Die mittlere Leistung ist \(P=\frac E t\). Gleiche Energie in kürzerer Zeit bedeutet größere Leistung. Ein Wirkungsgrad vergleicht passende Nutz- und zugeführte Energien oder Leistungen.`,
    reasoning: String.raw`Arbeit hängt allgemein vom Kraftanteil in Wegrichtung ab. Unsere Aufgaben setzen parallele, konstante Kraft voraus. \(1\,\mathrm J=1\,\mathrm{N\,m}\), \(1\,\mathrm W=1\,\mathrm{J/s}\). Energie wird erhalten, kann aber in weniger nutzbare Formen übergehen; Verlustwärme ist kein Verschwinden von Energie.`,
    transfer:
      "Ein Wirkungsgrad mit derselben Art von Energiegrenze ist nicht dasselbe wie ein Wärmepumpen-COP. Ein COP kann über eins liegen, weil zusätzlich Umweltwärme übertragen wird. Für reale Antriebe müssen Fluidleistung, mechanische Leistung und elektrische Aufnahme getrennt bilanziert werden.",
    example: String.raw`Eine fiktive konstante Kraft von 50 N wirkt parallel über 3 m: \(W=50\cdot3=150\,\mathrm J\). Werden 600 J in 30 s übertragen, beträgt die mittlere Leistung \(P=\frac{600}{30}=20\,\mathrm W\). Bei 80 J Nutzen und 100 J Zufuhr wäre \(\eta=0{,}8=80\%\); die Systemgrenze ist jeweils vorgegeben.`,
    derivation: [
      String.raw`\(W=Fs\) erfasst den einfachen parallelen Fall.`,
      String.raw`Durch Zeitbezug wird Energie zur Leistung: \(P=\frac E t\).`,
      String.raw`\(\eta=\frac{E_{\mathrm{Nutz}}}{E_{\mathrm{zu}}}\); Energiearten und Bilanzgrenzen müssen passen.`,
    ],
    mistakes: [
      "kW als Energiemenge lesen oder Zeit beim Leistungsvergleich weglassen.",
      "COP und Wirkungsgrad gleichsetzen oder Fluidleistung als elektrische Anschlussleistung ausgeben.",
    ],
    summary:
      "Arbeit überträgt Energie, Leistung beschreibt die Energieübertragung pro Zeit. Einheiten und Systemgrenzen entscheiden, welcher Quotient sinnvoll ist. Ein COP ist kein pauschaler Wirkungsgrad derselben Energieumwandlung.",
    prerequisites: ["physics-motion", "math-percent"],
    formulaIds: ["physics-work", "physics-power", "physics-efficiency"],
    sourceIds: src,
    questions: [
      {
        prompt: "600 J in 30 s entsprechen welcher mittleren Leistung?",
        correct: "20 W",
        wrong: ["18000 W", "20 J"],
        explanation:
          "P = E/t = 600/30 = 20 J/s = 20 W. Das Ergebnis ist eine Leistung; die bereits vorgegebene Energie von 600 J wird dadurch nicht verändert.",
      },
      {
        prompt: "Was passiert mit als Verlustwärme abgegebener Energie?",
        correct:
          "Sie bleibt in der Energiebilanz erhalten, ist aber anders nutzbar.",
        wrong: [
          "Sie verschwindet physikalisch.",
          "Sie wird immer vollständig wieder elektrisch nutzbar.",
        ],
        explanation:
          "Energieerhaltung bedeutet nicht, dass jede Energieform gleich gut nutzbar ist. Verlustwärme bleibt Teil der Bilanz, kann aber für den vorgesehenen Zweck weniger geeignet sein.",
      },
      {
        prompt:
          "Ist ein COP größer als eins ein Verstoß gegen Energieerhaltung?",
        correct: "Nein, zusätzlich wird Umweltwärme übertragen.",
        wrong: ["Ja, immer.", "Nur wenn die Leistung in kW angegeben ist."],
        explanation:
          "Der COP vergleicht thermischen Nutzen mit Antriebsenergie. Der thermische Nutzen enthält zusätzlich übertragene Umweltwärme. Die Systemgrenze unterscheidet sich von einem einfachen Umwandlungswirkungsgrad.",
      },
    ],
  },
  {
    id: "physics-pressure-density",
    domainId: "physik",
    title: "Druck und Dichte verstehen",
    goal: "Druck als Kraft pro Fläche und Dichte als Masse pro Volumen unterscheiden und umrechnen.",
    why: "Druckmesswerte spielen im Kältekreislauf eine große Rolle. Dichte ist für Masse-Volumen-Beziehungen wichtig, hängt aber bei realen Stoffen vom Zustand ab. Ein einzelner Zahlenwert ohne Referenzzustand darf nicht zur allgemeinen Kältemitteleigenschaft erklärt werden.",
    basic: String.raw`Druck entsteht im einfachen Modell aus einer senkrechten Kraft verteilt auf eine Fläche: \(p=\frac F A\). Dichte beschreibt die Masse im betrachteten Volumen: \(\rho=\frac m V\). Der Nenner muss positiv sein. Pascal und kg/m³ gehören zu verschiedenen Größen.`,
    reasoning: String.raw`\(1\,\mathrm{Pa}=1\,\mathrm{N/m^2}\), \(1\,\mathrm{bar}=100000\,\mathrm{Pa}\). Bei gleicher Kraft führt eine kleinere Fläche zu größerem Druck. \(1\,\mathrm L=0{,}001\,\mathrm{m^3}\); die Dichteberechnung benötigt Masse und Volumen desselben Zustands.`,
    transfer:
      "Ein relativer Druck bezieht sich auf den Umgebungsdruck, ein absoluter Druck auf Vakuum. Thermodynamische Druckverhältnisse benötigen absolute Werte. Flüssigkeiten sind im einfachen Modell wenig kompressibel, Gase deutlich kompressibler; daraus folgt jedoch kein allgemeiner Stoffwert oder sicherer Betriebsbereich.",
    example: String.raw`F = 600 N, A = 0,003 m²: \(p=\frac{600}{0{,}003}=200000\,\mathrm{Pa}=2\,\mathrm{bar}\). Bei einer fiktiven Masse von 8 kg in 0,01 m³ gilt \(\rho=800\,\mathrm{kg/m^3}\). Die Dichte ist hier vorgegeben bzw. aus Lernwerten berechnet, keinem realen Kältemittel zugeordnet.`,
    derivation: [
      String.raw`Die gleiche Kraft auf halber Fläche verdoppelt den Quotienten \(\frac F A\).`,
      String.raw`Aus \(\rho=\frac m V\) folgt mit \(V\ne0\) die Beziehung \(m=\rho V\).`,
      String.raw`\(10\,\mathrm L=0{,}01\,\mathrm{m^3}\), nicht \(10\,\mathrm{m^3}\).`,
    ],
    mistakes: [
      "Relativdruck direkt in ein Verhältnis absoluter Drücke einsetzen.",
      "Liter und Kubikmeter verwechseln oder einer fiktiven Dichte einen realen Stoffnamen zuweisen.",
    ],
    summary:
      "Druck ist senkrechte Kraft pro Fläche, Dichte Masse pro Volumen. Ihre Nenner müssen zum gleichen Modell/System gehören. Druckbezug und Stoffzustand sind Teil einer vollständigen technischen Angabe.",
    prerequisites: ["math-units", "math-rearrange"],
    formulaIds: ["physics-pressure", "physics-density"],
    sourceIds: src,
    questions: [
      {
        prompt: "Wie viele Pascal sind 2 bar?",
        correct: "200000 Pa",
        wrong: ["200 Pa", "0,00002 Pa"],
        explanation:
          "Ein bar entspricht 100000 Pa. Deshalb ergeben zwei bar 200000 Pa. Die Einheit bar ist keine zusätzliche Kraft- oder Dichteangabe.",
      },
      {
        prompt: "8 kg in 0,01 m³ ergeben welche Dichte?",
        correct: "800 kg/m³",
        wrong: ["0,08 kg/m³", "800 Pa"],
        explanation:
          "Masse durch Volumen: 8/0,01 = 800 kg/m³. Multiplizieren statt Dividieren oder die Druckeinheit zu verwenden würde eine andere Größe liefern.",
      },
      {
        prompt:
          "Welche Drücke gehören in ein thermodynamisches Druckverhältnis?",
        correct: "Absolute Drücke.",
        wrong: ["Beliebige Manometer-Überdrücke.", "Nur die Druckdifferenz."],
        explanation:
          "Absolute Drücke beziehen sich auf Vakuum. Überdrücke haben einen verschobenen Nullpunkt und liefern daher im Allgemeinen ein falsches Verhältnis, wenn sie ohne Umrechnung eingesetzt werden.",
      },
    ],
  },
  {
    id: "physics-heat",
    domainId: "physik",
    title: "Temperatur, Wärme und Phasenwechsel",
    goal: "Temperatur und Wärmemenge unterscheiden und sensible Erwärmung von Phasenwechsel abgrenzen.",
    why: "Im Verdampfer wird Wärme bei einem Phasenwechsel aufgenommen, im Verflüssiger wieder abgegeben. Die sensible Formel allein beschreibt diese Vorgänge nicht vollständig. Das Grundlagenwissen verhindert, dass eine einfache Rechnung als gesamte Kälteleistung ausgegeben wird.",
    basic: String.raw`Temperatur beschreibt den thermischen Zustand, Wärme eine Energieübertragung. Ohne Phasenwechsel und mit konstantem c gilt \(Q=mc\Delta T\). Eine Wärmemenge in J ist noch keine Leistung in W. Temperaturdifferenzen werden in K angegeben; ein Temperaturanstieg um 5 °C entspricht 5 K.`,
    reasoning:
      "Beim Phasenwechsel kann Energie übertragen werden, während die Temperatur eines reinen Stoffes bei festem Druck näherungsweise konstant bleibt. Das ist kein Widerspruch: Energie verändert dann den Zustand statt nur die Temperatur. Bei Gemischen und veränderlichem Druck sind zusätzliche Randbedingungen nötig.",
    transfer:
      "Wärme kann durch Leitung, Konvektion und Strahlung übertragen werden. Eine Temperaturdifferenz ist eine treibende Bedingung, bestimmt aber allein noch keinen Wärmestrom durch eine Dämmung. Dafür fehlen Materialdaten, Geometrie und Randbedingungen. Die erste Energiebilanz unterscheidet Wärme und Arbeit; die Nutzbarkeit erfordert zusätzlich den zweiten Hauptsatz.",
    example: String.raw`Fiktiv: m = 2 kg, c = 4180 J/(kg·K), ΔT = 5 K. \(Q=2\cdot4180\cdot5=41800\,\mathrm J\). Der vorgegebene c-Wert ist ein Näherungswert, keine universelle Konstante. Wenn diese Energie in 100 s übertragen wird, folgt \(P=418\,\mathrm W\). Ein Phasenwechsel ist ausdrücklich ausgeschlossen.`,
    derivation: [
      String.raw`Mehr Masse braucht bei gleichem Stoff/Temperaturintervall mehr Energie: \(Q\propto m\).`,
      String.raw`Konstantes c und kein Phasenwechsel führen zu \(Q=mc\Delta T\).`,
      String.raw`Erst der Zeitbezug liefert \(P=\frac Q t\). Bei Phasenwechsel stattdessen ein passendes Enthalpiemodell verwenden.`,
    ],
    mistakes: [
      "Temperatur mit einer vorhandenen Wärmemenge gleichsetzen.",
      "mcΔT trotz Phasenwechsel als vollständige Energiebilanz verwenden.",
    ],
    summary:
      "Temperatur ist keine Energiemenge. Q = mcΔT gilt hier nur für sensible Änderungen mit konstantem c. Beim Phasenwechsel und bei technischen Wärmeströmen sind zusätzliche Zustands- beziehungsweise Übertragungsmodelle nötig.",
    prerequisites: ["physics-energy", "math-units"],
    formulaIds: ["math-heat-energy", "physics-power"],
    sourceIds: src,
    questions: [
      {
        prompt: "Welche Einheit gehört zur Wärmemenge?",
        correct: "J",
        wrong: ["W", "K"],
        explanation:
          "Joule beschreibt eine Energiemenge. Watt ist Energie pro Zeit, Kelvin gehört zur Temperatur beziehungsweise Temperaturdifferenz. Die drei Größen sind nicht austauschbar.",
      },
      {
        prompt:
          "Kann bei Phasenwechsel Energie übertragen werden, obwohl die Temperatur ungefähr konstant bleibt?",
        correct: "Ja, beim reinen Stoff unter passenden Druckbedingungen.",
        wrong: [
          "Nein, Energie erfordert immer eine Temperaturänderung.",
          "Nur wenn die Masse null ist.",
        ],
        explanation:
          "Die Energie kann den Aggregatzustand verändern statt die Temperatur zu erhöhen. Die Aussage setzt passende Randbedingungen voraus und gilt nicht pauschal für jeden Gemischprozess.",
      },
      {
        prompt:
          "Bestimmt eine Temperaturdifferenz allein den Wärmestrom durch eine Dämmung?",
        correct: "Nein, Material, Geometrie und Randbedingungen fehlen.",
        wrong: [
          "Ja, ΔT ist bereits eine Leistung.",
          "Ja, die Einheit K entspricht W.",
        ],
        explanation:
          "Ein Temperaturabstand ist keine Leistung. Für die Wärmeübertragung werden zusätzlich Material-/Geometriedaten und geeignete Bedingungen benötigt; diese dürfen nicht erfunden werden.",
      },
    ],
  },
];
export const physicsFormulas: Formula[] = [
  [
    "physics-speed",
    "Mittlere Weggeschwindigkeit",
    "v = s / t",
    String.raw`v=\frac s t`,
    "m/s",
    "t > 0; zurückgelegte Weglänge und passendes Zeitintervall.",
  ],
  [
    "physics-force",
    "Newtons zweites Gesetz",
    "Fres = m × a",
    String.raw`F_{\mathrm{res}}=ma`,
    "kg × m/s² = N",
    "Inertialsystem, konstante Masse, hier nicht negative Beträge.",
  ],
  [
    "physics-work",
    "Arbeit im parallelen Fall",
    "W = F × s",
    String.raw`W=Fs`,
    "N × m = J",
    "Konstante Kraft parallel zum Weg; keine allgemeine Kraftfeldintegration.",
  ],
  [
    "physics-power",
    "Mittlere Leistung",
    "P = E / t",
    String.raw`P=\frac E t`,
    "J/s = W",
    "t > 0; Energie und Zeit derselben Bilanz.",
  ],
  [
    "physics-efficiency",
    "Wirkungsgrad",
    "η = ENutz / Ezu",
    String.raw`\eta=\frac{E_{\mathrm{Nutz}}}{E_{\mathrm{zu}}}`,
    "Dimensionslos",
    "Passende Energiearten und Systemgrenzen, Zufuhr > 0; nicht gleich Wärmepumpen-COP.",
  ],
].map(([id, title, expression, tex, units, assumptions]) => ({
  id,
  title,
  expression,
  tex,
  units,
  assumptions,
  sourceIds: src,
}));
