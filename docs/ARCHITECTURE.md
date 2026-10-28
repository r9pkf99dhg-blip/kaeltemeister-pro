# Architektur · Version 0.5

Basis: main `163b9b7` (Version 0.4). Vorhandenes React/TypeScript/Vite/Tailwind und GitHub Pages bleiben erhalten. Neue fachliche Inhalte sind Teil derselben Akademie, keine zweite Lern-App. Keine Konten, Backend- oder kostenpflichtigen APIs.

## Gemeinsame Schichten

```text
src/math/                        KaTeX/mhchem, explizite Notation und sichere Komponenten
src/technical/calculations.ts    SI-Einheiten, technische Berechnungen
src/technical/foundations.ts     begrenzte reine Schulmathematik, kein eval
src/academy/foundations/         Mathematik/Physik/Chemie, Trainer, Kompetenzen und Lernbrücke
src/academy/catalog.ts           gemeinsame Sicht auf alle Fachinhalte
src/academy/components/          gemeinsamer Lesebaustein, Modulquiz und Karteikarten
src/academy/exercises/           Aufgaben/Snapshots, Grader, Zahlen-Training
src/academy/adaptive/            Lernzähler, Termine und begründete Empfehlungen
src/academy/exams/               selbst erstellte Übungsprüfungen und Analyse
src/storage/                    geschützter Backup-/Restore-Vertrag und Journal
src/quality/                    vollständiges Prüfregister mit getrennten Belegen
```

25 Module (10 erhalten + 15 Grundlagen), 63 Zahlenaufgaben und elf Umstellungsziele nutzen dieselben IDs, Quellen, Formeln und Lernaktionen. Die neuen Inhalte werden in denselben Katalog aufgenommen. Alle Kapitel/Unterkapitel sind weiterhin klar verfügbar oder geplant. DOMAIN_AUDIT wird aus dem Katalog erzeugt.

## Formeln sind Darstellung, keine Programme

KaTeX 0.19.1 mit mhchem wird samt CSS/Fonts lokal gebündelt. `trust=false`, begrenzte Expansion und sicherer Fallback. Nur ausdrücklich markierte Mathematik wird gerendert. 19 alte Registerformeln und 24 alte Musterlösungen haben kuratierte TeX-Zuordnungen. Ausgewählte ganze Antworttexte besitzen explizite Notation. Gewöhnliche Textschrägstriche werden nicht heuristisch ersetzt.

`InlineMath`, `BlockMath`, `FormulaBox`, `VariableDefinitions`, `SolutionSteps` sind wiederverwendbar. Komplexe Musterlösungen lassen sich schrittweise aufklappen. Alte Snapshots ohne optionale TeX-Felder bleiben darstellbar. KaTeX und React werden in eigene Vite/Rolldown-Chunks aufgeteilt, statt eine sehr große einzige JS-Datei zu erzeugen.

Die numerische Auswertung bleibt im gemeinsamen reinen Kern. Neue Schuloperationen sind explizite Typen, keine frei eingegebenen Ausdrücke. Nur mathematische Zahlen erlauben negative Ergebnisse bzw. einfache Bruchantworten. Physikalische Größen behalten passende Bereichs-/Nenner-/Einheitenprüfungen. Molare Masse und Stoffmenge erhalten eigene Mengenarten.

## Lernbrücke und Voraussetzungen

Stabile Kompetenz-IDs verbinden Aufgabe → benötigte Kompetenz → vorhandene Grundlagenlektion. Gerichtete Modulvoraussetzungen sind auf Existenz/Zyklen getestet. Neue Lernende erhalten zuerst Grundlagen ohne offene Voraussetzungen; reale Fehler-/Fälligkeitsempfehlungen behalten Vorrang.

Eine falsche Gesamtantwort beweist keine einzelne Ursache. Die Brücke erklärt deshalb eine **mögliche** Grundlage anhand bisheriger Antworten oder eines noch unbekannten Standes. `LessonReading` rendert dieselbe Lektion sowohl im Modul als auch im eingeblendeten Brückenpanel. Lesen/Selbsttest verwenden vorhandene Aktionen. Die ursprüngliche Aufgabe bleibt montiert, sodass Antwort und Einheit nach Rückkehr erhalten sind. Kein rekursiv eingebautes zweites Training und keine neue Hauptnavigation für die Brücke.

Der Umstellungstrainer bietet elf vorab geprüfte Ziele. Lernversuche werden über normale ChoiceTask-IDs gespeichert. Die aktuelle Schritt-/Brückenauswahl bleibt sitzungsbezogen; ein dauerhafter Entwurfsvertrag für unbewertete Eingaben ist bewusst offen.

## Daten und Unterbrechungen

Lerndatenschema 3, Speicherschlüssel v1/v2/v3 und Backupformat 1 bleiben erhalten. Neue Inhalte ergänzen IDs und optionale Snapshot-Felder, nicht neue Pflichtfelder im Lernstand. Ein echtes aus main 0.4 erzeugtes Backup wird unverändert importiert und erneut exportiert; neue negative Mathematik-Snapshots sind ebenfalls abgesichert. Eine ältere App 0.4 kennt neue Aufgabentypen nicht: neue Sicherungen daher mit 0.5 oder später verwenden, ohne einen rückwärts kompatiblen Import in alte Apps zu versprechen.

Backup-Journal, Rollback, Wiederanlauf und Mehrtab-Schreibschutz bleiben erhalten. Keine Synchronisation und kein Offline-/PWA-Versprechen. StoragePort bildet weiterhin die kleine spätere Grenze zu IndexedDB. Regelmäßige stabile Commits/Pushes und NEXT_STEPS sichern die Entwicklung gegen Laufzeitunterbrechungen.

## Langfristige Gesamtplattform

| Modul | Gemeinsamer Anschluss / fehlende Voraussetzung |
| --- | --- |
| Lernakademie | Lernziele, Kompetenz-/Aufgaben-/Formel-/Quellen-IDs und adaptive Leistung |
| Fachbibliothek | gemeinsame Begriffe und Quellen; keine kopierten Wissensbestände |
| Professionelle Rechner | derselbe SI-Kern mit zusätzlichen geprüften Randbedingungen |
| log-p-h-Diagramme | verifizierte Stoff-/Zustandsmodelle und Nutzungsrechte |
| Kältemittel-/Stoffdaten | Herkunft, Referenzzustände, Unsicherheit und Aktualisierung |
| Bauteildaten | reale Herstellerdaten statt fiktiver Lernwerte |
| Diagnose | gleiche Kompetenzen und Messgrößen, mehrere Hypothesen statt Einzelwertdiagnose |
| Planung/Auslegung | validierte Systemgrenzen; Lernmodelle nicht ungeprüft übernehmen |
| Wartung/Inbetriebnahme | aktuelle Fach-/Sicherheitsgrundlagen und qualifizierte Abnahme |
| Technische Dokumentation | Projekte referenzieren dieselben stabilen Entitäten und Revisionen |

Keine vorzeitigen Attrappen dieser Module. Automatische CI läuft bei Branch-Push/PR; Pages veröffentlicht ausschließlich main nach erfolgreichen Checks. Der Merge bleibt eine ausdrücklich freizugebende Aktion.
