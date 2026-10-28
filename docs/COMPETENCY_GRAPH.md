# Kompetenzgraph · 0.6

29 stabile Kompetenz-IDs aus `foundations/competencies.ts` verknüpfen Mathematik, Physik, Chemie, Gleichstrom, Wechsel-/Drehstrom und Thermodynamik. Bestehende IDs wie `competency-fractions`, `competency-si-units` und `competency-heat` werden nicht in neue Punktnotationen umbenannt, damit alte Daten und Verweise stabil bleiben.

`deep/graph.ts` leitet je Kompetenz lessonId, prerequisiteModuleIds, formulaIds, taskIds und sourceIds ab. Quelle der Wahrheit bleiben Module, Formeln und Aufgaben. Der Test prüft Eindeutigkeit, gültige Ziele und azyklische Modulvoraussetzungen. Alle 97 Zahlenaufgaben haben Kompetenzzuordnungen.

Beispiel: `ac-three-a` benötigt `competency-three-phase` und `competency-power-factor`; zugehörige Lektionen sind `electric-three-phase` und `electric-ac-power`, Formeln u. a. `ac-three-power`. Ein Zahlenmuster ohne √3 empfiehlt die Leiter-/Stranggrundlage, ohne eine sichere Denkfehlerdiagnose zu behaupten.

Einheitenmuster führen zur kleinsten passenden Grundlage `math-units`. Radius-/Durchmesserfaktor vier führt zu `math-geometry`, Volumen-/Massenstrom zu `thermo-states`. Ohne konkretes Muster entscheidet der bekannte Lernstand: letzte aktuelle falsche Grundlagenantwort, ungelesen, gelesen/unbewertet, Auffrischung. Unbekannt ist kein bewiesenes Defizit. Weitere Optionen bleiben aufklappbar.

Fehlermuster werden aus unveränderter Aufgabe und Antwort nachvollziehbar neu berechnet, nicht als psychologische Nutzermerkmale gespeichert. Gemeinsamer Lernfortschritt erfasst tatsächliche Antworten, korrekte Revisionen und Wiederholungen. Bei späteren Diagnose-/Rechnerwerkzeugen dürfen diese Verknüpfungen genutzt werden, aber fachliche Messdaten und Sicherheitsfreigaben benötigen eigene geprüfte Verträge.
