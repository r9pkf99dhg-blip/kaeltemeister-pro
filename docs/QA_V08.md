# Qualitätsprüfung · Version 0.8

Stand 29.10.2026. Funktionaler Prüfstand: `5b8abd1` auf `feat/refrigeration-mastery-v08`. Keine Tests übersprungen oder fehlgeschlagene Prüfungen umgangen. main ist weiterhin `908993d` (Version 0.7).

## Lokal tatsächlich erfolgreich

| Prüfung | Ergebnis |
| --- | --- |
| TypeScript | `npm run typecheck`, erfolgreich |
| Unit-/Integration | `npm test`: **485 Tests in 41 Dateien** |
| Produktionsbuild | `npm run build`, erfolgreich; Vite-Basis `/kaeltemeister-pro/` |
| Chromium gesamt | **225/225**: 45 Abläufe × 320/390/820/1180/1440 px, 3,6 min |
| Neue Kreislaufregression gezielt | **12/12** auf zwei Smartphones/Tablet, zusätzlich im Gesamtlauf enthalten |
| Workflow-Syntax | actionlint, erfolgreich |
| Dokumentgeneratoren | `npm run docs:review`, `npm run docs:audit`, erfolgreich |
| Git-Diff | `git diff --check`, erfolgreich |

Die vollständige Regression enthält alte Artikel/Quiz/Rechner, Akademie, Lernen/Karten/Prüfungszeit, Formelsatz, Werkstatt/Labor, Lernbrücke, Datei-Backup/Import/Mehrtab-Schutz, neue Mastery-Modi/Sitzungen/Missionen und Referenzkreis. Der gesamte sechsteilige Missionspfad wird mit tatsächlichen Antworten, Reihenfolge und getrennten festen Zahlenreferenzen durchgespielt.

Der erste vollständige Chromium-Lauf hatte 223/225 erfolgreiche Fälle. Zwei Smartphone-Rückwege zur Werkstatt scheiterten durch die neue Überschriftenstruktur, die den mobilen Layout-Viewport verbreiterte. Vorhandene `PageHeading`-Komponente, sichere Textumbrüche und begrenzte Fieldsets beheben die Ursache. Die neue Breitenprüfung vergleicht scrollWidth mit **clientWidth**, weil innerWidth auf mobilen Browsern durch Überlauf bereits vergrößert sein kann. Danach gezielte Fälle und gesamter Lauf erfolgreich; keine erzwungenen Klicks oder Timeout-Erhöhung zur Umgehung.

## GitHub Actions

Der Push startet **App prüfen** einschließlich Chromium und WebKit. Funktionaler Lauf: [40834345173](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40834345173), Commit `5b8abd1`. Dieser Lauf wurde tatsächlich bis zum erfolgreichen Ende beobachtet. Der endgültige Dokumentationscommit startet erneut denselben ungekürzten Workflow; aktuelles Ergebnis zusätzlich auf GitHub prüfen.

**Beobachteter Status: erfolgreich. 360/360 Browserfälle in 6,3 Minuten, einschließlich 225 Chromium- und 135 WebKit-Fällen.** Installation, Typprüfung, 485 Unit-/Integrationstests und Build ebenfalls erfolgreich.

45 Abläufe × 8 Projekte = **360 Browserfälle** wurden in diesem GitHub-Lauf tatsächlich erfolgreich ausgeführt, davon 225 Chromium und 135 WebKit. Ein bloß konfigurierter Test wäre dagegen kein Erfolgsnachweis. Pages prüft bei einem PR erneut und veröffentlicht ausschließlich nach Push/Merge auf main oder manuellem main-Start. Keine Veröffentlichung dieses Entwicklungsbranches und kein automatischer Merge.

## Nicht lokal verfügbar

WebKit 27.2 / Playwright-Build 2370: erneuter tatsächlicher Downloadversuch am 29.10.2026 scheiterte für offizielle Hosts mit HTTP 403 „Domain forbidden“. Lokal kein erfolgreicher WebKit-Lauf behauptet. Keine realen iPad-/iPhone-/VoiceOver-/Safari-Dateien-/Hintergrund-/Speicherquotatests; Linux-WebKit ersetzt diese nicht.

## Fachliche und Speichersicherheit

Alle 120 Zahlenaufgaben besitzen eigene feste Referenzen, davon 15 neu; Stoffmodell- und Rechenvalidierung sind getrennt. SHA256, Referenzanker, Phasen, Ancillary, Clapeyron, Bilanz, Einheiten, Fehlerbereiche und Diagrammgeometrie sind geprüft. Unabhängige experimentelle EOS-Freigabe und menschliche Fachprüfung bleiben offen: [CYCLE_VALIDATION](CYCLE_VALIDATION.md).

Echte Exportdateien 0.4/0.5/0.6/0.7 importieren und reexportieren unverändert. Neue optionale Felder, korrupte Metadaten, alte Revisionen, doppelte Ergebnisabschlüsse, historische Hilfen sowie Journal und Mehrtab-Konflikte sind geprüft. Bloßes Erkunden des Diagramms ersetzt keine Rechenblattnotizen.

## Performance und Umfang

Lokaler Produktionsbuild: Hauptchunk etwa **482 kB / 148 kB gzip**, Referenz-/Fachchunk etwa **163 kB / 56 kB gzip**. Mastery- und Kreislaufoberfläche werden separat nachgeladen. Rohes Stoffdatenartefakt etwa **119 kB**, keine große WASM-Runtime, keine externen Stoffdatenanfragen, keine Pflichtserver. Bundle-Warnlimit nicht erhöht.

Gezielte Browsermessung des Nachladens/Anzeigens im Referenztest etwa 0,45–0,80 s in den dokumentierten erfolgreichen Wiederholungsläufen. Dies enthält Test-/Layoutaufwand und ist kein iPad-Hardwarebenchmark oder garantierte Startzeit. SVG-Polylinien statt freier EOS-Rechnung; Pointer-Pan aktualisiert lokal und speichert erst am Ende. Große Tabellen scrollen lokal. Zusätzliche lokale Chromium-Stichprobe bei 820×1180: belegter JS-Heap etwa 5,84 MiB auf dem Dashboard und 10,43 MiB nach Referenzansicht mit allen Hilfslinien/Zoom; 20 Pointerbewegungen verursachten genau **einen** localStorage-Schreibzugriff am Drag-Ende. Laden/Schalten plus diese Bewegungen dauerten zusammen 1,254 s einschließlich Playwright-Aufwand. Momentaufnahme ohne Garbage-Collection-Kontrolle, kein Langzeit-Speicherlecknachweis und kein Apple-Hardwarebenchmark; echte Geräteprüfung bleibt offen.

## Wiederholen

Node 24: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`; dann `npx playwright install --with-deps chromium webkit` und `npm run test:e2e`. Port 4175 freihalten. Cloud-Alternative: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`. Entwicklungsfortsetzung: [NEXT_STEPS](NEXT_STEPS.md).

## Pull Request und Veröffentlichung

Der tatsächliche `gh pr create`-Versuch scheiterte an der GitHub-GraphQL-API mit `Forbidden` (Proxy/HTTP 403). Git-HTTPS-Push funktioniert. Keine zusätzliche verfügbare GitHub-Connector-Fähigkeit oder alternative Standard-API-Anmeldung gefunden; keine unsichere Umgehung. PR-Beschreibung vollständig in [PULL_REQUEST_0_8](PULL_REQUEST_0_8.md). Kein PR-Link erfunden.

[Direkten Vergleich öffnen](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/compare/main...feat/refrigeration-mastery-v08?expand=1). Auf dem iPad **Create pull request** wählen, Titel/Text aus der Datei einsetzen und nochmals **Create pull request**. Danach neue PR-Checks abwarten; Merge erfolgt ausschließlich nach deiner Freigabe. main war bei Abschluss vollständig Vorfahr des Featurebranches, keine Merge-Konflikte.

Pages-Basispfad, main-Push/Dispatch, offizielle Pages-Actions und Berechtigungen unverändert und mit actionlint geprüft. Live-Abruf der bestehenden Website war in der Cloud ebenfalls HTTP 403 gesperrt; deshalb kein neues Deployment behauptet. Erst dein Merge löst die Veröffentlichung von 0.8 aus.
