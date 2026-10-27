import { test, expect, type Page } from "@playwright/test";
import { academyQuestions, modules } from "../src/academy/catalog";
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
test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});
async function academy(page: Page) {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
}
async function cycle(page: Page) {
  await page
    .getByRole("button", {
      name: /KÄLTETECHNIK · 01 Grundlagen des Kältekreislaufs/,
    })
    .click();
}
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

test("Akademie migriert Altfortschritt und zeigt alle drei Niveaus", async ({
  page,
}, info) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("kaeltemeister-pro:progress:v3"))
      localStorage.setItem(
        "kaeltemeister-pro:progress:v1",
        JSON.stringify({
          read: ["kreislauf"],
          attempts: 1,
          best: 75,
          last: 75,
        }),
      );
  });
  await academy(page);
  await expect(
    page.getByRole("heading", { name: "Lernakademie", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("progressbar", { name: "Akademie-Lesefortschritt" }),
  ).toHaveAttribute("value", "1");
  await noOverflow(page);
  await page.screenshot({
    path: info.outputPath("academy.png"),
    fullPage: true,
  });
  await cycle(page);
  await page.screenshot({ path: info.outputPath("module-top.png") });
  for (const [name, level] of [
    ["Grundlagen", "grundlagen"],
    ["Fachkraft", "fachkraft"],
    ["Meisterniveau", "meister"],
  ] as const) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(
      page.getByText(modules[0].levels[level].explanation, { exact: true }),
    ).toBeVisible();
    await noOverflow(page);
  }
  await page
    .getByRole("button", { name: "Niveau als gelesen markieren" })
    .click();
  await expect(
    page.getByRole("button", { name: "Dieses Niveau ist gelesen" }),
  ).toBeDisabled();
  await expect(
    page.getByText(/Status: unabhängige Fachprüfung ausstehend/),
  ).toBeVisible();
  const saved = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  );
  expect(saved.read["cycle-basics"].levels).toEqual(["grundlagen", "meister"]);
  expect(saved.legacySummary.best).toBe(75);
  await page.getByRole("button", { name: "Zur Modulübersicht" }).click();
  await expect(
    page.getByRole("heading", { name: "Lernakademie", exact: true }),
  ).toBeInViewport();
  await page.getByRole("searchbox").fill("ENTHALPIE");
  await expect(
    page.getByRole("heading", { name: "Enthalpie", exact: true }),
  ).toBeVisible();
  await page.getByLabel("Fachgebiet", { exact: true }).selectOption("elektro");
  await expect(
    page.getByText("Hier gibt es noch keine passenden Lernmodule."),
  ).toBeVisible();
  await page.getByText("Elektrotechnik", { exact: true }).last().click();
  await expect(
    page.getByText("Gleichstrom und Wechselstrom · Noch nicht ausgearbeitet"),
  ).toBeVisible();
  await noOverflow(page);
});

test("Modulquiz speichert Antworten und erhält Empfehlungen bei niedriger Trefferquote", async ({
  page,
}) => {
  await academy(page);
  await cycle(page);
  const question = academyQuestions[0];
  const wrong = question.options.find(
    (option) => option.id !== question.correctOptionId,
  )!;
  await page.getByRole("radio", { name: wrong.text, exact: true }).check();
  await page
    .getByRole("button", { name: "Antwort prüfen", exact: true })
    .first()
    .click();
  await expect(
    page.getByText("Noch nicht richtig.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(question.explanation, { exact: true }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page.getByLabel("Lernstatus", { exact: true }).selectOption("practice");
  await expect(page.getByRole("status")).toContainText(
    "1 verfügbare Lernmodule",
  );
  await cycle(page);
  await expect(page.getByText(/Zuletzt gespeichert:/)).toContainText(
    wrong.text,
  );
  await page
    .getByRole("radio", {
      name: question.options.find(
        (option) => option.id === question.correctOptionId,
      )!.text,
      exact: true,
    })
    .check();
  await page
    .getByRole("button", { name: "Antwort prüfen", exact: true })
    .first()
    .click();
  await expect(page.getByText("Richtig.", { exact: true })).toBeVisible();
  await noOverflow(page);
  await page.getByRole("button", { name: "Zur Modulübersicht" }).click();
  await expect(page.getByRole("status")).toContainText(
    "1 verfügbare Lernmodule",
  );
});

test("Karteikarten verlangen eine Rückseite und planen zuverlässig eine Wiederholung", async ({
  page,
}) => {
  await academy(page);
  await page.getByRole("button", { name: /Karteikarten wiederholen/ }).click();
  await expect(
    page.getByRole("button", { name: "Gewusst", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Antwort zeigen", exact: true })
    .click();
  await expect(page.locator(".flashcard-back")).toBeVisible();
  await page.getByRole("button", { name: "Gewusst", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Wiederholung in 1 Tag");
  await noOverflow(page);
  await page.reload();
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await expect(
    page.getByRole("button", {
      name: "Karteikarten wiederholen (19)",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Fortschritt zurücksetzen" }).click();
  await page.getByRole("button", { name: "Ja, Fortschritt löschen" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await expect(
    page.getByRole("button", {
      name: "Karteikarten wiederholen (20)",
      exact: true,
    }),
  ).toBeVisible();
});

test("unbekannte Akademie-Datenversion bleibt trotz Lernaktion erhalten", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "kaeltemeister-pro:progress:v3",
      '{"schemaVersion":99}',
    ),
  );
  await academy(page);
  await cycle(page);
  await expect(page.getByRole("alert")).toContainText("nicht überschrieben");
  await page
    .getByRole("button", { name: "Niveau als gelesen markieren" })
    .click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBe(
    '{"schemaVersion":99}',
  );
  await noOverflow(page);
});

test("bestehende Artikel führen zur passenden Akademie-Vertiefung", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Lernbereich", exact: true }).click();
  await page
    .getByRole("button", { name: /Den Kältekreislauf verstehen/ })
    .click();
  await page
    .getByRole("button", { name: /Dieses Thema in der Akademie vertiefen/ })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Grundlagen des Kältekreislaufs",
      exact: true,
    }),
  ).toBeInViewport();
  await expect(
    page.getByRole("heading", { name: "Verständnisfragen", exact: true }),
  ).toBeVisible();
  await noOverflow(page);
});
