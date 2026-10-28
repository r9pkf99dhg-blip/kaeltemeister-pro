import type { FoundationLesson } from "../foundations/model";
export const case_lessons: FoundationLesson[] = [
  {
    id: "case-heat",
    domainId: "thermodynamik",
    title: "Lernfall: Wärmeträgerstrom fachlich beurteilen",
    goal: "Volumenstrom umrechnen, Wärmeleistung berechnen und die Proportionalitätsannahme beurteilen.",
    why: "Ein richtiger Zahlenwert reicht für eine technische Entscheidung nicht aus. Dieser selbst erstellte Lernfall verknüpft Dichte, Massenstrom, Wärmekapazität und Systemgrenze. Er ist keine offizielle Meisterprüfungsaufgabe und keine reale Auslegungsfreigabe.",
    basic:
      "Gegeben sind in den jeweiligen Schritten 1,8 m³/h Betriebsvolumenstrom und 1000 kg/m³ Dichte am selben Zustand. Daraus folgen 0,5 kg/s. Für einen Abkühlbetrag 5 K und ein vorgegebenes konstantes cp von 4000 J/(kg·K) ergibt sich 10 kW sensible Wärmeleistung.",
    reasoning:
      "Die Lösung besteht aus Größenklärung, Umrechnung und Modellrechnung: erst Volumenstrom in m³/s, dann mit Dichte multiplizieren, anschließend cp und Temperaturdifferenz einsetzen. Plausibilität: In einer Sekunde strömt ein halbes Kilogramm, je Kilogramm werden 20 kJ übertragen; das ergibt 10 kJ/s.",
    transfer:
      "Entscheidung: Eine Verdopplung des Massenstroms verdoppelt im Modell die Leistung, wenn cp und ΔT gleich bleiben. Ein realer Wärmeübertrager kann ΔT ändern; deshalb ist das keine garantierte Leistungssteigerung. Prüfe zusätzlich Phasenwechsel, Messzustände und Verluste, bevor du das Modell auf eine Anlage überträgst.",
    example:
      "Alternative Kontrolle über 60 s: 30 kg durchströmen die Grenze. \\(Q=30\\cdot4000\\cdot5=600000\\,\\mathrm J\\); geteilt durch 60 s sind wieder 10000 W. Die alternative Betrachtung prüft den Zeitbezug und ersetzt keine Fachabnahme des Anlagenmodells.",
    derivation: [
      "\\(1{,}8/3600=0{,}0005\\,\\mathrm{m^3/s}\\).",
      "\\(1000\\cdot0{,}0005=0{,}5\\,\\mathrm{kg/s}\\).",
      "\\(0{,}5\\cdot4000\\cdot5=10000\\,\\mathrm W\\).",
    ],
    mistakes: [
      "Volumenstrom ohne Dichte in die Wärmeleistungsformel einsetzen.",
      "Eine Modellproportionalität als garantierte reale Leistungsverdopplung ausgeben.",
    ],
    summary:
      "Der Fall ist erst fachlich erklärt, wenn Dichtebezug, Zeitbezug und die Annahme konstanten cp ohne Phasenwechsel benannt sind. Das Ergebnis ist ein positiver Wärmeleistungsbetrag. Für reale Auslegung fehlen zusätzliche Betriebsdaten und Nachweise.",
    prerequisites: ["thermo-states", "thermo-calorimetry"],
    formulaIds: ["thermo-mass-volume", "sensible-heat"],
    sourceIds: ["openstax-thermal-v06"],
    questions: [
      {
        prompt: "Welche Größe wird aus ρV̇ erhalten?",
        correct: "Massenstrom",
        wrong: ["Spezifische Wärmekapazität", "Temperatur"],
        explanation:
          "Dichte in kg/m³ multipliziert mit Volumenstrom in m³/s ergibt kg/s. Nur diese Massengröße passt anschließend in die betrachtete Wärmeleistungsformel.",
      },
      {
        prompt: "Welche Kontrolle bestätigt 10 kW über 60 s?",
        correct: "600 kJ über 60 s",
        wrong: ["10 kJ ohne Zeitbezug", "600 kW über eine Masse"],
        explanation:
          "Leistung mal Zeit ergibt Energie: 10 kJ/s × 60 s = 600 kJ. Die Rückdivision durch die Dauer liefert wieder die gleiche mittlere Leistung.",
      },
      {
        prompt:
          "Ein realer Wärmeübertrager erhält doppelten Massenstrom. Ist doppelte Leistung bewiesen?",
        correct:
          "Nur im Modell bei gleichem cp und ΔT; real müssen die Randbedingungen geprüft werden.",
        wrong: [
          "Ja, unabhängig von allen Randbedingungen.",
          "Nein, die Leistung muss sich immer halbieren.",
        ],
        explanation:
          "Die Formel ist bei festem cp und ΔT linear im Massenstrom. Ob ein realer Wärmeübertrager ΔT beibehält, ist aber eine zusätzliche fachliche Frage; Messzustand und Übertragungsverhalten fehlen.",
      },
    ],
  },
  {
    id: "case-ac",
    domainId: "elektro",
    title: "Lernfall: Elektrischen Verbraucher bewerten",
    goal: "Schein-, Wirk- und Blindleistung berechnen und Aussagen über Energie und Wirkungsgrad begrenzen.",
    why: "Der selbst erstellte Übungsfall behandelt einen idealisierten sinusförmigen Einphasenverbraucher. Er verbindet elektrische Größen mit geometrischem Leistungsdreieck und einer fachlichen Entscheidung. Er ist weder offizielle Meisterprüfung noch Arbeitsfreigabe an elektrischen Anlagen.",
    basic:
      "Gegeben: 100 V und 2 A effektiv, induktiver Verschiebungsfaktor cos φ = 0,6. Die Scheinleistung ist 200 VA, die Wirkleistung 120 W und die Blindleistung 160 var. Die mechanische Ausgangsleistung ist ausdrücklich unbekannt; reale Herstellerdaten werden nicht behauptet.",
    reasoning:
      "Berechne erst S = UI, dann P = S cos φ. Aus \\(\\sin\\varphi=\\sqrt{1-0{,}6^2}=0{,}8\\) folgt Q = 160 var im positiven induktiven Fall. Die unabhängige Dreieckskontrolle prüft 120² + 160² = 200². Die mittlere Wirkleistung erzeugt bei konstantem Betrieb über 2 h eine Energie von 240 Wh.",
    transfer:
      "Entscheidung: Aus cos φ allein lässt sich kein Wirkungsgrad des Motors bestimmen. Dafür wäre die mechanische Ausgangsleistung nötig. Bei verzerrten Strömen ist außerdem λ = cos φ nicht allgemein gültig. Eine reale elektrische Auslegung benötigt Qualifikation, Schutzkonzept und passende Daten außerhalb dieses theoretischen Lernfalls.",
    example:
      "Zweiter Blick: \\(P/S=120/200=0{,}6\\); im vorgegebenen Sinusmodell stimmt dies mit cos φ überein. \\(Q/S=160/200=0{,}8\\). Der unbekannte mechanische Nutzen kann aus beiden Verhältnissen nicht rekonstruiert werden. Aussagen über Motorverluste bleiben damit offen.",
    derivation: [
      "\\(S=100\\cdot2=200\\,\\mathrm{VA}\\).",
      "\\(P=200\\cdot0{,}6=120\\,\\mathrm W,\\ Q=200\\cdot0{,}8=160\\,\\mathrm{var}\\).",
      "\\(E=120\\,\\mathrm W\\cdot2\\,\\mathrm h=240\\,\\mathrm{Wh}\\).",
    ],
    mistakes: [
      "S als Wirkleistung ausgeben, weil beide aus elektrischen Angaben stammen.",
      "Den Wirkungsgrad mit cos φ gleichsetzen oder Sinusbeziehungen auf beliebige Oberwellenströme übertragen.",
    ],
    summary:
      "Der Fall trennt Leistungsarten, Energie und Wirkungsgrad. Das Leistungsdreieck ist unter den angegebenen Sinusbedingungen konsistent. Eine fachliche Schlussfolgerung muss benennen, welche Aussagen wegen fehlender mechanischer Daten und unbekannter realer Signalformen offen bleiben.",
    prerequisites: ["electric-ac-power"],
    formulaIds: ["ac-apparent", "ac-real", "ac-reactive"],
    sourceIds: ["openstax-ac-v06"],
    questions: [
      {
        prompt: "Welche Größe beträgt 200 VA?",
        correct: "Scheinleistung",
        wrong: ["Wirkleistung", "Mechanische Ausgangsleistung"],
        explanation:
          "Das Produkt der vorgegebenen Effektivwerte U und I ist die Scheinleistung. Die Wirkleistung berücksichtigt im Sinusmodell zusätzlich cos φ und beträgt 120 W.",
      },
      {
        prompt:
          "Wie viel elektrische Wirkarbeit entsprechen konstanten 120 W über 2 h?",
        correct: "240 Wh",
        wrong: ["60 Wh", "240 W"],
        explanation:
          "Energie ist Leistung mal Zeit. Watt mal Stunde ergibt Wattstunde, hier 120 × 2 = 240 Wh. Eine Leistung in W ist keine Energie.",
      },
      {
        prompt: "Welche fachliche Schlussfolgerung ist mit den Daten belegt?",
        correct:
          "Die elektrische Wirkleistung ist bestimmbar, der Motorwirkungsgrad ohne mechanische Leistung nicht.",
        wrong: [
          "Der Motorwirkungsgrad ist sicher 60 %.",
          "Die mechanische Ausgangsleistung ist immer 200 W.",
        ],
        explanation:
          "Die mechanische Ausgangsleistung ist nicht angegeben. Das Verhältnis P/S beschreibt im Sinusmodell den Leistungsfaktor, nicht die Umwandlung elektrischer Wirkleistung in mechanischen Nutzen.",
      },
    ],
    safety:
      "Theorie ohne Arbeits- oder Anschlussanleitung; keine Freigabe für praktische elektrische Tätigkeiten.",
  },
  {
    id: "case-pipe",
    domainId: "mathematik",
    title: "Lernfall: Rohrgeometrie und Modellgrenzen",
    goal: "Querschnitt, geometrischen Inhalt und äußere Mantelfläche unterscheiden und die Aussagekraft beurteilen.",
    why: "Dieser eigene Übungsfall verknüpft Maßumrechnung, Kreis- und Zylindergeometrie mit einer technischen Entscheidung. Eine mathematisch korrekte Rohrgeometrie ist noch keine reale Rohrleitungsdimensionierung, keine Füllmengenfreigabe und keine Dämmstoffauslegung.",
    basic:
      "Ein ideal gerades Rohr besitzt innen 20 mm, außen 24 mm und eine Länge von 10 m. Berechne nacheinander die innere freie Querschnittsfläche, das Innenvolumen und den äußeren Mantel. Alle Maße sind fiktive definierte Geometriemaße und keine nominalen Produktbezeichnungen.",
    reasoning:
      "Nach Umrechnung in Meter: \\(A_i=\\pi d_i^2/4\\approx0{,}000314159\\,\\mathrm{m^2}\\), \\(V_i=A_iL\\approx0{,}00314159\\,\\mathrm{m^3}\\) und \\(A_{M,a}=\\pi d_aL\\approx0{,}753982\\,\\mathrm{m^2}\\). Die innere Fläche und der äußere Mantel beziehen sich auf verschiedene Systemgrenzen.",
    transfer:
      "Entscheidung: Das Volumen allein erlaubt keine Auswahl für ein reales Kältemittelsystem. Öltransport, Druckverlust, Betriebspunkte, Werkstoffanforderungen und Anschlüsse fehlen. Eine alternative Materialbetrachtung nutzt die Ringfläche: Außenzylinder minus Innenzylinder. Auch eine korrekt berechnete Materialmenge ersetzt keine Festigkeitsprüfung.",
    example:
      "Kontrolle in Millimetern: A_i = 314,159 mm² und L = 10000 mm liefern 3141590 mm³. Da 1 L = 1000000 mm³, sind das 3,14159 L. Die unabhängige Einheitendarstellung bestätigt den Faktor zwischen Länge, Fläche und Volumen.",
    derivation: [
      "\\(d_i=0{,}020\\,\\mathrm m,\\ d_a=0{,}024\\,\\mathrm m\\).",
      "\\(V_i=\\frac\\pi4d_i^2L\\); äußerer Mantel dagegen \\(A_{M,a}=\\pi d_aL\\).",
      "Plausibilität: Verdopplung von d_i vervierfacht den Innenquerschnitt und das Volumen bei gleicher Länge.",
    ],
    mistakes: [
      "Den äußeren Durchmesser für das Innenvolumen einsetzen.",
      "Einen geometrischen Vergleich als validierte hydraulische oder kältetechnische Auslegung ausgeben.",
    ],
    summary:
      "Eine saubere geometrische Lösung benennt Durchmesserbezug und Einheit bei jedem Schritt. Inhalt, Material und Mantelfläche sind verschiedene Ergebnisse. Die fachliche Bewertung erkennt fehlende Strömungs-, Betriebs- und Sicherheitsdaten anstatt aus dem richtigen Volumen eine Anlagenfreigabe abzuleiten.",
    prerequisites: ["math-pipe-volume"],
    formulaIds: ["geo-circle", "geo-volume", "geo-surface"],
    sourceIds: ["openstax-precalculus-v06"],
    questions: [
      {
        prompt: "Welche Größe nutzt der geometrische Inneninhalt?",
        correct: "Innenquerschnitt und Länge",
        wrong: ["Außenmantel und Wanddicke ohne Innenmaß", "Nur die Länge"],
        explanation:
          "Das Innenvolumen entsteht durch den freien inneren Querschnitt entlang der Länge. Der Außenmantel ist eine Fläche und beantwortet eine andere Frage.",
      },
      {
        prompt:
          "Was geschieht bei doppeltem Innendurchmesser und gleicher Länge?",
        correct: "Vierfaches geometrisches Innenvolumen",
        wrong: ["Doppeltes Innenvolumen", "Halbes Innenvolumen"],
        explanation:
          "Der Durchmesser geht quadratisch in die Kreisfläche ein. Ein Faktor zwei am Durchmesser liefert daher den Faktor vier beim Volumen, solange die Länge gleich bleibt.",
      },
      {
        prompt: "Welche Aussage ist fachlich begründet?",
        correct:
          "Die Geometrie ist berechenbar, die reale Rohrwahl braucht zusätzliche Betriebs- und Strömungsdaten.",
        wrong: [
          "3,14 Liter beweisen eine zulässige Rohrdimension.",
          "Der Außenmantel bestimmt ohne weitere Daten die Kältemittelfüllung.",
        ],
        explanation:
          "Geometrische Größen beschreiben den Raum. Druckverlust, Öltransport, reale Stoffzustände und Materialanforderungen sind eigenständige Prüfungen und werden von diesen Zahlen nicht nachgewiesen.",
      },
    ],
  },
  {
    id: "case-conduction",
    domainId: "thermodynamik",
    title: "Lernfall: Zwei thermische Modelle vergleichen",
    goal: "Wärmeströme vergleichen und zwischen Modellverbesserung und realem Dämmnachweis unterscheiden.",
    why: "Dieser selbst erstellte Übungsfall untersucht eine ebene Schicht und eine zweite gleiche Schicht in Serie. Der fachliche Teil besteht darin, konstante Randbedingungen zu benennen und die Grenzen einer realen Schlussfolgerung zu erkennen. Es ist keine offizielle Prüfung oder Bauteilfreigabe.",
    basic:
      "Beide Modelle haben A = 2 m² und ΔT = 20 K. Modell A enthält 0,1 m eines fiktiven Materials mit λ = 0,04 W/(m·K). Modell B enthält zwei solche Schichten mit idealem Kontakt. Wärmeübergänge und andere Energiepfade werden zunächst vollständig ausgeschlossen.",
    reasoning:
      "Modell A: \\(R_A=0{,}1/(0{,}04\\cdot2)=1{,}25\\,\\mathrm{K/W}\\), also Q̇A = 16 W. Modell B: \\(R_B=2R_A=2{,}5\\,\\mathrm{K/W}\\), also Q̇B = 8 W. Als Verhältnis ergibt sich Q̇B/Q̇A = 0,5. Eine unabhängige Betrachtung verwendet direkt die doppelte Gesamtdicke in derselben Leitungsformel.",
    transfer:
      "Entscheidung: Im stationären ebenen Modell halbiert sich der Wärmestrom. Für eine reale Verbesserung sind Wärmebrücken, Feuchte, Kontakt- und Übergangswiderstände, temperaturabhängige λ-Werte sowie Geometrie und Zeitverhalten zu prüfen. Bei einem Rohr ist die Fläche radial nicht konstant; das ebene Modell kann deshalb nicht unverändert als Rohrdämmnachweis dienen.",
    example:
      "Alternativ mit flächenbezogenen Widerständen: Modell A hat 2,5 m²·K/W, Modell B 5 m²·K/W. Einsetzen von AΔT = 40 m²·K ergibt 40/2,5 = 16 W und 40/5 = 8 W. Beide Lösungswege verwenden dieselbe stationäre Systemgrenze.",
    derivation: [
      "\\(R_B=R_1+R_2=1{,}25+1{,}25=2{,}5\\,\\mathrm{K/W}\\).",
      "\\(\\dot Q_A=20/1{,}25=16\\,\\mathrm W,\\ \\dot Q_B=20/2{,}5=8\\,\\mathrm W\\).",
      "\\(\\dot Q_B/\\dot Q_A=0{,}5\\); das Verhältnis belegt nur den angegebenen Modellvergleich.",
    ],
    mistakes: [
      "Schichtenwiderstände ohne gemeinsame Fläche addieren.",
      "Eine Halbierung im idealen Modell als gemessene Einsparung einer realen Anlage ausgeben.",
    ],
    summary:
      "Zwei konsistente Rechenwege bestätigen den idealen Schichtvergleich. Die fachliche Leistung ist die begründete Trennung von Modellannahmen und realen Einflussgrößen. Eine reale Energieeinsparung oder Dämmfreigabe ist damit noch nicht nachgewiesen.",
    prerequisites: ["thermo-transfer"],
    formulaIds: ["thermo-conduction", "thermo-layers"],
    sourceIds: ["openstax-thermal-v06"],
    questions: [
      {
        prompt:
          "Welche Größe addiert sich bei seriellen Schichten mit gleicher Fläche?",
        correct: "Wärmewiderstände",
        wrong: [
          "Wärmeleitfähigkeiten ohne Gewichtung",
          "Temperaturen in °C als Absolutwerte",
        ],
        explanation:
          "Bei stationärem gleichem Wärmestrom addieren sich die Temperaturabfälle. Daraus folgt die Summe der Wärmewiderstände, nicht die einfache Summe der Leitfähigkeiten.",
      },
      {
        prompt: "Modell A 16 W, Modell B 8 W: welches Verhältnis gilt?",
        correct: "Q̇B/Q̇A = 0,5",
        wrong: ["Q̇B/Q̇A = 2", "Q̇B/Q̇A = 8"],
        explanation:
          "Das Verhältnis vergleicht beide Wärmeströme bei derselben Fläche und Temperaturdifferenz. 8/16 = 0,5 bedeutet eine Halbierung innerhalb dieses Modells.",
      },
      {
        prompt:
          "Darf aus dem Modellvergleich eine reale halbierte Anlagenenergie garantiert werden?",
        correct:
          "Nein, reale Wärmewege, Feuchte und Betriebsbedingungen sind zusätzlich zu prüfen.",
        wrong: [
          "Ja, unabhängig von allen Randbedingungen.",
          "Ja, ein grüner Test ist ein Messnachweis.",
        ],
        explanation:
          "Die Rechnung kontrolliert ein stationäres eindimensionales Modell. Eine reale Anlage enthält weitere Wärmewege und zeitliche Betriebszustände; Tests sind weder Messungen noch fachliche Auslegungsfreigabe.",
      },
    ],
  },
];
