# Version 0.3 übernehmen und auf dem iPad testen

## Übernehmen

1. Pull Request „Version 0.3: Intelligente Lernakademie“ auf GitHub öffnen.
2. Auf die grünen Prüfungen warten; dann **Merge pull request → Confirm merge** wählen.
3. Unter **Actions → Deploy to GitHub Pages** den neuen main-Lauf prüfen. Nach erfolgreichem Job „Website veröffentlichen“ ist die neue Version verfügbar. Falls nötig manuell **Run workflow → main → Run workflow**.
4. Auf dem iPad in Safari `https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/` neu laden. Bestehende Browserdaten nicht löschen, damit die Migration den bisherigen Fortschritt übernehmen kann.

Vor dem Merge bleibt die veröffentlichte Seite auf dem bisherigen Stand. Der PR selbst wird nicht automatisch zusammengeführt oder veröffentlicht.

## Konkreter Testablauf

1. **Dashboard:** Fachgebiets-Fortschritt, heutige Fälligkeiten und Empfehlungen ansehen. Bei noch unbekannten Themen erklärt die App ausdrücklich, dass noch keine bewerteten Antworten vorliegen.
2. **Rechenaufgaben üben:** Wärmeleistungsaufgabe öffnen. `10,45` mit `kW` oder `10450` mit `W` eingeben. Nach **Ergebnis prüfen** müssen Musterlösung und Fehlerhinweise erscheinen.
3. Bewusst `1 kW` eingeben. Nach der Auswertung zum Dashboard zurückkehren. Das betroffene Thema erhält eine begründete Empfehlung; die falsche Antwort bleibt im Lernverlauf berücksichtigt.
4. **Akademie → Rechenaufgaben:** Massenstromaufgabe wählen. `1800 kg/h` ist hier genauso richtig wie `0,5 kg/s`. Optional den Lösungshinweis öffnen.
5. **Übungsprüfung:** Fachgebiet **Elektrotechnik**, Grundlagen und **5 Minuten** wählen. Es erscheinen zwei Auswahlfragen und eine Zahlenaufgabe. Richtige Zahlenantwort: `48 W` bzw. `0,048 kW`. Lösungen dürfen erst nach Abgabe erscheinen.
6. Vor Abgabe Safari neu laden und die Prüfung wieder öffnen. Antworten und Endzeit müssen erhalten sein; die Zeit läuft weiter. Nach Abgabe werden Ergebnis, Fehleranalyse und Empfehlungen gespeichert.
7. Eine neue Prüfung bei Zeitablauf automatisch abgeben lassen. Nicht beantwortete Aufgaben erhalten 0 Punkte, werden aber nicht als nachgewiesene Wissenslücke gezählt.
8. Den alten Lernbereich, das alte Quiz, die drei Niveaus und Karteikarten weiterhin ausprobieren. Der vorhandene Rechner muss mit 0,5 kg/s, 4,18 kJ/(kg·K) und 5 K weiterhin **10,45 kW** liefern.

Nur einen Tab für eine laufende Prüfung verwenden. Die App ist eine lokale Übungssimulation, keine offizielle oder beaufsichtigte Prüfung. Das Ändern der Geräteuhr kann die Zeitmessung beeinflussen. Noch keine automatische Geräte-/Tab-Synchronisation.

## Wenn Speichern nicht funktioniert

Die App meldet Lesefehler, unbekannte Versionen und Schreibfehler. Nicht vorschnell Browserdaten löschen: v2 bleibt als unveränderter Migrationsbestand erhalten. Ein gültiges v3 wird bevorzugt; Änderungen in alten Schlüsseln werden nicht laufend zusammengeführt. Bei einem Lesefehler neu laden, bei unbekannter neuerer Version die passende App-Version verwenden. Ohne zuverlässige Speicherung bleiben Änderungen nur in der Sitzung.

## Für die Entwicklung

```sh
npm ci
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

In dieser Cloud-Maschine kann alternativ der vorhandene Chromium genutzt werden:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Der Browserprüfbefehl baut selbst frisch und startet eine eigene Vorschau; Port 4175 muss frei sein. Screenshots/Traces liegen bei Fehlern in `test-results/`, der Bericht in `playwright-report/`. Die vorhandenen GitHub-Workflows führen diese Tests ebenfalls aus. Ein echter iPad-Safari-Test bleibt zusätzlich nötig.

Die Empfehlung für 0.4 steht in [ROADMAP.md](ROADMAP.md), der genaue Lernalgorithmus in [LEARNING_SYSTEM.md](LEARNING_SYSTEM.md).
