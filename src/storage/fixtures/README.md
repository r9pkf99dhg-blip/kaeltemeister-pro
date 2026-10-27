# Historische Sicherungsreferenz

`v04-backup.json` wurde aus dem tatsächlichen main-Commit `163b9b7` erzeugt: dessen originale Funktionen `emptyAcademy`, `markRead`, `answerQuestion`, `reviewCard`, `createExam`, `setExamAnswer`, `finishExam` und `createBackup` liefen gegen einen reinen Speicheradapter. Eigene fiktive Antworten und Zeitpunkte, keine persönlichen Nutzerdaten. Der Referenzstand wurde per `git archive` in /tmp gelesen, nicht verändert oder gemergt.

Die Datei enthält das echte damalige Dateiformat 1, v3-Lernstand, v2-Rückfallzeichenfolge, altes Quizaggregat und vollständige historische Prüfungssnapshots ohne neue TeX-/Kompetenzfelder. Sie wird nicht mit aktuellen Produktfunktionen nachgebaut. Der Kompatibilitätstest verlangt unveränderten Import und erneuten Export des vollständigen Dateninhalts.
