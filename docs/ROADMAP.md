# ROADMAP · Version 0.5 und Gesamtplattform

## Tatsächlich verfügbar

25 Module auf dem vorhandenen Niveausystem: fünf Kälte-, fünf Elektro-, acht Mathematik-, vier Physik- und drei Chemie-Module. 80 Modulfragen, 50 Karten, 63 Zahlenaufgaben und elf Umstellungsziele. Adaptive Wiederholung, Übungsprüfung, Lern-Dashboard, Backup/Restore, fachliches Prüfregister, professioneller Formelsatz und eine einfache intelligente Lernbrücke. Kein Inhalt behauptet eine unabhängige menschliche Fachfreigabe.

Version 0.4 ist in main integriert. 0.5 entsteht in abgeschlossenen überprüften Etappen mit Commits/Pushes; NEXT_STEPS dokumentiert erledigte/offene Arbeiten. Keine automatische Veröffentlichung vor freigegebenem PR-Merge.

## Prioritäten nach 0.5

### P0 · Verlässlichkeit und Fachabnahme

- Vollständiges Prüfregister durch qualifizierte Mathematik-/Physik-/Chemie-/Kälte-/Elektro-Fachpersonen prüfen lassen. Fundstelle, Person, Datum und Freigabeumfang je Revision dokumentieren.
- Echte iPad-/iPhone-Safari-Tests für Formelsatz, Schriftvergrößerung, Tastatur, Download/Import und Hintergrundwechsel. WebKit ersetzt keine Hardwareprüfung.
- Sicherungsverfahren unter echten Safari-Quoten prüfen; IndexedDB nur mit gesicherten Migrationen/Transaktionen ergänzen.
- Sinnvoller gespeicherter Entwurfsvertrag für offene Übungen/Trainerschritte; heutige Brücke erhält Eingaben nur innerhalb des laufenden Trainings.

### P1 · Zusammenhängende nächste Lernpfade

- Mathematik: Bruchgleichungen, lineare Gleichungssysteme, quadratische Gleichungen, binomische Formeln; danach technische Geometrie/Pythagoras/Trigonometrie.
- Funktionen/Diagramme und technische Messunsicherheit; anschließend ausgewählte Ableitungs-/Integral-/Statistikgrundlagen. Vollständige Struktur in MATHEMATICS_CURRICULUM.
- Physik: beschleunigte Bewegungen, quantitative Wärmeübertragung, Gasgesetze und Hauptsätze; vorhandene Elektro-Grundlagen um Wechselstrom/Leistungsfaktor/Drehstrom erweitern.
- Chemie: Periodensystem/Bindungsmodelle, weiterführende Stöchiometrie, Säuren/Basen/Redox, dann organische und halogenierte Verbindungen sowie geprüfte Kältemitteleigenschaften.
- Weitere Niveaus und Varianten fachlich vertiefen, statt viele oberflächliche leere Kategorien zu erzeugen.

### P2 · Lernbrücke und Lernleistung

- Die einfache Brücke ist im Zahlentraining verfügbar: Aufgabe → Kompetenzen → begründete Grundlagenlektion → Rückkehr mit erhaltener Eingabe/Einheit.
- Danach fehlertypbezogene Belege, Transferaufgaben, versionierte Übungsentwürfe und stärker differenzierte Kompetenzstatistik. Falsche Gesamtantworten niemals als sichere Einzelursache ausgeben.
- Historische Fehler mit einem transparenten begrenzten Lernfenster evaluieren; bisherige aggregierte Historie nicht heimlich löschen.
- Optionale Mehrgeräte-Synchronisierung erst mit Ereignisidentität, Reset-Generation, Konfliktregeln und freiwilliger Datenübertragung. Kein Konto für lokale Kernfunktionen.

## Langfristige zehn Hauptmodule

| Hauptmodul | Stand / nächster Anschluss |
| --- | --- |
| Lernakademie | Grundlagen/Fachmodule, Formeln, Aufgaben, Kompetenzen; weiter fachlich vertiefen |
| Fachbibliothek | Gemeinsame Begriffe, Quellen und IDs, breitere fachübergreifende Suche |
| Professionelle Rechner | Wärmeleistungsrechner vorhanden; Elektro/COP/Kühl-/Wärmelast-, Rohrleitungs-, Druckverlust- und Wärmeübertragungsrechner benötigen geprüfte Randbedingungen über denselben Kern |
| log-p-h-Diagramme | Verifizierte Stoff-/Zustandsmodelle, Rechte und Referenzzustände vor Implementierung |
| Kältemittel-/Stoffdaten | Herkunft, Zustandsbezug, Unsicherheit, Rechte und Aktualisierung separat klären |
| Bauteildaten | Geprüfte Herstellerinformationen statt fiktiver Lernwerte |
| Diagnose/Fehlersuche | Lernbrücken-IDs wiederverwenden; mehrere Hypothesen und Messunsicherheit |
| Planung/Auslegung | Validierte Systemgrenzen; Lernaufgaben nicht als Auslegungsnachweis missverstehen |
| Wartung/Inbetriebnahme | Aktuelle Sicherheits-/Fachgrundlagen und qualifizierte Abnahme |
| Technische Dokumentation | Lokale Projektfälle referenzieren dieselben Formeln, Quellen, Kompetenzen und Revisionen |

Leere Fachgebiete behalten eine ehrliche Struktur. DOMAIN_AUDIT nennt verfügbare Module und offene Themen. Kein vorzeitiges Implementieren dieser Gesamtplattform als Attrappen.

## Abnahme jeder Etappe

Stabile IDs; tatsächliche Quellenbelege; getrennte unabhängige Referenzrechnungen; nachvollziehbare Modellgrenzen; Daten-/Backup-Kompatibilität; Typprüfung, Tests und Build; passende Browserchecks; dokumentierter Commit/Push. Freigabe des Merges und tatsächlicher main-Pages-Lauf bleiben getrennte abschließende Schritte.
