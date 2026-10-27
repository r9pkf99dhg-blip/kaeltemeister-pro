# Implementierungsplan 0.4

Ausgangspunkt: `origin/main` = `2c846d1` (Merge PR #5, Version 0.3). Eigener Branch `feat/reliable-academy-v04`.

1. Bestandsprüfung: bestehende 125 Funktions- und 70 Chromium-Browsertests, Rechenkern, Speicherleser, Pages-Workflows und Dokumentation prüfen.
2. Sicherung: versionierter JSON-Vertrag mit vollständigem Akademie-/Altbestand, Größen-/Strukturprüfung, Vorschau und explizitem Ersetzen. Schreibjournal mit Rücknahme und Wiederanlauf; Speicherzugriff als austauschbare Schnittstelle. Bestehende v1/v2/v3-Schlüssel erhalten.
3. Qualitätsregister: alle aktuellen Inhalte über stabile IDs erfassen; automatische Prüfung von Quellenabgleich und menschlicher Freigabe unterscheiden. Bearbeitbaren Bericht mit Quellen, Rechnungen und offenen Fragen bereitstellen.
4. Apple: WebKit-Projekte ergänzen, Desktop-/Touch-/Tastatur-/Dateiszenarien prüfen. Tatsächliche Ausführbarkeit und echte Gerätetests getrennt dokumentieren.
5. Elektro: fünf zusammenhängende Module mit drei Niveaus, Lernzielen, Fragen, Karten und mehreren Zahlenvarianten; restliche elf Themen priorisieren. Gemeinsamen SI-Kern und Register erweitern, keine duplizierten Rechner.
6. Regression, Build, Typprüfung, Dokumentation, Pull Request. Automatischen Pages-Start auf main erhalten; tatsächliche Veröffentlichung erst nach Merge.

## Erkannte Risiken und bereits Vorhandenes

- V3 schützt unbekannte Daten und migriert v2 konservativ. Ein Dateiimport fehlt vollständig.
- Zwei aktive Speicherschlüssel brauchen ein Wiederherstellungsjournal; localStorage bietet keine Transaktionen. Bei fehlgeschlagener Rücknahme muss Schreiben gesperrt bleiben.
- Alte Modul- und Recheninhalte haben keine unabhängige menschliche Fachfreigabe. Automatische Tests ändern das nicht.
- Prüfungs-Snapshots müssen auch mit historischen IDs lesbar bleiben.
- Mehrere Browser-Tabs können derzeit Änderungen überschreiben; Wiederherstellung muss andere Tabs zum Neuladen auffordern bzw. Schreiben sperren.
- Chromium-Ansichtsgrößen ersetzen weder WebKit noch echte Safari-/iPadOS-Tests.
- Grundlagennotizen und zwei Elektrofragen sind vorhanden, jedoch kein vollständiger Elektro-Lernpfad.
- GitHub-API antwortete zu Beginn mit HTTP 403; Git-Fetch funktioniert. PR-Erstellung wird nach Fertigstellung erneut versucht.
