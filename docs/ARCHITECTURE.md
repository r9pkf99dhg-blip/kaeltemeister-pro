# Architektur · Version 0.8

Ausgangspunkt main `908993d` enthält Version 0.7 vollständig über PR #9. Branch `feat/refrigeration-mastery-v08` erweitert dieselbe React-/TypeScript-/Vite-/Tailwind-App. Navigation, Artikel, Rundentest, Akademie, Prüfung, Wärmeleistungsrechner, Techniklabor, Übungswerkstatt und Speicherschutz bleiben erhalten. Kein Konto, Backend oder kostenpflichtiger Dienst.

## Ein Fachkern, mehrere Oberflächen

- `src/technical/calculations.ts`: bestehender Größen-/Einheitenvertrag, SI-Umrechnung und Dispatch. `foundations.ts` und `deep.ts` bleiben die reinen Fachfunktionen. Aufgaben und Labor verwenden denselben Dispatch, keine zweite Physikimplementierung.
- `src/technical/expression.ts`: begrenzter reeller Arithmetikparser ohne eval, Namen, Funktionen oder symbolische Algebra. Token-, Tiefen-, Längen-, Potenz-, Nullnenner- und Endlichkeitsgrenzen; numerischer Unterlauf wird nicht als zuverlässige Null ausgegeben.
- `src/lab/`: deklarative Rechnerdefinitionen mit stabiler ID, Modell-/Formel-ID, Zielgrößenart, Eingabefeldern/Einheiten, Erklärpaar, Grenzen und Lernverweisen. Ein Renderer bedient 26 Modell-/Zielvarianten; eigener Einheitenumrechner nutzt dieselben SI-Funktionen. Diagramme verwenden ebenfalls den Fachkern; Extreme ohne sichere Diagrammdomäne erhalten eine Textmeldung.
- `src/workshop/`: Katalogadapter aus bestehenden LearningItems und wenigen neuen kuratierten Auswahl-/Umrechnungsaufgaben. Schrittfolgen referenzieren IDs. Rechenblatt und Hilfe sind Darstellungs-/Fortschrittsmetadaten; `snapshotItem`, `gradeSnapshot` und `recordOutcome` bleiben maßgeblich.
- `src/language/`: getrennte sprachliche Ergänzungen zu gemeinsamen Fachobjekten. Context ist nur Darstellung, nie Bewertungsparameter. Globale Präferenz lebt im bestehenden Fortschritt; temporäre Lektionsausnahme verändert sie nicht. 27 Kernmodule haben drei einfache Erklärstufen, gemeinsame Beispiele/Herleitungen/Grenzen bleiben erhalten. Andere Module zeigen ihren ursprünglichen Text sichtbar gekennzeichnet.
- `src/academy/`: vorhandener gemeinsamer Katalog, Leser, adaptives Lernen, Prüfungen, Trainer, Fälle und Kompetenzen. Lektionen öffnen passende Laborvarianten; Labor öffnet Fachlektion, eigene Übung und Transferfall. Werkstatt übernimmt keine Laborlösung als Nutzereingabe.
- `src/quality/`: Gesamtprüfregister einschließlich neuer Sprachfassungen/Laborfälle; 76 Aussagenbelege trennen eigene Ableitung, Quellenabgleich, Zahlenreferenz und offene Fachfreigabe.
- `src/storage/`: vorhandener Backup-Port, validierter Import, Vorschau und Wiederherstellungsjournal. Kein paralleler Speicher für die neuen Module.

## Gemeinsame Identitäten und Grenzen

Modul-, Formel-, Aufgaben-, Quellen- und Kompetenz-IDs bleiben stabil. `competencyGraph()` leitet Referenzen aus dem Katalog ab. Die fünf Laborgruppen sind keine zusätzlichen konkurrierenden Fachgebiete. Formeltexte und SI-Berechnungen werden nicht aus Benutzertext evaluiert. Formelsatz bleibt lokales KaTeX mit Fehlerfallback und MathML.

Fortschrittsschema 3 und Backupformat 1 bleiben erhalten. Optionale Sprach-, Labor-, Werkstatt-/Trainermetadaten werden vor Import geprüft. Historische Prüfungen behalten ihre vollständigen damaligen Snapshots. Alte Sicherungen aus 0.4/0.5/0.6/0.7 sind anhand echter alter Exporter geprüft; neue Aufgaben/Metadaten werden nicht als in alten Apps rückwärtslesbar versprochen.

Genau ein letzter Werkstatt-/Zahlenentwurf und ein letzter Laborzustand sind dauerhaft. Unbewertete Positionen der alten Fallstudien bleiben sitzungsbezogen; der Werkstatt-Umstellungstrainer hat nun einen optionalen dauerhaften Entwurf. Ein allgemeines Arbeitsheft oder Dateisystem ist nicht implementiert.

## Vorbereitung der Plattform

Reale Kältemittel-/Bauteildaten benötigen eigene Verträge für Herkunft, Lizenz, Revision, Bezug, Zustand, Gültigkeitsbereich und Fehler. log-p-h, Diagnose, Planung und Projektdokumentation dürfen den vorhandenen SI-/Formel-/Quellenkern verwenden, aber keine Lehrmodellwerte als geprüfte reale Daten ausgeben. Ein fachlicher Modellwechsel ist explizit, keine versteckte Änderung eines Rechners. Keine künstliche Kompetenzdiagnose.

## Auslieferung

Reine Sprachinhalte und bestehende Tiefeninhalte liegen in eigenen Build-Chunks, UI und Daten können getrennt gecacht werden. Vite-Basis `/kaeltemeister-pro/` bleibt bestehen. GitHub prüft Branch-Pushes und PRs; Pages veröffentlicht nur main nach Installation, Typprüfung, Tests, Build und Chromium/WebKit. Kein automatischer Merge.

## Erweiterung Version 0.8

Basis main `908993d` enthält 0.7 vollständig; Entwicklung auf `feat/refrigeration-mastery-v08`. Die oben beschriebene Architektur bleibt erhalten.

- `src/mastery/`: optionale Motivation über vorhandener Performance/Kompetenzen, aktuelle unabhängige Evidenz, freiwillige Sitzungen und referenzierte Missionen. `assessment.ts` enthält gemeinsame reine Nachweisregeln; keine zweite Bewertungs- oder Terminbibliothek. UI wird bedarfsgeladen.
- `src/technical/refrigeration.ts`: gemeinsamer Bilanzkern, über bestehenden Dispatch auch für Zahlenaufgaben. `src/refrigeration/` trennt qualitative Erklärung, erzeugtes Stoffdatenartefakt, begrenzte Backend-Fähigkeiten, Referenzfälle, Bilanzadapter, Diagrammabbildung und bedarfsgeladene Ansicht. Kein dupliziertes COP-/Enthalpieberechnen in Aufgabenkomponenten.
- Vier neue Lektionen, Formeln, Zahlen-/Auswahlaufgaben und Begriffe erweitern denselben Fachkatalog. Stabile IDs, Quellreferenzen, Aufgaben-/Datenrevisionen und explizite Kompetenzen verbinden Mastery, Lernbrücke, Rechenblatt und Kreislauf. 27 einfache Kernmodule; keine Sprachebene beeinflusst Bewertung.
- Neue `mastery?`-/`cycleDraft?`-Felder sind optional im bestehenden Fortschrittsschema 3/Backupformat 1. Zeitnachweise werden nur aus tatsächlichen neuen unabhängigen Erfolgen ergänzt. Keine Rekonstruktion einer alten Ereignishistorie. Echte 0.4–0.7-Backups, Journal und Mehrtab-Schutz bleiben getestet.
- `AsyncView` fängt Fehler nachgeladener Ansichten ab. Stoff-/Fachinhalte eigener Chunk; Mastery-/Kreislauf-UI separat. Pointer-Pan bleibt lokal und speichert beim Loslassen. Der begrenzte JSON-Katalog benötigt keinen Solver-Worker oder Runtime-Netzabruf. Keine Erhöhung des Bundle-Warnlimits.

Langfristig können technische Rechner, freie Stoffdaten, Bauteile, Diagnose, Anlagenplanung und Projektdokumentation dieselben Identitäten und SI-Funktionen verwenden. `PropertyBackend` beschreibt die tatsächlich vorhandenen Fähigkeiten; freie Zustandsabfragen sind aktuell ausdrücklich abgelehnt. Ein späteres Worker-/WASM-Backend muss separat reproduzierbar und fachlich validiert werden. Details: PROPERTY_BACKEND, CYCLE_VALIDATION und DOMAIN_MODEL.
