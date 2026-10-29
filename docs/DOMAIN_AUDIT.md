# Fachgebiets-Bestandsaufnahme · 0.8

Aus demselben Fachkatalog erzeugt: npm run docs:audit. Ein Modul ist verfügbar, wenn seine Inhalte, Fragen und Karten im Katalog vorliegen; das ist keine unabhängige fachliche Freigabe. Leere Fachgebiete zählen nicht als abgeschlossen.

| Fachgebiet | Module | Modulfragen | Zahlenaufgaben | Weitere Themen, ausdrücklich geplant |
| --- | ---: | ---: | ---: | --- |
| Kältetechnik und Kältekreislauf | 5 | 20 | 7 | Expansionsorgane im Detail; Diagnosefälle und Betriebsprotokolle |
| Thermodynamik | 11 | 33 | 25 | Lernmodul: Hauptsätze; Freie Browser-Stoffdatenberechnung und zusätzliche validierte Stoffe (Referenzmodell bereits verfügbar); Freie validierte Browser-Stoffwertberechnung und zusätzliche Stoffe |
| Elektrotechnik | 10 | 30 | 29 | Drehfeld, Asynchronmotor, Schlupf und reale Motorkennlinien; Elektrische Schutzmaßnahmen; Messgeräte und elektrische Messtechnik; Sensoren und Aktoren; Grundlagen der Steuerungstechnik; Elektrische Schaltpläne; Fehlersuche an Kälteanlagen |
| Steuerungs- und Regelungstechnik | 0 | 0 | 0 | Lernmodul: Signale und Sensoren; Lernmodul: Schaltlogik; Lernmodul: Regelgrößen; Lernmodul: Regler und Dynamik |
| Klimatechnik | 0 | 0 | 0 | Lernmodul: Feuchtebegriffe; Lernmodul: h-x-Diagramm; Lernmodul: Sensible Lasten; Lernmodul: Latente Lasten |
| Lüftungstechnik | 0 | 0 | 0 | Lernmodul: Volumenstrom; Lernmodul: Kanalnetze; Lernmodul: Ventilatoren; Lernmodul: Hygiene und Betrieb |
| Wärmepumpentechnik | 0 | 0 | 0 | Lernmodul: Luft als Quelle; Lernmodul: Erdreich und Wasser; Lernmodul: COP und Jahresarbeitszahl; Lernmodul: Hydraulische Einbindung |
| Wärmeübertragung und Dämmung | 0 | 0 | 0 | Lehrmodell im Fachgebiet Thermodynamik: Wärmeleitung, Wärmewiderstand und U-Wert; Fachauslegung später.; Lernmodul: Konvektion und Strahlung; Lernmodul: Rohrdämmung; Lernmodul: Tauwasser und Wärmebrücken |
| Technische Mathematik | 16 | 48 | 41 | Lernmodul: Diagramme lesen; Lernmodul: Fehler und Genauigkeit; Weitere nichtlineare Systeme und vertiefte Analysis |
| Messtechnik | 0 | 0 | 0 | Lernmodul: Temperaturmessung; Lernmodul: Druckmessung; Lernmodul: Fühler und Messstellen; Lernmodul: Messunsicherheit |
| Komponenten und Anlagenbau | 0 | 0 | 0 | Lernmodul: Ventile und Armaturen; Lernmodul: Wärmeübertrager; Lernmodul: Rohrleitungen; Lernmodul: Anlagendokumentation |
| Sicherheit, Umwelt und rechtliche Grundlagen | 0 | 0 | 0 | Lernmodul: Gefährdungen; Lernmodul: Schutzmaßnahmen; Lernmodul: Kältemittelbezogene Anforderungen; Lernmodul: Nachweise und Aktualisierung |
| Physik-Grundlagen | 4 | 12 | 12 | Vertiefte Kinematik, Vektoren und Drehbewegung; Strömung und Gasgesetze; Vertiefte Wärmeübertragung und Hauptsätze; Messketten und Unsicherheitsfortpflanzung; Magnetismus, Schwingungen und Wellen; Elektro-Grundgrößen im vorhandenen Elektro-Lernpfad |
| Chemie-Grundlagen | 3 | 9 | 6 | Periodensystem und Bindungsmodelle vertiefen; Weiterführende Stöchiometrie; Säuren/Basen, Oxidation und Reduktion; Kohlenwasserstoffe und halogenierte Verbindungen; Geprüfte Stoffeigenschaften, Umweltwirkung und aktuelle Sicherheitsdaten |

## Offene Architektur-/Inhaltsarbeit

- Alle Modul- und Kompetenzverweise werden auf Existenz und Zyklen geprüft.
- Fachgebiete ohne Module besitzen Kapitelstruktur, aber noch keinen vollständigen Lernpfad.
- Nicht direkt mit Modul/Zahlenaufgabe verbundene Formeln: lab-heat-cp, lab-dc-i2r, lab-dc-u2r, lab-cylinder-total, lab-capacitive-q. Standalone-Fragen/Fachnotizen können weitere legitime Referenzen enthalten.
- Formelsatz und Rechenkern bleiben gemeinsame Bausteine für spätere professionelle Rechner.
- Externe Fachabnahme, echte Apple-Geräte und reale Stoff-/Bauteildaten bleiben getrennte Aufgaben.
