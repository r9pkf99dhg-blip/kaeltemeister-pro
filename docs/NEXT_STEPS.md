# Version 0.7 · Wiederaufnahme und Etappen

## Branch und Schutzregeln

Arbeitsbranch: `feat/interactive-technical-lab-v07`, angelegt auf main `8a1ba77` (Merge #8, vollständige Version 0.6). Am 28.10.2026 erneut geprüft: Remote main unverändert; letzter zuvor gesicherter lokaler/Remote-Commit identisch `0f9282e`. Kein neuer Branch nötig. main nicht direkt ändern, kein automatischer Merge, kein Force-Push, keine Branchlöschung. Neue ungesicherte Änderungen sorgfältig lesen und erhalten.

## Abgeschlossene Etappen

| Etappe | Commit | Implementiert und tatsächlich geprüft |
| --- | --- | --- |
| 1 · Ausgangslage/Plan | `bac679b` | Version 0.6 ist über PR #8 in main; vorhandene Architektur, IDs und Speicherschutz erhalten. |
| 2 · Erklärungsebenen | `3ee1afa` | Globale gesicherte Präferenz, temporäre Lektionssprache, 20 Kernmodule mit drei einfachen Erklärstufen, drei Artikel. Gemeinsame Formeln/Beispiele/Grenzen; sichtbar ursprüngliche Fassung bei anderen Modulen. |
| 3a · Verträge/Arithmetik | `3839f2f` | Optionale geschützte Entwürfe und Hilfenachweise, begrenzter Parser ohne Codeausführung. |
| 3b · Werkstatt | `66537e3` | Acht Übungsarten, Filter, eigenes Rechenblatt, Hilfen und fortsetzbarer letzter Entwurf; vorhandener Grader und Prüfungsmodus. |
| 4 · Labormodelle | `93473cf` | SI-Vertrag plus 26 Ziel-/Modellvarianten mit festen unabhängigen Referenzen. |
| 5 · Techniklabor | `c08e7eb` | Einheiten, Wärme, Elektro, Rohrgeometrie, stationäre Wärmeübertragung; ein gemeinsamer Rechnerleser mit Formel/Rechenweg/Lernverknüpfungen. |
| 6 · Visualisierungen | `df114fa` | Veränderbare Wärmeleistungskurve, Rohrquerschnitt, Leistungsdreieck, Schichtskizze, Textalternativen. |
| 7 · Lernbrücke 3.0 | `0f9282e` | Zahlen-/Auswahlaufgaben, freiwillige einfache/fachliche Hilfe, getrennte Zahlen-/Einheitenrückmeldung, begrenzte Celsius-/Flächenmuster. 398 Tests, Typprüfung/Build und acht gezielte Chromium-Abläufe grün. |

Jede abgeschlossene Etappe wurde normal auf GitHub gepusht. Dies sind historische Prüfstände; den finalen 0.7-Status unten aktualisieren.

## Aktuelle Etappe 8 · Stabilisierung

- Echte zusätzliche Referenzsicherung aus unverändertem 0.6-Exporter `8a1ba77` erzeugt: `src/storage/fixtures/v06-backup.json`. Unveränderter Import/Reexport mit Karten, Prüfungshistorie, laufender Prüfung und offenem Lernbrückenentwurf geprüft. 0.4-/0.5-Referenzen bleiben unverändert.
- Neue Backupprüfung für Labor, Sprachpräferenz, Rechenblatt, Hilfe, Antworten und Trainerposition; beschädigte optionale Felder werden vor Import abgewiesen.
- Trainer-Wiederaufnahme korrigiert: dessen Container-ID ist bewusst kein normaler Zahlenaufgaben-Identifier. Revisionen vor Wiederaufnahme kontrollieren.
- 409 Unit-/Integrationstests in 31 Dateien, frische Installation, TypeScript und Build bestanden (lokale Logs `/tmp/km-stable-*`).
- GitHub fand zwei echte Darstellungsregressionen: 1 px WebKit-Überstand bei 200 % Schrift sowie sieben Navigationspunkte in bisher fünf mobilen Spalten. Umbruch-/Minimalbreiten begrenzt und Navigation auf sieben passende Spalten korrigiert; kein Ausblenden des gesamten Überlaufs, keine Tests deaktiviert. Vollständiger korrigierter Chromium-Lauf: 185/185 erfolgreich. Statistik-Karten zusätzlich gegen intrinsischen Überstand abgesichert. WebKit-Status für diesen neuen Stand noch bestätigen.
- Neuer Browserablauf: falsche Einheit → einfache Lernbrücke → Rückkehr mit Eingabe, Einheit, Rechenblatt und unveränderter globaler Präferenz; große Schrift auch in neuen Ansichten.

## Etappe 9 · Abschlussdokumentation und Veröffentlichung

- README, ARCHITECTURE, DOMAIN_MODEL, LEARNING_SYSTEM, SOURCES, QUALITY_ASSURANCE, ROADMAP, Apple-Testplan und Fachprüfumfang auf 0.7 aktualisiert. Neue TECHNICAL_LAB, EXERCISE_WORKSHOP, LANGUAGE_LEVELS, CALCULATOR_VALIDATION, RELEASE_V07 und vollständige PULL_REQUEST_0_7.md vorhanden. App/Export melden 0.7.0. Alle lokalen Markdown-Dateiverweise auf Existenz geprüft.
- Funktionsstand **`f744aa2`** normal hochgeladen. Frische Installation/Typprüfung/409 Tests/Build und 185 lokale Chromium-Prüfungen erfolgreich; nach Korrektur des erklärenden Backup-Hinweises Typprüfung, dieselben 409 Tests und Build erneut erfolgreich.
- **[GitHub-Lauf 40725723803](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40725723803): Success, 296/296 Browserprüfungen (185 Chromium + 111 WebKit)**. Bestehende Funktionsprüfungen nicht umgangen. Frühere rote Läufe bleiben sichtbar. Emulierte Laboransichten zusätzlich visuell geprüft, keine behauptete Apple-Hardwareprüfung.
- main `8a1ba77` erneut abgeglichen: vor Abschlussdokumentation 0 fremde main-Commits / zehn eigene Commits; Feature-Remote und lokal identisch. `git merge-tree --write-tree origin/main HEAD` erfolgreich ohne Konflikte. Kein Merge ausgeführt.
- PR-Versuch `gh pr create --repo r9pkf99dhg-blip/kaeltemeister-pro --base main --head feat/interactive-technical-lab-v07 --body-file docs/PULL_REQUEST_0_7.md`: GitHub API HTTP 403/Forbidden (auch CONNECT zu api.github.com bestätigt). Andere verfügbare Tools bieten keine autorisierte GitHub-PR-Erstellung. Öffentliche PR-Suche zeigte null Treffer für diesen Quellbranch. Kein PR-Link erfunden, keine unsichere Umgehung.

## Verbleibende Veröffentlichungsschritte

1. Aktuellen Dokumentationscommit normal pushen und seinen vollständigen CI-Status prüfen. Funktionscode ist bereits vollständig grün; neuester Check muss vor Merge ebenfalls grün sein.
2. Vergleich öffnen: https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/compare/main...feat/interactive-technical-lab-v07?expand=1
3. Auf dem iPad **Create pull request**, Titel aus RELEASE_V07 und Beschreibung aus PULL_REQUEST_0_7.md übernehmen, erneut **Create pull request**. `main` als Ziel, bestehenden Branch als Quelle belassen.
4. Nur nach deiner ausdrücklichen Freigabe/grünen Checks **Merge pull request → Confirm merge**. Dies wird hier nicht automatisch ausgeführt. Branch nicht löschen.
5. Grünen automatischen main-Lauf **Deploy to GitHub Pages** abwarten; alternativ **Run workflow → main → Run workflow**. Offizielle Pages-Actions, erforderliche Berechtigungen und Basispfad `/kaeltemeister-pro/` unverändert geprüft. Der Branch-Push veröffentlicht nicht die Live-Seite.
6. Safari öffnen: https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/ · Version 0.7 kontrollieren. Vorher Lernstand sichern; vollständige Geräte-/Referenzschritte in RELEASE_V07.

Keine weitere funktionale Implementierung ist für diesen abgeschlossenen 0.7-Umfang offen. Falls der neueste CI-Lauf einen Fehler findet: konkrete Ursache bearbeiten, zugehörige Prüfung erneut ausführen, Commit und normaler Push. Verbleibende fachliche/Gerätegrenzen unten und in ROADMAP sind keine vorgetäuscht erledigten Freigaben.

## Bewusst offen

Unabhängige menschliche Fachfreigabe aller Inhalte; echte iPad-/iPhone-Safari-Hardwaretests inkl. VoiceOver und Hintergrundverhalten; vollständige Übersetzung aller 45 Module; freie symbolische Algebra und automatische Fachbewertung eigener Langtexte; Motor-/Schutzdimensionierung; reale Stoffdaten/log-p-h; professionelle Auslegung, Gerätesynchronisation und PWA. Die Werkstatt speichert genau einen letzten Entwurf, kein unbegrenztes Arbeitsheft.

## Befehle bei Wiederaufnahme

```sh
git status --short --branch
git log -10 --oneline
git ls-remote --heads origin main feat/interactive-technical-lab-v07
npm ci --cache /tmp/kaeltemeister-npm-cache
npm run typecheck
npm test
npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium
npm run docs:review
npm run docs:audit
```

WebKit lokal: `npm run test:e2e:webkit`, sofern Browserpaket verfügbar; gegenwärtig Download blockiert, GitHub CI separat bestätigen. Port 4175 muss frei sein. Logs sind Hilfsmittel, die versionierte Dokumentation und Commits sind der dauerhafte Wiederaufnahmepunkt. Veröffentlichungsanleitung folgt in RELEASE_V07.
