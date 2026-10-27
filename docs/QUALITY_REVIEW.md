# Technische Qualitätsprüfung

Stand: 27.10.2026. Ausgangspunkt ist `main` nach Merge #2, Commit `43d2b8fa61de8ef3375ae8399b713b6786cc84c8`. Dieser Bericht unterscheidet bestehende Funktionen, Korrekturen und noch geplante Erweiterungen.

## Analyse der gesamten Projektstruktur

| Bereich                              | Ausgangslage                                                                                               | Ergebnis / Entscheidung                                                                                                                                                           |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/main.tsx`, `index.html`         | React-Einstieg mit StrictMode, deutsche Sprache, Viewport, lokales Favicon                                 | Passend für eine statische App; unverändert                                                                                                                                       |
| `src/App.tsx`                        | Navigation, Dashboard, Artikel, Quiz und Rechner in einer Datei mit rund 950 Zeilen                        | Nur Quiz und Rechner als eigenständige Features ausgegliedert; gemeinsamer `PageHeading`; Dashboard/Artikel bleiben zusammen, bis weitere Anforderungen das Trennen rechtfertigen |
| `src/content.ts`                     | Drei Artikel und zwölf Fragen; Artikel haben stabile IDs, Fragen nur Arrayindizes                          | Bestehende Texte/Lösungen unverändert; aktuelle Datenverträge in `content-types.ts`; Zielmodell separat dokumentiert                                                              |
| `src/logic.ts`                       | Rechnen, deutsche Dezimalwerte, Normalisierung des Browserfortschritts                                     | Einheitenprüfung ergänzt; gültige Artikel-IDs aus dem Katalog; Lese- und Schreibfehler unterschieden                                                                              |
| `src/styles.css`                     | Tailwind 4 plus eigene responsive Regeln, Seitenleiste bzw. mobile untere Navigation, reduzierte Animation | Kein Redesign; Scrollabstand zur festen Mobilnavigation korrigiert und Darstellung bei fünf Größen geprüft                                                                        |
| Tests unter `src/`                   | 27 Tests, hauptsächlich Standardabläufe                                                                    | Auf 48 Funktions-/Oberflächentests erweitert; zusätzliche echte Browserprüfungen unter `e2e/`                                                                                     |
| `package.json`, Lockdatei, `.nvmrc`  | Reproduzierbare npm-Installation, Node 24, keine Laufzeitdienste                                           | Nur Browser-Testwerkzeuge und explizite Node-Typen ergänzt; npm ci weiterhin erfolgreich                                                                                          |
| `tsconfig.json`, `vite.config.ts`    | Strenge TypeScript-Prüfung, `/kaeltemeister-pro/`, Vitest mit jsdom                                        | Auch E2E-Konfiguration/-Tests typgeprüft; Vitest gezielt auf `src/**/*.test.{ts,tsx}` begrenzt, damit Playwright separat läuft                                                    |
| `.github/workflows/ci.yml`           | Typen, Tests und Build auf PR/Push                                                                         | Node-Version aus `.nvmrc`; Browserprüfungen und Fehlerberichte ergänzt; bestehenden Check-Namen behalten                                                                          |
| `.github/workflows/deploy.yml`       | Offizielle Pages-Actions, main-Push, manueller Start, PR-Build ohne Deployment                             | Funktionsfähig bestätigt; Browserprüfungen zusätzlich vor Upload/Deployment geschaltet; Berechtigungen und Trigger bleiben erhalten                                               |
| `README.md`, `.gitignore`, `public/` | Anleitung, Ausschluss generierter Dateien, lokales Favicon                                                 | Anleitung für Tests/Struktur aktualisiert; Screenshots/Reports bleiben unversionierte Testausgaben                                                                                |

## Konkrete Befunde und Korrekturen

### 1. Artikelwechsel konnte unterhalb der Überschrift beginnen

Reproduziert durch einen neuen Smartphone-Browsertest: Beim Öffnen des dritten Artikels war seine Überschrift vollständig außerhalb des Viewports. Nur die Hauptnavigation scrollte; der Wechsel innerhalb des Lernbereichs nicht. Fokus/Scrollen erfolgen jetzt nach dem Rendern bei Seiten- **und** Artikelwechsel. Der zuvor fehlgeschlagene Test besteht auf allen geprüften Größen.

### 2. Lesefehler konnte vorhandenen Fortschritt überschreiben

Die bisherige Ladefunktion gab bei einem localStorage-Lesefehler leeren Fortschritt zurück. Der anschließende Speichereffekt konnte diesen Startwert trotz fehlgeschlagener Lektüre zurückschreiben. Jetzt wird ein Lesefehler separat gemeldet und das Speichern für diese Sitzung ausgesetzt. Auch weitere Lernaktionen überschreiben dann den alten Datensatz nicht. Ein Test hält gültige alte Daten vor, simuliert den Lesefehler und prüft anschließend, dass kein Schreibzugriff stattgefunden hat. Nach Neuladen kann erneut geladen werden.

Schreibfehler zeigen weiterhin einen verständlichen Hinweis. Ungültiges JSON wird wie bisher als beschädigter Datensatz behandelt und durch gültige Startdaten ersetzt; gültige v1-Daten bleiben vollständig lesbar. Der Speicherschlüssel wurde nicht verändert und es wurde keine Migration durchgeführt.

### 3. Erweiterungen benötigten Änderungen an mehreren Stellen

Artikel-IDs in der Speicherprüfung sowie Artikel-/Fragenanzahlen in der Oberfläche waren fest eingetragen. Sie werden jetzt aus dem vorhandenen Katalog abgeleitet. Inhaltsverträge und Tests prüfen die aktuellen Artikel-/Fragestrukturen. Es wurden keine bestehenden IDs oder Lösungen geändert.

### 4. Unbekannte Einheiten wurden stillschweigend akzeptiert

`calculateHeat` behandelte jede unbekannte Massenstromeinheit wie kg/s und jede unbekannte Wärmekapazitätseinheit wie kJ/(kg·K). Die aktuelle Oberfläche bietet solche Werte nicht an, zukünftige Aufrufer könnten sie aber übergeben. Die Rechenfunktion weist sie jetzt ausdrücklich zurück. Bestehende Rechnungen liefern unverändert dieselben Ergebnisse.

### 5. Mobile Navigation konnte einen Quiz-Button überdecken

Die neuen echten GitHub-Browserprüfungen haben auf 320 px einen weiteren Fehler gezeigt, den der lokale System-Chromium nicht reproduzierte: Die feste Mobilnavigation fing Klicks auf „Nächste Frage“ ab. Die Diagnose stammt aus den Playwright-Klickprotokollen. Mobile Scroll-Padding und Scroll-Margins reservieren jetzt Abstand zu dieser Navigation; Hover-Verschiebungen von Buttons sind auf kleinen Ansichten deaktiviert. Die normalen Klicktests bleiben unverändert, es werden weder erzwungene Klicks noch abgeschwächte Assertions verwendet. Der GitHub-Reporter stellt künftige Fehler direkt in den PR-Prüfungen dar, zusätzlich zu Screenshots und Traces.

## Ausgeführte Prüfungen

- Saubere Installation mit `npm ci` aus der Lockdatei.
- TypeScript-Prüfung für App, Konfiguration und Browserprüfungen.
- **48 Vitest-Tests:** bisherige Tests plus gemischte Einheiten, Nullleistung, Überlauf, unbekannte Einheiten, beschädigte/teilweise Daten, Inhaltskonsistenz, vollständige Fehlerrunde, Bestwerterhalt, Abbruch, Einheitenwechsel und Schutz bei Lesefehlern.
- **25 Playwright-Prüfungen:** fünf Abläufe jeweils auf fünf Größen. Navigation/Assets, Artikel/Neuladen/Zurücksetzen, vollständiges Quiz mit gemischtem Ergebnis, Rechner mit sichtbaren Umrechnungen und Fehlerfällen sowie Tastaturbedienung.
- Produktionsbuild unter `/kaeltemeister-pro/`; JS/CSS/Favicon am Projektpfad mit HTTP 200; erwartetes Rechnerergebnis 10,45 kW.
- Kein horizontaler Überlauf bei den geprüften Dashboard-, Lern-, Quiz- und Rechneransichten; keine Browser-Konsolenfehler oder unbehandelten JavaScript-Fehler in diesen Abläufen.
- Dashboard-Screenshots aus den Browserprüfungen erzeugt; Tablet- und schmale Smartphoneansicht zusätzlich visuell geprüft.
- Beide GitHub-Workflows mit `actionlint` geprüft; zusätzlich Validierung durch echte PR-Läufe auf GitHub vorgesehen.

| Browserprojekt   | Größe       | Eingabe                 |
| ---------------- | ----------- | ----------------------- |
| Smartphone klein | 320 × 740   | Touch + Tastaturprüfung |
| Smartphone       | 390 × 844   | Touch + Tastaturprüfung |
| Tablet hoch      | 820 × 1180  | Touch + Tastaturprüfung |
| Tablet quer      | 1180 × 820  | Touch + Tastaturprüfung |
| Desktop          | 1440 × 1050 | Maus + Tastaturprüfung  |

Lokal wurde Chromium aus der Cloud-Maschine verwendet; CI installiert die zum Playwright-Paket gehörige Chromium-Version. Die Projekte emulieren Bildschirmgröße und Touch, **keinen echten iPad-Safari**. Es gibt noch keine automatische pixelgenaue Vergleichsprüfung und kein vollständiges Barrierefreiheitsaudit. Playwright speichert Screenshots/Traces bei Fehlern; der HTML-Bericht zeigt die Ergebnisse. „Sichtbar“ oder „kein Überlauf“ allein beweist keine gute Lesbarkeit für jeden Nutzer.

## Nachweis automatischer GitHub-Pages-Veröffentlichung

Die GitHub-API bestätigt beide Workflows als `active` und Pages als `build_type: workflow`.

- [Deployment-Lauf 40525395615](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40525395615): Ereignis **push**, Commit **43d2b8f** auf `main`, Ergebnis **success**. Sowohl Build als auch Job „Website veröffentlichen“ erfolgreich.
- Deployment **7361801073**: Status **success**, Ziel `github-pages`, Zieladresse `https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/`.
- Der vorangegangene Pull-Request-Lauf **40525369578** war ebenfalls erfolgreich; Pull Requests veröffentlichen selbst keine Website.

Damit ist das automatische Deployment der bisherigen main-Version belegt. Dieser PR erweitert die Qualitätsbarriere; sein zukünftiges main-Deployment kann erst nach dem Merge überprüft werden. Es wird kein zusätzlicher Push auf main und keine manuelle Veröffentlichung nur zu Testzwecken erzeugt. Administrative Actions-Einstellungen sind mit dem vorhandenen API-Zugriff nicht lesbar (HTTP 403); die tatsächlich erfolgreichen Läufe sind der maßgebliche Nachweis. Ein erfolgreicher Deployment-Status ersetzt keinen Test jeder Funktion auf der Live-Seite.

## Bewusst unverändert und bekannte Grenzen

- Kein neues Routing, Backend oder globales Zustandsframework. Navigation startet bei Neuladen wie bisher im Dashboard; eine laufende Quizrunde wird beim Verlassen verworfen.
- Der aktuelle Fortschritt ist pro Browserprofil/Webadresse lokal. Keine automatische Zusammenführung paralleler Tabs, kein Export/Import und keine Gerätesynchronisation; Zielmodell/Migration in `CONTENT_MODEL.md`.
- V1 speichert aggregierte Quizwerte, keine einzelnen Antworten oder historischen Inhaltsrevisionen. Deshalb keine unbelegten Aussagen über langfristige Beherrschung einzelner Themen.
- Fachtexte haben noch keine strukturierte Quellenverwaltung. Formale Datentests sind keine fachliche oder normative Freigabe. Quellenpflege und fachliche Prüfung sind vor großen Inhaltserweiterungen priorisiert.
- Der Rechner bleibt auf sensible Wärme ohne Phasenwechsel beschränkt. Angezeigte Werte werden auf sechs Nachkommastellen gerundet; sehr kleine Werte können als 0 erscheinen.
- Keine neue Offline-/PWA-Funktion, keine neuen Fachmodule in diesem Qualitätsschritt. Sie sind in der ROADMAP geplant.

## Lokale Reproduktion

```sh
npm ci
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

In dieser Cloud-Maschine ist bereits `/usr/bin/chromium` vorhanden. Falls der Download des Playwright-Browsers durch Netzwerkregeln gesperrt ist, wurde lokal stattdessen geprüft mit:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Der E2E-Befehl baut selbst frisch, startet eine eigene Vorschau auf Port 4175, prüft den Produktionsstand und beendet seinen Server danach. Ein bereits belegter Port führt absichtlich zum Fehler, damit nie versehentlich ein alter Stand getestet wird. `playwright-report/` und `test-results/` sind lokale, ignorierte Ausgaben. In CI werden Fehlerberichte sieben Tage aufbewahrt. Die bestehenden CI-Check-Namen bleiben erhalten, weil Repository-Branchregeln sie möglicherweise referenzieren.
