Aktueller Ergänzungsstand: [Version 0.7](RELEASE_V07.md). Historische Grundlagen und Zahlen beziehen sich gegebenenfalls auf die bezeichnete frühere Version.

# iPad-/iPhone-Testplan · Version 0.7

## Was automatisch geprüft wird

Playwright führt die bisherigen App-Flows und neue Datei-/Elektro-/Mehrtab-Szenarien aus: fünf Chromium-Ansichtsgrößen (320/390/820/1180/1440 px) sowie drei konfigurierte WebKit-Projekte für iPhone und iPad hoch/quer. Touch-Kennzeichen, Tastatur, Neuladen, Dezimalkomma, Download, Dateiauswahl, Vorschau/Bestätigung, Zurück/Vor und große Schrift sind abgedeckt. Desktop-Chromium bleibt erhalten.

```sh
npx playwright install --with-deps chromium webkit
npm run test:e2e
npm run test:e2e:webkit
```

**Tatsächlicher lokaler Stand:** Chromium ist verfügbar. Der WebKit-Download nach `/tmp/kaeltemeister-browsers` scheiterte mit HTTP 403 „Domain forbidden“ für die offiziellen Download-Hosts. WebKit wurde lokal nicht erfolgreich ausgeführt. Beide GitHub-Workflows installieren nun Chromium **und WebKit**, ohne WebKit still zu überspringen. Deren tatsächliches Ergebnis ist im PR separat zu prüfen. Ein konfigurierter Test ist kein bestandener Test.

**Kein echtes iPad/iPhone stand hier zur Verfügung.** Auch ein grüner Linux-WebKit-Lauf ersetzt keine echte Safari-/iPadOS-Prüfung, Bildschirmtastatur oder Prüfung des Dateien-Dialogs.

## Deine kurze Geräteprüfung

Zuerst eigene Lerndaten als Datei sichern. Möglichst mit Test-Lernstand arbeiten; den Import nur nach Sicherung des bisherigen Standes bestätigen.

| Schritt | Erwartetes Ergebnis |
| --- | --- |
| Nach PR-Merge und erfolgreichem Pages-Lauf Safari öffnen: https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/ | Version 0.7 wird angezeigt, keine leere Seite |
| iPad hoch/quer drehen; iPhone und Split View, soweit vorhanden | Navigation, Text und Formeln bleiben lesbar, keine abgeschnittenen Bedienelemente |
| In Safari Schrift vergrößern | Texte umbrechen; Felder und Buttons bleiben erreichbar |
| Akademie → Elektrotechnik → Elektrische Grundgrößen | Ziele, drei Niveaus, Fragen, Karten und Zahlenaufgaben vorhanden |
| Mit externer Tastatur Tab/Shift-Tab/Enter verwenden | Fokus sichtbar; Reihenfolge nachvollziehbar; Buttons auslösbar |
| Spannung/Strom/Widerstand → Ergebnis 0,2 A eingeben | Dezimalkomma wird akzeptiert; Ergebnis richtig; Bildschirmtastatur verdeckt das Feld nicht dauerhaft |
| Ohmsches Gesetz → zweite Spannungsaufgabe: 11 V | Richtige Bewertung und schrittweise Erklärung |
| Karten: erst Rückseite zeigen, dann „Gewusst“ | Karte erhält Termin; nach Neuladen erhalten |
| Quiz falsch/richtig beantworten, Lernmodul markieren, neu laden | Lesestand und Antworten bleiben erhalten; die App startet auf dem Dashboard |
| Safari Zurück und Vor nach Navigation in ein Modul | Vorherige App-Ansicht wird wieder geöffnet; keine unbeabsichtigte Datenlöschung |
| Sicherung erstellen → Download-Link antippen | JSON erscheint in Safari-Downloads/Dateien, kann dauerhaft gespeichert werden |
| Sicherungsdatei auswählen → gespeicherte JSON wählen | Vorschau sichtbar; noch nichts überschrieben; Bestätigung erforderlich |
| Nach eigener Sicherung bewusst Testfortschritt ändern und Backup wiederherstellen | Erfolgsmeldung; alter gesicherter Stand wieder da, auch nach Neuladen |
| Eine ungültige Text-/JSON-Datei auswählen | Verständlicher Fehler; bestehender Fortschritt unverändert |
| Übungsprüfung starten, teilweise beantworten, Safari in Hintergrund schicken und zurückkehren | Zeit läuft weiter; Antworten bleiben; nach Ablauf genau ein Ergebnis |
| Zweiten Tab öffnen und dort lernen | Erster Tab fordert bei Datenänderung Neuladen; keine weitere stille Speicherung des alten Standes |
| Tab schließen und Safari später erneut öffnen | Daten bleiben normalerweise verfügbar; privater Modus/Browserdatenlöschung kann sie entfernen |

Nicht durchzuführen: Arbeiten an realen elektrischen Anlagen, um Aufgaben „auszuprobieren“. Die Beispiele sind Lernrechnungen.

## Fehler festhalten

```text
Datum/Uhrzeit:
Gerät und iPadOS/iOS-Version:
Safari-Version / privat oder normal:
App-Version / PR bzw. Commit:
Hochformat/Querformat/Split View, Schriftgröße:
Schritte bis zum Fehler:
Erwartet:
Tatsächlich:
Nach Neuladen weiterhin vorhanden?:
Screenshot (ohne private Lernantworten, wenn nicht nötig):
Sicherung erstellt?:
```

Fehler mit diesen Angaben als GitHub-Issue melden. Persönliche Sicherungsdateien nicht öffentlich anhängen. Falls eine Wiederherstellung fehlschlägt: Journal/Browserdaten nicht löschen, Speicherplatz prüfen und neu laden.


## Zusätzlicher Gerätetest für 0.5

| Schritt | Erwartung |
| --- | --- |
| Dashboard → Mit Mathematik beginnen | Rechenregeln und Voraussetzungen verständlich; weitere Kurse Physik/Chemie erreichbar |
| Brüche-Lektion öffnen | Echte vertikale Brüche statt bloßer Textschrägstriche; kein überbreiter Seiteninhalt |
| Subtraktionsaufgabe: −1/2 eingeben | Als −0,5 richtig bewertet; physikalische Aufgaben behalten andere Bereichsgrenzen |
| Formeltrainer → p=F/A nach A | Erst beide Seiten mit A, dann durch p; jeder Schritt erklärt und abschließende Zahlenprobe |
| Langes Beispiel / große Safari-Schrift | Formelbereich selbst scrollbar, Seite bleibt bedienbar; externe Tastatur kann Formel fokussieren |
| Komplexe Musterlösung | Einzelne Schritte lassen sich aufklappen |
| Falsche Wärmeleistungsantwort 1 kW | Mögliche Grundlagenlektion mit nachvollziehbarer Begründung, keine sichere Fehlerdiagnose |
| Grundlage öffnen, lesen, Selbsttest, zur Aufgabe zurück | Ursprüngliche Antwort 1 und Einheit kW erhalten; Fokus zurück am Ergebnisfeld |
| Physik: Druckaufgabe mit 20 cm² | 0,5 bar bzw. 50000 Pa wird akzeptiert |
| Chemie: Stoffmenge 9 g bei 18 g/mol | 0,5 mol bzw. 500 mmol; chemische Formeln mit korrekten Indizes |
| Eigene 0.4-Sicherung erst nach zusätzlicher Sicherung importieren | Alte Lesestände/Antworten/Karten/Prüfungen unverändert vorhanden |

Ein echter Apple-Gerätetest ist weiterhin durch den Nutzer erforderlich. Die tatsächlichen automatischen Resultate für diese Version stehen in RELEASE_V07 bzw. im verlinkten CI-Lauf; Konfiguration allein ist kein Nachweis.

## Ergänzungen 0.6

Nach Backup: neue Geometrie-/Winkelaufgabe (36,87°), verlorene Nullstelle im Trainer, Sinusdiagramm bei 0/30/60/90°, Dreiphasenleistung (5542,56 W), zwei Wärmeschichten (8 W), vollständige Fallentscheidung und sichtbare Aussagenbelege prüfen. Einheitenmuster 10,45 W statt kW → Lernbrücke öffnen → Safari neu laden → Dashboard Fortsetzen → gleiche Antwort/Einheit/offene Lektion. Zurück fokussiert das Ergebnisfeld. Textvergrößerung, Hoch-/Querformat, Hardwaretastatur und VoiceOver besonders an den Diagrammen und Formeln testen. Keine echte Apple-Hardwareprüfung ist hier erfolgt.

## Zusätzliche 0.7-Geräteschritte

Sprachumschaltung global/lokal, eigenes Rechenblatt mit Neuladen, Werkstatttrainer-Position, Lernbrücke mit unveränderter Einheit und alle fünf Laborbereiche samt Kurve prüfen. Konkrete Referenzwerte und vollständiger Ablauf stehen in RELEASE_V07. Safari-Split-View, Bildschirmtastatur und VoiceOver bleiben echte manuelle Prüfaufgaben, keine bereits erledigten Gerätetests.
