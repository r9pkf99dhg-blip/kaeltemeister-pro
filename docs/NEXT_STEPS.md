# Version 0.6 · Sicherer Wiederaufnahmestand

Branch: `feat/deep-learning-academy-v06`. Grundlage main `09a953b` (Merge #7, vollständige 0.5 `febd428`). Keine direkten main-Änderungen, kein automatischer Merge, kein Force-Push, keine Branchlöschung.

## Abgeschlossene Etappen

| Etappe | Commit | Ergebnis |
| --- | --- | --- |
| 1 Bestandsaufnahme | 4254dfe | Vollständige 0.5 in main geprüft; Ausgangslage: 262 Tests, Typprüfung, Build |
| 2 Quellen/Nachweismodell | 8f32b63 | Reale Zugriffsergebnisse, Nachweisarten und Quellenbewertung; offene Rechts-/SI-/Sicherheitsquellen |
| 3 Mathematik | 1f24fb8 | Sieben neue Module, zwölf Aufgaben, vier neue Trainerfälle; 278 Tests, Build/Typprüfung und Tabletfall grün |
| 4 Elektro | 665aaea | Vier Module, zwölf Aufgaben, Diagramme; 292 Tests und zwei Tablet-Browserfälle grün |
| 5 Thermodynamik | 52c286a | Fünf Module, zehn Aufgaben; 303 Tests und drei Tablet-Browserfälle grün |
| 6 Lernbrücke | 552d050 | Konkrete Zahlenmuster, fortsetzbarer Entwurf, Neuladen/Backup; 315 Tests und vier Tablet-Browserfälle grün |
| 7 Fallstudien | a7be9a3 | Vier aktive Lernfälle mit Entscheidung; 317 Tests und fünf Tablet-Browserfälle grün |
| 8a Fach-/Regressionsprüfung | 550122d | Aussagenbelege, echte alte Backups, Variablen/Alternativtexte; 321 Tests, Typprüfung, Build, Workflow-Lint und 150 vollständige Chromium-Prüfungen grün |
| 8b Gemeinsame Begriffe | 22a7525 | Zwölf neue Glossarbegriffe mit Modulverweisen/Suche; 322 Tests und 155 Chromium-Prüfungen grün |
| 8c Abschlusskorrekturen | 05f53da | Thermo-Grundlagenprüfung, Diagrammfrage und WebKit-Umbruch; 323 Tests/24 Dateien, Typprüfung, Build, vollständiger Chromium-Lauf 155 grün; nach CSS-Korrektur 24 gezielte Browserfälle grün. Neueste vollständige CI zusätzlich prüfen |

Dokumentation und Veröffentlichungsvorbereitung: `508e287`. Die PR-Erstellung blieb trotz funktionierendem Push durch API-403 blockiert. Nach jeder Etappe wurde normal gepusht. Der letzte hochgeladene Commit ist die Wiederaufnahmebasis; dessen Identität vor Weiterarbeit tatsächlich mit `git ls-remote` vergleichen.

## Bestätigter Abschluss

Korrigierter Code `05f53da`: [GitHub-Lauf 40656718539](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40656718539) erfolgreich. 248 Browserprüfungen ohne verbleibenden Fehler: 155 Chromium und 93 WebKit, einschließlich iPhone bei 200 Prozent Schrift. npm-Installation, TypeScript, 323 Tests und Build ebenfalls erfolgreich. Der zuvor gefundene WebKit-Überlauf ist damit im vollständigen Lauf behoben. Nachfolgende Commits dokumentieren diesen unveränderten Funktionsstand und die blockierte PR-Erstellung.

Remotevergleich am Abschluss: main bleibt `09a953b`, Entwicklungsbranch ist konfliktfrei; Merge-Simulation ohne Konflikt. Keine tatsächliche Zusammenführung. Kein Force-Push oder Löschen. Letzten Dokumentations-HEAD vor Merge wie jeden neuen PR-Stand nochmals in Actions prüfen.

## Noch manuell / fachlich abzuschließen

- Vor dem späteren Merge sicherstellen, dass die neuesten PR-Checks weiterhin erfolgreich sind. Bestätigter vollständiger Code-Lauf einschließlich WebKit: siehe oben.
- PR-Erstellung am Abschluss erneut mit autorisiertem gh versucht: GraphQL POST Forbidden (HTTP 403). Keine weitere verfügbare GitHub-Connector-Methode. Git-Push funktioniert; eine PR wurde nicht erstellt. Direkten Vergleichslink und docs/PULL_REQUEST_0_6.md verwenden.
- Merge nur nach ausdrücklicher Freigabe; dann main-Pages-Lauf und 0.6 auf der Website prüfen.
- Echte iPad/iPhone-Hardwareprüfung gemäß APPLE_TEST_PLAN; kein solcher Test hier behauptet.
- Unabhängige menschliche Fachprüfung und gezielter externer Abgleich eigener Ableitungen; aktuelle Meister-/Ausbildungs-/KMK-/BIPM-/DGUV-Primärquellen waren technisch blockiert.

## Wiederaufnahme nach Unterbrechung

1. `git status`, `git log -12 --oneline`, diese Datei und RELEASE_V06 lesen. Fremde Änderungen erhalten.
2. Remote main und Entwicklungsbranch holen und vergleichen; nicht von altem main neu implementieren, keinen Force-Push verwenden.
3. `npm ci --cache /tmp/kaeltemeister-npm-cache`, `npm run typecheck`, `npm test`, `npm run build`.
4. Lokal vorhandener Browser: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`. Ohne Systembrowser offizielle Playwright-Browser installieren. WebKit in GitHub CI prüfen, falls lokaler Download gesperrt bleibt.
5. `npm run docs:review`, `npm run docs:audit`, beide Workflows mit actionlint prüfen. Erst Fehler beheben und erneut prüfen, dann committen/pushen.
6. Historische Fixtures niemals mit neuen Exportern überschreiben. Schema 3 / Backupformat 1 erhalten. Neue Felder optional und geschützt validieren.

## iPad, PR und Veröffentlichung

Vergleich: https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/compare/main...feat/deep-learning-academy-v06?expand=1

Auf dem iPad öffnen → **Create pull request** → base `main`, compare `feat/deep-learning-academy-v06` → Titel „Version 0.6: Fachliche Tiefenakademie, Elektrotechnik und intelligentes Problemlösen“ → vorbereiteten Beschreibungstext aus PULL_REQUEST_0_6.md einsetzen → **Create pull request**. Erst nach eigener Freigabe und grünen neuesten Checks **Merge pull request**, danach **Confirm merge**. Keinen Branch löschen müssen.

Nach grünem Pages-Lauf: https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/ in Safari neu laden, Version 0.6 prüfen und zunächst Sicherung in Dateien speichern. Manuelle Testwerte stehen in RELEASE_V06. main und veröffentlichte Website bleiben bis zum freigegebenen Merge auf ihrem bisherigen Stand.

## Bewusst später

Vollständige unabhängige Fachfreigabe, umfassender Meisterlehrplan, allgemeines CAS, Motor-/Schutzpfad, unsymmetrische/verzerrte Netze, reale Stoffdaten/log-p-h und professionelle Anlagenrechner. Trainer-/Fall-Schrittpositionen und unbewertete Fallantworten sind sitzungsbezogen; ein letzter Zahlenübungs-/Lernbrückenentwurf ist dagegen jetzt gesichert.
