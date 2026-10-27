# Lernsystem · Version 0.4

## Angebot und Fortsetzen

Fünf bestehende Kältemodule und fünf Elektro-Grundlagenmodule mit drei unterschiedlichen Niveaus. Elektro-Reihenfolge: Grundgrößen → Spannung/Strom/Widerstand → Ohmsches Gesetz → Leistung/Arbeit → Reihen-/Parallelschaltungen. Voraussetzungen sind im Modul verlinkt. Je Modul sind Fragen, Karten und zugehörige Zahlenaufgaben über dieselbe Oberfläche nutzbar. Die weiteren Fachgebiete und elf folgenden Elektro-Themen bleiben ehrlich als Planung erkennbar.

Das Dashboard zeigt Fortschritt je verfügbarem Fachgebiet, heute fällige Wiederholungen, Schwächen, Empfehlungen, letzte Module und Prüfungen. Über „Zuletzt bearbeitete Module“ lässt sich die letzte Lerneinheit fortsetzen. Gelesen ist ein Lesestand je Niveau/Revision und kein Kompetenznachweis.

## Adaptives Lernen bleibt erhalten

Pro aktueller Frage/Aufgabe werden Versuche, richtige Antworten, Serie, letzte Antwort, Zeit und Wiederholungstermin gespeichert. Objektive Themenstatistik verwendet Fragen/Rechnungen. Karten sind Selbsteinschätzung und zählen nicht als fachlicher Kompetenznachweis.

Reihenfolge: letzte falsche Antwort → fälliger Termin → mindestens zwei Versuche und Trefferquote unter 75 % → noch unbewerteter Einstieg → kein zusätzlicher Bedarf. Jede Empfehlung erklärt ihren Grund. Falsche Antworten sind sofort wieder fällig; richtige Serien planen 1/3/7/14/30 Tage, bei Wissenslücken höchstens drei Tage. Ein Tag sind 24 Stunden; „heute“ im Dashboard gilt bis zum lokalen Tagesende. Der Algorithmus bleibt einfach und kostenlos.

Die Trefferquote basiert auf aggregierten bisherigen v3-Versuchen, nicht auf einem gleitenden Zeitfenster. Alte Fehler können länger nachwirken. Eine Korrektur löscht keine tatsächliche Historie. Ein späteres begrenztes Lernfenster ist weiterhin geplant.

## Zahlenaufgaben und Prüfungen

24 vollständig ausgearbeitete Zahlenaufgaben mit Einheiten, Hinweis, Schritten, Fehlern und Fachbezug. SI-Kern und Bewertungslogik sind gemeinsam für Training und Prüfung. Dezimalkomma und Punkt sind erlaubt, Tausendertrenner nicht. Toleranz: Maximum aus absoluter SI-Toleranz und 0,5 % des Sollwerts plus kleiner Maschinenrundungsreserve. Das ist eine didaktische Rundungshilfe, keine Messgenauigkeit. Ungültige/leere Trainingseingaben zählen nicht als bewerteter Versuch; wiederholter Klick ohne Antwortänderung zählt nicht erneut.

Die **selbst erstellte Übungsprüfung** bleibt ausdrücklich keine offizielle Meisterprüfung. Fachgebiet, Niveauobergrenze und 5/10/20 Minuten; bis zu drei Auswahl- und drei Zahlenaufgaben, bekannte Fehler priorisiert. Höhere Niveaus können Grundlagen enthalten. Der vergrößerte Elektro-Pool ersetzt keine vollständige Abschlussprüfung.

Snapshot, absolute Endzeit, Neuladen, Hintergrundwechsel, genau einmalige Abgabe, gleiche Punkte pro Aufgabe und Fehleranalyse bleiben erhalten. Unbeantwortete Aufgaben geben null Punkte, behaupten aber keine Wissenslücke. Ungültige Prüfungsantworten gelten als formaler Fehler. Maximal 20 Ergebnisse werden gespeichert. Uhr und Speicher sind manipulierbar; Selbststudium ohne Aufsicht.

## Speicherung, Sicherung und Schutz

v3-Schema/Schlüssel bleiben erhalten; bestehende v2/v1-Migration bleibt konservativ und erfindet keine historischen Zähler. V2 bleibt unverändert als Rückfallbestand. Neu: Export/Import des versionierten Backupformats inklusive aller tatsächlich gespeicherten Lerninformationen und Prüfungssnapshots. Vorschau und explizite Ersetzen-Bestätigung; Journal und Rollback schützen vor unvollständiger Wiederherstellung. Siehe [BACKUP_RESTORE.md](BACKUP_RESTORE.md).

Beschädigte/unklare v3- und nun auch beschädigte v1-Daten werden nicht automatisch durch bereinigte Anfangswerte überschrieben. Bei Schreibfehlern bleiben Änderungen ggf. nur in der Sitzung. Bei Änderungen aus einem anderen Tab wird Schreiben gesperrt; neu laden. Vor Restore alle anderen Tabs schließen. Keine Gerätesynchronisation, keine verteilte Konfliktauflösung, kein Offline-/PWA-Versprechen. Externe Sicherungsdateien sind weiterhin nötig, weil Browserdaten gelöscht werden können.

„Fortschritt zurücksetzen“ bleibt eine bestätigte Löschaktion; vor Rücksetzen oder Import zuerst exportieren. Der v2-Rückfallbestand bleibt erhalten und wird bei vorhandenem v3 nicht automatisch erneut migriert.

## Fachqualität und Sicherheit

Prüfregister und Quellenumfang sind in der App sichtbar. Automatische Zahlenprüfung bedeutet keine unabhängige fachliche Freigabe. Elektro-Aufgaben sind rein rechnerisch, nicht praktische Arbeitsanleitungen. Reale Bauteilwerte, Schutzmaßnahmen, Normkonformität und Anlagenfreigaben werden nicht aus fiktiven Beispielen abgeleitet.
