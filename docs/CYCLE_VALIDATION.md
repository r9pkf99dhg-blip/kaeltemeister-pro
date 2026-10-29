# Fachliche Validierung und Grenzen · Version 0.8

Stand der Entwicklung: 28.–29.10.2026. **Numerisch konsistenz- und referenzgetestet; keine unabhängige experimentelle EOS-Validierung und keine menschliche Fachfreigabe.** Diese Aussagen dürfen nicht gleichgesetzt werden.

## Herkunft und Reproduzierbarkeit

CoolProp 7.2.0, Git `98b3523d5daa98454618d381d2ae53f7471d216b`, MIT, HEOS::R134a. EOS Tillner-Roth/Baehr 1994, DOI 10.1063/1.555958; bibliographischen Originaleintrag und Modellmetadaten gelesen, die Originalarbeit nicht. Offizielle HighLevelAPI, Reference States, Plotting, R134a-JSON und Lizenz im gepinnten Git-Archiv tatsächlich gelesen. Aktuelle BIPM-/OpenStax-Webseiten und Lernforschungs-DOIs waren über den Proxy nicht erreichbar. Vorhandene frühere Quellenabgleiche bleiben mit ihrem damaligen Umfang erhalten.

Generator `scripts/generate-refrigerant-data.py`, gepinnte Python-Anforderung, IIR einmal vor Zustandsberechnung gesetzt. Intern SI, alle Enthalpien im selben Bezug. Artefakt und SHA256 versioniert; Datum für bytegleiche Wiederholung fest auf 28.10.2026 gesetzt. Die Pythonbibliothek ist nur Entwicklungswerkzeug, keine App-Runtime. Kein frei arbeitender Browser-Stoffdatenkern in diesem Release.

## Unabhängigkeit der Prüfungen

| Prüfung | Nachweis | Grenze |
| --- | --- | --- |
| Herkunft/Artefakt | gepinnte Version/Gitrevision, Lizenz, SHA256 | Hash allein beweist keine Physik |
| Sättigungsdruck | getrennte Auswertung veröffentlichter Ancillary-Koeffizienten; relative Abweichung <0,00012 | Näherung desselben Stoffmodells, keine unabhängige Messung |
| Clapeyron-Identität | unabhängig programmierter zentraler Differenzenquotient gegen Δh/(TΔv), relativ <0,002 | physikalische Konsistenz, kein externer EOS-Datensatz |
| Phasen/Flash | P/T, T/Q, P/S und P/H, Referenzanker, Qualität, Entropie | Rückrechnung mit derselben EOS ist keine externe Validierung |
| Kreisbilanz | separater synthetischer Handfall und unveränderte feste SI-Referenzen | Handfall belegt Algebra, keine reale R134a-Zustandsbeschreibung |
| 15 Zahlenaufgaben | separat festgelegte Dezimalreferenzen auf eingefrorenen h-Werten; eigener Katalog-ID-Abgleich | keine zweite unabhängige Stoffbibliothek |
| Darstellung | logarithmische p-Skalierung, h₃=h₄, konstante Druckniveaus, begrenzte Zeichnungsstichproben | Verbindungslinie ist kein neuer Zustand |

Synthetischer Handfall: h₁=400, h₂=450, h₃=h₄=250 kJ/kg → q₀=150, w=50, qₖ=200 kJ/kg, COP=3; bei 0,05 kg/s → Q̇₀=7,5 kW. Eine gemeinsame Referenzverschiebung aller vier h lässt Differenzen und COP unverändert. Negative Referenzenthalpien allein sind kein physikalischer Fehler.

## Eingefrorene Fall-Bilanzen

| Fall | q₀ [kJ/kg] | w [kJ/kg] | qₖ [kJ/kg] | Fluid-COP |
| --- | ---: | ---: | ---: | ---: |
| Basis −10/35 °C | 152,308390 | 31,735296 | 184,043686 | 4,799337 |
| Kühlraum −5/40 °C | 151,027098 | 30,571166 | 181,598264 | 4,940181 |
| Verdampfung 0/35 °C | 158,452048 | 23,651435 | 182,103483 | 6,699469 |
| Verflüssigung −10/45 °C | 137,540770 | 37,593543 | 175,134313 | 3,658627 |
| Überhitzung 10 K | 156,562339 | 32,530635 | 189,092974 | 4,812766 |
| Unterkühlung 8 K | 159,521144 | 31,735296 | 191,256440 | 5,026616 |
| η_is = 0,75 | 152,308390 | 42,313728 | 194,622118 | 3,599503 |
| Transfer 5/40 °C | 157,426919 | 23,035098 | 180,462017 | 6,834220 |

Die Tabellenwerte sind gerundet; Tests verwenden die eingefrorenen SI-Referenzen mit absolut <10⁻⁶ für Bilanzvergleich. Das ist eine Regressionstoleranz, keine Genauigkeit der realen EOS. Lernantworten: 0,5% relative oder 10⁻⁶ SI absolute Toleranz. Generator und Bibliotheksrückrechnung nutzen eigene dokumentierte Grenzen. Diagramm-Sättigung: nur 220–365 K; keine freigegebenen frei kombinierbaren Betriebsbereiche oder Extrapolation.

## Fehler- und Modellgrenzen

Tests für NaN/Infinity, negative/Null-Drücke, kritische Bereiche, ungeeignete Druckverhältnisse, Phasenverwechslungen, inkonsistente Drossel, fehlende Fälle/Punkte, unzulässige η_is, nichtpositive Kälteaufnahme/Arbeit, negative Massenströme und Überlauf. Die Oberfläche lässt ungültigen Rohtext stehen und rechnet mit dem letzten bestätigten Massenstrom weiter. Eine echte Nullförderung gibt null Leistungen; kein realer Stillstands-COP wird behauptet.

Offen: unabhängige Mess-/Referenzdaten für Stoffmodellfreigabe, qualifizierte menschliche Abnahme beider Sprachebenen, reale Komponentenkennfelder, Druckverluste, Wärmeübertrager, Motorelektrik, Regelung, Unsicherheiten, Gemische und kritischer Bereich. Keine Anlagen-, Sicherheits- oder Berufsfreigabe durch grüne Tests.
