# ROADMAP · Version 0.3 und Gesamtplattform

## Gesamtvision bleibt erhalten

| Hauptmodul                      | Aktueller Stand                                                                 | Späterer Anschluss                                                    |
| ------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Lernakademie                    | Fünf Module, drei Niveaus, adaptives Lernen, Aufgaben, Karten und Übungsprüfung | Weitere geprüfte Lernpfade und belastbare Inhaltsfreigabe             |
| Fachbibliothek                  | Alte Artikel, Fachbegriffe und begrenzte neue Fachnotizen                       | Gemeinsame Suche und bessere Verknüpfung                              |
| Technische Berechnungen         | Sensibler Rechner + gemeinsamer SI-Kern für acht Aufgabentypen                  | Weitere Rechner über denselben Kern, keine doppelte Logik             |
| log(p)-h-Diagramme/Simulation   | Noch nicht implementiert                                                        | Verifizierte Stoff-/Zustandsmodelle erforderlich                      |
| Kältemittel-/Bauteildatenbank   | Noch nicht implementiert                                                        | Rechte, Qualität, Aktualisierung und Referenzzustände klären          |
| Fehlersuche/Diagnose            | Erweiterungsbeziehungen vorhanden                                               | Geführte Messung mit Unsicherheit, keine pauschale Füllmengendiagnose |
| Anlagenplanung/Auslegung        | Noch nicht implementiert                                                        | Geprüfte Rechenmodelle und eindeutig dokumentierte Randbedingungen    |
| Technische Projektdokumentation | Noch nicht implementiert                                                        | Projektfälle referenzieren dieselben Formeln, Aufgaben und Quellen    |

Keine vorzeitigen Attrappen der späteren Module. Neue Daten sollen dieselben IDs, Einheiten und Quellenregister nutzen.

## Version 0.3 · abgeschlossener technischer Umfang

- V0.2-Integration in main und Pages-Erfolg vor Beginn nachgewiesen.
- Transparente adaptive Zähler, Themenlücken, Empfehlungen mit Begründung und leistungsabhängige Abstände.
- Acht ausführliche Zahlenaufgaben und ein wiederverwendbarer Aufgaben-/Bewertungskern.
- Gemischte, selbst erstellte Übungsprüfungen mit Auswahl, Zeitlimit, Wiederherstellung und Analyse.
- Persönliches Lern-Dashboard und begrenzter Prüfungsverlauf.
- Verlustarme Migration v2→v3 mit erhaltenem Originalbestand; keine erfundene ältere Versuchshistorie.
- Teilweiser echter Quellenabgleich plus unabhängige Zahlen-/Einheitentests, keine behauptete externe Fachfreigabe.

## Version 0.4 · Empfehlung in Prioritätsreihenfolge

### P0 · Vertrauen und Datensicherung

1. Fachperson prüft die bestehenden Module und Aufgaben, insbesondere kältetechnische Messvoraussetzungen. Fundstellen und Umfang der Freigabe pro Inhalt festhalten.
2. Export/Import mit Vorschau, strikter Validierung, unveränderter Rückfallkopie und Wiederherstellung testen. Ungültige Dateien dürfen nichts überschreiben.
3. Safari auf echtem iPad/iPhone prüfen: Bildschirmtastatur, größere Schrift, Fokus, Timer, Hintergrundwechsel und lokale Speicherung. Chromium-Emulation genügt dafür nicht.
4. Mehrtab-Konflikte und Reset-Generation lösen, bevor Gerätesynchronisation geplant wird.

### P1 · Lernqualität statt Masse

- Einen vollständigen weiteren Lernpfad, etwa sensible/latente Wärme oder elektrische Grundgrößen, auf allen drei Niveaus ausarbeiten und fachlich prüfen.
- Mehr unabhängige Aufgabenvarianten pro Fachgebiet/Niveau, damit höhere Prüfungsstufen nicht überwiegend Grundlagen wiederholen.
- Lernempfehlungen mit einem kleinen gleitenden Fenster evaluieren: Alte Fehler sollen nicht unbegrenzt stark nachwirken. Verfahren und Gründe weiterhin sichtbar halten.
- Individuelle Aufgabenaktivierung aus Empfehlungen weiter ausbauen, etwa eine gezielte Folge aus Fragen und Rechnungen.

### P2 · Erst danach größere Plattformmodule

Lokaler Übungs-Projektfall, geführtes Messprotokoll, dann gegebenenfalls geprüfte Diagramm-/Stoffdatenintegration. Offline-/PWA-Funktion erst mit konsistenter Update-/Cache-Strategie. Optionale Synchronisation darf kein Konto für die lokale Kernfunktion erzwingen.

## Abnahme jedes Pakets

Dokumentierte Modellgrenzen und Quellen; stabile IDs; unabhängige Referenzbeispiele; Migration/Datenschutz; Typprüfung, Funktions- und Browsertests; grüner PR; Kontrolle des tatsächlichen Deployments erst nach dem Merge. Keine offiziellen Prüfungsaufgaben oder garantierten Gerätespezifikationen ohne entsprechende Grundlage behaupten.
