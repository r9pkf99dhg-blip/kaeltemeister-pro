# Nächste Schritte und Übernahme · Version 0.2

## Änderungen übernehmen

1. Pull Request „Version 0.2: Lernakademie“ auf GitHub öffnen.
2. Prüfen, dass beide GitHub-Prüfläufe grün sind.
3. **Merge pull request → Confirm merge** wählen.
4. Unter **Actions → Deploy to GitHub Pages** den neuen Lauf für `main` öffnen. Der automatische Start bei Push auf `main` bleibt erhalten. Falls nötig manuell **Run workflow → main → Run workflow** wählen.
5. Nach erfolgreichem Job „Website veröffentlichen“ auf dem iPad in Safari `https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/` neu laden.

Der PR selbst veröffentlicht keine neue Website und wird nicht automatisch zusammengeführt.

## Testen ohne Programmierkenntnisse

1. Auf **Akademie** tippen. Die Übersicht zeigt fünf Module; der bisherige Lernbereich, Quiz und Rechner bleiben separat erreichbar.
2. „Grundlagen des Kältekreislaufs“ öffnen. Zwischen **Grundlagen**, **Fachkraft** und **Meisterniveau** wechseln. Die Texte und Beispiele ändern sich. Den offenen Prüfstatus und die Quellenhinweise lesen.
3. Ein Niveau als gelesen markieren. Zur Übersicht zurückkehren und nach **Gelesen** filtern. Eine andere Wissensstufe bleibt separat offen.
4. Eine Verständnisfrage bewusst falsch beantworten und **Antwort prüfen** wählen. Die Erklärung erscheint. In der Übersicht zeigt **Erneut üben** das betroffene Modul. Frage anschließend richtig beantworten.
5. **Karteikarten wiederholen** öffnen, zuerst selbst antworten, dann **Antwort zeigen**. Bei **Gewusst** liegt der nächste Termin einen Tag später; **Nochmal** lässt die Karte heute fällig.
6. Nach „Enthalpie“ oder „Ueberhitzung“ suchen. Module und passende Begriffserklärungen prüfen. Bei Elektrotechnik erscheinen die vorbereiteten Kapitel, noch keine angeblich fertigen Artikel.
7. Safari neu laden. Gelesene Niveaus, gespeicherte Modulantworten und Kartentermine bleiben im selben Browser erhalten. Eine Seite ohne Fortschritt ist nicht automatisch ein Fehler: Andere Geräte/Browserprofile synchronisieren noch nicht.
8. Den alten Rechner prüfen: 0,5 kg/s × 4,18 kJ/(kg·K) × 5 K = **10,45 kW**. Nicht für die gesamte Verdampfung verwenden.

Wenn eine unbekannte Datenversion oder ein Speicherfehler gemeldet wird, keine Browserdaten unüberlegt löschen. Die App bewahrt unsicher gelesene v2-Daten. Nach einem Lesefehler kann Neuladen helfen; bei unbekannter Version eine passende neuere App-Version verwenden.

## Entwicklerprüfungen

```sh
npm ci
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

In dieser Cloud-Maschine alternativ den vorhandenen Browser verwenden:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Playwright baut und startet die Produktionsvorschau selbst. Port 4175 muss frei sein. Fehlerberichte liegen in `playwright-report/` und `test-results/`. Ein testbarer Browser kann Bildschirmgrößen emulieren, ersetzt jedoch kein echtes iPad-Safari.

## Als Nächstes entwickeln

Priorität für 0.3: tatsächliche Quellenprüfung und fachliche Freigabe, Export/Import des lokalen Fortschritts, echter Safari-Gerätetest und ein vollständiger weiterer Lernpfad. Die übrigen großen Plattformmodule bleiben in der [ROADMAP](ROADMAP.md) verankert; ihre Beziehungen stehen in [ARCHITECTURE.md](ARCHITECTURE.md) und [DOMAIN_MODEL.md](DOMAIN_MODEL.md).
