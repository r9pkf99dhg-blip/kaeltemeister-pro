# iPad-/iPhone-Testplan · Version 0.4

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
| Nach PR-Merge und erfolgreichem Pages-Lauf Safari öffnen: https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/ | Version 0.4 wird angezeigt, keine leere Seite |
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
