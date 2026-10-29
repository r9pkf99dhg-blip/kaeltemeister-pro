# Quellenprüfung · Ergänzung Version 0.6

Tatsächlich am 28.10.2026 gelesen: offizielle OpenStax-Gitarchive, eigene deutsche Texte und Zeichnungen, keine Volltextübernahme.

| Quelle | Festgeschriebener Stand | Eingesehener Umfang |
| --- | --- | --- |
| Precalculus 2e / Algebra and Trigonometry 2e, gemeinsames College-Algebra-Archiv | 463991614337632b0e02cbb6c76223cbb0d423d3 | m51283 Winkel; m51284 rechtwinklige Trigonometrie; m51256 quadratische Gleichungen; m49301 Funktionen; m49326 lineare Modelle; m49363 Logarithmen |
| University Physics Vol. 2 | 2300d5b8ca2571dacc6ec25ebef56ba8d49000a2 | m58485 Simple AC Circuits; m58658 RLC Series Circuits with AC; m58490 Power in an AC Circuit; m58748 Selbstinduktion; m58448 Kapazität |
| College Physics 2e | 66fcef29596e3a32818162b837dd0c85b754cbad | m42224 Wärmekapazität; m42225 Phasenwechsel; m42226 Übertragungsarten; m42228 Wärmeleitung; m42229 Konvektion; m42230 Strahlung; m42232 erster Hauptsatz |

Vollständige URLs, Datum, Lizenz und eingeschränkter Unterstützungsumfang stehen in academy/deep/sources.ts. Quellenbewertungen unterscheiden Autorität, Eignung, Aktualität, Grenzen und offenen Widerspruchsabgleich. Lehrbücher sind keine Normen. Originalarchive nennen CC BY-NC-SA 4.0; unsere Erklärungen, Zahlenfälle und Diagramme sind selbst erstellt, keine Buchkapitel oder Abbildungen kopiert.

## Nicht einsehbare angefragte Primärquellen

Die angegebenen URLs zur Kälteanlagenbauermeisterverordnung, zum Ausbildungsrahmenplan, zur KMK-Sammlung, BIPM-SI-Broschüre und DGUV-Sicherheit wurden tatsächlich versucht, aber mit Netzwerk-HTTP 403 blockiert. Sie tragen access unavailable, keine falschen Kapitel-/Seitenzahlen oder aktuellen Rechtsaussagen. Aktueller Prüfungsberufsbild-/Rechtsabgleich und sicherheitstechnische Fachabnahme bleiben offen. Ausbildung, Meister-Transfer und offizielle Prüfung sind nicht gleichgesetzt.

## Prüfumfang

70 neue Aussagenbelege: für jede neue Formel und jeden neuen Zahlenfall sowie den Temperaturbezug. Direkte Kapitelabgleiche, eigene Herleitungen und rechnerische Kontrollen sind getrennt. Stern/Dreieck und Dreiphasenleistung werden aus Zeigergeometrie und einphasiger Sinusleistung hergeleitet; keine erfundene direkte Dreiphasenfundstelle im OpenStax-Kapitel. Ähnlich sind U-Wert/Serienschichten und offene Enthalpiebilanzen begrenzte eigene Ableitungen mit offener gezielter externer Fachprüfung. Menschliche unabhängige Gesamtfreigabe offen.

## Bereits dokumentierte Quellen früherer Versionen

# Quellen und fachliche Qualität · Version 0.5

## Was tatsächlich geprüft wurde

Alle 63 Rechenaufgaben haben unabhängig vorgegebene Referenzergebnisse und automatisierte Prüfungen für Zahlen, Einheiten, Umrechnungen, Toleranzgrenzen und ungültige Werte. Grundbeziehungen zur spezifischen Wärme, Gleichstromleistung und Heiz-/Kälteleistungszahl wurden im offiziellen OpenStax-Quellarchiv tatsächlich nachgelesen.

Das ist **keine unabhängige Freigabe durch eine Fachperson**. Insbesondere die kältetechnischen Messvoraussetzungen zu Dew/Bubble, Zustandsbestimmung und Anlagenbeurteilung werden nicht durch einen allgemeinen Wärmelehreabschnitt vollständig belegt. Aufgaben und bestehende Module bleiben entsprechend gekennzeichnet. Es werden keine Normen, Herstellergrenzen oder realen Kältemittelwerte erfunden.

## Tatsächlich eingesehene Referenzen

Offizielles Repository: `openstax/osbooks-college-physics-bundle`, Werk **College Physics 2e**. Gelesener Stand: `66fcef29596e3a32818162b837dd0c85b754cbad`, Zugriff am **27.10.2026** für 0.3 über die GitHub-API und für die zusätzlichen Elektroquellen in 0.4 über einen Git-Checkout desselben gepinnten Commits. Sammlungstitel, Modulüberschriften, relevante Gleichungen und der Lizenztext wurden eingesehen.

| Register-ID                     | Fundstelle                                                                                                                                                                                                                                              | Unterstützte Beziehung und Grenzen                                                                                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openstax-heat-capacity-github` | [Temperature Change and Heat Capacity, m42224](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42224/index.cnxml), Gleichungen `eip-644` und `eip-527`                                | Q = m c ΔT, Umstellung und SI-Einheit der spezifischen Wärme. Die stationäre Leistungs-/Massenstromform in der App ist die eigene Ableitung durch Zeitbezug. Der als Aufgabe vorgegebene Wert cp = 4180 ist kein als exakt aus dieser Quelle abgeschriebener Stoffwert. |
| `openstax-electric-github`      | [Electric Power and Energy, m42714](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42714/index.cnxml), `eip-489`, `eip-9`                                                            | P = I V und Unterscheidung von Leistung/Energie. Die App beschränkt die Aufgabe ausdrücklich auf stationären Gleichstrom. Keine pauschale AC-/Drehstrom-Wirkleistungsformel.                                                                                            |
| `openstax-cop-github`           | [Applications of Thermodynamics: Heat Pumps and Refrigerators, m42236](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42236/index.cnxml), `eip-462`, `fs-id1169736588910`, `eip-304` | Wärme-/Arbeitsquotienten für Heiz-/Kälte-COP und idealisierte Beziehung der Systemgrenzen. Für Leistungen wird derselbe Zeitraum vorausgesetzt. Keine typischen Gerätebereiche, Preise oder Herstellerversprechen übernommen.                                           |

Im Repository ist **CC BY-NC-SA 4.0** angegeben. Die App übernimmt keine Textpassagen, Übersetzungen oder Abbildungen aus dem Buch. Lernfälle und deutsche Erklärungen sind eigenständig formuliert; die Grundbeziehungen werden mit genauer Herkunft referenziert. Es wird keine Lizenz für geschützte Normen-/Herstellerinhalte behauptet.

Die direkten OpenStax-Webseiten für die Abschnitte 15.5 und 20.4 lieferten aus dieser Umgebung HTTP 403. Die Quellenprüfung erfolgte deshalb ausdrücklich über das offizielle Repository, nicht über einen vorgetäuschten erfolgreichen Websiteabruf. Die frühere Danfoss-Seite aus 0.2 wurde nicht nachträglich als gelesen ausgegeben.

## Zentrales Register und Prüfstatus

`src/academy/catalog.ts` kombiniert die Quellen und Formeln aus `data/registers.ts` und `data/electrical.ts`. `access` unterscheidet `consulted`, `unavailable` und `internal`. Eingesehene Quellen tragen Fundstelle, Prüfumfang, Datum, Lizenzhinweis und Commit. Referenzzuordnung ist nicht gleich Fachfreigabe. Neue Aufgaben nennen die für sie relevanten Register-IDs; Überhitzung/Unterkühlung geben keine unpassende allgemeine Quelle als bestätigten Spezialbeleg aus.

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

Qualifizierte Fachprüfung der Formulierungen, kältetechnischen Spezialvoraussetzungen und Modellgrenzen organisieren. Konkrete Hersteller-/Fachunterlagen dafür tatsächlich sichten und Fundstellen hinterlegen. Bei Rechts-/Normeninhalten Ausgabe, Geltungsbereich, Rechte, Datum und Wiedervorlage prüfen. Erst nach dokumentierter Fachabnahme den dafür vorbereiteten unabhängigen Freigabestatus vergeben.


## Zusätzlicher tatsächlicher Quellenabgleich 0.4

Am 27.10.2026 wurde das offizielle Repository per Git eingesehen; HEAD entspricht weiterhin dem oben angegebenen Commit. Die folgenden CNXML-Module wurden vollständig zugänglich gemacht und die relevanten Gleichungen gelesen. Kein erfundener Zugriff auf die blockierten Webseiten.

| Register-ID | Tatsächlich gelesene Fundstelle | Begrenzter Prüfumfang |
| --- | --- | --- |
| openstax-current-github | [Current, m42341](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42341/index.cnxml), eip-926, eip-108 | Mittlerer Ladungsstrom I = ΔQ/Δt und A = C/s |
| openstax-ohm-github | [Ohm’s Law: Resistance and Simple Circuits, m42344](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42344/index.cnxml), eip-218, eip-702, eip-486 | Ohmsches Gesetz und Umstellungen, Ω = V/A; Gültigkeit des ohmschen Modells beachten |
| openstax-circuits-github | [Resistors in Series and Parallel, m42356](https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/modules/m42356/index.cnxml), eip-288, eip-801, eip-531 | Reihen-/Kehrwertsumme, Strombilanz; eigene Aufgabenwerte unabhängig nachgerechnet |

Zusätzlich m42714 erneut gelesen: eip-489 (P = IV), eip-9 (E = Pt). Diese Quellen belegen physikalische Grundbeziehungen; sie geben weder reale Verdichter-/Sensorwerte noch Arbeitssicherheitsfreigaben. Die deutschsprachigen Module und fiktiven Zahlenvarianten sind selbst erstellt. Keine vollständigen Fachbuch-/Normtexte oder Abbildungen übernommen.

### Neue unabhängige Referenzwerte (SI)

| Aufgabenpaar | Variante A | Variante B |
| --- | --- | --- |
| Ladungsstrom | 0,2 A | 0,3 A |
| Ohm: Strom | 0,2 A | 0,01 A |
| Ohm: Spannung | 24 V | 11 V |
| Ohm: Widerstand | 120 Ω | 1200 Ω |
| Gleichstromleistung | 12 W | 0,6 W |
| Elektrische Arbeit | 86400 J | 270000 J |
| Reihenwiderstand | 360 Ω | 3200 Ω |
| Parallelwiderstand | 80 Ω | 50 Ω |

Die Tests vergleichen Produkt-Ergebnisse gegen diese separat vorgegebenen Werte, sichern SI-Umrechnung/Anzeige und fehlerhafte Eingaben ab. Alle Aufgaben/Annahmen stehen im [Prüfregister](REVIEW_REGISTER.md). Vollständige menschliche Fachabnahme ist weiterhin offen; kein Eintrag trägt den Status „Unabhängig fachlich geprüft“. Das einheitliche Statussystem wird in [QUALITY_ASSURANCE.md](QUALITY_ASSURANCE.md) erklärt.


## Tatsächlich eingesehene Quellen für 0.5

Zugriff am 27.10.2026 über die offiziellen Git-Archive; Collection, relevante CNXML-Module und LICENSE gelesen. Eigene deutsche Erklärungen und Zahlenfälle; keine Buchkapitel/Abbildungen kopiert. Alle drei Archive nennen CC BY-NC-SA 4.0. Formeln sind Faktenreferenzen, keine pauschale menschliche Fachfreigabe.

| Register-ID / offizielles Archiv | Gelesener Commit | Konkrete Fundstellen / begrenzter Umfang |
| --- | --- | --- |
| openstax-prealgebra-v05 · [Prealgebra 2e](https://github.com/openstax/osbooks-prealgebra-bundle) | ad40c7e3c9a909cde81a24c526f52fe26a51fb14 | m81270 Ausdrücke; m81285/86/87/88 Brüche; m81306/07 Prozent; m81320/21 Gleichheit; m81335 Exponenten; m81315 rationale/irrationale Zahlen |
| openstax-physics-v05 · [College Physics 2e](https://github.com/openstax/osbooks-college-physics-bundle) | 66fcef29596e3a32818162b837dd0c85b754cbad | m42073 Newton, m42146 Arbeit, m42151 Energieerhaltung, m42187 Dichte eip-385, m42189 Druck eip-943, m42224 Wärme eip-644 |
| openstax-chemistry-v05 · [Chemistry 2e](https://github.com/openstax/osbooks-chemistry-bundle) | db0a8e6027100ce082e67fc8879faab86f9a58a7 | m68667 Stoffklassifikation, m68692 Atombau, m68693 Formelsprache, m68700 Stoffmenge/molare Masse, m68709 Reaktionsbilanz |

Nicht jede verlinkte Formel wird dadurch als quellenbasiert geprüft markiert. Das Qualitätsregister verwendet eine ausdrückliche Liste konkret abgeglichener Beziehungen; weitere Formeln bleiben automatisch geprüft mit offenem externen Aussagenabgleich. Vollständige Texte, Didaktik/Praxisübertragung und Spezialbedingungen benötigen weiterhin unabhängige Fachabnahme.

### Neue Referenzprüfungen

21 Mathematik-, zwölf Physik- und sechs Chemie-Zahlenaufgaben ergänzen die alten 24. Separat vorgegebene Sollwerte liegen in technical/calculations.test.ts. Weitere unabhängige Unit-Tests prüfen Umstellungstrainer-Proben, Nullnenner, Wurzeln/Potenzen, SI-Umrechnungen, Wärme-/Leistungsbeziehungen und die theoretische Reaktionsbilanz. Gerundete molare Massen und Wasser-cp sind ausdrücklich vorgegeben; keine erfundenen Kältemittel-Stoffdaten. Die ungefähre Avogadro-Zahl ist als Näherung gekennzeichnet, nicht als ungesichteter exakter SI-Wert.

### Rendering ist keine Fachprüfung

KaTeX 0.19.1 und mhchem dienen nur der Darstellung. Bibliothekslizenz wird unter public/licenses/KaTeX.txt mitgeliefert. Fonts/CSS kommen aus demselben lokalen Paket, nicht von einem externen Dienst. Tests auf gültigen Formelsatz beweisen nicht, dass jede physikalische Aussage fachlich freigegeben ist.


## Version 0.7 · tatsächlich verwendete Belege und Zugriffsgrenzen

0.7 verwendet die oben dokumentierten tatsächlich eingesehenen offiziellen OpenStax-Archive/Fundstellen weiter: Prealgebra für Einheiten/Schulmathematik, College Physics (Wärmekapazität, P=UI, Ohmsches Gesetz, ebene Wärmeleitung), University Physics (reiner Sinus/Leistungsbeziehungen), Precalculus (Geometrie-/Algebragrundlage). Neue deutsche Erklärungen, Aufgaben, Diagramme und Zahlen sind eigene Inhalte; kein Buchvolltext oder fremde Abbildung wird kopiert.

Neue Formelverknüpfungen sind ausdrücklich **eigene Ableitungen**: cp=Q̇/(ṁΔT), P=I²R bzw. U²/R aus P=UI und U=RI, geschlossener Vollzylinder aus Mantel plus zwei Kreisflächen, kapazitives Q mit ausdrücklich festgelegtem Vorzeichen. Der affine Umrechnungsrahmen nutzt dieselbe Größenart, Faktoren und ggf. Temperaturoffset; eine Druckbezugsänderung wird nicht behauptet. Diese Beziehungen besitzen eigene Aussagenbelege mit Rechentest und offener Fachabnahme, keinen erfundenen neuen direkten Buchabgleich.

26 Laborvarianten und alle 105 Zahlenaufgaben haben getrennte feste SI-Referenzen. Die vier zentralen Fälle und Voraussetzungen stehen in CALCULATOR_VALIDATION. Zahlenprüfung belegt rechnerische Konsistenz, keine Messdaten, Stoffkennwerte, Normkonformität oder reale Auslegungsfreigabe.

Am 28.10.2026 waren die gewünschten neuen Primär-/Forschungsseiten per HTTP 403 nicht zugänglich:

- BIPM SI Brochure: https://www.bipm.org/en/publications/si-brochure
- PTB Deutsche SI-Übersetzung: https://oar.ptb.de/resources/show/10.7795/310.20250299
- Carpenter, Pan & Butler (2022), vom Auftrag benannte Ausgangsreferenz: https://doi.org/10.1038/s44159-022-00089-1
- Yeo & Fazio (2019), vom Auftrag benannter ERIC-Eintrag: https://eric.ed.gov/?id=EJ1201272

Kein Volltextzugriff, keine daraus behauptete konkrete Effektgröße oder Wirksamkeitsmessung. Aktives Abrufen, zeitliche Wiederholung, Beispiele, freiwillige gestufte Hilfe und Transfer sind nachvollziehbare Entwurfsprinzipien. Der Algorithmus ist einfach und offen dokumentiert, keine verifizierte individuelle Kompetenzdiagnose. Aktueller deutscher Berufsbildungs-/Meister-/Rechts-/Normabgleich bleibt nach den bereits dokumentierten Zugriffssperren offen. Keine erfundenen Norminhalte oder unabhängigen Prüfer.

Das Gesamtregister enthält 876 Einträge, darunter 69 einfache Modul-/Niveaufassungen, drei einfache Artikel, zwölf einfache Begriffe und 27 Laborfälle. 76 Aussagenbelege trennen Nachweisarten. Alle menschlichen Freigaben sind weiterhin offen.

## Ergänzung 0.8 · Stoffdaten und Lernforschung

Tatsächlich gelesen: CoolProp-Gitarchiv v7.2.0 / Git `98b3523d5daa98454618d381d2ae53f7471d216b`, MIT-Lizenz, HighLevelAPI mit Referenz-/Phasen-/SI-Angaben, Plotting, JavaScript-Wrapper, R134a-JSON und bibliographischer EOS-Eintrag. EOS Tillner-Roth/Baehr 1994 DOI 10.1063/1.555958; Originalarbeit nicht eingesehen. IIR/HEOS/reines R134a, genaue Referenz und Prüfumfang: [REFRIGERANT_DATA](REFRIGERANT_DATA.md), [PROPERTY_BACKEND](PROPERTY_BACKEND.md), [CYCLE_VALIDATION](CYCLE_VALIDATION.md).

Die DOI-/Verlags-/PMC-Abrufe zu Dunlosky 2013, Sailer/Homner 2020, Bai/Hew/Huang 2020 und ergänzender Lernforschung waren HTTP 403 gesperrt. Keine Volltextbefunde oder Effektstärken behauptet. [LEARNING_SCIENCE](LEARNING_SCIENCE.md) trennt didaktische Entwurfsannahmen, erwartete Wirkungen und offenen Evidenzabgleich. Aktuelle BIPM-/OpenStax-Webseiten waren ebenfalls gesperrt; ältere tatsächlich gelesene Git-Fundstellen bleiben mit ihrem ursprünglichen Umfang dokumentiert. Quellenlinks allein ergeben keine Fachfreigabe.
