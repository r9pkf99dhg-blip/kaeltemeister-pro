import { test, expect } from "@playwright/test";
test("Geometriepfad und Winkelrechnung bleiben auf kleinen Bildschirmen lesbar", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page
    .getByLabel("Fachgebiet", { exact: true })
    .selectOption("mathematik");
  await page
    .getByRole("button", {
      name: /MATHEMATIK.*Winkel, Trigonometrie und Gefälle/,
    })
    .click();
  await page
    .getByLabel("Aufgabe wählen", { exact: true })
    .selectOption("geo-angle-a");
  await page
    .getByLabel("Dein Ergebnis: Winkel aus einer Steigung", { exact: true })
    .fill("36,87");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(
    page.getByText("Richtig innerhalb der Rechentoleranz.", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".math-error")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("Wechselstromdiagramm und Drehstromaufgabe unterscheiden Leitergrößen", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page.getByLabel("Fachgebiet", { exact: true }).selectOption("elektro");
  await page
    .getByRole("button", {
      name: /ELEKTRO.*Wechselstrom: Sinus, Zeit und Effektivwert/,
    })
    .click();
  await page
    .getByLabel("Strom nacheilend um", { exact: true })
    .selectOption("90");
  await expect(
    page.getByRole("img", {
      name: "Normierte Spannung und um 90 Grad nacheilender Strom",
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Zur Modulübersicht", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: /ELEKTRO.*Drehstrom: Leiter-, Stranggrößen und Leistung/,
    })
    .click();
  await expect(
    page.getByRole("img", {
      name: "Drei normierte Sinusspannungen mit 120 Grad Phasenabstand",
    }),
  ).toBeVisible();
  await page
    .getByLabel("Aufgabe wählen", { exact: true })
    .selectOption("ac-three-a");
  await page
    .getByLabel("Dein Ergebnis: Symmetrische Dreiphasen-Wirkleistung", {
      exact: true,
    })
    .fill("5542,56");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(
    page.getByText("Richtig innerhalb der Rechentoleranz.", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".math-error")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("Thermodynamikpfad rechnet Schichtwärme mit offengelegten Grenzen", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page
    .getByLabel("Fachgebiet", { exact: true })
    .selectOption("thermodynamik");
  await page
    .getByRole("button", { name: /Wärmeleitung, Wärmewiderstand und U-Wert/ })
    .click();
  await page
    .getByLabel("Aufgabe wählen", { exact: true })
    .selectOption("th-layer-a");
  await page
    .getByLabel("Dein Ergebnis: Wärmestrom durch zwei Schichten", {
      exact: true,
    })
    .fill("8");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(
    page.getByText("Richtig innerhalb der Rechentoleranz.", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".math-error")).toHaveCount(0);
});
test("Lernbrücke übersteht Neuladen und erhält Antwort und Einheit", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Rechenaufgaben üben →", exact: true })
    .click();
  await page
    .getByLabel("Dein Ergebnis: Sensible Wärmeleistung", { exact: true })
    .fill("10,45");
  await page
    .getByLabel("Einheit für Sensible Wärmeleistung", { exact: true })
    .selectOption("W");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(
    page.getByRole("complementary", { name: "Intelligente Lernbrücke" }),
  ).toContainText("mögliche Einheitenverwechslung");
  await page
    .getByRole("button", { name: "Empfohlene Grundlage öffnen", exact: true })
    .click();
  await page.reload();
  await page
    .getByRole("button", { name: "Rechenaufgaben üben →", exact: true })
    .click();
  await expect(
    page.getByRole("region", { name: "Eingeblendete Grundlagenlektion" }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "Zur ursprünglichen Aufgabe zurück",
      exact: true,
    })
    .click();
  await expect(
    page.getByLabel("Dein Ergebnis: Sensible Wärmeleistung", { exact: true }),
  ).toHaveValue("10,45");
  await expect(
    page.getByLabel("Einheit für Sensible Wärmeleistung", { exact: true }),
  ).toHaveValue("W");
  await expect(
    page.getByLabel("Dein Ergebnis: Sensible Wärmeleistung", { exact: true }),
  ).toBeFocused();
  await page
    .getByLabel("Einheit für Sensible Wärmeleistung", { exact: true })
    .selectOption("kW");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(
    page.getByText("Richtig innerhalb der Rechentoleranz.", { exact: true }),
  ).toBeVisible();
});
test("Eine Fallstudie verlangt neben Rechnungen eine fachliche Entscheidung", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page
    .getByLabel("Fachgebiet", { exact: true })
    .selectOption("thermodynamik");
  await page
    .getByRole("button", {
      name: /Lernfall: Zwei thermische Modelle vergleichen/,
    })
    .click();
  const flow = page.getByRole("region", { name: "Mehrstufige Fallstudie" });
  await flow
    .getByLabel("Dein Ergebnis: Wärmestrom durch eine ebene Schicht", {
      exact: true,
    })
    .fill("16");
  await flow
    .getByRole("button", { name: "Fallschritt prüfen", exact: true })
    .click();
  await flow
    .getByRole("button", { name: "Nächster Fallschritt", exact: true })
    .click();
  await flow
    .getByLabel("Dein Ergebnis: Wärmestrom durch zwei Schichten", {
      exact: true,
    })
    .fill("8");
  await flow
    .getByRole("button", { name: "Fallschritt prüfen", exact: true })
    .click();
  await flow
    .getByRole("button", { name: "Nächster Fallschritt", exact: true })
    .click();
  await flow
    .getByRole("radio", {
      name: "Nein, reale Wärmewege, Feuchte und Betriebsbedingungen sind zusätzlich zu prüfen.",
      exact: true,
    })
    .check();
  await flow
    .getByRole("button", { name: "Fallschritt prüfen", exact: true })
    .click();
  await flow
    .getByRole("button", { name: "Fall auswerten", exact: true })
    .click();
  await expect(flow).toContainText(
    "3 von 3 zuletzt geprüften Antworten richtig",
  );
  await expect(page.locator(".math-error")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("Aussagenbelege sind datiert und bei großer Schrift per Tastatur zugänglich", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page.getByLabel("Fachgebiet", { exact: true }).selectOption("elektro");
  await page
    .getByRole("button", {
      name: /ELEKTRO.*Wechselstrom: Sinus, Zeit und Effektivwert/,
    })
    .click();
  const summary = page.locator(".claim-evidence > summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  const claim = page.locator(".claim-evidence details").filter({
    has: page.getByText("claim-ac-rms · Vereinfachtes Rechenmodell", {
      exact: true,
    }),
  });
  await claim.locator("summary").click();
  await expect(claim).toContainText("m58490");
  await expect(claim).toContainText("2026-10-28");
  await expect(claim).toContainText("Menschliche Fachprüfung erforderlich");
  await page.addStyleTag({ content: "html{font-size:200%}" });
  await expect(
    page.getByRole("img", { name: /Normierte Spannung und/ }),
  ).toBeVisible();
  const layout = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: innerWidth,
    outside: Array.from(document.querySelectorAll(".learning-module *"))
      .filter(
        (el) =>
          el.getBoundingClientRect().right > innerWidth + 1 &&
          !el.closest(".math-display"),
      )
      .slice(0, 8)
      .map((el) => ({
        tag: el.tagName,
        cls: el.className,
        text: el.textContent?.slice(0, 100),
        right: el.getBoundingClientRect().right,
      })),
  }));
  expect(layout.width, JSON.stringify(layout)).toBeLessThanOrEqual(
    layout.viewport,
  );
  await expect(page.locator(".math-error")).toHaveCount(0);
});
test("Suche nach Leistungsfaktor führt über das gemeinsame Glossar zu den Fachmodulen", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page
    .getByRole("searchbox", {
      name: "Module oder Fachbegriffe suchen",
      exact: true,
    })
    .fill("Leistungsfaktor");
  await expect(
    page.getByRole("heading", { name: "Leistungsfaktor", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: /ELEKTRO.*Wirk-, Blind- und Scheinleistung/,
    }),
  ).toBeVisible();
});
