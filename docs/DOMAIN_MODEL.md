# Fach- und Datenmodell · Version 0.6

## Ein gemeinsamer Katalog

14 Fachgebiete, 45 Module, 140 Modulfragen, 90 Karten, 77 Formeln und 97 Zahlenaufgaben. Module besitzen Grundlagen-, Fachkraft- und Transfertexte; die Bezeichnung Meisterniveau behauptet keine offizielle Prüfungsabdeckung. Alte IDs bleiben erhalten. `FoundationLesson` beschreibt Ziel, Nutzen, Inhalt/Begründung/Transfer, Beispiel, Herleitung, Fehler, Zusammenfassung, Voraussetzungen, Formeln, Quellen und Selbsttest. Vorhandene Adapter erzeugen daraus die regulären Module/Fragen/Karten.

Voraussetzungen sind gerichtete Empfehlungen, keine Zugangssperren. Der Modulgraph wird auf gültige IDs und Zyklen geprüft. Ein Kompetenzziel verweist auf eine vorhandene Lektion; Aufgaben benötigen mehrere Teilkompetenzen. Der Kompetenzgraph leitet Formeln, Aufgaben und Quellen ab, statt einen widersprüchlichen zweiten Fortschrittscache zu speichern.

## Formeln, Aufgaben und Größen

`Formula`: stabile ID, Titel, Textausdruck, explizites TeX, Variablenbedeutung/Einheit, Gültigkeit und Quellen. Darstellung führt keine Programme aus. `NumericTask`: Modell-ID, gegebene Größen/Einheiten, gesuchte Größe, Toleranz, Hinweis, Musterlösung, Fehler, Modellannahmen, Artikel/Formelbezug und Kompetenzen. `ChoiceTask`: Optionen und erklärter Lösungsschlüssel. Prüfungen speichern vollständige Snapshots mit damaligem SI-Sollwert; neue Kataloginhalte schreiben alte Prüfungen nicht um.

Der gemeinsame Größenvertrag ergänzt Winkel, Frequenz, Induktivität, Kapazität, Schein-/Blindleistung, Volumenstrom, spezifisches Volumen/spezifische Energie, Wärmeleitfähigkeit, Wärmewiderstand und Wärmedurchgang. W, VA und var sind verschiedene Ergebnisgrößen. Negative reelle Antworten sind auf quantity `number` beschränkt; gerichtete thermische/elektrische Modelle sind hier nicht allgemein gelöst. Aufgabenbereiche und numerische Grenzen werden explizit validiert.

## Fachliche Nachweise

`ClaimEvidence`: Aussage, Fachgebiet/Module/Formeln, Quellentyp/-ID/Fundstelle, Prüfdatum, Modellart, Annahmen, Grenzen und getrennte Nachweisarten. `humanReview` ist überall null; keine unabhängige Freigabe wird vergeben. `SourceEvaluation`: Autorität, Eignung, Aktualität, Grenzen und offener Widerspruchsabgleich. Ein gelesener Lehrbuchlink ist keine Norm und kein Volltextnachweis der ganzen Lektion.

## Lernfortschritt und Sicherung

Fortschritt bleibt Schema 3 unter dem bisherigen v3-Schlüssel: `read`, `answers`, `reviews`, `legacySummary`, `performance`, `exerciseAnswers`, `recentModules`, `activeExam`, `examHistory`, `updatedAt`. Bisherige Grenzen (fünf letzte Module, 20 Prüfungsergebnisse) bleiben bestehen. Keine erfundene historische Versuchszahl aus einer alten Einzelantwort.

Neu ist der optionale `exerciseDraft`: taskId, revision, answer {value, unit}, bridgeLessonId, checked, updatedAt. Genau ein letzter Entwurf, validierte Struktur und Textlängen. Aktueller Grader wertet den erhaltenen Entwurf nach Neuladen neu aus; geänderte Revisionen werden nicht als aktueller Entwurf aktiviert. Alte 0.4-/0.5-Dateien ohne dieses Feld bleiben gültig.

Exportformat 1 und Wiederherstellungsjournal bleiben erhalten. Historische echte 0.4-/0.5-Exporterfixtures prüfen Karten, Lernstände, Termine, alte Snapshots und aktive/abgeschlossene Prüfungen. Neue Aufgabentypen benötigen 0.6 oder später; keine Zusage für den Import neuer Inhalte in alte Apps. Unbekannte/beschädigte Daten werden geschützt, nicht automatisch überschrieben. Keine Gerätesynchronisation.

Trainer-/Fall-Schrittpositionen und unbewertete Fallantworten sind sitzungsbezogen; bewertete Versuche landen im gleichen Lernvertrag. Quellen/Formeln/Kompetenzen sind für spätere Rechner, log-p-h, Diagnose und Planung vorbereitet, reale Daten benötigen eigene geprüfte Verträge.
