import type { SimpleCore } from "./model";
export const simpleCores: SimpleCore[] = [
  {
    id: "math-arithmetic",
    introduction:
      "Beim Rechnen hilft eine feste Reihenfolge. Kläre zuerst, welche Größe du suchst und was ein Vorzeichen bedeutet.",
    levels: {
      grundlagen:
        "Eine Klammer fasst eine Rechnung zusammen. Rechne sie zuerst aus. Danach folgen Potenzen, dann Mal und Geteilt, zuletzt Plus und Minus. Bei 2 + 3 mal 4 wird zuerst 3 mal 4 gerechnet: Das ergibt 14. Mit (2 + 3) mal 4 erhältst du dagegen 20. Das Minuszeichen kann auch eine Richtung oder eine Änderung nach unten angeben.",
      fachkraft:
        "Gleichrangige Rechnungen wie Mal und Geteilt bearbeitest du von links nach rechts. Beim Multiplizieren zweier negativer Zahlen entsteht eine positive Zahl. Beim Subtrahieren einer negativen Zahl wird addiert. Notiere Vorzeichen und Klammern ausdrücklich. Zum Beispiel ist −2² gleich −4, aber (−2)² gleich 4. Ein Rechner darf diese beiden Eingaben nicht gleich behandeln.",
      meister:
        "Die Rechenregeln sagen noch nicht, ob ein Ergebnis zum Modell passt. Eine negative Zahl kann eine Richtung beschreiben; eine Länge im Betragsmodell kann dagegen nicht negativ sein. Teile niemals durch null. Rechne nach Möglichkeit ohne Zwischenrundung und prüfe am Ende Einheit und Größenordnung. Sehr große oder kleine Rechnerzahlen können den endlichen Zahlenbereich überschreiten.",
    },
    connections:
      "In einer Wärmeleistungsrechnung zuerst die Einheiten angleichen. Erst dann die Faktoren multiplizieren. Ein Vorzeichen braucht eine erklärte Richtung; ein Betrag ist nicht negativ.",
    summary:
      "Klammern zuerst, dann Potenzen, dann Mal/Geteilt, dann Plus/Minus. Gleichrangiges von links nach rechts. Vorzeichen und Modellgrenzen zusätzlich prüfen.",
  },
  {
    id: "math-algebra",
    introduction:
      "Ein Buchstabe hält den Platz für einen Zahlenwert oder eine Größe frei. So kannst du denselben Zusammenhang für mehrere Beispiele verwenden.",
    levels: {
      grundlagen:
        "Ein Term ist ein Rechenausdruck, zum Beispiel 3x + 2. Erst wenn du x kennst, kannst du ihn vollständig ausrechnen. Bei x = 4 wird daraus 3 mal 4 plus 2, also 14. Drei gleiche x und zwei weitere x ergeben zusammen fünf x. x und x² sind dagegen verschiedene Bausteine und dürfen nicht einfach zusammengezählt werden.",
      fachkraft:
        "Ausmultiplizieren bedeutet, dass ein Faktor jeden Teil in der Klammer multipliziert: 2(x + 3) wird 2x + 6. Beim Ausklammern gehst du diesen Weg zurück. Kürzen ist nur bei gemeinsamen Faktoren im ganzen Zähler und Nenner erlaubt. In (x + 2)/x darfst du x nicht aus der Summe streichen. Bei einem Nenner x muss x ungleich null sein.",
      meister:
        "Eine technische Formel verwendet Buchstaben für physikalische Größen mit Einheiten. Du kannst nur gleichartige Größen addieren. Aus einer algebraischen Umformung allein folgt keine physikalische Gültigkeit. Halte den ursprünglichen Definitionsbereich fest. Auch wenn sich ein Nenner wegkürzt, bleiben ursprünglich ausgeschlossene Werte ausgeschlossen, bis sie im Ausgangsausdruck gesondert geprüft sind.",
    },
    connections:
      "Technische Formeln bestehen aus Termen. Beim Umstellen müssen Gleichheit, zulässige Nenner und Bedeutung der Größen erhalten bleiben.",
    summary:
      "Nur gleichartige Terme zusammenfassen. Klammern vollständig ausmultiplizieren. Aus Summen nicht beliebig kürzen; ursprüngliche Nullbedingungen behalten.",
  },
  {
    id: "math-powers",
    introduction:
      "Potenzen verkürzen wiederholtes Multiplizieren. Wurzeln fragen nach einem passenden Ausgangswert. Beides brauchst du bei Flächen, Volumen und Vorsilben.",
    levels: {
      grundlagen:
        "Drei hoch zwei bedeutet drei mal drei und ergibt neun. Die Quadratwurzel von neun ist als Hauptwurzel die nicht negative Zahl drei. Hoch drei bedeutet drei gleiche Faktoren. Ein Millimeter ist ein Tausendstel Meter. Für einen Quadratmillimeter musst du diesen Faktor zweimal anwenden: Ein Quadratmillimeter ist ein Millionstel Quadratmeter.",
      fachkraft:
        "Bei gleicher Basis addierst du beim Multiplizieren die Exponenten. Zwei hoch drei mal zwei hoch zwei ergibt zwei hoch fünf. Ein negativer ganzzahliger Exponent bildet einen Kehrwert: Zwei hoch minus drei ist ein Achtel. Die Basis darf dafür nicht null sein. Ziehst du eine reelle Quadratwurzel, muss der Wert unter der Wurzel nicht negativ sein.",
      meister:
        "Die Hauptwurzel von x² ist der Betrag von x. Aus x² = 9 folgen deshalb x = 3 und x = −3. Wenn x eine nicht negative Länge beschreibt, bleibt nur die passende Länge. Beim Quadrieren können zusätzliche Lösungen entstehen: Setze Kandidaten in die Ausgangsgleichung ein. Eine Rechnerausgabe prüft Definitionsbereich und physikalische Bedeutung nicht automatisch.",
    },
    connections:
      "Bei Flächen werden Längenfaktoren quadriert, bei Volumen hoch drei genommen. Beim Rückrechnen eines Durchmessers wählst du die nicht negative geometrische Wurzel.",
    summary:
      "Potenzen und Wurzeln mit passendem Definitionsbereich verwenden. Einheitenfaktoren für Fläche und Volumen ebenfalls potenzieren. Lösungskandidaten in der Originalgleichung prüfen.",
  },

  {
    id: "math-fractions",
    introduction:
      "Brüche verstehen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Stell dir einen ganzen Kuchen vor. Der Nenner sagt, in wie viele gleich große Teile er geteilt wird. Der Zähler zählt diese Teile. Ein Nenner darf nie null sein. Ein halber und ein Viertelkuchen ergeben zusammen drei Viertel.",
      fachkraft:
        "Beim Addieren brauchst du gleich große Teile. Aus einem Halb werden deshalb zwei Viertel. Beim Multiplizieren werden Zähler miteinander und Nenner miteinander multipliziert. Beim Teilen drehst du den zweiten Bruch um; er darf nicht null sein.",
      meister:
        "Kürzen heißt, Zähler und Nenner durch denselben von null verschiedenen Faktor zu teilen. Aus einer Summe darfst du nicht einfach einen Summanden wegkürzen. Ein Doppelbruch kann eine technische Formel beschreiben. Ob diese Formel zum Bauteil passt, musst du zusätzlich prüfen.",
    },
    connections:
      "Technikbezug: Kürzen heißt, Zähler und Nenner durch denselben von null verschiedenen Faktor zu teilen. Aus einer Summe darfst du nicht einfach einen Summanden wegkürzen. Ein Doppelbruch kann eine technische Formel beschreiben. Ob diese Formel zum Bauteil passt, musst du zusätzlich prüfen.",
    summary:
      "Stell dir einen ganzen Kuchen vor. Der Nenner sagt, in wie viele gleich große Teile er geteilt wird. Der Zähler zählt diese Teile. Ein Nenner darf nie null sein. Ein halber und ein Viertelkuchen ergeben zusammen drei Viertel. Wichtig für die Anwendung: Kürzen heißt, Zähler und Nenner durch denselben von null verschiedenen Faktor zu teilen. Aus einer Summe darfst du nicht einfach einen Summanden wegkürzen. Ein Doppelbruch kann eine technische Formel beschreiben. Ob diese Formel zum Bauteil passt, musst du zusätzlich prüfen.",
  },
  {
    id: "math-percent",
    introduction:
      "Prozent und Dreisatz: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Prozent bedeutet von hundert. 15 Prozent sind 15 von 100, also 0,15. Wenn du 15 Prozent von 200 suchst, rechnest du 200 mal 0,15. Du erhältst 30. Benenne zuerst, worauf sich der Prozentwert bezieht.",
      fachkraft:
        "Beim direkten Dreisatz gehst du zunächst auf eine Einheit zurück. Kosten drei gleiche Teile zusammen 12, kostet eines 4. Fünf kosten dann 20. Das geht nur, wenn der Preis pro Teil wirklich gleich bleibt. Technische Größen sind nicht automatisch proportional.",
      meister:
        "Ein Anstieg von 20 auf 25 Prozent sind fünf Prozentpunkte. Bezogen auf den Anfangswert ist das ein Zuwachs um 25 Prozent. Plus zehn Prozent und danach minus zehn Prozent heben sich nicht auf: Der zweite Grundwert ist bereits verändert. Bei Grundwert null ist ein relativer Anteil nicht definiert.",
    },
    connections:
      "Technikbezug: Ein Anstieg von 20 auf 25 Prozent sind fünf Prozentpunkte. Bezogen auf den Anfangswert ist das ein Zuwachs um 25 Prozent. Plus zehn Prozent und danach minus zehn Prozent heben sich nicht auf: Der zweite Grundwert ist bereits verändert. Bei Grundwert null ist ein relativer Anteil nicht definiert.",
    summary:
      "Prozent bedeutet von hundert. 15 Prozent sind 15 von 100, also 0,15. Wenn du 15 Prozent von 200 suchst, rechnest du 200 mal 0,15. Du erhältst 30. Benenne zuerst, worauf sich der Prozentwert bezieht. Wichtig für die Anwendung: Ein Anstieg von 20 auf 25 Prozent sind fünf Prozentpunkte. Bezogen auf den Anfangswert ist das ein Zuwachs um 25 Prozent. Plus zehn Prozent und danach minus zehn Prozent heben sich nicht auf: Der zweite Grundwert ist bereits verändert. Bei Grundwert null ist ein relativer Anteil nicht definiert.",
  },
  {
    id: "math-equations",
    introduction:
      "Gleichungen lösen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Eine Gleichung sagt: Links und rechts steht derselbe Wert. Wenn du auf beiden Seiten dieselbe Zahl addierst oder abziehst, bleibt die Gleichheit erhalten. Bei 2x + 5 = 17 ziehst du zuerst auf beiden Seiten 5 ab. Dann teilst du beide Seiten durch 2.",
      fachkraft:
        "Dein Ziel ist, die gesuchte Zahl allein auf eine Seite zu bringen. Dabei darfst du nur durch eine Zahl teilen, die nicht null ist. Setze dein Ergebnis danach in die ursprüngliche Gleichung ein. Stimmen beide Seiten überein, besteht die Zahlenprobe.",
      meister:
        "Bei ax + b = c musst du den Fall a = 0 getrennt prüfen. Falls dann b = c ist, passt jede reelle Zahl. Falls b und c verschieden sind, gibt es keine Lösung. Eine Probe bestätigt eine eingesetzte Zahl, aber nicht automatisch die Gleichwertigkeit aller Umformungsschritte.",
    },
    connections:
      "Technikbezug: Bei ax + b = c musst du den Fall a = 0 getrennt prüfen. Falls dann b = c ist, passt jede reelle Zahl. Falls b und c verschieden sind, gibt es keine Lösung. Eine Probe bestätigt eine eingesetzte Zahl, aber nicht automatisch die Gleichwertigkeit aller Umformungsschritte.",
    summary:
      "Eine Gleichung sagt: Links und rechts steht derselbe Wert. Wenn du auf beiden Seiten dieselbe Zahl addierst oder abziehst, bleibt die Gleichheit erhalten. Bei 2x + 5 = 17 ziehst du zuerst auf beiden Seiten 5 ab. Dann teilst du beide Seiten durch 2. Wichtig für die Anwendung: Bei ax + b = c musst du den Fall a = 0 getrennt prüfen. Falls dann b = c ist, passt jede reelle Zahl. Falls b und c verschieden sind, gibt es keine Lösung. Eine Probe bestätigt eine eingesetzte Zahl, aber nicht automatisch die Gleichwertigkeit aller Umformungsschritte.",
  },
  {
    id: "math-rearrange",
    introduction:
      "Technische Formeln umstellen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Eine technische Formel ist eine Gleichung mit Größen. Du darfst dieselben erlaubten Rechenschritte auf beiden Seiten machen. Bei U = R mal I und gesuchtem R teilst du beide Seiten durch I. Das ist nur erlaubt, wenn I nicht null ist.",
      fachkraft:
        "Finde zuerst die gesuchte Größe und den gesamten Faktor, der noch bei ihr steht. In Q = m mal c mal ΔT musst du für m durch das ganze Produkt c mal ΔT teilen. Klammern zeigen, welche Größen gemeinsam im Nenner stehen. Prüfe anschließend die Einheit.",
      meister:
        "Umformen und physikalisch anwenden sind zwei Aufgaben. Die Division braucht nicht verschwindende Nenner. Zusätzlich muss das Modell passen, etwa konstante Wärmekapazität ohne Phasenwechsel. Setze die gefundene Größe in die Originalformel ein. So erkennst du viele Rechen- und Einheitenfehler.",
    },
    connections:
      "Technikbezug: Umformen und physikalisch anwenden sind zwei Aufgaben. Die Division braucht nicht verschwindende Nenner. Zusätzlich muss das Modell passen, etwa konstante Wärmekapazität ohne Phasenwechsel. Setze die gefundene Größe in die Originalformel ein. So erkennst du viele Rechen- und Einheitenfehler.",
    summary:
      "Eine technische Formel ist eine Gleichung mit Größen. Du darfst dieselben erlaubten Rechenschritte auf beiden Seiten machen. Bei U = R mal I und gesuchtem R teilst du beide Seiten durch I. Das ist nur erlaubt, wenn I nicht null ist. Wichtig für die Anwendung: Umformen und physikalisch anwenden sind zwei Aufgaben. Die Division braucht nicht verschwindende Nenner. Zusätzlich muss das Modell passen, etwa konstante Wärmekapazität ohne Phasenwechsel. Setze die gefundene Größe in die Originalformel ein. So erkennst du viele Rechen- und Einheitenfehler.",
  },
  {
    id: "math-units",
    introduction:
      "Einheiten sicher umrechnen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Zahl und Einheit gehören zusammen. Ein Kilowatt sind tausend Watt. Eine Stunde hat 3600 Sekunden. Daher teilst du einen Massenstrom in Kilogramm pro Stunde durch 3600, wenn du Kilogramm pro Sekunde brauchst. Schreibe die Einheit bei jedem Zwischenschritt dazu.",
      fachkraft:
        "Bei Flächen wird auch der Längenfaktor quadriert, bei Volumen wird er hoch drei genommen. Ein Millimeter ist ein Tausendstel Meter. Ein Quadratmillimeter ist deshalb ein Millionstel Quadratmeter. Energie und Leistung sind verschieden: Watt ist Joule pro Sekunde.",
      meister:
        "Absolute Temperatur und Temperaturänderung sind verschieden. Minus zehn Grad Celsius entsprechen 263,15 Kelvin. Eine Erwärmung von minus zehn auf minus vier Grad Celsius beträgt dagegen sechs Kelvin. Bei einer Differenz fällt der gleiche Offset auf beiden Seiten weg. Prüfe immer, welche Größe gefragt ist.",
    },
    connections:
      "Technikbezug: Absolute Temperatur und Temperaturänderung sind verschieden. Minus zehn Grad Celsius entsprechen 263,15 Kelvin. Eine Erwärmung von minus zehn auf minus vier Grad Celsius beträgt dagegen sechs Kelvin. Bei einer Differenz fällt der gleiche Offset auf beiden Seiten weg. Prüfe immer, welche Größe gefragt ist.",
    summary:
      "Zahl und Einheit gehören zusammen. Ein Kilowatt sind tausend Watt. Eine Stunde hat 3600 Sekunden. Daher teilst du einen Massenstrom in Kilogramm pro Stunde durch 3600, wenn du Kilogramm pro Sekunde brauchst. Schreibe die Einheit bei jedem Zwischenschritt dazu. Wichtig für die Anwendung: Absolute Temperatur und Temperaturänderung sind verschieden. Minus zehn Grad Celsius entsprechen 263,15 Kelvin. Eine Erwärmung von minus zehn auf minus vier Grad Celsius beträgt dagegen sechs Kelvin. Bei einer Differenz fällt der gleiche Offset auf beiden Seiten weg. Prüfe immer, welche Größe gefragt ist.",
  },
  {
    id: "electric-quantities",
    introduction:
      "Elektrische Grundgrößen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Elektrische Ladung ist eine eigene Größe. Strom sagt dir, wie viel Ladung pro Zeit durch einen Querschnitt transportiert wird. Spannung beschreibt Energie pro Ladung. Ein Widerstand begrenzt im einfachen ohmschen Modell den Strom. Die Einheiten sind Coulomb, Ampere, Volt und Ohm.",
      fachkraft:
        "Ein größeres Strommesssignal bedeutet nicht automatisch eine größere Spannung. Benenne zuerst die Größen und die betrachtete Schaltung. Im stationären Gleichstrommodell gilt I = Q durch t. Die Zeit muss zur Einheit des Stroms passen: Ein Ampere ist ein Coulomb pro Sekunde.",
      meister:
        "Diese Grundbegriffe erklären ein Modell. Daraus folgt keine Erlaubnis, eine echte elektrische Anlage anzuschließen oder zu messen. Reale Bauteile und Schutzmaßnahmen brauchen passende Daten und fachliche Qualifikation. Auch eine kleine angegebene Spannung ist für sich kein Sicherheitsnachweis.",
    },
    connections:
      "Technikbezug: Diese Grundbegriffe erklären ein Modell. Daraus folgt keine Erlaubnis, eine echte elektrische Anlage anzuschließen oder zu messen. Reale Bauteile und Schutzmaßnahmen brauchen passende Daten und fachliche Qualifikation. Auch eine kleine angegebene Spannung ist für sich kein Sicherheitsnachweis.",
    summary:
      "Elektrische Ladung ist eine eigene Größe. Strom sagt dir, wie viel Ladung pro Zeit durch einen Querschnitt transportiert wird. Spannung beschreibt Energie pro Ladung. Ein Widerstand begrenzt im einfachen ohmschen Modell den Strom. Die Einheiten sind Coulomb, Ampere, Volt und Ohm. Wichtig für die Anwendung: Diese Grundbegriffe erklären ein Modell. Daraus folgt keine Erlaubnis, eine echte elektrische Anlage anzuschließen oder zu messen. Reale Bauteile und Schutzmaßnahmen brauchen passende Daten und fachliche Qualifikation. Auch eine kleine angegebene Spannung ist für sich kein Sicherheitsnachweis.",
  },
  {
    id: "electric-uir",
    introduction:
      "Spannung, Strom und Widerstand: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Stell dir Spannung, Strom und Widerstand zunächst als drei verschiedene Größen vor. Bei einem passenden ohmschen Bauteil gilt U = R mal I. Wenn der Widerstand gleich bleibt und die Spannung steigt, steigt im Modell auch der Strom.",
      fachkraft:
        "Aus U = R mal I kannst du I = U durch R oder R = U durch I machen. Der jeweilige Nenner darf nicht null sein. Volt durch Ohm ergibt Ampere. Volt durch Ampere ergibt Ohm. Die Einheit zeigt dir, ob du die richtige Größe berechnet hast.",
      meister:
        "Das ohmsche Modell ist keine universelle Beschreibung jedes Bauteils. Temperatur, Kennlinie und Betriebszustand können den Widerstand verändern. Eine rechnerisch richtige Beziehung erlaubt noch keine reale Auswahl oder elektrische Arbeit. Die Annahmen des jeweiligen Lernfalls gelten weiter.",
    },
    connections:
      "Technikbezug: Das ohmsche Modell ist keine universelle Beschreibung jedes Bauteils. Temperatur, Kennlinie und Betriebszustand können den Widerstand verändern. Eine rechnerisch richtige Beziehung erlaubt noch keine reale Auswahl oder elektrische Arbeit. Die Annahmen des jeweiligen Lernfalls gelten weiter.",
    summary:
      "Stell dir Spannung, Strom und Widerstand zunächst als drei verschiedene Größen vor. Bei einem passenden ohmschen Bauteil gilt U = R mal I. Wenn der Widerstand gleich bleibt und die Spannung steigt, steigt im Modell auch der Strom. Wichtig für die Anwendung: Das ohmsche Modell ist keine universelle Beschreibung jedes Bauteils. Temperatur, Kennlinie und Betriebszustand können den Widerstand verändern. Eine rechnerisch richtige Beziehung erlaubt noch keine reale Auswahl oder elektrische Arbeit. Die Annahmen des jeweiligen Lernfalls gelten weiter.",
  },
  {
    id: "electric-ohm",
    introduction:
      "Ohmsches Gesetz anwenden: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Du suchst eine der Größen Spannung, Strom oder Widerstand. Schreibe die beiden bekannten Größen mit Einheiten auf. Wähle dann die passende Umstellung von U = R mal I. Rechne Vorsilben wie Milli und Kilo zuerst sorgfältig um.",
      fachkraft:
        "Bei 24 Volt und 120 Ohm liefert I = U durch R den Strom 0,2 Ampere. Zur Kontrolle multiplizierst du 0,2 Ampere mit 120 Ohm und erhältst wieder 24 Volt. Diese Probe kontrolliert die Zahl und die Einheit im gegebenen Modell.",
      meister:
        "Bei Widerstand null darfst du die Formel I = U durch R nicht verwenden. Ebenso darfst du beim Berechnen von R nicht durch Strom null teilen. Ob ein echtes Bauteil ohmsch ist, muss zum Betriebszustand passen. Das Lernmodell ersetzt weder Bauteildaten noch Schutzbemessung.",
    },
    connections:
      "Technikbezug: Bei Widerstand null darfst du die Formel I = U durch R nicht verwenden. Ebenso darfst du beim Berechnen von R nicht durch Strom null teilen. Ob ein echtes Bauteil ohmsch ist, muss zum Betriebszustand passen. Das Lernmodell ersetzt weder Bauteildaten noch Schutzbemessung.",
    summary:
      "Du suchst eine der Größen Spannung, Strom oder Widerstand. Schreibe die beiden bekannten Größen mit Einheiten auf. Wähle dann die passende Umstellung von U = R mal I. Rechne Vorsilben wie Milli und Kilo zuerst sorgfältig um. Wichtig für die Anwendung: Bei Widerstand null darfst du die Formel I = U durch R nicht verwenden. Ebenso darfst du beim Berechnen von R nicht durch Strom null teilen. Ob ein echtes Bauteil ohmsch ist, muss zum Betriebszustand passen. Das Lernmodell ersetzt weder Bauteildaten noch Schutzbemessung.",
  },
  {
    id: "electric-work",
    introduction:
      "Elektrische Leistung und Energie: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Leistung sagt, wie schnell Energie übertragen wird. Im stationären Gleichstromfall rechnest du Spannung mal Strom: P = U mal I. Das Ergebnis hat die Einheit Watt. Energie erhältst du, wenn du eine konstante Leistung mit ihrer Dauer multiplizierst.",
      fachkraft:
        "Ein Gerät mit 120 Watt nimmt in zwei Stunden 240 Wattstunden Energie auf. Watt und Wattstunde sind nicht dieselbe Größe. Verwende für Joule die Zeit in Sekunden. Ein Watt ist ein Joule pro Sekunde; eine Wattstunde sind 3600 Joule.",
      meister:
        "Die einfache Gleichstromformel ist nicht pauschal die Wirkleistungsformel jedes Wechselstromverbrauchers. Dort können Phasenverschiebung und Signalform eine Rolle spielen. Elektrische Eingangsleistung ist außerdem nicht automatisch mechanische Ausgangsleistung. Die Verluste müssen zur Systemgrenze passen.",
    },
    connections:
      "Technikbezug: Die einfache Gleichstromformel ist nicht pauschal die Wirkleistungsformel jedes Wechselstromverbrauchers. Dort können Phasenverschiebung und Signalform eine Rolle spielen. Elektrische Eingangsleistung ist außerdem nicht automatisch mechanische Ausgangsleistung. Die Verluste müssen zur Systemgrenze passen.",
    summary:
      "Leistung sagt, wie schnell Energie übertragen wird. Im stationären Gleichstromfall rechnest du Spannung mal Strom: P = U mal I. Das Ergebnis hat die Einheit Watt. Energie erhältst du, wenn du eine konstante Leistung mit ihrer Dauer multiplizierst. Wichtig für die Anwendung: Die einfache Gleichstromformel ist nicht pauschal die Wirkleistungsformel jedes Wechselstromverbrauchers. Dort können Phasenverschiebung und Signalform eine Rolle spielen. Elektrische Eingangsleistung ist außerdem nicht automatisch mechanische Ausgangsleistung. Die Verluste müssen zur Systemgrenze passen.",
  },
  {
    id: "electric-ac-wave",
    introduction:
      "Wechselstrom verstehen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Bei Wechselstrom ändern sich Strom oder Spannung mit der Zeit. Ein reiner Sinus wiederholt seinen Verlauf nach einer Periodendauer. Die Frequenz sagt, wie viele Wiederholungen pro Sekunde stattfinden. 50 Hertz bedeuten eine Periodendauer von 0,02 Sekunden.",
      fachkraft:
        "Der Scheitelwert ist der größte Betrag der Sinuskurve. Der Effektivwert beschreibt dagegen die gleiche mittlere Erwärmung eines Widerstands wie ein entsprechender Gleichwert. Nur beim reinen Sinus teilst du den Scheitelwert durch die Wurzel aus zwei. Der einfache Mittelwert über eine ganze Sinusperiode ist null.",
      meister:
        "Eine zeitliche Verschiebung zwischen Strom und Spannung heißt Phasenverschiebung. Hier bedeutet ein positiver Winkel: Der Strom kommt später als die Spannung. Gleiche normierte Kurvenhöhe bedeutet nicht, dass Volt und Ampere gleich sind. Bei verzerrten Kurven gilt die besondere Wurzel-zwei-Regel nicht allgemein.",
    },
    connections:
      "Technikbezug: Eine zeitliche Verschiebung zwischen Strom und Spannung heißt Phasenverschiebung. Hier bedeutet ein positiver Winkel: Der Strom kommt später als die Spannung. Gleiche normierte Kurvenhöhe bedeutet nicht, dass Volt und Ampere gleich sind. Bei verzerrten Kurven gilt die besondere Wurzel-zwei-Regel nicht allgemein.",
    summary:
      "Bei Wechselstrom ändern sich Strom oder Spannung mit der Zeit. Ein reiner Sinus wiederholt seinen Verlauf nach einer Periodendauer. Die Frequenz sagt, wie viele Wiederholungen pro Sekunde stattfinden. 50 Hertz bedeuten eine Periodendauer von 0,02 Sekunden. Wichtig für die Anwendung: Eine zeitliche Verschiebung zwischen Strom und Spannung heißt Phasenverschiebung. Hier bedeutet ein positiver Winkel: Der Strom kommt später als die Spannung. Gleiche normierte Kurvenhöhe bedeutet nicht, dass Volt und Ampere gleich sind. Bei verzerrten Kurven gilt die besondere Wurzel-zwei-Regel nicht allgemein.",
  },
  {
    id: "electric-ac-reactance",
    introduction:
      "Spule und Kondensator: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Eine ideale Spule speichert Energie im Magnetfeld. Eine Stromänderung wirkt auf ihre Spannung. Ein idealer Kondensator speichert Energie im elektrischen Feld; sein Strom verändert die Spannung. Deshalb erreichen Strom und Spannung ihre Maxima oft nicht gleichzeitig.",
      fachkraft:
        "Beim Sinusmodell steigt der induktive Blindwiderstand mit der Frequenz. Der kapazitive Blindwiderstand sinkt mit ihr. Im idealen Serienkreis werden diese Blindanteile mit ihrem Phasenbezug kombiniert. Du darfst nicht alle Beträge einfach wie gewöhnliche Widerstände addieren.",
      meister:
        "Die Impedanz beschreibt im Wechselstrommodell Spannung und Strom mit ihrer Phasenbeziehung. Ihr Betrag im Serienkreis folgt aus dem rechtwinkligen Dreieck der Anteile. Reale Spulen und Kondensatoren besitzen zusätzliche Verluste und Belastungsgrenzen. Das Modell ist keine Anleitung zum Anschließen oder Auslegen.",
    },
    connections:
      "Technikbezug: Die Impedanz beschreibt im Wechselstrommodell Spannung und Strom mit ihrer Phasenbeziehung. Ihr Betrag im Serienkreis folgt aus dem rechtwinkligen Dreieck der Anteile. Reale Spulen und Kondensatoren besitzen zusätzliche Verluste und Belastungsgrenzen. Das Modell ist keine Anleitung zum Anschließen oder Auslegen.",
    summary:
      "Eine ideale Spule speichert Energie im Magnetfeld. Eine Stromänderung wirkt auf ihre Spannung. Ein idealer Kondensator speichert Energie im elektrischen Feld; sein Strom verändert die Spannung. Deshalb erreichen Strom und Spannung ihre Maxima oft nicht gleichzeitig. Wichtig für die Anwendung: Die Impedanz beschreibt im Wechselstrommodell Spannung und Strom mit ihrer Phasenbeziehung. Ihr Betrag im Serienkreis folgt aus dem rechtwinkligen Dreieck der Anteile. Reale Spulen und Kondensatoren besitzen zusätzliche Verluste und Belastungsgrenzen. Das Modell ist keine Anleitung zum Anschließen oder Auslegen.",
  },
  {
    id: "electric-ac-power",
    introduction:
      "Leistungsarten unterscheiden: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Bei einem Sinusverbraucher ist Spannung mal Strom die Scheinleistung S in VA. Für die Wirkleistung P in Watt kommt der Faktor cos φ dazu. Der Blindanteil Q wird in var angegeben. Die drei Größen beantworten unterschiedliche Fragen.",
      fachkraft:
        "Im passenden Sinusmodell bilden P, Q und S ein rechtwinkliges Leistungsdreieck. Der Wirkanteil ist S mal cos φ, der Blindanteil S mal sin φ. Hier ist der Winkel bei nacheilendem Strom positiv; die Blindleistung ist dann induktiv positiv. Kapazitiv wäre sie negativ.",
      meister:
        "Der Leistungsfaktor P durch S ist nicht der Motorwirkungsgrad. Dafür fehlt die mechanische Ausgangsleistung. Bei verzerrten Strom- oder Spannungskurven ist der Gesamtleistungsfaktor nicht allgemein gleich cos φ. Das einfache Dreieck setzt die angegebenen Sinusbedingungen voraus.",
    },
    connections:
      "Technikbezug: Der Leistungsfaktor P durch S ist nicht der Motorwirkungsgrad. Dafür fehlt die mechanische Ausgangsleistung. Bei verzerrten Strom- oder Spannungskurven ist der Gesamtleistungsfaktor nicht allgemein gleich cos φ. Das einfache Dreieck setzt die angegebenen Sinusbedingungen voraus.",
    summary:
      "Bei einem Sinusverbraucher ist Spannung mal Strom die Scheinleistung S in VA. Für die Wirkleistung P in Watt kommt der Faktor cos φ dazu. Der Blindanteil Q wird in var angegeben. Die drei Größen beantworten unterschiedliche Fragen. Wichtig für die Anwendung: Der Leistungsfaktor P durch S ist nicht der Motorwirkungsgrad. Dafür fehlt die mechanische Ausgangsleistung. Bei verzerrten Strom- oder Spannungskurven ist der Gesamtleistungsfaktor nicht allgemein gleich cos φ. Das einfache Dreieck setzt die angegebenen Sinusbedingungen voraus.",
  },
  {
    id: "electric-three-phase",
    introduction:
      "Drehstrom Schritt für Schritt: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Drehstrom hat im betrachteten Modell drei gleiche Sinusspannungen mit jeweils 120 Grad Abstand. Ein Strang ist ein einzelner Verbraucherzweig. Leitergrößen beziehen sich dagegen auf die Außenleiter. Diese Größen darfst du nicht miteinander verwechseln.",
      fachkraft:
        "Im symmetrischen Stern ist die Leiterspannung die Wurzel aus drei mal Strangspannung; Leiterstrom und Strangstrom sind gleich. Im symmetrischen Dreieck ist die Leiterspannung gleich der Strangspannung; der Leiterstrom ist die Wurzel aus drei mal Strangstrom. Das folgt aus den versetzten Zeigern.",
      meister:
        "Die Gesamtwirkleistung kannst du mit drei gleichen Strangleistungen oder mit der Formel über Leitergrößen berechnen. Beide Wege müssen dasselbe ergeben. Das gilt hier nur für symmetrische sinusförmige Verhältnisse. Bei Unsymmetrie oder Oberwellen genügt diese einfache Betrachtung nicht. Es ist keine Verdrahtungsanleitung.",
    },
    connections:
      "Technikbezug: Die Gesamtwirkleistung kannst du mit drei gleichen Strangleistungen oder mit der Formel über Leitergrößen berechnen. Beide Wege müssen dasselbe ergeben. Das gilt hier nur für symmetrische sinusförmige Verhältnisse. Bei Unsymmetrie oder Oberwellen genügt diese einfache Betrachtung nicht. Es ist keine Verdrahtungsanleitung.",
    summary:
      "Drehstrom hat im betrachteten Modell drei gleiche Sinusspannungen mit jeweils 120 Grad Abstand. Ein Strang ist ein einzelner Verbraucherzweig. Leitergrößen beziehen sich dagegen auf die Außenleiter. Diese Größen darfst du nicht miteinander verwechseln. Wichtig für die Anwendung: Die Gesamtwirkleistung kannst du mit drei gleichen Strangleistungen oder mit der Formel über Leitergrößen berechnen. Beide Wege müssen dasselbe ergeben. Das gilt hier nur für symmetrische sinusförmige Verhältnisse. Bei Unsymmetrie oder Oberwellen genügt diese einfache Betrachtung nicht. Es ist keine Verdrahtungsanleitung.",
  },
  {
    id: "physics-heat",
    introduction:
      "Temperatur und Wärme: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Temperatur beschreibt einen Zustand. Wärme beschreibt dagegen Energie, die wegen eines Temperaturunterschieds übertragen wird. Ein Körper speichert innere Energie, keinen Wärmestoff. Bei Erwärmung innerhalb einer Phase kann die Temperatur steigen.",
      fachkraft:
        "Für einen passenden sensiblen Prozess mit konstanter spezifischer Wärmekapazität gilt Q = m mal c mal ΔT. Größere Masse oder größerer Temperaturunterschied benötigen im Modell mehr Energie. Die Wärmekapazität muss zum Stoff und zum Prozess passen.",
      meister:
        "Bei einem Phasenwechsel kann Energie übertragen werden, ohne dass die Temperatur eines reinen Stoffes bei konstantem Druck weiter steigt. Dann reicht m mal c mal ΔT allein nicht. Energie in Joule und Wärmeleistung in Watt bleiben verschieden. Die Leistungsformel braucht den Zeitbezug.",
    },
    connections:
      "Technikbezug: Bei einem Phasenwechsel kann Energie übertragen werden, ohne dass die Temperatur eines reinen Stoffes bei konstantem Druck weiter steigt. Dann reicht m mal c mal ΔT allein nicht. Energie in Joule und Wärmeleistung in Watt bleiben verschieden. Die Leistungsformel braucht den Zeitbezug.",
    summary:
      "Temperatur beschreibt einen Zustand. Wärme beschreibt dagegen Energie, die wegen eines Temperaturunterschieds übertragen wird. Ein Körper speichert innere Energie, keinen Wärmestoff. Bei Erwärmung innerhalb einer Phase kann die Temperatur steigen. Wichtig für die Anwendung: Bei einem Phasenwechsel kann Energie übertragen werden, ohne dass die Temperatur eines reinen Stoffes bei konstantem Druck weiter steigt. Dann reicht m mal c mal ΔT allein nicht. Energie in Joule und Wärmeleistung in Watt bleiben verschieden. Die Leistungsformel braucht den Zeitbezug.",
  },
  {
    id: "physics-pressure-density",
    introduction:
      "Druck und Dichte: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Druck sagt im einfachen Modell, welche senkrechte Kraft auf eine Fläche wirkt. Dichte sagt, welche Masse in einem Volumen steckt. Beides sind unterschiedliche Größen. Druck hat die Einheit Pascal, Dichte Kilogramm pro Kubikmeter.",
      fachkraft:
        "Für Druck teilst du die senkrechte Kraft durch die belastete Fläche. Für Dichte teilst du die Masse durch das Volumen. Flächenumrechnungen enthalten ein Quadrat, Volumenumrechnungen eine dritte Potenz. Schreibe deshalb zuerst die SI-Einheiten auf.",
      meister:
        "Bei Druck braucht jede Anwendung einen klaren Bezug: absolut zum Vakuum oder relativ zur Umgebung. Eine Dichte muss zum Stoffzustand passen. Beliebige Dichtewerte dürfen nicht für einen anderen Zustand verwendet werden. Diese einfachen Beziehungen sind keine Druckbehälter- oder Rohrdimensionierung.",
    },
    connections:
      "Technikbezug: Bei Druck braucht jede Anwendung einen klaren Bezug: absolut zum Vakuum oder relativ zur Umgebung. Eine Dichte muss zum Stoffzustand passen. Beliebige Dichtewerte dürfen nicht für einen anderen Zustand verwendet werden. Diese einfachen Beziehungen sind keine Druckbehälter- oder Rohrdimensionierung.",
    summary:
      "Druck sagt im einfachen Modell, welche senkrechte Kraft auf eine Fläche wirkt. Dichte sagt, welche Masse in einem Volumen steckt. Beides sind unterschiedliche Größen. Druck hat die Einheit Pascal, Dichte Kilogramm pro Kubikmeter. Wichtig für die Anwendung: Bei Druck braucht jede Anwendung einen klaren Bezug: absolut zum Vakuum oder relativ zur Umgebung. Eine Dichte muss zum Stoffzustand passen. Beliebige Dichtewerte dürfen nicht für einen anderen Zustand verwendet werden. Diese einfachen Beziehungen sind keine Druckbehälter- oder Rohrdimensionierung.",
  },
  {
    id: "thermo-states",
    introduction:
      "Zustände und Bezugsgrößen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Eine Zahl für Druck oder Temperatur ist ohne ihren Bezug nicht eindeutig. Absolutdruck bezieht sich auf Vakuum, Überdruck auf die angegebene Umgebung. Für Kelvin addierst du bei einer absoluten Celsius-Temperatur 273,15. Bei einer Temperaturdifferenz machst du das nicht.",
      fachkraft:
        "Dichte ist Masse geteilt durch Volumen. Das spezifische Volumen ist der Kehrwert der Dichte. Einen Betriebsvolumenstrom rechnest du erst mit einer Dichte in einen Massenstrom um. Beide Angaben müssen zum selben Ort und Zustand gehören.",
      meister:
        "Negativer Überdruck ist relativ zur Umgebung möglich. Negativer Absolutdruck gehört nicht zu diesem einfachen Modell. Die Zahlenaufgabe verwendet positiven Überdruck. Bei realen Stofftabellen musst du den richtigen Druckbezug kennen. Normvolumen und Betriebsvolumen dürfen nicht still gleichgesetzt werden.",
    },
    connections:
      "Technikbezug: Negativer Überdruck ist relativ zur Umgebung möglich. Negativer Absolutdruck gehört nicht zu diesem einfachen Modell. Die Zahlenaufgabe verwendet positiven Überdruck. Bei realen Stofftabellen musst du den richtigen Druckbezug kennen. Normvolumen und Betriebsvolumen dürfen nicht still gleichgesetzt werden.",
    summary:
      "Eine Zahl für Druck oder Temperatur ist ohne ihren Bezug nicht eindeutig. Absolutdruck bezieht sich auf Vakuum, Überdruck auf die angegebene Umgebung. Für Kelvin addierst du bei einer absoluten Celsius-Temperatur 273,15. Bei einer Temperaturdifferenz machst du das nicht. Wichtig für die Anwendung: Negativer Überdruck ist relativ zur Umgebung möglich. Negativer Absolutdruck gehört nicht zu diesem einfachen Modell. Die Zahlenaufgabe verwendet positiven Überdruck. Bei realen Stofftabellen musst du den richtigen Druckbezug kennen. Normvolumen und Betriebsvolumen dürfen nicht still gleichgesetzt werden.",
  },
  {
    id: "thermo-calorimetry",
    introduction:
      "Wärmeleistung verstehen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Eine Wärmemenge ist Energie. Wärmeleistung sagt, wie viel davon pro Zeit übertragen wird. Masse ist eine Stoffmenge in Kilogramm, Massenstrom dagegen Kilogramm pro Sekunde. Diese Unterscheidung entscheidet, ob dein Ergebnis Joule oder Watt ist.",
      fachkraft:
        "Für einen passenden sensiblen Strom rechnest du Massenstrom mal spezifische Wärmekapazität mal Temperaturunterschied. Kilogramm pro Sekunde mal Joule pro Kilogramm und Kelvin mal Kelvin ergibt Joule pro Sekunde, also Watt. Hier betrachten wir positive übertragene Beträge.",
      meister:
        "Das Modell braucht eine geeignete stationäre Bilanz und näherungsweise konstantes cp. Ein Phasenwechsel, stark wechselndes cp oder zusätzliche Energieterme erfordern ein erweitertes Modell. Im Kältemittelverdampfer wird deshalb oft mit Enthalpiedifferenzen gerechnet. Fiktive Beispielwerte sind keine realen Stoffdaten.",
    },
    connections:
      "Technikbezug: Das Modell braucht eine geeignete stationäre Bilanz und näherungsweise konstantes cp. Ein Phasenwechsel, stark wechselndes cp oder zusätzliche Energieterme erfordern ein erweitertes Modell. Im Kältemittelverdampfer wird deshalb oft mit Enthalpiedifferenzen gerechnet. Fiktive Beispielwerte sind keine realen Stoffdaten.",
    summary:
      "Eine Wärmemenge ist Energie. Wärmeleistung sagt, wie viel davon pro Zeit übertragen wird. Masse ist eine Stoffmenge in Kilogramm, Massenstrom dagegen Kilogramm pro Sekunde. Diese Unterscheidung entscheidet, ob dein Ergebnis Joule oder Watt ist. Wichtig für die Anwendung: Das Modell braucht eine geeignete stationäre Bilanz und näherungsweise konstantes cp. Ein Phasenwechsel, stark wechselndes cp oder zusätzliche Energieterme erfordern ein erweitertes Modell. Im Kältemittelverdampfer wird deshalb oft mit Enthalpiedifferenzen gerechnet. Fiktive Beispielwerte sind keine realen Stoffdaten.",
  },
  {
    id: "thermo-transfer",
    introduction:
      "Wärmeübertragung verstehen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Wärme kann durch Materialleitung, durch bewegtes Fluid und durch Strahlung übertragen werden. Der einfache Schichtrechner betrachtet nur eine ebene stationäre Leitung. Das bedeutet: Die Temperaturen ändern sich im Modell nicht mit der Zeit.",
      fachkraft:
        "Bei gleicher Fläche, Leitfähigkeit und Temperaturdifferenz lässt eine dickere Schicht weniger Wärme pro Zeit hindurch. Der Wärmewiderstand beschreibt, wie schwer dieser Weg ist. Bei gleichen seriellen Flächen addieren sich die Widerstände. Für einen U-Wert kommen vorgegebene Wärmeübergänge dazu.",
      meister:
        "Ein reales Rohr ist nicht dieselbe Geometrie wie eine ebene Platte. Wärmebrücken, Feuchte, Kontakte und zeitliche Speicherung können zusätzlich wichtig sein. Ein richtig gerechneter Modellwert ist deshalb noch keine reale Dämmfreigabe. Wärmeleitfähigkeit λ und U-Wert haben unterschiedliche Einheiten.",
    },
    connections:
      "Technikbezug: Ein reales Rohr ist nicht dieselbe Geometrie wie eine ebene Platte. Wärmebrücken, Feuchte, Kontakte und zeitliche Speicherung können zusätzlich wichtig sein. Ein richtig gerechneter Modellwert ist deshalb noch keine reale Dämmfreigabe. Wärmeleitfähigkeit λ und U-Wert haben unterschiedliche Einheiten.",
    summary:
      "Wärme kann durch Materialleitung, durch bewegtes Fluid und durch Strahlung übertragen werden. Der einfache Schichtrechner betrachtet nur eine ebene stationäre Leitung. Das bedeutet: Die Temperaturen ändern sich im Modell nicht mit der Zeit. Wichtig für die Anwendung: Ein reales Rohr ist nicht dieselbe Geometrie wie eine ebene Platte. Wärmebrücken, Feuchte, Kontakte und zeitliche Speicherung können zusätzlich wichtig sein. Ein richtig gerechneter Modellwert ist deshalb noch keine reale Dämmfreigabe. Wärmeleitfähigkeit λ und U-Wert haben unterschiedliche Einheiten.",
  },
  {
    id: "math-geometry",
    introduction:
      "Flächen und Rohrquerschnitte: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Eine Fläche beschreibt nicht dieselbe Größe wie eine Länge. Beim Kreis ist der Radius der halbe Durchmesser. Der freie Rohrquerschnitt braucht den Innendurchmesser. Die Rohrwand ist dagegen eine Ringfläche zwischen Innen- und Außenkreis.",
      fachkraft:
        "Für den Kreis rechnest du π mal Durchmesser zum Quadrat geteilt durch vier. Die Ringfläche ist Außenkreis minus Innenkreis. Die Wand liegt auf beiden Seiten: Innendurchmesser ist Außendurchmesser minus zweimal Wanddicke. Rechne Millimeter vor dem Quadrieren richtig in Meter um.",
      meister:
        "Ein Maßstab verändert Längen, Flächen und Volumen mit unterschiedlichen Potenzen. Eine geometrische Fläche allein sagt noch nicht, welches Rohr für eine Kälteanlage passt. Druckverlust, Öltransport, Werkstoff und Betriebspunkt brauchen weitere geprüfte Modelle. Die gemeinsame Formel bleibt in beiden Sprachebenen dieselbe.",
    },
    connections:
      "Technikbezug: Ein Maßstab verändert Längen, Flächen und Volumen mit unterschiedlichen Potenzen. Eine geometrische Fläche allein sagt noch nicht, welches Rohr für eine Kälteanlage passt. Druckverlust, Öltransport, Werkstoff und Betriebspunkt brauchen weitere geprüfte Modelle. Die gemeinsame Formel bleibt in beiden Sprachebenen dieselbe.",
    summary:
      "Eine Fläche beschreibt nicht dieselbe Größe wie eine Länge. Beim Kreis ist der Radius der halbe Durchmesser. Der freie Rohrquerschnitt braucht den Innendurchmesser. Die Rohrwand ist dagegen eine Ringfläche zwischen Innen- und Außenkreis. Wichtig für die Anwendung: Ein Maßstab verändert Längen, Flächen und Volumen mit unterschiedlichen Potenzen. Eine geometrische Fläche allein sagt noch nicht, welches Rohr für eine Kälteanlage passt. Druckverlust, Öltransport, Werkstoff und Betriebspunkt brauchen weitere geprüfte Modelle. Die gemeinsame Formel bleibt in beiden Sprachebenen dieselbe.",
  },
  {
    id: "math-pipe-volume",
    introduction:
      "Rohrinhalt und Oberflächen: Du klärst zuerst die Bedeutung der Größen. Danach gehst du den Rechenweg Schritt für Schritt durch. Formeln, gemeinsame Beispiele und Modellgrenzen gelten unverändert auch in der Fachsprache.",
    levels: {
      grundlagen:
        "Der Innenraum eines geraden Rohres entsteht, wenn du den inneren Querschnitt über die Länge fortsetzt. Daher ist sein geometrisches Volumen Querschnitt mal Länge. Für den Außenmantel brauchst du dagegen den äußeren Umfang mal Länge.",
      fachkraft:
        "Den Mantel kannst du dir als abgerolltes Rechteck vorstellen. Seine eine Seite ist der Kreisumfang, die andere die Rohrlänge. Stirnflächen zählen nicht zum Mantel. Der Materialinhalt ergibt sich aus Ringquerschnitt mal Länge, nicht aus dem inneren freien Querschnitt.",
      meister:
        "Innenvolumen, Materialvolumen und Oberfläche beantworten verschiedene Fragen. Die Formeln gelten hier bei konstantem Querschnitt für den ideal geraden Abschnitt. Bögen, Formstücke, reale Stoffverteilung und zulässige Füllmengen sind damit nicht geprüft. Geometrie ist keine Rohrleitungsdimensionierung.",
    },
    connections:
      "Technikbezug: Innenvolumen, Materialvolumen und Oberfläche beantworten verschiedene Fragen. Die Formeln gelten hier bei konstantem Querschnitt für den ideal geraden Abschnitt. Bögen, Formstücke, reale Stoffverteilung und zulässige Füllmengen sind damit nicht geprüft. Geometrie ist keine Rohrleitungsdimensionierung.",
    summary:
      "Der Innenraum eines geraden Rohres entsteht, wenn du den inneren Querschnitt über die Länge fortsetzt. Daher ist sein geometrisches Volumen Querschnitt mal Länge. Für den Außenmantel brauchst du dagegen den äußeren Umfang mal Länge. Wichtig für die Anwendung: Innenvolumen, Materialvolumen und Oberfläche beantworten verschiedene Fragen. Die Formeln gelten hier bei konstantem Querschnitt für den ideal geraden Abschnitt. Bögen, Formstücke, reale Stoffverteilung und zulässige Füllmengen sind damit nicht geprüft. Geometrie ist keine Rohrleitungsdimensionierung.",
  },
];
