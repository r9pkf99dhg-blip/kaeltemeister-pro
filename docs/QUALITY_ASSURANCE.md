# Fachqualität und technische Prüfung · 0.6

## Getrennte Nachweise

Das Gesamtregister inventarisiert 736 Einträge einschließlich alter Artikel, aller Modulniveaus, Formeln, Fragen/Karten, Zahlenfälle, Begriffe/Ziele, Trainer und neuer Aussagenbelege. `npm run docs:review` erzeugt REVIEW_REGISTER; `npm run docs:audit` den tatsächlichen Fachgebietsstand. Aussagenbelege sind in neuen Lektionen aufklappbar.

`ClaimEvidence` unterscheidet Entwurf, Recherche, konkreten Quellenabgleich, unabhängige Rechenreferenz, redaktionelle Prüfung, benötigte menschliche Prüfung, tatsächliche Freigabe und Überarbeitungsbedarf. Diese Nachweise sind keine pauschale Rangfolge: Ein Rechentest ersetzt keinen Quellenabgleich, ein Quellenlink keine Fachfreigabe. Das vorhandene gröbere Gesamtregister bleibt kompatibel und zeigt den begrenzten Prüfumfang.

Für keinen Inhalt liegt eine unabhängige menschliche Fachfreigabe vor. Es werden keine Prüfer, aktuellen Rechts-/Norminhalte, Stoff-/Herstellerwerte oder Messungen erfunden. Eigene Ableitungen (u. a. Stern/Dreieck, Schichten-U-Wert, offene Enthalpiebilanzen) sind ausdrücklich von direkt gelesenen Kapitelbeziehungen getrennt. CONTENT_REVIEW und SOURCES nennen offene gezielte Abgleiche. Die angefragten Rechts-/KMK-/BIPM-/DGUV-Seiten waren durch Netzwerk-403 blockiert.

## Technischer Prüfumfang

- Alle 97 Zahlenfälle haben separate feste SI-Sollwerte. Der Test verlangt exakte Mengenübereinstimmung der Fall-IDs, damit neue Aufgaben ohne Referenz nicht unbemerkt bleiben.
- Zusätzlich: numerische Sinus-Periodenintegration für Effektivwert und Wirkleistung, 120°-Zeigerkontrolle und Leiter-/Strangäquivalenz, Geometrie-/Schichtverhältnisse, Definitionsbereiche, Nullnenner, Rundung/Toleranzen, nicht endliche Zwischenwerte.
- SI-Umrechnung einschließlich mm²/cm³/Grad/rad, H/mH, F/µF, VA/kVA, var/kvar, m³/h und L/min. W/VA/var sind als unterschiedliche Größen nicht austauschbar. Temperaturdifferenzen verwenden keinen Celsiusoffset.
- Inhalt/ID-/Quellenverweise und azyklische Voraussetzungen; Kompetenzzuordnung und keine vorgetäuschte menschliche Freigabe.
- Kuratierter Trainer mit verlorenen Lösungen, konkretem Fehlerschrittfeedback, Hilfen und Originalprobe. Kein allgemeines CAS.
- Lernbrücke: erkannte Zahlenmuster, unbekannte Ursachen, bestehende Eingaben/Einheiten, Rückkehrfokus, Neuladen und Backup des letzten Entwurfs.
- Thermodynamikprüfungen haben auf Grundlagen-, Fachkraft- und Meisterniveau jeweils Zahlen- und Auswahlfragen; Einstiegsaufgaben sind passend zugeordnet.
- Vier Fallsequenzen mit echter fachlicher Schlussentscheidung; Zahlen- und Auswahlversuche nutzen gleichen Fortschritt. Auswahlentscheidungen sind auch im Modulquiz konsistent gespeichert.
- Historische echte Exporte aus unverändertem 0.4- und 0.5-Code mit Karten, Intervallen, Antworten und Prüfungssnapshots; geschützter Import/Journal und alle bisherigen Fehlertests bleiben bestehen.
- KaTeX für alle Registerformeln, Variablen, Lerntexte, Fragen/Antworten und Musterlösungen, einschließlich Fehlerfallbacks. Lokale Fonts, keine CDN-Abhängigkeit.
- Browser prüfen Navigation, Altfortschritt, Quiz, Rechner, Sicherung, Prüfung, neue Pfade/Diagramme/Fälle, Lernbrücken-Neuladen und Nachweise mit Tastatur/großer Schrift. Fünf Chromium- und drei WebKit-Konfigurationen. Echte Apple-Hardware und vollständiges WCAG-Audit bleiben offen.

## Testresultate

Die abschließenden Ergebnisse und CI-Links werden im Release-/Wiederaufnahmeprotokoll nach tatsächlichem Abschluss festgehalten. Ein anfänglicher Gesamtbrowserlauf fand zwei veraltete Erwartungen (Wechselstrom angeblich geplant, fünf statt zehn Elektromodule). Die Tests wurden auf die vorhandenen neuen Inhalte angepasst; keine Qualitätsprüfung abgeschaltet. Ein neuer Belegtest traf zwei IDs mit demselben Präfix; er wurde auf den konkreten Formelbeleg präzisiert. Fachliche oder technische Erfolge werden erst nach dem jeweiligen grünen Lauf behauptet.

CI und Pages-Workflow erhalten unverändert ihre Qualitätsprüfungen. Pages deployt ausschließlich main nach erfolgreich geprüften Build/Browserjobs. `actionlint`, TypeScript, Unit-/Integrationstests, Produktionsbuild und Browserläufe gehören zum Abschluss. Keine automatische Zusammenführung oder Branchlöschung.

### Lokaler Abschlussstand

323 Unit-/Integrationstests in 24 Dateien, TypeScript und Build erfolgreich. `npm ci --cache /tmp/kaeltemeister-npm-cache` reproduzierbar erfolgreich; Workflow-Lint und Diff-Prüfung ebenfalls. Vollständiger letzter Chromium-Regressionslauf vor der abschließenden CSS-Umbruchkorrektur: 155 erfolgreich. Danach 24 gezielte neue Akademie-/Formelszenarien auf kleinem Smartphone, Smartphone und Tablet erfolgreich. Die neueste vollständige CI prüft nochmals alle 155 Chromium- und 93 WebKit-Szenarien.

GitHub-Lauf 40655646060 meldete zuvor 239 erfolgreiche und eine fehlgeschlagene WebKit-iPhone-Prüfung: horizontaler Überlauf der neuen Ansicht bei großer Schrift. CSS-Umbruch/Flex-Minimalgrößen und die natürliche Umbruchfähigkeit von Belegen/Variablendefinitionen wurden korrigiert; kein globales Ausblenden oder Abschalten der Überlaufprüfung. Der Browsertest liefert im Fehlerfall zusätzlich die tatsächlich überstehenden Elemente. Der korrigierte Stand `05f53da` wurde anschließend vollständig erfolgreich geprüft: [GitHub-Lauf 40656718539](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40656718539), 248 Browserprüfungen ohne verbleibenden Fehler (155 Chromium + 93 WebKit). Die Testprüfung wurde beibehalten.

Screenshots der normierten Sinusdarstellung wurden in 820×1180 und 390×844 visuell geprüft. Das sind emulierte Ansichten im System-Chromium, keine echte Apple-Hardware.

### Bestätigte vollständige CI

Lauf [40656718539](https://github.com/r9pkf99dhg-blip/kaeltemeister-pro/actions/runs/40656718539) auf `05f53da`: Success, 323 Unit-/Integrationstests, TypeScript, Installation, Produktionsbuild und alle 248 Browserprüfungen erfolgreich. Keine verbliebene fehlgeschlagene Browserprüfung in diesem Lauf. Historische rote Läufe bleiben sichtbar und wurden nicht gelöscht oder umgangen. Der abschließende Dokumentationsstand verwendet denselben Funktionscode.
