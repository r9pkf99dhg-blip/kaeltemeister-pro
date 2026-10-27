# Datensicherung und Wiederherstellung · Version 0.5

## Am iPad, iPhone oder Computer

1. Am Ende einer App-Seite **Sicherung erstellen** wählen.
2. **Sicherungsdatei herunterladen** antippen. In Safari die Datei herunterladen und in der App **Dateien** aufbewahren. Auf Wunsch in einem selbst gewählten Speicherort sichern; die App überträgt nichts automatisch.
3. Zum Wiederherstellen zuerst den aktuellen Stand ebenfalls sichern. Andere Tabs dieser App schließen.
4. **Sicherungsdatei auswählen** → JSON-Datei aus Dateien auswählen.
5. Vorschau prüfen. Noch ist nichts geändert. Modulanzahl, Antworten, Karten und Prüfungen werden angezeigt.
6. Das ausdrückliche Ersetzen bestätigen und **Bestätigte Sicherung wiederherstellen** wählen.
7. Die Erfolgsmeldung erscheint und der importierte Stand ist sofort aktiv. Anschließend neu laden und den Stand kontrollieren.

Ein Import ersetzt vollständig; es gibt keine Zusammenführung. Eine laufende Prüfung behält ihre ursprüngliche Endzeit und kann unmittelbar nach dem Import ablaufen. Dateien enthalten persönliche Lernantworten und Zeitstempel: selbst sicher aufbewahren. Eine Sicherung ist nicht verschlüsselt und kein signierter Leistungsnachweis.

## Versioniertes Dateiformat

```json
{
  "format": "kaeltemeister-pro-backup",
  "schemaVersion": 1,
  "appVersion": "0.5.0",
  "exportedAt": "2026-10-27T18:00:00.000Z",
  "data": {
    "academy": { "schemaVersion": 3 },
    "legacy": { "read": [], "attempts": 0, "best": 0, "last": null },
    "legacyV2": null,
    "settings": {}
  }
}
```

Das Beispiel kürzt `academy` ab und ist **keine importierbare Beispieldatei**. Der vollständige Vertrag steht in `src/academy/model.ts` und `src/storage/backup.ts`. Formatversion 1 und Akademieversion 3 sind unterschiedliche Versionen. Unterstützt werden vollständige Sicherungen des aktuellen Formats. Lose localStorage-v1/v2-Dateien sind keine Sicherungsdateien; bestehende Browserbestände werden wie bisher automatisch migriert und können danach exportiert werden.

Enthalten sind Lesestände je Niveau/Revision, letzte Modul-/Zahlenantworten, Kartenstände, aggregierte Lernleistung, Termine, letzte Module, aktive Prüfung mit Antworten und Snapshots, bis zu 20 Prüfungen einschließlich Fehleranalyse, altes Quizaggregat und die unveränderte v2-Rückfallzeichenfolge, sofern vorhanden. Empfehlungen sind abgeleitet und werden neu berechnet. Das alte Quiz speichert nur Durchlaufzahl/Bestwert/letztes Ergebnis, keine historische Einzelantwortliste. Nicht zuvor gespeicherte Daten können nicht exportiert werden. Dauerhafte Benutzereinstellungen existieren derzeit nicht; `settings: {}` reserviert einen dokumentierten Platz. Temporäre Filter und Wissensstufenwahl bleiben sitzungsbezogen.

## Prüfung vor Änderungen

- Höchstens 5 MiB (UTF-8); Dateigröße wird vor dem Einlesen und erneut nach dem Lesen geprüft.
- Gültiges JSON, passender Formatname und unterstützte Version, Pflichtfelder, Typen und gültige Prüfungs-Snapshots.
- Duplikate in JSON-Objektschlüsseln, Leseniveaus, Modulaktivitäten, Prüfungs-IDs, Prüfungsaufgaben, Antwortoptionen und gegebenen Größen werden abgewiesen.
- Gefährliche Objektschlüssel, übermäßige Tiefe (>32) oder Strukturgröße (>100000 Knoten) werden abgewiesen.
- Historische Inhalts-IDs/Revisionen bleiben erhalten; sie werden nicht still auf aktuelle Lösungen umgeschrieben.
- Unbekannte Versionen oder defekte Dateien ändern keinen Speicher. Der Bestätigungsbutton bleibt bis zur expliziten Zustimmung gesperrt. Direkt vor dem Schreiben wird erneut validiert.

## Möglichst atomare Wiederherstellung

localStorage besitzt keine echte Transaktion über mehrere Schlüssel. Der Adapter `StoragePort` beschränkt den Zugriff auf `getItem/setItem/removeItem` und erlaubt Fehlersimulationen sowie spätere Ablösung.

1. Alle bisherigen rohen Zeichenfolgen von v1, v2, v3 und Speichergeneration lesen.
2. Vor Änderungen ein **pending**-Journal unter `kaeltemeister-pro:restore-journal:v1` schreiben. Schlägt schon dies fehl, wird nichts ersetzt.
3. Zielstände schreiben, neue Generation vergeben, anschließend Journal als **committed** markieren.
4. Erst dann aufräumen und React vollständig mit neu eingelesenen Daten starten.
5. Bei Schreibfehler alle vorherigen rohen Werte zurückschreiben. Scheitert die Rücknahme, bleibt das Journal erhalten und normale Speicherwirkungen sind gesperrt.
6. Beim nächsten App-Start wird ein offenes pending-Journal vor dem Lesen/Schreiben zurückgenommen. Ein committed-Journal wird nur aufgeräumt. Ein defektes Journal sperrt Schreiben; es wird nicht blind gelöscht.

Das Journal benötigt zusätzlich freien Speicher. Bei Speicherfehler: keine Browserdaten löschen, Speicherplatz freigeben und neu laden. Ein endgültiger Geräte-/Browserdatenverlust kann auch das Journal löschen; regelmäßige externe Dateien bleiben nötig. Bei einem bereits beschädigten Lernstand kann ein gültiges Backup nach bewusster Bestätigung helfen; ein vollständiger Export des beschädigten Zustands wird nicht als valide Sicherung angeboten.

## Mehrere Tabs und spätere Synchronisation

Änderungen an Lerndatenschlüsseln, Generation oder Journal aus einem anderen Tab sperren dessen weitere automatische Speicherung und fordern Neuladen. Vor einem Import alle anderen Tabs schließen. Dies ist Konflikterkennung, keine verteilte Transaktion oder Zusammenführung gleichzeitiger Bearbeitung. Bei offenen Schreibvorgängen wird vor dem Speichern zusätzlich auf das Journal geprüft.

Keine Accounts, Telemetrie oder Cloud-API. Ein zukünftiger IndexedDB-Adapter braucht echte Transaktionen und Migrationsprüfungen. Gerätesynchronisierung benötigt separat Ereignis-IDs, Löschgenerationen, Konfliktregeln und ausdrückliche Entscheidung über Datenübertragung; Zeitstempel allein reichen nicht.


## Kompatibilität 0.4 → 0.5

Dateiformat 1 und Fortschrittsschema 3 bleiben unverändert. Neue Module, Fragen, Karten und Kompetenzen nutzen stabile zusätzliche IDs und vorhandene Speicherfelder. TeX-/Kompetenzangaben in neuen Aufgaben-Snapshots sind optional; alte Snapshots brauchen sie nicht.

Die Testdatei `src/storage/fixtures/v04-backup.json` wurde mit den echten Funktionen aus main `163b9b7` erzeugt, nicht mit dem neuen Code rekonstruiert. Sie enthält ausschließlich fiktive Lernantworten und prüft das Beibehalten von altem Quizaggregat, v2-Rückfallkopie, Karten und vollständiger Prüfungshistorie. Neue negative Mathematik-Snapshots werden ebenfalls exportiert, importiert und bewertet.

Neue Sicherungen können neue Aufgabentypen enthalten, die eine alte App 0.4 nicht kennt. Deshalb für solche Sicherungen 0.5 oder später verwenden. Eine vollständige Rückwärtskompatibilität neuer Daten zu älteren Apps wird nicht versprochen. Unbekannte Versionen/Datentypen werden geschützt statt still überschrieben. Die offene Brückenlektion, temporäre Filter und die aktuelle Trainerschrittauswahl werden nicht als dauerhafte Benutzereinstellungen gespeichert.
