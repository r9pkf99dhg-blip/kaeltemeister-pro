# Version 0.7 · Wiederaufnahme und Etappen

Branch `feat/interactive-technical-lab-v07`. Ausgangspunkt main `8a1ba77`, Merge #8 mit vollständiger Version 0.6 (`bdf45c8`). main wird nicht direkt geändert; kein automatischer Merge, kein Force-Push und kein Löschen von Branches.

## Verifizierte Ausgangslage

45 Module, 97 Zahlenaufgaben, 77 Formeln, 140 Modulfragen, 90 Karten; gemeinsamer SI-Kern, 29 Kompetenzen, Lernbrücke, Trainer, vier Fälle, Schema 3 und Backupformat 1. Die realen 0.4-/0.5-Fixtures bleiben unangetastet.

## Konkreter Plan

1. Architektur und Baseline prüfen, Quellenzugriff dokumentieren, diesen Wiederaufnahmeplan sichern.
2. Sprache technisch umgesetzt: Commit `3ee1afa`, 20 Kernmodule/3 Artikel, 326 Tests erfolgreich. Globale bevorzugte Sprache und temporäre Lektionssprache: optionaler validierter Fortschrittsvertrag, gemeinsamer Leser; kuratierte einfache Kerntexte, ursprüngliche Darstellung bei fehlender Fassung klar benennen. Formeln/Beispiele/Modellgrenzen und Bewertung bleiben gemeinsam.
3a. Geschützte optionale Entwurfs-/Hilfemetadaten und begrenzter Arithmetikparser: separat geprüft.
3. Übungswerkstatt aus bestehenden LearningItems/Grader/Prüfungen: Filter, acht Übungsarten, eigenes strukturiertes Rechenblatt, gestufte Hilfen, tatsächliche Unterstützungsstufe, letzter fortsetzbarer Entwurf. Keine behauptete Bewertung freien Langtexts.
4. Gemeinsamer Rechnervertrag und sichere arithmetische Eingabe ohne eval. Größen-/Einheitenkern erweitern, bestehende Aufgaben und Rechner nicht kopieren.
5. Fünf Pflichtbereiche einzeln umsetzen: Einheiten, sensible Wärme (Zielgrößen), Elektro (DC/Sinus/symmetrisches Drehstrommodell), Rohrgeometrie, stationäre ebene Wärmeübertragung. Jede Funktion erhält unabhängige Sollwerte/Fehlerfälle und Lernverknüpfungen.
6. Geeignete interaktive Diagramme/Parameter mit Textalternativen; Labor und Üben trennen.
7. Vorhandene Lernbrücke sprachabhängig mit neuen Fehlerhinweisen/Schrittprüfung erweitern; Eingaben/Einheiten/Rechenblattposition behalten.
8. Echtes 0.6-Backup aus altem Exporter erzeugen, alle Altbackups/optional neuen Felder prüfen; vollständige Unit-/Integration-/Browserregression, WebKit in CI, keine erfundene Hardwareprüfung.
9. Architektur, Sprachabdeckung, Rechner-/Werkstattmodelle, Quellen/Qualität, Roadmap 0.8/0.9/1.0 und PR-Text dokumentieren; Push und PR versuchen. Bisher API HTTP 403, Git-Push möglich; bei erneutem 403 Vergleichslink und vollständigen PR-Text bereitstellen.

Nach jeder abgeschlossenen Etappe: Typprüfung, Tests und Build, aussagekräftiger Commit, normaler Push. Tatsächliche Ergebnisse statt erwarteter Erfolge protokollieren. Ungeprüfte Inhalte und menschliche Fachfreigabe offen kennzeichnen.

## Befehle bei Wiederaufnahme

`git status`, `git log`, Remote main und Entwicklungsbranch tatsächlich vergleichen. Fremde Änderungen erhalten. `npm ci --cache /tmp/kaeltemeister-npm-cache`, `npm run typecheck`, `npm test`, `npm run build`. Lokaler Systembrowser: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`; WebKit-Zugriff/CI getrennt prüfen. `npm run docs:review`, `npm run docs:audit`, Workflows mit actionlint prüfen. Keinen geprüften alten Stand überschreiben, um eine neue Funktion schneller einzubauen.
