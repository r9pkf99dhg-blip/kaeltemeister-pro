# KälteMeister Pro · Version 0.6

Kostenloser Lernbegleiter für die Kältemeisterschule auf iPad, Smartphone und Computer. React, TypeScript, Vite und Tailwind; kein Benutzerkonto, kein eigener Server, keine kostenpflichtige API.

## Was funktioniert

- **Lernakademie:** 45 Module: fünf Kälte-, neun Elektro-, sechzehn Mathematik-, vier Physik-, drei Chemie- und acht Thermodynamik-Module mit Grundlagen-, Fachkraft- und Meisterniveau; 14 strukturierte Fachgebiete. Andere Inhalte bleiben deutlich als in Vorbereitung gekennzeichnet.
- **Adaptives Lernen:** richtige/falsche Versuche, Themenlücken, transparente Empfehlungen und Wiederholungsabstände nach Leistung und Zeit. Keine KI-Diagnose oder offizieller Kompetenznachweis.
- **Rechenaufgaben:** 97 Varianten, darunter Ohmsches Gesetz, elektrische Arbeit, Reihen-/Parallelschaltungen sowie Wärmeleistung, Massenstrom, Temperaturdifferenz, Überhitzung, Unterkühlung, elektrische Gleichstromleistung, Kälteleistungszahl und Heiz-COP. Mit Einheiten, Toleranz, Hinweis, Schritten und Fehlererklärung.
- **Übungsprüfung:** selbst erstellte gemischte Auswahl-/Zahlenaufgaben, Fachgebiet, Niveaugrenze, Zeitlimit, Neuladen mit gleicher Endzeit, automatische Abgabe und Ergebnisanalyse. Keine offiziellen Meisterprüfungsaufgaben.
- **Persönliches Dashboard:** Fortschritt je Fachgebiet, heutige Fälligkeiten, Schwächen, zuletzt bearbeitete Module, Empfehlungen und Prüfungsverlauf.
- **Weiterhin vorhanden:** alte Artikel, Zwölf-Fragen-Rundentest, Wärmeleistungsrechner und insgesamt 90 Karteikarten.
- **Mathematischer Formelsatz:** echte Brüche, Wurzeln, Indizes und chemische Formeln mit lokalem KaTeX/mhchem; verständliche Herleitungen und aufklappbare Musterlösungen.
- **Formelumstellungstrainer:** 15 kuratierte Fälle mit 20 Schritten mit begründeten Operationen und Zahlenproben.
- **Intelligente Lernbrücke:** konkrete Antwortmuster erklären, eine passende Grundlage anbieten und zur erhaltenen Eingabe zurückkehren. Ein letzter Entwurf bleibt auch nach Neuladen erhalten. Keine sichere Fehlerdiagnose.
- **Fachliche Tiefe:** Geometrie/Trigonometrie, Definitionsbereiche/Algebra, Wechsel-/Drehstrom und Thermodynamik; vier aktive Fallstudien mit fachlicher Entscheidung.
- **Aussagenbelege:** 70 begrenzte Belege mit Fundstelle, Quellentyp, Annahmen, Grenzen und getrennten Quellen-/Rechentests; keine vorgetäuschte Fachfreigabe.
- **Datensicherung:** vollständiger verfügbarer Lernstand als versionierte JSON-Datei; Import mit Prüfung, Vorschau, Bestätigung und Rücknahmejournal. Anleitung: [BACKUP_RESTORE.md](docs/BACKUP_RESTORE.md).
- **Fachqualität:** durchsuchbares Prüfregister und bearbeitbarer Prüfbericht; keine behauptete menschliche Fachabnahme.
- **Lokaler Fortschritt:** v3 übernimmt v2-Lesestände, Antworten und Termine, ohne das Original zu löschen oder eine frühere Versuchshistorie zu erfinden.

Die Grundbeziehungen zu Wärme, Gleichstromleistung und COP wurden im offiziellen OpenStax-Quellarchiv nachgelesen; alle 97 Zahlenbeispiele haben unabhängige Referenztests. Eine unabhängige fachliche Gesamtfreigabe ist weiterhin offen. Quellenumfang und Modellannahmen werden sichtbar angegeben. Keine Normen, realen Stofftabellen oder Herstellerwerte erfunden.

Umfang, offene Quellenabgleiche, Grenzen und iPad-Test: [RELEASE_V06.md](docs/RELEASE_V06.md). Ein vollständiger Meisterlehrplan und die unabhängige Fachfreigabe sind weiterhin offen.

## Auf dem Computer starten

Node.js **24** mit npm installieren, den Projektordner im Terminal öffnen:

```sh
npm ci
npm run dev
```

Die im Terminal angezeigte Adresse mit dem Projektpfad `/kaeltemeister-pro/` öffnen. Mit `Strg+C` beenden. Alternativer Port: `npm run dev -- --port 5174`.

Für das iPad nach Veröffentlichung einfach in Safari öffnen: **https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/**. Eine ausführliche Anleitung mit Testwerten steht in **[docs/NEXT_STEPS.md](docs/NEXT_STEPS.md)**.

## Prüfen

```sh
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium webkit
npm run test:e2e
```

`npm test` prüft Fachlogik, Einheiten, Quellen-/Inhaltsverweise, Aufgaben, Empfehlungen, Migration und Oberfläche. `npm run test:e2e` baut frisch und prüft fünf Chromium-Ansichtsgrößen sowie drei WebKit-Konfigurationen. Einzelne Browser: `npm run test:e2e:chromium` oder `npm run test:e2e:webkit`. Das sind keine physischen iPad-Safari-Tests. Der lokale WebKit-Download ist derzeit durch HTTP 403 blockiert; CI-Ergebnisse separat prüfen. Die Zeitablaufprüfung verwendet eine kontrollierte Browseruhr; sie wartet nicht fünf echte Minuten.

Port 4175 muss für den Testserver frei sein. Bei Fehlern: `test-results/` und `playwright-report/`; `npx playwright show-report` öffnet den Bericht. Cloud-Alternative mit vorhandenem Browser: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`.

`npm run preview` startet eine lokale Vorschau von `dist/`, keinen dauerhaften Hostingdienst. Der vorhandene Rechner liefert bei 0,5 kg/s × 4,18 kJ/(kg·K) × 5 K unverändert **10,45 kW**. Für Phasenwechsel reicht diese einfache Formel nicht.

## GitHub Pages und Änderungen übernehmen

1. Den PR dieser Version öffnen und auf grüne Checks warten.
2. **Merge pull request → Confirm merge** wählen.
3. **Settings → Pages → Source: GitHub Actions** beibehalten.
4. Unter **Actions → Deploy to GitHub Pages** den automatisch gestarteten main-Lauf abwarten; alternativ **Run workflow → main → Run workflow**.
5. Nach erfolgreichem Job **Website veröffentlichen** die Seite auf dem iPad neu laden.

Der Workflow liegt in `.github/workflows/deploy.yml`, baut/testet vor Veröffentlichung und verwendet die offiziellen Pages-Actions. Basispfad ist `/kaeltemeister-pro/`. PRs veröffentlichen keine Website. Falls Actions fehlen, prüfen, ob die Datei auf `main` liegt und Actions unter **Settings → Actions → General** erlaubt sind. Bei „Pages site not found“ die Quelle prüfen. Eine erforderliche Freigabe unter **Settings → Environments → github-pages** muss gegebenenfalls bestätigt werden. „Visit site“ erscheint erst nach erfolgreichem Deployment.

Für ein öffentliches Repository kann GitHub Pages mit GitHub Free genutzt werden. Bei privaten Repositories kann ein anderer GitHub-Tarif nötig sein. Keine vertraulichen Daten veröffentlichen. Es sind keine persönlichen Tokens im Quellcode erforderlich.

## Daten und Grenzen

Fortschritt liegt nur im jeweiligen Browserprofil unter derselben Webadresse. Datei-Export/Import mit Vorschau und bestätigtem Ersetzen ist vorhanden. Keine Gerätesynchronisation und kein Offline-Modus. Änderungen aus anderen Tabs sperren veraltete Schreibzugriffe; neu laden. Nur einen Tab für eine laufende Prüfung verwenden. Browseruhr und Speicher sind manipulierbar; die Prüfung ist eine Selbstlernübung ohne Aufsicht. Bei gesperrter Speicherung zeigt die App einen Hinweis. Das Löschen von Browserdaten entfernt Fortschritt; ältere Migrationsschlüssel bleiben bei normalem Versionswechsel erhalten.

## Orientierung und Dokumentation

- `src/technical/`: gemeinsame SI-Rechenlogik für Rechner und Aufgaben.
- `src/academy/`: Inhalte, Register, adaptives Lernen, Aufgaben und Prüfungen.
- `src/features/`, `src/content.ts`, `src/logic.ts`: weiterhin unterstützte Altangebote und Kompatibilitätsadapter.
- `e2e/`: Browserprüfungen; `.github/workflows/`: CI/Pages.
- [Architektur](docs/ARCHITECTURE.md), [Datenmodell](docs/DOMAIN_MODEL.md), [Lernalgorithmus und Migration](docs/LEARNING_SYSTEM.md).
- [Quellen und Prüfumfang](docs/SOURCES.md), [Auslieferungsstand 0.3](docs/VERSION_0_3.md), [ROADMAP](docs/ROADMAP.md), [Übernahme und iPad-Test](docs/NEXT_STEPS.md).

Die App erweitert die langfristige Plattform schrittweise. Diagramme, Stoff-/Bauteildaten, Diagnose, Auslegung und Projektdokumentation bleiben geplant und verwenden später dieselben Fach-, Formel- und Quellen-IDs.

Version 0.6: [Änderungen und Prüfergebnisse](docs/RELEASE_V06.md), [iPad-Testplan](docs/APPLE_TEST_PLAN.md), [Elektro-Lernpfad](docs/ELECTRICAL_CURRICULUM.md), [fachlicher Prüfbericht](docs/REVIEW_REGISTER.md).


## Neue Grundlagen und Wiederaufnahme

Auf dem Dashboard **Mit Mathematik beginnen**, **Mit Physik beginnen** oder **Mit Chemie beginnen** wählen. Mathematik beginnt bei Rechenregeln und führt zu Brüchen, Prozent, Algebra, Gleichungen, Potenzen, Einheiten und Formelumstellung. Weitere Oberstufen- und Fachthemen sind ausdrücklich geplant, nicht als fertige Kurse ausgegeben.

Lehrpläne: [Mathematik](docs/MATHEMATICS_CURRICULUM.md), [Physik](docs/PHYSICS_CURRICULUM.md), [Chemie](docs/CHEMISTRY_CURRICULUM.md), [Elektrotechnik](docs/ELECTRICAL_CURRICULUM.md) und [Thermodynamik](docs/THERMODYNAMICS_CURRICULUM.md). [Fachgebiets-Audit](docs/DOMAIN_AUDIT.md) zeigt Lücken und tatsächlich verfügbare Inhalte. [Formelsatz](docs/FORMULA_RENDERING.md), [Lernbrücke](docs/LEARNING_PREREQUISITES.md) und [Versionsbericht](docs/RELEASE_V06.md) erklären die Umsetzung.

Für die Entwicklung: [NEXT_STEPS](docs/NEXT_STEPS.md) ist der Wiederaufnahmepunkt. Abgeschlossene Etappen liegen in einzelnen Commits auf `feat/foundations-academy-v05`. Kein automatischer Merge. `npm run docs:review` und `npm run docs:audit` erzeugen Berichte aus demselben Katalog. Die historische Sicherungsreferenz aus 0.4 bleibt unverändert in den Tests.
