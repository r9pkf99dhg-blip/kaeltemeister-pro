import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import {
  emptyAcademy,
  markRead,
  answerQuestion,
  reviewCard,
} from "../src/academy/progress";
import {
  createExam,
  finishExam,
  setExamAnswer,
} from "../src/academy/exams/engine";
import { academyQuestions, flashcards } from "../src/academy/catalog";
import type { AcademyProgress } from "../src/academy/model";
const key = "kaeltemeister-pro:progress:v3";
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
function fixture() {
  const now = new Date();
  let p = markRead(emptyAcademy(), "electric-quantities", "grundlagen", now);
  p = answerQuestion(
    p,
    academyQuestions[0].id,
    academyQuestions[0].correctOptionId,
    now,
  );
  p = reviewCard(p, flashcards[0].id, true, now);
  p = {
    ...p,
    activeExam: createExam(p, "elektro", "grundlagen", 5, now, "backup-exam"),
  };
  const choice = p.activeExam!.snapshots.find(
    (s) => s.item.kind === "choice",
  )!.item;
  p = setExamAnswer(
    p,
    choice.id,
    { value: choice.kind === "choice" ? choice.correctOptionId : "", unit: "" },
    now,
  );
  return finishExam(p, now);
}
async function seed(page: Page, progress: AcademyProgress) {
  await page.addInitScript(
    ({ key, progress }) => {
      if (!localStorage.getItem(key))
        localStorage.setItem(key, JSON.stringify(progress));
    },
    { key, progress },
  );
}

test("echter Datei-Download und bestätigter Import erhalten vollständige Lern- und Prüfungsdaten", async ({
  page,
}) => {
  const original = fixture();
  await seed(page, original);
  await page.goto("./");
  await page
    .getByRole("button", { name: "Sicherung erstellen", exact: true })
    .click();
  const downloaded = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Sicherungsdatei herunterladen", exact: true })
    .click();
  const download = await downloaded;
  expect(download.suggestedFilename()).toMatch(/^kaeltemeister-pro-.*\.json$/);
  const raw = await readFile((await download.path())!, "utf8");
  const backup = JSON.parse(raw);
  expect(backup.data.academy).toEqual(original);
  await page
    .getByRole("button", { name: "Fortschritt zurücksetzen", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Ja, Fortschritt löschen", exact: true })
    .click();
  expect(
    await page.evaluate(
      (k) => JSON.parse(localStorage.getItem(k)!).examHistory.length,
      key,
    ),
  ).toBe(0);
  await page
    .getByLabel("Sicherungsdatei auswählen", { exact: false })
    .setInputFiles({
      name: "sicherung.json",
      mimeType: "application/json",
      buffer: Buffer.from(raw),
    });
  await expect(
    page.getByRole("heading", { name: "Vorschau – noch nichts geändert" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Bestätigte Sicherung wiederherstellen" }),
  ).toBeDisabled();
  expect(
    await page.evaluate(
      (k) => JSON.parse(localStorage.getItem(k)!).examHistory.length,
      key,
    ),
  ).toBe(0);
  await page
    .getByRole("checkbox", {
      name: "Ich möchte die vorhandenen Lerndaten durch diese Sicherung ersetzen.",
    })
    .check();
  await page
    .getByRole("button", { name: "Bestätigte Sicherung wiederherstellen" })
    .click();
  await expect(
    page.getByText(
      "Datensicherung erfolgreich wiederhergestellt. Der importierte Lernstand ist jetzt aktiv.",
    ),
  ).toBeVisible();
  expect(
    await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), key),
  ).toEqual(original);
  await page.reload();
  expect(
    await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), key),
  ).toEqual(original);
  await noOverflow(page);
});

test("fehlerhafte und unbekannte Sicherungen verändern keine vorhandenen Daten", async ({
  page,
}) => {
  await seed(page, fixture());
  await page.goto("./");
  const before = await page.evaluate((k) => localStorage.getItem(k), key);
  for (const [raw, message] of [
    ["{", "kein gültiges JSON"],
    [
      JSON.stringify({ format: "kaeltemeister-pro-backup", schemaVersion: 99 }),
      "wird nicht unterstützt",
    ],
    [
      JSON.stringify({ format: "kaeltemeister-pro-backup", schemaVersion: 1 }),
      "Pflichtfelder",
    ],
  ]) {
    await page
      .getByLabel("Sicherungsdatei auswählen", { exact: false })
      .setInputFiles({
        name: "kaputt.json",
        mimeType: "application/json",
        buffer: Buffer.from(raw),
      });
    await expect(page.getByRole("alert")).toContainText(message);
    await expect(
      page.getByRole("heading", { name: "Vorschau – noch nichts geändert" }),
    ).toHaveCount(0);
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBe(
      before,
    );
  }
});

test("Elektro-Lernpfad ist vollständig navigierbar, rechnet mit Komma und erhält Lesestände", async ({
  page,
}, info) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page.getByLabel("Fachgebiet", { exact: true }).selectOption("elektro");
  await expect(page.getByRole("status")).toContainText(
    "10 verfügbare Lernmodule",
  );
  for (const title of [
    "Elektrische Grundgrößen",
    "Spannung, Strom und Widerstand",
    "Ohmsches Gesetz sicher anwenden",
    "Elektrische Leistung und Arbeit",
    "Reihen- und Parallelschaltungen",
  ]) {
    await page
      .getByRole("button", { name: new RegExp(`ELEKTROTECHNIK.*${title}`) })
      .click();
    for (const heading of [
      "Lernziele",
      "Verständnisfragen",
      "Karteikarten",
      "Technische Rechenaufgaben",
      "Quellen und fachlicher Prüfstatus",
    ])
      await expect(
        page.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Niveau als gelesen markieren",
        exact: true,
      })
      .click();
    await noOverflow(page);
    await page
      .getByRole("button", { name: "Zur Modulübersicht", exact: true })
      .click();
  }
  await page
    .getByRole("button", {
      name: /ELEKTROTECHNIK.*Spannung, Strom und Widerstand/,
    })
    .click();
  await page
    .getByLabel("Dein Ergebnis: Stromstärke", { exact: true })
    .fill("0,2");
  const button = page.getByRole("button", {
    name: "Ergebnis prüfen",
    exact: true,
  });
  await button.focus();
  await expect(button).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText(/Richtig innerhalb der Rechentoleranz/),
  ).toBeVisible();
  await page.screenshot({
    path: info.outputPath("elektro-modul.png"),
    fullPage: true,
  });
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Lernakademie", exact: true }),
  ).toBeVisible();
  await page.goForward();
  await expect(
    page.getByRole("heading", {
      name: "Spannung, Strom und Widerstand",
      exact: true,
    }),
  ).toBeVisible();
  await page.reload();
  const stored = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  );
  expect(Object.keys(stored.read)).toHaveLength(5);
  expect(stored.exerciseAnswers["el-ohm-current-a"].correct).toBe(true);
});

test("Änderungen in einem anderen Tab sperren veraltete Schreibzugriffe", async ({
  page,
  context,
}) => {
  await page.goto("./");
  const other = await context.newPage();
  await other.goto("./");
  await other.getByRole("button", { name: "Akademie", exact: true }).click();
  await other
    .getByRole("button", { name: /ELEKTROTECHNIK.*Elektrische Grundgrößen/ })
    .click();
  await other
    .getByRole("button", { name: "Niveau als gelesen markieren", exact: true })
    .click();
  await expect(
    page.getByText(/Lerndaten wurden in einem anderen Tab geändert/),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sicherung erstellen", exact: true }),
  ).toBeDisabled();
  await page.reload();
  expect(
    await page.evaluate(
      (k) =>
        JSON.parse(localStorage.getItem(k)!).read["electric-quantities"].levels,
      key,
    ),
  ).toEqual(["grundlagen"]);
  await other.close();
});

test("große Schrift und technische Formeln bleiben auf kleinen Ansichten lesbar", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Akademie", exact: true }).click();
  await page
    .getByRole("button", {
      name: /ELEKTROTECHNIK.*Reihen- und Parallelschaltungen/,
    })
    .click();
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  await noOverflow(page);
  await page
    .getByRole("button", { name: "Meisterniveau", exact: true })
    .click();
  await noOverflow(page);
  await expect(
    page.getByRole("heading", { name: "Formeln und Einheiten" }),
  ).toBeVisible();
});
