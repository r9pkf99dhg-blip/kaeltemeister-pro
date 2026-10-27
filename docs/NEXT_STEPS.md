# Version 0.5 · Wiederaufnahme, Übernahme und iPad-Test

Feature-Branch: `feat/foundations-academy-v05`. Grundlage: main `163b9b7`, Version 0.4. Kein automatischer Merge.

## Abgeschlossene Etappen

| Etappe | Commit | Stand |
| --- | --- | --- |
| A | 1d521d5 | Repository/Architektur/Roadmap analysiert, Basistests bestätigt, Unterbrechungsplan gesichert |
| B | d5c2c35 | Professioneller lokaler Formelsatz, Migration und Fehlertests |
| C | f9a3691 | Acht vollständige Mathematik-Kernlektionen und Umstellungstrainer |
| D | 6cf7268 | Vier Physik-Kernlektionen mit zwölf Zahlenaufgaben |
| E | 0ba0930 | Drei Chemie-Kernlektionen mit sechs Zahlenaufgaben |
| F | 3784efc | Kompetenzverknüpfungen, Voraussetzungen und Fachgebiets-Audit |
| G | 485e2b0 | Lernbrücke im Training mit erhaltener Originalantwort |
| H | b1a2a34 | Echte 0.4-Backup-Kompatibilität, 262 Tests, Typprüfung und Build; 120 abschließende Chromium-Tests erfolgreich |

Alle technischen Etappen wurden normal auf GitHub gepusht. Die abschließende Dokumentation liegt im letzten Dokumentationscommit. Ein anfänglicher Ausfall der Cloud-Umgebung wurde vor dem ersten Commit erkannt; anschließend wurde der unveränderte Stand geprüft und sofort gesichert.

## Noch zu erledigen / bewusst offen

1. Automatischen PR anlegen, falls GitHub-API verfügbar. Bei HTTP 403 den direkten Vergleich öffnen und PULL_REQUEST_0_5.md verwenden.
2. Den neuesten GitHub-Lauf einschließlich WebKit prüfen; vor dem Merge müssen die PR-Checks grün sein. CI-Konfiguration allein ist kein Testnachweis.
3. Merge nur nach ausdrücklicher Nutzerfreigabe. main und gespeicherte Lerndaten nicht überschreiben; kein Force-Push.
4. Echte iPad-/iPhone-Safari-Prüfung nach APPLE_TEST_PLAN; keine Hardwareprüfung wurde hier durchgeführt.
5. Unabhängige Fachabnahme anhand REVIEW_REGISTER. Weiterführende Lehrplaninhalte sind ausdrücklich geplant (Curriculumsdateien/ROADMAP), keine halbfertigen angeblich fertigen Module.
6. Eine dauerhaft gespeicherte unbewertete Eingabe/Trainerposition, tiefere Fehlerursachendiagnose, Cloud-Synchronisation und professionelle Rechner bleiben spätere Aufgaben.

## Wiederaufnahme nach Unterbrechung

1. `git status`, `git log` und diese Tabelle lesen. Fremde Änderungen erhalten.
2. Vorhandenen Branch weiterverwenden, Remote-Stand holen und vergleichen. Keine neue Implementierung vom alten main beginnen.
3. `npm ci --cache /tmp/kaeltemeister-npm-cache`, `npm run typecheck`, `npm test`, `npm run build`.
4. Browser: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`, wenn der Systembrowser vorhanden ist. Ansonsten Playwright-Browser installieren; vollständiger CI-Pool enthält Chromium und WebKit.
5. Bei Fehlern erst Ursache beheben, erneut prüfen, dann committen/pushen. Erfolgreiche Commits/Pushes immer tatsächlich kontrollieren.
6. `npm run docs:review` und `npm run docs:audit` erzeugen Berichte aus dem Katalog. Die echte historische Datei unter storage/fixtures nicht mit neuen Produktfunktionen überschreiben.

## Auf dem iPad nach freigegebenem Merge

Nach grünem main-Pages-Deploy Safari öffnen: https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/. Auf Version 0.5 achten und neu laden. Zuerst eigene Sicherung erstellen und in Dateien speichern.

- **Mit Mathematik beginnen:** Rechenregeln → Brüche/Prozent → Algebra/Gleichungen → Potenzen/Einheiten → Formeln umstellen. Voraussetzungen sind verlinkt.
- **Brüche:** Subtraktionsaufgabe 1/4 − 3/4 mit `-1/2` oder `-0,5` über die normale Minustaste lösen.
- **Trainer:** p=F/A nach A wählen; beide Seiten mit A, anschließend durch p. Erklärung, Vereinfachung und Probe kontrollieren.
- **Physik:** Druck mit 100 N und 20 cm² ergibt 50000 Pa = 0,5 bar.
- **Chemie:** 9 g bei vorgegebenen 18 g/mol ergibt 0,5 mol = 500 mmol.
- **Lernbrücke:** Wärmeleistung zuerst mit 1 kW falsch beantworten, empfohlene Grundlage öffnen, lesen/üben und zurückkehren. Antwort/Einheit bleiben erhalten; anschließend 10,45 kW prüfen.
- **Backup:** Eigene alte 0.4-Sicherung nur nach zusätzlicher Sicherung des aktuellen Stands importieren. Vorschau lesen, Ersetzen ausdrücklich bestätigen, weitere Tabs schließen. Alte Daten bleiben kompatibel; neue Aufgabentypen benötigen 0.5 oder später.

Mehr Details und Fehlervorlage: APPLE_TEST_PLAN. Browseruhr und lokaler Lernstand sind manipulierbar; die Übungsprüfung ist selbst erstellt und nicht offiziell.
