# Techniklabor · Version 0.7

Im Menü **Techniklabor** einen Rechner wählen, Werte und Einheiten prüfen und **Laborwert berechnen** drücken. Optional **Mit eigenen Werten experimentieren** einschalten. Die globale Erklärungsebene gilt auch hier. Ergebnis, SI-Umrechnungen, Einsetzen, Voraussetzungen, Interpretation und Quellen sind sichtbar. Eine angezeigte Nachkommastelle ist keine Messgenauigkeit.

## Fünf verfügbare Bereiche

| Bereich | Tatsächlicher Umfang | Grenzen |
| --- | --- | --- |
| Einheiten | Alle Größen/Einheiten des bestehenden SI-Registers, inklusive kg/h↔kg/s, mm², Liter, absolute Temperatur/Differenz | Gleiche Größenart und gleicher Druckbezug; W/VA/var getrennt, kein stiller Bezugswechsel |
| Wärmeleistung | Q̇, ṁ, ΔT und cp als vier Zielgrößen | Sensibel, stationär, cp konstant/vorgegeben, Beträge; inverse Nenner positiv, kein Phasenwechsel |
| Elektro | 13 Varianten: U/I/R; DC UI/I²R/U²R; Sinus S/P/Q induktiv/kapazitiv; symmetrische Dreiphasenleistung; Sternspannung/Dreieckstrom | Passendes DC-/reines Sinusmodell, Effektivgrößen und Leiterbezüge; keine Unsymmetrie, Oberwellen-, Schutz-/Leitungsbemessung |
| Rohrgeometrie | Kreis-/Ringfläche, Innenvolumen, Mantel, geschlossener Vollzylinder (fünf) | Gerade konstante ideale Geometrie; kein Druckverlust, Öltransport oder zulässige Rohrdimensionierung |
| Wärmeübertragung | Ebene Schichtleistung, Rth, zwei Serienschichten und U-Wert mit vorgegebenen Übergängen (vier) | Stationär, eindimensional, konstante positive Kennwerte; keine Feuchte, Wärmebrücke, Speicherung oder zylindrische Dämmung |

Insgesamt 26 Fachvarianten plus der allgemeine Einheitenumrechner. Keine unvollständigen weiteren Rechner werden als fertig ausgegeben. Eingaben dürfen Dezimalkomma, wissenschaftliche Schreibweise und begrenzte Arithmetik enthalten; Einheiten separat wählen. Für Potenzen nur ganzzahlige Exponenten von −12 bis 12. Kein freies CAS.

## Interaktive Anschauung

- Sensible Wärmeleistung: Massenstromregler 0–2 kg/s, Kurve bei festen cp/ΔT und aktuellem Punkt. Gleiche Berechnungsfunktion wie Zahlenaufgabe/Rechner. Text beschreibt Achsenbereich und Modellgrenze. Verdopplung des Massenstroms ist keine Garantie realer Wärmeübertragerleistung.
- Rohr: schematischer Kreis-/Ringquerschnitt, Durchmesser/Innen- und Außenfläche benannt.
- Sinus: dynamisches Leistungsdreieck mit gleichem Komponentenmaßstab, induktiv positives und kapazitiv negatives Q; bei S=0 kein P/S.
- Wärmeübertragung: Schicht-/Wärmeflussskizze, ausdrücklich kein errechneter Temperaturverlauf.

## Theorie und Übung

**Grundlagen verstehen** öffnet die passende Akademielektion; **Rechnung selbst üben** startet eine eigene vollständige Werkstattaufgabe mit leerer Antwort. **Schwierigere Aufgabe bearbeiten** öffnet einen vorhandenen Transferfall. Passende Fachlektionen bieten umgekehrt Laborvarianten an. Nur Formel-/Modell-IDs und der SI-Kern sind gemeinsam; ein Laborergebnis wird nicht als Lernleistung gespeichert oder in die Übungsantwort kopiert.

Ein letzter Laborzustand mit Eingabeausdrücken und Eingabeeinheiten wird lokal und im Backup gesichert. Wechsel zu einem anderen Rechner ersetzt diesen Entwurf. Ergebnisanzeigeeinheit und Sofortmodus bleiben sitzungsbezogen. Alle Modelle sind rechnerisch getestet, eine unabhängige menschliche Gesamtfreigabe bleibt offen. Validierungsfälle: CALCULATOR_VALIDATION.
