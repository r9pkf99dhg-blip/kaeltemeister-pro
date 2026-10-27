# Gemeinsames Inhalts- und Fortschrittsmodell

## Status und Zweck

Dies ist der **Entwurf für die nächste Ausbaustufe**. Heute verwendet die App `Article` und `QuizQuestion` aus `src/content-types.ts`, Inhalte aus `src/content.ts` und den unveränderten localStorage-Schlüssel `kaeltemeister-pro:progress:v1`. Es gibt noch keine Quellenverwaltung, Formelregistry, Einzel-Fragenhistorie oder Datenmigration. Die bestehenden Artikel-IDs bleiben dauerhaft gültig.

Ziel ist ein gemeinsames System, in dem Artikel, Formeln, Quellen und Fragen miteinander verknüpft werden und Fortschritt nicht an Listenpositionen oder Titeltexten hängt. Vorerst statische, mit Git versionierte TypeScript-/JSON-Daten; kein CMS und keine Datenbank notwendig.

## Entitäten und Beziehungen

| Entität              | Pflichtfelder im Zielmodell                                                                                             | Bedeutung                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Fachgebiet           | `id`, `title`, `order`                                                                                                  | IDs: `kaelte`, `klima`, `lueftung`, `elektro`, `daemmung`                                                       |
| Thema                | `id`, `domainId`, `title`, `prerequisiteTopicIds`                                                                       | Lernpfad und Filter; Voraussetzungen bilden einen kreisfreien Graphen                                           |
| Gemeinsame Metadaten | `id`, `revision`, `domainId`, `topicIds`, `title`, `learningObjectives`, `sourceRefs`, `review`                         | Dauerhafte ID, positive Revisionsnummer, Fachzuordnung und Freigabestatus                                       |
| Artikel              | Metadaten, `intro`, `blocks`, `minutes`, `formulaIds`, `questionIds`, `takeaway`                                        | Blöcke als typisierte Absätze, Merksätze, Abbildungen und Beispiele; Bilder mit Alternativtext und Rechteangabe |
| Formel               | Metadaten, `expression`, `variables`, `result`, `assumptions`, `examples`, optional `calculatorId`                      | Formeltext ist Darstellung, kein ausführbarer Code; Variablen nennen Größenart, SI-Einheit und Eingabebereich   |
| Quelle               | `id`, `title`, `publisher`, `kind`, `editionOrDate`, `url?`, `accessedAt?`, `rights`, `verificationStatus`              | Herstellerunterlage, Fachbuch, Normreferenz oder andere nachvollziehbare Quelle; Ausgabe/Datum erforderlich     |
| Quellenverweis       | `sourceId`, `locator`, `supports`                                                                                       | Abschnitt/Seite/Tabellenstelle und welche Aussage/Formel sie stützt; URL allein reicht nicht                    |
| Quizfrage            | Metadaten, `prompt`, `options: {id,text}[]`, `correctOptionId`, `explanation`, `articleIds`, `formulaIds`, `difficulty` | Zunächst genau eine richtige Antwort. Mehrfachauswahl/Rechenfragen später als eigene diskriminierte Varianten   |
| Quizdefinition       | `id`, `revision`, `title`, `questionIds`, `mode`, `scoringPolicy`                                                       | Festgelegtes Set oder versionierte Auswahlregel; Lernmodus und Prüfungsmodus getrennt                           |

ID-Regeln: projektweit eindeutig, sprachunabhängig und nach Veröffentlichung unveränderlich. Beispiel für neue IDs: `klima-luftfeuchte-grundlagen`; bestehende IDs wie `kreislauf` werden nicht umbenannt. Titel können sich ändern. Entfernte IDs werden nicht neu vergeben. Umbenennungen benötigen eine explizite Alias-/Migrationsregel.

```text
Fachgebiet → Themen → Artikel ↔ Formeln
                      ↕          ↕
                    Quizfragen → Quizdefinitionen
Alle fachlichen Entitäten → Quellenverweise → Quellen
Fortschritt → stabile Artikel-, Fragen- und Quiz-IDs + jeweilige Revision
```

## Quellen und fachliche Freigabe

`review` enthält `status: draft | in-review | approved`, Prüferkennung und Prüfdatum. Nur freigegebene Inhalte gelangen in den öffentlichen Katalog. Quelle und Inhalt haben getrennte Prüfzustände: Ein korrektes Literaturzitat bestätigt noch nicht die fachliche Richtigkeit des Textes.

Normen werden mit Nummer, Ausgabe und relevanter Stelle referenziert. Keine urheberrechtlich geschützten Volltexte übernehmen. Ein kostenpflichtiges Fachbuch oder eine Norm ist kein kostenpflichtiger App-Dienst; trotzdem soll die kostenlose App verständliche eigene Erklärungen und nach Möglichkeit frei zugängliche Hersteller-/Lehrquellen anbieten. URLs auf Erreichbarkeit prüfen, fachliche Prüfung jedoch nicht mit einem HTTP-200-Test verwechseln. Erfundene Quellen und unbelegte Sollwerte sind ausgeschlossen.

## Formeln, Einheiten und Rechner

Intern rechnen dedizierte, getestete TypeScript-Funktionen in festgelegten Basiseinheiten. Eine Registry ordnet `calculatorId` einer Funktion und einem passenden Formular zu. Formeltext wird **nie** mit `eval` oder `Function` ausgeführt. Es wird kein allgemeiner Formelparser eingeführt, solange einzelne fachlich geprüfte Rechner genügen.

Für jede Variable: Symbol, Größenart, SI-Einheit, erlaubte Anzeigeeinheiten und Bereich. Einheiten haben zentrale IDs; Umrechnung und Validierung werden gemeinsam getestet. Absolute Temperatur und Temperaturdifferenz bleiben verschiedene Größen: °C → K bei einer Temperatur benötigt einen Offset; Δ°C → ΔK nicht. Volumenstrom kann erst mit passender Dichte zu Massenstrom umgerechnet werden. Enthalpie und Temperatur sind nicht austauschbar.

Beispiel Sensible Wärme: `massFlow` in kg/s, `specificHeat` in J/(kg·K), `temperatureDifference` in K, Ergebnis W. Bestehender Rechner arbeitet korrekt in kJ/(kg·K) und kW und bleibt bis zu einer getesteten Migration unverändert. Das Zielmodell darf seine sichtbaren Ergebnisse nicht verändern. Jedes Beispiel speichert Eingaben, Referenzergebnis, Einheiten und numerische Toleranz sowie Annahmen/Quelle. Rundung ausschließlich bei der Anzeige.

## Fortschritt Version 2

Geplante Hülle:

```ts
interface ProgressV2 {
  schemaVersion: 2;
  updatedAt: string; // ISO-Zeitpunkt; keine Benutzeridentität
  articles: Record<string, { readRevision: number; readAt: string | null }>;
  questionStats: Record<
    string,
    {
      revision: number;
      attempts: number;
      correct: number;
      lastAnsweredAt: string;
    }
  >;
  quizResults: Array<{
    attemptId: string;
    quizId: string;
    quizRevision: number;
    completedAt: string;
    questions: Array<{
      questionId: string;
      questionRevision: number;
      selectedOptionId: string;
      correct: boolean;
    }>;
    scorePercent: number;
  }>;
  legacySummary?: { attempts: number; best: number; last: number | null };
}
```

Bewertung erfolgt aus dem zum Rundenstart festgelegten Fragensatz und dessen Lösungsversion. Während einer Runde werden keine Fragen durch Inhaltsupdates ausgetauscht. Zufallsauswahl bei späteren Modi mit nachvollziehbarer Auswahl speichern. Richtige Antworten nicht nach sichtbarem Text oder Arrayindex referenzieren. Bestwerte nur innerhalb vergleichbarer Quizdefinitionen und Revisionen auswerten. Quiz-Ergebnisse einmal pro eindeutiger `attemptId` übernehmen; abgebrochene Runden zählen nicht als abgeschlossene Versuche.

„Gelesen“ und „beherrscht“ bleiben getrennt. Eine neue Artikelrevision kann als aktualisiert angezeigt werden, ohne den alten Leseeintrag zu löschen. Neue inhaltliche Frageversionen beginnen eine neue Lernstatistik; historische Ergebnisse bleiben historisch korrekt. Speicherumfang begrenzen, bevor lange Versuchshistorien eingeführt werden; für größere Datenmengen erst dann IndexedDB evaluieren.

## Migration und Fehlerbehandlung

1. Aktuellen v1-Wert lesen und validieren. Bei Lesefehlern oder unbekannter zukünftiger Schemaversion keine leere Struktur über das Original schreiben; verständlichen Hinweis zeigen.
2. v1-Artikel-IDs direkt übernehmen. Da v1 weder Lesedatum noch Revision speichert, Datum als unbekannt (`null`) kennzeichnen und die dokumentierte Ausgangsrevision zuordnen. Fehlende historische Werte nicht erfinden.
3. Aggregierte Quizwerte unter `legacySummary` erhalten. Aus `best` und `attempts` lassen sich keine Einzelantworten rekonstruieren; keine erfundenen Versuche anlegen.
4. V2 in einem neuen Schlüssel schreiben, zurücklesen und validieren. V1 erst nach bestätigtem Erfolg und einer vorgesehenen Rückfallfrist entfernen; ein fehlerhafter Schreibvorgang lässt v1 unverändert nutzbar.
5. Export/Import mit expliziter Bestätigung: Versionskennung, Struktur-/Referenzprüfung, Größenbegrenzung und Vorschau vor dem Ersetzen. Kein HTML oder Skript aus importierten Daten ausführen. Abbruch verändert nichts.
6. Mehrere Tabs: Änderungen über das `storage`-Ereignis erkennen; zuerst nachvollziehbare Konfliktregel festlegen. „Gelesen“ kann vereinigt werden, ein explizites Zurücksetzen darf aber nicht durch einen alten Tab rückgängig werden. Dafür Reset-Generation und konsistente Änderungsregeln testen.

Die v1-App synchronisiert derzeit weder Geräte noch parallele Tabs. Diese Grenzen sind dokumentiert und werden hier geplant, nicht stillschweigend als gelöst dargestellt.

## Verbindliche Validierungen im nächsten Schritt

- Eindeutige IDs über alle Kataloge; alle Referenzen existieren und verweisen auf den richtigen Entitätstyp.
- Kein Zyklus in Voraussetzungen; keine unabsichtlich unerreichbaren veröffentlichten Inhalte.
- Fragen mit eindeutigen Antwort-IDs und genau einer gültigen Lösung; keine leeren Erklärungen.
- Formeln mit konsistenten Einheiten und Referenzbeispielen; unbekannte Einheit führt zu einem Fehler.
- Quellen mit vollständiger Fundstelle und geprüften Rechten; fachliche Freigabe ist eine redaktionelle Aufgabe.
- Migration: v1, beschädigte Daten, gesperrter Speicher, unbekannte Zukunftsversion, Importfehler, wiederholte Migration und Tab-Konflikte testen.

## Einführung ohne großen Umbau

Zuerst Quellen-/Themenkataloge und stabile Fragen-IDs ergänzen, bestehende UI mit einem kleinen Adapter weiterbetreiben. Danach die Formelregistry für **einen** Rechner einführen. Anschließend v2-Speicherung und Migration getrennt absichern. Erst danach alle Fachbereiche erweitern. Gemeinsame Darstellungskomponenten nur aus tatsächlich wiederholten Anforderungen ableiten; kein neues Framework oder Backend auf Vorrat.
