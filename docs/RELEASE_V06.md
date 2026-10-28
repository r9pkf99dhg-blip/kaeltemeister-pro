# Version 0.6 · Fachliche Tiefenakademie

Ausgangspunkt: main `09a953b` (Merge #7, vollständige 0.5 `febd428`). Entwicklungsbranch `feat/deep-learning-academy-v06`. Kein automatischer Merge. Die vorhandene Architektur und alle alten IDs bleiben erhalten.

## Tatsächlich implementiert

- 45 nutzbare Module: fünf Kälte, zehn Elektro, sechzehn Mathematik einschließlich Rohrfall, vier Physik, drei Chemie und sieben Thermodynamik einschließlich zweier Fälle. 140 Modulfragen, 90 Karten, 77 Formeln, 97 Zahlenaufgaben und 38 gemeinsame Fachbegriffe. Fachgebiete ohne ausgearbeitete Module bleiben geplant.
- Sieben neue Mathematikmodule: Maßstab/Flächen/Ringflächen, Rohrvolumen/Oberflächen, Pythagoras, Trigonometrie/Grad/Bogenmaß/Gefälle, Bruch-/Wurzelgleichungen und Definitionsbereiche, lineare Systeme/quadratische Gleichungen, Funktionen/Interpolation/Logarithmen. Acht bisherige Grundlagen additiv um Gegenbeispiele/Grenzfälle vertieft.
- 15 kuratierte Umstellungsfälle mit 20 bewertbaren Schritten: vier neue Fälle behandeln Wurzeln/Längenbereich, Klammern, variable Nenner und verlorene Lösungen. Hilfestufe, konkretes Feedback, alternative äquivalente Endform und Originalprobe. Kein freies CAS und keine behauptete allgemeine Symbolprüfung.
- Vier neue Elektromodule: Sinus-/Effektivwerte, Phasenverschiebung und Diagramminterpretation, ideale L/C und Serien-RLC, P/Q/S, Wirkfaktor und Grenzen bei Verzerrung, symmetrische Stern-/Dreiecksysteme. Verstellbare normierte Kurven, textliche Diagrammbeschreibung und Leistungsdreieck. Ausschließlich sichere Theorie.
- Fünf neue Thermomodule: Druck-/Temperaturbezüge, Dichte/spezifisches Volumen und Volumenstrom, sensible Energie/Leistung, Phasenwechsel, ebene stationäre Wärmeleitung/Schichten/U-Wert, erster Hauptsatz und ideale Fluid-Kreislaufbilanz. Enthalpie und log-p-h werden ohne reale Stoffwerte vorbereitet.
- 34 neue Zahlenaufgaben: zwölf Mathematik, zwölf Elektro, zehn Thermodynamik. Gemeinsamer SI-Rechenkern; getrennte feste Sollwerte und zusätzliche Modellkontrollen. Brüche/negative mathematische Antworten bleiben unterstützt. W, VA und var sind getrennte Größen.
- Lernbrücke: neun ausdrücklich getestete Antwortmuster (Einheitenwahl, Radius/Durchmesser, Scheitel/Effektiv, Schein/Wirk, Leiter/Strang, Masse/Volumen, Bruchaddition, Vorzeichen, unplausibler Leistungsfaktor), zusätzlich Zehnerpotenzhinweise. Das sind beobachtete Zahlenübereinstimmungen, keine sichere Diagnose des Denkwegs. Beste passende Grundlage zuerst; Alternativen, Beispiel, Kontrollfrage, Überspringen und Rückkehr bleiben verfügbar.
- Ein letzter Übungsentwurf mit Antwort, Einheit und geöffneter Lernbrücke übersteht Neuladen und Backup. Dashboard bietet Fortsetzen. Ungültige Daten werden abgefangen. Alte Sicherungen brauchen keine neue Schemafassung.
- Vier aktive Fallstudien: Wärmeträgerstrom, Einphasenverbraucher, Rohrgeometrie und Schichtvergleich. Zwei bis drei Rechnungen plus fachliche Entscheidung mit Auswertung. Aufgaben werden wiederverwendet, keine kopierte Rechenlogik. Bewertete Versuche bleiben gespeichert; Fall-Schrittposition und unbewertete Fallantworten sind sitzungsbezogen.
- 70 Aussagenbelege für neue Formeln/Zahlenfälle und den Temperaturbezug, mit konkretem Prüfumfang, Quellentyp, Annahmen und Grenzen; Gesamtprüfregister 736 Einträge. Direkter Quellenabgleich, eigene Ableitung und Rechentest sind getrennt. Menschliche Fachfreigabe überall offen.

## Tatsächlich eingesehene Quellen

Offizielle Git-Repositorien von OpenStax: Precalculus 2e / Algebra and Trigonometry 2e (Stand `4639916`), University Physics Volume 2 (`2300d5b`), College Physics 2e (`66fcef2`, weitere Wärme-/Hauptsatzkapitel). Präzise Kapitel und vollständige Commits stehen in SOURCES und im Quellkatalog. Eigene Texte, Bilder und Zahlenfälle; keine Buchvolltexte, Normtexte oder fremde Abbildungen kopiert.

Die angefragten Seiten von Gesetze im Internet, KMK, BIPM und DGUV waren per Netzwerk-HTTP 403 nicht einsehbar. Aktueller Rechts-/Lehrplan-/SI-Primärquellenabgleich und unabhängige elektrotechnische Fachabnahme sind offen. Deshalb keine Behauptung vollständiger aktueller Meisterprüfungsabdeckung. Ausbildungsniveau und Meister-Transfer sind getrennt; alle Prüfungen/Fälle sind selbst erstellt.

Einige Beziehungen wurden aus belegten Grundbeziehungen selbst hergeleitet (z. B. Stern/Dreieck, Schichten-U-Wert, Enthalpiebilanz); sie haben ausdrücklich keinen vorgetäuschten direkten externen Einzelbeleg. Welche Abgleiche offen sind, zeigen Aussagenbelege und CONTENT_REVIEW. Technisch grüne Tests sind keine fachliche Gesamtfreigabe.

## Bewusst verschoben

Freie symbolische Algebra, komplexe Zahlen/Zeigerrechnung als allgemeiner Rechner, reale unsymmetrische bzw. oberwellenbehaftete Netze, vollständige Motor-/Schutzlehre, tiefere Analysis, reale Stoffdaten/log-p-h, professionelle Druckverlust-/Dämm-/Anlagenrechner, psychologische Diagnose, Cloudkonto, Synchronisation und PWA. Keine halbfertigen Rechner oder angeblich vollständigen Zusatzfachgebiete.

Die mathematischen und physikalischen Kernpfade sind nutzbar; die gesamte Meisterausbildung und unabhängige Fachfreigabe sind damit nicht abgeschlossen. Die thermischen Modelle sind eben/stationär mit vorgegebenen Eigenschaften. Keine reale Anlagenfreigabe, keine elektrische Arbeitsanleitung.

## Datensicherung

Fortschrittsschema 3 und Exportformat 1 bleiben erhalten. Reale historische Exportfixtures aus 0.4 und 0.5 testen unveränderten Import/Reexport einschließlich Karten, Wiederholungen, Antworten, alter Aufgaben-Snapshots und aktiver/abgeschlossener Prüfung. `exerciseDraft` ist optional und geschützt validiert; alte Dateien ohne Feld bleiben gültig. Der Export meldet Appversion 0.6.0. Neue Aufgabenarten können nur 0.6 oder spätere Versionen wiedergeben; keine versprochene Abwärtslesbarkeit alter Apps für neue Inhalte.

## Lokale Prüfung und Veröffentlichung

Siehe QUALITY_ASSURANCE und NEXT_STEPS für tatsächliche Testresultate und Wiederaufnahme. CI prüft jeden Branch-Push und Pull Request mit Chromium/WebKit. Pages veröffentlicht ausschließlich nach main-Push oder manuellem Start auf main; PRs veröffentlichen nicht. Pfad `/kaeltemeister-pro/` bleibt gesetzt. Vor Merge Backup herunterladen, PR-Checks prüfen, ausschließlich ausdrücklich freigegeben mergen.

## iPad-Test nach freigegebenem Merge

1. Grünen Pages-Lauf abwarten und https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/ in Safari öffnen. Neu laden und Version 0.6 prüfen. Zunächst Sicherung in Dateien speichern.
2. Akademie → Technische Mathematik → „Winkel, Trigonometrie und Gefälle“: Winkel aus 3 m Höhe / 4 m horizontal mit `36,87` ° lösen. Quellennachweise aufklappen.
3. „Technische Formeln umstellen“ → `x(x−2) = 0`: Division durch x auswählen und das Feedback zur verlorenen Lösung lesen; anschließend Nullprodukt korrekt wählen. Kreisfläche nach d mit der nicht negativen Wurzel üben.
4. Elektrotechnik → Sinus: Nacheilen auf 90° stellen. Drehstromaufgabe mit 400 V, 10 A und 0,8 ergibt etwa `5542,56` W. Stern-/Dreieckgrößen vergleichen.
5. Thermodynamik → Wärmeübertragung: eine Schicht ergibt `16` W, zwei gleiche seriell `8` W. „Lernfall: Zwei thermische Modelle vergleichen“ vollständig bearbeiten, am Ende reale Grenzen fachlich bewerten.
6. Wärmeleistungsaufgabe: `10,45` eingeben, absichtlich W statt kW wählen. Lernbrückenhinweis lesen, Grundlage öffnen. Seite neu laden → Aufgabenentwurf fortsetzen; Eingabe und Einheit sind erhalten. Zurückkehren, kW wählen, erneut prüfen.
7. Sicherung exportieren, getrennt aufbewahren. Import alter Sicherung nur nach Sicherung des aktuellen Stands; Vorschau und Ersetzen bewusst bestätigen. Mehrere Tabs vor einem Import schließen.

Keine physische iPad-/iPhone-Prüfung wurde hier durchgeführt. WebKit-Simulation ersetzt diese nicht.

## Empfehlung 0.7

Zuerst qualifizierte Fachabnahme der neuen Ableitungen und reale Safari-Gerätetests sowie den blockierten aktuellen Primärquellenabgleich abschließen. Danach einen zusammenhängenden Motor-Lernpfad (Drehfeld, Synchrondrehzahl, Schlupf, Wirkungsgrad, Kennlinie) mit belastbarer Quelle und geprüften Daten entwickeln. Validierte Stoffdaten erst als eigenes geprüftes Folgeprojekt beginnen.

## Technischer Abschlussnachweis

323 lokale Unit-/Integrationstests, TypeScript, Produktionsbuild und Workflow-Lint erfolgreich. Reproduzierbare npm-Installation geprüft. Vollständige Chromium-Regression: 155 erfolgreiche Szenarien. Nach einem zusätzlichen WebKit-iPhone-Befund wurde der natürliche CSS-Umbruch korrigiert und lokal mit 24 fokussierten Browserfällen überprüft; die vollständige GitHub-CI hat die Korrektur bestätigt: [Lauf 40656718539](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40656718539) auf `05f53da`, 248 erfolgreich (155 Chromium + 93 WebKit), außerdem Installation, Typprüfung, 323 Tests und Build erfolgreich. GitHub hatte den Fehler tatsächlich gefunden; er wurde nicht durch Testabschaltung verdeckt. Endgültiger Lauf/Status steht in NEXT_STEPS.

PR-Erstellung mit autorisiertem gh am Abschluss erneut versucht: API/GraphQL HTTP 403. Keine weitere verfügbare autorisierte Connector-Methode. Keine PR erstellt; Beschreibung und direkter Vergleich sind vorbereitet. main ist unverändert und konfliktfrei vergleichbar. Keine automatische Veröffentlichung oder Zusammenführung.
