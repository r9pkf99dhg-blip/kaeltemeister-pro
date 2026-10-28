Aktueller Ergänzungsstand: [Version 0.6](RELEASE_V06.md). Historische Grundlagen und Zahlen beziehen sich gegebenenfalls auf die bezeichnete frühere Version.

# Version 0.5 · Grundlagenakademie und mathematischer Formelsatz

## Ausgangslage und gesicherte Etappen

Basis: main `163b9b7` (Merge PR #6, Version 0.4). Basistests 184, Typprüfung und Build vor Beginn bestätigt. Feature-Branch `feat/foundations-academy-v05`; kein automatischer Merge, kein Force-Push. Ein anfänglicher Cloud-Ausfall trat vor dem ersten Sicherungscommit auf; nach Wiederverfügbarkeit wurde der unveränderte Stand geprüft und zuerst der Wiederaufnahmeplan gesichert.

| Etappe | Commit | Fertiger Umfang |
| --- | --- | --- |
| A | 1d521d5 | Analyse, Plan, NEXT_STEPS, normaler Push |
| B | d5c2c35 | KaTeX/mhchem, sichere Komponenten, 19 alte Registerformeln/24 Musterlösungen |
| C | f9a3691 | Acht Mathematiklektionen, 21 Zahlenaufgaben, elf Umstellungsziele |
| D | 6cf7268 | Vier Physiklektionen und zwölf Zahlenaufgaben |
| E | 0ba0930 | Drei Chemielektionen und sechs Zahlenaufgaben |
| F | 3784efc | Stabile Kompetenzen, Voraussetzungen, Audit und Lehrplanstruktur |
| G | 485e2b0 | Einfache Lernbrücke mit erhaltener Originaleingabe |
| H | b1a2a34 | Echte 0.4-Sicherungsreferenz, vollständige Rendering-Prüfung und Abschlussverbesserungen |

Jede technische Etappe wurde mit Typprüfung, Tests und Build abgeschlossen und regulär hochgeladen. Neue UI-Abläufe wurden zusätzlich im Browser geprüft. Die abschließende Dokumentation folgt als eigener Commit; Wiederaufnahme über NEXT_STEPS und git log.

## Tatsächlich implementierter Umfang

- 25 Module: fünf bestehende Kälte-, fünf bestehende Elektro-, acht Mathematik-, vier Physik- und drei Chemie-Module.
- 80 Modulfragen, 50 Karten, 63 Zahlenaufgaben, 42 Formeldefinitionen, 26 Fachbegriffe und elf Umstellungsziele mit 13 bewertbaren Schritten.
- Vertikale/verschachtelte Brüche, Wurzeln, Indizes, Potenzen, griechische Zeichen, Summen/Integrale/Vektoren, Mehrzeiler, chemische Formeln und SI-Notation über lokal gebündeltes KaTeX/mhchem.
- Explizite statt heuristischer Migration: 19 alte Registerbeziehungen, 24 alte Musterlösungen, gezielte Antworttexte sowie neue Lektionen/Herleitungen. Historische Freitexte/Snapshots bleiben lesbar; keine pauschale automatische Schrägstrichumwandlung.
- Mathematik-Kern: Rechenregeln, Brüche, Prozent/Dreisatz, Variablen/Terme, lineare Gleichungen, Potenzen/Wurzeln, SI-Umrechnung und technische Formelumstellung.
- Physik-Kern: Bewegung/Kraft, Arbeit/Energie/Leistung, Druck/Dichte, Temperatur/Wärme/Phasenwechsel.
- Chemie-Kern: Stoffe/Gemische, Atome/Formelsprache, Stoffmenge/molare Masse und theoretische Reaktionsbilanz.
- Lernbrücke im Zahlentraining: benötigte Kompetenz → erklärbare mögliche Grundlage → dieselbe vorhandene Lektion/Selbsttest → Rückkehr mit erhaltener Eingabe/Einheit. Keine sichere Fehlerdiagnose.
- Grundlagenbezogene Empfehlungen, feste zusätzliche Zahlenvarianten, schrittweise aufklappbare komplexe Musterlösungen und gemeinsame Lesekomponente.
- Fortschrittsschema 3, Backupformat 1, Rollback/Journal, Migration und Pages-Konfiguration erhalten.

## Erfolgreiche lokale Prüfung

- Reproduzierbares `npm ci --cache /tmp/kaeltemeister-npm-cache`.
- TypeScript-Prüfung und Produktionsbuild.
- **262 Funktions-/Komponenten-/Referenztests in 20 Dateien**.
- **120 Chromium-Browsertests**, 24 Szenarien × fünf Smartphone-/Tablet-/Desktopgrößen.
- Beide Workflows mit actionlint geprüft; git diff --check sauber.
- REVIEW_REGISTER mit 398 Einträgen und DOMAIN_AUDIT aus demselben Katalog erzeugt.
- Alle Modultexte auf allen drei Niveaus, alle Formeldefinitionen, Musterlösungen, kuratierte Antwortnotationen und ungültige Syntax gerendert.
- Unabhängige Zahlenreferenzen, SI-/Prozent-/Bruch-/Vorzeichen-/Nullnenner-/Wurzel-/Potenzgrenzen; keine Auswertung beliebiger Programme.
- Echte aus main 0.4 erzeugte vollständige Sicherung unverändert importiert und erneut exportiert; neue negative Mathematik-Prüfungssnapshots sowie optionale Felder geprüft.

GitHub CI installiert zusätzlich WebKit und führt denselben vollständigen Browserpool aus. Tatsächliche Run-Ergebnisse müssen anhand des jeweiligen Commit-Links geprüft werden; ein konfigurierter Test ist kein bestandener Test. Mehrere Etappenläufe waren bereits erfolgreich. Der letzte Lauf wird im Abschlussbericht genannt. Lokaler WebKit-Download ist aus dieser Umgebung blockiert; **kein echtes iPad/iPhone wurde getestet**.

## Fachliche Grenzen und bewusst verschoben

Alle Grundlagentexte sind eigenständig formuliert. Tatsächlich eingesehene OpenStax-Archive/Fundstellen stehen in SOURCES; kein Buch/Normtext vollständig übernommen, keine Normen oder realen Kältemittelwerte erfunden. Quellenlink, automatische Prüfung und unabhängige menschliche Fachfreigabe sind verschieden. Letztere ist für alle Inhalte offen.

Der Lehrplan ist vollständig strukturiert, aber nicht vollständig in allen Oberstufen-/Technikthemen ausgearbeitet. Weiterführende Gleichungssysteme/quadratische Gleichungen, Geometrie/Trigonometrie, Funktionen, Analysis/Statistik, vertiefte Wärmeübertragung/Thermodynamik, Wechsel-/Drehstrom, Säuren/Basen/Redox/Organik und weitere technische Fachgebiete bleiben ausdrücklich geplant. Die bestehenden drei Niveaus dienen bei neuen Grundlagen als Einstieg, Begründung und Transfer, nicht als vollständige Meisterprüfungsvorbereitung jedes Einzelthemas.

Keine professionelle Anlagen-/Schutzdimensionierung, realen Stofftabellen, Diagrammsimulation, Cloud-Synchronisation, Konten oder Offline/PWA. Keine praktischen elektrischen oder chemischen Arbeitsanweisungen. Die Lernbrücke ist eine einfache lokale Heuristik; offene Panels/Trainerschritte und unbewertete Eingaben werden nicht über Reload persistiert. Neue Sicherungen mit neuen Aufgabentypen benötigen 0.5 oder später; alte Apps kennen diese Typen nicht.

## Test auf dem iPad und nächste Schritte

Erst nach freigegebenem PR-Merge und erfolgreichem main-Pages-Lauf auf https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/ neu laden. Zuerst eigene JSON-Sicherung erstellen. Neue Kurse über Dashboard oder Akademie öffnen. −1/2 als Bruchantwort, mehrstufige Umstellung, chemische Indizes, Schriftvergrößerung, Lernbrücke und Dateiwiederherstellung prüfen. APPLE_TEST_PLAN enthält konkrete Erwartungen und Fehlervorlage.

Empfehlung danach: unabhängige Fachabnahme, echte Safari-Prüfung, vertiefte technische Mathematik und Wechselstrom als jeweils abgeschlossener Lernpfad. Die zehn langfristigen Plattformmodule bleiben in ROADMAP/ARCHITECTURE berücksichtigt; spätere Rechner und Diagnose verwenden dieselben geprüften Rechenfunktionen und Kompetenz-/Formel-IDs.
