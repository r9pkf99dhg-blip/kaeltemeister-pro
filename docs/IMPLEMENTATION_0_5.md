# Implementierungsplan 0.5

Basis: main `163b9b7` (Merge PR #6, Version 0.4). Feature-Branch `feat/foundations-academy-v05`. React/TypeScript/Vite und bestehende Lernstände erhalten. Kein Force-Push oder automatischer Merge.

| Etappe | Überprüfbarer Umfang |
| --- | --- |
| A | Architektur, Roadmap, Datenmodell und bestehenden Umfang prüfen; 184 Basistests, Typprüfung und Build bestätigen |
| B | Lokal gebündeltes KaTeX/mhchem, sichere Formelkomponenten und explizite Migration des Formelregisters; keine automatische Interpretation von Textschrägstrichen |
| C | Vollständiger Mathematik-Kernpfad: Rechenregeln, Brüche, Prozent/Dreisatz, Algebra, Gleichungen, Umstellung, Einheiten, Potenzen/Wurzeln; interaktiver Umstellungstrainer |
| D | Abgeschlossene Physik-Kernmodule mit Beispielen, Zahlenaufgaben und Modellgrenzen |
| E | Abgeschlossene Chemie-Grundlagen, keine gefährlichen Versuchsanleitungen |
| F | Vollständige Lehrplanstruktur mit ehrlicher Trennung verfügbar/geplant; gemeinsame Formeln und technische Querverweise |
| G | Kompetenz-IDs und azyklische Voraussetzungen; Aufgaben→Kompetenzen→Grundlagenlektionen; Lernbrücke erst nach stabilen Kernfunktionen |
| H | Formel-/Browser-/Backup-/Migrationstests, Regression, Dokumentation, CI und PR bzw. direkter Vergleichslink |

Nach jeder abgeschlossenen Etappe Typprüfung, Tests und Build; größere UI-Änderungen zusätzlich im Browser prüfen. NEXT_STEPS aktualisieren, aussagekräftig committen und regelmäßig normal pushen. Bei Unterbrechung keine halbfertigen Features als fertig markieren.

KaTeX ist die begründete neue Render-Abhängigkeit; CSS und Fonts werden lokal gebündelt. trust=false, Fallback bei fehlerhafter Syntax, keine Ausführung von Formeltexten. Bestehende Aufgaben-Snapshots müssen ohne neue optionale Felder lesbar bleiben. Neue Inhalte verwenden dieselben Lernaktionen und Speicherschemata. Rechenprüfung und Quellenabgleich sind keine unabhängige menschliche Fachfreigabe.
