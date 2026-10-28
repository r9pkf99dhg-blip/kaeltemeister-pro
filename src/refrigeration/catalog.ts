import type { FoundationLesson } from "../academy/foundations/model";
import type { Formula, Source } from "../academy/model";
export const refrigerationLessons: FoundationLesson[] = [
  {
    id: "refrig-state-v08",
    title: "Zustände, Enthalpie und Referenzniveau",
    domainId: "thermodynamik",
    goal: "Zustände, Enthalpie und Referenzniveau: Stoffgrößen, gemeinsame Referenzen und ausdrücklich begrenzte Modelle unterscheiden und in nachvollziehbaren Lernrechnungen anwenden.",
    why: "Die grafische Betrachtung, die Zustandsgrößen und die Bilanz gehören zusammen. Erst eine richtige Systemgrenze, passende Quelle und gültige Einheit machen eine Zahl interpretierbar. Technische Freigaben entstehen daraus nicht automatisch.",
    basic:
      "Einphasige Gleichgewichtszustände eines reinen einfachen kompressiblen Stoffes werden durch geeignete unabhängige intensive Zustandsgrößen beschrieben. Ein Zustand beschreibt einen Stoff an einer bestimmten Stelle. Druck und Temperatur gehören dazu. Im Flüssigkeits- oder Dampfgebiet reichen zwei geeignete unabhängige Angaben, um weitere Stoffwerte zu bestimmen. Bei Sättigung sind Druck und Temperatur gekoppelt; dann brauchst du zusätzlich zum Beispiel den Dampfgehalt. Die spezifische Enthalpie h wird pro Kilogramm angegeben. Sie ist keine Temperatur.",
    reasoning:
      "Die spezifische Enthalpie h = u + pv verbindet innere Energie und den Strömungsanteil. In einer stationären offenen Energiebilanz werden passende Enthalpiedifferenzen benutzt. Alle Punkte müssen denselben Stoff, dieselbe Quelle und dasselbe Referenzniveau verwenden. Unser IIR-Bezug setzt h der Sattflüssigkeit bei 273,15 K auf 200 kJ/kg; dieser absolute Wert ist eine Konvention und keine frei verfügbare Wärme.",
    transfer:
      "Eine konstante Verschiebung aller h-Werte derselben Bilanz ändert ihre Differenzen nicht. Das Mischen von IIR- und ASHRAE-Werten kann dagegen falsche Leistungen erzeugen. Zwei Zustandsangaben sind nur dann ausreichend, wenn sie im betrachteten Phasenbereich unabhängig und zulässig sind. P und T bestimmen im Zweiphasengleichgewicht nicht allein den Dampfgehalt. Die App bietet einen geschlossenen validierten Katalog, keine allgemeine Zustandssuche.",
    example:
      "Ein ausdrücklich synthetisches Bilanzbeispiel mit gemeinsamem Bezug verwendet h1 = 400 und h4 = 250 kJ/kg: Die Differenz beträgt 150 kJ/kg. Werden beide Werte um 100 kJ/kg verschoben, bleibt die Differenz 150 kJ/kg. Diese runden Werte sind kein R134a-Stoffwertdatensatz.",
    derivation: [
      "Zustände und Systemgrenze festlegen; Absolutdruck und gemeinsames Referenzniveau kontrollieren.",
      "Passende Enthalpiedifferenzen bilden. Energie pro Masse und Leistung mit Massenstrom unterscheiden.",
      "Modellgrenzen und Quellenstatus benennen; Gegenbeispiel und unabhängige Zahlenprobe zur Kontrolle nutzen.",
    ],
    mistakes: [
      "Stoffwerte verschiedener Referenzniveaus oder Phasen unbemerkt mischen.",
      "Eine Modellbilanz als reale Anlagenfreigabe oder elektrischen Gesamt-COP ausgeben.",
    ],
    summary:
      "Ein Zustand beschreibt einen Stoff an einer bestimmten Stelle. Druck und Temperatur gehören dazu. Im Flüssigkeits- oder Dampfgebiet reichen zwei geeignete unabhängige Angaben, um weitere Stoffwerte zu bestimmen. Bei Sättigung sind Druck und Temperatur gekoppelt; dann brauchst du zusätzlich zum Beispiel den Dampfgehalt. Die spezifische Enthalpie h wird pro Kilogramm angegeben. Sie ist keine Temperatur.",
    prerequisites: ["thermo-states", "math-units"],
    formulaIds: ["thermo-enthalpy", "refrig-specific-q0"],
    sourceIds: ["coolprop-r134a-v08", "openstax-thermal-v06"],
    safety:
      "Eigene Lernmodelle, keine offizielle Prüfungsaufgabe, kein Stoffeinsatz- oder Auslegungsnachweis. Unabhängige menschliche Fachprüfung offen.",
    questions: [
      {
        prompt:
          "Was bleibt bei gemeinsamer Verschiebung aller Enthalpiereferenzen gleich?",
        correct: "Die passenden Enthalpiedifferenzen.",
        wrong: [
          "Alle absoluten h-Werte.",
          "Die Sättigungsdrücke müssen sich verschieben.",
        ],
        explanation:
          "Eine konstante gemeinsame Verschiebung hebt sich in hA − hB auf; unterschiedliche Bezugskonventionen dürfen nicht gemischt werden.",
      },
      {
        prompt:
          "Welche Angaben reichen im Zweiphasengleichgewicht eines reinen Stoffes nicht allein aus?",
        correct: "Druck und Temperatur zur Bestimmung von x.",
        wrong: [
          "Druck und Dampfgehalt.",
          "Sättigungstemperatur und Dampfgehalt.",
        ],
        explanation:
          "Druck und Sättigungstemperatur sind gekoppelt; die Dampfmasse ist damit noch nicht festgelegt.",
      },
      {
        prompt: "Was bedeutet das IIR-Niveau bei 0 °C Sattflüssigkeit?",
        correct: "h = 200 kJ/kg ist eine Referenzkonvention.",
        wrong: [
          "Der Stoff besitzt immer genau 200 kJ/kg nutzbare Wärme.",
          "Es liegt ein elektrischer Wirkungsgrad vor.",
        ],
        explanation:
          "Absolute h-Werte sind bezogen; passende Differenzen innerhalb derselben Konvention gehen in Bilanzen ein.",
      },
    ],
  },
  {
    id: "refrig-phase-v08",
    title: "Phasengrenzen, Dampfgehalt und Enthalpiedifferenzen",
    domainId: "thermodynamik",
    goal: "Phasengrenzen, Dampfgehalt und Enthalpiedifferenzen: Stoffgrößen, gemeinsame Referenzen und ausdrücklich begrenzte Modelle unterscheiden und in nachvollziehbaren Lernrechnungen anwenden.",
    why: "Die grafische Betrachtung, die Zustandsgrößen und die Bilanz gehören zusammen. Erst eine richtige Systemgrenze, passende Quelle und gültige Einheit machen eine Zahl interpretierbar. Technische Freigaben entstehen daraus nicht automatisch.",
    basic:
      "Für das subkritische Flüssigkeits-Dampf-Gleichgewicht des Reinstoffs sind die Grenzen x=0 und x=1 sowie eine gemeinsame Enthalpiereferenz maßgeblich. Flüssigkeit und Dampf können bei passendem Druck zusammen vorkommen. Sattflüssigkeit steht am Beginn der Verdampfung, Sattdampf an ihrem Ende. Dazwischen beschreibt der Dampfgehalt x den Anteil der Dampfmasse. x = 0 bedeutet Sattflüssigkeit, x = 1 Sattdampf. Das ist kein Volumenanteil. Beim Verdampfen kann ein Stoff Wärme aufnehmen, obwohl seine Sättigungstemperatur bei konstantem Druck gleich bleibt.",
    reasoning:
      "Für einen reinen Stoff im Zweiphasengleichgewicht gilt h = hfl + x(hd − hfl) bei gleichem Druck und Referenzniveau. Überhitzung bezieht sich auf die passende Sättigungsdampftemperatur, Unterkühlung auf die Sattflüssigkeit. Unser Modell verwendet reines R134a; Gemischgleit, Dew-/Bubble-Unterschiede und reale Leitungsdruckverluste sind nicht enthalten. x wird außerhalb des Zweiphasengebiets nicht als beliebige negative Prozentzahl interpretiert.",
    transfer:
      "Latenter und sensibler Wärmeanteil sind zu trennen. Die gesamte Verdampferstrecke einschließlich hier zugeordneter Überhitzung wird über h1 − h4 bilanziert. Eine Rechnung nur mit cpΔT übersieht den Phasenwechsel. Die Zuordnung dieser gesamten Modellwärme zur nutzbaren Raumkälteleistung ist eine zusätzliche Systemgrenzenfrage. Im kritischen Bereich verschwindet die Unterscheidung der Sättigungsphasen; unser Zeichenbereich endet vorher.",
    example:
      "Im synthetischen Beispiel seien hfl = 200 und hd = 400 kJ/kg am selben Druck vorgegeben. Bei x = 0,25 folgt h = 250 kJ/kg. Diese Zahlen erklären die Massenmischungsbeziehung, nicht reale R134a-Eigenschaften. Echte Modellwerte zeigt der gekennzeichnete CoolProp-Katalog.",
    derivation: [
      "Zustände und Systemgrenze festlegen; Absolutdruck und gemeinsames Referenzniveau kontrollieren.",
      "Passende Enthalpiedifferenzen bilden. Energie pro Masse und Leistung mit Massenstrom unterscheiden.",
      "Modellgrenzen und Quellenstatus benennen; Gegenbeispiel und unabhängige Zahlenprobe zur Kontrolle nutzen.",
    ],
    mistakes: [
      "Stoffwerte verschiedener Referenzniveaus oder Phasen unbemerkt mischen.",
      "Eine Modellbilanz als reale Anlagenfreigabe oder elektrischen Gesamt-COP ausgeben.",
    ],
    summary:
      "Flüssigkeit und Dampf können bei passendem Druck zusammen vorkommen. Sattflüssigkeit steht am Beginn der Verdampfung, Sattdampf an ihrem Ende. Dazwischen beschreibt der Dampfgehalt x den Anteil der Dampfmasse. x = 0 bedeutet Sattflüssigkeit, x = 1 Sattdampf. Das ist kein Volumenanteil. Beim Verdampfen kann ein Stoff Wärme aufnehmen, obwohl seine Sättigungstemperatur bei konstantem Druck gleich bleibt.",
    prerequisites: ["thermo-phase", "math-units"],
    formulaIds: ["refrig-specific-q0", "evaporator-power"],
    sourceIds: ["coolprop-r134a-v08", "openstax-thermal-v06"],
    safety:
      "Eigene Lernmodelle, keine offizielle Prüfungsaufgabe, kein Stoffeinsatz- oder Auslegungsnachweis. Unabhängige menschliche Fachprüfung offen.",
    questions: [
      {
        prompt: "Was beschreibt x = 0,25 im Zweiphasengebiet?",
        correct: "25 % der Gesamtmasse sind Dampf.",
        wrong: [
          "25 % des Volumens sind immer Dampf.",
          "Die Temperatur ist um 25 K gestiegen.",
        ],
        explanation:
          "x ist der Dampf-Massenanteil, kein Volumenanteil. Entscheidend sind die angegebenen Modellbedingungen und das gemeinsame Bezugsniveau der Zustände.",
      },
      {
        prompt:
          "Welche Rechnung reicht über einen Phasenwechsel nicht allgemein aus?",
        correct: "Allein m cp ΔT.",
        wrong: [
          "Eine passende Enthalpiedifferenz.",
          "Eine Zustandsbilanz mit gültigen Stoffwerten.",
        ],
        explanation:
          "Latente Wärme kann ohne Temperaturänderung übertragen werden. Entscheidend sind die angegebenen Modellbedingungen und das gemeinsame Bezugsniveau der Zustände.",
      },
      {
        prompt:
          "Kann ein Gesamtwärmeeintrag 4→1 automatisch als nützliche Raumkälteleistung gelten?",
        correct: "Nein, die konkrete Systemgrenze muss dazu passen.",
        wrong: [
          "Ja, jede Überhitzung ist automatisch nutzbar.",
          "Ja, der Druckbezug ist dafür unwichtig.",
        ],
        explanation:
          "Leitungswärme und andere Beiträge müssen bei realen Anlagen getrennt zugeordnet werden.",
      },
    ],
  },
  {
    id: "refrig-cycle-v08",
    title: "Kreisprozess und echtes log-p-h lesen",
    domainId: "thermodynamik",
    goal: "Kreisprozess und echtes log-p-h lesen: Stoffgrößen, gemeinsame Referenzen und ausdrücklich begrenzte Modelle unterscheiden und in nachvollziehbaren Lernrechnungen anwenden.",
    why: "Die grafische Betrachtung, die Zustandsgrößen und die Bilanz gehören zusammen. Erst eine richtige Systemgrenze, passende Quelle und gültige Einheit machen eine Zahl interpretierbar. Technische Freigaben entstehen daraus nicht automatisch.",
    basic:
      "Die stationäre offene Fluidbilanz verbindet vier fest definierte Zustandspunkte über Enthalpiedifferenzen, isobare Wärmeübertragung und isenthalpe Expansion. Folge dem Kältemittel: 1 liegt vor dem Verdichter, 2 danach, 3 nach dem Verflüssiger und 4 nach dem Expansionsorgan. Der Verdichter benötigt Arbeit. Auf der Hochdruckseite wird Wärme abgegeben. Nach der Drosselung nimmt der Stoff auf der Niederdruckseite Wärme auf. Im Diagramm steht h waagerecht; p ist ein Absolutdruck auf einer logarithmischen Achse. Gleiche Abstände bedeuten gleiche Druckverhältnisse.",
    reasoning:
      "Für das stationäre Fluidmodell ohne relevante Änderungen von Geschwindigkeit/Höhe gilt q0 = h1 − h4, w = h2 − h1 und qk = h2 − h3. Die Drossel ist adiabatisch ohne Wellenarbeit: h4 = h3. Damit folgt qk = q0 + w. Der fluidbezogene COP q0/w ist nicht automatisch der gesamte elektrische Anlagen-COP; Motor, Nebenaggregate und reale zusätzliche Verluste sind hier nicht bilanziert.",
    transfer:
      "Die ideale Verdichtung wird mit konstantem s aus der Stoffwertquelle berechnet. Verdampfung und Verflüssigung verlaufen im vereinfachten Modell jeweils isobar, Drosselung isenthalp. Die Grafik nutzt echte Sättigungs- und Zustandsdaten mit gleichem IIR-Bezug. Linien zwischen Stützpunkten sind Zeichnung, keine freie Stoffwertinterpolation. Im Betriebsfall mit ηis unter eins ist die Verbindung zum Endpunkt kein berechneter realer Verdichtungspfad.",
    example:
      "Synthetisches Rechenmodell: h1 = 400, h2 = 450 und h3 = h4 = 250 kJ/kg. Dann q0 = 150, w = 50 und qk = 200 kJ/kg; COP = 3. Bei 0,05 kg/s folgen 7,5 kW Wärmeaufnahme und 2,5 kW Fluidverdichterleistung. Reale R134a-Zahlen bleiben davon getrennt im versionierten Katalog.",
    derivation: [
      "Zustände und Systemgrenze festlegen; Absolutdruck und gemeinsames Referenzniveau kontrollieren.",
      "Passende Enthalpiedifferenzen bilden. Energie pro Masse und Leistung mit Massenstrom unterscheiden.",
      "Modellgrenzen und Quellenstatus benennen; Gegenbeispiel und unabhängige Zahlenprobe zur Kontrolle nutzen.",
    ],
    mistakes: [
      "Stoffwerte verschiedener Referenzniveaus oder Phasen unbemerkt mischen.",
      "Eine Modellbilanz als reale Anlagenfreigabe oder elektrischen Gesamt-COP ausgeben.",
    ],
    summary:
      "Folge dem Kältemittel: 1 liegt vor dem Verdichter, 2 danach, 3 nach dem Verflüssiger und 4 nach dem Expansionsorgan. Der Verdichter benötigt Arbeit. Auf der Hochdruckseite wird Wärme abgegeben. Nach der Drosselung nimmt der Stoff auf der Niederdruckseite Wärme auf. Im Diagramm steht h waagerecht; p ist ein Absolutdruck auf einer logarithmischen Achse. Gleiche Abstände bedeuten gleiche Druckverhältnisse.",
    prerequisites: ["thermo-cycle-balance", "math-units"],
    formulaIds: [
      "refrig-specific-q0",
      "refrig-specific-w",
      "refrig-specific-qk",
      "refrig-cycle-cop",
    ],
    sourceIds: ["coolprop-r134a-v08", "openstax-thermal-v06"],
    safety:
      "Eigene Lernmodelle, keine offizielle Prüfungsaufgabe, kein Stoffeinsatz- oder Auslegungsnachweis. Unabhängige menschliche Fachprüfung offen.",
    questions: [
      {
        prompt: "Welcher Zustand liegt direkt nach dem Expansionsorgan?",
        correct: "Zustand 4.",
        wrong: ["Zustand 2.", "Zustand 3."],
        explanation:
          "Unsere Konvention setzt 4 an den Verdampfereintritt nach der Drossel. Entscheidend sind die angegebenen Modellbedingungen und das gemeinsame Bezugsniveau der Zustände.",
      },
      {
        prompt:
          "Welche Beziehung gilt für die adiabatische Drossel ohne Wellenarbeit?",
        correct: "h4 = h3.",
        wrong: ["s4 = s3 gilt immer.", "T4 = T3 gilt immer."],
        explanation:
          "Das vereinfachte stationäre Drosselmodell ist isenthalp; Temperatur und Entropie müssen nicht gleich bleiben.",
      },
      {
        prompt: "Was bedeuten gleiche vertikale Abstände im log-p-h?",
        correct: "Gleiche Druckverhältnisse.",
        wrong: ["Gleiche Druckdifferenzen.", "Gleiche Enthalpiedifferenzen."],
        explanation:
          "Auf der logarithmischen Achse sind zum Beispiel 1→2 und 2→4 bar gleich weit. Entscheidend sind die angegebenen Modellbedingungen und das gemeinsame Bezugsniveau der Zustände.",
      },
    ],
  },
  {
    id: "refrig-compression-v08",
    title: "Entropie, ideale Verdichtung und ηis",
    domainId: "thermodynamik",
    goal: "Entropie, ideale Verdichtung und ηis: Stoffgrößen, gemeinsame Referenzen und ausdrücklich begrenzte Modelle unterscheiden und in nachvollziehbaren Lernrechnungen anwenden.",
    why: "Die grafische Betrachtung, die Zustandsgrößen und die Bilanz gehören zusammen. Erst eine richtige Systemgrenze, passende Quelle und gültige Einheit machen eine Zahl interpretierbar. Technische Freigaben entstehen daraus nicht automatisch.",
    basic:
      "Der isentrope Vergleichszustand wird durch Austrittsdruck und Eintrittsentropie im selben Stoffmodell bestimmt. Entropie ist eine eigene Zustandsgröße. Sie ist weder Temperatur noch einfach eine Wärmemenge. Bei einer idealen adiabatischen und reversiblen Verdichtung bleibt die spezifische Entropie s gleich. Der Druck steigt, und der Verdichter muss Arbeit zuführen. Eine reale Verdichtung ist nicht schon deshalb ideal, weil sie gut gedämmt ist. Reibung und andere irreversible Vorgänge können Entropie erzeugen.",
    reasoning:
      "Zur isentropen Referenz werden Eintrittszustand, s1 und Austrittsdruck festgelegt. Die Stoffwertquelle liefert h2s aus p2 und s1. Im hier verwendeten adiabatischen Verdichtermodell beschreibt ηis = (h2s − h1)/(h2 − h1) den Vergleich der Fluidenthalpiezunahmen. Für 0 < ηis ≤ 1 ist h2 = h1 + (h2s − h1)/ηis. Das ist kein Gesamtwirkungsgrad des elektrischen Antriebs.",
    transfer:
      "Die Bedingung s2s = s1 ist eine Modellannahme, keine Messung am realen Verdichter. ηis ist aus dem gegebenen Endzustand oder als ausdrücklicher Modellparameter zu verwenden; die App liefert keine Herstellerkennfelder. Beim Fall ηis = 0,75 wird nur der Endzustand berechnet. Ein tatsächlicher Pfad mit Wärmeverlusten, Öl, mechanischen Verlusten oder zeitlichem Verhalten ist nicht bestimmt.",
    example:
      "Für ein synthetisches Beispiel mit h1 = 400 und h2s = 440 kJ/kg führt ηis = 0,8 zu h2 = 450 kJ/kg. Die zusätzliche Fluidenthalpie beträgt 50 statt 40 kJ/kg. Das allein bestimmt noch keine elektrische Aufnahmeleistung und ist kein realer R134a-Datensatz.",
    derivation: [
      "Zustände und Systemgrenze festlegen; Absolutdruck und gemeinsames Referenzniveau kontrollieren.",
      "Passende Enthalpiedifferenzen bilden. Energie pro Masse und Leistung mit Massenstrom unterscheiden.",
      "Modellgrenzen und Quellenstatus benennen; Gegenbeispiel und unabhängige Zahlenprobe zur Kontrolle nutzen.",
    ],
    mistakes: [
      "Stoffwerte verschiedener Referenzniveaus oder Phasen unbemerkt mischen.",
      "Eine Modellbilanz als reale Anlagenfreigabe oder elektrischen Gesamt-COP ausgeben.",
    ],
    summary:
      "Entropie ist eine eigene Zustandsgröße. Sie ist weder Temperatur noch einfach eine Wärmemenge. Bei einer idealen adiabatischen und reversiblen Verdichtung bleibt die spezifische Entropie s gleich. Der Druck steigt, und der Verdichter muss Arbeit zuführen. Eine reale Verdichtung ist nicht schon deshalb ideal, weil sie gut gedämmt ist. Reibung und andere irreversible Vorgänge können Entropie erzeugen.",
    prerequisites: ["thermo-cycle-balance", "math-units"],
    formulaIds: ["refrig-specific-w", "refrig-isentropic-efficiency"],
    sourceIds: ["coolprop-r134a-v08", "openstax-thermal-v06"],
    safety:
      "Eigene Lernmodelle, keine offizielle Prüfungsaufgabe, kein Stoffeinsatz- oder Auslegungsnachweis. Unabhängige menschliche Fachprüfung offen.",
    questions: [
      {
        prompt: "Wann ist die Verdichtung im hier idealen Modell isentrop?",
        correct: "Adiabatisch und reversibel.",
        wrong: [
          "Nur weil sie elektrisch angetrieben wird.",
          "Jede reale Verdichtung ist isentrop.",
        ],
        explanation:
          "Beide Idealisierungen sind nötig; Wärmeisolierung allein beseitigt Irreversibilität nicht.",
      },
      {
        prompt: "Was ist der Bezug für h2s?",
        correct: "Austrittsdruck p2 und s1.",
        wrong: [
          "Nur der Massenstrom.",
          "Beliebige Enthalpie aus einem anderen Stoff.",
        ],
        explanation:
          "Der isentrope Endzustand nutzt dieselbe Stoffquelle und Entropiereferenz. Entscheidend sind die angegebenen Modellbedingungen und das gemeinsame Bezugsniveau der Zustände.",
      },
      {
        prompt: "Was beschreibt ηis hier nicht?",
        correct: "Den gesamten elektrischen Anlagenwirkungsgrad.",
        wrong: [
          "Den Vergleich geeigneter Fluidenthalpiezunahmen.",
          "Ein ausdrücklich begrenztes adiabatisches Verdichtermodell.",
        ],
        explanation:
          "Motor, Nebenaggregate und weitere Verluste sind getrennt zu modellieren. Entscheidend sind die angegebenen Modellbedingungen und das gemeinsame Bezugsniveau der Zustände.",
      },
    ],
  },
];
export const refrigerationSources: Source[] = [
  {
    id: "coolprop-r134a-v08",
    title:
      "CoolProp 7.2.0 · HEOS R134a · API, Referenzzustände und EOS-Metadaten",
    url: "https://github.com/CoolProp/CoolProp/tree/v7.2.0",
    access: "consulted",
    accessedAt: "2026-10-28",
    reviewedCommit: "98b3523d5daa98454618d381d2ae53f7471d216b",
    locator:
      "Web/coolprop/HighLevelAPI.rst: Vapor/Liquid/Saturation, Reference States; python-plotting.rst; dev/fluids/R134a.json; CoolPropBibTeXLibrary.bib: TillnerRoth-JPCRD-1994.",
    supports:
      "Tatsächlich gelesene API-/IIR-/Sättigungsbeschreibung und Modellherkunft. Eigene stationäre Kreisbilanz/Lehrtexte sind keine unabhängig fachlich freigegebene Gesamtanwendung.",
    license: "MIT; unveränderte Lizenz unter licenses/CoolProp-MIT.txt.",
    note: "Geschlossener Fallkatalog; keine unabhängige experimentelle Stoffmodellvalidierung und keine Hersteller-/Normfreigabe.",
  },
];
export const refrigerationFormulas: Formula[] = [
  {
    id: "refrig-specific-q0",
    title: "Spezifischer niederdruckseitiger Wärmeeintrag",
    expression: "q0 = h1 − h4",
    tex: "q_0=h_1-h_4",
    units: "J/kg",
    assumptions:
      "Stationäres Fluidmodell, gleiche Referenz; gesamte Modellstrecke 4→1 einschließlich zugeordneter Überhitzung, keine automatische Nutzwärmezuordnung.",
    sourceIds: ["coolprop-r134a-v08", "openstax-thermal-v06"],
  },
  {
    id: "refrig-specific-w",
    title: "Spezifische Fluidverdichterarbeit",
    expression: "w = h2 − h1",
    tex: "w=h_2-h_1",
    units: "J/kg",
    assumptions:
      "Stationär, adiabatisch, Änderungen kinetischer/potenzieller Energie vernachlässigt; keine elektrische Gesamtleistung.",
    sourceIds: ["coolprop-r134a-v08", "openstax-thermal-v06"],
  },
  {
    id: "refrig-specific-qk",
    title: "Spezifische hochdruckseitige Wärmeabgabe",
    expression: "qk = h2 − h3 = q0 + w",
    tex: "q_k=h_2-h_3=q_0+w",
    units: "J/kg",
    assumptions:
      "Betrag der stationären Fluidwärmeabgabe, gleiche Referenzen und isenthalpe Drossel h4=h3; weitere Energieterme vernachlässigt.",
    sourceIds: ["coolprop-r134a-v08", "openstax-thermal-v06"],
  },
  {
    id: "refrig-cycle-cop",
    title: "Fluidbezogene Kälteleistungszahl",
    expression: "COP = q0 / w",
    tex: String.raw`\mathrm{COP}=\frac{q_0}{w}`,
    units: "1",
    assumptions:
      "q0>0 und w>0 im selben Modell; kein Gesamt-COP einschließlich Motor/Nebenaggregaten.",
    sourceIds: ["coolprop-r134a-v08", "openstax-cop-github"],
  },
  {
    id: "refrig-isentropic-efficiency",
    title: "Isentroper Verdichtervergleich",
    expression: "ηis = (h2s−h1)/(h2−h1)",
    tex: String.raw`\eta_\mathrm{is}=\frac{h_{2s}-h_1}{h_2-h_1}`,
    units: "1",
    assumptions:
      "Adiabatisches stationäres Fluidmodell, gleicher Ein-/Austrittsdruck und Bezugszustand; 0<ηis≤1; keine elektrische Anlagenwirkungsgradangabe.",
    sourceIds: ["coolprop-r134a-v08"],
  },
];
