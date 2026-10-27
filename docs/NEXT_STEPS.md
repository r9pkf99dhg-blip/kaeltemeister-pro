# Version 0.4 übernehmen und auf dem iPad testen

## Änderungen übernehmen

1. Den Pull Request für Version 0.4 öffnen. Unter **Files changed** stehen Code und Dokumentation.
2. Auf grüne GitHub-Checks warten. Neue WebKit-Tests müssen erfolgreich laufen; bei rot zuerst die Fehler beheben.
3. **Merge pull request** und anschließend **Confirm merge** wählen.
4. Unter **Actions → Deploy to GitHub Pages** den main-Lauf öffnen. Er startet automatisch nach dem Merge.
5. Falls nötig: **Run workflow → main → Run workflow**. **Settings → Pages → Source: GitHub Actions** beibehalten.
6. Erst nach erfolgreichem Job **Website veröffentlichen** ist 0.4 öffentlich verfügbar. PRs allein veröffentlichen nichts.

## Auf dem iPad

Safari öffnen: **https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/**. Neu laden und auf „Version 0.4“ achten. Kein Konto und kein kostenpflichtiger Dienst nötig.

**Zuerst sichern:** Am Seitenende **Sicherung erstellen → Sicherungsdatei herunterladen**. Die JSON-Datei in **Dateien** aufbewahren. Zum Wiederherstellen Datei auswählen, Vorschau lesen, ausdrücklich das Ersetzen bestätigen. Vorher aktuelle Daten sichern und andere App-Tabs schließen. Eine defekte Datei darf nichts verändern.

**Elektro lernen:** Akademie → Fachgebiet **Elektrotechnik** → mit **Elektrische Grundgrößen** beginnen. Die fünf Module bauen aufeinander auf. Im Modul finden sich Niveauwahl, Voraussetzungen, Fragen, Karten und Rechenaufgaben.

**Schnellprüfung:**

- Spannung/Strom/Widerstand: erste Aufgabe **0,2 A**.
- Ohmsches Gesetz: Spannungsvarianten **24 V** und **11 V**.
- Leistung/Arbeit: **12 W**, **0,6 W**, **24 Wh**, **0,075 kWh**.
- Reihen-/Parallelschaltung: **360 Ω**, **3,2 kΩ**, **80 Ω**, **50 Ω**.
- Vorhandener Wärmeleistungsrechner: 0,5 kg/s × 4,18 kJ/(kg·K) × 5 K = **10,45 kW**.

Markiere ein Modul als gelesen, beantworte eine Frage und lade neu. Die Daten müssen bleiben. Eine Übungsprüfung kann auch während Hintergrundwechsel/Neuladen ablaufen; ihre ursprüngliche Endzeit bleibt maßgeblich. Die Aufgaben sind selbst erstellt und nicht offiziell.

Bitte führe den kurzen [Apple-Testplan](APPLE_TEST_PLAN.md) durch. Er enthält erwartete Ergebnisse und eine Fehlervorlage. Ein echtes Apple-Gerät war hier nicht verfügbar; der lokale WebKit-Download war blockiert. Erfolgreiche Chromium-Prüfungen sind keine Garantie für deine Safari-/iPadOS-Version.

## Fachliche Abnahme

Das [Prüfregister](REVIEW_REGISTER.md) kann eine qualifizierte Kälte-/Elektro-Fachperson bearbeiten. Rechenprüfungen und Quellenabgleich sind dokumentiert, eine unabhängige menschliche Fachfreigabe bleibt offen. Keine praktischen elektrischen Arbeiten anhand der Lernbeispiele durchführen.

## Wenn etwas nicht funktioniert

Bei rotem Workflow den betroffenen Schritt und die Fehlermeldung notieren. Keine geheimen Schlüssel ergänzen. Bei Speicherfehlern nicht die Browserdaten löschen: zuerst vorhandene Sicherung aufbewahren, Speicherplatz prüfen und neu laden. Bei Wiederherstellungsfehlern bewahrt das Journal den vorherigen Stand, soweit der Browser seine Daten behält. Persönliche Sicherungen nicht öffentlich in Issues hochladen.
