# Lernvoraussetzungen und intelligente Lernbrücke · 0.5

## Gemeinsamer Vertrag

`competencies.ts` definiert stabile Kompetenz-IDs und jeweils eine vorhandene Grundlagenlektion. Jede Zahlenaufgabe erhält `requiredCompetencyIds`. Dieselbe Aufgabe kann mehrere Kompetenzen benötigen, etwa Rechenregeln, SI-Umrechnung und Wärmeverständnis. Formel-/Aufgaben-IDs werden nicht umgedeutet.

Module besitzen gerichtete `prerequisites`. Alle Verweise und die Azyklizität werden getestet. Bestehende Fachmodule verweisen auf die neuen Grundlagen, statt deren Erklärungen zu kopieren. Die Voraussetzungen sind Empfehlungen und sperren keine Lerninhalte.

## Nachvollziehbare Empfehlung

Eine falsche Gesamtantwort beweist keine konkrete fehlende Grundlage. Empfehlungen heißen deshalb **mögliche Grundlage**, nicht Fehlerdiagnose. Die Auswahl verwendet ausschließlich vorhandene lokale Lerninformationen:

1. Eine letzte objektiv bewertete Antwort in einer benötigten aktuellen Grundlagenlektion war falsch.
2. Eine benötigte Grundlage ist noch nicht als gelesen markiert; das gilt ausdrücklich nicht als nachgewiesene Wissenslücke.
3. Die Grundlage ist gelesen, aber es existiert noch kein bewerteter Übungsstand.
4. Sonst kann eine zugeordnete Grundlage freiwillig aufgefrischt werden.

Veraltete Aufgabenrevisionen werden nicht als aktuelle Fehlerbelege verwendet. Lesestatus ist kein Kompetenznachweis. Karteikarten bleiben Selbsteinschätzung. Es gibt keinen kostenpflichtigen KI-Dienst und keine externe Übertragung.

## Daten und Zukunft

Kompetenzfortschritt wird aus dem bestehenden v3-Lernstand abgeleitet, kein zweiter widersprüchlicher Cache. Die Verknüpfungen gehören zum Fachkatalog und optional zu Prüfungssnapshots; alte Snapshots ohne diese Felder bleiben lesbar. Backupformat 1 und Lerndatenschema 3 bleiben erhalten.

Die Rückkehr zur Originalaufgabe darf deren Eingabe und Einheit nicht verlieren. Dafür ist eine eingeblendete Lektion innerhalb des laufenden Trainings vorgesehen; keine neue Hauptnavigation, die das Training verwirft. Eine über Neuladen hinweg fortsetzbare unbewertete Eingabe würde später einen eigenen versionierten Entwurfsvertrag benötigen.

Spätere professionelle Rechner/Diagnosefälle sollen dieselben Kompetenz-, Formel- und Grundlagen-IDs verwenden. Vor einer tieferen Fehlerursachenerkennung werden fehlertypbezogene Aufgabenbelege und getrennte Unsicherheiten benötigt.
