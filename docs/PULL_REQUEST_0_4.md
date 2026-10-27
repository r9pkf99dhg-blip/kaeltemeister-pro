# Version 0.4: Datensicherung, Fachprüfregister und Elektro-Grundlagen

Bisher fehlten eine übertragbare Lerndatensicherung und ein vollständiger Elektrotechnik-Lernpfad. Die App kann jetzt den tatsächlich gespeicherten Lernstand als versionierte JSON-Datei herunterladen und nach Validierung, Vorschau und ausdrücklicher Bestätigung wiederherstellen. Ein Schreibjournal ermöglicht Rücknahme und Wiederanlauf bei Speicherfehlern. Veraltete Tabs werden vor weiteren Schreibzugriffen gesperrt.

Fünf Elektro-Grundlagenmodule mit drei Niveaus, 15 Fragen, zehn Karten und 16 Zahlenvarianten ergänzen die bestehenden Funktionen. Gemeinsame SI-Funktionen vermeiden doppelte Rechenlogik. Ein Prüfregister mit 173 Einträgen trennt automatische Prüfung, tatsächlichen Quellenabgleich und noch offene unabhängige menschliche Fachabnahme.

## Validierung

- 184 Funktions-/Komponententests erfolgreich.
- 95 Chromium-Browsertests bei fünf Smartphone-/Tablet-/Desktopgrößen erfolgreich.
- Typprüfung, Produktionsbuild, reproduzierbare npm-ci-Installation und actionlint erfolgreich.
- Backup-Fehlerfälle: kaputte/zu große Dateien, Pflichtfelder/Typen, unbekannte Versionen, Duplikate, Schreibfehler an jedem Transaktionsschritt, Rücknahmefehler und Wiederanlauf.
- Sämtliche 24 Zahlenaufgaben gegen separat festgelegte SI-Referenzwerte geprüft.
- Bestehende v1/v2/v3-Lerndaten und historische Prüfungssnapshots bleiben lesbar. Beschädigte v1-Originale werden nicht mehr automatisch ersetzt.

## Grenzen und Veröffentlichung

WebKit-Projekte sind konfiguriert und beide Workflows installieren Chromium und WebKit. Lokaler WebKit-Download war mit HTTP 403 blockiert; **keine erfolgreiche lokale WebKit- oder echte iPad-/iPhone-Prüfung**. GitHub-Checks vor Merge abwarten. Die manuellen Geräteschritte stehen in docs/APPLE_TEST_PLAN.md.

Keine unabhängige menschliche Fachfreigabe, Konten, Cloud-Synchronisation oder Offline/PWA. Elektro-Themen 6–16 bleiben ausdrücklich geplant. Vor Import andere Tabs schließen; Konflikterkennung ist keine Mehrtab-Zusammenführung. Die Beispiele sind rechnerische Lernfälle, keine Anleitung für elektrische Arbeiten.

Pages-Basispfad, automatische Veröffentlichung bei main-Push, workflow_dispatch, Berechtigungen und offizielle Pages-Actions bleiben erhalten. PRs veröffentlichen nichts. Nach Merge den erfolgreichen main-Deploy prüfen.

Dokumentation: docs/VERSION_0_4.md, BACKUP_RESTORE.md, QUALITY_ASSURANCE.md, REVIEW_REGISTER.md, APPLE_TEST_PLAN.md, ELECTRICAL_LEARNING_PATH.md sowie aktualisierte Architektur, Lernsystem, Domainmodell, Quellen, Roadmap und Anfängeranleitung.
