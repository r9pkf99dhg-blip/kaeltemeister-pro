# Fachqualität und technische Prüfung · Version 0.4

## Ehrlicher Prüfstatus

| Status | Bedeutung |
| --- | --- |
| Entwurf | Inhalt nutzbar zum Lernen, vollständiger fachlicher Aussagenabgleich noch offen |
| Automatisch geprüft | Dokumentierte Zahlen-, Einheiten-, Struktur- oder Bewertungsprüfungen; Umfang pro Eintrag |
| Quellenbasiert geprüft | Genau benannte Grundbeziehung mit tatsächlich eingesehener Fundstelle abgeglichen |
| Unabhängig fachlich geprüft | Erst nach dokumentierter Prüfung durch qualifizierte externe Fachperson; derzeit **kein** Inhalt |
| Überarbeitung erforderlich | Für künftig festgestellten Korrekturbedarf vorgesehen; keine erfundene Beanstandung |

Das zentrale Register `src/quality/register.ts` inventarisiert bestehende Artikel, alle Modulniveaus, Formeln, Quizfragen (auch altes Quiz), Karten, Zahlenaufgaben, Fachbegriffe, Lernziele und Fachnotizen. In der App lässt es sich unter **Fachliches Prüfregister** durchsuchen. Quellenzugriff, automatische Prüfung und unabhängige Fachabnahme sind verschiedene Belege. Ein Quellenlink allein ist keine Freigabe.

Der vollständig ausgefüllte Ausgangsbericht mit Bearbeitungsfeldern für Fachprüfer steht in [REVIEW_REGISTER.md](REVIEW_REGISTER.md). Er wird mit `npm run docs:review` aus demselben Register erzeugt. Pro Inhalt: stabile ID, Fachgebiet, Formel-IDs, Quellen/Fundstellen, Rechnung oder Referenztext, Annahmen, mögliche Fehler, Status, offene Fragen sowie Felder für Name, Datum und Entscheidung.

## Durchgeführte fachliche Arbeit

- Alle 24 Zahlenaufgaben besitzen separat vorgegebene SI-Referenzergebnisse; diese Werte werden nicht aus der zu prüfenden Produktfunktion erzeugt.
- Wärme-, Massenstrom-, Temperatur-, COP- und Elektrobeispiele bleiben klar begrenzte fiktive Lernfälle.
- SI-Umrechnungen einschließlich kg/h, °C/K, mA, mV, kΩ, Minuten/Stunden und J/Wh/kWh; Toleranzgrenzen und falsche Einheiten sind getestet.
- Fehlende/negative/nicht endliche Werte, Nullnenner, Überlauf und falsches Temperaturvorzeichen werden geprüft. Der Parallelrechner verwendet eine skalierte Form, damit große Einzelwiderstände nicht unnötig einen Produktüberlauf erzeugen.
- Die idealisierte Kältekreisbilanz und Zahlen aus alten Musterlösungen werden separat nachgerechnet.
- OpenStax-Grundgleichungen für Ladungsstrom, Ohm, Leistung/Energie und Widerstandsschaltungen wurden im offiziellen, gepinnten Quellarchiv eingesehen. Quellen und konkrete Fundstellen stehen in [SOURCES.md](SOURCES.md).
- Der Altbestandsleser schützt nun auch beschädigte v1-Zeichenfolgen vor automatischem Überschreiben. Bereinigte Werte können vorübergehend angezeigt werden; Originale bleiben geschützt.

## Offen für qualifizierte Fachpersonen

**Keine unabhängige menschliche Prüfung wurde durchgeführt.** Kältetechnische Messvoraussetzungen (Dew/Bubble, Druckbezug, Messort), Diagnosegrenzen, alle vollständigen Lerntexte, die Elektro-Praxisübertragung und sicherheitsbezogene Formulierungen benötigen Fachabnahme. Nicht eingesehene externe Aussagen bleiben entsprechend markiert. Eine intern rechnerisch geprüfte Musterlösung garantiert keine Eignung zur realen Anlagenauslegung.

Elektrische Beispiele sind keine Arbeitsanweisungen an spannungsführenden Anlagen. Es werden keine pauschalen Schutz-, Verdrahtungs-, Leitungs- oder Sicherungswerte genannt. Auch kleine Spannungsangaben sind kein Sicherheitsnachweis.

## Prüfprozess

1. Fachprüfer erhält Register und App-Stand/Commit.
2. Jede Aussage und Modellgrenze gegen passende autoritative Quelle prüfen; Fundstelle ergänzen.
3. Referenzrechnung unabhängig reproduzieren; Fehler und offene Punkte erfassen.
4. Korrekturen im PR mit Revision und Migrationsauswirkung prüfen.
5. Erst dokumentierte Freigabe mit Person, Datum und Umfang erlaubt den Status „Unabhängig fachlich geprüft“.

Automatische Prüfungen und echte Geräteprüfung bleiben ergänzende, getrennte Nachweise. Siehe [APPLE_TEST_PLAN.md](APPLE_TEST_PLAN.md) und Versionsbericht.
