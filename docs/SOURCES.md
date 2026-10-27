# Quellen und fachliche Qualität · Version 0.3

## Was tatsächlich geprüft wurde

Alle acht Rechenaufgaben haben unabhängig vorgegebene Referenzergebnisse und automatisierte Prüfungen für Zahlen, Einheiten, Umrechnungen, Toleranzgrenzen und ungültige Werte. Grundbeziehungen zur spezifischen Wärme, Gleichstromleistung und Heiz-/Kälteleistungszahl wurden im offiziellen OpenStax-Quellarchiv tatsächlich nachgelesen.

Das ist **keine unabhängige Freigabe durch eine Fachperson**. Insbesondere die kältetechnischen Messvoraussetzungen zu Dew/Bubble, Zustandsbestimmung und Anlagenbeurteilung werden nicht durch einen allgemeinen Wärmelehreabschnitt vollständig belegt. Aufgaben und bestehende Module bleiben entsprechend gekennzeichnet. Es werden keine Normen, Herstellergrenzen oder realen Kältemittelwerte erfunden.

## Tatsächlich eingesehene Referenzen

Offizielles Repository: `openstax/osbooks-college-physics-bundle`, Werk **College Physics 2e**. Gelesener Stand: `66fcef29596e3a32818162b837dd0c85b754cbad`, Zugriff am **27.10.2026** über die GitHub-API. Sammlungstitel, Modulüberschriften, relevante Gleichungen und der Lizenztext wurden eingesehen.

| Register-ID                     | Fundstelle                                                                                                                                                                                                                                              | Unterstützte Beziehung und Grenzen                                                                                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openstax-heat-capacity-github` | [Temperature Change and Heat Capacity, m42224](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42224/index.cnxml), Gleichungen `eip-644` und `eip-527`                                | Q = m c ΔT, Umstellung und SI-Einheit der spezifischen Wärme. Die stationäre Leistungs-/Massenstromform in der App ist die eigene Ableitung durch Zeitbezug. Der als Aufgabe vorgegebene Wert cp = 4180 ist kein als exakt aus dieser Quelle abgeschriebener Stoffwert. |
| `openstax-electric-github`      | [Electric Power and Energy, m42714](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42714/index.cnxml), `eip-489`, `eip-9`                                                            | P = I V und Unterscheidung von Leistung/Energie. Die App beschränkt die Aufgabe ausdrücklich auf stationären Gleichstrom. Keine pauschale AC-/Drehstrom-Wirkleistungsformel.                                                                                            |
| `openstax-cop-github`           | [Applications of Thermodynamics: Heat Pumps and Refrigerators, m42236](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42236/index.cnxml), `eip-462`, `fs-id1169736588910`, `eip-304` | Wärme-/Arbeitsquotienten für Heiz-/Kälte-COP und idealisierte Beziehung der Systemgrenzen. Für Leistungen wird derselbe Zeitraum vorausgesetzt. Keine typischen Gerätebereiche, Preise oder Herstellerversprechen übernommen.                                           |

Im Repository ist **CC BY-NC-SA 4.0** angegeben. Die App übernimmt keine Textpassagen, Übersetzungen oder Abbildungen aus dem Buch. Lernfälle und deutsche Erklärungen sind eigenständig formuliert; die Grundbeziehungen werden mit genauer Herkunft referenziert. Es wird keine Lizenz für geschützte Normen-/Herstellerinhalte behauptet.

Die direkten OpenStax-Webseiten für die Abschnitte 15.5 und 20.4 lieferten aus dieser Umgebung HTTP 403. Die Quellenprüfung erfolgte deshalb ausdrücklich über das offizielle Repository, nicht über einen vorgetäuschten erfolgreichen Websiteabruf. Die frühere Danfoss-Seite aus 0.2 wurde nicht nachträglich als gelesen ausgegeben.

## Zentrales Register und Prüfstatus

`src/academy/data/registers.ts` enthält alle Quellen und Formeln. `access` unterscheidet `consulted`, `unavailable` und `internal`. Eingesehene Quellen tragen Fundstelle, Prüfumfang, Datum, Lizenzhinweis und Commit. Referenzzuordnung ist nicht gleich Fachfreigabe. Neue Aufgaben nennen die für sie relevanten Register-IDs; Überhitzung/Unterkühlung geben keine unpassende allgemeine Quelle als bestätigten Spezialbeleg aus.

`didactic-exercises` kennzeichnet die eigenen Aufgaben und Tests. `didactic-cycle` bleibt der fiktive v0.2-Enthalpiefall, keine reale Stoffdatentabelle. Kein automatisch erzeugtes Literaturverzeichnis mit erfundenen Titeln oder Ausgaben.

## Zahlen und Rechenprüfung

| Aufgabe             | Unabhängiger SI-Referenzwert | Wichtige Annahme                                       |
| ------------------- | ---------------------------- | ------------------------------------------------------ |
| Wärmeleistung       | 10 450 W                     | 0,5 kg/s × 4180 J/(kg·K) × 5 K, kein Phasenwechsel     |
| Massenstrom         | 0,5 kg/s = 1800 kg/h         | 8360 W / (4180 × 4), konstantes cp                     |
| Temperaturdifferenz | 6 K                          | 12 540 W / (0,5 × 4180)                                |
| Überhitzung         | 6 K                          | −4 − (−10), passende Dew-/Druckzuordnung vorausgesetzt |
| Unterkühlung        | 5 K                          | 40 − 35, passende Bubble-/Druckzuordnung vorausgesetzt |
| Gleichstromleistung | 48 W                         | 24 V × 2 A, stationärer DC-Fall                        |
| Kälteleistungszahl  | 3                            | 7500 W / 2500 W, gleiche Systemgrenze                  |
| Heiz-COP            | 4                            | 10 000 W / 2500 W, keine Jahresarbeitszahl             |

Alle Werte sind Aufgabenannahmen. Wasser-cp = 4,18 kJ/(kg·K) ist ein vorgegebener Näherungswert um 20 °C, keine allgemeine Konstante für beliebige Stoffe/Temperaturen. ΔT wird als Betrag betrachtet. Absolute Temperaturen werden in Kelvin umgerechnet; ein Offset wird nicht auf Temperaturdifferenzen angewendet.

Die Toleranz für Antworten ist eine Lern-/Rundungstoleranz, keine Messunsicherheit. Elektrische Arbeiten, Anlagenfreigaben und normgerechte Auslegung werden durch diese Aufgaben nicht ersetzt.

## Noch offene fachliche Arbeit

Qualifizierte Fachprüfung der Formulierungen, kältetechnischen Spezialvoraussetzungen und Modellgrenzen organisieren. Konkrete Hersteller-/Fachunterlagen dafür tatsächlich sichten und Fundstellen hinterlegen. Bei Rechts-/Normeninhalten Ausgabe, Geltungsbereich, Rechte, Datum und Wiedervorlage prüfen. Erst nach dieser Arbeit einen erweiterten Freigabestatus einführen.
