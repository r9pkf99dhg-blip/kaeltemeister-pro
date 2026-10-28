Aktueller Ergänzungsstand: [Version 0.6](RELEASE_V06.md). Historische Grundlagen und Zahlen beziehen sich gegebenenfalls auf die bezeichnete frühere Version.

# Mathematischer Formelsatz · 0.6

KaTeX samt mhchem, CSS und Fonts wird lokal gebündelt. Keine Formel-API, kein CDN und keine kostenpflichtige Lizenz. Die Bibliotheks-/Fontlizenzen liegen im installierten KaTeX-Paket; eigene Lerntexte bleiben eigenständig.

`InlineMath`, `BlockMath`, `FormulaBox`, `VariableDefinitions` und `SolutionSteps` stehen in `src/math/Math.tsx`. MathML plus visuelle Darstellung unterstützt zugängliche Ausgabe. Abgesetzte lange Formeln sind fokussierbar und innerhalb ihres eigenen Bereichs horizontal scrollbar. Ein echtes Apple-Gerät bleibt separat zu prüfen.

`MathText` verarbeitet nur ausdrücklich markierte Mathematik: `\( ... \)` und `\[ ... \]`. Gewöhnliche Textschrägstriche wie iPad/iPhone oder kg/s werden nicht erraten oder ersetzt. 19 vorhandene Registerformeln haben explizite TeX-Zuordnungen; alle 24 bisherigen Zahlenaufgaben erhalten ausdrücklich ausgezeichnete Lösungsschritte. Fach-/Quellen-/Aufgaben-IDs und die zugrunde liegenden Berechnungen bleiben gleich.

Alte Snapshots ohne TeX-Felder rendern weiter als Text. Optionale `texSteps` werden beim Import strukturell geprüft. Für neue Inhalte sind explizite MathText-Markierungen möglich. Ungültige Syntax oder übergroße Ausdrücke zeigen einen lesbaren Text-Fallback statt die App zu stoppen. `trust=false`, begrenzte Makroexpansion und keine Interpretation als ausführbares JavaScript schützen die Ausgabe. Gerendertes HTML stammt ausschließlich von KaTeX.

Darstellbar sind Brüche und verschachtelte Brüche, Wurzeln, Potenzen/Indizes, griechische Zeichen, Summen, Integrale, Vektoren, mehrzeilige Gleichungen, chemische Formeln und Einheiten. Darstellung bedeutet keine fachliche Verifizierung der eingegebenen Formel. Rechenlogik bleibt in reinen geprüften Funktionen.


## Umfang und Grenzen

Alle 42 aktuellen Registerformeln besitzen expliziten Formelsatz. Für vorhandene gewachsene Freitexte werden nur passende ausdrücklich markierte Stellen bzw. ganze kuratierte Antworttexte migriert; es gibt keine riskante automatische Volltext-Schreibweisenkonvertierung. 19 alte Registerbeziehungen und die 24 alten Zahlenmusterlösungen sind gezielt ausgezeichnet. Neue Lektionen/Herleitungen und chemische Gleichungen verwenden explizite Markierungen. Ältere Snapshots zeigen bei fehlenden optionalen Feldern weiterhin ihren ursprünglichen Text.

Die Tests rendern alle drei Niveaus sämtlicher Module, alle Formeln, Zahlenlösungen und kuratierten Antwortnotationen. Fehlerhafte/überlange Syntax, Sonderzeichen, Mehrzeiler, verschachtelte Brüche, Vektoren und chemische Formeln sind gesondert geprüft. Native aufklappbare Details werden für längere Lösungen genutzt. Mathematische Antwortfelder erlauben einen begrenzten einfachen Bruch, führen aber weder TeX noch JavaScript aus.

## Ergänzungen 0.6

77 Formeln besitzen explizites TeX. Neue Formeln trennen lesbaren Alternativtext und mathematischen Satz; Variablenbedeutung/Einheit sind angegeben. Antworten und Ergebnisrückmeldungen interpretieren nur explizit markierte Mathematik, keine freien Textschrägstriche. Lange Beleg-IDs umbrechen auch in WebKit, Variablendefinitionen besitzen begrenzte Flexbreite; notwendige lange Formeln scrollen nur im eigenen Bereich. Offizielle Quellen und mathematische Validität werden unabhängig von der erfolgreichen KaTeX-Darstellung geprüft.
