# Fach- und Datenmodell · Version 0.8

## Gemeinsamer Bestand

14 strukturierte Fachgebiete, 49 ausgearbeitete Module, 152 Modulfragen, 98 Karten, 88 Formeln, 120 Zahlenaufgaben, 49 Begriffe und 33 Kompetenzen. Fachgebiete ohne ausgearbeitete Lektionen bleiben geplant. Eine Bezeichnung „Meisterniveau“ behauptet keine offizielle Prüfungsabdeckung. Die Werkstatt bietet 296 Auswahl-/Aufgabeneinträge aus demselben Bestand, keine 296 neuen unabhängigen Zahlenmodelle.

`Formula` hält stabile ID, Ausdruck/TeX, Variablen, Einheit, Gültigkeit und Quellen. `NumericTask` referenziert Modell, gegebene Größen, Ziel, Toleranzen, Schritte/Fehler und Fachartikel. `ChoiceTask` hält Optionen und Erklärung. Vollständige Prüfungssnapshots sind von späteren Katalogänderungen getrennt.

## Ergänzungen 0.7

- `CalculatorDefinition`: id, group, kind (SI-Funktion), formulaId, quantity, answerUnit, inputs, explanation/limits {simple, technical}, moduleId, exerciseId. 26 Definitionen plus allgemeiner Einheitenumrechner. Laborformeln sind reguläre Formeln, kein zweites Formelregister.
- `WorkshopEntry`: Art, Fachgebiet, Thema, Niveau und referenzierte Aufgaben-IDs. Acht Arten; Mehrschritt-/Fehlerkorrekturfolgen verwenden vorhandene LearningItems und denselben Grader.
- `SimpleCore`: sprachliche Ergänzung nach Modul-ID und Lesestufe. Nur Texte unterscheiden sich; gemeinsame Formel, Beispiel, Modellgrenze, Quelle und Bewertung bleiben maßgeblich. 23 Module × drei Erklärstufen, drei Artikel und zwölf Glossarbegriffe; übrige Darstellungen bleiben ausdrücklich ursprünglich.
- `NumericTask.answerSyntax?: 'arithmetic'`: sichere begrenzte Arithmetik in Werkstattantworten. Nicht gesetzte historische Aufgaben behalten ihren bisherigen Zahlen-/Bruchvertrag.
- `Performance.support?`: korrekte Versuche getrennt nach independent/hint/worked, zuletzt verwendete Unterstützung einschließlich unknown. Zähler müssen zusammen kleiner/gleich correctCount sein. Alte Versuche werden nicht nachträglich als selbstständig eingestuft.

## Größen und Vorzeichen

SI-Umrechnung bleibt gemeinsam. W, VA, var und Energie sind verschiedene Größenarten. Celsius/Kelvin: absolut mit Offset, Differenz ohne Offset. Druckumrechnung behält den Bezug; ein Wechsel zwischen Über- und Absolutdruck braucht einen bekannten Umgebungsdruck und ist kein stiller Einheitenwechsel.

Reelle Zahlen, Winkel, Temperaturdifferenzen und Blindleistung dürfen im SI-Vertrag Vorzeichen besitzen. Der konkrete Rechner begrenzt zusätzlich sein Modell: Wärmeleistung/-leitung verwendet hier nicht negative Beträge, cp und Nenner positive Werte; kapazitives Q ist ausdrücklich negativ. Dies ist keine allgemeine gerichtete Anlagenbilanz. Negative absolute Kelvinwerte, ungültige Einheiten, Nullnenner und nicht endliche Resultate werden abgefangen.

## Bestehender Fortschrittsvertrag

Schema 3 unter demselben v3-Schlüssel bleibt gültig. `read`, `answers`, `reviews`, `performance`, `exerciseAnswers`, `recentModules` (fünf), `activeExam`, `examHistory` (20) und Legacydaten bleiben erhalten. Optional neu:

- `preferences.explanation` = simple/technical.
- `labDraft`: letzter Rechner, Eingabeausdrücke/Einheiten, Datum. Ergebniseinheit und eingeschalteter Sofortmodus sind sitzungsbezogen.
- `exerciseDraft.workspace = 'workshop'` und `workshop`: entryId, kind, mode, sieben Rechenblattfelder, Hilfegrad, Schritt, Antworten und geprüfte IDs, Lösung geöffnet. Vorhandene taskId/revision/answer/bridgeLessonId/checked/updatedAt bleiben bestehen.
- `exerciseDraft.trainer`: ausgewählter kuratierter Fall, Schritt, Antwort und Prüfstatus.

Die Struktur ist begrenzt (u. a. Zahlenausdruck 200 Zeichen, Notizfeld 2000), optionale Felder sind validiert. Browserimport ersetzt erst nach vorhandener Vorschau/Bestätigung und mit Journal. Fremder Tab oder nicht sicher lesbarer Speicher sperrt weiterhin Schreiben. Kein stilles Cloudbackup.

## Kompatibilität

Echte Fixtures aus main 0.4 `163b9b7`, 0.5 `09a953b`, 0.6 `8a1ba77` wurden mit dem jeweiligen alten Exporter erzeugt. Vollständiger unveränderter Import und Wiederexport werden getestet, einschließlich Karten, Termine, historische und laufende Prüfungen und 0.6-Lernbrückenentwurf. Neue optionalen Metadaten benötigen keine destruktive Migration; neue Sicherungen gehören in eine aktuelle App. Daten sind ausschließlich im Browserprofil derselben Origin gespeichert.

## Erweiterungen 0.8 · bestehende Verträge bleiben

49 Fachmodule, 152 Modulfragen, 98 Karten, 88 Formeln, 120 Zahlenaufgaben, 49 Begriffe, 33 Kompetenzen. Neue Kreislaufobjekte erweitern den bestehenden Katalog. Neun der 20 erweiterten Begriffe verwenden vorhandene IDs; keine zweite Begriffsdatenbank.

`Fachmission`: ID/Revision, Fachgebiet, Niveau, Länge/ungefähre Minuten, Ziele, Kompetenzvoraussetzungen, Quellen und Schritte. Schritte referenzieren Modul-/Aufgaben-IDs. Objektive Abschlussbedingungen werden aus aktuellen tatsächlichen Ergebnissen abgeleitet. Passive Schritte und offene Begründungen bleiben Selbsteinschätzung, kein objektiv bestätigtes Fachwissen.

`MasteryState` (intern Version 1, optional): Modus, Fokus, freiwilliges Ziel, Minutenorientierung, Niveaupräferenz, aktuelle Mission/Position/gesehene passive Schritte, laufende Sitzung und zehn Zusammenfassungen. Zeitliche Evidenz je Aufgabe enthält Revision und erste/letzte unabhängige Bestätigung; `spacedAt` verlangt mindestens 24 Stunden Abstand. Zusammenfassungen speichern verschiedene unabhängige/Hilfe-/Musterlösungs-, Transfer-, Fehlerverbesserungs-, fällige und neu erfüllte Missions-IDs. Keine Anwesenheitspunkte. Aktuelle Aufgabenrevision bleibt maßgeblich; unbekannte historische Hilfen bleiben unbekannt.

`CycleDraft` (intern Version 1/Datenrevision 1, optional): A/B, Fall-ID, Zustand 1–4/Komponente 0–3, Massenstromrohtext und letzter bestätigter Massenstrom, Linien, Zoom 1–6 und begrenzter Pan. Neue Felder sind begrenzt und validiert. Unbekannte Datenrevision führt sichtbar zur qualitativen Ansicht, kein stiller Stoffwertwechsel. Ein ungültiger Rohtext ist ein erhaltener Entwurf, kein gültiger Rechenwert.

`RefrigerationCase`: stabile Fall-ID, fest berechnete Eingaben, vier SI-Zustände p/T/h/s/rho/Qualität, isentroper Vergleichsaustritt und gegebenenfalls echter isentroper Pfad. Datenmetadata: Bibliothek/Version/Gitrevision, Lizenz, Stoff/EOS, IIR-Bezug, Einheiten, Grenzen und Prüfstatus. `PropertyResult` enthält Wert oder verständlichen Fehler; Fähigkeiten erlauben nur Fall/Zustand, keine freien Zustandspaare oder Gemische. Zeichenpolylinien sind keine zusätzliche Stoffdatenabfrage.

Historische Sicherungen aus main 0.4 `163b9b7`, 0.5 `09a953b`, 0.6 `8a1ba77` und 0.7 `908993d` stammen aus ihren echten Exportern. Vorhandene Schlüssel/Schema/Journale bleiben erhalten; neue 0.8-Daten werden nicht als in alten Apps rückwärtslesbar beworben.
