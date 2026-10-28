# Historische Sicherungsreferenz

`v04-backup.json` wurde aus dem tatsächlichen main-Commit `163b9b7` erzeugt: dessen originale Funktionen `emptyAcademy`, `markRead`, `answerQuestion`, `reviewCard`, `createExam`, `setExamAnswer`, `finishExam` und `createBackup` liefen gegen einen reinen Speicheradapter. Eigene fiktive Antworten und Zeitpunkte, keine persönlichen Nutzerdaten. Der Referenzstand wurde per `git archive` in /tmp gelesen, nicht verändert oder gemergt.

Die Datei enthält das echte damalige Dateiformat 1, v3-Lernstand, v2-Rückfallzeichenfolge, altes Quizaggregat und vollständige historische Prüfungssnapshots ohne neue TeX-/Kompetenzfelder. Sie wird nicht mit aktuellen Produktfunktionen nachgebaut. Der Kompatibilitätstest verlangt unveränderten Import und erneuten Export des vollständigen Dateninhalts.

## Version 0.5

`v05-backup.json` wurde mit dem unveränderten Code von main `09a953b` (Merge #7, Exporter 0.5.0) erzeugt: `git archive` in ein temporäres Verzeichnis, altes Vite-SSR lädt alte Funktionen `emptyAcademy`, `markRead`, `answerQuestion`, `reviewCard`, `createExam`, `setExamAnswer`, `finishExam`, `createBackup`. Fiktive Daten: zwei gelesene Grundlagen, eine richtige Antwort, eine wiederholte Karte, abgeschlossene Mathematikprüfung und laufende Chemieprüfung mit Antwort. Einige Zahlenantworten sind absichtlich falsch. Keine echten Nutzerdaten. Kein neuer Aufgabenentwurf in diesem historischen Format.

## Version 0.6

`v06-backup.json` stammt aus dem unveränderten main `8a1ba77` (Merge #8, Exporter 0.6.0), erneut per `git archive` in `/tmp/km-v06-compat`. Die alten Funktionen erzeugten gelesene Module, Quizantwort, Karte, abgeschlossene und laufende Übungsprüfung. Der damals unterstützte Lernbrückenentwurf enthält `ac-three-a`, eigene falsche Antwort `3200 W` und offene Lektion `electric-three-phase`. Fiktive Daten; keine Nutzerdaten. Sprachpräferenz, Werkstatt und Labor existierten damals nicht und wurden nicht nachträglich in die Referenz geschrieben. Der Test verlangt den vollständigen, unveränderten Dateninhalt auch nach Wiederexport.
