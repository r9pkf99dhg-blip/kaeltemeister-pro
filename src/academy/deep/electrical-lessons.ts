import type { FoundationLesson } from "../foundations/model";
export const electrical_lessons: FoundationLesson[] = [
  {
    id: "electric-ac-wave",
    domainId: "elektro",
    title: "Wechselstrom: Sinus, Zeit und Effektivwert",
    goal: "Momentanwert, Scheitelwert und Effektivwert eines Sinus unterscheiden und die Phase lesen.",
    why: "Eine wechselnde Spannung ist eine Zeitfunktion. Ihr Scheitelwert, ihr Mittelwert und ihre thermische Wirkung beschreiben verschiedene Eigenschaften. Ein einzelner Messwert oder eine Zahl auf einer Skala erklärt den Verlauf noch nicht.",
    basic:
      "Gleichstrom bleibt im stationären Modell konstant. Eine reine Sinusspannung lautet \\(u(t)=\\hat U\\sin(\\omega t)\\), mit \\(\\omega=2\\pi f\\) und \\(T=1/f\\). Die Amplitude \\(\\hat U\\) ist der größte Betrag, der Momentanwert hängt von der Zeit ab. 50 Hz bedeutet 50 Perioden pro Sekunde und T = 0,020 s.",
    reasoning:
      "Der Effektivwert ist die Wurzel des zeitlichen Mittelwerts des Quadrats: \\(U_\\mathrm{eff}=\\sqrt{\\frac1T\\int_0^T u(t)^2\\,dt}\\). Beim Sinus ist der Mittelwert von sin² gleich 1/2, deshalb \\(U_\\mathrm{eff}=\\hat U/\\sqrt2\\). Der einfache Mittelwert eines vollständigen Sinus ist dagegen null; sein gleichgerichteter Mittelwert wäre 2Û/π.",
    transfer:
      "Für \\(i(t)=\\hat I\\sin(\\omega t-\\varphi)\\) hinkt der Strom bei positivem φ der Spannung nach. Ein idealer Widerstand hat φ = 0. Bei verzerrten Signalen muss der Effektivwert aus dem tatsächlichen Verlauf bestimmt werden; die Division durch √2 gilt nur für den reinen Sinus, nicht für jede Wechselgröße.",
    example:
      "Ein fiktiver Sinus mit Scheitelwert \\(100\\sqrt2\\,\\mathrm V\\) hat \\(100\\,\\mathrm V\\) effektiv. Bei 50 Hz liegt das erste Maximum nach 5 ms. Ein um 30° nacheilender Strom erreicht seine entsprechenden Phasenpunkte erst um \\(T/12=1{,}667\\,\\mathrm{ms}\\) später. Das ist ein theoretischer Lernfall.",
    derivation: [
      "\\(f=\\frac1T,\\quad\\omega=\\frac{2\\pi}T=2\\pi f\\).",
      "\\(\\frac1T\\int_0^T\\hat U^2\\sin^2(\\omega t)\\,dt=\\frac{\\hat U^2}{2}\\).",
      "\\(U_\\mathrm{eff}=\\frac{\\hat U}{\\sqrt2}\\); der Mittelwert von u selbst bleibt null.",
    ],
    mistakes: [
      "Scheitelwert als Effektivwert einsetzen: die Leistung wird bei zwei Scheitelwerten um Faktor zwei falsch.",
      "Zeitlicher Mittelwert null mit fehlender Energieübertragung gleichsetzen; √2 auf beliebige Signalformen anwenden.",
    ],
    summary:
      "Frequenz und Periodendauer beschreiben die Zeit, Phase die relative Verschiebung. Der Effektivwert beschreibt die gleiche mittlere Widerstandserwärmung wie Gleichstrom. Nur beim Sinus ist er der Scheitelwert geteilt durch √2.",
    prerequisites: ["electric-quantities", "math-trigonometry"],
    formulaIds: ["ac-period", "ac-rms"],
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    questions: [
      {
        prompt: "Welche Periodendauer hat ein Sinus mit 50 Hz?",
        correct: "0,020 s",
        wrong: ["50 s", "0,50 s"],
        explanation:
          "Periodendauer und Frequenz sind Kehrwerte: T = 1/50 s = 0,020 s. Hz bedeutet eine Periode pro Sekunde und ist keine Zeitangabe.",
      },
      {
        prompt:
          "Warum ist Û/√2 nicht allgemein für jede Wechselspannung gültig?",
        correct:
          "Der Faktor folgt aus dem quadratischen Mittel eines reinen Sinus.",
        wrong: [
          "Weil Volt keine Einheit ist.",
          "Weil der Scheitelwert stets null ist.",
        ],
        explanation:
          "Der Effektivwert ist allgemein das quadratische Zeitmittel mit anschließender Wurzel. Nur der reine Sinus liefert den besonderen Faktor 1/√2.",
      },
      {
        prompt:
          "Der einfache Mittelwert eines Sinusstroms ist null. Kann ein Widerstand Leistung aufnehmen?",
        correct: "Ja, der Mittelwert von i²R ist positiv.",
        wrong: [
          "Nein, Mittelwert null bedeutet immer Leistung null.",
          "Nur bei ausgeschaltetem Strom.",
        ],
        explanation:
          "Im Widerstand gilt p(t) = i(t)²R. Positive und negative Halbwellen erzeugen beide positive Leistung; der einfache Strommittelwert ist dafür ungeeignet.",
      },
    ],
    safety:
      "Nur theoretische Lerninhalte und Simulationen. Keine Freigabe für Arbeiten an elektrischen Anlagen; fachliche Qualifikation, Arbeitsanweisung und Gefährdungsbeurteilung werden nicht ersetzt.",
  },
  {
    id: "electric-ac-reactance",
    domainId: "elektro",
    title: "Spule, Kondensator und Impedanz",
    goal: "Energiespeicher, Phasenverschiebung und Blindwiderstände im sinusförmigen RLC-Lehrmodell erklären.",
    why: "Widerstand wandelt elektrische Energie in innere Energie um, Spule und Kondensator speichern sie zeitweise in Feldern. Daraus entstehen Phasenbeziehungen und Frequenzabhängigkeiten. Reale Bauteile besitzen zusätzliche Verluste und Grenzen.",
    basic:
      "Die ideale Spule speichert magnetische Energie; eine Stromänderung erzeugt eine entgegenwirkende induzierte Spannung. Der Kondensator trennt Ladungen und speichert elektrische Feldenergie: Ein Strom verändert seine Spannung. Im Sinusmodell gilt für die Beträge \\(X_L=\\omega L\\) und \\(X_C=\\frac1{\\omega C}\\).",
    reasoning:
      "Aus \\(u_L=L\\frac{di}{dt}\\) folgt bei Sinusstrom eine um 90° voreilende Spannung, also nacheilender Strom. Aus \\(i_C=C\\frac{du}{dt}\\) folgt voreilender Strom beim Kondensator. Im idealen Serien-RLC-Kreis addieren sich Zeiger, nicht Beträge: \\(Z=\\sqrt{R^2+(X_L-X_C)^2}\\), \\(\\tan\\varphi=(X_L-X_C)/R\\) bei R > 0.",
    transfer:
      "Bei höherer Frequenz steigt XL, während XC sinkt. Bei Serienresonanz können sich die Blindanteile aufheben; reale Verluste und Bauteilbelastungen bleiben. Diese Theorie ist keine Anleitung zum Anschluss von Kondensatoren oder Kompensationsanlagen und darf nicht als Dimensionierungsfreigabe verwendet werden.",
    example:
      "Fiktiv R = 30 Ω und XL − XC = 40 Ω: \\(Z=\\sqrt{30^2+40^2}=50\\,\\Omega\\). Bei 100 V effektiv folgt I = 2 A. Der Phasenwinkel hat cos φ = R/Z = 0,6. Bei ideal rein induktivem Zweig ist der mittlere Energieumsatz null, obwohl Strom fließt.",
    derivation: [
      "Für \\(i=\\hat I\\sin\\omega t\\) ist \\(u_L=\\omega L\\hat I\\cos\\omega t\\).",
      "Für \\(u=\\hat U\\sin\\omega t\\) ist \\(i_C=\\omega C\\hat U\\cos\\omega t\\).",
      "Pythagoras im Impedanzdreieck: \\(Z^2=R^2+(X_L-X_C)^2\\).",
    ],
    mistakes: [
      "XL und XC ohne Phasenbezug wie ohmsche Widerstände addieren.",
      "Reale Spulen als verlustfrei voraussetzen oder µF nicht in F umrechnen.",
    ],
    summary:
      "Induktivität und Kapazität speichern Energie in unterschiedlichen Feldern. Ihre zeitlichen Beziehungen erzeugen Phasenverschiebungen. Die Impedanz eines Serien-RLC-Kreises enthält die Differenz der Blindanteile und benötigt ein sinusförmiges eingeschwungenes Modell.",
    prerequisites: ["electric-ac-wave", "math-triangles"],
    formulaIds: ["ac-reactance-l", "ac-reactance-c", "ac-impedance"],
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    questions: [
      {
        prompt: "Was geschieht mit XL bei doppelter Frequenz und konstantem L?",
        correct: "XL verdoppelt sich.",
        wrong: ["XL halbiert sich.", "XL bleibt immer gleich."],
        explanation:
          "XL = 2πfL ist bei konstantem L direkt proportional zu f. Die Aussage gilt für das ideale lineare sinusförmige Spulenmodell.",
      },
      {
        prompt: "Serienkreis: R=30 Ω, XL−XC=40 Ω. Betrag Z?",
        correct: "50 Ω",
        wrong: ["70 Ω", "10 Ω"],
        explanation:
          "Ohmscher und resultierender Blindanteil stehen im Zeigerdreieck senkrecht. Daher Z = √(30² + 40²) = 50 Ω und nicht die Summe der Beträge.",
      },
      {
        prompt:
          "Warum gilt das ideale verlustfreie Spulenmodell nicht als reale Bauteilfreigabe?",
        correct: "Reale Verluste, Sättigung und Belastungsgrenzen fehlen.",
        wrong: [
          "Weil Magnetfelder nicht existieren.",
          "Weil jede Spule ein Widerstand von null ist.",
        ],
        explanation:
          "Das Lehrmodell erklärt Phasenbeziehungen. Kupferverluste, magnetische Nichtlinearität und reale Spannungs-/Stromgrenzen benötigen passende Bauteildaten.",
      },
    ],
    safety:
      "Nur theoretische Lerninhalte und Simulationen. Keine Freigabe für Arbeiten an elektrischen Anlagen; fachliche Qualifikation, Arbeitsanweisung und Gefährdungsbeurteilung werden nicht ersetzt.",
  },
  {
    id: "electric-ac-power",
    domainId: "elektro",
    title: "Wirk-, Blind- und Scheinleistung",
    goal: "Das Leistungsdreieck und seine Grenzen bei sinusförmigem Einphasenwechselstrom begründen.",
    why: "Verdichterantriebe können Strom aufnehmen, ohne die gesamte Scheinleistung als Wirkleistung umzusetzen. Leistungsfaktor, elektrische Energie und mechanischer Wirkungsgrad beantworten dabei unterschiedliche Fragen und müssen getrennt bleiben.",
    basic:
      "Bei gleichfrequenten sinusförmigen Spannung und Strom gilt \\(S=U_\\mathrm{eff}I_\\mathrm{eff}\\) in VA, \\(P=S\\cos\\varphi\\) in W und \\(Q=S\\sin\\varphi\\) in var. Positives φ bezeichnet hier induktives Nacheilen, also Q > 0. Beim kapazitiven Fall ist Q negativ; unsere numerischen Blindleistungsaufgaben fragen positive induktive Beträge.",
    reasoning:
      "Das Zeitmittel von u(t)i(t) ist \\(\\frac{\\hat U\\hat I}{2}\\cos\\varphi\\); Einsetzen der Effektivwerte ergibt P = UI cos φ. Weil cos² + sin² = 1, folgt \\(S^2=P^2+Q^2\\). Der Gesamtleistungsfaktor λ = P/S stimmt nur in diesem Sinusmodell mit dem Verschiebungsfaktor cos φ überein.",
    transfer:
      "Bei verzerrten Strömen ist λ nicht allein aus einer Phasenverschiebung bestimmbar; das einfache Leistungsdreieck reicht dann nicht aus. Energie bei konstantem P ist E = Pt. Der Wirkungsgrad η = Pmechanisch/Pelektrisch beschreibt Umwandlungsverluste und ist kein anderer Name für cos φ. Ohne mechanische Leistung bleibt η unbekannt.",
    example:
      "100 V und 2 A effektiv, cos φ = 0,6 und induktiver Betrieb: S = 200 VA, P = 120 W, Q = 160 var. Prüfung: 120² + 160² = 200². In 2 h werden 240 Wh Wirkarbeit aufgenommen; die Blindleistung wird nicht als dauerhaft verbrauchte mechanische Energie interpretiert.",
    derivation: [
      "\\(\\langle ui\\rangle=\\frac{\\hat U\\hat I}{2}\\cos\\varphi=U_\\mathrm{eff}I_\\mathrm{eff}\\cos\\varphi\\).",
      "\\(Q=S\\sin\\varphi\\), sodass \\(P^2+Q^2=S^2\\) im reinen Sinusmodell.",
      "\\(\\lambda=\\frac PS\\) für S > 0; bei sinusförmigen Größen \\(\\lambda=\\cos\\varphi\\).",
    ],
    mistakes: [
      "VA, var und W als dieselbe Art von Leistung behandeln.",
      "cos φ als Wirkungsgrad oder als vollständigen Leistungsfaktor bei verzerrten Strömen ausgeben.",
    ],
    summary:
      "Wirkleistung ist die mittlere Energieübertragungsrate. Blindleistung beschreibt den pendelnden Anteil im Sinusmodell, Scheinleistung das Produkt der Effektivwerte. Das einfache Dreieck und λ = cos φ benötigen sinusförmige Größen und passende Systemgrenzen.",
    prerequisites: ["electric-ac-reactance", "physics-energy"],
    formulaIds: ["ac-apparent", "ac-real", "ac-reactive", "ac-factor"],
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    questions: [
      {
        prompt: "100 V, 2 A effektiv, cos φ=0,6: welche Wirkleistung?",
        correct: "120 W",
        wrong: ["200 W", "160 W"],
        explanation:
          "S = 100 × 2 = 200 VA, daraus P = S × 0,6 = 120 W. 160 var ist in diesem induktiven Sinusfall der Blindanteil, keine Wirkleistung.",
      },
      {
        prompt: "Ist cos φ immer der Gesamtleistungsfaktor?",
        correct: "Nur im passenden sinusförmigen Modell.",
        wrong: [
          "Ja, auch bei beliebig verzerrten Signalen.",
          "Nein, auch beim Sinus nie.",
        ],
        explanation:
          "Für gleiche reine Sinusfrequenz gilt λ = P/S = cos φ. Oberwellen und verzerrte Ströme verlangen eine allgemeinere Leistungsbetrachtung.",
      },
      {
        prompt: "Reicht cos φ=0,6 aus, um den Motorwirkungsgrad zu bestimmen?",
        correct: "Nein, die mechanische Ausgangsleistung fehlt.",
        wrong: ["Ja, η ist immer 0,6.", "Ja, η ist immer 1."],
        explanation:
          "Wirkungsgrad vergleicht mechanische Ausgangs- und elektrische Wirkleistung. cos φ beschreibt im Sinusmodell eine Phasenbeziehung und ersetzt diese Daten nicht.",
      },
    ],
    safety:
      "Nur theoretische Lerninhalte und Simulationen. Keine Freigabe für Arbeiten an elektrischen Anlagen; fachliche Qualifikation, Arbeitsanweisung und Gefährdungsbeurteilung werden nicht ersetzt.",
  },
  {
    id: "electric-three-phase",
    domainId: "elektro",
    title: "Drehstrom: Leiter-, Stranggrößen und Leistung",
    goal: "Stern und Dreieck im symmetrischen sinusförmigen Lehrmodell sauber unterscheiden.",
    why: "Drei gleich große Sinusspannungen mit gleicher Frequenz und 120° Versatz bilden ein symmetrisches Dreiphasensystem. Außenleiter verbinden das Netz mit den Strängen; der Neutralleiter ist mit dem Sternpunkt verbunden. Das ist eine theoretische Beschreibung, keine Verdrahtungsanleitung.",
    basic:
      "Ein Strang ist ein einzelner Verbraucherzweig. Im symmetrischen Stern gilt \\(U_L=\\sqrt3U_\\mathrm{Str}\\) und \\(I_L=I_\\mathrm{Str}\\). Im symmetrischen Dreieck gilt \\(U_L=U_\\mathrm{Str}\\) und \\(I_L=\\sqrt3I_\\mathrm{Str}\\). Leitergrößen dürfen deshalb nicht wahllos in Formeln für Stranggrößen eingesetzt werden.",
    reasoning:
      "Die Leiterspannung im Stern ist die Zeigerdifferenz zweier um 120° versetzter Strangspannungen. Ihr Betrag ist \\(\\sqrt{U^2+U^2-2U^2\\cos120^\\circ}=\\sqrt3U\\). Im Dreieck entsteht entsprechend die Leiterstromgröße aus der Differenz zweier Strangströme. Addition dreier gleicher Wirkleistungen ergibt \\(P=3U_\\mathrm{Str}I_\\mathrm{Str}\\cos\\varphi=\\sqrt3U_LI_L\\cos\\varphi\\).",
    transfer:
      "Bei symmetrischer Last summieren sich die drei sinusförmigen Strangströme am Sternpunkt zu null. Unsymmetrie oder Oberwellen können Neutralleiterstrom verursachen; dann genügt die einfache symmetrische Gesamtformel nicht. Anschlüsse, Schutzmaßnahmen und reale Motordaten werden hier weder ausgelegt noch zur Ausführung freigegeben.",
    example:
      "Fiktiv \\(U_L=100\\sqrt3\\,\\mathrm V\\), \\(I_L=2\\,\\mathrm A\\), cos φ = 0,6: P = 360 W. Im Stern sind die Strangwerte 100 V und 2 A: 3 × 100 × 2 × 0,6 = 360 W. Im Dreieck gilt dagegen Ustr = UL und Istr = IL/√3; die Gesamtleistung bleibt gleich.",
    derivation: [
      "Zeigerdifferenz: \\(U_L^2=2U_\\mathrm{Str}^2(1-\\cos120^\\circ)=3U_\\mathrm{Str}^2\\).",
      "Stern: \\(3\\frac{U_L}{\\sqrt3}I_L\\cos\\varphi=\\sqrt3U_LI_L\\cos\\varphi\\).",
      "Dreieck: \\(3U_L\\frac{I_L}{\\sqrt3}\\cos\\varphi=\\sqrt3U_LI_L\\cos\\varphi\\).",
    ],
    mistakes: [
      "Leiter- und Stranggrößen mischen oder den Faktor √3 in Stern und Dreieck auf die falsche Größe anwenden.",
      "Die symmetrische Formel für unbekannte unsymmetrische oder verzerrte Belastung verwenden.",
    ],
    summary:
      "Stern und Dreieck besitzen unterschiedliche Leiter-Strang-Beziehungen. Im symmetrischen Sinusmodell ergeben beide dieselbe Gesamtformel mit Leitergrößen. Eine reale unsymmetrische Anlage oder ein Motor benötigt zusätzliche Angaben und fachliche Bewertung.",
    prerequisites: ["electric-ac-power", "math-trigonometry"],
    formulaIds: ["ac-star", "ac-delta", "ac-three-power"],
    sourceIds: ["openstax-ac-v06", "openstax-precalculus-v06"],
    questions: [
      {
        prompt: "Welche Beziehung gilt im symmetrischen Stern?",
        correct: "UL = √3 Ustr und IL = Istr",
        wrong: ["UL = Ustr und IL = √3 Istr", "UL = 3 Ustr und IL = 3 Istr"],
        explanation:
          "Die Leiterspannung ist eine Zeigerdifferenz mit 120° Versatz und hat den √3-fachen Betrag. Der Außenleiterstrom ist zugleich der zugehörige Strangstrom.",
      },
      {
        prompt: "Welche Größen benötigt P=√3 UL IL cos φ?",
        correct: "Leitereffektivwerte im symmetrischen sinusförmigen System.",
        wrong: [
          "Strangscheitelwerte eines beliebigen Systems.",
          "Nur eine beliebige Spannung und Stromangabe.",
        ],
        explanation:
          "Die Formel summiert drei gleiche Strangleistungen und ersetzt Stranggrößen durch Leitergrößen. Unsymmetrie und Signalverzerrung sind damit nicht allgemein abgedeckt.",
      },
      {
        prompt:
          "Warum kann der Neutralleiterstrom trotz Dreiphasensystem ungleich null sein?",
        correct:
          "Bei Unsymmetrie oder geeigneten Oberwellen heben sich Ströme nicht auf.",
        wrong: [
          "Weil sich immer alle Beträge addieren.",
          "Weil 120° gleich 180° sind.",
        ],
        explanation:
          "Die Nullsumme gilt für drei gleich große reine Sinusströme mit 120° Versatz. Unsymmetrie oder Oberwellen verletzen diese Voraussetzung und benötigen eigene Analyse.",
      },
    ],
    safety:
      "Nur theoretische Lerninhalte und Simulationen. Keine Freigabe für Arbeiten an elektrischen Anlagen; fachliche Qualifikation, Arbeitsanweisung und Gefährdungsbeurteilung werden nicht ersetzt.",
  },
];

// Feste Diagrammsituation statt einer vom gewählten Schiebewert abhängigen Frage.
electrical_lessons.find((l) => l.id === "electric-ac-wave")!.questions[2] = {
  prompt:
    "Normiertes Sinusdiagramm mit φ = 90°: Bei t = T/4 ist u/Û = 1. Welchen Wert hat der nacheilende Strom i/Î?",
  correct: "0",
  wrong: ["1", "−1"],
  explanation:
    "Der Strom lautet sin(ωt−φ). Bei t=T/4 ist ωt=π/2 und φ=π/2, daher ist i/Î=sin(0)=0. Die Spannung erreicht gleichzeitig ihren positiven Scheitel; genau das zeigt die Viertelperiodenverschiebung.",
};
