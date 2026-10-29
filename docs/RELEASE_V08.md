# Version 0.8 · Abschlussbericht

Entwicklungsstand 29.10.2026. Basis: main `908993d`, vollständige Version 0.7 über PR #9. Branch `feat/refrigeration-mastery-v08`; kein automatischer Merge. Dieser Bericht beschreibt den Entwicklungsbranch. Die öffentliche Website erhält ihn erst nach deiner Freigabe, dem Merge und erfolgreichem Pages-Deployment.

## 1. Welche neuen Lernfunktionen gibt es?

Optionales KälteMeister Mastery, neun Fachmissionen, fünf transparente Lernmeilensteine, freiwillige Ziele/Lerneinheiten, Fokus/Pausen und Fortsetzen. Vier neue Fachmodule, 15 neue Zahlenaufgaben und 14 referenzierte Auswahl-/Reihenfolgefragen; bestehende Funktionen bleiben erhalten. Insgesamt 49 Module, 152 Modulfragen, 98 Karten, 88 Formeln, 120 Zahlenaufgaben, 49 Begriffe und 33 Kompetenzen; 27 Kernmodule mit drei einfachen Erklärstufen. 20 kältetechnische Begriffe sind mit Einheit, Beispiel, Fehler und Fachmodul verknüpft, davon neun vorhandene Begriffe erweitert.

## 2. Welche Lernmethoden werden wie umgesetzt?

Aktiver Abruf vor Lösungen, gestufte Hilfen, Beispiel → geführte Aufgabe → selbstständige Variante → Transfer, vorhandene verteilte Wiederholung, gezielte Mischung eingeführter Aufgaben und eigene Begründung mit Selbstkontrollkriterien. [LEARNING_SCIENCE](LEARNING_SCIENCE.md) ordnet Entwurfsziel, erwarteten Nutzen und Grenzen zu. Die angefragten Originalstudien waren HTTP 403 gesperrt: keine erfundenen Volltextbefunde, Effektstärken oder gemessene Wirksamkeit dieser App. Motivation, Engagement, Lernleistung und langfristiges Behalten werden nicht gleichgesetzt.

## 3. Wie funktionieren Fachmissionen?

Stabile IDs/Revisionen, Fachgebiet, Niveau, Voraussetzungen, Ziele, Umfang und referenzierte bestehende Aufgaben. Kurz-, Standard- und Vertiefungsmissionen sind frei wählbar; kein Inhalt wird gesperrt. Schritte sind direkt anwählbar. Lesemarkierungen und freie Selbstprüfung genügen nicht für fachlichen Abschluss: bewertete Aufgaben und erforderliche unabhängige Erfolge müssen tatsächlich vorliegen. Neue unabhängige Abrufversuche entfernen aktuelle Hilfen, behalten jedoch frühere Hilfen in der Historie. Sie sind kein zeitversetzter Nachweis, solange keine 24 Stunden vergangen sind.

## 4. Welche Kompetenzabzeichen existieren?

SI-Einheiten angewendet; Wärmeleistung selbstständig angewendet; Kreisbilanz mit Transfer angewendet; Leistungsarten im Sinusmodell geübt; Zeitversetzt erneut bestätigt. Jeweils mehrere verschiedene benannte aktuelle Aufgaben ohne angebotene Hilfe, beim letzten zusätzlich jede Aufgabe mindestens 24 Stunden später richtig. Bedingungen und Aufgabenlinks sind einsehbar. Ein Abzeichen erscheint nur einmal; kein XP-Farming. Geänderte Aufgabenrevisionen benötigen neue Bestätigung. Keine offiziellen Zertifikate oder Meisterprüfungsnachweise.

## 5. Wie wird echter Lernfortschritt gemessen?

Bestehende Performance, Hilfestatus, aktuelle Aufgabenrevision und vorhandener Kompetenzgraph bleiben maßgeblich. Kennengelernt, geübt, selbstständig angewendet und Transfer werden getrennt. Unbekannt ist keine Schwäche. Nur neue ausdrücklich selbstständige richtige Versuche erhalten zusätzliche Zeitmetadaten. Alte unklassifizierte Versuche werden nicht rückwirkend umgedeutet. Freitext ist ohne Fachbewertung nur Selbstprüfung.

## 6. Was ist deaktivierbar?

Motivation Aktiviert/Reduziert/Deaktiviert, Standard Reduziert. Deaktiviert verbirgt Abzeichen, alle Inhalte und Hilfen bleiben zugänglich. Fokus ist freiwillig, Bewegung pausierbar; Betriebssystem-Einstellung für reduzierte Bewegung wird berücksichtigt. Keine täglichen Pflichtserien, Strafen, Ranglisten, Lootboxen oder medizinischen/Dopaminversprechen.

## 7. Wie wird unterbrochenes Lernen fortgesetzt?

Eine Missionsposition, ein bestehender Werkstattentwurf mit eigenen Notizen/Antworten/Hilfe und ein Kreislaufentwurf bleiben im selben Browserprofil erhalten. Dashboard bietet eine konkrete Fortsetzung. Sitzungen können pausieren und später beendet werden. Neue Aufgabenauswahl ersetzt weiterhin den einzelnen Werkstattentwurf bewusst; mehrere benannte Arbeitsblätter sind noch nicht vorhanden. Nur Diagramm erkunden überschreibt keinen Werkstattentwurf.

## 8. Was zeigt das Dashboard?

Konkrete nächste Mission mit Begründung bzw. Fortsetzen, letzte dokumentierte Verbesserung, bestehende Fälligkeiten/Schwächen/Module/Prüfungen. Mastery ergänzt sechs Fachbereiche und beobachtbare Stufen. Sitzungsabschluss nennt verschiedene unabhängig oder mit Hilfe gelöste Aufgaben, verbesserte frühere Fehler, neu erfüllte Missionen und zu Beginn fällige bearbeitete Fragen. Kein Erfolg durch Bildschirmzeit oder dreimal dieselbe Frage.

## 9. Wie funktioniert der Kreislauf?

Vier auswählbare Bauteile und Zustände, Wärme-/Arbeits-/Druckpfade, beide Sprachebenen, Schrittfolge und Textalternativen. A qualitativ ohne erfundene Stoffwerte; B fest berechnete Referenzfälle; C freie Browser-Stoffwertberechnung ausdrücklich noch nicht verfügbar. Details: [REFRIGERATION_CYCLE](REFRIGERATION_CYCLE.md).

## 10. Welche Zustandsgrößen gibt es?

Referenzzustände enthalten p absolut, T, h, s, Dichte und Dampfgehalt nur im Zweiphasengebiet. Anzeige p in bar abs., T in °C, h in kJ/kg; intern SI. 1 Verdichtereintritt, 2 Verdichteraustritt, 3 Drosseleintritt, 4 Verdampfereintritt. IIR-Bezug einheitlich. Ungültige/unbekannte Fälle werden nicht still gezeichnet.

## 11. Welche Bilanzen sind umgesetzt?

q₀=h₁−h₄, w=h₂−h₁, qₖ=h₂−h₃, h₄=h₃ und qₖ=q₀+w. Leistung jeweils Massenstrom × spezifische Energie. Fluid-COP=q₀/w, η_is=(h₂s−h₁)/(h₂−h₁). Gemeinsamer SI-Kern für Aufgaben und Ansicht. Keine elektrische Anlagen-COP ohne Motor-/Nebenaggregatedaten. Modellannahmen und Systemgrenzen ausdrücklich sichtbar.

## 12. Welche Bibliothek wurde geprüft?

CoolProp 7.2.0, HEOS::R134a, MIT, gepinnte Gitrevision. Offizielle Dokumentation, Lizenz und Modellmetadaten im Git-Archiv gelesen. EOS Tillner-Roth/Baehr 1994; Originalpublikation nicht eingesehen. Kein REFPROP und keine bezahlte API.

## 13. Welche Integration wurde gewählt?

Acht offline mit gepinntem CoolProp erzeugte Fälle, versioniertes JSON und SHA256. Browser benötigt kein Python, keinen Server und keinen Stoffdaten-Download. Typisierte Backend-Schnittstelle gibt nur bekannte Fälle/Zustände frei. Offizielle JS/WASM-Dateien waren beim tatsächlichen Download HTTP 403 gesperrt; kein eigener reproduzierbarer Browser-Build freigegeben. [PROPERTY_BACKEND](PROPERTY_BACKEND.md) dokumentiert den begrenzten Nachweis statt eine Liveberechnung vorzutäuschen.

## 14. Welche Kältemittel sind unterstützt?

Ausschließlich reines R134a in genau acht vorhandenen Kombinationen. Kein frei kombinierbares Kennfeld, keine Mischungen oder Extrapolation. Aufnahme als Lernbeispiel ist keine Empfehlung für reale neue Anlagen.

## 15. Wie funktioniert log-p-h?

Echte Sättigungsstützpunkte, vier Zustände/Prozesse, drei Qualitätslinien und fünf segmentierte Isothermen; h linear, p absolut logarithmisch. Zoom, Pointer-/Touch-Pan, Pfeiltasten/Pos1 und Tabellen-/Textalternativen. Sättigungsgrenzen enden unterkritisch, keine künstliche Glockenschließung. η_is=0,75 zeigt nur gekennzeichnete Endpunktverbindung. Zeichnungsinterpolation erzeugt keine neuen Stoffwerte. [LOG_PH_DIAGRAM](LOG_PH_DIAGRAM.md).

## 16. Was wurde unabhängig geprüft?

Unabhängige Algebra-/SI-Handfälle, separat festgelegte Aufgabenreferenzen, getrennt ausgewertete Ancillary-Koeffizienten, zentrale Clapeyron-Differenzen, Bilanz-/Referenzverschiebung und Achsenskalierung. Rückrechnung über andere Zustandspaare nutzt dieselbe EOS und ist deshalb nur Bibliothekskonsistenz. **Keine unabhängigen experimentellen Referenzdaten zur vollständigen R134a-EOS-Validierung vorhanden.** Die Aussage ist ausdrücklich begrenzt; siehe [CYCLE_VALIDATION](CYCLE_VALIDATION.md).

## 17. Welche technischen Grenzen bestehen?

Kein frei rechnender Browser-Stoffdatenkern, kein kritischer Bereich/Gemischmodell, keine reale Auslegung. Druckverluste, Wärmeübertrager-/Komponentenkennfelder, reale Elektromotorverluste und Regelung fehlen. Keine Cloud-Synchronisation/PWA. Browseruhr und Speicher sind manipulierbar. Browseremulation ist kein echtes Apple-Gerät. Menschliche Fachfreigabe offen.

## 18. Welche neuen Aufgaben und Missionen gibt es?

Sechs zusammenhängende Kreismissionen: Komponenten, Zustände, Enthalpie, Bilanzrechnung, Interpretation, Transfer. Dazu Wärme-, Elektro- und Einheitenmission. 15 Zahlenaufgaben zu q₀/w/qₖ/COP/Leistung über Basis/Kühlraum/Transfer, drei Diagrammzuordnungen, Reihenfolge, Fehleranalysen, Massenstromvorhersagen, Fallvergleich und Fluid-vs.-Elektro-Transfer. Lernbrücke 4.0 erkennt passende Zahlenmuster konservativ und empfiehlt eine Grundlage, ohne den Denkweg zu diagnostizieren.

## 19. Bleiben Backups kompatibel?

Fortschrittsschema 3, Backupformat 1 und Schlüssel bleiben erhalten. Neue Mastery-/Kreislauffelder optional und validiert. Echte historische Exportdateien 0.4–0.7 werden vollständig unverändert importiert und wieder exportiert. Die 0.7-Datei stammt aus unverändertem main `908993d`; ältere Dateien wurden nicht ersetzt. Journal, Mehrtab-Schutz, Vorschau/Bestätigung und historische Prüfungssnapshots bleiben bestehen. Neue Backups sind nicht als rückwärtslesbar in alten Apps versprochen.

## 20. Welche Tests sind erfolgreich?

Funktionsstand `5b8abd1`: 485 Unit-/Integrationstests in 41 Dateien, TypeScript und Produktionsbuild erfolgreich; lokal **225/225 Chromium-Fälle**. GitHub-[Lauf 40834345173](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40834345173): **360/360 Browserfälle**, einschließlich **135 WebKit-Fällen**, erfolgreich. Zwölf gezielte neue Kreislauffälle zusätzlich erfolgreich. Gefundene Smartphone-Navigations-/Breitenfehler behoben und als Regression abgesichert. actionlint, Dokumentgeneratoren und Diff-Prüfung ebenfalls erfolgreich. Ausführlicher Commitbezug: [QA_V08](QA_V08.md). Der finale Dokumentationspush startet erneut denselben vollständigen Workflow; dessen Stand ist zusätzlich auf GitHub zu prüfen.

## 21. Welche Tests konnten nicht ausgeführt werden?

Lokaler WebKit-Download erneut am Proxy gescheitert; alle 135 WebKit-Fälle wurden stattdessen in GitHub Actions tatsächlich erfolgreich ausgeführt. Keine physischen iPad-/iPhone-/VoiceOver-/Speicherquota-/Hintergrundtests, keine vollständige experimentelle Stoffmodellvalidierung oder eigene Wirksamkeitsstudie. C-Backend-Konvergenztests entfallen, weil dieses Backend nicht freigegeben ist.

## 22. Welche Inhalte benötigen menschliche Fachprüfung?

Alle neuen Fachtexte, Sprachebenen, Aufgabeninterpretationen, Modell-/Systemgrenzen und Referenzstoffdaten sowie die vorhandenen offenen Inhalte. Das Prüfregister inventarisiert 994 Einträge, darunter Fälle, Diagramm und beide Kreislauf-Sprachfassungen. „Automatisch geprüft“ oder „quellenbasiert“ bedeutet keine unabhängige qualifizierte Abnahme. Originalstudien und blockierte aktuelle SI-/Fachquellen müssen bei Zugang nachgelesen werden.

## 23. Wie teste ich auf dem iPad?

Vorher unten in der App **Sicherung erstellen** und die JSON-Datei in **Dateien** aufbewahren. Nach bewusster PR-Freigabe/Merge und grünem Pages-Lauf Safari öffnen: **https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/**. Neu laden. Vor dem Merge zeigt diese Adresse weiterhin main, nicht automatisch den Entwicklungsbranch.

1. Mastery öffnen, Motivation auf Deaktiviert setzen; Inhalte bleiben erreichbar. Eine kurze Mission anfangen, Notiz eintragen und neu laden: fortsetzen.
2. Kältekreislauf öffnen, A wählen, Zustände/Bauteile auswählen und Bewegung pausieren. Einfach erklärt/Fachsprache vergleichen.
3. B wählen: Basisfall zeigt Fluid-COP etwa **4,79934**. Massenstrom von 0,05 auf 0,1 kg/s ändern, zuerst vermuten: Leistungen verdoppeln sich, Fluid-COP bleibt gleich. −1 eingeben: Fehlermeldung, letzte bestätigte Bilanz bleibt bestehen.
4. η_is=0,75 wählen: Fluid-COP etwa **3,59950**, größere Fluidarbeit, gestrichelte reine Endpunktverbindung. Diagramm vergrößern, mit Finger verschieben und zurücksetzen; Tabelle prüfen.
5. Rechenblatt: Aufgabe „Spezifischer Wärmeeintrag · Basiskreis“ mit **152,30839 kJ/kg** lösen. Einmal 31,735296 kJ/kg eingeben, passende Lernbrücke öffnen/zurück; Notizen erhalten.
6. Hoch-/Querformat, große Safari-Schrift, Navigation, alter Rechner (0,5×4,18×5 = 10,45 kW), Quiz und Sicherung erneut testen. Einen Import nur nach Kontrolle der Vorschau bestätigen.

Eine Prüfung ist ausdrücklich selbst erstellte Übungsprüfung, keine offizielle Meisterprüfung. Auffälligkeiten mit Gerät/iPadOS/Safari-Version und Schritten dokumentieren; keine echten Gerätetests vorweg behaupten.

## 24. Was ist bewusst offen?

Live-WASM/C, weitere Kältemittel/Gemische, freie Stoffdateninterpolation, experimentelle EOS-Validierung, offizielle Zertifikate, automatische fachliche Freitextbewertung, vollständiger Meisterlehrplan, reales Anlagenplanungssystem, mehrere Arbeitsblätter, Gerätesynchronisation und menschliche Freigabe. Pseudowissenschaftliche/manipulative Motivation wird nicht nachgerüstet.

## 25. Was empfehle ich für 0.9?

Zuerst qualifizierte Fachprüfung und echte Apple-Bedienungstests, dann Lücken und Sprache anhand von Lernversuchen verbessern. Danach reproduzierbarer gepinnter WASM-/Worker-Prototyp mit unabhängigen Referenzen, Laufzeit-/Speicher-/Fehlernachweis, bevor freie Eingaben oder weitere Stoffe freigeschaltet werden. Parallel einen kleinen Messwerte-/Diagnose-Lehrfall mit Einheiten, Systemgrenze, Unsicherheit und fehlenden Messungen entwickeln. Mehrere benannte Rechenblätter erst mit sicheren Speicher-/Migrationsregeln. Gemeinsame IDs/Formeln/Quellen bleiben Grundlage für Klima, Lüftung, Dämmung, Bauteile, Planung und Dokumentation.

## Pull Request, Branch und Freigabe

Die technische Umsetzung ist im bestehenden Branch `feat/refrigeration-mastery-v08` gesichert; letzte Commit-ID über dessen GitHub-Ansicht oder `git log -1` prüfen. main blieb `908993d`, alle main-Änderungen sind enthalten, keine aktuellen Merge-Konflikte. Der tatsächliche automatische PR-Versuch scheiterte an `api.github.com/graphql` mit Forbidden/HTTP 403. Kein weiterer verfügbarer autorisierter API-Zugriff gefunden; Git-Push funktioniert. Kein PR angelegt und kein PR-Link erfunden.

[Vergleich / PR auf dem iPad erstellen](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/compare/main...feat/refrigeration-mastery-v08?expand=1): **Create pull request**, Titel und Beschreibung aus [PULL_REQUEST_0_8](PULL_REQUEST_0_8.md) einsetzen, nochmals **Create pull request**. Nach grünen neuen PR-Checks und deiner ausdrücklichen Entscheidung **Merge pull request → Confirm merge**. Kein automatischer Merge und keine Branchlöschung. Unter **Actions → Deploy to GitHub Pages** den automatisch gestarteten main-Lauf abwarten, danach die in Abschnitt 23 verlinkte App in Safari neu laden.
