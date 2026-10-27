# Lernsystem · Version 0.2

## Nutzbare Funktionen

Die Akademie bietet fünf Kältetechnik-Module mit jeweils drei eigenständig formulierten Niveauvarianten. Der Niveauwechsel verändert Einstieg, Erklärung, Zusammenhänge, Beispiel, Fehlerhinweise, Zusammenfassung und Vertiefung. Die gemeinsamen Lernziele zeigen das Themenziel; mit höherem Niveau werden die Anforderungen vertieft.

- **Grundlagen:** anschaulicher Einstieg, erklärte Fachbegriffe, einfache Zusammenhänge und zwei grundlegende Fragen pro Modul.
- **Fachkraft:** Massenstrom, Enthalpie, Einheiten, praxisbezogene Berechnungen; die Grundlagenfragen plus eine fachliche Frage.
- **Meisterniveau:** Systemgrenzen, Messunsicherheit, Analyse und Transfer; alle vier Fragen des Moduls.

Das ergibt fünf Module, 15 Textvarianten, 20 stabile Quizfragen und zehn Karteikarten. Die Frageauswahl ist kumulativ: Höhere Stufen wiederholen auch Grundlagen. Es wird keine zusätzliche Fragebank pro Niveau dupliziert.

## Einheitliche Modulansicht

1. Lernziele
2. Einfacher Einstieg
3. Fachliche Erklärung
4. Technische Zusammenhänge
5. Formeln und Einheiten einschließlich Gültigkeit
6. Durchgerechnetes Praxisbeispiel
7. Typische Fehler
8. Zusammenfassung
9. Verständnisfragen mit Erklärung und gespeicherter letzter Antwort
10. Vertiefung
11. Quellen und fachlicher Prüfstatus

Zusätzlich gibt es Karteikarten und passende vorhandene oder ausdrücklich geplante Werkzeugbeziehungen. Lerntexte sind mit größerer Schrift und großzügigem Zeilenabstand gestaltet. Niveauwechsel, Rückkehr zur Übersicht und Artikelwechsel setzen die Ansicht nach oben; die mobile Navigation reserviert Abstand zu Bedienelementen.

## Quiz und Lernstatus

Eine Modulfrage hat genau eine richtige Antwort. Nach „Antwort prüfen“ werden Antwort-ID, Frageversion, Ergebnis und UTC-Zeit gespeichert. Die Erklärung nennt die richtige Lösung und begründet sie. Die Antwort kann durch erneute Auswahl korrigiert werden. Die zuletzt gespeicherte Antwort bleibt nach Neuladen sichtbar; eine alte Antwort wird nicht ungefragt als aktuelle Auswahl vorausgewählt.

„Erneut üben“ bedeutet: Mindestens eine zuletzt beantwortete Frage dieser Modulrevision ist falsch. Eine Korrektur hebt diesen Hinweis auf, wenn keine andere aktuelle Antwort falsch ist. Fragen einer alten Revision zählen nicht zur aktuellen Bewertung. Diese einfache Regel ist keine psychometrische Kompetenzmessung.

„Gelesen“ wird pro Niveau explizit markiert und ist kein Lernzielnachweis. Ein geändertes Modul mit neuer Revision gilt erneut als offen. Die Übersicht bietet Filter für offene, gelesene und erneut zu übende Module. Der bisherige Zwölf-Fragen-Test mit Bestwert und vollständiger Rundenauswertung bleibt separat erhalten; seine Werte werden nicht mit den neuen Modulfragen vermischt.

## Karteikarten und Spaced Repetition

Die Vorderseite stellt eine Frage. Erst nach dem Umdrehen kann der Nutzer bewerten:

- **Gewusst:** Wiederholung nach 1, dann 3, 7, 14 und anschließend jeweils 30 Tagen.
- **Nochmal:** Lernserie zurück auf 0; die Karte bleibt heute fällig.

Ein „Tag“ ist hier exakt 24 Stunden ab Bewertungszeitpunkt in UTC. Es gibt keine Benachrichtigungen und keinen Hintergrunddienst. Die Fälligkeit wird beim Rendern/Öffnen der Ansicht ermittelt. Eine freiwillige Ansicht aller Karten erlaubt Üben vor dem Termin; auch dort verändert eine Bewertung den Termin. Eine geänderte Kartenrevision wird wieder fällig.

Neu angelegte Karten sind sofort fällig. Die globale Wiederholung umfasst alle zehn Karten; im Modul werden nur dessen Karten gezeigt. Reihenfolge und Bewertung sind bewusst einfach, kein SM-2 und keine Behauptung eines individuell optimalen Algorithmus.

## Suche und Fachgebiete

Die Suche findet Modultitel, Kurzbeschreibungen und zugeordnete Fachbegriffe mit ihren Definitionen. Groß-/Kleinschreibung und deutsche Umlaute in ae/oe/ue-Schreibweise werden berücksichtigt. Sie ist noch keine Volltextsuche in sämtlichen Absätzen oder Quellen. Begriffsergebnisse verlinken auf die zugehörigen vorhandenen Module.

Alle zwölf Fachgebiete haben Kapitel und Unterkapitel. Geplante Themen sind als „Noch nicht ausgearbeitet“ sichtbar und keine scheinbar fertigen Artikel. Rechtliche Themen enthalten in 0.2 noch keine konkreten Rechtsauskünfte.

## Speicher und Migration

- Bestehende Funktionen verwenden weiterhin `kaeltemeister-pro:progress:v1`.
- Akademie verwendet `kaeltemeister-pro:progress:v2` mit `schemaVersion: 2`.
- Nur wenn v2 noch nicht existiert, werden v1-Daten einmalig als Ausgangsbasis gelesen. V1 bleibt erhalten.
- Der alte Artikel `kreislauf` wird dem Grundlagen-Lesestatus von `cycle-basics` zugeordnet. Für `superheat-subcooling` müssen beide alten Artikel `ueberhitzung` und `unterkuehlung` gelesen sein. Andere Niveaus/Module bleiben offen.
- Alte Quizaggregate werden als `legacySummary` erhalten, nicht als erfundene Antworten. Die bisherigen Funktionen nutzen weiterhin ihre originalen v1-Werte.
- Ein vorhandener v2-Datensatz ist maßgeblich; spätere Leseaktionen in den alten Artikeln werden nicht laufend in Akademie-Abschlüsse umgewandelt.
- Unbekannte/ungültige v2-Versionen und Lesefehler sperren das automatische Schreiben in dieser Sitzung. Der Nutzer sieht einen Hinweis und kann vorübergehend weiterlernen.
- Schreibfehler zeigen ebenfalls einen Hinweis. V1 wird bei der Migration weder gelöscht noch geändert. Ein gescheitertes v2-Schreiben lässt den v1-Ausgangspunkt bestehen.

„Fortschritt zurücksetzen“ verlangt eine Bestätigung und setzt beide nutzbaren Speicherstände zurück. Nicht sicher gelesene Daten werden nicht automatisch gelöscht. Keine Gerätesynchronisation oder Tab-Konfliktlösung. Das Löschen von Browserdaten entfernt auch den Lernfortschritt. Der bisherige Schlüssel kann durch die alten Funktionen weiterhin normalisiert werden; der Akademie-Lader selbst schreibt niemals v1.
