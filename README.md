# KälteMeister Pro

Dein kostenloser Lernbegleiter für die Meisterschule in der Kältetechnik. Die App läuft im Browser auf Smartphone, iPad und Computer. Sie benötigt weder Benutzerkonto noch kostenpflichtigen Dienst oder eigenen Server.

## Was die erste Version kann

- **Dashboard:** gelesene Artikel, Quiz-Bestwert und direkter Einstieg.
- **Lernbereich:** Kältekreislauf, Überhitzung und Unterkühlung mit Praxisbeispielen und Merksätzen. Artikel lassen sich als gelesen markieren.
- **Wissensquiz:** zwölf Fragen mit direktem Feedback, Erklärungen und vollständiger Auswertung. Gespeichert werden abgeschlossene Versuche, das letzte Ergebnis und der Bestwert. Eine laufende Runde wird beim Verlassen verworfen.
- **Rechner:** sensible Wärmeleistung `Q̇ = ṁ × cp × ΔT` mit Einheitenumrechnung, Eingabeprüfung und Rechenschritten.
- **Lernfortschritt:** Speicherung im Browser über `localStorage`, mit bestätigtem Zurücksetzen.

Die App verwendet React, TypeScript, Vite, Tailwind CSS und Lucide-Symbole. Es gibt keine extern geladenen Schriften, Werbung, Analysewerkzeuge oder Backend-Aufrufe der Anwendung.

## Auf dem Computer starten

Einmalig **Node.js 24** mit npm installieren. Das Repository herunterladen oder klonen und im Projektordner ein Terminal öffnen:

```sh
npm ci
npm run dev
```

Im Terminal steht die Adresse zum Öffnen im Browser. Der Projektpfad lautet `/kaeltemeister-pro/`. Mit `Strg+C` beendest du den Server. Für einen anderen Port: `npm run dev -- --port 5174`.

Auf iPad oder Smartphone ist nach der Veröffentlichung keine Installation nötig: Du öffnest einfach die GitHub-Pages-Adresse in Safari oder Chrome. Zum lokalen Testen im selben WLAN kann die von Vite angezeigte Netzwerkadresse mit dem Projektpfad verwendet werden, sofern die Firewall den Zugriff zulässt. Ein Cloud-Terminal ist nicht automatisch aus deinem WLAN erreichbar.

## Selbst ausprobieren

1. Öffne **Lernbereich**, lies einen Artikel und tippe auf **Als gelesen markieren**. Im Dashboard steht anschließend „1 von 3“. Lade die Seite neu: Der Fortschritt bleibt bestehen.
2. Öffne **Wissensquiz**, wähle eine Antwort und tippe auf **Antwort prüfen**. Lies die Erklärung. Nach allen zwölf Fragen siehst du dein Ergebnis und jede richtige Lösung. Ein neuer Versuch überschreibt einen besseren Bestwert nicht.
3. Öffne **Rechner** und berechne die voreingestellten Werte: `0,5 kg/s × 4,18 kJ/(kg·K) × 5 K = 10,45 kW`.
4. Probiere stattdessen `1800 kg/h` und `4180 J/(kg·K)` mit `5 K`: Das Ergebnis muss ebenfalls **10,45 kW** sein.
5. Entferne einen Wert oder trage eine negative Zahl ein. Die App soll eine verständliche Fehlermeldung anzeigen. Komma und Punkt sind als Dezimaltrenner erlaubt; Tausendertrenner bitte weglassen.
6. Teste Hoch- und Querformat. Auf kleinen Displays befindet sich die Navigation unten, auf größeren links.

## Prüfungen für die Entwicklung

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

`npm test` führt die vorhandenen Fachlogik- und Oberflächentests aus: Einheiten, Fehlerfälle, Datenspeicherung, Artikelabschluss, komplettes Quiz und Ergebnisanzeige. `npm run build` erstellt die veröffentlichbare App im Ordner `dist/`. `npm run preview` dient dazu, diesen Build lokal zu prüfen, und ersetzt keinen dauerhaften Webserver. Änderungen unter `src/` werden beim Entwicklungsserver automatisch sichtbar.

## Kostenlos über GitHub Pages veröffentlichen

Für ein öffentliches Repository ist GitHub Pages mit GitHub Free nutzbar. Bei einem privaten Repository kann ein kostenpflichtiger GitHub-Tarif erforderlich sein. Veröffentliche keine vertraulichen Inhalte; eine Pages-Seite ist in der Regel öffentlich.

1. Übernimm den Pull Request nach **main** (auf GitHub: **Pull requests → PR öffnen → Merge pull request → Confirm merge**). Falls kein PR automatisch erstellt werden konnte, siehe unten.
2. Öffne im Repository **Settings → Pages**.
3. Wähle unter **Build and deployment → Source** die Option **GitHub Actions**.
4. Öffne **Actions → Auf GitHub Pages veröffentlichen → Run workflow**, wähle **main** und starte den Workflow. Bei späteren Änderungen auf `main` startet er automatisch.
5. Warte auf den grünen Haken. Unter **Settings → Pages** oder im Deployment erscheint die tatsächliche Adresse. Erwartet wird: `https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/`.

Der Workflow prüft Typen, Tests und Build vor jeder Veröffentlichung. Für Pull Requests gibt es zusätzlich einen Prüfworkflow. GitHub Actions muss im Repository erlaubt sein. Falls ein Workflow mit „Pages site not found“ endet, kontrolliere Schritt 3 und starte ihn erneut. Diese erste Version bereitet das Deployment vor; die Aktivierung von Pages und das Zusammenführen nach `main` erfolgen bewusst durch dich.

Der Unterpfad ist in `vite.config.ts` als `base: '/kaeltemeister-pro/'` hinterlegt. Bei einem anderen Repositorynamen muss er angepasst werden. Die interne Navigation benötigt keine Serverweiterleitungen.

### Falls der Pull Request noch fehlt

Die Änderungen befinden sich im Branch `feat/erste-app-version`. Falls dieser noch nicht auf GitHub sichtbar ist, im Projektterminal ausführen:

```sh
git push -u origin feat/erste-app-version
```

Auf GitHub unter **Pull requests → New pull request** als Ziel `main` und als Vergleich `feat/erste-app-version` wählen. Auf **Create pull request** klicken. Als Beschreibung eignen sich die Funktionen und Prüfungen aus dieser README. Falls der Push abgewiesen wird, braucht die verwendete GitHub-Verbindung Schreibrechte auf dieses Repository. Niemals Zugangsschlüssel in den Quellcode eintragen.

## Wie der Rechner rechnet

- Eingaben: Massenstrom in **kg/s** oder **kg/h**, spezifische Wärmekapazität in **kJ/(kg·K)** oder **J/(kg·K)** und der Betrag der Temperaturdifferenz in **K**.
- Umrechnung: kg/h geteilt durch 3600 ergibt kg/s; J/(kg·K) geteilt durch 1000 ergibt kJ/(kg·K).
- Ergebnis: kg/s × kJ/(kg·K) × K = kJ/s = **kW**. 1 kW = 1000 W.
- `ΔT = |T₂ − T₁|`. Eine Temperaturdifferenz von 1 °C entspricht 1 K. Der Rechner zeigt den positiven Leistungsbetrag, keine Vorzeichenkonvention für Zu- oder Abfuhr.
- Es wird mit ungerundeten Zahlen gerechnet; die Anzeige ist auf sechs Nachkommastellen begrenzt. Sehr kleine Ergebnisse können deshalb als 0 erscheinen.
- Konstantes cp und **kein Phasenwechsel** werden vorausgesetzt. Für Verdampfung, Kondensation oder Luftentfeuchtung ist diese einfache Gleichung allein nicht geeignet. Der Wasserwert ist ein Näherungswert bei etwa 20 °C.

## Deine Daten

Gelesene Artikel und Quiz-Ergebnisse bleiben nur im aktuellen Browserprofil und unter derselben Webadresse. Sie werden nicht zwischen Geräten synchronisiert. Das Löschen der Browserdaten entfernt den Fortschritt. In privaten Browserfenstern kann er nach dem Schließen verschwinden. Wenn die Speicherung blockiert ist, erscheint ein Hinweis; die App funktioniert dann weiter mit vorübergehendem Fortschritt. Es gibt noch keinen Offline-Modus oder eine installierbare PWA.

Die Fachartikel unterstützen dein Lernen. Herstellerangaben und Sicherheitsvorschriften haben Vorrang. Messwerte allein ersetzen keine vollständige Diagnose einer realen Anlage.

## Orientierung im Quellcode

- `src/App.tsx`: Navigation, Dashboard, Lernbereich, Quiz und Rechneroberfläche.
- `src/content.ts`: Fachartikel und Quizfragen mit Lösungen.
- `src/logic.ts`: Rechenlogik und robustes Laden des Lernfortschritts.
- `src/styles.css`: Tailwind-Einbindung und responsive Gestaltung.
- `src/*.test.*`: automatisierte Tests.
- `.github/workflows/`: Prüfungen und Pages-Veröffentlichung.

Es sind keine API-Schlüssel oder Umgebungsvariablen nötig. Für reproduzierbare Installationen liegt `package-lock.json` bei; bitte `npm ci` verwenden.
