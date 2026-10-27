import { test, expect, type Page } from "@playwright/test";
import { articles, questions } from "../src/content";

const errors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") messages.push(message.text());
  });
  await page.goto("./");
});
test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});

async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

test("Navigation und Projekt-Assets funktionieren auf allen Bildschirmgrößen", async ({
  page,
}, testInfo) => {
  await expect(page.getByRole("heading", { name: /Willkommen/ })).toBeVisible();
  const paths = await page
    .locator('script[src], link[rel="stylesheet"], link[rel="icon"]')
    .evaluateAll((nodes) =>
      nodes.map(
        (node) => node.getAttribute("src") ?? node.getAttribute("href")!,
      ),
    );
  expect(paths.length).toBeGreaterThan(0);
  for (const path of paths) {
    expect(path).toMatch(/^\/kaeltemeister-pro\//);
    expect((await page.request.get(path)).status()).toBe(200);
  }
  await page.screenshot({
    path: testInfo.outputPath("dashboard.png"),
    fullPage: true,
  });
  for (const [name, heading] of [
    ["Lernbereich", "Verstehen statt auswendig lernen."],
    ["Wissensquiz", "Dein Wissen auf dem Prüfstand."],
    ["Rechner", "Von der Formel zur Lösung."],
    ["Dashboard", /Willkommen/],
  ] as const) {
    const button = page.getByRole("button", { name, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    await noOverflow(page);
  }
});

test("Artikel bleiben nach Neuladen gelesen und neue Ansichten beginnen oben", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Lernbereich", exact: true }).click();
  for (const article of articles) {
    await page.getByRole("button", { name: new RegExp(article.title) }).click();
    await expect(
      page.getByRole("heading", { name: article.title }),
    ).toBeInViewport();
    await noOverflow(page);
    await page
      .getByRole("button", { name: "Als gelesen markieren", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Als gelesen gespeichert" }),
    ).toBeDisabled();
    await page
      .getByRole("button", { name: "Alle Lerneinheiten", exact: true })
      .click();
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "value",
      String(
        Math.round(((articles.indexOf(article) + 1) / articles.length) * 100),
      ),
    );
  }
  await page.reload();
  await expect(
    page.getByText(`${articles.length} von ${articles.length}`, {
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Fortschritt zurücksetzen" }).click();
  await page.getByRole("button", { name: "Abbrechen" }).click();
  await expect(
    page.getByText(`${articles.length} von ${articles.length}`, {
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Fortschritt zurücksetzen" }).click();
  await page.getByRole("button", { name: "Ja, Fortschritt löschen" }).click();
  await page.reload();
  await expect(
    page.getByText(`0 von ${articles.length}`, { exact: true }),
  ).toBeVisible();
});

test("ein komplettes Quiz speichert das Ergebnis und ein Neustart beginnt leer", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Wissensquiz", exact: true }).click();
  for (const [index, question] of questions.entries()) {
    await expect(
      page.getByRole("button", { name: "Antwort prüfen" }),
    ).toBeDisabled();
    // Gemischtes Ergebnis: die erste Frage falsch, alle anderen richtig.
    const choice =
      index === 0
        ? (question.correct + 1) % question.options.length
        : question.correct;
    await page.locator(".answer").nth(choice).click();
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await expect(page.getByRole("status")).toContainText(question.explanation);
    await expect(page.getByRole("radio").first()).toBeDisabled();
    await noOverflow(page);
    await page
      .getByRole("button", {
        name:
          index === questions.length - 1
            ? "Auswertung ansehen"
            : "Nächste Frage",
      })
      .click();
  }
  await expect(
    page.getByText(
      `Du hast ${questions.length - 1} von ${questions.length} Fragen richtig beantwortet.`,
    ),
  ).toBeVisible();
  await noOverflow(page);
  await page.reload();
  await expect(
    page.getByText(
      `${Math.round(((questions.length - 1) / questions.length) * 100)} %`,
      { exact: true },
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "Wissensquiz", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Antwort prüfen" }),
  ).toBeDisabled();
});

test("Rechner prüft Eingaben, Einheitenwechsel und den sichtbaren Rechenweg", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Rechner", exact: true }).click();
  await page.getByRole("button", { name: "Wärmeleistung berechnen" }).click();
  await expect(page.locator(".result-value")).toHaveText("10,45 kW");
  await page.getByLabel("Einheit Massenstrom").selectOption("kg/h");
  await expect(page.locator(".result-value")).toHaveCount(0);
  await page.locator("#mass").fill("1800");
  await page.getByLabel("Einheit Wärmekapazität").selectOption("J/(kg·K)");
  await page.locator("#cp").fill("4180");
  await page.getByRole("button", { name: "Wärmeleistung berechnen" }).click();
  await expect(page.locator(".result-value")).toHaveText("10,45 kW");
  await expect(page.locator(".result-card")).toContainText(
    "÷ 3.600 = 0,5 kg/s",
  );
  await expect(page.locator(".result-card")).toContainText(
    "÷ 1.000 = 4,18 kJ/(kg·K)",
  );
  await noOverflow(page);
  await page.locator("#delta").fill("-5");
  await page.getByRole("button", { name: "Wärmeleistung berechnen" }).click();
  await expect(page.getByRole("alert")).toContainText("gültige Werte");
  await expect(page.locator(".result-value")).toHaveCount(0);
  await page.locator("#delta").fill("0");
  await page.getByRole("button", { name: "Wärmeleistung berechnen" }).click();
  await expect(page.locator(".result-value")).toHaveText("0 kW");
});

test("Navigation und Quiz sind mit Tastatur bedienbar", async ({ page }) => {
  const quizNavigation = page.getByRole("button", {
    name: "Wissensquiz",
    exact: true,
  });
  await quizNavigation.focus();
  await page.keyboard.press("Enter");
  await expect(quizNavigation).toHaveAttribute("aria-current", "page");
  await page.getByRole("radio").first().focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("radio").first()).toBeChecked();
  await page.getByRole("button", { name: "Antwort prüfen" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText(
    questions[0].explanation,
  );
  await page.getByRole("button", { name: "Nächste Frage" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: questions[1].question }),
  ).toBeVisible();
  await expect(page.locator(".quiz-card")).toBeFocused();
});
