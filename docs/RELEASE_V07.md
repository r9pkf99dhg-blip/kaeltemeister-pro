# Version 0.7 · Techniklabor und Übungswerkstatt

Ausgangspunkt: main `8a1ba77`, Version 0.6 über PR #8 vollständig integriert. Entwicklungsbranch: `feat/interactive-technical-lab-v07`. Kein automatischer Merge. Stand 28.10.2026; Prüf- und Veröffentlichungsstatus unten.

## 1. Tatsächlich fertig

Die bestehende App bleibt nutzbar: Navigation, Akademie, Dashboard, Artikel, Rundentest, alter Wärmeleistungsrechner, Karten, Fälle, selbst erstellte Übungsprüfung, Sicherung und lokaler Fortschritt. Neu: Sprachpräferenz/temporäre Lektionssprache, aktive Übungswerkstatt mit Rechenblatt, fünf Laborbereiche und nachvollziehbarer Modellrechnung, interaktive Anschauung und freiwillige Lernbrücke 3.0.

Gesamt: 45 Module, 140 Modulfragen, 90 Karten, 83 Formeln, 105 Zahlenaufgaben, 38 Begriffe und 29 Kompetenzen. Werkstatt bietet 255 Einträge aus diesem gemeinsamen Bestand, keine 255 neu entwickelten Rechenmodelle. Alle fachlichen Freigaben bleiben offen.

## 2–3. Sprache und tatsächliche Abdeckung

**Einfach erklärt | Fachsprache** oberhalb des Inhalts stellt die persönliche Präferenz ein und sichert sie lokal/im Backup. **Darstellung dieser Lektion** gilt nur vorübergehend. Schwierigkeit und Bewertung sind davon unabhängig; Formeln, Beispiele, Modellgrenzen und Quellen bleiben gemeinsam. Das Umschalten setzt die Lektion nicht zurück.

**23 Kernmodule** besitzen drei kuratierte einfache Erklärstufen und den ursprünglichen Fachpfad. Gemeinsame Herleitungen/Beispiele bleiben vollständig zugänglich; nicht jede gemeinsame Beispielzeile wurde separat umgeschrieben. Acht Mathematik-, acht Elektro-, zwei Physik-, drei Thermo- und zwei Geometrie-/Rohrmodule; exakte IDs in LANGUAGE_LEVELS. Bei den übrigen 22 Modulen wird die ursprüngliche Darstellung deutlich benannt. Drei Artikel und zwölf Glossarbegriffe haben zusätzlich einfache Texte. Keine leeren oder künstlich als fertig etikettierten Übersetzungen.

## 4–5. Aufgaben und eigenes Rechenblatt

Acht Arten: Auswahl, Zahlenrechnung, Formelwahl, kuratierte Formelumstellung, Einheitenumrechnung, Fehler finden/korrigieren, Mehrschrittaufgabe und fachliche Entscheidung. Geführtes Lernen, selbstständiges Üben und Link zum vorhandenen Prüfungsmodus. Freie technische Begründungen werden selbst anhand der Kriterien geprüft; kein vorgetäuschtes Langtext-/CAS-Grading.

Rechenblatt: Gegeben, Gesucht, Formel, Umstellung, Einheitenumrechnung, Einsetzen, Plausibilität/Begründung. Maximal 2000 Zeichen je Feld; sichere TeX-Vorschau als Darstellung, keine Bewertung. Ergebnisfeld unterstützt begrenzte Arithmetik/Brüche, Dezimalkomma und wissenschaftliche Schreibweise, Einheit separat. Zahlen-/Einheitenfeedback kommt aus demselben Grader. Ohne Hilfe, mit Hinweis und nach Musterlösung bearbeitete richtige Antworten bleiben unterscheidbar; bereits gesehene Lösungen zählen nicht als selbstständig.

## 6–7. Fünf Rechnerbereiche und Referenzfälle

| Bereich | Umfang |
| --- | --- |
| Einheiten | Gemeinsames SI-Register, absolute Temperatur und Differenz getrennt, Druckbezug unverändert |
| Wärmeleistung | Q̇, ṁ, ΔT, cp |
| Elektro | U/I/R, drei DC-Leistungsformen, Sinus S/P/Q, symmetrische Dreiphasenleistung, Stern-/Dreieckgrößen |
| Rohrgeometrie | Kreis-/Ringfläche, Innenvolumen, Mantel, geschlossener Vollzylinder |
| Wärmeübertragung | Ebene Schichtleistung, Rth, zwei Serienschichten, U mit vorgegebenen Übergängen |

26 Fachvarianten plus allgemeiner Einheitenumrechner. Unabhängige SI-Referenz je Variante. Unter anderem:

- 0,5 kg/s × 4,18 kJ/(kg·K) × 5 K = **10,45 kW**, sensibel/konstantes cp/kein Phasenwechsel.
- √3 × 400 V × 10 A × 0,8 ≈ **5,54256 kW**, symmetrisches geeignetes Sinusmodell mit Leiter-/Effektivgrößen.
- π × (0,022 m)²/4 × 10 m ≈ **3,80133 L**, idealisiertes Innenvolumen.
- 0,04 W/(m·K) × 2 m² × 20 K / 0,1 m = **16 W**, stationäre eindimensionale ebene Leitung.

Weitere feste Sollwerte, Fehlerfälle und Grenzen: CALCULATOR_VALIDATION. Die Parameter sind ausdrücklich Aufgabenannahmen, keine gemessenen Stoffdaten. Wärmekurve/Regler, geometrischer Querschnitt, Sinusleistungsdreieck und schematischer Wärmepfad haben Textalternativen. Keine behauptete allgemeine Anlagen-, Rohr- oder Elektroauslegung.

## 8–9. Gemeinsame Akademie und Lernbrücke

Labor öffnet passende Grundlage, eigene Werkstattrechnung mit leerer Antwort und Transferfall. Passende Lektionen öffnen umgekehrt die richtige Laborvariante. Aufgaben, Grader, SI-Funktionen, Formeln und Kompetenzen sind gemeinsam; Laborergebnisse werden nicht als Lernleistung verbucht.

Lernbrücke jetzt auch für Auswahl-/Formel-/Entscheidungsaufgaben. Freiwillige einfache/fachliche Erklärung, Grundlagenlektion/Selbsttest, überspringen oder selbst erneut versuchen. Rückkehr erhält Antwort, Einheit, Rechenblatt und Schritt. Neue begrenzte Muster zu Celsius/Kelvin, Differenzoffset und Flächenvorsilbe; bisherige Muster und kontrolliertes Fehlerschrittfeedback bleiben erhalten. Kein beliebiger Freitext wird sicher diagnostiziert. Keine Lernbrücke während einer Prüfung.

## 10–11. Speicherung und Kompatibilität

Bestehende Lerndaten bleiben erhalten. Neu optional: Sprachpräferenz, ein letzter Laborzustand mit Eingabeeinheiten, ein letzter Werkstattentwurf mit Rechenblatt/Hilfe/Schritt/Antworten/offener Brücke, Werkstatttrainer-Position sowie Hilfenachweise korrekter Antworten. Alte Erfolge ohne Hilfenachweis bleiben unbekannt, kein nachträglich erfundener Kompetenzstand.

Schema **3**, Backupformat **1**, Appversion im Export **0.7.0**. Echte unveränderte Exportfixtures von **0.4/0.5/0.6** werden einschließlich Karten, Wiederholungen, alten/laufenden Prüfungen und 0.6-Brückenentwurf unverändert importiert/reexportiert. Beschädigte neue Felder werden vor Import abgewiesen; Journal/Mehrtab-Schutz bleiben aktiv. Neue Sicherungen sind nicht als in alten Appversionen lesbar zugesagt.

## 12–15. Tests, Grenzen, Qualität und behobene Probleme

Frische Installation, TypeScript, **410 Unit-/Integrationstests in 31 Dateien**, Produktionsbuild und **185 Chromium-Prüfungen** auf fünf Größen bestanden. actionlint, Inhalts-/Prüfregistergenerierung und Diff-Prüfung erfolgreich. Der vollständige [GitHub-Lauf 40725723803](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40725723803) für `f744aa2` ist **Success** mit **296/296 Browserprüfungen (185 Chromium + 111 WebKit)**. Installation, Typprüfung, Unit-/Integrationstests und Build sind ebenfalls grün. Auch Dokumentationsstand `070b93e` wurde im [Lauf 40726984245](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40726984245) vollständig erfolgreich geprüft. Diese Läufe enthielten 409 Unit-/Integrationstests. Eine anschließende begrenzte Diagrammkorrektur bei extrem großen endlichen Eingaben besitzt nun einen zusätzlichen Regressionstest: insgesamt 410 Tests und zwölf gezielte Browserprüfungen lokal erfolgreich; der korrigierte Funktionsstand **`772cb82`** ist im [GitHub-Lauf 40728217824](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40728217824) ebenfalls vollständig **Success: 410 Tests, Typprüfung/Build und 296/296 Browserprüfungen**. Der abschließende Dokumentationsvermerk verändert keinen Funktionscode; vor Merge immer die aktuellen Branch-/PR-Checks kontrollieren.

Behoben: zu breite Schriftlegende/Statistikkarten, mobile Navigation mit sieben statt fünf Spalten, verlorene Trainer-Wiederaufnahme, unzutreffende unabhängige Erfolgszuordnung nach bereits gesehener Lösung, nicht erkannte numerische Unterläufe und überlaufende Diagramm-Zwischenprodukte bei extremen Modellwerten. Sprachinhalte haben eigenen Build-Chunk; kein erhöhtes Warnlimit. Frühere rote Browserläufe wurden untersucht, keine Tests deaktiviert.

Nicht physisch geprüft: iPad/iPhone-Safari, VoiceOver, reale Bildschirmtastatur, Hintergrund-/Dateien-/Speicherquotenverhalten. WebKit in CI ist keine echte Apple-Hardware. BIPM/PTB, Studien-/aktuelle deutsche Berufsbildungs-/Normquellen blieben wegen HTTP 403 teilweise nicht zugänglich; vorhandene OpenStax-Fundstellen sind mit tatsächlichem Prüfumfang dokumentiert. Eigene mathematische Ableitung und Zahlenreferenz sind keine unabhängige menschliche Freigabe. **Alle Inhalte und beide Sprachfassungen benötigen weiterhin qualifizierte menschliche Fachprüfung.**

## 16. Bewusst offen

Übersetzung aller 45 Module und sämtlicher vertiefender Textstellen; freies CAS, automatische Fachbewertung eigener Begründungen, unbegrenzte Rechenblattablage, Realstoff-/Herstellerdaten/log-p-h, professionelle Auslegung, Motor-/Schutzbemessung, ungesicherte Rechts-/Norminhalte, Konten/Synchronisation/PWA. Alte unbewertete Fallpositionen bleiben sitzungsbezogen. Keine zusätzliche Schein-App und kein Pflichtabo.

## 17. Auf dem iPad testen

1. Zuerst in der vorhandenen App **Datensicherung herunterladen** und unter **Dateien** speichern. Ein Branch-Push ändert die Live-Seite noch nicht.
2. PR erstellen/öffnen, alle grünen Checks prüfen. Nur nach deiner bewussten Freigabe **Merge pull request → Confirm merge**; Branch nicht löschen. Technisch wird hier kein Merge ausgeführt.
3. Unter **Actions → Deploy to GitHub Pages** grünen main-Lauf abwarten. Alternativ **Run workflow → main → Run workflow**. Quelle bleibt **Settings → Pages → GitHub Actions**. Eine eingerichtete GitHub-Environment-Freigabe gegebenenfalls bestätigen.
4. Safari: https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/ öffnen, neu laden und **Version 0.7** prüfen. Bei alter Anzeige Tab schließen/neu öffnen; Browserdaten für dieses Update nicht löschen.
5. **Mit Mathematik beginnen**, **Einfach erklärt**, dann **Fachsprache**. In einer Bruchlektion temporäre Sprache ändern; Formeln und gelesene Stände bleiben erhalten.
6. **Techniklabor** → sensible Wärmeleistung → **Laborwert berechnen**: 10,45 kW. Massenstromregler auf 1 kg/s: 20,9 kW im gleichen Modell. Drehstrom: etwa 5,54256 kW; Rohrvolumen etwa 3,80133 L; Wärmeleitung 16 W. Rechenweg/Grenzen lesen.
7. **Rechnung selbst üben**: Antwort ist leer, Musterlösung zunächst verborgen. Eigenes Rechenblatt füllen; eigenen Zahlenwert/Ausdruck und Einheit eingeben. Absichtlich 10,45 W statt kW bei der passenden Wärmeaufgabe prüfen: getrenntes Feedback/Lernbrücke lesen. Einfach erklären lassen, zurückkehren und Einheit korrigieren.
8. Seite neu laden → **Werkstattentwurf fortsetzen**. Notizen, Hilfe und Einheit kontrollieren. Trainerformel auswählen/neuladen und Position fortsetzen. Nach eigenem Versuch Musterlösung öffnen und Unterstützungskennzeichnung beachten.
9. Hoch-/Querformat, große Schrift und iPad-Tastatur prüfen. Neue Sicherung herunterladen. Import einer alten Sicherung nur nach Sicherung des aktuellen Stands, Vorschau lesen und Ersetzen bewusst bestätigen.

## 18. Empfehlung für 0.8

Zuerst unabhängige Fachabnahme/echte Apple-Tests. Dann kleiner validierter Kältemitteldatenvertrag mit Quelle/Lizenz/Revision, Zustand, Einheiten und Bezugsniveau; darauf begrenzte log-p-h-/Kreislauflernfälle mit unabhängigen Referenzen. Keine realen Werte erfinden. ROADMAP ordnet 0.9 Diagnose und 1.0 Gesamtplattform ein.

## 19. Pull Request und Veröffentlichungsstatus

Titel: **Version 0.7: Interaktives Techniklabor, Übungswerkstatt und verständliche Fachsprache**.

Branchvergleich: https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/compare/main...feat/interactive-technical-lab-v07?expand=1

Vorbereitete Beschreibung: PULL_REQUEST_0_7.md. Die automatische PR-Erstellung über `gh pr create --body-file docs/PULL_REQUEST_0_7.md` wurde am 28.10.2026 durch HTTP 403 beim GitHub-API-Zugriff blockiert. Git-HTTPS-Push funktioniert; keine weitere autorisierte PR-Methode verfügbar. Die öffentliche PR-Suche zeigte keinen vorhandenen PR für diesen Branch. Deshalb existiert kein bestätigter PR-Link. Der Remote-Funktionsstand ist gesichert; Vergleich gegen unverändertes main `8a1ba77` und `git merge-tree` ergab keine Konflikte. Vollständige CI siehe oben. Manuelle Erstellung: Vergleichslink in Safari öffnen, **Create pull request**, Titel/Beschreibung einsetzen, noch einmal **Create pull request**. main als Ziel und den bestehenden Entwicklungsbranch als Quelle beibehalten. Nicht automatisch mergen.
