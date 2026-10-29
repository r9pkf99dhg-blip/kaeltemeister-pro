# Version 0.8: Interaktiver Kältekreislauf, Mastery-System und motivierende Lernakademie

Version 0.7 bietet getrennte Lernmodule, Werkstatt und Techniklabor. Version 0.8 verbindet diese mit nachvollziehbaren Fachmissionen, optionaler Motivation und einem interaktiven Kältekreislauf. Wer beispielsweise die falsche Enthalpiedifferenz für q₀ eingibt, erhält eine vorsichtige Lernbrückenempfehlung und kann mit erhaltenen Notizen weiterarbeiten.

## Änderungen

- Optionales Mastery mit sechs Lernbereichen, fünf transparenten Lernmeilensteinen, freiwilligen Zielen/Sitzungen, Fokus und abschaltbaren Motivationsfunktionen. Tatsächliche unabhängige, unterstützte, wiederholte und Transferleistungen bleiben getrennt; kein XP-/Streak-Farming.
- Neun referenzierte Missionen, darunter vollständiger sechsteiliger Kreisprozesspfad, vier neue gemeinsame Fachmodule, 15 feste Zahlenreferenzaufgaben und verknüpfte Fachbegriffe. Lesen/Selbstprüfung ersetzen keine objektiv bewertete Leistung.
- Qualitatives Kreislaufschema mit vier Bauteilen/Zuständen und beiden Sprachebenen. Separates Modell B mit acht tatsächlich offline berechneten R134a-Fällen, log-p-h, echten Sättigungs-/Hilfslinien, Tabellenalternative, Zoom/Pan/Tastatur und nachvollziehbarer SI-Bilanz/Fluid-COP.
- Gemeinsamer Berechnungskern, Aufgaben-/Formel-/Quellen-/Kompetenz-IDs; sichere optionale Mastery-/Kreislauffelder im bestehenden v3-Fortschritt/Backupformat 1. Alte 0.4–0.7-Sicherungen vollständig unverändert geprüft; historische Fixtures nicht ersetzt.
- Smartphone-Navigations-/Breitenfehler bei neuer Kreislaufüberschrift und 200%-Schrift behoben. Keine erzwungenen Testklicks oder übersprungenen Prüfungen. Diagrammerkundung überschreibt keinen Rechenblattentwurf.
- Pflichtdokumente, Roadmap, 25-Punkte-Bericht, iPad-Anleitung und 994 Einträge im fachlichen Prüfregister aktualisiert.

## Validierung

- TypeScript und Produktionsbuild erfolgreich.
- 485 Unit-/Integrationstests in 41 Dateien erfolgreich, einschließlich aller 120 Zahlenaufgaben und neuer unabhängiger Algebra-/SI-/Diagrammprüfungen.
- Lokal 225/225 Chromium-Browserfälle erfolgreich: 45 Abläufe auf fünf Ansichtsgrößen, einschließlich komplett durchgespieltem sechsteiligem Missionspfad, Notizen/Unterbrechung, Backup, Navigation und großer Schrift.
- actionlint, Dokumentgeneratoren und Diff-Prüfung erfolgreich.
- GitHub prüft denselben Stand zusätzlich mit drei WebKit-Projekten. Tatsächlich beobachtete Ergebnisse und Commitbezug: `docs/QA_V08.md`; erforderliche PR-/HEAD-Checks vor Merge vollständig abwarten. Lokaler WebKit-Download war HTTP 403 gesperrt.

## Fachliche Grenzen

CoolProp 7.2.0 / HEOS / reines R134a / IIR, gepinnte Version/Gitrevision, MIT-Lizenz und reproduzierbares JSON/SHA256. Bibliotheks-, Phasen-, Ancillary-/Clapeyron-, Bilanz- und Zeichenkonsistenz sind geprüft. **Keine unabhängige experimentelle EOS-Validierung oder menschliche Fachfreigabe.** Kein Anlagenplanungswerkzeug und keine R134a-Verwendungsempfehlung. Fluidarbeit ist keine vollständige elektrische Anlagenleistung.

Freie WASM-Stoffdatenberechnung (Modell C), weitere Stoffe/Gemische, reale Komponentenkennfelder und automatische fachliche Freitextbewertung bleiben bewusst offen. Originalstudien zu Lernforschung waren gesperrt; keine erfundenen Studienergebnisse oder Wirksamkeitsversprechen. Keine physischen Apple-/VoiceOver-Tests durchgeführt.

## Übernahme

Basis main `908993d` enthält 0.7 über PR #9. Keine direkten Änderungen auf main, kein Force-Push, keine Branchlöschung, kein automatischer Merge. Vor Übernahme Lerndaten sichern. Nach ausdrücklicher Freigabe und grünen Checks mergen; bestehender offizieller Pages-Workflow prüft und veröffentlicht den Push auf main mit Basis `/kaeltemeister-pro/`. Öffentliche Website zeigt den Branch vor dem Merge nicht automatisch.

Ausführlicher Bericht: `docs/RELEASE_V08.md`. Quellen/Validierung: `docs/CYCLE_VALIDATION.md`, `docs/REFRIGERANT_DATA.md`, `docs/PROPERTY_BACKEND.md`. Wiederaufnahme: `docs/NEXT_STEPS.md`.
