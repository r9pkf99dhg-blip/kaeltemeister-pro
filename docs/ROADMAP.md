# ROADMAP · Gesamtvision und Version 0.2

## Gesamtvision

KälteMeister Pro soll eine modular erweiterbare Plattform werden. Die Lernakademie bildet aktuell den Schwerpunkt. Fachwissen und Quellen werden zentral gepflegt und später in anderen Modulen wiederverwendet.

| Hauptmodul                            | Stand 0.2                                                              | Nächste sinnvolle Erweiterung                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1. Lernakademie                       | Fünf Kältemodule, drei Niveaus, Fragen, Karten, Wiederholung und Suche | Fachliche Freigabe und ein vollständiger weiterer Lernpfad                                        |
| 2. Fachbibliothek/Nachschlagewerk     | Bestehende Artikel und kleine Begriffssuche                            | Gemeinsamer Suchindex und redaktionelle Verknüpfung                                               |
| 3. Technische Berechnungen            | Sensible Wärmeleistung mit zentralem Formelbezug                       | Ein zusätzlicher, gut geprüfter Rechner statt einer großen ungesicherten Sammlung                 |
| 4. Diagramme/Simulationen             | Nur Erweiterungspunkt                                                  | Qualitative Kreislaufdarstellung mit erklärten Modellgrenzen; Stoffdaten erst nach Quellenprüfung |
| 5. Bauteil-/Kältemitteldatenbank      | Nicht implementiert                                                    | Datenquellen, Lizenz und Aktualisierung klären, bevor Daten importiert werden                     |
| 6. Fehlersuche/Wartung/Inbetriebnahme | Geplante Modulbeziehungen                                              | Geführtes Messprotokoll mit unsicherheitsbewusster Interpretation                                 |
| 7. Planung/Projektdokumentation       | Nicht implementiert                                                    | Ein lokaler Übungsfall mit exportierbaren Annahmen und Ergebnissen                                |
| 8. Quellen-/Normen-/Formelverwaltung  | Zentrale Register und offener Prüfstatus                               | Gesicherte Fundstellen, Rechte, Freigabe und Aktualisierungsregeln                                |

## Lieferumfang 0.2

- Zwölf Fachgebiete mit Kapiteln und Unterkapiteln, offene Themen deutlich markiert.
- Fünf umfangreiche Kältetechnik-Module: Kreislauf, Verdampfer, Verdichter, Verflüssiger, Überhitzung/Unterkühlung.
- Gemeinsame Lernansicht mit elf Kernabschnitten und drei inhaltlich unterschiedlichen Wissensstufen.
- 20 Fragen mit Erklärungen und stabilen Antwort-IDs, zehn Karteikarten, einfache Terminplanung.
- Lokale Fortschrittsspeicherung v2, vorsichtige Übernahme alter Lesestände und unveränderte Altangebote.
- Keine neuen externen Dienste, keine API-Schlüssel, unverändertes GitHub-Pages-Deployment.

Nicht geliefert: Fachfreigabe, vollständige weitere Fachgebiete, synchronisierte Konten, PWA, Offline-Modus, Normenvolltexte, reale Kältemittel-Stoffdaten, Diagnose- oder Planungswerkzeuge.

## Version 0.3 · priorisierte Empfehlung

### P0: Fachliche Verlässlichkeit und Datensicherheit

- Externe Unterlagen tatsächlich prüfen und die fünf Module fachlich freigeben; Quellen pro Aussage/Fundstelle ergänzen.
- Lokalen Export/Import mit Vorschau, Validierung und Sicherung anbieten. Abnahme: gültiger Export wird verlustfrei wiederhergestellt; ungültiger Import verändert nichts.
- Praktische Prüfung mit Safari auf einem echten iPad und einem iPhone; Tastaturvergrößerung, Schriftgröße und Kontrast bewerten.

### P1: Eine vollständige Erweiterung

- Lernpfad „Sensible und latente Wärme“ im Fachgebiet Thermodynamik bzw. Klimatechnik ergänzen: klare Lernziele, alle drei Niveaus, durchgerechnetes Beispiel und fachlich geprüfte Fragen.
- Eine geführte Messwertaufnahme für Überhitzung/Unterkühlung spezifizieren; keine automatischen Füllmengenempfehlungen. Erst nach geprüftem Stoffdaten-/Druckkonzept umsetzen.
- Lernhistorie nur dann ergänzen, wenn die Darstellung und Auswertung fachlich sinnvoll definiert sind. Bisherige letzte Antworten nicht als historische Versuche umdeuten.

### P2: Nutzungskomfort

- Einfache modulübergreifende Suche ausbauen, bei Bedarf Inhaltsblöcke und Deep Links einführen.
- Konflikte zwischen gleichzeitig geöffneten Tabs sauber lösen; Reset-Generation und Zusammenführung vor optionaler Gerätesynchronisation.
- Offline-/PWA-Nutzen prüfen. Erst ein konsistentes Cache-/Update-Konzept erarbeiten, damit keine gemischten Inhaltsversionen entstehen.

## Spätere Fachausweitung

Reihenfolge nach fachlicher Abhängigkeit: Thermodynamik → Messtechnik → Klima/Lüftung → Wärmepumpen → Elektro/Steuerung/Regelung → Wärmeübertragung/Dämmung → Komponenten/Anlagenbau → Sicherheit/Umwelt/Recht. Rechtliche Angaben brauchen eine datierte Prüfung und Pflege, nicht nur die einmalige Erfassung.

Jedes neue Paket bleibt klein und vollständig: Inhalt, Quellenstatus, Fragen, Lernziele, Beispiele, Migration, responsive Prüfung und ein grüner Pull Request. Keine hunderten generierten Platzhalterartikel.
