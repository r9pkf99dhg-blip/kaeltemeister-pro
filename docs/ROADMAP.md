# ROADMAP · Version 0.4 und Gesamtplattform

## Gesamtvision

| Hauptmodul | Stand 0.4 | Nächster sinnvoller Anschluss |
| --- | --- | --- |
| Lernakademie | 10 Module, 3 Niveaus, 24 Zahlenaufgaben, adaptive Wiederholung, Karten, Übungsprüfung | Externe Fachabnahme, größerer niveaugestufter Aufgabenpool |
| Fachbibliothek | Artikel, Glossar, gemeinsame Quellen/Formeln, Prüfregister | Konsistente fachübergreifende Suche |
| Professionelle Berechnungen | Wärmeleistungsrechner + gemeinsamer SI-Kern für Lernaufgaben | Elektrorechner mit geprüften zusätzlichen Randbedingungen |
| log-p-h-Diagramme | Nicht implementiert | Belastbare Zustandsmodelle, Stoffwerte und Nutzungsrechte |
| Kältemittel-/Stoffwerte | Nicht implementiert | Herkunft, Referenzzustände, Unsicherheit und Aktualisierung |
| Komponenten-/Bauteile | Nicht implementiert | Geprüfte Herstellerdaten und Versionsbezug |
| Fehlersuche/Diagnose | Anschluss über Fach-/Formel-IDs vorbereitet | Geprüfter Fall mit mehreren Hypothesen und Messunsicherheit |
| Planung/Auslegung | Nicht implementiert | Validierte Systemgrenzen, keine direkte Übernahme fiktiver Lernmodelle |
| Wartung/Inbetriebnahme | Geplant | Qualifizierte Sicherheits-/Fachprüfung vor Arbeitsinhalten |
| Technische Dokumentation | Geplant | Lokale Projekte mit denselben Fach-, Formel- und Quellen-IDs |

Keine vorzeitigen Attrappen dieser zukünftigen Module. Keine kostenpflichtigen Dienste für die lokale Kernfunktion.

## Versionshistorie

0.2 brachte Fachgebietsstruktur und erste Lernmodule. 0.3 brachte adaptive Lernleistung, Aufgaben-Engine, zeitbegrenzte Übungsprüfung, persönliches Dashboard und konservative v3-Migration. Die Dokumente VERSION_0_2 und VERSION_0_3 bleiben historische Nachweise.

## Version 0.4 · umgesetzter technischer Umfang

- Versioniertes Backup, Dateidownload, validierter Import, Vorschau, ausdrückliche Bestätigung und Rücknahmejournal.
- Unveränderte v1/v2/v3-Speicherschlüssel; zusätzliche Sicherung beschädigter v1-Originale vor automatischem Überschreiben.
- Erkennung veralteter Tabs, Neuladen statt stiller weiterer Speicherung. Keine vollständige Mehrtab-Konfliktauflösung.
- Einheitliches fachliches Prüfregister samt bearbeitbarem Bericht; keine behauptete menschliche Freigabe.
- Neue Quellenabgleiche für physikalische Elektro-Grundbeziehungen.
- Fünf nutzbare Elektro-Grundlagenmodule, 15 Fragen, 10 Karten, 16 neue Zahlenvarianten; alte Funktionen bleiben erhalten.
- SI-Kern erweitert, Zahlenfälle unabhängig getestet, WebKit-Konfiguration/CI ergänzt, manueller Apple-Testplan vorhanden. Tatsächliche Browserergebnisse und lokale Downloadgrenzen stehen im Versionsbericht.

## Version 0.5 · priorisiert

### P0 · Abnahme und Gerätevertrauen

1. Qualifizierte unabhängige Fachprüfung des vollständigen Registers: insbesondere Messvoraussetzungen, Elektro-Praxisinterpretation und Sicherheitsformulierungen. Freigabe pro Inhalt/Revision mit Belegen festhalten.
2. Echte iPad-/iPhone-Safari-Prüfung nach Testplan; gefundene Fokus-/Dateien-/Hintergrundprobleme zuerst beheben.
3. Backup-Verfahren unter echten Safari-Speicherquoten prüfen. Optional eine geschützte lokale Rettungsfunktion für beschädigte Rohbestände und sichere IndexedDB-Transaktionen planen.

### P1 · Lernqualität

- Wechselstrom als nächster vollständig ausgearbeiteter Abschnitt, danach Leistungsfaktor/Drehstrom mit geprüften Beispielen. Alle elf Folgethemen sind in ELECTRICAL_LEARNING_PATH dokumentiert.
- Mehr Varianten je Niveau, echte Meistertransferfragen und transparentere Prüfungsabdeckung.
- Gleitendes Leistungsfenster evaluieren, damit alte Fehler die Lernempfehlung nicht unbegrenzt prägen; Verlauf dafür versioniert erweitern.
- Fortsetzen mit letztem Niveau/Abschnitt als optionale gespeicherte Einstellung.

### P2 · Größere Plattform

- Professioneller Elektrorechner über bestehenden Kern, einschließlich Modellgrenzen und Eingabeführung.
- Ein lokaler technischer Projekt-/Diagnosefall mit geprüften Messbedingungen.
- Erst danach Stoffdaten/log-p-h mit geklärten Rechten und Validierung.
- Offline/PWA erst mit getesteter Update-/Cache-Strategie.
- Gerätesynchronisation optional und freiwillig; Ereignis-/Reset-/Konfliktvertrag vor Cloudanbindung, kein Konto für lokale Funktionen erzwingen.

## Abnahme jedes Pakets

Stabile IDs, belegte Quellen/Modellgrenzen, unabhängige Referenzrechnungen, Datenmigration und Rücknahme, Typprüfung, Funktions-/Browsertests, transparenter fachlicher Prüfstatus. Tatsächliche Veröffentlichung erst nach PR-Merge und erfolgreichem main-Pages-Lauf.
