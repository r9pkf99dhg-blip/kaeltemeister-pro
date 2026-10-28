# Rechnerprüfung · Version 0.7

Alle 26 Fachvarianten besitzen feste unabhängig festgelegte SI-Sollwerte in `src/lab/validation.test.ts`; die ID-Menge muss exakt dem Katalog entsprechen. Erwartungswerte werden nicht aus der Produktfunktion erzeugt. Einheitenumrechnung und Aufgaben besitzen zusätzlich ihre bisherigen eigenen Referenzen; alle 105 Zahlenaufgaben müssen im Referenzregister stehen.

## Vier zentrale Referenzfälle

| Modell | Angaben und unabhängige Rechnung | SI-Ergebnis | Anzeige |
| --- | --- | --- | --- |
| Sensible Wärmeleistung | 0,5 kg/s × (4,18 × 1000) J/(kg·K) × 5 K | 10 450 W | 10,45 kW |
| Symmetrische Dreiphasen-Wirkleistung | √3 × 400 V × 10 A × 0,8 | 5542,562584220407 W | ca. 5,54 kW |
| Rohrinnenvolumen | π × (22/1000 m)²/4 × 10 m | 0,0038013271108436494 m³ | ca. 3,80 L |
| Ebene stationäre Wärmeleitung | 0,04 W/(m·K) × 2 m² × 20 K / 0,1 m | 16 W | 16 W |

cp, λ, cos φ und alle Stoff-/Geometriewerte sind vorgegebene Modellannahmen, keine gemessenen oder allgemein gültigen Daten. Wärme: konstantes cp, kein Phasenwechsel. Elektro: geeignete Sinusform/Symmetrie, Effektiv-/Leitergrößen. Geometrie: gerade ideale Leitung, keine Auslegung. Leitung: stationär/eindimensional/eben, keine Feuchte/Wärmebrücken.

## Weitere unabhängige SI-Sollwerte

| Varianten-IDs | Feste SI-Referenzen |
| --- | --- |
| heat-flow / heat-difference / heat-cp | 0,5 kg/s / 5 K / 4180 J/(kg·K) |
| ohm-voltage / ohm-current / ohm-resistance | 24 V / 0,2 A / 120 Ω |
| dc-power / dc-i2r / dc-u2r | jeweils 4,8 W |
| ac-apparent / ac-real / ac-inductive / ac-capacitive | 200 VA / 120 W / 160 var / −160 var |
| star-voltage / delta-current | 173,20508075688772 V / 3,4641016151377544 A für die jeweils vorgegebenen Stranggrößen |
| circle / ring | 0,0003801327110843649 m² / 0,00007225663103256525 m² |
| mantle / total-surface | 0,6911503837897545 m² / 0,6919106492119232 m² |
| resistance / layers / u-value | 1,25 K/W / 8 W / 0,1923076923076923 W/(m²·K) |

Annahmen und Eingaben jeder Variante stehen im Rechnerkatalog, der regulären Formel und dem Rechenweg. Zwei gleiche Schichten liefern unter gleichen Randbedingungen halbe Leistung. Der allgemeine Einheitenumrechner prüft feste Offset-/Zeit-/Flächenwerte sowie Identitätsumrechnung jeder registrierten Einheit. Bei 200000 Pa bleibt der Druckbezug derselbe wie bei den gegebenen 2 bar.

## Fehler-, Grenz- und Invariantenprüfungen

Fehlende/falsche Zahlen oder Einheiten, Nullnenner, negative unzulässige Werte, unendliche Werte/Zwischenschritte, extreme Unterläufe, dᵢ ≥ dₐ und cos φ außerhalb 0…1 werden abgefangen. Echte Nullleistung bei ΔT=0 bleibt erlaubt; S=0 hat keinen definierten Leistungsfaktor P/S. Kapazitive Blindleistung bleibt vorzeichenrichtig negativ. Parsergrenzen und Code-/Namenseingaben werden getestet. Keine pauschale Sperre aller negativen Zahlen.

Zusätzlich erhalten: numerisches Zeitmittel für Sinus-RMS/Wirkleistung, 120°-/Leiter-Strangkontrollen, Geometrie-/Schichtverhältnisse, Definitionsbereiche/Originalproben, Toleranzgrenzen und Einheitenumrechnung. Die Wärmekurve verdoppelt bei festem cp/ΔT und doppeltem ṁ die Modellleistung; Diagramme berechnen denselben Kern.

Erst die Anzeige wird gerundet (in der Laboransicht bis acht signifikante Stellen bzw. wissenschaftliche Schreibweise). Antworttoleranz, Maschinenpräzision, Messunsicherheit und signifikante Messstellen sind getrennte Begriffe. Der Rechner besitzt keine Unsicherheitsfortpflanzung. Auch erfolgreiche Zahlenreferenzen sind keine unabhängige Fachfreigabe für reale Anlagen oder elektrische Arbeiten.

Diagrammskalierung: Extreme, aber endliche Wärme-/AC-Modellwerte werden zuerst auf die Achsendomäne normiert und erst danach mit dem Pixelmaßstab multipliziert. So bleibt auch der Darstellungszwischenschritt endlich. Ein nachweislich vor der Korrektur fehlgeschlagener Regressionstest prüft Wärme-Kurve und Leistungsdreieck; kein allgemeines Verstecken von SVG-Fehlern.
