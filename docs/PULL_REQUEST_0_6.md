Version 0.6 baut die vorhandene 0.5-Akademie fachlich aus und erhält Architektur, Navigation und Lerndaten. Ausgangspunkt ist main `09a953b` (Merge #7). Kein automatischer Merge.

## Verhalten und Umfang

- Sieben neue Mathematikmodule vertiefen Geometrie/Trigonometrie, Definitionsbereiche, Systeme/quadratische Gleichungen und Funktionen/Interpolation/Logarithmen; acht bisherige Grundlagen erhalten ergänzende Grenzfälle. Trainer: 15 kuratierte Fälle mit 20 bewertbaren Schritten, konkrete Fehlerschritttexte, Hilfen und Originalproben; kein freies CAS.
- Vier neue Elektromodule erklären Sinus-/Effektivwerte, ideale L/C und Serienimpedanz, P/Q/S sowie symmetrischen Stern/Dreieck-Drehstrom. Normierte verstellbare Kurven, Textalternativen, Leistungsdreieck und klare Sinus-/Symmetriebedingungen.
- Fünf neue Thermomodule verknüpfen Zustandsbezüge, Wärmeenergie/-leistung, Phasenwechsel, ebene stationäre Wärmeübertragung und ideale Kältekreisbilanz. Keine erfundenen Stoffwerte oder professionellen Auslegungen.
- 34 neue Zahlenfälle im gemeinsamen SI-Kern: insgesamt 97, alle mit getrennten festen Referenzwerten. 45 Module, 140 Modulfragen, 90 Karten und 77 Formeln.
- Vier aktive Fallstudien mit mehreren Rechnungen und fachlicher Entscheidung. Vorhandene Aufgaben werden per ID wiederverwendet. Bewertete Fallentscheidungen erscheinen im gemeinsamen Fortschritt.
- Lernbrücke erklärt konkrete Zahlenübereinstimmungen als mögliche Fehlerhinweise, bietet die kleinste passende Grundlage und bleibt überspringbar. Ein letzter Übungsentwurf mit Antwort/Einheit/offener Lektion übersteht Neuladen und Backup; Fortsetzen im Dashboard.
- Zwölf neue Glossarbegriffe sind über denselben Katalog suchbar. 70 begrenzte Aussagenbelege und Quellenbewertungen; direkte Kapitelabgleiche, eigene Ableitungen und Rechentests sind getrennt. Gesamtregister 736 Einträge. Unabhängige menschliche Fachfreigabe weiterhin offen.

## Datensicherheit und Grenzen

Schema 3 / Backupformat 1 bleiben erhalten. Echte mit unverändertem 0.4- und 0.5-Code erzeugte Exportfixtures prüfen Import/Reexport, alte Snapshots, Karten, Termine sowie aktive/abgeschlossene Prüfung. Neues Entwurfsfeld ist optional und validiert. Neue Aufgabentypen benötigen 0.6 oder später. Trainer-/Fall-Schrittposition und unbewertete Fallantworten bleiben sitzungsbezogen.

Offizielle OpenStax-Gitarchive tatsächlich eingesehen, mit vollständigen Commits und Fundstellen. Angefragte Rechts-/KMK-/BIPM-/DGUV-Webseiten durch Netzwerk-403 blockiert: aktueller Primärquellenabgleich offen, keine behauptete vollständige Meisterprüfungsabdeckung. Eigene Stern-/Dreieck-, U-Wert- und Enthalpieableitungen sind keine vorgetäuschten direkten Buchfundstellen. Keine offizielle Prüfungsaufgabe, Normfreigabe, elektrische Arbeitsanweisung oder reale Anlagenfreigabe.

## Validierung

Aktuelle tatsächliche Ergebnisse und CI-Link: docs/NEXT_STEPS.md und docs/QUALITY_ASSURANCE.md. TypeScript, Unit-/Integrationstests, Produktionsbuild, Chromium-Browser und Workflow-Lint werden lokal geprüft. GitHub CI prüft zusätzlich drei WebKit-Konfigurationen. Echte iPad-/iPhone-Hardwareprüfung und unabhängige Fachabnahme bleiben offen. Anfangs veraltete Browsererwartungen wurden auf die tatsächlich neuen verfügbaren Module angepasst, keine Prüfung entfernt.

GitHub Pages bleibt auf `/kaeltemeister-pro/`, automatischer main-Push und manueller Start erhalten. PRs veröffentlichen nicht. Vor Merge müssen die neuesten Checks erfolgreich sein. Übernahme ausschließlich nach ausdrücklicher Freigabe.

## Für die Prüfung

docs/RELEASE_V06.md enthält Umfang, Grenzen, Quellen und konkrete iPad-Testwerte. docs/NEXT_STEPS.md enthält die Commit-Etappen und Wiederaufnahmeanleitung. Roadmap, Curricula, Datenmodell und Architektur sind aktualisiert.
