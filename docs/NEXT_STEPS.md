# Version 0.6 · Wiederaufnahme

Branch: `feat/deep-learning-academy-v06`. Ausgangspunkt: main `09a953b` (Merge #7, vollständige Version 0.5 `febd428`). main wird nicht direkt geändert; kein automatischer Merge, kein Force-Push.

## Geprüfte Ausgangslage

25 Module, 63 Zahlenaufgaben, lokaler KaTeX-Satz, Umstellungstrainer, Lernbrücke, Schema 3 / Backupformat 1 sind vorhanden. Baseline: 262 Tests, Typprüfung und Produktionsbuild erfolgreich am 28.10.2026. GitHub-Pages-Basispfad und Workflows bleiben erhalten.

## Etappen

1. Bestandsaufnahme und Sicherung: abgeschlossen mit diesem Commit.
2. Quellenprüfung und nachweisbare Aussagen: in Arbeit. Direkter Abruf der gewünschten Rechts-, KMK-, BIPM-, DGUV- und OpenStax-Webseiten scheitert an Netzwerk-HTTP 403. Originalquellen über offizielle GitHub-Repositorien prüfen, sonst ausdrücklich offen lassen; keine Rechts-/Normaussagen erfinden.
3. Technische Mathematik: Geometrie, Trigonometrie, vertiefte Algebra, begrenzter geprüfter Trainer.
4. Wechselstrom und Drehstrom: Lernpfad, Diagramme, Rechenkern, unabhängige Zahlenreferenzen.
5. Thermodynamik: Zustände, Energie, Wärmeübertragung, Kältebezug.
6. Lernbrücke: beobachtbare Fehlermuster, passende Kompetenz und sichere Rückkehr.
7. Vier mehrstufige Lernfälle mit fachlicher Bewertung.
8. Regression, Altbackups, Browser, Quellen-/Formelprüfung.
9. Dokumentation, Push, PR-Versuch. API bislang HTTP 403; ggf. Vergleichslink und vorbereiteten PR-Text bereitstellen.

Nach jeder fertigen Etappe: Typprüfung, Tests und Build; Commit und normaler Push. Bei Unterbrechung zuerst `git status`, `git log`, diese Datei lesen, tatsächlichen Remote-Stand abgleichen. Fremde Änderungen erhalten. Testbefehle: `npm ci --cache /tmp/kaeltemeister-npm-cache`, `npm run typecheck`, `npm test`, `npm run build`, lokal `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`. WebKit in CI prüfen. Keine behauptete menschliche Fachfreigabe oder Hardwareprüfung.
