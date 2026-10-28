# Fachqualität und technische Prüfung · Version 0.7

Stand 28.10.2026. Aktuelle Prüfresultate und CI-Link: RELEASE_V07; Wiederaufnahme: NEXT_STEPS. Historische 0.6-Ergebnisse bleiben in RELEASE_V06 nachvollziehbar.

## Nachweise sind getrennt

876 Inventareinträge: bestehende Inhalte, Niveaus, Fragen/Karten, Formeln/Zahlenfälle, Begriffe/Ziele, Trainer/Aussagenbelege sowie 69 einfache Modul-/Niveaufassungen, drei einfache Artikel, zwölf einfache Begriffe und 27 Laborfälle. 76 Aussagenbelege unterscheiden Quellenabgleich, eigene mathematische Ableitung, unabhängigen Zahlenreferenztest und offene menschliche Fachabnahme. `npm run docs:review` erzeugt REVIEW_REGISTER, `npm run docs:audit` den tatsächlichen Fachgebietsstand.

Für keinen Inhalt liegt eine unabhängige menschliche Gesamtfreigabe vor. Kein erfundener Prüfer, Rechts-/Norminhalt, Stoff-/Herstellerwert oder realer Apple-Gerätetest. BIPM/PTB und die angefragten Forschungsseiten waren nicht einsehbar (HTTP 403); die bereits tatsächlich gelesenen offiziellen OpenStax-Archive werden mit ihrem begrenzten Umfang weiterverwendet. Eigene Umstellungen und Vorzeichenkonventionen sind ausdrücklich keine neuen direkten externen Einzelbelege.

## Technisch abgesichert

- Alle 105 Zahlenaufgaben besitzen feste getrennte SI-Referenzen; exakte ID-Mengenprüfung verhindert fehlende neue Referenzen. Alle 26 Laborvarianten besitzen ebenfalls unabhängige feste SI-Sollwerte und gültige Formel-/Lernverknüpfungen.
- Einheiten, Zeitfaktoren, quadrierte Flächenfaktoren, absolute Temperatur vs. Differenz, W/VA/var-Trennung; keine stillen Druckbezugsänderungen.
- Nullnenner, ungültige/nicht endliche Eingaben, unzulässige Vorzeichen, Geometrie/Plausibilität, sehr große/kleine Werte, Unterlauf, Rundung und Toleranz. Ein begrenzter Parser ersetzt keine symbolische Algebra.
- Vorhandene numerische Sinusintegration, Leistungs-/Geometrie-/Schichtinvarianten, Leiter-/Strangbeziehungen, Definitionsbereiche und Originalproben bleiben erhalten.
- Gemeinsame Bewertung unabhängig von der Sprache; 23 einfache Kernfassungen mit gemeinsamen Beispielen/Herleitungen. Eindeutiger Originaltext-Fallback statt fehlender Übersetzungen.
- Hilfegrad, eigener Rechenweg, Ausdruck/Einheit, Schrittposition, Trainer, Lernbrücke und Labor über Neuladen/Backup; korrekte Zuordnung unterstützter statt unabhängiger Erfolge.
- Historische unveränderte Exporte aus 0.4, 0.5 und 0.6; Karten/Termine, Lernstände, offene und abgeschlossene Prüfungssnapshots, alter Lernbrückenentwurf. Neue beschädigte Felder blockieren Import, vorhandener Journal-/Mehrtab-Speicherschutz bleibt aktiv.
- Browserregression: Navigation, Rundentest, alte/neue Rechner, Artikel, Akademie, Zeitprüfung, Backup/Import/Mehrtab, Trainer/Fälle, Sprache, Werkstatt, fünf Laborbereiche, Kurve und Lernbrücke. Tastatur, 200 % Schrift, schmale Ansicht und Formelsatz ohne Seitenüberstand.

## Tatsächliche lokale Ergebnisse

Frische Installation `npm ci --cache /tmp/kaeltemeister-npm-cache`, TypeScript, **409 Tests in 31 Dateien**, Produktionsbuild und **185 Chromium-Prüfungen (37 Abläufe × fünf Ansichtsgrößen)** erfolgreich. Größen: 320×740, 390×844, 820×1180, 1180×820, 1440×1050. Workflow-Lint mit actionlint und `git diff --check` erfolgreich. Der Inhaltschunk für Sprachfassungen reduziert den Hauptchunk auf rund 451 kB; kein höheres Warnlimit und keine entfernte Prüfung.

Während der Entwicklung fanden die vollständigen Browserläufe echte Regressionen: WebKit überstand bei 200 % Schrift um 1 px; mobile Navigation hatte fünf Spalten für sieben Punkte; langer neuer Statistiktext verbreiterte die Seite und beeinträchtigte Touch-Treffer. Legenden/Flex-Minimalbreiten, sieben mobile Spalten und umbruchfähige Statistik-Karten wurden korrigiert. Kein globales Verstecken des Seitenüberlaufs und keine abgeschalteten Tests. Die frühere fehlgeschlagene Prüfung bleibt in der Git-Historie/Actions sichtbar.

Der vollständige [GitHub-Lauf 40725723803](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40725723803) auf Funktionsstand `f744aa2` ist **Success**: Installation, Typprüfung, 409 Unit-/Integrationstests, Build und **296/296 Browserprüfungen (185 Chromium + 111 WebKit)** erfolgreich. Alle drei WebKit-Konfigurationen für iPhone/iPad hoch/quer sind enthalten. Keine fehlgeschlagenen oder übersprungenen Browserprüfungen in diesem Lauf. Der lokale WebKit-Download war blockiert; WebKit-Erfolg stammt aus der tatsächlich gelaufenen CI. Danach wurden nur Dokumentation und der erläuternde Backup-Hinweis aktualisiert; der abschließende Dokumentationscommit wird ebenfalls von CI geprüft.

## Offene Prüfungen

Echte Apple-Hardware, reales Safari/VoiceOver, Bildschirmtastatur, iPad-Datei-/Hintergrundverhalten, vollständiges WCAG-Audit und qualifizierte unabhängige Fachprüfung sind offen. Emuliertes WebKit ist kein echter Gerätetest. Lehrmodelle sind keine Auslegungs-, Norm- oder Arbeitsfreigabe. Exportierte JSON-Dateien enthalten die eigenen Lerndaten; lokal aufbewahren.

CI prüft Branch-Pushes/PRs. Pages erhält Installation, Typprüfung, Tests, Build und Chromium/WebKit und veröffentlicht ausschließlich main mit offiziellen Pages-Actions. Kein automatischer Merge, keine Branchlöschung, keine Umgehung roter Qualitätsprüfungen.

Die Laboransicht wurde zusätzlich in emulierten 1180×820, 390×844 und 320×740 visuell geprüft: passende Spalten-/Stapelung, Formelsatz, Ergebnis/Kurve und keine Seitenverbreiterung. Keine physische Apple-Hardware.
