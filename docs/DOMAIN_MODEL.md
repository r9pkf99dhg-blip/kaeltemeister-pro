# Fach- und Datenmodell · Version 0.2

Die tatsächlich implementierten TypeScript-Verträge liegen in `src/academy/model.ts`. Dieses Dokument beschreibt den Stand, keine schon vorhandenen zukünftigen Dienste.

## Fachstruktur

`Domain → Chapter → Subchapter → Module` ist die Lernnavigation. Fachgebiet, Kapitel und Unterkapitel haben explizite, stabile IDs. Vorhandene Module werden über `moduleIds` referenziert. `plannedTopics` sind Titel von noch offenen Gliederungspunkten, keine veröffentlichten Module; sie erhalten erst bei Ausarbeitung eine eigene fachliche Modul-ID.

Die zwölf Fachgebiete sind Kälte, Thermodynamik, Elektro, Steuerung/Regelung, Klima, Lüftung, Wärmepumpen, Wärmeübertragung/Dämmung, technische Mathematik, Messtechnik, Komponenten/Anlagenbau sowie Sicherheit/Umwelt/Recht. In 0.2 sind nur fünf Kältemodule ausgearbeitet.

## Inhaltsentitäten

| Entität           | Identität und Beziehungen                                                                                  | Stand                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Module`          | `id`, `revision`, `domainId`; Verweise auf Lernziele, Formeln, Quellen, Begriffe, Fragen und Karten        | 5 mit 3 Niveauvarianten                                                                  |
| `LearningContent` | Abschnitte je `grundlagen`, `fachkraft`, `meister`; Zugehörigkeit durch Modul + Niveau                     | 15 eigenständige Varianten                                                               |
| `Objective`       | Stabile ID und Lernzieltext                                                                                | 10 Ziele                                                                                 |
| `Formula`         | ID, Ausdruck, Einheiten, Annahmen, Quellenverweise, optional `calculatorId`                                | 7 Formeln; sensible Formel mit vorhandenem Rechner verbunden                             |
| `AcademyQuestion` | ID, Revision, Modul, Niveau, Lernziel; Optionen mit eigenen dauerhaften IDs und einer richtigen Antwort-ID | 20 Fragen, explizite Antwort-IDs bleiben beim Umordnen erhalten                          |
| `Flashcard`       | ID, Revision, Modul, Vorder-/Rückseite, Quellenverweise                                                    | 10 Karten                                                                                |
| `Source`          | ID, Titel, optional URL, Zugriffsstatus, Einschränkungen/Notiz                                             | 1 nicht eingesehene externe Referenz und 1 internes Modell                               |
| `Term`            | ID, Titel, Definition, verknüpfte Modul-IDs                                                                | 8 Fachbegriffe                                                                           |
| `workedCycle`     | Stabile Beispiel-ID, Massenstrom, Enthalpien und erwartete Leistungen                                      | Ein fiktives, bilanziertes Rechenbeispiel                                                |
| `related`         | Typ + reservierte Ziel-ID + Label + Verfügbarkeit                                                          | Bestehender Rechner oder deutlich als geplant markierte Mess-/Diagnose-/Fall-Beziehungen |

IDs dürfen nicht für andere Inhalte wiederverwendet werden. Bei fachlichen Änderungen Revision erhöhen; eine bloße Umordnung der Antwortoptionen ändert deren IDs nicht. Es gibt keine automatische Erzeugung veröffentlichter IDs aus Arraypositionen oder aktuellen Titeln.

Eine Quellenbeziehung ist derzeit eine Referenzzuordnung, **kein Beleg einer Quellenprüfung**. Status und Einschränkungen müssen mit angezeigt werden. Normen, geprüfte Fundstellen und Prüferdaten werden erst nach tatsächlicher Recherche/Fachprüfung ergänzt. Das ältere Zielmodell in `CONTENT_MODEL.md` beschreibt mögliche spätere Felder; die dort umfangreichere Historie ist noch nicht implementiert.

Die Kompatibilitätsbrücke `legacyBridges` verknüpft alte Artikel-IDs mit neuen Modul-IDs. Sie ist die gemeinsame Grundlage für Migration und Links aus den bisherigen Artikeln; der alte Bestand ist ein Übergangsangebot, keine unabhängige neue Wissensdatenbank.

## Fortschritt

```text
AcademyProgress (schemaVersion 2)
  read[moduleId]       → revision + gelesene Niveaus
  answers[questionId]  → optionId + correct + questionRevision + answeredAt
  reviews[cardId]      → cardRevision + repetitions + intervalDays + dueAt + lastReviewedAt
  legacySummary       → vorherige Versuche / Bestwert / letztes Ergebnis oder null
  updatedAt           → UTC-Zeit der letzten Lernaktion oder null
```

Die Zustandsfunktionen sind unveränderlich: Sie erstellen neue Objekte und lassen den bisherigen Zustand unangetastet. Gespeichert wird die **letzte** Antwort je Frage, noch keine vollständige Versuchshistorie. Die Bewertung bezieht sich auf die aktuelle Frage-/Kartenrevision. Unbekannte v2-Daten werden nicht durch einen leeren Datensatz ersetzt. Die Migration ist in `LEARNING_SYSTEM.md` beschrieben.

## Formeln und spätere Werkzeuge

Ein Ausdruck dient der Darstellung. Rechner implementieren die Physik mit getesteten Funktionen, nicht durch Ausführen des Formeltexts. Die zentrale Formel `sensible-heat` liefert dem alten Rechner dieselbe Darstellung wie der Akademie. Enthalpieformeln sind erklärt und mit Beispielen versehen; in 0.2 gibt es dafür bewusst noch keine zusätzlichen Eingaberechner.

Für eine spätere Druck-Temperatur-Anwendung müssen geprüfte Kältemittel-Stoffdaten, Druckreferenz und Dew/Bubble berücksichtigt werden. Dafür reichen die fiktiven Beispiele dieser Version ausdrücklich nicht.

## Optionale spätere Synchronisation

Stabile Entitäts-IDs, Inhaltsrevisionen und UTC-Zeitpunkte ermöglichen einen Adapter zu einem zukünftigen Speicherdienst. Sie lösen noch keine Konflikte: Dafür braucht es etwa Ereignis-IDs, eine Reset-Generation, Aufbewahrungsregeln und eine nachvollziehbare Zusammenführungsstrategie. Zuerst Export/Import und Wiederherstellung implementieren, dann erst eine freiwillige Synchronisation planen. Ein Account darf nicht zur Voraussetzung für die lokale Lernfunktion werden.
