# Fach- und Datenmodell · Version 0.3

## Unverändert stabile Inhalte

Zwölf Fachgebiete, Kapitel/Unterkapitel und fünf Module mit drei Niveaus bleiben erhalten. IDs von Modulen, Lernzielen, Quellen, Formeln und Optionen werden nicht umgedeutet. Die `legacyBridges` verbinden die alten Artikel mit den Akademiemodulen.

## Aufgaben und Berechnung

`LearningItem = ChoiceTask | NumericTask`. Beide haben ID, Revision, Fachgebiet, Niveau, Thema und Artikelbezug. Auswahlaufgaben tragen stabile Optionen und Lösung-ID. Zahlenaufgaben tragen gegebene Größen mit Mengenart/Einheit, gesuchte Größe, Berechnungstyp, Antwort-Einheit, absolute SI-/relative Toleranz, Schritte, Fehlerhinweise, Annahmen, Formel-ID, Quellen-IDs und Prüfstatus.

Mengenarten: Leistung, Massenstrom, spezifische Wärme, Temperaturdifferenz, absolute Temperatur, Spannung, Strom und dimensionsloses Verhältnis. Absolute Celsiuswerte erhalten bei der SI-Umrechnung einen Offset; Differenzen nicht. Die Engine prüft endliche Werte, passende Einheiten, nicht negative Beträge, Temperaturen ab absolutem Nullpunkt und strikt positive Nenner. Sie erfindet keine universellen Geräte-/Auslegungsgrenzen.

Berechnungstypen: `heat`, `mass-flow`, `temperature-difference`, `superheat`, `subcooling`, `dc-power`, `cooling-cop`, `heating-cop`. Die Implementation ist an einer Stelle; Formeltexte sind keine ausführbaren Programme. Die COP-Aufgaben unterscheiden Nutzkälte und Nutzheizleistung bei derselben elektrischen Systemgrenze.

## Lernleistung und Fortschritt v3

Der vollständige Vertrag steht in `src/academy/model.ts` und den importierten Aufgaben-/Leistungstypen.

| Feld                                                       | Bedeutung                                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `schemaVersion: 3`                                         | Neuer Schlüssel v3; v2 wird validiert und bleibt als Rückfallbestand erhalten                         |
| `read`, `answers`, `reviews`, `legacySummary`, `updatedAt` | Vorhandene Akademieinformationen bleiben erhalten                                                     |
| `performance[itemId]`                                      | Revision, Thema, Typ, Versuche, richtige Versuche, Serie, letzte Bewertung/Zeit, Termin und Intervall |
| `exerciseAnswers[itemId]`                                  | Letzte bewertete numerische Eingabe mit Einheit, Ergebnis, Revision und Zeitpunkt                     |
| `recentModules`                                            | Höchstens fünf eindeutige zuletzt geöffnete/bearbeitete Module                                        |
| `activeExam`                                               | Höchstens eine laufende Sitzung mit ID, Auswahl, Start/Deadline, Aufgaben-Snapshots und Antworten     |
| `examHistory`                                              | Höchstens 20 abgeschlossene Ergebnisse mit Lösungen/Antworten, Status und Prozentwert                 |

Kartenleistung ist als Selbsteinschätzung typisiert. Objektive Themenstatistik verwendet aktuelle Auswahl-/Zahlenaufgaben. Vergangene v2-Antworten bleiben sichtbar, ohne erfundene historische Zähler. Unbekannte v2-Zusatzfelder werden nicht als neue v3-Funktionen interpretiert; ihr Original bleibt im alten Datensatz erhalten.

Prüfungs-Snapshots enthalten die vollständigen damaligen Aufgaben und erwarteten SI-Werte. Bewertung unterscheidet `correct`, `incorrect`, `invalid` und `unanswered`. Der gespeicherte Prozentwert muss zu den Ergebnissen passen. Beschädigte/unklare aktuelle Datensätze werden nicht durch Startwerte überschrieben.

## Quellen und Review

`Source.access` unterscheidet `consulted`, `unavailable` und `internal`. Eingesehene Referenzen dokumentieren Prüfdatum, konkrete Fundstelle, unterstützte Aussage, Lizenzhinweis und Repository-Commit. Es wird nicht von einem nachgelesenen Wärmelehreabschnitt auf eine Freigabe aller kältetechnischen Aussagen geschlossen.

Die neuen Aufgaben tragen `calculation-tested-expert-review-pending`: Zahlen/Einheiten getestet, unabhängige Fachfreigabe offen. Eine vorgegebene didaktische Zahl ist keine reale Stoffeigenschaft. Zwei begrenzte Fachnotizen zu Gleichstromleistung und COP sind Referenztexte, kein angeblich fertiger Elektrotechnik-/Wärmepumpen-Lernpfad.

## Spätere Integration

Rechner, Diagramme, Kältemittel-/Bauteildaten, Diagnose und Projekte sollen dieselben stabilen Entitäten verwenden. Reale Stoffdaten benötigen eigene geprüfte Zustandsmodelle und Rechte/Aktualisierung. Für Synchronisation reichen Zeitstempel allein nicht: Ereignis-IDs, Reset-Generation und Konfliktbehandlung sind noch auszuarbeiten. Zuerst lokaler Export/Import und Wiederherstellung.
