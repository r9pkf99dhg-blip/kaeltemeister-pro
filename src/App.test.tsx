import { beforeEach, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { articles, questions } from "./content";
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
  expect(screen.getByText(`1 von ${articles.length}`)).toBeInTheDocument();
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
    screen.getByText(
      `Du hast ${questions.length} von ${questions.length} Fragen richtig beantwortet.`,
    ),
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
  expect(screen.getByText(`1 von ${articles.length}`)).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Fortschritt zurücksetzen" }),
  );
  await user.click(
    within(
      screen.getByRole("region", { name: "Fortschritt zurücksetzen" }),
    ).getByRole("button", { name: "Ja, Fortschritt löschen" }),
  );
  expect(screen.getByText(`0 von ${articles.length}`)).toBeInTheDocument();
});
it("zeigt bei gesperrtem Speicher einen verständlichen Hinweis", () => {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  render(<App />);
  expect(screen.getByRole("alert")).toHaveTextContent(
    "konnte nicht geladen oder gespeichert werden",
  );
});

it("zählt einen schlechteren abgeschlossenen Versuch genau einmal und erhält den Bestwert", async () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ read: [], attempts: 1, best: 100, last: 100 }),
  );
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Wissensquiz" }));
  for (let i = 0; i < questions.length; i++) {
    const wrong = (questions[i].correct + 1) % questions[i].options.length;
    await user.click(
      screen.getByRole("radio", { name: questions[i].options[wrong] }),
    );
    await user.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    expect(screen.getByRole("status")).toHaveTextContent("Noch nicht ganz.");
    for (const radio of screen.getAllByRole("radio"))
      expect(radio).toBeDisabled();
    await user.click(
      screen.getByRole("button", {
        name:
          i === questions.length - 1 ? "Auswertung ansehen" : "Nächste Frage",
      }),
    );
  }
  expect(
    screen.getByText(
      `Du hast 0 von ${questions.length} Fragen richtig beantwortet.`,
    ),
  ).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({
    attempts: 2,
    best: 100,
    last: 0,
  });
  await user.click(screen.getByRole("button", { name: "Dashboard" }));
  await user.click(screen.getByRole("button", { name: "Wissensquiz" }));
  expect(
    screen.getByText(`FRAGE 1 VON ${questions.length}`),
  ).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).attempts).toBe(2);
});

it("speichert abgebrochene Quizrunden nicht als Versuch", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Wissensquiz" }));
  await user.click(screen.getAllByRole("radio")[0]);
  await user.click(screen.getByRole("button", { name: "Antwort prüfen" }));
  await user.click(screen.getByRole("button", { name: "Nächste Frage" }));
  await user.click(screen.getByRole("button", { name: "Dashboard" }));
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({
    attempts: 0,
    best: 0,
    last: null,
  });
  await user.click(screen.getByRole("button", { name: "Wissensquiz" }));
  expect(
    screen.getByText(`FRAGE 1 VON ${questions.length}`),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Antwort prüfen" })).toBeDisabled();
});

it("rechnet Einheitenwechsel korrekt und verwirft dabei alte Ergebnisse", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Rechner" }));
  await user.click(
    screen.getByRole("button", { name: "Wärmeleistung berechnen" }),
  );
  await user.selectOptions(
    screen.getByLabelText("Einheit Massenstrom"),
    "kg/h",
  );
  expect(screen.queryByText("DEIN ERGEBNIS")).not.toBeInTheDocument();
  const mass = screen.getByLabelText(/Massenstrom/, { selector: "input" });
  await user.clear(mass);
  await user.type(mass, "1800");
  await user.selectOptions(
    screen.getByLabelText("Einheit Wärmekapazität"),
    "J/(kg·K)",
  );
  const cp = screen.getByLabelText(/Spezifische Wärmekapazität/);
  await user.clear(cp);
  await user.type(cp, "4180");
  await user.click(
    screen.getByRole("button", { name: "Wärmeleistung berechnen" }),
  );
  expect(
    screen.getByText("10,45", { exact: false, selector: ".result-value" }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/1800 kg\/h ÷ 3.600 = 0,5 kg\/s/),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/4180 J\/\(kg·K\) ÷ 1.000 = 4,18/),
  ).toBeInTheDocument();
});

it("bleibt bei beschädigtem Fortschritt bedienbar und speichert danach gültige Daten", async () => {
  localStorage.setItem(STORAGE_KEY, "kein JSON");
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getByText(`0 von ${articles.length}`)).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Lernbereich" }));
  expect(screen.getByRole("progressbar")).toHaveAttribute("value", "0");
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).read).toEqual([]);
});

it("überschreibt bei einem Lesefehler keine vorhandenen Daten, auch nach weiteren Lernaktionen", async () => {
  const saved = { read: ["kreislauf"], attempts: 2, best: 75, last: 50 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  const getter = vi
    .spyOn(Storage.prototype, "getItem")
    .mockImplementation(() => {
      throw new Error("temporarily unreadable");
    });
  const setter = vi.spyOn(Storage.prototype, "setItem");
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getByRole("alert")).toHaveTextContent("Lesefehler");
  await user.click(screen.getByRole("button", { name: "Lernbereich" }));
  await user.click(
    screen.getByRole("button", { name: /Überhitzung richtig einordnen/ }),
  );
  await user.click(
    screen.getByRole("button", { name: "Als gelesen markieren" }),
  );
  expect(setter).not.toHaveBeenCalled();
  getter.mockRestore();
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(saved);
});
