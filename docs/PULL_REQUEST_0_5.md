# Version 0.5: Grundlagenakademie, echter Formelsatz und intelligente Lernbrücke

Bisher setzte die technische Akademie sichere Schulgrundlagen voraus und zeigte Brüche überwiegend als Text. Version 0.5 ergänzt acht Mathematik-, vier Physik- und drei Chemie-Kernmodule sowie lokal gerenderten mathematischen Formelsatz. Nach einer falschen Zahlenantwort kann eine begründet empfohlene vorhandene Grundlagenlektion geöffnet werden; die ursprüngliche Eingabe und Einheit bleiben für die Rückkehr erhalten.

## Umsetzung

- KaTeX/mhchem mit lokalem CSS/Fonts, vertikalen/verschachtelten Brüchen, Wurzeln, Indizes, Mehrzeilern und chemischer Formelsprache; sichere Fallbacks und trust=false.
- 19 alte Registerformeln und 24 Musterlösungen ausdrücklich migriert; keine heuristische Ersetzung gewöhnlicher Textschrägstriche. Aktuell 42 Formeldefinitionen.
- Insgesamt 25 Module, 80 Modulfragen, 50 Karten, 63 Zahlenaufgaben und 26 Fachbegriffe. Jede neue Kernlektion enthält Ziele, Begründung/Herleitung, Beispiele, Fehler, Übung/Lösung und Selbsttest.
- Elf Umstellungsziele für U=RI, P=UI, Q=mcΔT, p=F/A und ρ=m/V, mit 13 bewertbaren Schritten und Zahlenproben.
- Gemeinsamer Rechen-/SI-Kern, erlaubte negative mathematische Ergebnisse, einfache Bruchantworten und feste zusätzliche Zahlenvarianten; keine Auswertung beliebiger Formeln als Programme.
- Stabile Kompetenz-IDs, getestete azyklische Voraussetzungen, Grundlagen-Empfehlungen und einfache Lernbrücke ohne behauptete sichere Fehlerdiagnose.
- Vorhandene Funktionen und Fortschritte erhalten. Schema 3, Backupformat 1, Migration, Journal/Rollback und Pages-Konfiguration bleiben bestehen.

## Validierung

- 262 Funktions-/Komponenten-/Referenztests erfolgreich.
- 120 lokale Chromium-Browsertests bei fünf Smartphone-/Tablet-/Desktopgrößen erfolgreich.
- Reproduzierbares npm ci, TypeScript-Prüfung, Produktionsbuild, actionlint und git diff --check erfolgreich.
- Alle Modultexte auf allen Niveaus, Formeln/Musterlösungen und kuratierten Antwortnotationen gerendert; fehlerhafte Syntax und lange Formeln abgesichert.
- Alle 63 Zahlenaufgaben gegen separat festgelegte Referenzwerte geprüft; Umformungs-/SI-/Vorzeichen-/Null-/Wurzel-/Potenzgrenzen getestet.
- Echte mit dem damaligen main-Stand 0.4 erzeugte Sicherung unverändert importiert/erneut exportiert, einschließlich historischer Prüfungssnapshots ohne neue Felder. Neue negative Mathematik-Snapshots ebenfalls getestet.
- GitHub CI führt zusätzlich WebKit aus; vor Merge den neuesten Commit-Lauf und anschließend PR-Checks prüfen. Kein echter iPad-/iPhone-Gerätetest erfolgt.

## Grenzen und Dokumentation

Keine unabhängige menschliche Fachfreigabe. Quellen/Fundstellen und der begrenzte Abgleich sind im bestehenden Prüfregister mit 398 Einträgen dokumentiert. Keine Bücher/Normen vollständig kopiert, keine realen Kältemittel-/Herstellerwerte erfunden. Elektro-/Chemiebeispiele sind keine praktischen Arbeitsanweisungen.

Der vollständige Lehrplan ist strukturiert, aber Oberstufe und weitere technische Fachgebiete sind nicht vollständig implementiert. Fortgeschrittene Algebra, Geometrie, Funktionen/Analysis/Statistik, vertiefte Physik/Chemie, professionelle Rechner/Diagramme/Stoffdaten, Offline/PWA und Synchronisation bleiben ausdrücklich geplant. Neue Sicherungen mit neuen Aufgabentypen benötigen 0.5 oder später. Die Brücke bewahrt Eingaben im laufenden Training, nicht über einen Reload hinweg.

Alle technischen Etappen wurden einzeln geprüft, committet und normal gepusht. NEXT_STEPS und VERSION_0_5 dokumentieren Wiederaufnahme, Tests und offene Punkte. Architektur, Roadmap, Lernsystem, Datenmodell, Quellen, Curricula, Formelsatz, Fachgebiets-Audit, Sicherung und Apple-Testplan sind aktualisiert.

Kein automatischer Merge. Nach ausdrücklicher Freigabe und grünen PR-Checks veröffentlicht der vorhandene main-Pages-Workflow die App unter dem unveränderten Basispfad /kaeltemeister-pro/.
