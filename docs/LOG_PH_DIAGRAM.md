# log-p-h-Diagramm · Version 0.8

Darstellung ausschließlich für die begrenzten tatsächlichen R134a-Referenzfälle. Horizontal h, intern J/kg und Anzeige kJ/kg; vertikal p **absolut**, intern Pa und Anzeige bar mit logarithmischer Skalierung. Gleich große Druckverhältnisse besitzen gleiche vertikale Abstände. Kein stiller Wechsel von Überdruck auf Absolutdruck.

## Datengrundlage

201 berechnete Sättigungsknoten von 220–365 K; Flüssigkeits-/Dampfgrenze endet unter dem kritischen Punkt und wird nicht künstlich geschlossen. Dampfgehaltslinien x = 0,25/0,50/0,75, fünf Isothermen mit getrennten Flüssigkeits-/Zweiphasen-/Dampfsegmenten. Dampfgehalt ist außerhalb des Zweiphasengebiets nicht definiert. Bibliothek/Modell/Referenz und Grenzen: [REFRIGERANT_DATA](REFRIGERANT_DATA.md).

Vier Punkte, isobare Wärmeübertragung, vertikale isenthalpe Drossel und 41 echte isentrope Verdichtungspunkte je Ideal-Fall. Der η_is=0,75-Fall zeigt ausdrücklich nur eine gestrichelte Verbindung der Endpunkte. Kurven verbinden echte Stützpunkte für die Zeichnung; eine neue p-h-Abfrage oder freie Stoffwertinterpolation ist damit nicht verfügbar.

## Interaktion und Alternativen

Fallwahl verändert den vollständigen berechneten Fall. Punkte wählen Zustand und zugeordneten Komponenten-Eintritt, Prozessauswahl hebt die Linie hervor. Prozess, Qualitätslinien und Isothermen sind einzeln schaltbar. Vergrößerung 1–6×, verschieben nach Zoom mit einem Finger/Pointer oder Pfeiltasten, Pos1 bzw. Zurücksetzen stellt den Ausgangsausschnitt wieder her. Zoom/Pan verändern nur den Ausschnitt, keine Stoffwerte.

Pointerbewegungen bleiben lokal im Diagrammzustand; erst beim Loslassen wird der Fortschritt gespeichert. Keine Stoffdatenberechnung während des Ziehens. Die vier HTML-Zustandsbuttons und Wertetabelle ersetzen kleine SVG-Treffflächen. Diagrammaufgaben haben dieselben Antwortalternativen als Text; Farbe ist nicht das einzige Unterscheidungsmerkmal. Große Tabellen scrollen innerhalb ihres Bereichs, die Seite und feste Navigation bleiben bei 200% Schrift innerhalb der Bildschirmbreite.

Ungültige Drücke, NaN/Infinity, unbekannte Fälle und unvollständige Linien führen zu einer verständlichen Meldung statt stiller Punkte. Die Anwendungsfehlergrenze schützt nachgeladene Ansichten. Die quantitative Ansicht benötigt den erfolgreichen Referenzdaten-Selbstcheck. Die qualitative Ansicht bleibt separat nutzbar.

## Prüfumfang

Automatisch geprüft: absolute Logarithmusskalierung, lineare Enthalpieachse, konstante p- und h-Prozesse bei Zoom/Pan, endliche Pfade, Herkunft/SHA256, Phasen/Referenz, Tastatur, Modellwahl, Einheiten, mobile Darstellung, Textalternative und Erhalt von Werkstattdaten. Begrenzte Sättigungs-Zeichnungsabweichung an Segmentmittelpunkten unter 8 J/kg bzw. 0,00002 log10(P); keine globale Unsicherheitsgarantie. Echte Apple-Touch-/VoiceOver-Prüfung und experimenteller Stoffmodellvergleich bleiben offen.
