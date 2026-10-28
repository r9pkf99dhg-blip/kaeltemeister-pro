# Version 0.6 · Wiederaufnahme

Branch: `feat/deep-learning-academy-v06`. Ausgangspunkt: main `09a953b` (Merge #7, vollständige Version 0.5 `febd428`). main wird nicht direkt geändert; kein automatischer Merge, kein Force-Push.

## Geprüfte Ausgangslage

25 Module, 63 Zahlenaufgaben, lokaler KaTeX-Satz, Umstellungstrainer, Lernbrücke, Schema 3 / Backupformat 1 sind vorhanden. Baseline: 262 Tests, Typprüfung und Produktionsbuild erfolgreich am 28.10.2026. GitHub-Pages-Basispfad und Workflows bleiben erhalten.

## Etappen

1. Bestandsaufnahme und Sicherung: abgeschlossen mit diesem Commit.
2. Quellenprüfung und Nachweismodell: Commit `8f32b63`. Direkter Abruf der gewünschten Rechts-, KMK-, BIPM-, DGUV- und OpenStax-Webseiten scheitert an Netzwerk-HTTP 403. Originalquellen über offizielle GitHub-Repositorien prüfen, sonst ausdrücklich offen lassen; keine Rechts-/Normaussagen erfinden.
3. Technische Mathematik: sieben neue Module, zwölf Aufgaben, vier zusätzliche geprüfte Trainerfälle. 278 Tests, Typprüfung und Build erfolgreich; Tablet-Browserprüfung siehe Etappenprotokoll.
4. Wechselstrom und Drehstrom: vier Module, zwölf Zahlenaufgaben, verstellbare und textlich beschriebene Diagramme. 292 Tests, Typprüfung, Build und zwei Tablet-Browserfälle erfolgreich. Mathematik-Etappe: `1f24fb8`.
5. Thermodynamik: fünf zusammenhängende Module und zehn Zahlenaufgaben. 303 Tests, Typprüfung, Build und drei Tablet-Browserfälle erfolgreich. Elektro-Etappe: `665aaea`.
6. Lernbrücke: neun konkret getestete Zahlenmuster, alternative Grundlagen, Überspringen, lokal gespeicherter Aufgabenentwurf inklusive offener Lernbrücke. 315 Tests, Typprüfung, Build und vier Tablet-Browserfälle erfolgreich. Thermodynamik: `52c286a`.
7. Vier mehrstufige Lernfälle mit fachlicher Bewertung.
8. Regression, Altbackups, Browser, Quellen-/Formelprüfung.
9. Dokumentation, Push, PR-Versuch. API bislang HTTP 403; ggf. Vergleichslink und vorbereiteten PR-Text bereitstellen.

Nach jeder fertigen Etappe: Typprüfung, Tests und Build; Commit und normaler Push. Bei Unterbrechung zuerst `git status`, `git log`, diese Datei lesen, tatsächlichen Remote-Stand abgleichen. Fremde Änderungen erhalten. Testbefehle: `npm ci --cache /tmp/kaeltemeister-npm-cache`, `npm run typecheck`, `npm test`, `npm run build`, lokal `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`. WebKit in CI prüfen. Keine behauptete menschliche Fachfreigabe oder Hardwareprüfung.
