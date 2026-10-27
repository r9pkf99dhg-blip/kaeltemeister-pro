import type { Module } from "../model";

export const modules: Module[] = [
  {
    id: "cycle-basics",
    revision: 1,
    domainId: "kaelte",
    title: "Grundlagen des Kältekreislaufs",
    description:
      "Vier Bauteile, zwei Druckniveaus und eine nachvollziehbare Energiebilanz.",
    objectiveIds: ["cycle-order", "cycle-balance-objective"],
    formulaIds: ["cycle-balance", "sensible-heat"],
    sourceIds: ["openstax-heat-pumps", "didactic-cycle"],
    termIds: ["enthalpie", "drosselung"],
    questionIds: ["cycle-q1", "cycle-q2", "cycle-q3", "cycle-q4"],
    cardIds: ["cycle-card1", "cycle-card2"],
    review: "awaiting-expert-review",
    related: [
      {
        kind: "calculator",
        id: "sensible-heat-calculator",
        label: "Rechner: sensible Wärmeleistung",
        available: true,
      },
      {
        kind: "case",
        id: "didactic-cycle-case",
        label: "Kältekreis-Praxisfall (geplant)",
        available: false,
      },
    ],
    levels: {
      grundlagen: {
        introduction:
          "Ein Kühlschrank macht Wärme nicht unsichtbar: Er transportiert sie aus seinem Innenraum an die Raumluft. Dafür braucht er elektrische Energie. Der Kältekreislauf ist der Weg, auf dem das Kältemittel diese Aufgabe immer wieder erfüllt.",
        explanation:
          "Im Verdampfer nimmt das Kältemittel Wärme auf und wird gasförmig. Der Verdichter saugt diesen Dampf an und erhöht Druck und Temperatur. Im Verflüssiger gibt das heiße Kältemittel Wärme ab und wird flüssig. Das Expansionsorgan senkt anschließend den Druck. Dabei entsteht ein kaltes Flüssigkeits-Dampf-Gemisch, das wieder in den Verdampfer strömt. „Verdampfen“ bedeutet also flüssig zu gasförmig, „Verflüssigen“ den umgekehrten Übergang.",
        connections:
          "Die Verdampferseite arbeitet auf niedrigem, die Verflüssigerseite auf höherem Druckniveau. Eine Temperaturdifferenz treibt den Wärmestrom: Das Kältemittel muss im Verdampfer kälter als das zu kühlende Medium sein. Im Verflüssiger muss es wärmer als das aufnehmende Medium sein. Druck ist deshalb mehr als ein Messwert: Er beeinflusst die Sättigungstemperatur.",
        example:
          "Ein idealisiertes Beispiel nimmt im Verdampfer 7,5 kW Wärme auf. Dem Kältemittel werden im Verdichter 2 kW zugeführt. Wenn wir andere Verluste vernachlässigen, muss der Verflüssiger 7,5 + 2 = 9,5 kW abgeben. kW bezeichnet eine Leistung, also Energie pro Zeit. Die Zahlen sind ein frei gewähltes Lernbeispiel, keine Auslegungswerte.",
        mistakes: [
          "Den Verdichter als Erzeuger von Kälte ansehen: Er führt Arbeit zu und hält den Kreislauf in Bewegung.",
          "Die Wärmeabgabe mit der Kälteleistung gleichsetzen und die zugeführte Verdichterleistung vergessen.",
        ],
        summary:
          "Wärme aufnehmen → verdichten → Wärme abgeben → entspannen. Die aufgenommene Wärme und die zugeführte Arbeit müssen im stationären Beispiel wieder abgegeben werden.",
        deepening:
          "Zeichne die vier Bauteile und kennzeichne Hoch- und Niederdruckseite. Erkläre einem Mitschüler, warum der Kühlschrank einen geschlossenen Raum auf Dauer nicht abkühlt, wenn seine Tür offen bleibt.",
      },
      fachkraft: {
        introduction:
          "Für eine technische Beschreibung reichen die Bauteilnamen nicht aus. Wir verbinden die Zustände mit Druck, Temperatur, Enthalpie und Massenstrom. Stationär bedeutet, dass sich die gespeicherte Energie im betrachteten Zeitraum nicht ändert.",
        explanation:
          "Wir nummerieren: 1 vor Verdichter, 2 nach Verdichter, 3 vor Drossel, 4 nach Drossel. h bezeichnet die spezifische Enthalpie in kJ/kg. Bei näherungsweise adiabater Verdichtung ist die Fluidleistung ṁ × (h₂ − h₁). Am Verdampfer wird ṁ × (h₁ − h₄) aufgenommen, am Verflüssiger ṁ × (h₂ − h₃) abgegeben. Für die ideale Drossel gilt h₃ ≈ h₄. Damit schließt sich die Energiebilanz.",
        connections:
          "Überhitzung am Verdampferaustritt und Unterkühlung am Verflüssigeraustritt sind Temperaturabstände zu den jeweiligen Sättigungszuständen. Sie helfen bei der Zustandsbeschreibung, ersetzen aber nicht den Massenstrom und die Enthalpien einer Leistungsberechnung. Die Formel ṁ × cp × ΔT beschreibt sensible Wärme ohne Phasenwechsel und darf nicht einfach für den gesamten Verdampfer verwendet werden.",
        example:
          "Didaktisches Modell: ṁ = 0,05 kg/s; h₁ = 400, h₂ = 440, h₃ = h₄ = 250 kJ/kg. Verdampfer: 0,05 × (400 − 250) = 7,5 kW. Verdichter: 0,05 × 40 = 2 kW. Verflüssiger: 0,05 × 190 = 9,5 kW. Kontrolle: 7,5 + 2 = 9,5. Es handelt sich nicht um Stoffdaten eines bestimmten Kältemittels.",
        mistakes: [
          "Enthalpie in kJ/kg mit Leistung in kW verwechseln: Erst die Multiplikation mit kg/s liefert kJ/s.",
          "Elektrische Leistung ohne Prüfung der Verluste als identisch mit der Fluidleistung ansehen.",
        ],
        summary:
          "Eine konsistente Zustandsnummerierung und eine klar definierte Systemgrenze machen die Bauteilbilanzen prüfbar. Kontrolliere immer Einheiten und das Schließen der Gesamtbilanz.",
        deepening:
          "Ordne die Zustände qualitativ in einem log(p)-h-Diagramm an. Welche Messungen und Stoffdaten wären nötig, um aus dem didaktischen Modell eine reale Auswertung zu machen?",
      },
      meister: {
        introduction:
          "Auf Meisterniveau ist die Systemgrenze Teil der Lösung. Eine formal richtige Formel kann zur falschen Aussage führen, wenn elektrische, mechanische und dem Kältemittel tatsächlich zugeführte Leistungen gleichgesetzt werden.",
        explanation:
          "Für einen stationären Kreis gilt allgemein die Energieerhaltung. Unser vereinfachtes Modell betrachtet den Verdichter näherungsweise adiabatisch und vernachlässigt sonstige Wärmeübertragung außerhalb der beiden Wärmeübertrager. In einer realen Anlage können Verdichtergehäuse und Leitungen Wärme austauschen. Für eine elektrische Anlagenbilanz müssen diese Flüsse und Hilfsenergien passend zur gewählten Grenze einbezogen werden. Die Drosselung wird isenthalp modelliert; das ist keine Gleichheit der Temperaturen.",
        connections:
          "Eine Veränderung des Verdampfungs- oder Verflüssigungsdrucks kann sowohl Enthalpiedifferenzen als auch den vom Verdichter geförderten Massenstrom verändern. Eine Leistungsänderung lässt sich deshalb nicht allein aus einem Rohrtemperaturwert ableiten. Auch ein COP benötigt eine genaue Definition: Kältenutzen geteilt durch welche Eingangsleistung, bei welchen Betriebsbedingungen?",
        example:
          "Im Modell beträgt Q̇₀/ṖFluid = 7,5/2 = 3,75. Das ist ein Verhältnis bezogen auf die angenommene Fluidleistung, kein belegter elektrischer Geräte-COP. Wenn in einem gesonderten Messbeispiel 2,5 kW elektrische Gesamtleistung bei 7,5 kW Nutzkälte gemessen würden, wäre dieser elektrische Quotient 3. Die unterschiedlichen Systemgrenzen müssen in jeder Auswertung genannt werden.",
        mistakes: [
          "Modellwerte als garantierte Geräteleistung veröffentlichen.",
          "Messwerte verschiedener Lastzustände zu einer scheinbar geschlossenen Bilanz kombinieren.",
        ],
        summary:
          "Bewerte nicht nur das Rechenergebnis, sondern auch die Grenzen des Modells, die Herkunft der Zustandsdaten und die zeitliche Zusammengehörigkeit der Messungen.",
        deepening:
          "Formuliere einen Messplan mit Systemgrenze, Stabilitätskriterium und Unsicherheiten. Welche zusätzliche Wärmeübertragung würde erklären, dass eine reale Bilanz mit bloßer elektrischer Leistung nicht schließt?",
      },
    },
  },
  {
    id: "evaporation",
    revision: 1,
    domainId: "kaelte",
    title: "Verdampfung und Verdampfer",
    description:
      "Wärmeaufnahme, Phasenwechsel und die Grenzen der sensiblen Wärmeformel.",
    objectiveIds: ["evap-state", "evap-power-objective"],
    formulaIds: ["evaporator-power", "sensible-heat"],
    sourceIds: ["openstax-heat-pumps", "didactic-cycle"],
    termIds: ["verdampfung", "ueberhitzung", "enthalpie"],
    questionIds: ["evap-q1", "evap-q2", "evap-q3", "evap-q4"],
    cardIds: ["evap-card1", "evap-card2"],
    review: "awaiting-expert-review",
    related: [
      {
        kind: "measurement",
        id: "evaporator-measurement",
        label: "Verdampfer-Messprotokoll (geplant)",
        available: false,
      },
    ],
    levels: {
      grundlagen: {
        introduction:
          "Wenn Flüssigkeit verdampft, nimmt sie Energie auf. Genau das nutzt der Verdampfer: Das Kältemittel entzieht der Luft oder einer Flüssigkeit Wärme. Das Medium wird kälter, obwohl das Kältemittel dabei teilweise seine Phase statt nur seine Temperatur ändert.",
        explanation:
          "Nach dem Expansionsorgan strömt normalerweise ein Gemisch aus Flüssigkeit und Dampf ein. Im Wärmeübertrager verdampft der verbleibende Flüssigkeitsanteil. Am Austritt ist das Kältemittel im üblichen trockenen Verdampferbetrieb gasförmig und etwas überhitzt. Die Bauform kann ein berippter Luftkühler oder ein Wärmeübertrager für eine Flüssigkeit sein. Andere Anlagenkonzepte, etwa überflutete Verdampfer, haben abweichende Zustands- und Regelungsanforderungen.",
        connections:
          "Für den Wärmetransport braucht es einen Temperaturunterschied. Vereisung, verschmutzte Oberflächen oder zu geringer Luftdurchsatz können die Wärmeübertragung beeinflussen. Eine kalte Rohrleitung allein beweist weder ausreichende Kälteleistung noch korrekte Kältemittelversorgung.",
        example:
          "In unserem Lernmodell tritt das Kältemittel mit h₄ = 250 kJ/kg ein und mit h₁ = 400 kJ/kg aus. Jedes Kilogramm nimmt also 150 kJ auf. Bei 0,05 kg pro Sekunde sind das 0,05 × 150 = 7,5 kJ/s = 7,5 kW. Die Enthalpien sind didaktisch gewählt, nicht an einer realen Anlage gemessen.",
        mistakes: [
          "Verdampfung mit Überhitzung gleichsetzen: Erst nach vollständigem Verdampfen kann der reine Dampf weiter überhitzt werden.",
          "Eine verschmutzte Oberfläche durch ungezielte Änderungen am Kältemittelkreis ausgleichen wollen.",
        ],
        summary:
          "Im Verdampfer wird Wärme aufgenommen. Der Phasenwechsel braucht Energie; die nachfolgende Überhitzung beschreibt den gasförmigen Austrittszustand.",
        deepening:
          "Beschreibe den Weg eines Flüssigkeitstropfens durch einen trockenen Verdampfer. Welche Beobachtungen betreffen die Luftseite, welche die Kältemittelseite?",
      },
      fachkraft: {
        introduction:
          "Die stationäre Verdampferbilanz verbindet Massenstrom und Enthalpiedifferenz. Die für die Temperaturänderung eines Wasserstroms passende cp-Formel beschreibt dagegen nur eine andere, sensible Seite des Wärmeübertragers.",
        explanation:
          "Mit unseren Zustandsnummern gilt Q̇₀ = ṁ × (h₁ − h₄). Der Enthalpieanstieg kann Verdampfung und anschließende Überhitzung enthalten. Bei reinen Stoffen ist die Sättigungstemperatur bei konstantem Druck konstant; bei Gemischen kann ein Temperaturgleit auftreten. Druckverluste können den lokalen Sättigungszustand zusätzlich verändern. Deshalb darf die Kältemitteltemperatur entlang eines realen Verdampfers nicht pauschal als konstant angenommen werden.",
        connections:
          "Auf einer Wasserseite ohne Phasenwechsel kann näherungsweise Q̇ = ṁWasser × cp × |ΔT| verwendet werden. Zwischen beiden Seiten muss die Bilanz unter Berücksichtigung der Messgrenzen zusammenpassen. Kältemittel-Massenstrom und Wasser-Massenstrom sind dabei verschiedene Größen.",
        example:
          "Das Kältemittelmodell liefert 7,5 kW. Ein rein didaktischer Wasserstrom mit 0,5 kg/s und angenommenem cp = 4,18 kJ/(kg·K) müsste sich dafür um 7,5/(0,5 × 4,18) ≈ 3,59 K abkühlen. Der cp-Wert ist ein Näherungswert für Wasser bei etwa 20 °C, keine allgemeine Stoffkonstante für alle Medien oder Temperaturen.",
        mistakes: [
          "cp × ΔT für die gesamte Kältemittelverdampfung benutzen und damit die latente Wärme auslassen.",
          "Wasser- und Kältemittelmassenstrom in derselben Bilanz vertauschen.",
        ],
        summary:
          "Benutze auf der Phasenwechselseite Enthalpiedifferenzen und auf einer geeigneten sensiblen Seite den passenden cp-Ansatz. Nenne Medium, Einheiten und Annahmen.",
        deepening:
          "Skizziere Messstellen für eine wasserseitige Leistungsprüfung. Warum müssen Temperaturfühler, Durchflussmessung und stationärer Betrieb zusammen betrachtet werden?",
      },
      meister: {
        introduction:
          "Ein Verdampfer ist ein gekoppeltes System aus Kältemittelversorgung, Wärmeübertragung, Luft- oder Flüssigkeitsstrom und Regelung. Ein einzelner Wert wie hohe Überhitzung liefert deshalb noch keine eindeutige Fehlerursache.",
        explanation:
          "Eine Leistungsänderung kann vom veränderten Kältemittelmassenstrom, von einer anderen Enthalpiedifferenz oder von der Sekundärseite ausgehen. Die Überhitzung kann durch zu geringe Zufuhr steigen, aber auch durch zusätzliche Erwärmung nach dem Verdampfer. Der Messort trennt Verdampferüberhitzung von Gesamtüberhitzung am Verdichtereintritt. Eine belastbare Diagnose betrachtet Druckverluste, Last, Fühlerkontakt und den zeitlichen Verlauf.",
        connections:
          "Bei Luftkühlern kann Entfeuchtung zusätzlich latente Last erzeugen. Die einfache Luftformel ṁ × cp × ΔT erfasst diese nicht vollständig. Vereisung verändert Druckverlust und Wärmeübergang. Abtauzustand und Betriebsphase müssen bei einem Messvergleich deshalb dokumentiert werden.",
        example:
          "Im Ausgangsmodell liefern 0,05 kg/s bei 150 kJ/kg 7,5 kW. Bei gleicher angenommener Enthalpiedifferenz und nur 0,04 kg/s wären es 6 kW. Wenn zugleich die Enthalpiedifferenz auf 160 kJ/kg steigt, ergeben sich 6,4 kW. Diese Modellvariation zeigt, warum ein einzelner Temperaturabstand die Leistung nicht festlegt.",
        mistakes: [
          "Hohe Überhitzung automatisch als Beweis für Kältemittelmangel behandeln.",
          "Luftkühler bei unterschiedlichen Feuchte- oder Vereisungszuständen nur über ΔT vergleichen.",
        ],
        summary:
          "Diagnose heißt, konkurrierende Erklärungen mit passenden Messungen zu trennen. Berechnungsmodelle bleiben an definierte Zustände und Grenzen gebunden.",
        deepening:
          "Entwickle einen Prüfablauf, der zuerst Luft-/Wasserseite und Messqualität kontrolliert. Welche zusätzlichen Messungen unterscheiden geringe Last von unzureichender Kältemittelzufuhr?",
      },
    },
  },
  {
    id: "compression",
    revision: 1,
    domainId: "kaelte",
    title: "Verdichtung und Verdichter",
    description:
      "Warum Druck und Temperatur steigen und welche Leistung tatsächlich berechnet wird.",
    objectiveIds: ["compressor-state", "compressor-power-objective"],
    formulaIds: ["compressor-power", "cycle-balance"],
    sourceIds: ["openstax-heat-pumps", "didactic-cycle"],
    termIds: ["verdichtung", "enthalpie"],
    questionIds: ["comp-q1", "comp-q2", "comp-q3", "comp-q4"],
    cardIds: ["comp-card1", "comp-card2"],
    review: "awaiting-expert-review",
    related: [
      {
        kind: "diagnosis",
        id: "compressor-diagnosis",
        label: "Verdichter-Diagnose (geplant)",
        available: false,
      },
    ],
    levels: {
      grundlagen: {
        introduction:
          "Der Verdichter ist der Antrieb des Kältekreislaufs. Er saugt Kältemitteldampf an und fördert ihn auf ein höheres Druckniveau. Dafür wird Energie benötigt; gleichzeitig steigt in der üblichen Verdichtung die Temperatur.",
        explanation:
          "Der höhere Druck ermöglicht eine höhere Sättigungstemperatur auf der Wärmeabgabeseite. Der Verflüssiger kann dadurch Wärme an ein wärmeres Umgebungsmedium abgeben. Der Verdichter ist für Dampf vorgesehen. Flüssigkeit lässt sich kaum zusammendrücken und kann mechanische Schäden verursachen. Eine passende Überhitzung unterstützt die Beurteilung des Saugzustands, garantiert allein aber nicht unter allen Betriebsbedingungen einen sicheren Betrieb.",
        connections:
          "Zwischen Verdampfer und Verdichter können Saugleitungen Wärme aufnehmen und Druck verlieren. Ein Messwert am Verdichter ist deshalb nicht automatisch der gleiche wie am Verdampferaustritt. Auch Ölversorgung, Betriebsgrenzen und Herstellervorgaben gehören zur technischen Beurteilung.",
        example:
          "Unser Modell nimmt vor dem Verdichter h₁ = 400 kJ/kg und danach h₂ = 440 kJ/kg an. Pro Kilogramm kommen 40 kJ hinzu. Bei 0,05 kg/s folgt 0,05 × 40 = 2 kW an das Fluid übertragene Leistung. Diese Modellzahl ist nicht die Angabe auf einem realen Typenschild.",
        mistakes: [
          "Flüssiges Kältemittel als normalen Ansaugzustand eines üblichen Verdichters ansehen.",
          "Ein heißes Druckrohr ohne weitere Messungen automatisch als Defekt einstufen.",
        ],
        summary:
          "Verdichten bedeutet Arbeit zuführen und Druck erhöhen. Der Zustand des angesaugten Dampfes und die Herstellergrenzen sind wesentlich.",
        deepening:
          "Erkläre, warum das Druckrohr im Betrieb warm sein kann. Welche Angaben würdest du vor einer Beurteilung des Verdichters zusätzlich sammeln?",
      },
      fachkraft: {
        introduction:
          "Die technische Bilanz unterscheidet Fluidleistung, Wellenleistung und elektrische Leistungsaufnahme. In einem idealisierten adiabaten Durchflussmodell lässt sich die Fluidleistung aus der Enthalpiezunahme bestimmen.",
        explanation:
          "ṖFluid = ṁ × (h₂ − h₁) setzt voraus, dass der Verdichter näherungsweise keine Wärme mit der Umgebung austauscht und Änderungen von Geschwindigkeit und Höhe vernachlässigbar sind. Reale Motor- und mechanische Verluste sowie Wärmeübertragung müssen zur jeweiligen Systemgrenze passen. „Adiabatisch“ bedeutet ohne Wärmeaustausch, nicht ohne Temperaturänderung. Druckverhältnis und Ansaugzustand beeinflussen den realen Betrieb.",
        connections:
          "Bei einer isentropen Referenzverdichtung würde die spezifische Entropie konstant bleiben; reale Verdichtung ist irreversibel. Ein Vergleich benötigt Stoffdaten und identische Ausgangsbedingungen. In dieser Version werden weder reale Verdichterkennfelder noch garantierte Wirkungsgrade berechnet.",
        example:
          "Mit ṁ = 0,05 kg/s und Δh = 40 kJ/kg erhalten wir 2 kW Fluidleistung. Werden in einem getrennten Messbeispiel 2,5 kW elektrische Leistung aufgenommen, beträgt der Quotient 2/2,5 = 0,8. Er ist ohne genauere Bilanzierung kein isentroper Wirkungsgrad; dafür wäre zusätzlich die isentrope Referenz-Enthalpiedifferenz nötig.",
        mistakes: [
          "Den Quotienten von Fluid- zu elektrischer Leistung als isentropen Wirkungsgrad beschriften.",
          "Druckverhältnis aus Überdrücken statt aus absoluten Drücken bilden.",
        ],
        summary:
          "Benutze eindeutige Leistungsbegriffe. Einheitenkontrolle und Systemgrenze kommen vor dem Vergleich mit Messwerten oder Kennfeldern.",
        deepening:
          "Welche Stoffdaten brauchst du für eine isentrope Vergleichsrechnung? Erkläre außerdem, warum das Verhältnis zweier Manometeranzeigen nicht das thermodynamische Druckverhältnis ist.",
      },
      meister: {
        introduction:
          "Für Diagnose und Auslegung ist der Verdichter keine isolierte Leistungszahl. Fördermenge, Druckverhältnis, Saugzustand, Kühlung und Betriebsgrenzen wirken gemeinsam. Das Kennfeld des konkreten Herstellers bleibt maßgeblich.",
        explanation:
          "Eine Erhöhung des Verflüssigungsdrucks kann den erforderlichen spezifischen Arbeitsaufwand verändern. Gleichzeitig kann sich der Massenstrom ändern. Elektrischer Strom allein bestimmt ohne Spannung, Leistungsfaktor, Phasenzahl und Messverfahren keine belastbare Wirkleistung. Ein thermodynamischer Vergleich sollte stationäre Zustände und passende elektrische Messwerte zusammenführen. Arbeiten an elektrischen Anlagen erfordern die entsprechende Qualifikation.",
        connections:
          "Hohe Druckgastemperatur kann mehrere Ursachen haben: veränderte Druckverhältnisse, hohe Sauggasüberhitzung oder Abweichungen der Kühlung. Vor einer eindeutigen Diagnose müssen Messort, Kältemittel, Lastzustand und Herstellergrenzen geprüft werden. Reale Verdichtergrenzen werden hier bewusst nicht durch pauschale Zahlen ersetzt.",
        example:
          "Bei angenommener Δh = 40 kJ/kg und 0,05 kg/s sind es 2 kW. Ein anderer Modellpunkt mit Δh = 50 kJ/kg und 0,04 kg/s liefert ebenfalls 2 kW. Gleiche Fluidleistung bedeutet also weder gleichen Massenstrom noch gleichen Betriebspunkt. Aus einer einzigen Leistungszahl lässt sich keine vollständige Zustandsdiagnose ableiten.",
        mistakes: [
          "Aus gleichem Strom oder gleicher Leistung auf denselben Kältekreisbetrieb schließen.",
          "Beliebige Betriebszustände mit einem einzigen pauschalen Druckgastemperatur-Grenzwert beurteilen.",
        ],
        summary:
          "Vergleiche Betriebspunkte mit definierten Randbedingungen und passenden Herstellerunterlagen. Messwerte müssen eine Hypothese prüfen, nicht nur einen Verdacht bestätigen.",
        deepening:
          "Erstelle eine Diagnosematrix für hohe Druckgastemperatur. Trenne messbare Beobachtung, mögliche Ursache, unterscheidende Messung und erforderliche Herstellerinformation.",
      },
    },
  },
  {
    id: "condensation",
    revision: 1,
    domainId: "kaelte",
    title: "Kondensation und Verflüssiger",
    description:
      "Drei Wärmeabgabeabschnitte verstehen und die Verflüssigerleistung bilanzieren.",
    objectiveIds: ["cond-state", "cond-power-objective"],
    formulaIds: ["condenser-power", "cycle-balance", "subcooling"],
    sourceIds: ["openstax-heat-pumps", "didactic-cycle"],
    termIds: ["kondensation", "unterkuehlung", "enthalpie"],
    questionIds: ["cond-q1", "cond-q2", "cond-q3", "cond-q4"],
    cardIds: ["cond-card1", "cond-card2"],
    review: "awaiting-expert-review",
    related: [
      {
        kind: "measurement",
        id: "condenser-measurement",
        label: "Verflüssiger-Messprotokoll (geplant)",
        available: false,
      },
    ],
    levels: {
      grundlagen: {
        introduction:
          "Der Verflüssiger gibt die zuvor aufgenommene Wärme und die zugeführte Verdichterenergie an die Umgebung ab. Er ist deshalb auf der warmen Seite des Kreislaufs zu finden. Das Kältemittel kommt heiß und gasförmig an.",
        explanation:
          "Zunächst kühlt der überhitzte Dampf bis zum Sättigungszustand ab: Das nennt man Enthitzung. Dann wird Dampf zu Flüssigkeit, also Kondensation. Danach kann die Flüssigkeit weiter abkühlen; dieser Abschnitt heißt Unterkühlung. Je nach Anlage und Betriebszustand sind diese Bereiche unterschiedlich ausgeprägt. Ein Verflüssiger kann Wärme zum Beispiel an Außenluft oder Wasser abgeben.",
        connections:
          "Wärme fließt nur bei passendem Temperaturgefälle. Verschmutzte Lamellen, fehlender Luftstrom oder zu hohe Eintrittstemperaturen können die Wärmeabgabe beeinträchtigen. Eine Beurteilung beginnt deshalb nicht automatisch mit einer Änderung der Kältemittelfüllmenge.",
        example:
          "Nimmt ein idealisierter Kreis 7,5 kW Nutzwärme im Verdampfer auf und erhält 2 kW im Verdichter, muss sein Verflüssiger 9,5 kW abgeben. Die Außenluft nimmt damit mehr Wärme auf, als der gekühlten Seite allein entzogen wurde. Weitere Verluste bleiben in diesem Beispiel unberücksichtigt.",
        mistakes: [
          "Kondensation als Wärmeaufnahme beschreiben: Bei der Verflüssigung wird Wärme abgegeben.",
          "Die Verflüssigerleistung immer mit der Verdampferleistung gleichsetzen.",
        ],
        summary:
          "Enthitzen → kondensieren → gegebenenfalls unterkühlen. Der Verflüssiger ist die Wärmeabgabeseite des üblichen Kältekreises.",
        deepening:
          "Zeichne den Temperaturverlauf qualitativ. Markiere, wo Dampf, Gemisch und Flüssigkeit auftreten können; ein exakter Verlauf benötigt Kältemittel- und Betriebsdaten.",
      },
      fachkraft: {
        introduction:
          "Die gesamte Wärmeabgabe umfasst mehr als nur die Kondensationswärme. Eine Enthalpiebilanz berücksichtigt alle Abschnitte zwischen Verdichteraustritt und Flüssigkeitszustand vor der Drossel.",
        explanation:
          "Es gilt Q̇c = ṁ × (h₂ − h₃), wenn Änderungen kinetischer und potenzieller Energie vernachlässigt werden. Die Wärmeabgabe wird hier als positiver Betrag angegeben. Unterkühlung ist ein Temperaturabstand und allein kein Leistungswert. Bei zeotropen Gemischen beziehen sich Kondensation und Unterkühlung nicht auf denselben beliebig gewählten Mittelwert: Für die Unterkühlung ist der Siedepunkt beim passenden örtlichen Druck maßgeblich.",
        connections:
          "Ein Druckverlust in der Flüssigkeitsleitung und ein Wärmeeintrag können die Reserve gegen Dampfblasenbildung reduzieren. Unterkühlung direkt am Verflüssiger und am Expansionsorgan müssen deshalb nicht identisch sein. Messstellen und gegebenenfalls Sammleranordnung gehören ins Protokoll.",
        example:
          "Modellwerte: ṁ = 0,05 kg/s, h₂ = 440 und h₃ = 250 kJ/kg. Q̇c = 0,05 × (440 − 250) = 9,5 kW. Aus den anderen Bauteilen folgen 7,5 + 2 = 9,5 kW. Die Übereinstimmung kontrolliert unsere Modellannahmen, sie ist kein Nachweis der Effizienz eines realen Verflüssigers.",
        mistakes: [
          "Enthitzung und Unterkühlung bei einer Gesamtbilanz auslassen.",
          "Druck und Temperatur von verschiedenen Orten ohne Berücksichtigung des Druckverlusts kombinieren.",
        ],
        summary:
          "Die Enthalpiedifferenz erfasst die gesamte Wärmeabgabe. Für die Zustandsbeurteilung müssen Druck, Temperatur, Kältemittel und Messort zusammenpassen.",
        deepening:
          "Welche Messstellen würdest du wählen, um Wärmeabgabe und Unterkühlung getrennt zu beurteilen? Welche zusätzlichen Daten braucht eine wasserseitige Vergleichsrechnung?",
      },
      meister: {
        introduction:
          "Eine erhöhte Verflüssigungstemperatur ist zunächst eine Beobachtung, keine fertige Diagnose. Wärmeübertragerzustand, Umgebung, Last, Luft-/Wassermengen und Kältemittelkreis können dazu beitragen.",
        explanation:
          "Ein fairer Betriebsvergleich benötigt gleiche oder nachvollziehbar korrigierte Randbedingungen. Auch Regelungszustände von Ventilatoren oder Wasserpumpen beeinflussen das Bild. Für eine Bilanz aus elektrischer Gesamtleistung und Kälteleistung sind Wärmeaustausch an Leitungen und Verdichter sowie Hilfsenergien abhängig von der Grenze einzubeziehen. Die idealisierte Gleichung ist ein Ausgangspunkt, keine Universalprüfung jeder realen Messanordnung.",
        connections:
          "Eine energetisch sinnvolle Regelung senkt das Druckniveau nicht grenzenlos: Betriebsgrenzen, Regelorganfunktion und Herstelleranforderungen müssen weiterhin erfüllt sein. Auch aus einer hohen Unterkühlung allein lässt sich ohne Anlagenkontext keine eindeutige Überfüllung ableiten.",
        example:
          "Angenommen, die Wärmeabgabe beträgt 9,5 kW. Ein größerer Temperaturabstand zur Außenluft kann diese Leistung auch bei verschlechtertem Wärmeübergang noch ermöglichen, allerdings unter veränderten Betriebsbedingungen. Ohne Fläche, Wärmeübergang und Ströme lässt sich daraus kein neuer Betriebspunkt ausrechnen. Dokumentiere diese fehlenden Größen statt einen scheinbar exakten Sollwert zu erfinden.",
        mistakes: [
          "Eine Druckabsenkung unabhängig von Betriebsgrenzen als immer richtig ansehen.",
          "Unterkühlung ohne Sammler-, Last- und Messstellenkontext als eindeutige Füllmengenaussage benutzen.",
        ],
        summary:
          "Bewerte Wärmeabgabe im Kontext von Randbedingungen, Regelung und Systemgrenze. Fehlende Auslegungsdaten müssen als fehlend erkennbar bleiben.",
        deepening:
          "Entwirf einen Vergleich vor und nach einer Reinigung mit stabilen Betriebsbedingungen. Welche Werte müssen protokolliert werden, damit eine Verbesserung belastbar beurteilt werden kann?",
      },
    },
  },
  {
    id: "superheat-subcooling",
    revision: 1,
    domainId: "kaelte",
    title: "Überhitzung und Unterkühlung",
    description:
      "Temperaturabstände korrekt berechnen, Messfehler erkennen und Diagnosen begrenzen.",
    objectiveIds: ["sh-measure", "sh-diagnosis"],
    formulaIds: ["superheat", "subcooling"],
    sourceIds: ["openstax-heat-pumps"],
    termIds: ["ueberhitzung", "unterkuehlung", "taupunkt"],
    questionIds: ["sh-q1", "sh-q2", "sh-q3", "sh-q4"],
    cardIds: ["sh-card1", "sh-card2"],
    review: "awaiting-expert-review",
    related: [
      {
        kind: "measurement",
        id: "superheat-measurement",
        label: "Geführte Messwertaufnahme (geplant)",
        available: false,
      },
      {
        kind: "diagnosis",
        id: "superheat-diagnosis",
        label: "Mehrwertige Fehlerdiagnose (geplant)",
        available: false,
      },
    ],
    levels: {
      grundlagen: {
        introduction:
          "Ein Temperaturwert ist erst mit dem passenden Druck richtig einzuordnen. Überhitzung beschreibt Dampf oberhalb seiner Sättigungstemperatur. Unterkühlung beschreibt Flüssigkeit unterhalb ihrer Sättigungstemperatur.",
        explanation:
          "Für die Überhitzung ziehst du die Sättigungstemperatur von der gemessenen Dampftemperatur ab. Für die Unterkühlung ist es umgekehrt: Sättigungstemperatur minus Flüssigkeitstemperatur. Diese Abstände werden in Kelvin angegeben. Eine Temperaturdifferenz von 1 °C ist genauso groß wie 1 K; absolute Temperaturen in °C und K sind dagegen nicht gleich.",
        connections:
          "Ein Rohrfühler und ein Druckwert müssen denselben Zustand beschreiben. Schlechter Kontakt, unisolierte Fühler oder räumlich getrennte Messorte können die Rechnung verfälschen. Ein positiver Rechenwert allein ist noch kein Beleg für eine sichere oder optimal eingestellte Anlage.",
        example:
          "Dampf: Sättigung −10 °C, gemessen −4 °C. Überhitzung = −4 − (−10) = 6 K. Flüssigkeit: Sättigung 40 °C, gemessen 35 °C. Unterkühlung = 40 − 35 = 5 K. Die Zahlen sind reine Rechenbeispiele und keine empfohlenen Sollwerte.",
        mistakes: [
          "Bei negativen Temperaturen das Vorzeichen in der Klammer übersehen.",
          "Die Subtraktionsreihenfolge von Überhitzung und Unterkühlung verwechseln.",
        ],
        summary:
          "Überhitzung: Dampf minus Sättigung. Unterkühlung: Sättigung minus Flüssigkeit. Immer passende Zustände und Kelvin als Differenzeinheit verwenden.",
        deepening:
          "Berechne die Überhitzung für 2 °C Dampftemperatur und −3 °C Sättigungstemperatur. Erkläre anschließend, weshalb eine zugehörige Druckangabe weiterhin erforderlich ist.",
      },
      fachkraft: {
        introduction:
          "Das Druck-Temperatur-Verhältnis hängt vom Kältemittel ab. Besonders bei zeotropen Gemischen muss die passende Grenze des Sättigungsbereichs gewählt werden. Messgerät, Kältemittelwahl und Druckreferenz gehören zusammen.",
        explanation:
          "Für Überhitzung wird bei solchen Gemischen der Taupunkt (Dew) verwendet, für Unterkühlung der Siedepunkt (Bubble). Eine beliebige Mitteltemperatur liefert einen anderen Abstand. Druckverluste zwischen Messorten beeinflussen die örtliche Sättigungstemperatur. Die Verdampferüberhitzung am Austritt und die Gesamtüberhitzung vor dem Verdichter können sich durch Wärmeeintrag und Druckverlust in der Saugleitung unterscheiden.",
        connections:
          "Eine sinnvolle Messung dokumentiert Kältemittel, Lastzustand, Druckart (absolut oder relativ), Messorte, Fühlerbefestigung und thermischen Kontakt. Die zulässigen Zielwerte stammen aus den Unterlagen der konkreten Anlage, nicht aus den Zahlen eines Lernbeispiels.",
        example:
          "Frei gewähltes Gemischbeispiel bei einem bestimmten Druck: Dew = −8 °C, Bubble = −12 °C, Dampf = −2 °C. Überhitzung richtig: −2 − (−8) = 6 K. Mit Bubble ergäben sich fälschlich 10 K. Diese Temperaturen stellen keine Stofftabelle eines realen Kältemittels dar.",
        mistakes: [
          "Bei der Überhitzung Bubble oder eine gemittelte Temperatur benutzen.",
          "Unterschiedliche Messorte ohne Korrektur der Druckverluste gleichsetzen.",
        ],
        summary:
          "Taupunkt für den Dampf, Siedepunkt für die Flüssigkeit. Eine korrekte Rechnung beginnt bei der Mess- und Stoffdatenwahl.",
        deepening:
          "Entwirf ein Messprotokoll mit Druck- und Temperaturbezug. Welche Fehler würdest du zuerst ausschließen, bevor du eine Regelung veränderst?",
      },
      meister: {
        introduction:
          "Überhitzung und Unterkühlung sind wertvolle Zustandsgrößen, aber keine eindeutigen Fehlercodes. Die Meisteraufgabe besteht darin, Messunsicherheit und Anlagenkontext mit einer Hypothesenprüfung zu verbinden.",
        explanation:
          "Hohe Überhitzung kann mit zu geringer Verdampferversorgung zusammenhängen, aber auch mit zusätzlichem Wärmeeintrag oder einem ungeeigneten Messort. Unterkühlung hängt unter anderem von Aufbau, Last und Sammleranordnung ab. Vor einer Schlussfolgerung müssen die Messkette und die Betriebsstabilität plausibel sein. Ein einzelner Wert beweist weder Kältemittelmangel noch Überfüllung.",
        connections:
          "Temperaturfühler und aus Druck abgeleitete Sättigungstemperatur bringen beide Unsicherheit in die Differenz ein. Ohne Annahmen über Verteilungen und Korrelation darf aus den Einzelunsicherheiten keine beliebige statistische Genauigkeit konstruiert werden. Eine konservative Fehlergrenze ist für ein Lernbeispiel oft nachvollziehbarer.",
        example:
          "Bei 6 K gemessener Überhitzung und angenommenen Fehlergrenzen von jeweils ±0,5 K für Dampftemperatur und abgeleitete Sättigungstemperatur ergibt sich konservativ ±1 K für die Differenz: also 5 bis 7 K. Das ist eine angenommene Fehlergrenze, keine behauptete Gerätespezifikation oder statistische Standardunsicherheit.",
        mistakes: [
          "Ein Messergebnis ohne Unsicherheit mit einem scharfen Sollwert vergleichen.",
          "Eine hohe Überhitzung ohne Prüfung der Luft-/Wasserseite und des Messorts direkt durch Nachfüllen beantworten.",
        ],
        summary:
          "Trenne Beobachtung, Messunsicherheit, mögliche Ursachen und bestätigte Diagnose. Verwende Herstellerwerte und konsistente Messorte statt pauschaler Regeln.",
        deepening:
          "Formuliere zwei unterschiedliche Ursachen für denselben hohen Überhitzungswert und je eine Messung, die zwischen ihnen unterscheiden kann. Begründe, wann eine Messung wiederholt werden sollte.",
      },
    },
  },
];
