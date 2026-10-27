# Fach- und Datenmodell · Version 0.5

## Gemeinsamer Katalog

14 Fachgebiete, 25 Module, drei Niveaus, 80 Modulfragen, 50 Karten, 63 Zahlenaufgaben und elf Umstellungsziele. Neue Fachgebiete Physik/Chemie ergänzen die bestehenden zwölf; die acht Mathematiklektionen gehören zum vorhandenen Mathematik-Fachgebiet. Alte IDs werden weder gelöscht noch umgedeutet. Ein Katalogadapter erzeugt aus strukturierten FoundationLesson-Inhalten die vorhandenen Module/Fragen/Karten.

FoundationLesson beschreibt Ziel, Nutzen/Praxisbezug, einfachen Inhalt, Begründung, Transfer, Beispiel, Herleitung, Fehler, Zusammenfassung, Voraussetzungen, Formeln, Quellen und Selbsttest. Die drei bestehenden Niveaus werden als Einstieg, Begründung und technischer Transfer genutzt; kein vollständiger Oberstufen-/Meisterprüfungsumfang wird dadurch behauptet.

Neue Fachbegriffe liegen im gemeinsamen Register und verweisen auf Module. Voraussetzungen sind gerichtete Empfehlungen, keine Zugangssperren. Das automatisch erzeugte DOMAIN_AUDIT trennt verfügbare Module von geplanten Themen.

## Formel- und Aufgabenvertrag

Formula ergänzt optional `tex` und Variablendefinitionen. Der Textausdruck und stabile IDs bleiben erhalten. NumericTask ergänzt optionale `texSteps`, ItemBase optionale `requiredCompetencyIds`. Alte Prüfungssnapshots benötigen diese Felder nicht. Optionale Felder werden beim Import geprüft; beliebige Objekte statt Textlisten werden abgewiesen.

Neue numerische Typen beschreiben begrenzte Schuloperationen (Rechenreihenfolge, vier Bruchoperationen, Prozent/Dreisatz, Term, lineare Gleichung, Potenz/Hauptwurzel, Einheitenidentität) sowie Geschwindigkeit, Kraft, mechanische Arbeit, Leistung aus Energie, Druck, Dichte, sensible Wärmemenge und Stoffmenge. Rechenfunktionen werden geteilt; Formeltext wird nie ausgeführt.

Neue Mengenarten: reine mathematische Zahl, Prozent, Masse, Länge, Fläche, Volumen, Druck, Dichte, Kraft, Beschleunigung, Geschwindigkeit, Stoffmenge, molare Masse. SI-Umrechnungen sind explizit; Temperaturdifferenzen bleiben vom absoluten Offset getrennt. Nur mathematische Zahlen dürfen negativ sein. Einfache Bruchantworten werden nur im ausdrücklich numerischen Mathematikfeld erkannt, nicht in normalen Texten oder als beliebige Formelprogramme.

## Kompetenzbeziehungen

Competency hat stabile ID, Titel und lessonId. Aufgaben tragen benötigte Kompetenz-IDs; eine Aufgabe kann mehrere Anforderungen besitzen. Lernleistung wird aus aktuellen Aufgabenrevisionen und bestehenden Antworten/Leseständen abgeleitet. Kein zusätzlicher persistierter Kompetenzcache, keine doppelte Lernhistorie. Ein falsches Gesamtergebnis belegt keine einzelne Ursache; die Empfehlung nennt Belege und Unsicherheit.

Der Trainer normalisiert seine Operationen als ChoiceTask-IDs. Auch diese werden in Prüfung/Statistik/Qualitätsregister wiederverwendet. Der aktuelle UI-Schritt ist nicht dauerhaft gespeichert.

## Fortschritt und Sicherung

**Unverändert:** Fortschrittsschema 3 unter v3, Backup-Dateiformat 1, v1/v2-Migrationspfade und unberührte Rückfallbestände. `read`, `answers`, `reviews`, `legacySummary`, `performance`, `exerciseAnswers`, `recentModules`, `activeExam`, `examHistory`, `updatedAt` bleiben der Vertrag. Keine erfundenen historischen Versuche.

Tests verwenden eine echte mit main 0.4 erzeugte Sicherung samt historischen Snapshots ohne TeX-/Kompetenzfelder. Neue negative Mathematik-Snapshots und molare Einheiten sind durch denselben Export-/Importpfad gedeckt. Ältere Apps kennen neue Aufgabentypen nicht; aktuelle Sicherungen deshalb nicht mit 0.4 wiederherstellen. Unbekannte Formate bleiben geschützt statt still ersetzt.

Prüfungssnapshots bewahren die damaligen Aufgaben und Antworten. Maximal 20 Ergebnisse, fünf letzte Module und letzte numerische Trainingsantwort je Aufgabe bleiben die vorhandenen Grenzen. Keine vollständige Ereignishistorie, kein Konto und keine Gerätesynchronisation.

## Qualität und spätere Module

42 Formeldefinitionen besitzen expliziten Formelsatz. Prüfevidenz ist von Darstellung getrennt: automatisch getestet, konkret quellenbasiert abgeglichen oder noch Entwurf; überall unabhängige menschliche Freigabe offen. Nicht jede verlinkte Quelle bedeutet einen vollständigen Aussagenabgleich.

Professionelle Rechner, Diagramme, reale Stoff-/Bauteildaten, Diagnose, Planung und Dokumentation sollen dieselben Definitionen/IDs referenzieren. Reale Daten benötigen zusätzliche Herkunfts-, Zustands-, Rechte- und Aktualisierungsverträge.
