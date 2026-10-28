# Architektur · Version 0.6

Basis main `09a953b` enthält 0.5 vollständig. React/TypeScript/Vite/Tailwind, Navigation, lokaler Speicher und GitHub Pages bleiben erhalten. Keine Konten oder kostenpflichtigen Dienste.

- `src/technical/calculations.ts`: zentraler Größen-/Einheitenvertrag mit SI-Umrechnung, Dispatch; alte Berechnungen erhalten.
- `src/technical/foundations.ts`: begrenzte Schulmathematik und kontrollierte Bruchantworten.
- `src/technical/deep.ts`: reine wiederverwendbare Geometrie-, Sinus-/Dreiphasen- und stationäre Wärmemodelle. Endliche Eingaben/Zwischenschritte, Nullbedingungen und Modellbereiche werden geprüft. Kein eval oder zweiter Rechenkern.
- `src/academy/foundations/`: erhaltene Grundlagen, Adapter für drei Lesestufen/Fragen/Karten, Trainer und Lernbrücke. Die acht Mathematikmodule werden additiv vertieft; IDs und bestehende Lesemarkierungen bleiben erhalten.
- `src/academy/deep/`: neue kuratierte Lektionen/Formeln/Zahlenaufgaben, endliche Trainerfälle, Diagramme, vier Fallsequenzen, Aussagenbelege und abgeleiteter Kompetenzgraph.
- `catalog.ts`: gemeinsame Sicht für Akademie, Aufgaben, Suche, Prüfung und Fachregister.
- `components/LessonReading.tsx`: gemeinsames Lesen für Modul und Lernbrücke; zeigt dieselben Herleitungen, Beispiele, Variablen, Quellenbelege und Modellgrenzen.
- `exercises/`: bestehende Snapshots, gemeinsamer Grader und SI-Lösungsweg. Fallstudien referenzieren vorhandene Zahlen-/Auswahlaufgaben per ID. Keine kopierte Physiklogik.
- `adaptive/`: vorhandene Lernzähler, Termine und Empfehlungen. Kein paralleles Kompetenz- oder Diagnosespeichersystem.
- `storage/`: vorhandener Backup-Port, Importvalidierung, Vorschau und Wiederherstellungsjournal.
- `quality/`: vollständiges Inhaltsregister, getrennte Nachweisarten, Quellenbewertungen und sichtbare Belege.

## Gemeinsame Identitäten

Alte Modul-, Formel-, Aufgaben- und Kompetenz-IDs bleiben gültig. Neue IDs benennen Fachinhalte, keine Arraypositionen. `competencyGraph()` leitet Voraussetzungen, Aufgaben, Formeln und Quellen aus dem Katalog ab. Neue Module sind in bestehende Fachgebiete eingeordnet; fremde Fachgebiete werden nicht mit duplizierten Kopien aufgefüllt.

Ein späterer Fachrechner kann dieselben SI-Funktionen aufrufen, benötigt aber zusätzliche Validierung seines professionellen Modells und seiner Daten. Eine plausible Übungszahl ersetzt keine Auslegungsfreigabe. Reale Stoffwerte und log-p-h bleiben eine gesonderte Schicht.

## Datenvertrag

Fortschritt bleibt Schema 3, Backup Format 1. Optionaler `exerciseDraft` speichert genau einen letzten Zahlenübungsentwurf: taskId, Revision, Antwort, Einheit, offene Grundlagenlektion, geprüft-Flag und Datum. Der Grader berechnet beim Fortsetzen den Status erneut aus dem aktuellen unveränderten Aufgabenstand. Abweichende Revisionen werden nicht als aktuelle Entwürfe aktiviert; beschädigte Daten blockieren unsichere Speicherung. Veraltete offene Prüfungssnapshots bleiben unabhängig vom neuen Katalog lesbar.

Trainerposition und unbewertete Fall-Schrittposition sind sitzungsbezogen; bewertete Versuche werden regulär gespeichert. Keine erfundene dauerhafte Fallprüfungshistorie. Die neuen optionalen Felder benötigen keine destruktive Migration. Neue Aufgabenarten in Snapshots erfordern eine App ab 0.6; echte alte 0.4-/0.5-Backups sind vorwärtskompatibel getestet.

## Nachweise und Darstellung

Aussagenbelege unterscheiden direkten Quellenabgleich, eigene mathematische Herleitung und unabhängige Zahlenreferenz. Der höchste Status setzt echte dokumentierte menschliche Fachprüfung voraus; er wird nirgends behauptet. Rechts-/Normquellen ohne Zugriff bleiben offen.

KaTeX und Schriftarten bleiben lokal. Formeln enthalten explizites TeX, lesbaren Alternativtext, Variablen, Einheiten und Gültigkeitsbereich. Normierter Diagrammverlauf und Textalternative sind gekoppelt; Farben allein tragen keine Information. Reine neue Inhaltsdaten werden als eigener Vite-Chunk ausgeliefert, um Inhalt und UI getrennt cachen zu können; alle bisherigen Pfade bleiben unverändert.
