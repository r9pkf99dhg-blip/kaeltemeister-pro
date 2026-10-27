import { beforeEach, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { questions } from "./content";
import { STORAGE_KEY } from "./logic";

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  window.scrollTo = vi.fn();
});
it("speichert gelesene Artikel und stellt sie nach Neuladen wieder her", async () => {
  const user = userEvent.setup();
  const view = render(<App />);
  await user.click(screen.getByRole("button", { name: "Lernbereich" }));
  await user.click(
    screen.getByRole("button", { name: /Den Kältekreislauf verstehen/ }),
  );
  await user.click(
    screen.getByRole("button", { name: "Als gelesen markieren" }),
  );
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).read).toEqual([
    "kreislauf",
  ]);
  view.unmount();
  render(<App />);
  expect(screen.getByText("1 von 3")).toBeInTheDocument();
});
it("führt durch ein vollständiges Quiz, erklärt Antworten und behält den Bestwert", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Wissensquiz" }));
  for (let i = 0; i < questions.length; i++) {
    expect(
      screen.getByRole("button", { name: "Antwort prüfen" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("radio", {
        name: questions[i].options[questions[i].correct],
      }),
    );
    await user.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      questions[i].explanation,
    );
    await user.click(
      screen.getByRole("button", {
        name:
          i === questions.length - 1 ? "Auswertung ansehen" : "Nächste Frage",
      }),
    );
  }
  expect(
    screen.getByText("Du hast 12 von 12 Fragen richtig beantwortet."),
  ).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({
    attempts: 1,
    best: 100,
    last: 100,
  });
  await user.click(screen.getByRole("button", { name: "Noch einmal üben" }));
  await user.click(screen.getAllByRole("radio")[0]);
  await user.click(screen.getByRole("button", { name: "Antwort prüfen" }));
  expect(screen.getByRole("status")).toHaveTextContent("Noch nicht ganz.");
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).best).toBe(100);
});
it("berechnet das Beispiel und entfernt veraltete Ergebnisse bei Eingabeänderungen", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Rechner" }));
  await user.click(
    screen.getByRole("button", { name: "Wärmeleistung berechnen" }),
  );
  expect(
    screen.getByText("10,45", { exact: false, selector: ".result-value" }),
  ).toBeInTheDocument();
  await user.clear(screen.getByLabelText(/Massenstrom/, { selector: "input" }));
  expect(screen.queryByText("DEIN ERGEBNIS")).not.toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Wärmeleistung berechnen" }),
  );
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Bitte gib gültige Werte ein",
  );
});
it("löscht Fortschritt erst nach ausdrücklicher Bestätigung", async () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ read: ["kreislauf"], best: 50, attempts: 1, last: 50 }),
  );
  const user = userEvent.setup();
  render(<App />);
  await user.click(
    screen.getByRole("button", { name: "Fortschritt zurücksetzen" }),
  );
  await user.click(screen.getByRole("button", { name: "Abbrechen" }));
  expect(screen.getByText("1 von 3")).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Fortschritt zurücksetzen" }),
  );
  await user.click(
    within(
      screen.getByRole("region", { name: "Fortschritt zurücksetzen" }),
    ).getByRole("button", { name: "Ja, Fortschritt löschen" }),
  );
  expect(screen.getByText("0 von 3")).toBeInTheDocument();
});
it("zeigt bei gesperrtem Speicher einen verständlichen Hinweis", () => {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  render(<App />);
  expect(screen.getByRole("alert")).toHaveTextContent(
    "keine lokale Speicherung",
  );
});
