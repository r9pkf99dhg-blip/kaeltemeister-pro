# Architektur · Version 0.4

## Ausgangslage und erhaltene Struktur

Grundlage ist `main` mit Merge PR #5 (`2c846d1`, Version 0.3). React/TypeScript/Vite/Tailwind und der Pages-Pfad bleiben erhalten. Keine neue Laufzeitabhängigkeit, kein Backend, keine Accounts oder kostenpflichtigen APIs. Die technischen Änderungen erfolgen auf einem eigenen Branch.

```text
src/technical/calculations.ts    reine SI-Rechenfunktionen und Einheitentypen
src/academy/data/               Fachgebiete, bestehende Kälte-Inhalte, neue Elektro-Inhalte
src/academy/catalog.ts          gemeinsame Sicht, stabile IDs ohne doppelte Wissensbestände
src/academy/exercises/          normalisierte Aufgaben, Snapshot, Bewertung, Training
src/academy/adaptive/           Zähler, Wiederholungen, erklärbare Empfehlungen, Dashboard
src/academy/exams/              zeitbegrenzte Übungsprüfungen, Validierung, Analyse
src/academy/progress.ts         geschützter v1/v2/v3-Leser und Lernaktionen
src/academy/useAcademyProgress.ts Speicherung und Deadline auch außerhalb der Prüfung
src/storage/backup.ts           versioniertes Backup, Validierung, Journal, Rücknahme
src/storage/BackupPanel.tsx     Dateiauswahl, Vorschau, Bestätigung, Download
src/quality/register.ts        einheitliche Prüfstatus und vollständiges Inhaltsregister
scripts/generate-review.mjs    bearbeitbarer Fachprüfbericht aus demselben Register
```

Der vorhandene Wärmeleistungsrechner und alle Zahlenaufgaben verwenden denselben SI-Kern. Neue Funktionen sind Ladungsstrom, drei Ohm-Umstellungen, elektrische Arbeit sowie Reihen-/Parallelwiderstand. Das Formelregister beschreibt die Gleichung; Formeltexte werden nicht als Code ausgeführt. SI-Werte und Anzeigeeinheiten sind getrennt. Große Parallelwiderstände werden ohne unnötigen Produktüberlauf verarbeitet.

Modulfragen werden für Prüfungen adaptiert, nicht als zweiter Fragenkatalog kopiert. Die bisherigen acht Aufgaben/IDs bleiben erhalten; 16 Elektro-Varianten ergänzen sie. Das Inhaltsmodell ergänzt nur optionale Voraussetzungen und Sicherheitshinweise. Es gibt keinen generischen Formelparser und keine neue Pluginplattform.

## Speichergrenze und Wiederherstellung

Browserfortschritt bleibt `schemaVersion: 3` unter dem bisherigen v3-Schlüssel. Das neue Dateiformat hat eine separate `schemaVersion: 1`. Bestehende v2-Zeichenfolgen bleiben erhalten; alte Ergebnisse/Snapshots bleiben lesbar. Keine erfundenen historischen Versuche.

Der kleine `StoragePort` kapselt die benötigten Speicheroperationen für Backup/Restore und Fehlerprüfungen. Er ist die spätere Grenze zu IndexedDB. Eine lokale Wiederherstellung benötigt wegen mehrerer Schlüssel ein pending/committed-Journal. Vor App-Mount wird es sicher wiederaufgenommen. Nach Erfolg wird der React-Baum mit neu gelesenen Daten neu gestartet, damit alte Hooks keinen alten Stand zurückschreiben. Bei nicht abgeschlossener Rücknahme verhindert die Journalprüfung weitere Speicherwirkungen. Siehe [BACKUP_RESTORE.md](BACKUP_RESTORE.md).

Andere Tabs werden über native storage-Ereignisse als veraltet erkannt und müssen neu laden. Das ist bewusst keine Mehrgeräte-/Mehrtab-Zusammenführung. Gleichzeitige Bearbeitung hat weiterhin Grenzen; vor Import andere Tabs schließen. Eine spätere Synchronisation erfordert Ereignisidentität, Reset-Generation und Konfliktregeln. Es gibt keine externe Datenübertragung.

## Navigation und Bedienung

Die vorhandene Buttonnavigation bleibt. App-Seiten und Modulwechsel erzeugen Browser-History-Einträge; Zurück/Vor stellt die App-Ansicht wieder her. Temporäre Filter und Niveaus werden dabei nicht als vollständiger Navigationszustand archiviert. Nach Neuladen beginnt die App weiterhin auf dem Dashboard; gespeicherter Lernstand und Prüfungsdeadline bleiben erhalten. Die letzte Lerneinheit ist über das Dashboard erreichbar. Dateidownload erfolgt über einen echten, vom Nutzer ausgelösten Download-Link; Dateiauswahl über ein natives input-Feld.

## Gesamtplattform und spätere Anschlüsse

| Modul | Gemeinsamer Anschluss / fehlende Voraussetzung |
| --- | --- |
| Lernakademie | Modul-, Aufgaben-, Formel- und Quellen-IDs; adaptive Leistung |
| Fachbibliothek | gleiche Begriffe und Quellen, kein zweiter Fachbestand |
| Professionelle Rechner | derselbe SI-Kern, zusätzliche validierte Randbedingungen |
| log-p-h-Diagramme | verifizierte Stoff-/Zustandsmodelle und Rechte erforderlich |
| Kältemittel-/Stoffwerte | Referenzzustände, Unsicherheit und Aktualisierung separat klären |
| Komponenten-/Bauteile | reale Herstellerdaten und Freigaben statt fiktiver Lernwerte |
| Diagnose | Fälle referenzieren Formeln, Messgrößen und mehrere Hypothesen |
| Planung/Auslegung | geprüfte Systemgrenzen, keine direkte Übernahme einfacher Lernmodelle |
| Wartung/Inbetriebnahme | qualifizierte Fachabnahme und aktuelle Sicherheitsgrundlagen |
| Technische Dokumentation | Projekte referenzieren dieselben Entitäten/Quellen/Revisionen |

Keine dieser zukünftigen Funktionen wird als fertiger leerer Menüpunkt vorgetäuscht.

## Veröffentlichung und Qualität

Pages nutzt weiterhin offizielle configure/upload/deploy-Actions, main-Push und workflow_dispatch. PRs bauen/testen ohne Veröffentlichung. Beide Workflows installieren jetzt Chromium und WebKit. Konfiguration ist kein Nachweis eines ausgeführten Apple-Tests; lokale Downloadbeschränkung und echte Gerätegrenzen stehen im Testplan. Der externe Fachprüfstatus bleibt unabhängig von jeder CI-Ampel.
