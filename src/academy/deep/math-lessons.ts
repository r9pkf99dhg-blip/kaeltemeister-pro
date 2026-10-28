import type { FoundationLesson } from "../foundations/model";
export const math_lessons: FoundationLesson[] = [
  {
    "id": "math-geometry",
    "domainId": "mathematik",
    "title": "Maßstab, Flächen und Rohrquerschnitte",
    "goal": "Längen, Flächen und Ringquerschnitte mit einer Skizze und Einheiten erklären.",
    "why": "Ein Rohrquerschnitt bestimmt ein geometrisches Verhältnis. Für eine fachliche Auswahl eines Rohres fehlen dagegen Strömung, Druckverlust, Öltransport, Betriebsdaten und Sicherheitsanforderungen. Geometrie ist ein erster Baustein.",
    "basic": "Ein Maßstab 1:20 bildet 1 cm auf dem Plan auf 20 cm in Wirklichkeit ab. Längen werden mit 20, Flächen mit \\(20^2\\), Volumen mit \\(20^3\\) skaliert. Ein Rechteck hat \\(A=ab\\), ein Dreieck die halbe Grundseite mal zugehörige Höhe. Beim Kreis ist der Radius die Hälfte des Durchmessers.",
    "reasoning": "Ein Kreis kann in viele schmale Sektoren zerlegt werden. Abwechselnd aneinandergelegt nähern sie ein Rechteck mit Breite \\(\\pi r\\) und Höhe \\(r\\) an: \\(A=\\pi r^2=\\frac{\\pi d^2}{4}\\). Eine Ringfläche ist Außenkreis minus Innenkreis. Die Wanddicke ist \\(s=\\frac{d_a-d_i}{2}\\), also \\(d_i=d_a-2s\\).",
    "transfer": "Bei einem gleichmäßig runden Rohr ist die innere freie Querschnittsfläche für das geometrische Innenvolumen relevant, die Ringfläche dagegen für den Materialquerschnitt. Nominale Produktbezeichnungen ersetzen keine tatsächlich angegebenen Innenmaße. Prüfe den Durchmesserbezug vor jeder Rechnung.",
    "example": "Ein fiktives Rohr mit Außendurchmesser 24 mm und Wanddicke 2 mm hat innen 20 mm. Nach Umrechnung \\(d_i=0{,}020\\,\\mathrm m\\) ergibt \\(A_i=\\pi\\cdot0{,}020^2/4\\approx0{,}000314159\\,\\mathrm{m^2}=314{,}159\\,\\mathrm{mm^2}\\).",
    "derivation": [
      "\\(r=\\frac d2\\Rightarrow A=\\pi(\\frac d2)^2=\\frac{\\pi d^2}{4}\\).",
      "\\(A_\\mathrm{Ring}=\\frac\\pi4(d_a^2-d_i^2)\\), mit \\(0\\le d_i<d_a\\).",
      "\\(1\\,\\mathrm{mm^2}=(10^{-3}\\,\\mathrm m)^2=10^{-6}\\,\\mathrm{m^2}\\)."
    ],
    "mistakes": [
      "Den Durchmesser statt des Radius in πr² einsetzen: Ergebnis vierfach zu groß.",
      "20 mm als 0,02 m umrechnen, aber den Flächenfaktor nicht quadrieren."
    ],
    "summary": "Längen-, Flächen- und Volumenfaktoren unterscheiden sich. Innenkreis und Materialring beantworten unterschiedliche Fragen. Eine richtige geometrische Rechnung liefert noch keine zulässige Rohrleitungsdimensionierung.",
    "prerequisites": [
      "math-units",
      "math-powers"
    ],
    "formulaIds": [
      "geo-circle",
      "geo-annulus"
    ],
    "sourceIds": [
      "openstax-precalculus-v06"
    ],
    "questions": [
      {
        "prompt": "Wie lautet die Kreisfläche mit Durchmesser d?",
        "correct": "\\(A=\\frac{\\pi d^2}{4}\\)",
        "wrong": [
          "\\(A=\\pi d^2\\)",
          "\\(A=\\pi d\\)"
        ],
        "explanation": "Der Radius ist d/2. Sein Quadrat bringt den Faktor 1/4; πd ist dagegen der Umfang, also eine Länge."
      },
      {
        "prompt": "24 mm außen, 2 mm Wand: Innendurchmesser?",
        "correct": "20 mm",
        "wrong": [
          "22 mm",
          "26 mm"
        ],
        "explanation": "Die Wand liegt auf beiden Seiten des Querschnitts: 24 − 2 × 2 = 20 mm. Innen- und Außenmaß müssen unterschieden werden."
      },
      {
        "prompt": "Darf aus der Ringfläche allein ein Kältemittelrohr ausgewählt werden?",
        "correct": "Nein, Betriebs- und Strömungsdaten fehlen.",
        "wrong": [
          "Ja, jede größere Fläche ist geeignet.",
          "Ja, die Wanddicke reicht aus."
        ],
        "explanation": "Geometrie beschreibt Maße. Druckverlust, Öltransport, Festigkeit und Betriebszustände erfordern eigene validierte Modelle und Daten."
      }
    ]
  },
  {
    "id": "math-pipe-volume",
    "domainId": "mathematik",
    "title": "Rohrvolumen und Oberflächen",
    "goal": "Innenvolumen, Mantelfläche und Stirnflächen eines idealen geraden Zylinders unterscheiden.",
    "why": "Volumina und Oberflächen dienen verschiedenen Betrachtungen: Inhalt, Material und Wärmeübertragungsfläche sind nicht austauschbar. Ein realistisches Leitungssystem enthält zudem Bögen, Formstücke, Toleranzen und Einbauten.",
    "basic": "Ein gerader Zylinder entsteht aus einer konstanten Kreisfläche entlang der Länge. Sein Volumen ist \\(V=AL\\). Der abgerollte Mantel ist ein Rechteck aus Umfang und Länge, also \\(A_M=\\pi dL\\). Ein geschlossener Vollzylinder hätte zusätzlich zwei Kreisflächen.",
    "reasoning": "Beim offenen Rohr existieren innerer und äußerer Mantel und zwei ringförmige Stirnflächen. Das Materialvolumen ist \\(V_M=\\frac\\pi4(d_a^2-d_i^2)L\\). Die Summe aller geometrischen Oberflächen lautet \\(\\pi(d_a+d_i)L+2A_\\mathrm{Ring}\\); eine thermisch wirksame Fläche muss gesondert festgelegt werden.",
    "transfer": "Wähle die passende Systemgrenze: Für den geometrischen Inhalt gilt der Innendurchmesser. Für eine äußere Dämmfläche gilt der Außendurchmesser. Das Ergebnis sagt noch nichts über eine zulässige Füllmenge, reale Kältemittelverteilung oder eine Dämmstoffauslegung aus.",
    "example": "Innen 20 mm, Länge 10 m: \\(V=\\frac\\pi4\\cdot0{,}020^2\\cdot10=0{,}00314159\\,\\mathrm{m^3}=3{,}14159\\,\\mathrm L\\). Außen 24 mm: \\(A_M=\\pi\\cdot0{,}024\\cdot10=0{,}753982\\,\\mathrm{m^2}\\). Beide Zahlen beantworten unterschiedliche Fragen.",
    "derivation": [
      "\\(V=\\int_0^L A\\,dx=AL\\) bei konstantem Querschnitt.",
      "\\(A_M=UL=\\pi dL\\), weil der abgewickelte Mantel ein Rechteck ist.",
      "\\(V_M=(A_a-A_i)L\\); für das Innenvolumen wird nur \\(A_i\\) verwendet."
    ],
    "mistakes": [
      "Außendurchmesser für das Innenvolumen verwenden.",
      "Die beiden Stirnflächen unbemerkt zur Mantelfläche addieren oder Liter mit Kubikmetern gleichsetzen."
    ],
    "summary": "Innenvolumen, Materialvolumen und Oberflächen benötigen verschiedene geometrische Grenzen. Die geraden Zylinderformeln gelten bei konstantem Querschnitt; eine reale Leitungs- oder Stoffauslegung ist damit noch nicht durchgeführt.",
    "prerequisites": [
      "math-geometry"
    ],
    "formulaIds": [
      "geo-volume",
      "geo-surface"
    ],
    "sourceIds": [
      "openstax-precalculus-v06"
    ],
    "questions": [
      {
        "prompt": "Welcher Durchmesser bestimmt das geometrische Innenvolumen?",
        "correct": "Innendurchmesser",
        "wrong": [
          "Außendurchmesser",
          "Mittelwert beider Durchmesser"
        ],
        "explanation": "Der nutzbare Innenraum wird vom inneren Kreis begrenzt. Der Außenkreis enthält zusätzlich das Wandmaterial und wäre für diesen Zweck falsch."
      },
      {
        "prompt": "Welche Einheit hat πdL?",
        "correct": "m²",
        "wrong": [
          "m³",
          "m"
        ],
        "explanation": "π ist dimensionslos und d sowie L sind Längen. Ihr Produkt ist daher eine Fläche, konkret die Mantelfläche des Zylinders."
      },
      {
        "prompt": "Was begrenzt V = AL bei einem Rohr?",
        "correct": "Konstanter innerer Querschnitt und gerader idealer Abschnitt.",
        "wrong": [
          "Keine Annahmen notwendig.",
          "Gültig nur bei Luft."
        ],
        "explanation": "Die Formel beschreibt ein geometrisches Modell unabhängig vom Füllstoff; Formstücke und Querschnittsänderungen müssen separat modelliert werden."
      }
    ]
  },
  {
    "id": "math-triangles",
    "domainId": "mathematik",
    "title": "Pythagoras und geometrische Leitungswege",
    "goal": "Rechtwinklige Dreiecke erkennen und eine Diagonale von einem Weg über zwei Schenkel unterscheiden.",
    "why": "Eine diagonale Montageverbindung ist kürzer als ein Weg entlang zweier rechtwinkliger Seiten. Mathematisch berechnete Strecken berücksichtigen keine Mindestbiegeradien, Montagezugaben oder bauliche Randbedingungen.",
    "basic": "Nur im rechtwinkligen Dreieck gilt \\(a^2+b^2=c^2\\). Die Hypotenuse c liegt dem rechten Winkel gegenüber und ist die längste Seite. Für eine fehlende Kathete gilt \\(a=\\sqrt{c^2-b^2}\\), sofern \\(c\\ge b\\ge0\\).",
    "reasoning": "Ein Flächenbeweis vergleicht vier identische rechtwinklige Dreiecke in einem Quadrat: \\((a+b)^2=4\\frac{ab}{2}+c^2\\). Nach Ausmultiplizieren und Abziehen von 2ab bleibt \\(a^2+b^2=c^2\\). Bei Längen wird die nicht negative Wurzel gewählt.",
    "transfer": "Eine Leitungsführung über 3 m waagrecht und 4 m senkrecht ist entlang der Kanten 7 m lang; eine ideal mögliche direkte Diagonale ist 5 m. Ob sie montierbar ist, entscheidet nicht Pythagoras. Ein Grundriss mit unbekanntem Winkel erlaubt den Satz nicht ohne Weiteres.",
    "example": "Für \\(a=3\\,\\mathrm m,b=4\\,\\mathrm m\\) folgt \\(c=\\sqrt{9+16}\\,\\mathrm m=5\\,\\mathrm m\\). Rückprobe: \\(5^2-4^2=9\\), also \\(a=3\\,\\mathrm m\\). Der Vergleich mit 7 m ist eine geometrische Wegbetrachtung ohne Montagezuschlag.",
    "derivation": [
      "\\((a+b)^2=2ab+c^2\\).",
      "\\(a^2+2ab+b^2=2ab+c^2\\Rightarrow a^2+b^2=c^2\\).",
      "\\(c=\\sqrt{a^2+b^2}\\ge\\max(a,b)\\) für nicht negative Längen."
    ],
    "mistakes": [
      "Die Hypotenuse mit einer Kathete verwechseln.",
      "Pythagoras bei beliebigem Winkel anwenden oder a + b als Diagonale ausgeben."
    ],
    "summary": "Pythagoras verknüpft die Seiten eines rechtwinkligen Dreiecks. Die Diagonale ist mindestens so groß wie jede Kathete und höchstens so lang wie deren Summe. Geometrische Machbarkeit und technische Montage sind getrennt zu bewerten.",
    "prerequisites": [
      "math-powers",
      "math-geometry"
    ],
    "formulaIds": [
      "geo-pythagoras"
    ],
    "sourceIds": [
      "openstax-precalculus-v06"
    ],
    "questions": [
      {
        "prompt": "Rechtwinklig: 3 m und 4 m. Hypotenuse?",
        "correct": "5 m",
        "wrong": [
          "7 m",
          "25 m"
        ],
        "explanation": "Erst quadrieren und addieren: 9 + 16 = 25 m². Die Wurzel liefert 5 m; 7 m wäre der Weg über beide Katheten."
      },
      {
        "prompt": "Wann gilt a² + b² = c²?",
        "correct": "Bei rechtem Winkel zwischen a und b.",
        "wrong": [
          "Bei jedem Dreieck.",
          "Nur bei gleich langen Katheten."
        ],
        "explanation": "Die Beziehung setzt ein rechtwinkliges Dreieck voraus. c liegt dem rechten Winkel gegenüber; gleich lange Katheten sind nicht erforderlich."
      },
      {
        "prompt": "Sind 5 m Diagonale automatisch die bestellbare Rohrlänge?",
        "correct": "Nein, Montagebedingungen und Zugaben fehlen.",
        "wrong": [
          "Ja, immer.",
          "Nein, Diagonalen existieren nicht."
        ],
        "explanation": "Die Rechnung liefert nur die ideale geometrische Strecke. Bögen, Anschlüsse und bauliche Randbedingungen sind noch nicht berücksichtigt."
      }
    ]
  },
  {
    "id": "math-trigonometry",
    "domainId": "mathematik",
    "title": "Winkel, Trigonometrie und Gefälle",
    "goal": "Sinus, Kosinus, Tangens sowie Grad, Bogenmaß und Steigung mit rechtwinkligen Dreiecken anwenden.",
    "why": "Winkel bestimmen Seitenverhältnisse. Bei Leitungswegen unterscheidet die horizontale Projektion die Steigung von einer Länge entlang des schrägen Weges. Ein mathematisches Gefälle ist keine normative Vorgabe für eine Installation.",
    "basic": "Im rechtwinkligen Dreieck: \\(\\sin\\alpha=\\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}\\), \\(\\cos\\alpha=\\frac{\\text{Ankathete}}{\\text{Hypotenuse}}\\), \\(\\tan\\alpha=\\frac{\\text{Gegenkathete}}{\\text{Ankathete}}\\). Ähnliche Dreiecke besitzen dieselben Verhältnisse. Ein Vollkreis entspricht \\(360^\\circ=2\\pi\\,\\mathrm{rad}\\).",
    "reasoning": "Das Bogenmaß ist Bogenlänge geteilt durch Radius und deshalb dimensionslos mit dem besonderen Einheitennamen rad. Umrechnung: \\(\\alpha_\\mathrm{rad}=\\alpha_\\mathrm{deg}\\frac\\pi{180}\\). Die Steigung \\(s=\\frac{\\Delta h}{L_\\mathrm{horizontal}}=\\tan\\alpha\\); der Winkel folgt mit arctan. Zwei Prozent bedeutet 0,02, nicht zwei Grad.",
    "transfer": "Prüfe zuerst, ob das Dreieck rechtwinklig ist, welchen Winkel du betrachtest und welche Seite gegenüberliegt. Die Rechenfunktionen dieses Lernkerns erwarten Bogenmaß. Ein negativer Höhenunterschied bezeichnet ein gerichtetes Gefälle; die Beispielaufgaben verwenden ausdrücklich positive Beträge.",
    "example": "Bei 4 m horizontal und 3 m Höhe ist \\(s=\\frac34=0{,}75=75\\%\\) und \\(\\alpha=\\arctan(0{,}75)\\approx36{,}870^\\circ\\). Die schräge Länge ist 5 m. Mit 2 % Gefälle auf 10 m horizontal ergibt sich 0,2 m Höhenunterschied und etwa 1,146°.",
    "derivation": [
      "Ähnlichkeit erhält \\(\\frac{G}{A}\\); damit definiert der Winkel das Seitenverhältnis.",
      "\\(180^\\circ=\\pi\\,\\mathrm{rad}\\Rightarrow30^\\circ=\\frac\\pi6\\,\\mathrm{rad}\\).",
      "\\(G=A\\tan\\alpha\\), und umgekehrt \\(\\alpha=\\arctan\\frac GA\\) für positive Ankathete."
    ],
    "mistakes": [
      "Gradwerte direkt in eine rad-Funktion einsetzen.",
      "Prozentgefälle mit Grad gleichsetzen oder die schräge Länge statt der horizontalen Projektion verwenden."
    ],
    "summary": "Trigonometrie verbindet Winkel mit Seitenverhältnissen. Grad und Bogenmaß sind unterschiedliche Zahlenwerte desselben Winkels. Prozentsteigung bezieht sich auf die horizontale Strecke und liefert keine fachliche Installationsfreigabe.",
    "prerequisites": [
      "math-triangles",
      "math-percent"
    ],
    "formulaIds": [
      "geo-trig",
      "geo-slope"
    ],
    "sourceIds": [
      "openstax-precalculus-v06"
    ],
    "questions": [
      {
        "prompt": "Was bedeutet ein Gefälle von 2 % über 10 m horizontal?",
        "correct": "0,2 m Höhenunterschied",
        "wrong": [
          "2 m Höhenunterschied",
          "2° Winkel"
        ],
        "explanation": "2 Prozent sind 0,02. Der Höhenunterschied ist 10 m × 0,02 = 0,2 m. Der zugehörige Winkel beträgt arctan(0,02), nicht 2°."
      },
      {
        "prompt": "30° entsprechen welchem Bogenmaß?",
        "correct": "\\(\\frac\\pi6\\,\\mathrm{rad}\\)",
        "wrong": [
          "\\(30\\,\\mathrm{rad}\\)",
          "\\(6\\pi\\,\\mathrm{rad}\\)"
        ],
        "explanation": "Eine halbe Umdrehung ist π rad und 180°. Mit dem Faktor π/180 folgt für 30° genau π/6 rad; die Umrechnung ist vor Sinus/Tangens nötig."
      },
      {
        "prompt": "Gegenkathete gesucht, Ankathete und Winkel gegeben: welche Beziehung?",
        "correct": "\\(G=A\\tan\\alpha\\)",
        "wrong": [
          "\\(G=A\\cos\\alpha\\)",
          "\\(G=\\frac A{\\sin\\alpha}\\)"
        ],
        "explanation": "Der Tangens ist Gegenkathete geteilt durch Ankathete. Multiplikation beider Seiten mit der Ankathete isoliert die gesuchte Gegenkathete."
      }
    ]
  },
  {
    "id": "math-domains",
    "domainId": "mathematik",
    "title": "Bruchgleichungen, Wurzeln und Definitionsbereiche",
    "goal": "Vor dem Umformen verbotene Werte festhalten und Scheinlösungen durch eine Probe erkennen.",
    "why": "Beim Multiplizieren mit einem variablen Nenner oder beim Quadrieren kann eine scheinbar plausible Lösung entstehen, die in der ursprünglichen Gleichung nicht zulässig ist. Deshalb gehört der Definitionsbereich zum Lösungsweg.",
    "basic": "Eine Bruchgleichung enthält die Variable im Nenner: \\(\\frac6{x-1}=3\\), also zunächst \\(x\\ne1\\). Multipliziere mit \\(x-1\\) auf diesem Bereich: \\(6=3(x-1)\\). Daraus folgen \\(x-1=2\\) und \\(x=3\\). Die Probe im Original ergibt 6/2 = 3.",
    "reasoning": "Quadrieren ist auf allen reellen Zahlen nicht umkehrbar: Aus \\(a=b\\) folgt \\(a^2=b^2\\), aber auch a = −b hat dieselben Quadrate. Bei \\(\\sqrt{x+1}=x-1\\) gelten x ≥ 1. Quadrieren liefert x + 1 = x² − 2x + 1 und Kandidaten 0 oder 3; nur 3 erfüllt Bereich und Original.",
    "transfer": "Für technische Umstellungen dokumentierst du positive Größen und Nullbedingungen separat. Aus x² = 9 folgen mathematisch zwei reelle Werte ±3; eine geometrische Länge ist nur der positive. Durch x zu teilen kann die Lösung x = 0 verlieren. Eine Zahlenprobe allein beweist keine allgemeine Äquivalenz.",
    "example": "\\(\\sqrt{x+1}=x-1\\): Kandidat 0 scheitert an \\(1\\ne-1\\), Kandidat 3 ergibt \\(2=2\\). Bei \\(x(x-2)=0\\) sind dagegen 0 und 2 Lösungen. Durch x zu teilen würde die erlaubte Nullstelle 0 entfernen; verwende das Nullprodukt.",
    "derivation": [
      "Bereich der Bruchgleichung zuerst: \\(x-1\\ne0\\).",
      "\\(\\sqrt{x+1}=x-1\\Rightarrow x\\ge1\\); Quadrieren liefert nur Kandidaten.",
      "\\(x(x-2)=0\\Rightarrow x=0\\text{ oder }x=2\\), ohne unzulässige Division."
    ],
    "mistakes": [
      "Die durch den Nenner ausgeschlossenen Werte nach dem Kürzen wieder zulassen.",
      "Quadratische Kandidaten ungeprüft übernehmen oder durch eine möglicherweise nullwertige Variable teilen."
    ],
    "summary": "Äquivalente Schritte erhalten genau die ursprüngliche Lösungsmenge. Definitionsbereich, Nullbedingungen und Rückprobe sind deshalb Teil der Lösung. Quadrieren kann Lösungen hinzufügen, Division durch eine Variable kann Lösungen entfernen.",
    "prerequisites": [
      "math-equations",
      "math-rearrange"
    ],
    "formulaIds": [
      "algebra-domain"
    ],
    "sourceIds": [
      "openstax-precalculus-v06"
    ],
    "questions": [
      {
        "prompt": "6/(x−1) = 3: zulässige Lösung?",
        "correct": "x = 3",
        "wrong": [
          "x = 1",
          "x = −1"
        ],
        "explanation": "Zuerst x ≠ 1 festhalten. Nach Multiplikation mit x − 1 folgt 6 = 3x − 3, also x = 3. Die Originalprobe bestätigt 6/2 = 3."
      },
      {
        "prompt": "Warum ist x = 0 keine Lösung von √(x+1) = x−1?",
        "correct": "Die Originalgleichung ergäbe 1 = −1.",
        "wrong": [
          "Null ist immer verboten.",
          "Wurzeln haben keine Lösungen."
        ],
        "explanation": "Der rechte Ausdruck muss nicht negativ sein. x = 0 entsteht als Scheinlösung beim Quadrieren und scheitert an der Originalgleichung."
      },
      {
        "prompt": "x(x−2) = 0: Warum nicht sofort durch x teilen?",
        "correct": "Die erlaubte Lösung x = 0 ginge verloren.",
        "wrong": [
          "Weil 2 keine Zahl ist.",
          "Weil Produkte nie null sind."
        ],
        "explanation": "Division durch x setzt x ≠ 0 voraus. Das Nullprodukt berücksichtigt beide Faktoren und erhält die beiden Lösungen 0 und 2."
      }
    ]
  },
  {
    "id": "math-systems-quadratic",
    "domainId": "mathematik",
    "title": "Lineare Systeme und quadratische Gleichungen",
    "goal": "Zwei gekoppelte Gleichungen lösen und bei quadratischen Gleichungen alle reellen Lösungen bewerten.",
    "why": "Zwei unbekannte Größen benötigen passende unabhängige Beziehungen. Eine große Anzahl Zahlen ist noch keine komplexe Fachanalyse: Erst Eindeutigkeit, Wertebereich und technische Interpretation begründen die gewählte Lösung.",
    "basic": "Für \\(x+y=5\\) und \\(2x-y=1\\) addierst du die Gleichungen: \\(3x=6\\), daher x = 2 und y = 3. Identische Geraden liefern unendlich viele, parallele verschiedene Geraden keine Lösung. Ein lineares System hat bei Determinante \\(ae-bd\\ne0\\) genau eine Lösung.",
    "reasoning": "Bei \\(x^2-5x+6=0\\) hilft Faktorisieren: \\((x-2)(x-3)=0\\). Allgemein liefert quadratische Ergänzung \\(x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\) für a ≠ 0. Negative Diskriminante bedeutet keine reelle Lösung; null eine doppelte, positiv zwei. Der Lernrechner fragt ausdrücklich nach der größeren reellen Nullstelle.",
    "transfer": "Gleichungssysteme können Bilanzbeziehungen abbilden, aber nur bei konsistenten Annahmen. Quadratische Wurzeln müssen in die ursprünglichen Bedingungen eingesetzt werden. Beide mathematischen Lösungen sind anzugeben, bevor beispielsweise eine positive Länge oder ein zulässiger Betriebspunkt ausgewählt wird.",
    "example": "Addition ergibt x = 2; Einsetzen in x + y = 5 liefert y = 3. Rückprobe: 2·2 − 3 = 1. Für x² − 5x + 6 sind 2 und 3 zulässig, weil 4 − 10 + 6 = 0 und 9 − 15 + 6 = 0. Die größere ist 3, die kleinere bleibt mathematisch erhalten.",
    "derivation": [
      "\\(ax+by=c,\\ dx+ey=f\\Rightarrow(ae-bd)x=ce-bf\\).",
      "\\(x=\\frac{ce-bf}{ae-bd}\\) nur bei nicht verschwindender Determinante.",
      "\\((x+\\frac b{2a})^2=\\frac{b^2-4ac}{4a^2}\\); beide Vorzeichen beachten."
    ],
    "mistakes": [
      "Zwei voneinander abhängige Gleichungen als eindeutiges System behandeln.",
      "Bei quadratischen Gleichungen das ± vergessen oder einen Kandidaten ohne Prüfung verwerfen."
    ],
    "summary": "Ein lineares System benötigt unabhängige Beziehungen für eine eindeutige Lösung. Quadratische Gleichungen besitzen je nach Diskriminante null, eine oder zwei reelle Nullstellen. Erst danach folgt die fachliche Bewertung des Wertebereichs.",
    "prerequisites": [
      "math-domains"
    ],
    "formulaIds": [
      "algebra-system",
      "algebra-quadratic"
    ],
    "sourceIds": [
      "openstax-precalculus-v06"
    ],
    "questions": [
      {
        "prompt": "x+y=5 und 2x−y=1: welches Paar erfüllt beide?",
        "correct": "x = 2, y = 3",
        "wrong": [
          "x = 3, y = 2",
          "x = 5, y = 0"
        ],
        "explanation": "Addition eliminiert y und liefert 3x = 6. x = 2 und y = 3 bestehen beide Originalgleichungen; allein die erste Gleichung reicht nicht."
      },
      {
        "prompt": "Welche reellen Nullstellen hat x²−5x+6?",
        "correct": "2 und 3",
        "wrong": [
          "Nur 3",
          "−2 und −3"
        ],
        "explanation": "(x − 2)(x − 3) = 0 liefert zwei Nullstellen. Eine Aufgabe darf nach der größeren fragen, aber die andere ist dennoch mathematisch gültig."
      },
      {
        "prompt": "Was bedeutet eine negative Diskriminante im reellen Modell?",
        "correct": "Keine reelle Lösung.",
        "wrong": [
          "Immer zwei positive Lösungen.",
          "Jede Zahl ist Lösung."
        ],
        "explanation": "Die reelle Quadratwurzel einer negativen Zahl existiert nicht. Komplexe Zahlen wären ein anderes Modell und werden hier nicht verwendet."
      }
    ]
  },
  {
    "id": "math-functions",
    "domainId": "mathematik",
    "title": "Funktionen, Kennlinien und logarithmische Begriffe",
    "goal": "Proportionalität, Interpolation und Logarithmen als klar begrenzte mathematische Modelle verstehen.",
    "why": "Eine technische Kennlinie ordnet einer Eingangsgröße eine Ausgangsgröße zu. Form, Gültigkeitsbereich und Datenherkunft entscheiden darüber, ob ein Modell fachlich verwendet werden darf. Die Beispielpunkte hier sind fiktiv und keine Herstellerdaten.",
    "basic": "Eine Funktion ordnet jedem zugelassenen Eingang genau einen Ausgang zu. Direkte Proportionalität \\(y=kx\\) hält y/x konstant, inverse \\(y=k/x\\) hält xy konstant bei x ≠ 0. Eine Gerade mit Achsenabschnitt y = mx + b ist nur bei b = 0 direkt proportional.",
    "reasoning": "Zwischen zwei Stützstellen bildet \\(y=y_0+(y_1-y_0)\\frac{x-x_0}{x_1-x_0}\\) eine Gerade. Nur x zwischen den Stützstellen ist Interpolation, außerhalb Extrapolation. Der Logarithmus kehrt eine Potenz um: \\(b^y=x\\Leftrightarrow y=\\log_b x\\), mit b > 0, b ≠ 1 und x > 0.",
    "transfer": "Eine reale Kennlinie darf zwischen Punkten gekrümmt sein. Lineare Interpolation liefert deshalb zunächst eine Näherung; ohne validierte Daten und Fehlerabschätzung keine Auslegung. Logarithmen werden später beim log-p-h-Diagramm wichtig. Der logarithmierte Zahlenwert benötigt eine definierte dimensionslose Bezugsgröße.",
    "example": "Fiktive Punkte (0, 10) und (10, 30): bei x = 5 liegt die lineare Interpolation bei 20. In einem inversen Modell mit xy = 12 gehört zu x = 3 der Wert y = 4. Da 10³ = 1000 gilt \\(\\log_{10}1000=3\\); der Logarithmus ist kein neuer Multiplikationsfaktor.",
    "derivation": [
      "\\(\\frac{y-y_0}{y_1-y_0}=\\frac{x-x_0}{x_1-x_0}\\) beschreibt gleiche relative Lage, falls die Nenner nicht null sind.",
      "Die Interpolationsform bleibt bei \\(y_1=y_0\\) als konstante Gerade verwendbar; nötig ist \\(x_1\\ne x_0\\).",
      "\\(\\log_b x=\\frac{\\ln x}{\\ln b}\\) bei \\(x,b>0, b\\ne1\\)."
    ],
    "mistakes": [
      "Einen Achsenabschnitt ignorieren oder Interpolation außerhalb des Datenbereichs behaupten.",
      "Den Logarithmus von null/negativen Zahlen im reellen Modell oder von einer unbezeichneten physikalischen Einheit verwenden."
    ],
    "summary": "Proportionale und inverse Beziehungen besitzen unterschiedliche Invarianten. Interpolation verbindet bekannte Stützstellen und benötigt ein Modell für den Zwischenbereich. Logarithmen invertieren Potenzen unter klaren Definitionsbedingungen.",
    "prerequisites": [
      "math-systems-quadratic",
      "math-trigonometry"
    ],
    "formulaIds": [
      "algebra-interpolation",
      "algebra-log"
    ],
    "sourceIds": [
      "openstax-precalculus-v06"
    ],
    "questions": [
      {
        "prompt": "Welche Beziehung ist umgekehrt proportional?",
        "correct": "xy = konstant bei x ≠ 0",
        "wrong": [
          "y/x = konstant",
          "y = x + 10"
        ],
        "explanation": "Bei inverser Proportionalität bleibt das Produkt gleich. Verdopplung der einen Größe halbiert die andere; y/x konstant beschreibt direkte Proportionalität."
      },
      {
        "prompt": "Zwischen (0,10) und (10,30): linearer Wert bei x=5?",
        "correct": "20",
        "wrong": [
          "15",
          "40"
        ],
        "explanation": "x = 5 liegt genau in der Mitte. Bei linearer Interpolation liegt auch y in der Mitte: 10 + (30 − 10) × 5/10 = 20."
      },
      {
        "prompt": "Welche Voraussetzungen hat log_b(x) im reellen Modell?",
        "correct": "x > 0, b > 0 und b ≠ 1",
        "wrong": [
          "x beliebig und b = 1",
          "Nur x ≠ 0"
        ],
        "explanation": "Eine positive Basis ungleich eins liefert eine umkehrbare Exponentialfunktion mit positivem Wertebereich; ihr Logarithmus ist daher nur für x > 0 definiert."
      }
    ]
  }
];
