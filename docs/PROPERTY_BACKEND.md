# Stoffdaten-Backend · Version 0.8

## Freigegebener Umfang

**Modell B, begrenzter Offline-Referenzkatalog**, keine freie Browser-Zustandsberechnung. `PropertyBackend` trennt `case`, `state` und `query`: nur acht benannte Fälle und deren vier Zustände sind verfügbar. Freie p-h-Abfragen, eigene Stoffe, Gemische, Extrapolation und Interpolation werden ausdrücklich abgelehnt. Die gemeinsame Bilanzbibliothek verarbeitet SI-Werte; sie ersetzt kein Stoffmodell.

## Tatsächlich durchgeführte Machbarkeitsprüfung

Am 28.10.2026 wurden die offizielle CoolProp-JavaScript-Dokumentation und die Referenzzustands-/HighLevelAPI-Dokumentation im Git-Archiv zu Version 7.2.0 gelesen. Der offizielle Wrapper benötigt `coolprop.js` und `coolprop.wasm`, korrekte WASM-Auslieferung sowie asynchrone Initialisierung. Die SourceForge-Verzeichnisliste für 7.2.0 war erreichbar (HTTP 200). **Alle drei tatsächlichen Download-Anfragen für JS, WASM und Beispiel-HTML scheiterten am Netzwerkproxy mit HTTP 403.** Emscripten ist lokal nicht installiert; Docker ist erreichbar, ein eigener reproduzierbarer und unabhängig geprüfter Browser-Build wurde nicht erstellt. Keine fremde unversionierte „latest“-Datei eingebunden.

Damit ist keine Aussage getroffen, CoolProp sei grundsätzlich im Browser unmöglich. **Modell C wurde für diesen Release nicht nachgewiesen und nicht freigegeben.** Ein eigener Build, Laufzeit-/Speicher-/Konvergenztests auf echten Apple-Geräten und unabhängige Stoffmodellvergleiche bleiben Folgearbeit.

## Nachweis für Modell B

CoolProp 7.2.0 / HEOS / reines R134a, Git `98b3523d5daa98454618d381d2ae53f7471d216b`, MIT-Lizenz lokal beigelegt. IIR-Bezug: gesättigte Flüssigkeit bei 273,15 K mit h = 200000 J/kg, s = 1000 J/(kg K). Offline-Eingaben: T/Q für Sättigung, P/T für Ein-/Austritt, P/S für isentropen Austritt, P/H für Drosselaustritt. Version, EOS, Einheiten, Referenz, Generierung und SHA256 stehen im Datenartefakt und REFRIGERANT_DATA.md.

Der Anbieter prüft zur Laufzeit Endlichkeit, positive absolute Drücke, kritische Grenze, Druckverhältnis, vier Zustände, Phasenkennzeichen, Über-/Unterkühlung, Drosselbilanz und Verdichterwirkungsgrad. Diagrammlinien mit ungültigem p/h werden nicht still gezeichnet. Die Browserprüfung verwendet den tatsächlichen Produktionsbuild unter `/kaeltemeister-pro/`, ohne Stoffdaten-API. Unbekannte Fälle liefern verständliche Fehler. Zeichnungssegmente sind keine frei auswertbaren Stoffwerte.

Die Offline-Datenprüfung umfasst Herkunft, Referenzanker, Rückrechnung, Ancillary-Sättigungsdruck, Clapeyron-Identität, Bilanz und begrenzte Zeichnungsstichproben. Das ist **keine unabhängige experimentelle Validierung der Zustandsgleichung**, keine Messunsicherheit und keine menschliche Fachfreigabe. EOS-Gesamtgrenzen sind nicht gleich freigegebene Eingabegrenzen der App.

## Erweiterung

Ein künftiges `live`-Backend muss getrennte Fähigkeiten, Referenzniveau, sichere Eingabepaare, Phasen- und Sättigungsfehler, Worker-/Abbruchverhalten, Grenztests, Cache und Quellenangaben liefern. Eine bloß vorhandene Schnittstelle schaltet keine Fähigkeit frei. Keine kostenpflichtigen APIs, kein REFPROP, keine Runtime-Downloads in 0.8.
