# Lernsystem · Version 0.3

## Lernangebote

Die fünf Kältemodule, drei Wissensstufen und zwölf Fachgebietsstrukturen aus 0.2 bleiben bestehen. Modulfragen, Karteikarten, Rechenaufgaben und Übungsprüfungen sind verschiedene Lernformen desselben Katalogs. Das alte Zwölf-Fragen-Quiz bleibt separat; seine Bestwerte werden nicht als neue Themenstatistik ausgegeben.

## Adaptiver Algorithmus

Die App speichert pro Frage/Aufgabe die Revision, Zahl der seit 0.3 bewerteten Versuche, Zahl richtiger Antworten, aktuelle richtige Serie, letzte Antwort, Zeitpunkt und nächsten Termin. Pro Thema werden nur **objektiv bewertete aktuelle Fragen/Rechnungen** für die Trefferquote zusammengefasst. Kartenbewertungen sind Selbsteinschätzung und werden nicht als fachlicher Kompetenznachweis gezählt.

Empfehlungsreihenfolge:

1. Eine letzte Antwort ist falsch: Erklärung und passende Aufgabe erneut bearbeiten.
2. Eine bereits bearbeitete Frage/Aufgabe ist zeitlich fällig: Wiederholung empfohlen.
3. Mindestens zwei bewertete Versuche und Trefferquote unter 75 %: weitere Übung empfohlen.
4. Noch keine bewertete Antwort: Einstieg/Verständniskontrolle, ausdrücklich keine festgestellte Wissenslücke.
5. Sonst keine zusätzliche Empfehlung bis zum nächsten Termin.

Eine richtige Serie plant nach 1, 3, 7, 14 und anschließend 30 Tagen. Eine falsche Antwort setzt die Serie zurück und ist sofort wieder fällig. Bei bereits erkannten Wissenslücken im Thema beträgt der Abstand höchstens drei Tage. Die Begrenzung gilt auch für dessen Karteikarten. Ein Tag bedeutet 24 Stunden ab Bewertung in UTC. Das Dashboard zählt „heute“ bis zum lokalen Tagesende im Browser; die Wiederholungsansicht zeigt jetzt fällige Karten.

Die Trefferquote verwendet die bisherige v3-Historie als aggregierte Zähler, kein statistisches KI-Modell. Eine einzelne Korrektur beseitigt deshalb eine vorherige geringe Trefferquote nicht sofort. Das ist ein bewusster Unterschied zu 0.2, das nur die letzte falsche Antwort betrachtete. Lernfortschritt ist keine Prüfungs- oder Berufsqualifikation. Ein künftiges gleitendes Zeitfenster könnte alte Fehler weniger stark gewichten; es ist noch nicht implementiert.

## Rechenaufgaben

Acht Aufgaben: sensible Wärmeleistung, Massenstrom, Temperaturdifferenz, Überhitzung, Unterkühlung, elektrische Gleichstromleistung, Kälteleistungszahl und Heiz-COP. Jede hat stabile ID, Revision, Thema, Fachgebiet, Niveau, gegebene Größen samt Einheiten, gesuchte Größe, SI-Berechnung, Antwort-Einheiten, Toleranz, Hinweis, Schritte, typische Fehler und fachlichen Bezug.

Dezimalkomma und Punkt sind erlaubt, Tausendertrenner nicht. Ergebnisse werden in SI umgerechnet. Korrekt ist eine Antwort innerhalb `max(absolute SI-Toleranz, 0,5 % des erwarteten SI-Werts)` plus einer sehr kleinen Maschinenrundungsreserve. Das ist eine didaktische Rundungstoleranz, keine behauptete Messgenauigkeit. Ungültige oder leere Trainingseingaben erzeugen einen Hinweis und keinen bewerteten Versuch. Eine neue Bewertung setzt eine geänderte Antwort voraus; dadurch zählt ein wiederholter Klick nicht mehrfach.

Nur der letzte Zahlenversuch wird zusätzlich mit Eingabe/Einheit gespeichert; die aggregierten Lernzähler bewahren die bisherige v3-Leistung. Hinweise sind erlaubt und werden nicht als eigener Schwierigkeitsfaktor ausgewertet. Aufgaben sind fiktive Lernfälle mit offengelegten Annahmen, keine Anlagenauslegung.

## Übungsprüfung

Die Ansicht heißt ausdrücklich **„Selbst erstellte Übungsprüfung“**. Wählbar: Fachgebiet, Niveauobergrenze und 5/10/20 Minuten. Höhere Niveaus enthalten Grundlagen. Aus dem verfügbaren Pool werden bis zu drei Auswahl- und drei Zahlenaufgaben gemischt. Bekannte letzte Fehler werden priorisiert, sonst bleibt die Auswahl über stabile IDs nachvollziehbar. Kein Zufalls-/Geheimhaltungsversprechen. Unbestückte Fachgebiete melden vor dem Start, dass noch keine gemischte Prüfung verfügbar ist.

Beim Start wird eine vollständige Kopie der Aufgaben und erwarteten Zahlenwerte festgehalten. Damit ändern spätere Katalogänderungen nicht die Lösung einer laufenden Prüfung. Ergebnisse veralteter Aufgabenrevisionen bleiben im Prüfungsverlauf, überschreiben aber keine aktuelle Themenstatistik. Antworten und absolute UTC-Endzeit werden gespeichert. Neuladen, Hintergrundwechsel und Navigation halten den Countdown nicht an. Die App prüft die Deadline auch außerhalb der Prüfungsansicht sowie bei Fokus-/Sichtbarkeitswechsel. Eingaben nach der Endzeit werden nicht mehr angenommen. Abgabe ist zustandsbasiert genau einmal möglich.

Vor Abgabe gibt es keine Lösungshinweise oder Musterlösungen. Danach: gleiche Punktzahl pro Aufgabe, keine Teilpunkte, Prozentzahl, richtige/falsche/ungültige/unbeantwortete Antworten, Lösungswege und Wiederholungsempfehlungen. Es gibt keine offizielle Bestehensgrenze. Unbeantwortet zählt 0 Punkte, wird aber nicht als fachlich falscher Versuch in der Themenstatistik gespeichert. Ungültige Prüfungsantworten zählen als formaler Fehler; die Analyse unterscheidet sie von einer falschen Rechnung.

Maximal 20 abgeschlossene Prüfungen bleiben mit ihren Aufgaben-Snapshots erhalten. Eine laufende Prüfung bleibt bis Abgabe/Ablauf bestehen. „Fortschritt zurücksetzen“ ist eine bestätigte Löschaktion. Browseruhr und localStorage sind manipulierbar: Diese lokale Lernsimulation ist kein beaufsichtigtes Prüfungssystem.

## Dashboard

Zeigt Grundlagen-Lesefortschritt je Fachgebiet, heutige Karten-/Aufgabenfälligkeiten, erkennbare Schwächen mit Zählern, drei begründete Empfehlungen, zuletzt geöffnete/bearbeitete Module und die letzten fünf Prüfungen. Der vollständige gespeicherte Prüfungsverlauf ist im Prüfungsmodus erreichbar. Fachgebiete ohne ausgearbeitete Module werden als solche benannt; eine kleine elektrische Fachnotiz wird nicht als fertiger Elektrotechnik-Lernpfad gezählt.

## Speicherung und Migration

Aktueller Schlüssel: `kaeltemeister-pro:progress:v3`, `schemaVersion: 3`.

- Vorhandenes, gültiges v3 ist maßgeblich.
- Fehlt v3, wird v2 unter `kaeltemeister-pro:progress:v2` strukturell validiert und mit Leseständen, letzten Antworten, Kartenterminen und altem Quizaggregat übernommen. Die v2-Zeichenfolge bleibt unverändert.
- Aus alten Einzelantworten werden keine früheren Versuchszahlen erfunden. V3-Zähler starten leer. Falsche aktuelle Altantworten bleiben trotzdem als Übungsbedarf sichtbar, mit unbekannter früherer Versuchszahl.
- Fehlt auch v2, bleibt die vorsichtige v1-Übernahme aus 0.2 erhalten.
- Unbekannte Versionen, beschädigte aktuelle Daten oder Lesefehler sperren das automatische Schreiben dieser Sitzung. Schreibfehler werden angezeigt. Ältere Schlüssel werden bei Migration nicht entfernt.
- Bestätigtes Zurücksetzen schreibt einen leeren aktuellen Stand und setzt den nutzbaren alten v1-Stand zurück. Der v2-Migrationsbestand bleibt als Rückfallkopie erhalten, wird aber bei vorhandenem v3 nicht neu eingelesen. Nicht lesbare Daten werden nicht automatisch gelöscht.

Keine Gerätesynchronisation, kein Export/Import und keine automatische Zusammenführung paralleler Tabs. Für eine laufende Prüfung nur einen Tab verwenden: Mehrere Tabs können denselben lokalen Stand überschreiben. Bei Verlust von Browserdaten geht auch der Fortschritt verloren. Bestehende Schutzmechanismen und sichtbare Hinweise bleiben erhalten.
