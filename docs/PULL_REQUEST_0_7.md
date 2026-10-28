## Ergebnis

Version 0.7 verbindet eigene technische Rechnungen mit derselben Lernakademie, denselben Formeln und dem bestehenden lokalen Fortschritt. Der Nutzer kann Sprache, Lernhilfe und selbstständiges Bearbeiten wählen und seine letzte Rechnung fortsetzen.

- **Techniklabor:** fünf Bereiche – Einheiten, sensible Wärmeleistung, Elektro, Rohrgeometrie und stationäre ebene Wärmeübertragung. Allgemeiner SI-Umrechner plus 26 deklarative Fachvarianten, Rechenweg, Modellgrenzen, Textalternativen und interaktive Wärmekurve. Grundlagen/Übung/Transfer und passende Laborvarianten sind beidseitig verknüpft.
- **Übungswerkstatt:** acht Aufgabenarten mit strukturiertem eigenem Rechenblatt, gestuften freiwilligen Hilfen, getrenntem Zahlen-/Einheitenfeedback und gesichertem letzten Entwurf. Vorhandene Aufgaben, SI-Funktionen, Grader, Prüfung und Kompetenz-IDs werden wiederverwendet.
- **Sprache:** global gespeicherte Präferenz plus temporäre Lektionsausnahme. 23 Kernmodule mit drei kuratierten einfachen Erklärstufen, drei Artikel und zwölf Begriffe; gemeinsame Formeln, Beispiele, Herleitungen, Grenzen und Quellen. Übrige Module deutlich als ursprüngliche Fassung gekennzeichnet. Sprache verändert keine Bewertung.
- **Lernbrücke 3.0:** auch Auswahl-/Formel-/Entscheidungsaufgaben, einfache/fachliche Hilfe und konservative beobachtete Antwortmuster. Eingabe, Einheit, Rechenblatt und Position bleiben erhalten. Hilfe-/Musterlösungserfolge gelten nicht als unabhängiges Lösen; alte Versuche ohne Metadaten bleiben unbekannt.
- **Rechnungssicherheit:** begrenzte Arithmetik ohne eval/CAS, SI-Einheiten/Offset-/Druckbezug getrennt, endliche Werte/Nullnenner/Modellbereiche und numerische Unterläufe geprüft. Unabhängige feste Referenzwerte für alle 105 Zahlenaufgaben und 26 Laborvarianten.
- **Datenerhalt:** Schema 3 und Backupformat 1 unverändert; optionale Sprach-/Labor-/Werkstatt-/Trainermetadaten validiert. Echte historische Exporte aus 0.4/0.5/0.6 bleiben unverändert importier-/reexportierbar; bestehender Mehrtab-/Journal-Schutz erhalten.

## Prüfung

- Frische Installation, TypeScript, **410 Unit-/Integrationstests in 31 Dateien**, Produktionsbuild erfolgreich.
- Vollständige lokale Chromium-Regression: **185/185** (37 Abläufe × fünf Bildschirmgrößen).
- Vollständige GitHub CI auf **`772cb82`: Success**, **410 Unit-/Integrationstests**, Typprüfung/Build und **296/296 Browserprüfungen (185 Chromium + 111 WebKit)**. [GitHub-Lauf 40728217824](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40728217824). Auch der abschließende reine Dokumentationsvermerk durchläuft dieselben Checks; vor Merge die aktuellen Branch-/PR-Checks prüfen.
- actionlint, `git diff --check`, Generierung des Fachprüfregisters und Fachgebietsaudit erfolgreich.
- Vier zentrale Referenzen: 10,45 kW sensible Wärme; ca. 5,54256 kW symmetrischer Drehstrom; ca. 3,80133 L Innenvolumen; 16 W ebene Wärmeleitung. Voraussetzungen und weitere Sollwerte in CALCULATOR_VALIDATION.

Browserprüfungen fanden echte Überstands-/Navigationsfehler bei schmaler Ansicht/großer Schrift. Legenden, mobile Spalten und Statistik-Karten wurden korrigiert; keine Tests abgeschaltet oder Seitenüberläufe global versteckt. Trainer-Wiederaufnahme und Hilfeklassifikation wurden ebenfalls korrigiert. Sprachinhalte haben einen eigenen Build-Chunk statt eines erhöhten Warnlimits.

## Fachqualität und Grenzen

876 Inventareinträge und 76 Aussagenbelege, keine behauptete unabhängige menschliche Fachfreigabe. Bereits tatsächlich gelesene offizielle OpenStax-Archive werden begrenzt weiterverwendet; neue Umstellungen/Vorzeichenregeln als eigene Ableitung ausgewiesen. Aktueller BIPM/PTB-/Forschungs-/Berufsbildungszugriff war teilweise HTTP 403. Keine erfundenen Normen, Stoffwerte oder Quellenabnahmen.

Keine physischen Apple-Gerätetests, vollständige WCAG-Abnahme, freie Symbolalgebra, automatische Langtextbewertung, Realstoffdaten/log-p-h, professionelle Auslegung, unbegrenzte Rechenblattablage oder Gerätesynchronisation. Geplante Fachgebiete werden nicht als fertige Kurse gezählt. Alte Fallpositionen bleiben sitzungsbezogen.

## Dokumentation und Veröffentlichung

README, ARCHITECTURE, DOMAIN_MODEL, LEARNING_SYSTEM, SOURCES, QUALITY_ASSURANCE, ROADMAP und NEXT_STEPS aktualisiert. Neue Anleitungen: TECHNICAL_LAB, EXERCISE_WORKSHOP, LANGUAGE_LEVELS, CALCULATOR_VALIDATION und vollständiger RELEASE_V07 mit iPad-Testschritten.

GitHub Pages bleibt bei `/kaeltemeister-pro/`, automatischem main-Push und manuellem `workflow_dispatch`, offiziellen Pages-Actions und erforderlichen Berechtigungen. PR veröffentlicht keine Website. Vor Merge Lerndaten sichern, grüne aktuelle Checks prüfen und ausdrücklich freigeben. Kein automatischer Merge, kein Force-Push und keine Branchlöschung.
