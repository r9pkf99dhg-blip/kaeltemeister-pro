import type { FoundationLesson } from "../foundations/model";
export const thermal_lessons: FoundationLesson[] = [
  {
    "id": "thermo-states",
    "domainId": "thermodynamik",
    "title": "Temperatur, Druck und spezifisches Volumen",
    "goal": "Zustandsgrößen und Bezugsniveaus vor einer thermodynamischen Rechnung festlegen.",
    "why": "Ein Druckmesswert ohne Referenz oder eine Temperatur ohne Skala kann zu einer fachlich falschen Aussage führen. Zustandsgrößen beschreiben den Zustand; Wärme und Arbeit beschreiben dagegen Energieübertragung über eine Systemgrenze.",
    "basic": "Die thermodynamische Temperatur wird in Kelvin angegeben: \\(T/\\mathrm K=\\vartheta/{}^\\circ\\mathrm C+273{,}15\\). Ein Temperaturunterschied von 1 °C ist ein Unterschied von 1 K. Absolutdruck bezieht sich auf Vakuum, Überdruck auf den angegebenen Umgebungsdruck: \\(p_\\mathrm{abs}=p_\\mathrm{ü}+p_\\mathrm{amb}\\).",
    "reasoning": "Für eine homogene Probe gilt \\(\\rho=m/V\\) und das spezifische Volumen \\(v=V/m=1/\\rho\\). Masse und Volumen sind verschiedene Größen. Für einen stationären Strom gilt entsprechend \\(\\dot m=\\rho\\dot V\\), wenn die Dichte zur selben Messstelle und zum selben Zustand gehört. Bei Gasen ist eine andere Bezugsdichte häufig unzulässig.",
    "transfer": "Ein negativer Überdruck ist relativ zur Umgebung möglich, negativer Absolutdruck in diesem einfachen thermodynamischen Modell nicht. Die Zahlenaufgabe verwendet ausdrücklich positiven Überdruck. Ohne Druckreferenz dürfen keine Sättigungstemperaturen aus Tabellen ausgewählt werden; reale Stoffwerte werden hier nicht erfunden.",
    "example": "Fiktiv 2,0 bar Überdruck bei ausdrücklich 1,0 bar Umgebung: 3,0 bar absolut = 300000 Pa. Aus −10 °C werden 263,15 K, während die Erwärmung auf −4 °C nur +6 K beträgt. Bei vorgegebener Dichte 800 kg/m³ ist \\(v=0{,}00125\\,\\mathrm{m^3/kg}\\).",
    "derivation": [
      "\\(p_\\mathrm{ü}=p_\\mathrm{abs}-p_\\mathrm{amb}\\Rightarrow p_\\mathrm{abs}=p_\\mathrm{ü}+p_\\mathrm{amb}\\).",
      "\\(v=\\frac Vm=\\frac1\\rho\\) bei m > 0 und V > 0.",
      "\\(\\dot m=\\frac{dm}{dt}=\\rho\\frac{dV}{dt}=\\rho\\dot V\\) bei konstanter lokaler Dichte."
    ],
    "mistakes": [
      "Überdruck ohne Umgebungsdruck als Absolutdruck verwenden.",
      "Celsiuswerte als absolute Temperaturverhältnisse oder Volumenstrom als Massenstrom einsetzen."
    ],
    "summary": "Druckreferenz, Temperaturskala und Dichtebezug sind Teil des Modells. Temperaturdifferenzen benötigen keinen Celsius-Offset, absolute Temperaturen schon. Volumenstrom wird erst durch eine passende Dichte zu einem Massenstrom.",
    "prerequisites": [
      "physics-pressure-density",
      "physics-heat",
      "math-units"
    ],
    "formulaIds": [
      "thermo-pressure-abs",
      "thermo-specific-volume",
      "thermo-mass-volume"
    ],
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ],
    "questions": [
      {
        "prompt": "2 bar Überdruck, 1 bar Umgebung: Absolutdruck?",
        "correct": "3 bar",
        "wrong": [
          "2 bar",
          "1 bar"
        ],
        "explanation": "Überdruck ist die Differenz zum Umgebungsdruck. Deshalb werden für den Absolutdruck 2 + 1 = 3 bar verwendet; der Umgebungswert ist hier vorgegeben."
      },
      {
        "prompt": "Von −10 °C auf −4 °C: Änderung?",
        "correct": "+6 K",
        "wrong": [
          "+269,15 K",
          "−6 K"
        ],
        "explanation": "Beide absoluten Temperaturen erhalten denselben Offset. Bei der Differenz hebt er sich auf: −4 − (−10) = +6 K. Die gerichtete Erwärmung ist positiv."
      },
      {
        "prompt": "Wann darf ṁ = ρ V̇ eingesetzt werden?",
        "correct": "Wenn Dichte und Volumenstrom zum selben Zustand und Ort gehören.",
        "wrong": [
          "Mit jeder beliebigen Bezugsdichte.",
          "Nur wenn ρ = 1 ist."
        ],
        "explanation": "Die Dichte übersetzt das tatsächlich betrachtete Volumen in Masse. Ein Normvolumenstrom und eine Betriebsdichte dürfen ohne Umrechnung nicht einfach kombiniert werden."
      }
    ]
  },
  {
    "id": "thermo-calorimetry",
    "domainId": "thermodynamik",
    "title": "Wärmeenergie, Wärmeleistung und Wärmeträgerstrom",
    "goal": "Q = m cp ΔT und Q̇ = ṁ cp ΔT herleiten und ihren Modellbereich beurteilen.",
    "why": "Wärme ist Energieübertragung aufgrund einer Temperaturdifferenz und kein gespeicherter Stoff. Innere Energie gehört zum Zustand. Die Größen Energie und Leistung sowie Masse und Massenstrom unterscheiden sich durch den Zeitbezug.",
    "basic": "Die Wärmekapazität \\(C=Q/\\Delta T\\) beschreibt im passenden Prozess den Energiebedarf pro Temperaturänderung, die spezifische Größe ist \\(c=C/m\\). Für konstantes c ohne Phasenwechsel folgt \\(Q=mc\\Delta T\\). Bei näherungsweise konstantem Druck und geeignetem Stoffmodell wird c als cp verwendet.",
    "reasoning": "Allgemeiner ist \\(Q=m\\int_{T_1}^{T_2}c_p(T)\\,dT\\) unter den passenden Prozessannahmen. Bei stationärem Durchfluss wird pro Zeit dieselbe Beziehung auf den Massenstrom bezogen: \\(\\dot Q=\\dot m c_p\\Delta T\\). Die Einheit ergibt kg/s × J/(kg·K) × K = J/s = W. Hier werden positive übertragene Beträge betrachtet.",
    "transfer": "Bei stark veränderlichem cp ist ein Integral oder eine begründete mittlere Wärmekapazität nötig. Beim Phasenwechsel ist m cp ΔT allein falsch. Pumpenarbeit, Wärmeverluste und veränderte kinetische oder potenzielle Energie sind in diesem einfachen Wärmeträgerfall vernachlässigt. Ein Verdampferkältemittel benötigt häufig Enthalpiedifferenzen.",
    "example": "Fiktiver Wärmeträger: ṁ = 0,5 kg/s, cp ausdrücklich 4000 J/(kg·K), Abkühlbetrag 5 K. Es werden 10000 W = 10 kW übertragen. In 60 s beträgt die durchströmende Masse 30 kg und die Wärmeenergie 600000 J. Verdoppelter Massenstrom verdoppelt die Modellleistung nur bei unverändertem cp und ΔT.",
    "derivation": [
      "\\(dQ=mc_p\\,dT\\Rightarrow Q=mc_p(T_2-T_1)\\) für konstantes cp.",
      "\\(\\frac Q{\\Delta t}=\\frac m{\\Delta t}c_p\\Delta T\\Rightarrow\\dot Q=\\dot m c_p\\Delta T\\) im stationären Betragsmodell.",
      "\\(0{,}5\\cdot4000\\cdot5=10000\\,\\mathrm{J/s}\\); 60 s ergeben \\(600000\\,\\mathrm J\\)."
    ],
    "mistakes": [
      "Energie in J mit Leistung in W oder kg mit kg/s verwechseln.",
      "Den Temperatur-Offset 273,15 auf ΔT anwenden oder bei Verdampfung nur cp ΔT benutzen."
    ],
    "summary": "Die einfache sensible Wärmeformel entsteht aus konstanter Wärmekapazität und einem passenden Prozess. Die Leistungsform nutzt den Massenstrom und stationäre Bedingungen. Phasenwechsel, erhebliche Stoffwertänderungen und zusätzliche Energieterme benötigen ein erweitertes Modell.",
    "prerequisites": [
      "thermo-states",
      "physics-energy"
    ],
    "formulaIds": [
      "sensible-heat",
      "math-heat-energy"
    ],
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ],
    "questions": [
      {
        "prompt": "0,5 kg/s, cp=4000 J/(kg·K), ΔT=5 K: Wärmeleistung?",
        "correct": "10 kW",
        "wrong": [
          "10 kJ",
          "10000 kWh"
        ],
        "explanation": "Das Produkt beträgt 10000 kg/s × J/(kg·K) × K = 10000 J/s = 10 kW. Eine Wärmemenge benötigt zusätzlich eine Zeit oder eine Masse."
      },
      {
        "prompt": "Wann reicht Q = m cp ΔT allein nicht?",
        "correct": "Bei Phasenwechsel oder stark veränderlichem cp.",
        "wrong": [
          "Bei jeder Temperaturdifferenz in Kelvin.",
          "Wenn Masse in kg angegeben ist."
        ],
        "explanation": "Die Formel setzt einen sensiblen Prozess mit geeignet konstantem cp voraus. Phasenwechsel braucht zusätzliche Energie ohne notwendige Temperaturänderung."
      },
      {
        "prompt": "Doppelter ṁ bei gleichem cp und ΔT: welcher Schluss ist zulässig?",
        "correct": "Doppelte Modellleistung, sofern die Randbedingungen erhalten bleiben.",
        "wrong": [
          "Jeder reale Verdampfer liefert automatisch doppelt so viel.",
          "Die Leistung halbiert sich immer."
        ],
        "explanation": "Die Proportionalität folgt aus dem Modell, aber reale Wärmeübertrager können ΔT, Stoffzustand und Übertragungsbedingungen verändern. Der Transfer braucht diese Prüfung."
      }
    ]
  },
  {
    "id": "thermo-phase",
    "domainId": "thermodynamik",
    "title": "Phasenwechsel, innere Energie und latente Wärme",
    "goal": "Sensible und latente Energie sowie die Bedeutung von Druck und Stoffsystem unterscheiden.",
    "why": "Im Verdampfer kann viel Energie aufgenommen werden, während sich die Sättigungstemperatur eines reinen Stoffes bei konstantem Druck kaum ändert. Das ist kein Widerspruch zur Energieerhaltung: Die Energie verändert auch die molekulare Anordnung und die innere Energie.",
    "basic": "Sensibles Erwärmen verändert die Temperatur innerhalb einer Phase. Beim Verdampfen oder Kondensieren eines reinen Stoffes im Gleichgewicht und bei konstantem Druck wird latente Energie übertragen. Ein einfaches Modell lautet \\(Q=mL\\), wobei L die für diesen Übergang und Zustand vorgegebene spezifische Umwandlungsenergie ist.",
    "reasoning": "Eine Heizkurve hat bei einem idealisierten reinen Stoff Temperaturanstiege in den einphasigen Bereichen und ein Plateau während des Phasenwechsels bei konstantem Druck. Bei Gemischen kann ein Temperaturgleit auftreten, und bei veränderlichem Druck verschiebt sich die Sättigungsbedingung. L ist keine universelle Konstante für alle Stoffe und Drücke.",
    "transfer": "Eine vollständige Energierechnung kann sensible Abschnitte und einen Phasenübergang addieren, wenn die Zustände sauber definiert sind. Unsere Aufgabe gibt L als rein fiktiven Lernwert vor; sie ordnet keinem echten Kältemittel einen Stoffwert zu. Für reale Zustände braucht die Plattform künftig validierte Stoffdaten und eine passende Systemgrenze.",
    "example": "Fiktiver Stoff: 2 kg durchlaufen genau den vorgegebenen Übergang mit L = 200 kJ/kg. Der Energiebedarf ist 400 kJ. Bei 10 kW konstanter zugeführter Wärmeleistung dauert der ideale Übergang 40 s. Wärmeverluste und sensible Erwärmung sind ausdrücklich nicht Teil dieses Modells.",
    "derivation": [
      "\\(L=\\frac Qm\\Rightarrow Q=mL\\) für den angegebenen Übergang.",
      "\\(Q=2\\cdot200=400\\,\\mathrm{kJ}\\).",
      "\\(t=\\frac Q{\\dot Q}=\\frac{400000}{10000}=40\\,\\mathrm s\\) bei konstanter Leistung."
    ],
    "mistakes": [
      "Eine konstante Temperatur als Beweis für fehlende Wärmeübertragung ansehen.",
      "Eine vorgegebene latente Energie ohne Stoff-/Druckbezug auf reale Kältemittel übertragen."
    ],
    "summary": "Wärmeübertragung kann Temperatur oder Phase verändern. Q = mL beschreibt nur einen klar definierten Übergang; konstante Phasenwechseltemperatur benötigt zusätzliche Stoff-, Druck- und Gleichgewichtsbedingungen. Reale Stoffdaten dürfen nicht durch fiktive Lernwerte ersetzt werden.",
    "prerequisites": [
      "thermo-calorimetry",
      "chemistry-matter"
    ],
    "formulaIds": [
      "thermo-latent"
    ],
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ],
    "questions": [
      {
        "prompt": "Kann beim Verdampfen Wärme aufgenommen werden, obwohl die Temperatur konstant bleibt?",
        "correct": "Ja, bei passenden Phasenwechselbedingungen.",
        "wrong": [
          "Nein, Q ist immer cp ΔT.",
          "Nur ohne Masse."
        ],
        "explanation": "Die zugeführte Energie kann einen Phasenwechsel bewirken. Bei reinem Stoff und konstantem Druck ist ein Temperaturplateau im Gleichgewicht möglich."
      },
      {
        "prompt": "2 kg mit vorgegebenem L=200 kJ/kg: latente Energie?",
        "correct": "400 kJ",
        "wrong": [
          "100 kJ",
          "400 kW"
        ],
        "explanation": "Masse mal spezifische Übergangsenergie ergibt 2 × 200 = 400 kJ. kW wäre eine Leistung; dafür müsste die Dauer zusätzlich bekannt sein."
      },
      {
        "prompt": "Darf ein fiktiver L-Wert als Kältemittel-Stoffwert genutzt werden?",
        "correct": "Nein, Stoff und Zustand sind nicht validiert.",
        "wrong": [
          "Ja, alle Stoffe haben denselben Wert.",
          "Ja, solange die Zahl positiv ist."
        ],
        "explanation": "Ein positiver Zahlenwert belegt keine Stoffeigenschaft. Reale Phasenwechselenergie benötigt nachvollziehbare Stoff-, Druck- und Zustandsdaten sowie eine validierte Quelle."
      }
    ]
  },
  {
    "id": "thermo-transfer",
    "domainId": "thermodynamik",
    "title": "Wärmeleitung, Wärmewiderstand und U-Wert",
    "goal": "Stationäre eindimensionale Wärmeübertragung mit Modellgrenzen und einem Schichtvergleich erklären.",
    "why": "Wärmeleitung überträgt Energie durch mikroskopische Wechselwirkungen, Konvektion koppelt sie an bewegtes Fluid und Strahlung an elektromagnetische Wellen. Reale Wärmeübertrager enthalten mehrere Mechanismen gleichzeitig; ein Schichtenmodell bildet nur einen begrenzten Teil ab.",
    "basic": "Für eine ebene homogene Schicht, konstante Wärmeleitfähigkeit λ und stationäre eindimensionale Leitung ohne innere Quelle gilt \\(\\dot Q=\\lambda A\\frac{\\Delta T}{d}\\). Der Wärmewiderstand ist \\(R_\\mathrm{th}=\\frac d{\\lambda A}\\) in K/W. Größere Dicke erhöht, größere Fläche oder Leitfähigkeit senkt diesen Widerstand.",
    "reasoning": "In seriellen Schichten mit gleicher Fläche ist der Wärmestrom gleich und die Temperaturabfälle addieren sich. Deshalb \\(R_\\mathrm{ges}=\\sum d_i/(\\lambda_i A)\\). Mit vorgegebenen äußeren Wärmeübergangskoeffizienten α folgt \\(U=1/(1/\\alpha_i+\\sum d_i/\\lambda_i+1/\\alpha_a)\\) und \\(\\dot Q=UA\\Delta T\\). Die α-Werte müssen selbst begründet oder vorgegeben sein.",
    "transfer": "Konvektion beschreibt den Energieaustausch mit strömendem Fluid; ein Wärmeübergangskoeffizient ist modell- und zustandsabhängig. Strahlung kann auch durch Vakuum übertragen werden und hängt unter anderem von absoluten Temperaturen und Oberflächen ab. Wärmebrücken, Feuchte, Kontaktwiderstände, instationäre Speicher und Zylindergeometrie sind im ebenen Rechenmodell nicht enthalten.",
    "example": "Fiktiv λ = 0,04 W/(m·K), A = 2 m², d = 0,1 m und ΔT = 20 K: Rth = 1,25 K/W, also Q̇ = 16 W. Doppelte Dicke bei sonst gleichen Bedingungen ergibt 8 W. Das ist ein Modellvergleich, keine freigegebene Dämmungsauslegung oder Tauwasserprüfung.",
    "derivation": [
      "\\(\\dot Q R_\\mathrm{th}=\\Delta T\\Rightarrow R_\\mathrm{th}=\\frac d{\\lambda A}\\).",
      "\\(\\Delta T=\\sum\\Delta T_i=\\dot Q\\sum R_i\\) bei gleichem stationärem Wärmestrom.",
      "\\(U=\\frac1{AR_\\mathrm{ges}}\\); die flächenbezogenen Widerstände haben Einheit m²·K/W."
    ],
    "mistakes": [
      "λ in W/(m·K) mit U in W/(m²·K) gleichsetzen.",
      "Das ebene stationäre Modell als vollständige Rohrdämm-, Feuchte- oder Wärmebrückenberechnung ausgeben."
    ],
    "summary": "Wärmewiderstände erlauben einen nachvollziehbaren stationären Schichtvergleich. Der U-Wert fasst Leitung und vorgegebene Wärmeübergänge pro Fläche zusammen. Geometrie, Stoffzustand, Zeitverhalten, Strahlung und Feuchte begrenzen die Übertragbarkeit des einfachen Modells.",
    "prerequisites": [
      "thermo-calorimetry",
      "math-geometry"
    ],
    "formulaIds": [
      "thermo-conduction",
      "thermo-resistance",
      "thermo-layers",
      "thermo-u"
    ],
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ],
    "questions": [
      {
        "prompt": "Bei gleicher λ, A und ΔT wird die Schicht doppelt so dick. Was folgt im Modell?",
        "correct": "Halber Wärmestrom.",
        "wrong": [
          "Doppelter Wärmestrom.",
          "Unveränderter Wärmestrom."
        ],
        "explanation": "Die Dicke steht im Nenner von Q̇ = λAΔT/d. Das Ergebnis gilt im stationären ebenen Modell, sofern alle anderen Randbedingungen wirklich gleich bleiben."
      },
      {
        "prompt": "Welche Einheit hat der Wärmewiderstand d/(λA)?",
        "correct": "K/W",
        "wrong": [
          "W/K",
          "W/(m·K)"
        ],
        "explanation": "Eine Temperaturdifferenz geteilt durch einen Wärmestrom hat Einheit K/W. Das ist nicht die Wärmeleitfähigkeit und auch nicht der U-Wert."
      },
      {
        "prompt": "Was fehlt für eine reale Dämmfreigabe im ebenen Schichtenmodell?",
        "correct": "Unter anderem Wärmebrücken, Feuchte und passende Geometrie.",
        "wrong": [
          "Nichts, jede positive Zahl reicht.",
          "Nur eine dekorative Zeichnung."
        ],
        "explanation": "Das Modell idealisiert stationäre eindimensionale Leitung. Reale Oberflächen, Feuchte, Anschlüsse und zylindrische Rohre benötigen zusätzliche Nachweise und Daten."
      }
    ]
  },
  {
    "id": "thermo-cycle-balance",
    "domainId": "thermodynamik",
    "title": "Systemgrenzen, Enthalpie und Kältekreislauf",
    "goal": "Energieflüsse im Kältekreislauf bilanzieren und eine spätere log-p-h-Auswertung vorbereiten.",
    "why": "Eine Kälteanlage transportiert Energie aus einem kalten Bereich und gibt sie zusammen mit zugeführter Arbeit an die Umgebung ab. Der Verdichter erzeugt keine Kälte als Stoff; er hält den Prozess durch Arbeitszufuhr und Druckanhebung in Gang.",
    "basic": "Für ein geschlossenes System verwenden wir \\(\\Delta U=Q-W\\), mit Q positiv hinein und W positiv vom System geleistet. Bei durchströmten Bauteilen fasst die spezifische Enthalpie \\(h=u+pv\\) innere Energie und Strömungsarbeit zusammen. Ohne relevante Bewegungs- und Lageenergie folgt für den Verdampfer \\(\\dot Q_0=\\dot m(h_1-h_4)\\).",
    "reasoning": "Im idealisierten stationären Kreislauf gilt am Fluidverdichter \\(P_\\mathrm{Fluid}=\\dot m(h_2-h_1)\\) und am Verflüssiger \\(\\dot Q_k=\\dot m(h_2-h_3)\\). Das adiabate Drosselmodell ohne Wellenarbeit setzt h3 = h4. Zusammensetzen ergibt \\(\\dot Q_k=\\dot Q_0+P_\\mathrm{Fluid}\\). Elektrische Eingangsleistung ist bei Motorverlusten größer und gehört zu einer anderen Systemgrenze.",
    "transfer": "Die spätere log-p-h-Darstellung verwendet den Absolutdruck auf logarithmischer Skala und Enthalpie als zweite Koordinate. Dafür sind reale Zustandsdaten aus geprüften Stoffwertquellen nötig. Hier gibt es ausschließlich ausdrücklich fiktive Enthalpiewerte zur Bilanzübung und keine erfundene Kältemittelkennlinie oder professionelle Anlagenrechnung.",
    "example": "Fiktiv ṁ = 0,1 kg/s, h1 = 400, h2 = 450, h3 = h4 = 250 kJ/kg: Q̇0 = 15 kW, PFluid = 5 kW und Q̇k = 20 kW. Die Bilanz 15 + 5 = 20 besteht. Ohne Motorwirkungsgrad und Hilfsenergie ist daraus noch kein gemessener elektrischer COP einer realen Anlage bestimmt.",
    "derivation": [
      "\\(\\dot Q_0=0{,}1(400-250)=15\\,\\mathrm{kW}\\).",
      "\\(P_\\mathrm{Fluid}=0{,}1(450-400)=5\\,\\mathrm{kW}\\).",
      "\\(\\dot Q_k=0{,}1(450-250)=20\\,\\mathrm{kW}=15+5\\,\\mathrm{kW}\\)."
    ],
    "mistakes": [
      "Elektrische Eingangsleistung ohne Verlustbilanz mit der an das Fluid übertragenen Leistung gleichsetzen.",
      "Fiktive Enthalpien als reale Kältemitteldaten oder h3 = h4 als universelle Bauteilbeziehung ausgeben."
    ],
    "summary": "Systemgrenze und Vorzeichen machen die Energiebilanz eindeutig. Enthalpiedifferenzen ermöglichen durchströmte Modelle einschließlich Phasenwechsel. Ein idealer Kreislauf erklärt die Summe aus Kälteaufnahme und Fluidarbeit, ersetzt aber keine realen Stoffdaten und Wirkungsgradmessungen.",
    "prerequisites": [
      "thermo-phase",
      "thermo-transfer",
      "cycle-basics"
    ],
    "formulaIds": [
      "thermo-first-law",
      "thermo-enthalpy",
      "thermo-cycle"
    ],
    "sourceIds": [
      "openstax-thermal-v06",
      "openstax-physics-v05"
    ],
    "questions": [
      {
        "prompt": "15 kW Wärmeaufnahme und 5 kW Fluidverdichterleistung: ideale Wärmeabgabe?",
        "correct": "20 kW",
        "wrong": [
          "10 kW",
          "15 kW"
        ],
        "explanation": "Bei stationärem idealisiertem Kreislauf addieren sich Wärmeaufnahme und dem Fluid zugeführte Arbeit. Die elektrische Eingangsleistung ist ohne Verlustmodell nicht automatisch dieselbe."
      },
      {
        "prompt": "Was bedeutet h3 = h4 im Drosselmodell?",
        "correct": "Adiabate Drosselung ohne Wellenarbeit und vernachlässigte Bewegungs-/Lageenergie.",
        "wrong": [
          "Temperaturen sind immer gleich.",
          "Jede beliebige Expansion ist isenthalp."
        ],
        "explanation": "Enthalpie bleibt nur unter den angegebenen Bilanzannahmen gleich. Druck und Temperatur können sich trotzdem ändern; es ist keine universelle Expansionseigenschaft."
      },
      {
        "prompt": "Genügen fiktive Enthalpiewerte für einen realen log-p-h-Nachweis?",
        "correct": "Nein, validierte Stoff- und Zustandsdaten fehlen.",
        "wrong": [
          "Ja, wenn die Bilanz rechnerisch stimmt.",
          "Ja, jede Flüssigkeit hat dieselbe Enthalpie."
        ],
        "explanation": "Eine konsistente Zahlenbilanz prüft das Modell, bestätigt aber keine reale Stoffeigenschaft. Druckreferenz, Stoffdatenquelle und Systemgrenze müssen zusätzlich geklärt sein."
      }
    ]
  }
];
