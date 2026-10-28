# Version 0.8 · Wiederaufnahme und geprüfte Etappen

## Ausgangspunkt und Schutzregeln

main `908993d` enthält 0.7 vollständig über PR #9 (`be809aa` ist Vorfahr). Baseline vom 28.10.2026: 410 Tests/31 Dateien, Typprüfung und Build erfolgreich. Neuer freigegebener Arbeitsbranch `feat/refrigeration-learning-v08`; main nicht direkt ändern, kein automatischer Merge, kein Force-Push, keine Branchlöschung. Vor Übernahme Lerndaten sichern. Originale 0.4-/0.5-/0.6-Fixtures bleiben erhalten; echte 0.7-Referenz ergänzen.

Der hochgeladene 0.8-Auftrag endet mitten in Abschnitt 14.5. Rückfrage nach weiteren Anforderungen ist gestellt; bis zu einer Ergänzung wird der vollständig sichtbare Auftrag umgesetzt. Keine späteren unbekannten Anforderungen als erfüllt ausgeben.

## Plan mit eigenständig prüfbaren Etappen

1. **Abgeschlossen:** main/0.7 geprüft, Architektur/Labor/Werkstatt/Grader/Fortschritt/Backup gelesen, Baseline geprüft; Forschung-/Datenzugriff untersucht, diesen Wiederaufnahmepunkt sichern.
2. CoolProp 7.2.0, HEOS::R134a, MIT und offizielles Quellarchiv `98b3523d5daa98454618d381d2ae53f7471d216b`: reproduzierbarer begrenzter Fallkatalog, reale Sättigungskurven/ausgewählte Isolinien, explizites IIR-Referenzniveau, Herkunft/Einheiten/Modell-/Gültigkeitsgrenzen. Keine freie browserseitige Zustandsberechnung, keine Stoffwertinterpolation/-extrapolation, kein Pflichtbackend und keine Stoffeinsatzempfehlung. Generatorprüfung gegen feste Quellanker, Invarianten/Flash-Rückrechnung; unabhängige externe Stoffwert-/Fachfreigabe offen halten.
3. Gemeinsamer SI-Kreislaufkern, geprüfte Bilanz-/COP-Aufgaben, fachliche Begriffe/Lektionen/Sprachpaare und Verknüpfungen. Bestehende IDs/Engine weiterverwenden.
4. Interaktiver Kreislauf und echtes log-p-h aus den erzeugten Daten: Komponenten/Zustände/Energie, absolute logarithmische Druckachse, Zoom/Verschieben/Touch/Tastatur, Zustandstabelle/Textalternative, Prozessauswahl, Vorhersage vor Änderung. Begrenzte Katalogauswahl klar benennen.
5. Missionen und beobachtbare Übungsnachweise aus demselben Kompetenz-/Aufgabenkatalog; gestufte Hilfen, unabhängige Anwendung/Transfer und zeitlich bestätigte Wiederholung. Keine bloßen Öffnungs-/Zeitabzeichen, kein unbegrenztes XP-Farmen, keine erzwungenen Serien oder Inhaltssperren. Gamification reduzier-/abschaltbar.
6. Flexible frei gewählte Sitzungen/Zeitorientierung, tatsächliche Ergebniszusammenfassung, optionale Pause, Fortsetzen und persönliche Empfehlungen über bestehende Fälligkeiten/Fehler/Voraussetzungen. Neue optionale Metadaten im bisherigen Fortschritts-/Backupvertrag validieren; Altstände nicht als unbekannte Selbstständigkeit umdeuten.
7. Alle sinnvollen Unit-/Integration-/Inhalts-/Backupprüfungen, numerischen Referenzen, vollständige Chromium-Regression, tatsächliche WebKit-CI, Typprüfung/Build, Pages-Konfiguration, Dokumentation/Roadmap/PR. Keine behaupteten echten Apple-Gerätetests oder menschliche Fachfreigabe. Regelmäßig normal committen/pushen.

## Tatsächlicher Quellenzugriff

Die sieben im Auftrag benannten Forschungsseiten/DOIs, Europe PMC/PMC, Crossref/OpenAlex sowie coolprop.org lieferten HTTP 403. Keine angeblich gelesenen Volltexte, keine Effektstärken oder Dopamin-Prozentwerte erfinden. Forschungszuordnung mit getrennten erwarteten Lern-/Motivations-/Engagement-/Behaltenswirkungen und klarer eingeschränkter Evidenzprüfung erstellen. Keine frisch verifizierte wissenschaftliche Wirksamkeit der App behaupten.

CoolProp ist über sein offizielles Git-Archiv erreichbar. Lizenz, HighLevelAPI (Zustandspaare, Sättigungsmehrdeutigkeit, SI/Referenzzustände), Plotting und R134a-EOS-Metadaten tatsächlich gelesen. Pythonpaket 7.2.0 für Offline-Erzeugung in `/tmp/km-v08-python` installiert; kein Python für Appnutzer nötig. EOS: Tillner-Roth/Baehr 1994, DOI 10.1063/1.555958, bibliographischer Eintrag gelesen, Originalarbeit noch nicht eingesehen. Bibliotheks-/Numerikprüfung ist keine unabhängige Messdatenvalidierung.

## Wiederaufnahme

`git status`, `git log -10 --oneline`, Remote main/Feature abgleichen. `npm ci --cache /tmp/kaeltemeister-npm-cache`, `npm run typecheck`, `npm test`, `npm run build`; lokal `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e:chromium`. Python-Generator optional: gepinnte Anforderungen aus scripts installieren und Daten reproduzieren. Nach jeder abgeschlossenen Etappe Ergebnis/Fehler/offene Punkte hier aktualisieren, Commit und normaler Push.

Vorheriger vollständiger Abschlussbericht: RELEASE_V07. Noch keine 0.8-Funktion als fertig kennzeichnen, bevor sie implementiert/geprüft ist.
