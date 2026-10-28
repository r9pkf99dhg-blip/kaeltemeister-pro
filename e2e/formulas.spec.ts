import { test, expect } from "@playwright/test";
test("echte Brüche und migrierte Musterlösungen sind schmal lesbar und per Tastatur erreichbar", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await page
    .getByRole("button", { name: "Rechenaufgaben üben →", exact: true })
    .click();
  await page
    .getByLabel("Aufgabe wählen", { exact: true })
    .selectOption("calc-mass-flow");
  await expect(page.locator(".task-reference mfrac")).toHaveCount(1);
  await page
    .getByLabel("Dein Ergebnis: Massenstrom", { exact: true })
    .fill("0,5");
  await page
    .getByRole("button", { name: "Ergebnis prüfen", exact: true })
    .click();
  await expect(
    page.getByText("Richtig innerhalb der Rechentoleranz.", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".task-solution mfrac")).toHaveCount(1);
  await expect(page.locator(".task-solution details")).toHaveCount(3);
  await expect(
    page.locator(".task-solution details").nth(1),
  ).not.toHaveAttribute("open");
  await page
    .locator(".task-solution details")
    .nth(1)
    .locator("summary")
    .click();
  await expect(page.locator(".task-solution details").nth(1)).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".math-error")).toHaveCount(0);
  const formula = page.locator(".math-display").first();
  await formula.focus();
  await expect(formula).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
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
