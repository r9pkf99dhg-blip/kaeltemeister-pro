import { test, expect } from "@playwright/test";
test("Qualitativer Kreislauf bleibt ohne erfundene Zahlen bedienbar und speichert die Auswahl", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await page
    .getByRole("button", { name: "Kältekreislauf", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Modell A · Qualitativ verstehen",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Zustand 4", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Zustand 4: Drosselaustritt / Verdampfereintritt",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Expansionsorgan", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Strömungsrichtung animieren", exact: true })
    .click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".cycle-pipe").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await page
    .getByRole("button", { name: "Strömungsbewegung pausieren", exact: true })
    .click();
  await page.reload();
  await page
    .getByRole("button", { name: "Kältekreislauf", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Zustand 4", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("button", { name: "Expansionsorgan", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.addStyleTag({ content: "html{font-size:200%}" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("Referenzanbieter funktioniert im Pages-Produktionsbuild ohne externen Stoffdatenabruf", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4175/")) external.push(r.url());
  });
  await page.goto("./");
  const start = Date.now();
  await page
    .getByRole("button", { name: "Kältekreislauf", exact: true })
    .click();
  await page
    .getByText("Herkunft und Grenzen der Referenzdaten", { exact: true })
    .click();
  await expect(
    page.getByText("8 feste R134a-Betriebsfälle mit 32 Zuständen verfügbar.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "CoolProp-Lizenz (MIT)" }),
  ).toHaveAttribute("href", "/kaeltemeister-pro/licenses/CoolProp-MIT.txt");
  expect(external).toEqual([]);
  console.log(
    `Referenzanbieter ${test.info().project.name}: Laden und Anzeige ${Date.now() - start} ms (Browseremulation, kein Apple-Hardwarebenchmark)`,
  );
});

test("Referenzkreis: echte Daten, sichere Grenzen, Massenstromexperiment und Diagrammbedienung", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await page
    .getByRole("button", { name: "Kältekreislauf", exact: true })
    .click();
  await page
    .getByRole("button", { name: "B · R134a-Referenzfälle", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Modell B · Berechnete Referenzfälle",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Fluid-COP = q₀ / w = 4,79934", { exact: true }),
  ).toBeVisible();
  const plot = page.getByRole("group", {
    name: "log-p-h-Diagramm verschieben",
    exact: true,
  });
  await page
    .getByLabel("Betriebsfall auswählen", { exact: true })
    .selectOption("r134a-eta075-v1");
  await expect(
    page.getByText(/verbindet die gestrichelte Verdichterlinie nur/),
  ).toBeVisible();
  await expect(page.getByTestId("process-1")).toHaveAttribute(
    "stroke-dasharray",
    "6 5",
  );
  await page
    .getByLabel("Betriebsfall auswählen", { exact: true })
    .selectOption("r134a-basis-v1");
  await page.getByLabel("Massenstrom ṁ [kg/s]", { exact: true }).fill("0,1");
  await page.getByLabel("Vorhersage", { exact: true }).selectOption("up");
  await page
    .getByRole("button", {
      name: "Vorhersage prüfen und übernehmen",
      exact: true,
    })
    .click();
  await expect(page.getByText(/Die Vorhersage passt:/)).toBeVisible();
  await expect(
    page.getByText("Fluid-COP = q₀ / w = 4,79934", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Massenstrom ṁ [kg/s]", { exact: true }).fill("-1");
  await expect(
    page.getByRole("alert").filter({ hasText: "zwischen 0 und 1" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Diagramm vergrößern", exact: true })
    .click();
  await expect(page.getByLabel("Vergrößerung", { exact: true })).toHaveText(
    "2×",
  );
  await plot.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Home");
  await expect(page.getByLabel("Vergrößerung", { exact: true })).toHaveText(
    "1×",
  );
  await page
    .getByLabel("Diagrammaufgabe auswählen", { exact: true })
    .selectOption("refrig-compare-v08");
  await page
    .getByRole("button", { name: "Diagrammaufgabe bearbeiten", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Prozessvergleich: höhere Verflüssigungstemperatur",
      exact: true,
    }),
  ).toBeVisible();
  await page.reload();
  await page
    .getByRole("button", { name: "Kältekreislauf", exact: true })
    .click();
  await expect(
    page.getByLabel("Betriebsfall auswählen", { exact: true }),
  ).toHaveValue("r134a-basis-v1");
  await expect(
    page.getByLabel("Massenstrom ṁ [kg/s]", { exact: true }),
  ).toHaveValue("-1");
  await expect(page.getByText(/Aktuell bestätigt: 0,1 kg/)).toBeVisible();
  expect(
    await page
      .locator(".ph-plot path")
      .evaluateAll((nodes) =>
        nodes.every((n) => !/(NaN|Infinity)/.test(n.getAttribute("d") ?? "")),
      ),
  ).toBe(true);
  await page.addStyleTag({ content: "html{font-size:200%}" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
