# Quellen und fachliche Qualität · Version 0.2

## Ehrlicher Prüfstatus

**Keines der fünf neuen Module ist unabhängig fachlich freigegeben.** Alle zeigen „Fachprüfung offen“. Die Inhalte wurden eigenständig formuliert; es wurden keine Fachbuchkapitel übernommen. Fachliche Plausibilität, Rechenwege, Einheiten und Modellkonsistenz wurden im Entwicklungsprozess geprüft. Das ersetzt weder eine externe Quellenprüfung noch die Freigabe durch eine qualifizierte Fachperson.

Es gibt keine erfundenen Normnummern, Herstellergrenzen, Stofftabellen oder Literaturausgaben. Konkrete rechtliche Anforderungen sind in 0.2 noch nicht ausgearbeitet und werden nicht als aktuelle Rechtsauskunft angeboten.

## Register

Die App verwendet genau ein Quellenregister: `src/academy/data/registers.ts`. Module, Formeln, Fragen und Karten referenzieren seine stabilen IDs.

| ID                    | Referenz / Herkunft                                                                                                                                                                                                                 | Tatsächlicher Zugriff und Bedeutung                                                                                                                                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openstax-heat-pumps` | [OpenStax, College Physics 2e, Abschnitt 15.5: Applications of Thermodynamics – Heat Pumps and Refrigerators](https://openstax.org/books/college-physics-2e/pages/15-5-applications-of-thermodynamics-heat-pumps-and-refrigerators) | Abrufversuch am 27.10.2026 aus der Entwicklungsumgebung scheiterte mit HTTP 403. Nicht eingesehen und nicht als geprüfter Beleg verwendet. Weiterführende Referenz zur späteren Prüfung; insbesondere kein Beleg für konkrete Dew/Bubble- oder Herstellerangaben. |
| `didactic-cycle`      | Eigenes didaktisches Zahlenmodell                                                                                                                                                                                                   | Internes Modell, keine externe Veröffentlichung. Fiktive Zustandswerte, keine Stoffdaten oder Auslegung. Numerisch konsistent überprüft; Modellannahmen werden angezeigt.                                                                                         |

Zusätzlich wurde versucht, die Danfoss-Lernseite `https://www.danfoss.com/en/service-and-support/learning/cooling/refrigeration-fundamentals/` abzurufen. Auch dieser Versuch lieferte HTTP 403. Aus dieser Seite wurden keine Inhalte übernommen oder als recherchiert ausgegeben; sie wird ohne tatsächliche Sichtung nicht als geprüfte Quelle geführt.

HTTP 403 aus dieser Umgebung beweist nicht, dass die genannten Seiten für einen Nutzerbrowser nicht erreichbar wären. Es belegt nur die Einschränkung der hier möglichen Recherche.

## Zahlen und Annahmen

Gemeinsamer Referenzfall `workedCycle`:

- Massenstrom 0,05 kg/s.
- h₁ = 400, h₂ = 440, h₃ = h₄ = 250 kJ/kg.
- Verdampfer: 0,05 × (400 − 250) = 7,5 kW.
- Adiabates Verdichtermodell: 0,05 × (440 − 400) = 2 kW Fluidleistung.
- Verflüssiger: 0,05 × (440 − 250) = 9,5 kW.
- Bilanz: 7,5 + 2 = 9,5 kW; Verluste und Änderungen kinetischer/potenzieller Energie vernachlässigt.

Die Zahlen sind frei gewählte didaktische Annahmen, keine behaupteten Eigenschaften eines benannten Kältemittels. Die dazugehörigen Größen und erwarteten Ergebnisse sind als Daten hinterlegt und werden gegeneinander geprüft.

Weitere Beispiele sind ausdrücklich als angenommen gekennzeichnet: Dew-/Bubble-Temperaturen ohne Stoffzuordnung, ein elektrisches Vergleichsbeispiel und Fehlergrenzen von ±0,5 K. Daraus werden keine pauschalen Sollwerte abgeleitet. Wasser-cp ≈ 4,18 kJ/(kg·K) ist ein Näherungswert bei etwa 20 °C aus dem bereits bestehenden Rechner, keine temperaturunabhängige Konstante für beliebige Medien.

Die Formelzeichen benutzen ein einheitliches Zustandsmodell: 1 vor Verdichter, 2 nach Verdichter, 3 vor Drossel, 4 nach Drossel. Das Modell ist stationär; die Verdichtung wird näherungsweise adiabatisch und die Drosselung isenthalp betrachtet. Überhitzung/Unterkühlung verwenden zusammengehörige örtliche Druck-/Temperaturzustände und passende Kältemittel-/Sättigungsdaten. Die App berechnet selbst keine realen Sättigungstemperaturen.

## Nächster fachlicher Freigabeprozess

1. Zugängliche, rechtmäßig nutzbare Fach-/Herstellerunterlagen tatsächlich sichten.
2. Jede relevante Aussage einer passenden Quelle und konkreten Fundstelle zuordnen. Allgemeine Wärmelehre allein ist kein Beleg für jede kältetechnische Messregel.
3. Fachperson prüft Text, Formeln, Beispiele, Gültigkeitsgrenzen und typische Fehler pro Niveau.
4. Prüferkennung, Datum und Umfang der Prüfung dokumentieren; erst danach Status auf freigegeben erweitern. Der jetzige Typ erlaubt bewusst nur `awaiting-expert-review`.
5. Bei Rechts-/Normeninhalten Ausgabe, Geltungsbereich, Datum und Wiedervorlage festhalten. Keine geschützten Volltexte ohne entsprechende Rechte veröffentlichen.

Inhaltstests sichern Struktur und Konsistenz. Sie behaupten nicht, dass sämtliche fachlichen Aussagen durch automatische Tests bewiesen wären.
