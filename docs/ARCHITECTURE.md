# Architektur · Version 0.7

Ausgangspunkt main `8a1ba77` enthält Version 0.6 über PR #8. Branch `feat/interactive-technical-lab-v07` ergänzt die bestehende React-/TypeScript-/Vite-/Tailwind-App. Navigation, Artikel, Rundentest, Akademie, Prüfung, vorhandener Wärmeleistungsrechner und Speicherschutz bleiben erhalten. Kein Konto, Backend oder kostenpflichtiger Dienst.

## Ein Fachkern, mehrere Oberflächen

- `src/technical/calculations.ts`: bestehender Größen-/Einheitenvertrag, SI-Umrechnung und Dispatch. `foundations.ts` und `deep.ts` bleiben die reinen Fachfunktionen. Aufgaben und Labor verwenden denselben Dispatch, keine zweite Physikimplementierung.
- `src/technical/expression.ts`: begrenzter reeller Arithmetikparser ohne eval, Namen, Funktionen oder symbolische Algebra. Token-, Tiefen-, Längen-, Potenz-, Nullnenner- und Endlichkeitsgrenzen; numerischer Unterlauf wird nicht als zuverlässige Null ausgegeben.
- `src/lab/`: deklarative Rechnerdefinitionen mit stabiler ID, Modell-/Formel-ID, Zielgrößenart, Eingabefeldern/Einheiten, Erklärpaar, Grenzen und Lernverweisen. Ein Renderer bedient 26 Modell-/Zielvarianten; eigener Einheitenumrechner nutzt dieselben SI-Funktionen. Diagramme verwenden ebenfalls den Fachkern; Extreme ohne sichere Diagrammdomäne erhalten eine Textmeldung.
- `src/workshop/`: Katalogadapter aus bestehenden LearningItems und wenigen neuen kuratierten Auswahl-/Umrechnungsaufgaben. Schrittfolgen referenzieren IDs. Rechenblatt und Hilfe sind Darstellungs-/Fortschrittsmetadaten; `snapshotItem`, `gradeSnapshot` und `recordOutcome` bleiben maßgeblich.
- `src/language/`: getrennte sprachliche Ergänzungen zu gemeinsamen Fachobjekten. Context ist nur Darstellung, nie Bewertungsparameter. Globale Präferenz lebt im bestehenden Fortschritt; temporäre Lektionsausnahme verändert sie nicht. 23 Kernmodule haben drei einfache Erklärstufen, gemeinsame Beispiele/Herleitungen/Grenzen bleiben erhalten. Andere Module zeigen ihren ursprünglichen Text sichtbar gekennzeichnet.
- `src/academy/`: vorhandener gemeinsamer Katalog, Leser, adaptives Lernen, Prüfungen, Trainer, Fälle und Kompetenzen. Lektionen öffnen passende Laborvarianten; Labor öffnet Fachlektion, eigene Übung und Transferfall. Werkstatt übernimmt keine Laborlösung als Nutzereingabe.
- `src/quality/`: Gesamtprüfregister einschließlich neuer Sprachfassungen/Laborfälle; 76 Aussagenbelege trennen eigene Ableitung, Quellenabgleich, Zahlenreferenz und offene Fachfreigabe.
- `src/storage/`: vorhandener Backup-Port, validierter Import, Vorschau und Wiederherstellungsjournal. Kein paralleler Speicher für die neuen Module.

## Gemeinsame Identitäten und Grenzen

Modul-, Formel-, Aufgaben-, Quellen- und Kompetenz-IDs bleiben stabil. `competencyGraph()` leitet Referenzen aus dem Katalog ab. Die fünf Laborgruppen sind keine zusätzlichen konkurrierenden Fachgebiete. Formeltexte und SI-Berechnungen werden nicht aus Benutzertext evaluiert. Formelsatz bleibt lokales KaTeX mit Fehlerfallback und MathML.

Fortschrittsschema 3 und Backupformat 1 bleiben erhalten. Optionale Sprach-, Labor-, Werkstatt-/Trainermetadaten werden vor Import geprüft. Historische Prüfungen behalten ihre vollständigen damaligen Snapshots. Alte Sicherungen aus 0.4/0.5/0.6 sind anhand echter alter Exporter geprüft; neue Aufgaben/Metadaten werden nicht als in alten Apps rückwärtslesbar versprochen.

Genau ein letzter Werkstatt-/Zahlenentwurf und ein letzter Laborzustand sind dauerhaft. Unbewertete Positionen der alten Fallstudien bleiben sitzungsbezogen; der Werkstatt-Umstellungstrainer hat nun einen optionalen dauerhaften Entwurf. Ein allgemeines Arbeitsheft oder Dateisystem ist nicht implementiert.

## Vorbereitung der Plattform

Reale Kältemittel-/Bauteildaten benötigen eigene Verträge für Herkunft, Lizenz, Revision, Bezug, Zustand, Gültigkeitsbereich und Fehler. log-p-h, Diagnose, Planung und Projektdokumentation dürfen den vorhandenen SI-/Formel-/Quellenkern verwenden, aber keine Lehrmodellwerte als geprüfte reale Daten ausgeben. Ein fachlicher Modellwechsel ist explizit, keine versteckte Änderung eines Rechners. Keine künstliche Kompetenzdiagnose.

## Auslieferung

Reine Sprachinhalte und bestehende Tiefeninhalte liegen in eigenen Build-Chunks, UI und Daten können getrennt gecacht werden. Vite-Basis `/kaeltemeister-pro/` bleibt bestehen. GitHub prüft Branch-Pushes und PRs; Pages veröffentlicht nur main nach Installation, Typprüfung, Tests, Build und Chromium/WebKit. Kein automatischer Merge.
