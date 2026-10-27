# Mathematischer Formelsatz · 0.5

KaTeX samt mhchem, CSS und Fonts wird lokal gebündelt. Keine Formel-API, kein CDN und keine kostenpflichtige Lizenz. Die Bibliotheks-/Fontlizenzen liegen im installierten KaTeX-Paket; eigene Lerntexte bleiben eigenständig.

`InlineMath`, `BlockMath`, `FormulaBox`, `VariableDefinitions` und `SolutionSteps` stehen in `src/math/Math.tsx`. MathML plus visuelle Darstellung unterstützt zugängliche Ausgabe. Abgesetzte lange Formeln sind fokussierbar und innerhalb ihres eigenen Bereichs horizontal scrollbar. Ein echtes Apple-Gerät bleibt separat zu prüfen.

`MathText` verarbeitet nur ausdrücklich markierte Mathematik: `\( ... \)` und `\[ ... \]`. Gewöhnliche Textschrägstriche wie iPad/iPhone oder kg/s werden nicht erraten oder ersetzt. 19 vorhandene Registerformeln haben explizite TeX-Zuordnungen; alle 24 bisherigen Zahlenaufgaben erhalten ausdrücklich ausgezeichnete Lösungsschritte. Fach-/Quellen-/Aufgaben-IDs und die zugrunde liegenden Berechnungen bleiben gleich.

Alte Snapshots ohne TeX-Felder rendern weiter als Text. Optionale `texSteps` werden beim Import strukturell geprüft. Für neue Inhalte sind explizite MathText-Markierungen möglich. Ungültige Syntax oder übergroße Ausdrücke zeigen einen lesbaren Text-Fallback statt die App zu stoppen. `trust=false`, begrenzte Makroexpansion und keine Interpretation als ausführbares JavaScript schützen die Ausgabe. Gerendertes HTML stammt ausschließlich von KaTeX.

Darstellbar sind Brüche und verschachtelte Brüche, Wurzeln, Potenzen/Indizes, griechische Zeichen, Summen, Integrale, Vektoren, mehrzeilige Gleichungen, chemische Formeln und Einheiten. Darstellung bedeutet keine fachliche Verifizierung der eingegebenen Formel. Rechenlogik bleibt in reinen geprüften Funktionen.
