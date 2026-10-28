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
- 401 Unit-/Integrationstests in 31 Dateien, TypeScript und Build bestanden (lokale Logs `/tmp/km-stable-*`).
- GitHub fand zwei echte Darstellungsregressionen: 1 px WebKit-Überstand bei 200 % Schrift sowie sieben Navigationspunkte in bisher fünf mobilen Spalten. Umbruch-/Minimalbreiten begrenzt und Navigation auf sieben passende Spalten korrigiert; kein Ausblenden des gesamten Überlaufs, keine Tests deaktiviert. Vollständigen korrigierten Lauf noch bestätigen.
- Neuer Browserablauf: falsche Einheit → einfache Lernbrücke → Rückkehr mit Eingabe, Einheit, Rechenblatt und unveränderter globaler Präferenz; große Schrift auch in neuen Ansichten.

## Noch abzuschließen

1. Vollständige Chromium-Regression und GitHub Chromium/WebKit für korrigierten Stand abwarten, jeden verbleibenden Fehler untersuchen; keine grünen Ergebnisse vorwegnehmen.
2. Sprach-/Laborinhalte im Fachprüfregister aufnehmen, dokumentierte Nachweisgrenzen beibehalten. Quellenzugriff: BIPM/PTB sowie genannte Lernstudienseiten lieferten HTTP 403; kein behaupteter Volltextzugriff. Bestehende tatsächlich gelesene OpenStax-Fundstellen weiterverwenden, eigene Ableitungen kennzeichnen.
3. Architektur, Lernsystem, Datenmodell, Quellen, Roadmap, Labor-, Werkstatt-, Sprach-/Validierungsanleitungen und Release/PR-Beschreibung auf tatsächlichen 0.7-Stand bringen. App-/Backupversion anpassen.
4. Nach grünen Prüfungen Commit/normaler Push; aktuellen Remote-main-Vergleich und Merge-Konflikte prüfen. PR mit vorbereitetem Text versuchen. Git-HTTPS funktioniert, GitHub API bisher HTTP 403. Bei fehlender Berechtigung direkten Vergleichslink und genaue manuelle Schritte bereitstellen.

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
