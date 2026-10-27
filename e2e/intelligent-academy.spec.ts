import { test, expect, type Page } from "@playwright/test";
import { emptyAcademy } from "../src/academy/progress";
import { createExam } from "../src/academy/exams/engine";
const key = "kaeltemeister-pro:progress:v3";
const errors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") messages.push(message.text());
  });
});
test.afterEach(async ({ page }) => expect(errors.get(page)).toEqual([]));
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
async function openExam(page: Page) {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Übungsprüfung öffnen →", exact: true })
    .click();
}

test("Rechenaufgaben prüfen Einheiten und erklären Schwächen im Dashboard", async ({
  page,
}, info) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Rechenaufgaben üben →", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Technische Rechenaufgaben",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByLabel("Dein Ergebnis: Sensible Wärmeleistung", { exact: true })
    .fill("1");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Noch nicht richtig");
  await expect(
    page.getByRole("heading", {
      name: "Schrittweise Musterlösung",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Aufgabe wählen", exact: true })
    .selectOption("calc-mass-flow");
  await page
    .getByLabel("Dein Ergebnis: Massenstrom", { exact: true })
    .fill("1800");
  await page
    .getByLabel("Einheit für Massenstrom", { exact: true })
    .selectOption("kg/h");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Richtig innerhalb");
  await noOverflow(page);
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  const dashboard = page.getByRole("region", {
    name: "Persönliches Lern-Dashboard",
  });
  await expect(
    dashboard.getByText(/Mindestens eine letzte Antwort war falsch/),
  ).toBeVisible();
  await dashboard.screenshot({
    path: info.outputPath("learning-dashboard.png"),
  });
  await noOverflow(page);
  await page.reload();
  expect(
    await page.evaluate(
      (k) =>
        JSON.parse(localStorage.getItem(k)!).performance["calc-heat-water"]
          .lastCorrect,
      key,
    ),
  ).toBe(false);
});

test("gemischte Übungsprüfung wertet korrekt aus und erhält den Verlauf", async ({
  page,
}) => {
  await openExam(page);
  await page
    .getByLabel("Fachgebiet der Übungsprüfung", { exact: true })
    .selectOption("elektro");
  await page.getByLabel("Zeitbegrenzung", { exact: true }).selectOption("5");
  await page
    .getByRole("button", { name: "Übungsprüfung starten", exact: true })
    .click();
  await expect(page.getByRole("timer")).toContainText("Restzeit");
  await expect(
    page.getByText("Keine offiziellen Meisterprüfungsaufgaben.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Schrittweise Musterlösung",
      exact: true,
    }),
  ).toHaveCount(0);
  // Die Prüfung verwendet den erweiterten Pool; Auswahlaufgaben und Zahlen werden je Snapshot beantwortet.
  const snapshots = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!).activeExam.snapshots,
    key,
  );
  for (const { item, expectedSI } of snapshots) {
    if (item.kind === "choice")
      await page
        .locator(`input[name="task-${item.id}"]`)
        .nth(
          item.options.findIndex(
            (o: { id: string }) => o.id === item.correctOptionId,
          ),
        )
        .check();
    else {
      await page
        .locator(`#unit-${item.id}`)
        .selectOption(
          item.quantity === "power"
            ? "W"
            : item.quantity === "current"
              ? "A"
              : item.quantity === "energy"
                ? "J"
                : item.quantity === "voltage"
                  ? "V"
                  : "Ω",
        );
      await page
        .locator(`#result-${item.id}`)
        .fill(String(expectedSI).replace(".", ","));
    }
  }
  await noOverflow(page);
  await page
    .getByRole("button", {
      name: "Prüfung abschließen und auswerten",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "Ergebnis: 100 %", exact: true }),
  ).toBeVisible();
  await noOverflow(page);
  await page.reload();
  await page
    .getByRole("button", { name: "Übungsprüfung öffnen →", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Ergebnis: 100 %", exact: true }),
  ).toBeVisible();
  const progress = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  );
  expect(progress.examHistory).toHaveLength(1);
  expect(progress.activeExam).toBeNull();
});

test("Zeitlimit bleibt nach Neuladen erhalten und automatische Abgabe erfolgt genau einmal", async ({
  page,
}) => {
  const now = new Date("2026-10-27T12:00:00Z");
  const session = createExam(
    emptyAcademy(),
    "elektro",
    "grundlagen",
    5,
    new Date(now.getTime() - 295_000),
    "near-deadline",
  );
  const fixture = { ...emptyAcademy(), activeExam: session };
  await page.clock.install({ time: now });
  await page.clock.pauseAt(new Date(now.getTime() + 1000));
  await page.addInitScript(
    ({ key, fixture }) => {
      if (!localStorage.getItem(key))
        localStorage.setItem(key, JSON.stringify(fixture));
    },
    { key, fixture },
  );
  await openExam(page);
  await page
    .getByLabel("Dein Ergebnis: Elektrische Leistung", { exact: true })
    .fill("48");
  await page.reload();
  await page
    .getByRole("button", { name: "Übungsprüfung öffnen →", exact: true })
    .click();
  await expect(
    page.getByLabel("Dein Ergebnis: Elektrische Leistung", { exact: true }),
  ).toHaveValue("48");
  await page.clock.fastForward(6000);
  await expect(
    page.getByRole("heading", { name: "Ergebnis: 17 %", exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/Zeitlimit erreicht/).first()).toBeVisible();
  await page.clock.fastForward(60_000);
  const progress = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  );
  expect(progress.examHistory).toHaveLength(1);
  expect(progress.activeExam).toBeNull();
  expect(Object.keys(progress.performance)).toHaveLength(1);
});

test("echte v2-Daten werden nach v3 übernommen und als Rückfallbestand erhalten", async ({
  page,
}) => {
  const legacyKey = "kaeltemeister-pro:progress:v2";
  const previous = {
    schemaVersion: 2,
    read: { "cycle-basics": { revision: 1, levels: ["grundlagen"] } },
    answers: {},
    reviews: {},
    legacySummary: { attempts: 2, best: 75, last: 50 },
    updatedAt: null,
  };
  const original = JSON.stringify(previous);
  await page.addInitScript(
    ({ legacyKey, original, key }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(legacyKey, original);
    },
    { legacyKey, original, key },
  );
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await expect(
    page.getByRole("progressbar", {
      name: "Akademie-Lesefortschritt",
      exact: true,
    }),
  ).toHaveAttribute("value", "1");
  expect(await page.evaluate((k) => localStorage.getItem(k), legacyKey)).toBe(
    original,
  );
  const migrated = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  );
  expect(migrated.schemaVersion).toBe(3);
  expect(migrated.performance).toEqual({});
  expect(migrated.legacySummary.best).toBe(75);
});
