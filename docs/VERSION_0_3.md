> Historischer Bericht für 0.3. Aktuell: [Version 0.4](VERSION_0_4.md).

# Version 0.3 · Intelligente Lernakademie

## Geprüfte Ausgangslage

Version 0.2 war vor Beginn vollständig in `main`: Merge von PR #4, Commit `f74d6f67ffb92ffd3899eaa297d38a8dd6aa4bb4`. [Pages-Lauf 40537339409](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40537339409) war erfolgreich. Damit war die geforderte Voraussetzung für die Entwicklung erfüllt.

## Tatsächlich programmiert

- Regelbasiertes adaptives Lernen: bewertete Versuche, richtige/falsche Antworten, Themenstatistik, begründete Empfehlungen und Wiederholungstermine.
- Acht technische Rechenaufgaben mit gemeinsamem SI-Kern, Einheitenwahl, Toleranz, Hinweis, Musterlösung, Fehlerhinweisen und Fach-/Formelbezug.
- Selbst erstellte Übungsprüfungen mit Fachgebiet, Niveaugrenze, 5/10/20 Minuten, gemischten Fragen und Rechnungen, Wiederherstellung nach Neuladen, automatischer Abgabe, Analyse und Ergebnisverlauf.
- Lern-Dashboard mit Fachgebiets-Lesefortschritt, heutigen Fälligkeiten, Schwächen, zuletzt bearbeiteten Modulen und Empfehlungen.
- Versionierter Fortschritt v3; v2-Werte bleiben erhalten und werden ohne erfundene Versuchshistorie übernommen.
- Die bisherigen Module, Wissensstufen, Karten, Artikel, Rundentests und Rechner bleiben nutzbar. Der Wärmeleistungsrechner verwendet jetzt dieselbe Rechenfunktion wie die Aufgaben-Engine.

## Bewusst begrenzt

Keine offiziellen Prüfungsaufgaben, Bestehensnoten, Prüfungsaufsicht oder Manipulationssicherheit. Keine neuen realen Stoffdaten, log(p)-h-Berechnungen, Anlagendiagnosen oder Auslegungswerkzeuge. Keine Cloud-Synchronisation, kein Offline-Modus, noch kein Export/Import. Höhere Prüfungsniveaus schließen Grundlagen ein; unbestückte Fachgebiete können noch keine Prüfung liefern. Die kleine Aufgabenbank ersetzt keine vollständige Meisterprüfungsvorbereitung.

Die Empfehlung ist eine feste, transparente Regel, kein KI-Modell und kein psychometrischer Kompetenznachweis. Karten sind Selbsteinschätzung; unbeantwortete Prüfungsaufgaben sind kein Beweis einer Wissenslücke.

## Fachliche Prüfung

Alle acht Rechenbeispiele sind durch eigene, unabhängig vorgegebene Referenzwerte und Grenz-/Einheitentests abgesichert. Wärmekapazität, Gleichstromleistung und COP-Grundbeziehungen wurden mit dem offiziellen OpenStax-Quellarchiv abgeglichen. Die direkte Website war gesperrt; die konkreten GitHub-Fundstellen wurden tatsächlich gelesen und mit Commit-ID registriert. Keine Fachbuchpassagen oder Abbildungen wurden übernommen.

Das bedeutet keine unabhängige Freigabe durch eine Fachperson. Insbesondere die kältetechnischen Messvoraussetzungen zu Überhitzung/Unterkühlung bleiben entsprechend markiert. Zahlen sind didaktische Vorgaben, keine realen Stofftabellen oder Herstellergrenzen. Einzelheiten: [SOURCES.md](SOURCES.md).

## Nachweise und Nutzung

Lokal bestanden: **125 Funktions-/Oberflächentests und 70 Browserprüfungen**, Typprüfung, Produktionsbuild und Workflow-Syntaxprüfung. Die automatisierten Prüfungen decken vorhandene Funktionen und neue Aufgaben, Toleranzen, Empfehlungen, v2→v3-Migration, Prüfungsauswahl, Abgabe, Ablauf und Wiederherstellung ab. Die konkreten Ergebnisse des finalen Commits stehen im Pull Request. Browserprojekte prüfen Smartphone 320/390 px, Tablet 820/1180 px und Desktop 1440 px mit Chromium; ein physisches iPad/Safari ist weiterhin separat zu prüfen.

Übernahme und Testanleitung: [NEXT_STEPS.md](NEXT_STEPS.md). Empfehlungen für 0.4: [ROADMAP.md](ROADMAP.md).
