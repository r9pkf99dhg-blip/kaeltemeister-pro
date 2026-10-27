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

1. Öffne den Pull Request für `fix/github-pages-deployment`. Warte auf die grünen Prüfungen. Klicke auf **Merge pull request → Confirm merge**. Dadurch wird die Änderung nach `main` übernommen und das Deployment automatisch gestartet.
2. Unter **Settings → Pages → Build and deployment → Source** muss **GitHub Actions** ausgewählt sein (in deinem Repository bereits erledigt).
3. Öffne **Actions → Deploy to GitHub Pages**. Der Workflow liegt in `.github/workflows/deploy.yml`. Der frühere Workflow `pages.yml` wurde durch diese Datei ersetzt, damit es keine doppelten Veröffentlichungen gibt.
4. Zum manuellen Start: **Run workflow → Branch: main → Run workflow**. Die Schaltfläche erscheint, sobald die Workflow-Datei auf `main` liegt. Ein Aufruf auf einem anderen Branch prüft nur die App und veröffentlicht nichts.
5. Öffne den neuesten Lauf. Erst **App prüfen und bauen**, dann **Website veröffentlichen** müssen grün werden. Der zweite Job zeigt nach erfolgreicher Veröffentlichung den Website-Link an; dann erscheint auch unter **Settings → Pages** die Website-Adresse bzw. **Visit site**. Das kann kurz dauern.
6. Öffne auf deinem iPad in Safari diese Adresse: **https://r9pkf99dhg-blip.github.io/kaeltemeister-pro/**. Optional: **Teilen → Zum Home-Bildschirm** für einen schnellen Zugriff. Das ist eine Verknüpfung; ein Offline-Modus ist noch nicht enthalten.

Der Workflow installiert die festgeschriebenen Abhängigkeiten mit `npm ci`, prüft TypeScript, führt alle Tests aus und baut die App. Offizielle Actions (`configure-pages`, `upload-pages-artifact`, `deploy-pages`) veröffentlichen ausschließlich den Ordner `dist`. Der Deployment-Job besitzt `pages: write` und `id-token: write`; ein persönlicher Token oder ein separater Hostingdienst ist nicht erforderlich. Pull Requests werden geprüft, veröffentlichen aber keine Website. Der Unterpfad ist in `vite.config.ts` korrekt als `base: '/kaeltemeister-pro/'` hinterlegt. Bei einem anderen Repositorynamen muss er angepasst werden.

### Wenn der Workflow oder die Website noch nicht erscheint

- **Workflow fehlt:** Öffne **Code**, wähle den Branch **main** und kontrolliere `.github/workflows/deploy.yml`. Eine Datei, die nur im PR-Branch liegt, bietet noch keinen manuellen Start auf `main`. GitHub Actions zeigt den neuen Namen **Deploy to GitHub Pages** an.
- **Actions ist deaktiviert:** Unter **Settings → Actions → General → Actions permissions** müssen GitHub Actions und die verwendeten offiziellen Actions erlaubt sein. Ein deaktivierter Workflow kann unter **Actions** über **Enable workflow** wieder aktiviert werden. Organisationsregeln lassen sich nicht mit einer Workflow-Datei umgehen.
- **Kein automatischer Lauf nach dem Merge:** Starte den Workflow manuell auf **main**. Das ist beispielsweise nötig, wenn ein automatisierter Push mit `GITHUB_TOKEN` keine weiteren Workflows ausgelöst hat.
- **Roter Lauf:** Öffne den Lauf und dann den roten Schritt. Ein fehlgeschlagener Build wird absichtlich nicht veröffentlicht. Bei „Pages site not found“ die Quelle **GitHub Actions** unter **Settings → Pages** kontrollieren und den Lauf erneut starten.
- **Deployment wartet:** Prüfe, ob unter **Settings → Environments → github-pages** eine Freigabe verlangt wird oder `main` als Deployment-Branch zugelassen werden muss.
- **Kein „Visit site“:** Die Auswahl der Quelle allein veröffentlicht noch nichts. Zuerst muss der Job **Website veröffentlichen** erfolgreich sein. Erst danach die Website-Adresse öffnen und bei Bedarf Safari neu laden.

Die erfolgreiche Ausführung auf GitHub und die Live-Adresse müssen nach dem Merge überprüft werden. Lokale Tests bestätigen den Build, aber keinen abgeschlossenen GitHub-Pages-Deploy.

### Falls der Pull Request noch fehlt

Die Deployment-Korrektur befindet sich im Branch `fix/github-pages-deployment`. Öffne auf GitHub **Pull requests → New pull request**, wähle als Ziel **main** und als Vergleich **fix/github-pages-deployment** und klicke auf **Create pull request**. Danach wie oben beschrieben zusammenführen.

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
