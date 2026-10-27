# Version 0.4 · Datensicherheit und Elektro-Grundlagen

## Ausgangslage

Tatsächliche Basis: `origin/main`, Merge PR #5 (`2c846d1`). Vor Änderungen wurden Architektur, Roadmap, Speicher, Rechenkern, Oberfläche und Tests geprüft. 125 vorhandene Funktionstests und die Typprüfung waren erfolgreich. Der Umsetzungsplan und die identifizierten Risiken stehen in [IMPLEMENTATION_0_4.md](IMPLEMENTATION_0_4.md).

## Implementiert

- JSON-Backupformat 1 mit vollständigem tatsächlich gespeichertem Lernstand; Download, Dateiauswahl, Größen-/Versions-/Strukturprüfung, Vorschau, explizites Ersetzen.
- Rücknahmejournal, Rollback bei Fehlern, Wiederanlauf nach Unterbrechung. Andere Tabs werden bei Datenänderungen vor weiterem Schreiben gesperrt.
- Vorhandene v1/v2/v3-Lernstände bleiben lesbar; kein neues Fortschrittsschema. Beschädigte v1-Originale werden zusätzlich geschützt.
- Einheitliches Prüfregister mit 173 Inhalts-/Niveaueinträgen, fünf Statusdefinitionen und bearbeitbarem Fachbericht. Kein Inhalt behauptet eine unabhängige menschliche Fachfreigabe.
- Fünf vollständige Elektro-Grundlagenmodule auf drei Niveaus; Voraussetzungen, Sicherheit, Quellen, 15 neue Modulfragen, 10 neue Karten und 16 neue Zahlenvarianten.
- Gemeinsamer SI-Kern für Strom, Ohm, Arbeit und Widerstandsschaltungen. Insgesamt 24 Zahlenaufgaben mit separaten Referenzwerten; alte Aufgaben/Features bleiben erhalten.
- Browser-Zurück/Vor für App-Seiten und Module, eingebettete Aufgaben, nativer Datei-Workflow und responsive Darstellung.
- WebKit-Projekte und CI-Installation ergänzt; manueller Apple-Testplan mit Fehlervorlage.

## Technische Prüfung

Erfolgreich lokal ausgeführt:

- `npm ci --cache /tmp/kaeltemeister-npm-cache` (reproduzierbare Installation).
- `npm run typecheck`.
- `npm test`: **184 Tests in 12 Dateien**.
- `npm run build`: Produktionsbuild erfolgreich (JS ca. 442 kB, gzip ca. 134 kB).
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`: **95 Tests**, 19 Szenarien × 5 Ansichtsgrößen, einschließlich echter Datei-Downloads, Import, Lernpfad, Tastatur, Mehrtab-Sperre und 200-%-Schrift.
- `npm run docs:review`: Register mit **173 Einträgen** generiert.
- `actionlint` für beide Workflows und `git diff --check`.

 WebKit kann wegen HTTP 403 der offiziellen Download-Hosts lokal nicht installiert werden. Keine erfolgreiche lokale WebKit- oder echte Apple-Geräteprüfung behauptet. CI-WebKit und tatsächlicher main-Deploy sind separat nach Push/PR bzw. Merge zu prüfen.

## Bewusst nicht implementiert / Grenzen

- Keine unabhängige menschliche Fachabnahme; vollständige Lerntexte, Sicherheits-/Praxisinterpretation und kältetechnische Spezialvoraussetzungen bleiben offen.
- Elektro-Themen 6–16 sind nachvollziehbar geplant, nicht angeblich fertig.
- Keine Accounts, kostenpflichtigen APIs, Gerätesynchronisation, Offline/PWA, echten Stoffdaten/Diagramme oder professionellen Schutz-/Auslegungsrechner.
- Mehrtab-Schutz ist Konflikterkennung mit Neuladen, keine verteilte Transaktion. Vor Import andere Tabs schließen.
- Backup benötigt freien Speicher für Journal und Zielbestand. Browserdaten-/Geräteverlust kann auch das Journal entfernen; externe Sicherungen aufbewahren.
- Alte Quiz-Einzelantworten waren nie gespeichert und werden nicht erfunden. Aktuell bis zu 20 Prüfungsergebnisse und letzte Trainingsantwort pro Aufgabe; kein vollständiges Ereignislog.
- Nach Neuladen startet die Ansicht wie bisher auf dem Dashboard. Temporäre Filter/Niveaus sind keine gespeicherten Benutzereinstellungen.

## Architektur und 0.5

StoragePort und Dateivertrag bilden eine kleine, testbare Grenze für spätere IndexedDB-Nutzung. Gemeinsame Fach-/Formel-/Quellen-IDs und der SI-Kern verbinden Lernen, spätere technische Rechner und Diagnose/Projektfälle. Die zehn Plattformmodule bleiben in der Roadmap sichtbar, ohne vorzeitig implementiert zu werden.

Empfehlung 0.5: Fachabnahme, echte Safari-Prüfung, dann quellengeprüfter Wechselstrom-Lernpfad und Elektrorechner mit denselben Kernfunktionen. Siehe [ROADMAP.md](ROADMAP.md).
