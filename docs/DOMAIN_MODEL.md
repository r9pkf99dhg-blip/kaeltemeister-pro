# Fach- und Datenmodell · Version 0.4

## Inhalte und stabile Identitäten

Zwölf Fachgebiete, fünf bestehende Kälte- und fünf neue Elektro-Module, jeweils drei Niveaus. Alte IDs, Quellen, Optionen und Formeln werden nicht umgedeutet. Das gemeinsame Katalogmodul kombiniert die Bestände. Kapitel-/Unterkapitel-IDs des Elektrobereichs bleiben erhalten; ihre Zuordnungen werden ergänzt. Die elf weiteren Elektro-Themen bleiben als geplante Themen ausgewiesen.

`Module` erhält optionale `prerequisites: string[]` und `safety: string`. Neue Module nutzen vorhandene Lernziele, Inhalte, Formel-/Quellen-Referenzen, Verständnisfragen, Karten und Fortschrittsregeln. Voraussetzungen sind Lernempfehlungen, keine technischen Zugangssperren.

## Aufgaben und SI

`LearningItem = ChoiceTask | NumericTask`. Zahlenaufgaben enthalten ID/Revision/Thema/Fachgebiet/Niveau, Fachbezug, Formel-ID, gegebene Werte mit Einheit/Mengenart, gesuchte Größe, Berechnungstyp, Ergebniseinheit, SI-/relative Toleranz, Schritte, Fehlerhinweise, Annahmen und Quellen.

24 Aufgaben: die bisherigen acht plus 16 Elektrovarianten. Mengenarten ergänzen Widerstand, Energie, Zeit und Ladung. Neue Einheiten sind mV, mA, Ω, kΩ, J, Wh, kWh, s, min, h und C. Absolute Temperatur erhält bei °C/K einen Offset, Differenzen nicht. Es werden nicht negative Beträge und positive Nenner betrachtet. Kein universeller Herstellerbereich wird erfunden.

Rechentypen zusätzlich: `charge-current`, `ohm-current`, `ohm-voltage`, `ohm-resistance`, `electric-energy`, `series-resistance`, `parallel-resistance`. Der alte `dc-power`-Typ wird wiederverwendet. Eigene Referenzzahlen stehen getrennt in Tests, nicht als zweite produktive Berechnungslogik.

## Fortschritt und Datei

Die v3-Felder bleiben unverändert: `read`, `answers`, `reviews`, `legacySummary`, `updatedAt`, `performance`, `exerciseAnswers`, `recentModules`, `activeExam`, `examHistory`. Die letzte numerische Antwort und aggregierte Zähler sind keine lückenlose Ereignishistorie. Es bleiben maximal fünf letzte Module und 20 Prüfungsergebnisse erhalten. Prüfungs-Snapshots enthalten die damaligen Aufgaben und Lösungen; historische IDs/Revisionen bleiben lesbar.

Das Sicherungsformat `kaeltemeister-pro-backup`, Version 1, verpackt den vollständigen v3-Stand, den verfügbaren alten v1-Fortschritt und die rohe v2-Rückfallkopie. Dateiversion ist nicht Speicherversion. `settings: {}` ist ausdrücklich leer, weil keine dauerhaft gespeicherten UI-Einstellungen existieren. Dateigröße und Strukturen sind begrenzt. Duplikate sind Fehler, keine stillschweigende Zusammenführung. Siehe [BACKUP_RESTORE.md](BACKUP_RESTORE.md).

Journal und Speichergeneration sind Infrastruktur, keine Lernleistungen und kein Bestandteil der importierten fachlichen Historie. Ihre Identität wird lokal für den Restore erzeugt; das Backup kopiert keine fremde laufende Schreibtransaktion.

## Fachprüfung

`ReviewEntry` erfasst Inhalt-ID, Art, Fachgebiet, Status, Prüfumfang, Formel-/Quellen-IDs, Referenzrechnung, Annahmen, Fehler, offene Fragen und unabhängigen Prüfer. Fünf einheitliche Status sind definiert. Derzeit ist `independentReviewer` überall null. Die vorhandenen älteren Reviewfelder bleiben zur Abwärtskompatibilität erhalten; sie werden nicht als menschliche Freigabe interpretiert. Das ausführliche aktuelle Register ist für UI und Bericht maßgeblich.

`Source` unterscheidet weiterhin `consulted`, `unavailable`, `internal` samt Fundstelle, Zugriff, Lizenz und Commit. Quelleneinsicht belegt nur den angegebenen Umfang. Rechenprüfung ist nicht Modellfreigabe.

## Zukunft

Diagramme, Rechner, Stoffwerte, Komponenten, Diagnose und Projekte sollen stabile Fach- und Formel-IDs verwenden. Reale Stoff-/Bauteildaten brauchen eigene Herkunft, Referenzzustände und Aktualisierungsregeln. Optionale Synchronisation braucht einen gesonderten Ereignis-/Konfliktvertrag und bleibt außerhalb von 0.4.
