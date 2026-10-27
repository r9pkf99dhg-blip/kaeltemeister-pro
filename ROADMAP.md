# ROADMAP · KälteMeister Pro

## Ziel und Leitplanken

Eine verständliche Meisterschul-App für Kälte-, Klima-, Lüftungs-, Elektro- und Dämmtechnik: Wissen aufbauen, Rechenwege verstehen, Prüfungen üben und Fortschritt nachvollziehen. Die App bleibt ohne Benutzerkonto und ohne kostenpflichtigen Dienst nutzbar. Keine verbindlichen Terminversprechen: Jede Phase wird erst nach ihren Abnahmekriterien abgeschlossen.

**Bereits vorhanden:** Dashboard, drei Kältetechnik-Artikel, zwölf Quizfragen, sensibler Wärmeleistungsrechner und lokaler Fortschritt. Dieser Qualitätsschritt ergänzt Tests, getrennte Quiz-/Rechnerkomponenten und Datenverträge für bestehende Inhalte. Die folgenden größeren Funktionen sind **geplant**, nicht bereits implementiert.

## Prioritäten und Reihenfolge

| Phase                                | Priorität                  | Ergebnis                                                                                                 | Abnahme                                                                                                                                                        |
| ------------------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 · Bestehendes absichern            | P0, dieser PR              | Navigation, Einheiten, Quizwertung, Speicherung und responsive Ansichten geprüft; Tests laufen vor Pages | Typprüfung, Inhalts-/Funktions- und Browsertests grün; unveränderte Lerndaten weiterhin lesbar; Qualitätsbericht vorhanden                                     |
| 1 · Gemeinsames Inhaltsfundament     | P0, nächster Ausbauschritt | Stabile IDs, Fachgebiete, Quellen, Formeln und versionierter Fortschritt nach `docs/CONTENT_MODEL.md`    | Ein vorhandener Artikel, eine Formel und ein Quizsatz durchlaufen den neuen Katalog ohne Inhaltsverlust; v1-Migration getestet; alle Referenzen gültig         |
| 2 · Fachbereiche ausbauen            | P1                         | Pro Fachgebiet ein zusammenhängender Lernpfad mit Grundlagen, Beispielen und Selbstkontrolle             | Jeder Pfad hat Lernziele, Voraussetzungen, fachlich geprüfte Quellen und mindestens ein Rechenbeispiel; Navigation/Filter funktionieren auf allen Zielgrößen   |
| 3 · Formelsammlung und Werkzeuge     | P1                         | Suchbare Formeln mit Einheiten, Gültigkeitsgrenzen und nachvollziehbaren Rechnern                        | Jeder Rechner hat mindestens ein unabhängig nachgerechnetes Referenzbeispiel, Grenzfälle und Einheitenprüfungen; keine stillschweigend angenommenen Stoffwerte |
| 4 · Individuelles Lernen und Prüfung | P1/P2                      | Themenquiz, Fehlerwiederholung, Lernplan und klar getrennte Prüfungssimulation                           | Bewertung reproduzierbar; Bestwerte getrennt nach Quizversion/Thema; Timer optional; Fortschritt über Änderungen hinweg konsistent                             |
| 5 · Alltag und Offline-Nutzung       | P2                         | Export/Import, Offline-Lesen, installierbare PWA und gute Suche                                          | Verlustfreier Datenexport; fehlerhafter Import verändert nichts; Offline-Update liefert keine gemischten Inhaltsversionen; Safari-Praxistest bestanden         |
| 6 · Optionale Zusammenarbeit         | P3                         | Geteilte Lernpläne oder freiwillige Gerätesynchronisation                                                | Bedarf zuvor mit Nutzern geklärt; lokale App bleibt unabhängig nutzbar; Datenschutz, Konfliktlösung und Betriebskosten geklärt                                 |

**Abhängigkeiten:** Phase 1 vor Massenimporten und differenzierten Lernstatistiken. Export/Import vor Synchronisation. Quellen- und Rechteprüfung vor Veröffentlichung neuer Fachinhalte. Kein Backend allein für die Inhaltserweiterung: Statische Daten reichen zunächst aus.

## Geplante Fachbereiche

| Fachbereich     | Grundlagen und Lernpfad                                                                                        | Beispiele und spätere Werkzeuge                                                                    | Fachliche Grenzen                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Kältetechnik    | Thermodynamik, Kältekreislauf, Bauteile, Kältemittel, log(p)-h-Diagramm, Überhitzung/Unterkühlung, Fehlersuche | Energiebilanz, Kälteleistung, Verdichterleistung, COP, Betriebspunkte und Diagnosefälle            | Stoffwerte nur mit eindeutigem Kältemittel, Zustand und Quelle; Temperaturgleit beachten; keine pauschalen Füllmengenempfehlungen |
| Klimatechnik    | Raumlasten, Luftzustände, Feuchte, Behaglichkeit, h-x-Diagramm, Wärmepumpen und Regelung                       | Sensible/latente Last, Mischluft und Enthalpiedifferenzen; Fallstudie eines klimatisierten Raums   | Trockene Luft und feuchte Luft unterscheiden; Modelle und Randbedingungen offenlegen                                              |
| Lüftungstechnik | Volumen-/Massenstrom, Luftwechsel, Kanalnetze, Druckverluste, Ventilatoren, Wärmerückgewinnung und Hygiene     | Raumluftwechsel, Strömungsgeschwindigkeit, einfacher Kanalquerschnitt und Ventilatorleistung       | Dichte und Betriebszustand angeben; Richtwerte ersetzen keine normgerechte Planung                                                |
| Elektrotechnik  | Strom, Spannung, Widerstand, Gleich-/Wechselstrom, Drehstrom, Motoren, Schutz und Schaltpläne                  | Ohmsches Gesetz, Wirkleistung, Leistungsfaktor, einfache Motor-/Schützschaltungen als Lernaufgaben | Lernsimulationen ohne Anleitung zu unqualifizierter Arbeit an Spannung; Schutzmaßnahmen fachlich prüfen                           |
| Dämmtechnik     | Wärmeleitung, Wärmebrücken, Dämmstoffe, Wasserdampf, Taupunkt und Kondensationsschutz                          | Ebenenwand-Wärmedurchgang, Rohrdämmung, Wärmeverlust und Taupunktbeispiele                         | Ebene und zylindrische Geometrie trennen; Materialtemperatur, Feuchte und Oberflächenübergänge berücksichtigen                    |

Die Reihenfolge innerhalb von Phase 2 ist Kälte → Klima → Lüftung → Elektro → Dämmung. Ein kleiner vollständiger Lernpfad ist nützlicher als viele unfertige Kapitel. Fachübergreifende Fälle verbinden später Wärmepumpe, Luftführung, elektrische Leistung und Dämmung.

## Einheitliches Lernerlebnis

Jede Lerneinheit enthält Lernziele, Voraussetzungen, einen verständlichen Artikel, Skizze oder Beispiel, verknüpfte Formeln, Quellen und ein kurzes Quiz. Artikelabschluss bedeutet zunächst „gelesen“, nicht „beherrscht“. Beherrschung darf erst aus nachvollziehbaren Quiz-/Übungsregeln abgeleitet werden. Prüfungssimulationen sind deutlich von Lernrunden mit direktem Feedback getrennt.

Die Formelsammlung zeigt Symbol, Beschreibung, SI-Einheit, zulässige Eingaben, Annahmen und ein ausgearbeitetes Beispiel. Quellen sind von jedem fachlichen Inhalt erreichbar. Suche und Filter verwenden dieselben Fachgebiets- und Themen-IDs; neue Navigationssysteme werden erst eingeführt, wenn die Zahl der Inhalte sie rechtfertigt.

## Qualität vor jeder Erweiterung

- Neue Inhalte: Redaktion → Quellen-/Rechteprüfung → fachliche Freigabe → Veröffentlichung. KI-generierte Texte gelten nicht als fachlich geprüft.
- Neue Formel: Einheitenanalyse, mindestens ein Referenzbeispiel, Grenzfälle, Erklärung bei ungültigen Eingaben. Kein dynamisches Ausführen von Formeltexten.
- Neue Quizfragen: Stabile Frage-/Antwort-IDs, eindeutig bewertbare Lösungen und begründete Erklärungen. Änderungen an Lösungen erhöhen die Inhaltsversion.
- Neue Speicherung: Datenmigration zuerst testen; nie stillschweigend vorhandenen Fortschritt löschen. Datenschutz bleibt bei jeder optionalen Synchronisation ein eigenes Abnahmekriterium.
- Oberfläche: Smartphone ab 320 px, Tablet hoch/quer und Desktop; Tastatur, Touch, Vergrößerung, Kontrast und reduzierte Animation berücksichtigen. Chromium-Tests ergänzen, aber ersetzen keine Prüfung in echtem iPad-Safari.
- Veröffentlichung: Pull Request mit Beschreibung, lokalen/CI-Ergebnissen und bekannten Grenzen. Deployment nur nach erfolgreichen Prüfungen von `main`; Live-Prüfung nach dem Merge.

## Nächstes konkret umsetzbares Paket

1. Gemeinsame Themen-/Quellenkataloge anlegen und bestehende Artikel mit echten Quellen ergänzen; fachliche Prüfung organisieren.
2. Eine Muster-Lerneinheit „Sensible und latente Wärme“ mit einem verknüpften Rechner und stabil identifizierten Quizfragen erstellen.
3. Version-2-Fortschritt inklusive Export und v1-Migration zunächst anhand dieser Einheit testen.
4. Erst danach weitere Inhalte entlang desselben Vertrags erfassen. Vorhandene Artikel-IDs und gespeicherte v1-Daten bleiben erhalten.

Technische Details: [Inhalts- und Fortschrittsmodell](docs/CONTENT_MODEL.md). Ausgangslage und Prüfnachweise: [Qualitätsbericht](docs/QUALITY_REVIEW.md).
