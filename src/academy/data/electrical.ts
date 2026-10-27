import type {
  Module,
  AcademyQuestion,
  Flashcard,
  Formula,
  Objective,
  Source,
  Term,
  LearningContent,
} from "../model";
const commit = "66fcef29596e3a32818162b837dd0c85b754cbad";
export const electricalSources: Source[] = [
  [
    "openstax-current-github",
    "Current",
    "m42341",
    "eip-926, eip-108: I = ΔQ/Δt; A = C/s",
  ],
  [
    "openstax-ohm-github",
    "Ohm’s Law: Resistance and Simple Circuits",
    "m42344",
    "eip-218, eip-702, eip-486: I = U/R, Ω = V/A, U = IR",
  ],
  [
    "openstax-circuits-github",
    "Resistors in Series and Parallel",
    "m42356",
    "eip-288, eip-801, eip-531: Reihensumme, Knotenbilanz und Kehrwertsumme",
  ],
].map(([id, title, module, locator]) => ({
  id,
  title: `OpenStax College Physics 2e: ${title}`,
  url: `https://github.com/openstax/osbooks-college-physics-bundle/blob/${commit}/modules/${module}/index.cnxml`,
  access: "consulted",
  accessedAt: "2026-10-27",
  reviewedCommit: commit,
  locator,
  supports:
    "Genannte physikalische Grundbeziehungen; keine Freigabe der gesamten Lerntexte oder realer Anlagenarbeiten.",
  license: "CC BY-NC-SA 4.0 laut LICENSE des offiziellen Archivs",
  note: "Im offiziellen Git-Archiv tatsächlich eingesehen. Eigene deutsche Erläuterungen und eigene Lernfälle; keine übernommenen Kapitel oder Abbildungen. Unabhängige menschliche Fachfreigabe offen.",
}));
export const electricalFormulas: Formula[] = [
  {
    id: "electric-current-charge",
    title: "Mittlere Stromstärke",
    expression: "I = ΔQ / Δt",
    units: "C / s = A",
    assumptions:
      "Mittlere Beträge über ein angegebenes Zeitintervall; Δt > 0. Keine Stromrichtung aus dem Betrag ableiten.",
    sourceIds: ["openstax-current-github"],
  },
  {
    id: "ohm-current",
    title: "Ohmsches Gesetz: Strom",
    expression: "I = U / R",
    units: "V / Ω = A",
    assumptions:
      "Ohmsches Bauteil bei konstanten Bedingungen, R > 0; Gleichstrom-Beträge.",
    sourceIds: ["openstax-ohm-github"],
  },
  {
    id: "ohm-voltage",
    title: "Ohmsches Gesetz: Spannung",
    expression: "U = R × I",
    units: "Ω × A = V",
    assumptions:
      "Ohmsches Bauteil bei konstanten Bedingungen, keine pauschale Motor- oder Diodenkennlinie.",
    sourceIds: ["openstax-ohm-github"],
  },
  {
    id: "ohm-resistance",
    title: "Widerstand aus Spannung und Strom",
    expression: "R = U / I",
    units: "V / A = Ω",
    assumptions:
      "I > 0, gleicher Betriebspunkt; ein Verhältnis allein beweist keine lineare Kennlinie.",
    sourceIds: ["openstax-ohm-github"],
  },
  {
    id: "electric-energy",
    title: "Elektrische Arbeit bei konstanter Leistung",
    expression: "E = P × t",
    units: "W × s = J; W × h = Wh; 1 kWh = 3 600 000 J",
    assumptions:
      "Konstante Wirkleistung über das Zeitintervall; keine pauschale Anschlusswert-Verbrauchsprognose.",
    sourceIds: ["openstax-electric-github"],
  },
  {
    id: "series-resistance",
    title: "Zwei ohmsche Widerstände in Reihe",
    expression: "Rges = R₁ + R₂",
    units: "Ω + Ω = Ω",
    assumptions:
      "Ideale Leitungen; positiver, konstanter ohmscher Widerstand. Gleicher Strom in beiden Widerständen.",
    sourceIds: ["openstax-circuits-github"],
  },
  {
    id: "parallel-resistance",
    title: "Zwei ohmsche Widerstände parallel",
    expression: "1/Rges = 1/R₁ + 1/R₂",
    units: "1/Ω + 1/Ω = 1/Ω",
    assumptions:
      "Beide Widerstände positiv, ideale parallele Zweige an derselben Spannung.",
    sourceIds: ["openstax-circuits-github"],
  },
];
export const electricalObjectives: Objective[] = [
  {
    id: "el-quantities-objective",
    text: "Ladung, Strom, Spannung, Widerstand, Leistung und Energie anhand ihrer Einheiten unterscheiden.",
  },
  {
    id: "el-uir-objective",
    text: "Spannung als Potentialdifferenz, Strom als Ladungsfluss und Widerstand als Verhältnis am Betriebspunkt erklären.",
  },
  {
    id: "el-ohm-objective",
    text: "Ohmsches Gesetz passend umstellen und die Grenze konstanter ohmscher Widerstände nennen.",
  },
  {
    id: "el-energy-objective",
    text: "Elektrische Gleichstromleistung und elektrische Arbeit mit SI-Umrechnung berechnen.",
  },
  {
    id: "el-circuits-objective",
    text: "Reihen- und Parallelschaltungen unterscheiden und Ersatzwiderstände plausibilisieren.",
  },
];
const safety =
  "Nur rechnerischer Lernfall: keine Anleitung zum Öffnen, Verdrahten oder Messen an realen Anlagen. Auch kleine Spannungsangaben garantieren keine gefahrlose reale Schaltung. Elektrische Arbeiten erfordern die dafür qualifizierte Person und die geltenden Schutzmaßnahmen.";
const moduleData: {
  id: string;
  title: string;
  description: string;
  formulas: string[];
  sources: string[];
  objective: string;
  prerequisites: string[];
  texts: [LearningContent, LearningContent, LearningContent];
}[] = [
  {
    id: "electric-quantities",
    title: "Elektrische Grundgrößen",
    description:
      "Einheiten verstehen: von Ladung und Strom bis zu Leistung und Arbeit.",
    formulas: ["electric-current-charge"],
    sources: ["openstax-current-github", "openstax-electric-github"],
    objective: "el-quantities-objective",
    prerequisites: [],
    texts: [
      {
        introduction:
          "Eine elektrische Größe beantwortet eine bestimmte Frage. Ladung Q wird in Coulomb angegeben, Strom I in Ampere. Leistung P beschreibt Energie pro Zeit; Energie E wird in Joule oder im Alltag in Kilowattstunden angegeben.",
        explanation:
          "Die mittlere Stromstärke ist die während einer Zeitspanne transportierte Ladung geteilt durch diese Zeit: I = ΔQ/Δt. Ein Ampere entspricht einem Coulomb pro Sekunde. Die Formel verwendet hier positive Beträge.",
        connections:
          "An einer fiktiven 24-V-Steuerungsversorgung einer Kälteanlage können Stromaufnahme und Leistung verschiedene Informationen liefern. Eine Leistungsangabe sagt ohne Betriebsdauer noch nichts über die aufgenommene Energie aus.",
        example:
          "Eine idealisierte Steuerlast transportiert in 10 s eine Ladung von 2 C. I = 2 C / 10 s = 0,2 A = 200 mA. Die Zeit muss in Sekunden stehen, wenn C/s unmittelbar Ampere ergeben soll. Die Zahlen sind ein frei gewählter Lernfall.",
        mistakes: [
          "Strom und Spannung als dieselbe Größe behandeln.",
          "kW als Energie oder kWh als Leistung bezeichnen.",
        ],
        summary:
          "Größe, Formelzeichen und Einheit gehören zusammen. Ampere ist ein Ladungsstrom; Watt ist eine Leistung. Aus der Ladungsmenge und dem passenden Zeitintervall folgt der mittlere Strom, keine praktische Arbeitsanweisung.",
        deepening:
          "Prüfe bei jeder Gleichung zuerst die Dimensionen. Eine richtig aussehende Zahl mit einer unpassenden Einheit beantwortet die Aufgabe nicht. Die folgenden Module ergänzen Spannung, Widerstand und Energiebeziehungen.",
      },
      {
        introduction:
          "Für eine belastbare Berechnung werden nicht nur Zahlen benötigt, sondern Bezugsstellen, Zeitintervalle und die Bedeutung der Größe. Ein gemittelter Strom ist vom momentanen Strom zu unterscheiden.",
        explanation:
          "I = ΔQ/Δt beschreibt den Mittelwert über das gewählte Intervall. Eine konstante Stromaufnahme ist eine zusätzliche Annahme; aus dem Mittelwert folgt keine Aussage über Einschaltspitzen oder die zeitliche Signalform.",
        connections:
          "Eine Anlagensteuerung kann zeitweise Lasten zuschalten. Ihr mittlerer Ladungsstrom über eine Minute beschreibt diese Schwankungen nicht vollständig. Die Aufgabe bleibt eine Bilanz, kein Verfahren zur Sicherungs- oder Leitungswahl.",
        example:
          "Für einen angenommenen Ladungstransport von 18 C in einer Minute wird zuerst 1 min = 60 s eingesetzt. I = 18 C / 60 s = 0,3 A = 300 mA. Ohne diese Umrechnung wäre das Ergebnis um den Faktor 60 falsch.",
        mistakes: [
          "Minuten ohne Umrechnung in eine SI-Gleichung einsetzen.",
          "Den zeitlichen Mittelwert mit einem Einschaltstrom gleichsetzen.",
        ],
        summary:
          "Zeitbasis und Art des Mittelwerts ausdrücklich festhalten. Die Einheit C/s führt zu A. Ein korrekt berechneter Mittelwert reicht nicht als Nachweis für die Belastbarkeit eines elektrischen Betriebsmittels.",
        deepening:
          "Bei veränderlichem Strom ist die transportierte Ladung die zeitliche Summe der Ladungsbeiträge. Eine konstante Zahl ist ein Modell. Für spätere Messmodule müssen Messverfahren und Zeitauflösung zusätzlich geklärt werden.",
      },
      {
        introduction:
          "Auf Meisterniveau gehört zur Zahl eine klare Systemgrenze. Vorzeichen, Mittelwert und zugrunde liegende Zeitspanne müssen gemeinsam angegeben werden, damit mehrere Beobachtungen vergleichbar sind.",
        explanation:
          "Ein Ladungsbetrag verliert die Richtungsinformation. In einer vollständigen Strombilanz sind Bezugsrichtungen und vorzeichenbehaftete Ströme erforderlich. Der vorliegende Aufgaben-Kern behandelt ausdrücklich nicht negative Beträge.",
        connections:
          "Steuerung, Sensorversorgung und Antrieb sind unterschiedliche Bilanzbereiche einer Kälteanlage. Eine Bilanz der Steuerlast ist nicht die elektrische Gesamtaufnahme der Anlage und darf dafür nicht ohne Erweiterung benutzt werden.",
        example:
          "Ein fiktiver Steuerzweig transportiert 2 C in 10 s: 0,2 A mittlerer Strom. Ein weiterer nicht betrachteter Zweig kann zusätzlichen Strom benötigen. Die Rechnung bleibt für ihren Zweig richtig, ist aber kein Gesamtanlagenwert.",
        mistakes: [
          "Beträge ohne Bezugsrichtung als vollständige Knotenbilanz verwenden.",
          "Teilbilanz einer Steuerlast als Gesamtanlage ausgeben.",
        ],
        summary:
          "Die Rechnung I = ΔQ/Δt ist einfach; ihre Interpretation verlangt Zeitbasis und Systemgrenze. Das Modell beschreibt Lernfälle mit Beträgen und ersetzt weder Messkonzept noch elektrische Planung.",
        deepening:
          "Ein späteres Diagnosemodul muss Messunsicherheit, Signalform und Systemgrenzen führen. Stabile Größen- und Formel-IDs ermöglichen diesen Anschluss, ohne heutige Lernwerte als reale Messdaten misszuverstehen.",
      },
    ],
  },
  {
    id: "electric-uir",
    title: "Spannung, Strom und Widerstand",
    description:
      "Drei verschiedene Größen und ihr Zusammenhang im idealisierten Gleichstromkreis.",
    formulas: ["ohm-current", "ohm-resistance"],
    sources: ["openstax-ohm-github"],
    objective: "el-uir-objective",
    prerequisites: ["electric-quantities"],
    texts: [
      {
        introduction:
          "Spannung U ist eine Potentialdifferenz zwischen zwei Punkten. Strom I beschreibt transportierte Ladung pro Zeit. Widerstand R kennzeichnet hier, wie groß der Strom bei einer gegebenen Spannung im ohmschen Modell wird.",
        explanation:
          "Ein idealer konstanter Widerstand erfüllt I = U/R. Volt geteilt durch Ohm ergibt Ampere. Eine größere Spannung erhöht den Strom bei gleichem Widerstand; ein größerer Widerstand verringert ihn bei gleicher Spannung.",
        connections:
          "Ein vereinfachtes Ersatzmodell einer Steuerlast kann helfen, Größen zu verstehen. Ein echter Sensor, eine Elektronik oder eine Schützspule ist dadurch noch kein idealer Widerstand und braucht gegebenenfalls ein anderes Modell.",
        example:
          "Eine fiktive ohmsche Last erhält 24 V und hat 120 Ω. I = 24 V / 120 Ω = 0,2 A. Zur Kontrolle: 0,2 A × 120 Ω = 24 V. Das Ergebnis gilt nur für den angenommenen konstanten Widerstand.",
        mistakes: [
          "Spannung als fließende Größe bezeichnen.",
          "Alle elektrischen Bauteile als konstanten Widerstand behandeln.",
        ],
        summary:
          "U, I und R sind verschiedene Größen. Die Gleichung verbindet sie nur unter den passenden Modellbedingungen. Zum Ergebnis gehören immer Einheit und Annahme des ohmschen Verhaltens.",
        deepening:
          "Das nächste Modul behandelt die sichere algebraische Umstellung. Praktische Anschluss- und Messverfahren sind hier absichtlich nicht enthalten; dafür sind Qualifikation und Schutzkonzept erforderlich.",
      },
      {
        introduction:
          "Ein Verhältnis U/I kann an einem Betriebspunkt angegeben werden, ohne dass das Bauteil über den ganzen Bereich ohmsch ist. Erst eine lineare Beziehung unter konstanten Bedingungen erlaubt das einfache Widerstandsmodell.",
        explanation:
          "Bei konstantem R verläuft I proportional zu U. Ändern sich Temperatur oder Materialzustand, kann sich R ändern. Die Gleichung eines Arbeitspunktes allein rechtfertigt daher keine Extrapolation auf andere Spannungen.",
        connections:
          "Eine beheizte Komponente einer Kälteanlage kann temperaturabhängiges Verhalten zeigen. Ein fiktiver konstanter Ersatzwiderstand erklärt die Mathematik, sagt aber nichts über reale Einschaltströme oder Herstellergrenzen aus.",
        example:
          "Bei 12 V und angenommenen 60 Ω folgt 0,2 A. Bei unverändertem Widerstand ergeben 24 V dann 0,4 A. Diese Verdoppelung setzt ausdrücklich voraus, dass Widerstand und Randbedingungen gleich bleiben.",
        mistakes: [
          "Aus einem einzigen Betriebspunkt Ohm-Verhalten beweisen wollen.",
          "Temperaturänderungen bei einer Extrapolation verschweigen.",
        ],
        summary:
          "Eine proportionale Rechnung braucht eine konstante Modellgröße. Widerstandswerte sind ohne Betriebsbedingungen nur begrenzt interpretierbar. Die Lernrechnung ist keine Bauteilfreigabe.",
        deepening:
          "Für spätere Diagnosefälle sind Kennlinien geeigneter als eine beliebige Widerstandszahl. Reale Sensoren brauchen geprüfte Kennlinien; dieses Modul enthält keine erfundenen Herstellerdaten.",
      },
      {
        introduction:
          "Ein Ersatzmodell ist eine bewusste Entscheidung mit einem Gültigkeitsbereich. Die Plausibilität einer berechneten Stromstärke ist deshalb sowohl rechnerisch als auch anhand des verwendeten Modells zu prüfen.",
        explanation:
          "R = U/I setzt für die Verhältnisbildung I ungleich null voraus. Ein stromloser offener Zweig darf nicht über eine Division durch null berechnet werden. Das Programm weist diese Eingabe zurück, statt einen scheinbar endlichen Widerstand auszugeben.",
        connections:
          "Eine Leitungsunterbrechung und ein geänderter Lastzustand sind unterschiedliche Hypothesen. Die Lernplattform leitet aus einem Einzelwert keine sichere Diagnose und keine Handlungsanweisung für eine reale Kälteanlage ab.",
        example:
          "24 V / 0,2 A = 120 Ω ist ein gültiger Verhältniswert. Für 24 V / 0 A existiert in diesem endlichen Modell kein berechenbarer Widerstandswert. Die Zahl null ist hier ein Modellgrenzfall und kein Rundungsproblem.",
        mistakes: [
          "Division durch null als normalen Zahlenfall behandeln.",
          "Aus einem Widerstandsverhältnis eine eindeutige Fehlerursache ableiten.",
        ],
        summary:
          "Gültiger Zahlenbereich und Modellgrenze gehören zur technischen Antwort. Ein endlicher Verhältniswert ist kein Beweis für lineares Bauteilverhalten und ersetzt keine systematische Diagnose.",
        deepening:
          "Die spätere Verbindung mit Fehlersuche benötigt Betriebspunkte, Unsicherheit und alternative Hypothesen. Die jetzigen Formeln bleiben als klar begrenzte Bausteine wiederverwendbar.",
      },
    ],
  },
  {
    id: "electric-ohm",
    title: "Ohmsches Gesetz sicher anwenden",
    description:
      "Strom, Spannung und Widerstand berechnen und Ergebnisse mit Einheiten prüfen.",
    formulas: ["ohm-current", "ohm-voltage", "ohm-resistance"],
    sources: ["openstax-ohm-github"],
    objective: "el-ohm-objective",
    prerequisites: ["electric-uir"],
    texts: [
      {
        introduction:
          "Das Ohmsche Gesetz lässt sich nach der gesuchten Größe umstellen. Beginne mit der Frage nach Strom, Spannung oder Widerstand und schreibe erst danach Zahlen mit passenden Einheiten in die Gleichung.",
        explanation:
          "Gesuchter Strom: I = U/R. Gesuchte Spannung: U = R × I. Gesuchter Widerstand: R = U/I. Bei Divisionen muss der Nenner größer als null sein. Hier werden positive Beträge eines stationären Gleichstrommodells betrachtet.",
        connections:
          "Ein fiktiver 24-V-Steuerzweig einer Kälteanlage dient als Rechenbeispiel. Die Berechnung eines Ersatzwiderstands ist weder eine Auswahl realer Schutzorgane noch eine Anleitung zur Spannungsmessung.",
        example:
          "Für R = 240 Ω und I = 100 mA wird zuerst 100 mA = 0,1 A umgerechnet. U = 240 Ω × 0,1 A = 24 V. Die Gegenprobe 24 V / 240 Ω = 0,1 A bestätigt die Umstellung.",
        mistakes: [
          "mA unverändert als A einsetzen: Faktor 1000.",
          "Bei gesuchter Spannung dividieren statt multiplizieren.",
        ],
        summary:
          "Gesuchte Größe wählen, Formel umstellen, Einheiten umrechnen, einsetzen und gegenprüfen. Das Verfahren gilt für das ausdrücklich angenommene ohmsche Modell unter konstanten Bedingungen.",
        deepening:
          "Für Motoren oder Wechselstromlasten ist dieses Widerstandsmodell keine vollständige Beschreibung. Die Ausarbeitung von Impedanz, Phasenlage und Drehstrom folgt in späteren Modulen.",
      },
      {
        introduction:
          "Einheitenumrechnung ist ein Bestandteil der Gleichung und kein optionaler Nachtrag. Gerade bei Sensor- und Steuergrößen führen Millivolt, Milliampere und Kiloohm sonst schnell zu großen Fehlfaktoren.",
        explanation:
          "1 kΩ = 1000 Ω und 1 mA = 0,001 A. Eine Rechnung in SI macht diese Faktoren sichtbar. Nach dem Berechnen darf das Ergebnis wieder in eine passende Anzeigeeinheit überführt werden, ohne den physikalischen Wert zu verändern.",
        connections:
          "Ein rein fiktiver Widerstand von 1,2 kΩ an einer idealen 12-V-Steuerversorgung ergibt eine kleine Stromstärke. Das Beispiel ist kein Kennwert eines realen Temperaturfühlers und enthält keine Herstellerzuordnung.",
        example:
          "R = 1,2 kΩ = 1200 Ω. I = 12 V / 1200 Ω = 0,01 A = 10 mA. Wer 1,2 ohne Umrechnung einsetzt, erhält fälschlich 10 A und liegt um den Faktor 1000 zu hoch.",
        mistakes: [
          "Kilo und Milli als gleichgerichtete Faktoren behandeln.",
          "Ein plausibel aussehendes Ergebnis ohne Einheit akzeptieren.",
        ],
        summary:
          "Die SI-Umrechnung schützt vor Größenordnungsfehlern. Ein Ergebnis in Milliampere kann denselben Wert wie eine Dezimalzahl in Ampere beschreiben; Einheit und Zahl dürfen nicht getrennt interpretiert werden.",
        deepening:
          "Eine Größenordnungsprüfung ergänzt die Gegenprobe. Für reale Bauteile wären zusätzlich Toleranz, Temperatur und Verlustleistung zu beurteilen; diese Daten werden im Lernfall nicht erfunden.",
      },
      {
        introduction:
          "Eine algebraisch richtige Umstellung garantiert noch kein belastbares physikalisches Ergebnis. Die Gültigkeit der Annahmen und der sinnvolle Zahlenbereich sind ebenso Bestandteil einer vollständigen Lösung.",
        explanation:
          "Das Verhältnis U/I am Betriebspunkt und ein konstanter ohmscher Widerstand sind unterschiedliche Aussagen. Bei I nahe null reagiert ein berechnetes Verhältnis empfindlich auf Messfehler. Unsere Toleranz ist eine Rundungshilfe, keine Messunsicherheit.",
        connections:
          "Bei einer fiktiven Steuerlast kann eine Gegenprobe Rechenfehler finden. Sie kann jedoch nicht beweisen, dass das Ersatzmodell einer realen Anlage angemessen ist. Dafür fehlen Kennlinie und Messbedingungen.",
        example:
          "Aus 24 V und 0,2 A ergibt sich R = 120 Ω. Zur algebraischen Kontrolle liefert 120 Ω × 0,2 A wieder 24 V. Diese Identität bestätigt die Rechnung, nicht unabhängig das zugrunde gelegte physikalische Modell.",
        mistakes: [
          "Eine Gegenprobe als unabhängige Modellvalidierung ausgeben.",
          "Rundungstoleranz der Lernaufgabe als Gerätegenauigkeit lesen.",
        ],
        summary:
          "Gegenprobe, Dimension und Größenordnung sichern die Mathematik ab. Die technische Interpretation erfordert zusätzliche Modell- und Messinformationen. Die App behauptet keine unabhängige menschliche Freigabe.",
        deepening:
          "Spätere professionelle Rechner sollen diese gleiche Formel verwenden und zusätzliche Randbedingungen separat erfassen. Dadurch entstehen keine voneinander abweichenden Ohm-Berechnungen in verschiedenen App-Modulen.",
      },
    ],
  },
  {
    id: "electric-work",
    title: "Elektrische Leistung und Arbeit",
    description:
      "Watt, Joule und Kilowattstunden im Gleichstrom-Lernmodell richtig verwenden.",
    formulas: ["dc-electric-power", "electric-energy"],
    sources: ["openstax-electric-github"],
    objective: "el-energy-objective",
    prerequisites: ["electric-ohm"],
    texts: [
      {
        introduction:
          "Leistung beschreibt, wie schnell Energie umgesetzt wird. Bei stationärem Gleichstrom gilt P = U × I. Wird diese Leistung über eine Zeit unverändert aufgenommen, ergibt die Multiplikation mit der Zeit die elektrische Arbeit.",
        explanation:
          "Volt mal Ampere ergibt Watt. Für E = P × t führen Watt und Sekunden zu Joule. Mit Watt und Stunden erhältst du Wattstunden. 1000 Wh sind 1 kWh; eine Kilowattstunde ist eine Energiemenge und keine Leistung.",
        connections:
          "Eine fiktive Gleichstrom-Steuerlast mit 24 V und 0,5 A nimmt im Modell 12 W auf. Ihre Energie über zwei Stunden ist eine andere Größe. Ein realer Anlagenantrieb kann zusätzliche Wechselstrombeziehungen erfordern.",
        example:
          "P = 24 V × 0,5 A = 12 W. Für zwei Stunden gilt t = 7200 s. E = 12 W × 7200 s = 86 400 J = 24 Wh = 0,024 kWh. Leistung und Betriebsdauer sind konstant angenommen.",
        mistakes: [
          "kW und kWh vertauschen.",
          "Stunden als Sekunden einsetzen, ohne den Umrechnungsfaktor zu beachten.",
        ],
        summary:
          "Leistung P in W und Energie E in J oder kWh unterscheiden. Die Zeit verbindet beide Größen nur mit der passenden Leistungsannahme. Ein Anschlusswert allein ist noch kein gemessener Verbrauch.",
        deepening:
          "Bei zeitlich schwankender Leistung muss über die tatsächlichen Zeitabschnitte summiert werden. Dieses Modul übt zunächst den konstanten Fall und liefert keine reale Verbrauchs- oder Kostenprognose.",
      },
      {
        introduction:
          "Eine rechnerische Energieabschätzung verlangt eine klare Lastannahme. Eine während der gesamten Zeit konstante Wirkleistung ist bei intermittierenden Heizungen oder Antrieben häufig nur eine Modellvereinfachung.",
        explanation:
          "E = P × t gilt direkt bei konstanter Leistung. Mehrere konstante Abschnitte dürfen einzeln berechnet und anschließend energetisch addiert werden. Die Summe bleibt Energie, auch wenn die einzelnen Leistungen unterschiedlich sind.",
        connections:
          "Ein fiktiver Begleitheizer wird mit konstanter Wirkleistung vorgegeben. Die Aufgabe modelliert lediglich Energie über eine Laufzeit; sie bestimmt weder Heizerauslegung noch sichere Montage noch tatsächliche Einschaltdauer.",
        example:
          "Eine vorgegebene konstante Leistung von 150 W wirkt 30 min. t = 1800 s. E = 150 × 1800 = 270 000 J = 75 Wh = 0,075 kWh. Die 150 W sind eine Annahme und kein nachgeschlagener Bauteilwert.",
        mistakes: [
          "Eine Einschaltdauer pauschal als gesamte Kalenderzeit ansetzen.",
          "Wattstunden noch einmal mit 3600 multiplizieren, obwohl bereits Joule vorliegen.",
        ],
        summary:
          "Joule und Wattstunden beschreiben dieselbe Energie in verschiedenen Einheiten. Betriebszeit und Leistungszustand müssen zusammenpassen. Bei wechselnden Lasten ist die Zeitbilanz aufzuteilen.",
        deepening:
          "Der spätere Anlagenrechner kann Zeitabschnitte mit geprüften Randbedingungen ergänzen. Die jetzige Energieformel bleibt derselbe Kern; ein neues Modul braucht keinen zweiten Umrechnungsweg.",
      },
      {
        introduction:
          "Technische Energiebilanzen benötigen eine definierte Systemgrenze. Elektrische Aufnahme, thermischer Nutzen und mechanische Abgabe sind verschiedene Leistungen und dürfen nur mit passender Bilanz miteinander verglichen werden.",
        explanation:
          "P = U × I ist hier auf stationären Gleichstrom beschränkt. Bei Wechselstrom ergibt das Produkt von Effektivspannung und Effektivstrom zunächst die Scheinleistung; Wirkleistung benötigt zusätzliche Aussagen zur Signalform und Phasenlage.",
        connections:
          "Die 24-V-Steuerung einer Kälteanlage ist ein anderer Bilanzbereich als der Verdichterantrieb. Aus dem Steuerungsbeispiel folgt deshalb weder die Gesamtenergie noch der Wirkungsgrad der Anlage.",
        example:
          "12 W konstante Steuerleistung über zwei Stunden ergeben 24 Wh. Eine zusätzlich betrachtete 150-W-Last über eine halbe Stunde würde weitere 75 Wh beitragen. Unter diesen beiden fiktiven Annahmen beträgt die Summe 99 Wh.",
        mistakes: [
          "Gleichstromleistung ohne Bedingungen als allgemeine Drehstromformel verwenden.",
          "Thermische Nutzleistung und elektrische Aufnahme ohne Systemgrenze addieren.",
        ],
        summary:
          "Der korrekte Wert braucht Systemgrenze, Zeitmodell und Leistungsart. Die in der App verwendeten Energiebeispiele sind fiktiv und keine Garantie eines realen Anlagenverbrauchs oder einer fachlichen Freigabe.",
        deepening:
          "Leistungsfaktor, Blindleistung und Drehstrom sind eigene nachfolgende Lernziele. Sie werden nicht durch eine pauschale Formel abgekürzt und erst nach gesichertem Quellen- und Beispielabgleich veröffentlicht.",
      },
    ],
  },
  {
    id: "electric-circuits",
    title: "Reihen- und Parallelschaltungen",
    description:
      "Ersatzwiderstände und Stromverteilung bei zwei idealen ohmschen Lasten.",
    formulas: ["series-resistance", "parallel-resistance", "ohm-current"],
    sources: ["openstax-circuits-github", "openstax-ohm-github"],
    objective: "el-circuits-objective",
    prerequisites: ["electric-work"],
    texts: [
      {
        introduction:
          "In einer Reihenschaltung liegen zwei Widerstände in einem unverzweigten Strompfad. In einer Parallelschaltung liegen beide zwischen denselben zwei Knoten. Die Anordnung entscheidet über die passende Ersatzwiderstandsformel.",
        explanation:
          "In Reihe fließt derselbe Strom; Rges = R₁ + R₂. Parallel liegt dieselbe Spannung an beiden Zweigen; 1/Rges = 1/R₁ + 1/R₂. Der parallele Ersatzwiderstand ist bei positiven Werten kleiner als jeder einzelne Widerstand.",
        connections:
          "Zwei fiktive ohmsche Steuerlasten dienen zur Unterscheidung der Topologien. Das ist keine Aufforderung, reale Steuerbauteile zu verbinden; Elektronik und Spulen können andere Modelle benötigen.",
        example:
          "Für 120 Ω und 240 Ω ergibt sich in Reihe 360 Ω. Parallel gilt 1/Rges = 1/120 + 1/240 = 3/240 und damit Rges = 80 Ω. Die 80 Ω liegen unter 120 Ω und sind deshalb plausibel.",
        mistakes: [
          "Parallelwiderstände einfach addieren.",
          "Den Kehrwert am Ende der Parallelrechnung vergessen.",
        ],
        summary:
          "Erst die Schaltung erkennen, dann die Formel auswählen. In Reihe addieren sich Widerstände; parallel addieren sich Leitwerte. Eine Plausibilitätsprüfung findet viele typische Rechenfehler.",
        deepening:
          "Eine spätere Schaltplanansicht kann dieselben stabilen Widerstandsformeln verwenden. Das heutige Modul behandelt nur zwei positive konstante Widerstände mit idealen Leitungen, keine reale Anlagenverdrahtung.",
      },
      {
        introduction:
          "Ersatzwiderstände lassen sich über Teilströme und Teilspannungen unabhängig plausibilisieren. Damit wird sichtbar, weshalb die Summenformel nur für Reihe und die Kehrwertsumme nur für Parallel gilt.",
        explanation:
          "In der Parallelschaltung ist Iges = I₁ + I₂. Mit I₁ = U/R₁ und I₂ = U/R₂ folgt der Ersatzwiderstand. In Reihe ist die Gesamtspannung die Summe der Spannungsabfälle am selben Strom.",
        connections:
          "Ein rein fiktives 24-V-Steuermodell mit zwei ohmschen Lasten illustriert die Bilanz. Die Ströme beschreiben nur dieses Modell und bestimmen weder reale Sicherungswerte noch zulässige Leitungsquerschnitte.",
        example:
          "Parallel an angenommenen 24 V: I₁ = 24/120 = 0,2 A und I₂ = 24/240 = 0,1 A. Iges = 0,3 A. Gegenrechnung: Rges = 24/0,3 = 80 Ω. Beide Wege bestätigen die Gleichung im Modell.",
        mistakes: [
          "Gleiche Spannung mit gleichem Strom in beiden Zweigen verwechseln.",
          "Gesamtstrom nur mit einem der beiden Zweigströme gleichsetzen.",
        ],
        summary:
          "Parallel addieren sich Zweigströme; in Reihe addieren sich Spannungsabfälle. Die Bilanz ist ein zusätzlicher Rechenweg und macht die Topologie nachvollziehbar. Alle Werte bleiben fiktive Lernannahmen.",
        deepening:
          "Für reale Netze werden Quellen, Leitungen und nichtlineare Bauteile relevant. Eine weitergehende Netzwerkberechnung soll auf den gleichen Größen-IDs aufbauen, aber ihre zusätzlichen Modellgrenzen getrennt erfassen.",
      },
      {
        introduction:
          "Bei der Auswahl eines Ersatzmodells sind Grenzfälle hilfreich. Für zwei positive Widerstände muss der Serienwert über jedem Einzelwert und der Parallelwert unter dem kleineren Einzelwert liegen.",
        explanation:
          "Für zwei gleiche Widerstände R gilt in Reihe 2R und parallel R/2. Bei sehr ungleichen Parallelwiderständen liegt der Ersatzwert nahe dem kleineren Wert. Null- und unendliche Werte sind in diesen endlichen Lernaufgaben ausgeschlossen.",
        connections:
          "Ein Diagnosemodell darf einen offenen Zweig nicht still als normalen endlichen Widerstand behandeln. Die App weist unzulässige Nenner zurück. Eine reale Störung benötigt eine qualifizierte Beurteilung und weitere Informationen.",
        example:
          "Zwei gleiche fiktive 100-Ω-Widerstände ergeben in Reihe 200 Ω und parallel 50 Ω. Bei idealen 24 V wären das 0,12 A beziehungsweise 0,48 A Gesamtstrom. Unterschiedliche Topologien führen damit zu deutlich anderen Lasten.",
        mistakes: [
          "Ein Ergebnis größer als den kleinsten Parallelwiderstand ungeprüft akzeptieren.",
          "Aus einem idealen Widerstandsmodell Schutz- oder Verdrahtungsvorgaben ableiten.",
        ],
        summary:
          "Symmetrie und Grenzfälle unterstützen die Ergebnisprüfung. Der Ersatzwiderstand bildet das äußere Strom-Spannungs-Verhalten des Modells ab, enthält aber keine Freigabe von Schutzmaßnahmen oder Bauteilbelastbarkeit.",
        deepening:
          "Die nächsten geplanten Themen Wechselstrom, Antriebe und Schutz benötigen zusätzliche Modelle und überprüfte Fachquellen. Sie werden bewusst als Planung ausgewiesen; dieses Grundlagenmodul bleibt vollständig nutzbar.",
      },
    ],
  },
];
export const electricalModules: Module[] = moduleData.map((m) => ({
  id: m.id,
  revision: 1,
  domainId: "elektro",
  title: m.title,
  description: m.description,
  objectiveIds: [m.objective],
  formulaIds: m.formulas,
  sourceIds: m.sources,
  termIds: [],
  questionIds: [1, 2, 3].map((n) => `${m.id}-q${n}`),
  cardIds: [1, 2].map((n) => `${m.id}-card${n}`),
  prerequisites: m.prerequisites,
  review: "awaiting-expert-review",
  levels: {
    grundlagen: m.texts[0],
    fachkraft: m.texts[1],
    meister: m.texts[2],
  },
  related: [
    {
      kind: "calculator",
      id: `${m.id}-future-calculator`,
      label: "Professioneller Elektrorechner",
      available: false,
    },
  ],
  safety,
}));
const questionData = [
  [
    "electric-quantities",
    "Welche Einheit gehört zur Stromstärke?",
    "Ampere",
    "Volt",
    "Kilowattstunde",
    "Ampere beschreibt Ladung pro Zeit. Volt gehört zur Spannung und Kilowattstunde zur Energie. Diese Größen dürfen trotz ihres gemeinsamen elektrischen Kontexts nicht vertauscht werden.",
  ],
  [
    "electric-quantities",
    "18 C in 60 s: Welcher mittlere Strom folgt?",
    "0,3 A",
    "3 A",
    "1080 A",
    "18 C / 60 s = 0,3 A. Es handelt sich um einen zeitlichen Mittelwert und nicht automatisch um den maximal auftretenden Strom.",
  ],
  [
    "electric-quantities",
    "Beweist ein gemittelter Strom das Fehlen von Einschaltspitzen?",
    "Nein",
    "Ja, immer",
    "Ja, bei jeder Steuerlast",
    "Der Mittelwert enthält nicht den gesamten zeitlichen Verlauf. Ohne Zeitauflösung und Signalform lassen sich kurzzeitige Spitzen daraus nicht ausschließen.",
  ],
  [
    "electric-uir",
    "Welche Beschreibung passt zur Spannung?",
    "Potentialdifferenz zwischen zwei Punkten",
    "Ladung pro Sekunde",
    "Elektrische Energie pro Stunde",
    "Spannung ist eine Potentialdifferenz. Ladung pro Zeit beschreibt den Strom. Beide Größen müssen mit ihren eigenen Einheiten und Bezugsstellen angegeben werden.",
  ],
  [
    "electric-uir",
    "24 V an konstanten 120 Ω: Welcher Strom folgt?",
    "0,2 A",
    "5 A",
    "2880 A",
    "I = U/R = 24/120 = 0,2 A. Die Rechnung setzt einen konstanten ohmschen Widerstand voraus und ist kein allgemeines Modell jeder elektronischen Last.",
  ],
  [
    "electric-uir",
    "Beweist ein einzelner Wert U/I eine lineare Kennlinie?",
    "Nein",
    "Ja",
    "Nur wenn U größer als 12 V ist",
    "Ein einzelner Betriebspunkt liefert ein Verhältnis, aber keine Kennlinie. Für ohmsches Verhalten muss die Proportionalität unter konstanten Bedingungen gelten.",
  ],
  [
    "electric-ohm",
    "Welche Umstellung liefert die Spannung?",
    "U = R × I",
    "U = R / I",
    "U = I / R",
    "Aus I = U/R folgt durch Multiplikation mit R die Beziehung U = R × I. Ohm mal Ampere ergibt Volt und sichert die Dimension der Umstellung ab.",
  ],
  [
    "electric-ohm",
    "Wie viel sind 100 mA in Ampere?",
    "0,1 A",
    "100000 A",
    "10 A",
    "Milli bedeutet ein Tausendstel. 100 mA sind 100/1000 A = 0,1 A. Eine fehlende Umrechnung verursacht einen Fehler um den Faktor 1000.",
  ],
  [
    "electric-ohm",
    "Was bestätigt die algebraische Gegenprobe?",
    "Die Umstellung, nicht unabhängig das physikalische Modell",
    "Jede reale Bauteilkennlinie",
    "Die zulässige Leitungstemperatur",
    "Die Gegenprobe verwendet dieselbe Modellgleichung. Sie kann Rechenfehler finden, validiert jedoch weder die reale Kennlinie noch sichere Betriebsbedingungen.",
  ],
  [
    "electric-work",
    "Was beschreibt kWh?",
    "Energie",
    "Leistung",
    "Strom",
    "Kilowattstunde ist Leistung mal Zeit und beschreibt Energie. Kilowatt allein beschreibt Leistung. Diese Unterscheidung ist für jede Verbrauchsrechnung erforderlich.",
  ],
  [
    "electric-work",
    "12 W während 2 h ergeben …",
    "24 Wh",
    "6 Wh",
    "24 kW",
    "12 W × 2 h = 24 Wh. In SI sind das 12 × 7200 = 86400 J. Die Rechnung setzt eine über die Zeit konstante Leistung voraus.",
  ],
  [
    "electric-work",
    "Ist Ueff × Ieff bei beliebigem Wechselstrom immer Wirkleistung?",
    "Nein",
    "Ja, ohne weitere Bedingungen",
    "Nur bei einem Elektromotor immer",
    "Das Produkt der Effektivwerte beschreibt zunächst Scheinleistung. Wirkleistung erfordert zusätzliche Informationen zur Signalform und Phasenlage; unsere Aufgabe behandelt Gleichstrom.",
  ],
  [
    "electric-circuits",
    "Was addiert sich bei idealen Widerständen in Reihe?",
    "Die Widerstände",
    "Die Kehrwerte als Ersatzwiderstand",
    "Die Stromstärken im selben Pfad",
    "In Reihe durchfließt derselbe Strom beide Widerstände. Die Spannungsabfälle addieren sich, weshalb der Ersatzwiderstand gleich der Summe der Einzelwiderstände ist.",
  ],
  [
    "electric-circuits",
    "120 Ω und 240 Ω parallel ergeben …",
    "80 Ω",
    "360 Ω",
    "160 Ω",
    "1/Rges = 1/120 + 1/240 = 3/240, also Rges = 80 Ω. Ein paralleler Ersatzwert muss kleiner als der kleinste positive Einzelwiderstand sein.",
  ],
  [
    "electric-circuits",
    "Zwei gleiche 100-Ω-Widerstände parallel ergeben …",
    "50 Ω",
    "200 Ω",
    "100 Ω",
    "Bei zwei gleichen parallelen Widerständen verdoppelt sich der Leitwert. Der Ersatzwiderstand halbiert sich daher auf 50 Ω; in Reihe wären es dagegen 200 Ω.",
  ],
];
export const electricalModuleQuestions: AcademyQuestion[] = questionData.map(
  (q, i) => {
    const module = electricalModules.find((m) => m.id === q[0])!;
    const n = (i % 3) + 1;
    const options = [q[1 + 1], q[3], q[4]].map((text, j) => ({
      id: `${module.id}-q${n}-${j}`,
      text,
    }));
    // Abwechselnde Positionen verhindern ein gleichförmiges Antwortmuster.
    const rotated = [...options.slice(n % 3), ...options.slice(0, n % 3)];
    return {
      id: `${module.id}-q${n}`,
      revision: 1,
      moduleId: module.id,
      level: (["grundlagen", "fachkraft", "meister"] as const)[n - 1],
      objectiveId: module.objectiveIds[0],
      prompt: q[1],
      options: rotated,
      correctOptionId: options[0].id,
      explanation: q[5],
      sourceIds: module.sourceIds,
    };
  },
);
export const electricalCards: Flashcard[] = electricalModules.flatMap((m) => [
  {
    id: `${m.id}-card1`,
    revision: 1,
    moduleId: m.id,
    front: `Was ist der Kern von „${m.title}“?`,
    back: m.levels.grundlagen.summary,
    sourceIds: m.sourceIds,
  },
  {
    id: `${m.id}-card2`,
    revision: 1,
    moduleId: m.id,
    front: `Welche Modellgrenze ist bei „${m.title}“ wichtig?`,
    back: m.levels.meister.summary,
    sourceIds: m.sourceIds,
  },
]);
export const electricalTerms: Term[] = [
  {
    id: "electric-current-term",
    title: "Stromstärke",
    definition: "Ladung pro Zeit; mittlerer Strom I = ΔQ/Δt in A = C/s.",
    moduleIds: ["electric-quantities", "electric-uir"],
  },
  {
    id: "electric-resistance-term",
    title: "Ohmscher Widerstand",
    definition:
      "Bei konstanten Bedingungen proportionales Strom-Spannungs-Verhalten; Einheit Ω = V/A.",
    moduleIds: ["electric-uir", "electric-ohm"],
  },
  {
    id: "electric-work-term",
    title: "Elektrische Arbeit",
    definition:
      "Umgesetzte Energie; bei konstanter Leistung E = P × t. 1 Wh = 3600 J.",
    moduleIds: ["electric-work"],
  },
];
export const electricalPlanned = [
  "Gleichstrom und Wechselstrom",
  "Drehstrom und Drehstromleistung",
  "Leistungsfaktor und Blindleistung",
  "Elektromotoren und Verdichterantriebe",
  "Schütze, Relais und Motorschutz",
  "Elektrische Schutzmaßnahmen",
  "Messgeräte und elektrische Messtechnik",
  "Sensoren und Aktoren",
  "Grundlagen der Steuerungstechnik",
  "Elektrische Schaltpläne",
  "Fehlersuche an Kälteanlagen",
];
