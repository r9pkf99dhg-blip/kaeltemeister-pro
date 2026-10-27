# Auslieferungsstand · Version 0.2

## Tatsächlich implementiert

Lernakademie mit zwölf Fachgebietsstrukturen, fünf ausführlichen Kältemodulen und drei unterschiedlichen Wissensstufen pro Modul. Wiederverwendbare Ansicht mit Lernzielen, Einstieg, Erklärung, Zusammenhängen, Formeln/Einheiten, Beispiel, typischen Fehlern, Zusammenfassung, Verständnisfragen, Vertiefung sowie Quellen-/Prüfstatus. Zusätzlich zehn Karteikarten, 20 Fragen mit stabilen Antwort-IDs, Suche, Filter, offene/gelesene Niveaus, Übungsbedarf und Wiederholungstermine.

Versionierter Akademie-Fortschritt v2 mit vorsichtiger einmaliger v1-Übernahme. Alte Artikel, Rundentest und Rechner bleiben erhalten und werden mit dem Akademiekatalog verknüpft. Die zentrale sensible Wärmeformel wird auch im bestehenden Rechner verwendet. Unbekannte Datenversionen und Lesefehler werden nicht stillschweigend überschrieben.

## Fachstatus und Grenzen

Kein neues Modul ist unabhängig fachlich freigegeben. Die externen Fachseiten waren in der Entwicklungsumgebung nicht abrufbar (HTTP 403); es wurde keine erfolgreiche Recherche vorgetäuscht. Rechenbeispiele und Einheiten wurden auf Konsistenz geprüft. Das gemeinsame Zahlenmodell ist ausdrücklich fiktiv, keine reale Kältemittel-Stofftabelle. Details und spätere Freigabe: [SOURCES.md](SOURCES.md).

Die weiteren Fachgebiete sind strukturiert, aber noch nicht vollständig ausgearbeitet. Keine neue Datenbank realer Bauteile/Kältemittel, keine Simulation, Diagnose-, Wartungs- oder Planungsanwendung. Kein Offline-Modus, keine Gerätesynchronisation und keine automatische Tab-Konfliktlösung. Das Zukunftskonzept ist in [ARCHITECTURE.md](ARCHITECTURE.md) und [ROADMAP.md](ROADMAP.md) erhalten.

## Prüfungen

- Saubere Lockdatei-Installation, Typprüfung und Vite-Produktionsbuild.
- 81 Vitest-Prüfungen: bisherige 48 Tests plus Inhalt-/Referenzkonsistenz, Niveaus, Suche, Migration, Speicherfehler, Antworten, Wiederholungsintervalle und Verknüpfung aus Altartikeln.
- 50 Browserprüfungen: zehn Abläufe auf fünf Größen (320, 390, 820, 1180 und 1440 Pixel). Enthalten sind die bisherigen Funktionen und die Akademie einschließlich Niveaus, Suche, Antworten nach Neuladen, Karteikarten, v1-Migration, Schutz unbekannter v2-Daten und Altartikel-Verknüpfung.
- Produktionspfad `/kaeltemeister-pro/`, Assets und der vorhandene Rechner werden weiterhin geprüft. Beide bestehenden GitHub-Workflows führen die erweiterten Tests automatisch aus.
- Workflow-Syntaxprüfung mit `actionlint`. GitHub-CI-Ergebnisse sind im Pull Request zum jeweiligen Commit sichtbar; erst ein Merge kann das neue main-Deployment auslösen.
- Akademie-Screenshots für Smartphone/Tablet erzeugt und visuell kontrolliert. Chromium emuliert Bildschirmgrößen und Touch; das ist kein Test auf einem physischen iPad oder in echtem Safari.

Ein allgemeiner Mathematiktest beweist keine vollständige fachliche Richtigkeit der Texte. Die Katalogtests sichern IDs, Verweise, Niveautexte, gültige Antworten und das konkrete hinterlegte Zahlenmodell; die redaktionelle Freigabe bleibt offen.

## Übernahme und Version 0.3

Die verständliche Übernahme-/iPad-Testanleitung steht in [NEXT_STEPS.md](NEXT_STEPS.md). Nach grünen Checks den PR mergen und den automatischen Pages-Lauf auf `main` prüfen. Version 0.3 sollte zuerst Quellen/Fachfreigabe, Export/Import, echten Safari-Gerätetest und einen weiteren vollständigen Lernpfad enthalten.
