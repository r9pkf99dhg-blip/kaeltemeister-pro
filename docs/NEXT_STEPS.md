# Wiederaufnahme · Version 0.5

Basis: main `163b9b7`, Version 0.4. Entwicklungsbranch `feat/foundations-academy-v05`. Kein automatischer Merge.

## Erledigt

- Etappe A: Architektur, Roadmap, Lern-/Aufgabenmodelle und Speichersystem analysiert.
- 184 vorhandene Tests, TypeScript-Prüfung und Produktionsbuild erfolgreich.
- Zwischenzeitlicher Ausfall der Cloud-Umgebung vor dem ersten Commit; danach unveränderten Branch überprüft.

## Als Nächstes

1. Etappe B abgeschlossen: KaTeX/mhchem-Komponenten, 19 Registerformeln, 24 Musterlösungen, Syntax-/Sicherheits-/Regressionstests. Siehe FORMULA_RENDERING.md.
2. Etappe C abgeschlossen: acht vollständige Mathematiklektionen, 21 Zahlenaufgaben, elf Umstellungsziele mit begründeten Schritten, Quellen und vorhandener Fortschrittsspeicherung. 222 Tests sowie fünf neue Kernkurs-Browserprüfungen erfolgreich. Siehe MATHEMATICS_CURRICULUM.md.
3. Etappe D abgeschlossen: vier Physik-Kernmodule, zwölf Zahlenaufgaben, 242 Funktionstests und zehn Kernkurs-Browserprüfungen erfolgreich. Etappe E: drei Chemie-Kernmodule mit sechs Aufgaben; vor Commit Gesamttests/Build und Browserabläufe prüfen.
4. Etappen F/G: Lehrpläne, Kompetenzverknüpfungen und Vorbereitung der intelligenten Lernbrücke.
5. Etappe H: Backup-Kompatibilität, Browserprüfungen einschließlich WebKit soweit möglich, Dokumentation und PR.

Details: IMPLEMENTATION_0_5.md. Jede abgeschlossene Etappe mit Typprüfung, Tests und Build absichern, dokumentieren, committen und auf GitHub pushen. Verbleibende Oberstufen- und Fachthemen als Planung kennzeichnen. Keine unfertigen Attrappen veröffentlichen.

## Wiederaufnahme nach Unterbrechung

`git status` und letzte Commits prüfen; Änderungen erhalten. Den vorhandenen Branch weiterverwenden. Abhängigkeiten bei Bedarf mit `npm ci --cache /tmp/kaeltemeister-npm-cache` installieren. Typprüfung/Tests/Build ausführen und die nächste offene Etappe beginnen. Keine Browserdaten löschen, alte IDs nicht umdeuten. Bei erneutem Umgebungsfehler keine erfolgreichen Commits/Pushes behaupten.

## Daten und iPad

Vor eigenen Tests JSON-Sicherung erstellen und in Dateien aufbewahren. Import nur nach Vorschau/Bestätigung; andere Tabs schließen. Bestehende v1/v2/v3-Lernstände und alte Sicherungen müssen lesbar bleiben. Veröffentlichung erst nach freigegebenem PR-Merge und erfolgreichem main-Pages-Lauf. Echte Geräteprüfung nach APPLE_TEST_PLAN; WebKit ersetzt kein echtes iPad.
