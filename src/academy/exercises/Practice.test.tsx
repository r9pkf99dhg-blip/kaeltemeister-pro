import { beforeEach, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { ACADEMY_KEY } from "../progress";
beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  window.scrollTo = vi.fn();
});
it("öffnet Aufgaben direkt aus dem Dashboard und wertet ungültige Eingaben nicht als Versuch", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(
    screen.getByRole("button", { name: "Rechenaufgaben üben →" }),
  );
  expect(
    screen.getByRole("heading", { name: "Technische Rechenaufgaben" }),
  ).toBeInTheDocument();
  const input = screen.getByLabelText("Dein Ergebnis: Sensible Wärmeleistung");
  await user.type(input, "abc");
  await user.click(screen.getByRole("button", { name: "Ergebnis prüfen" }));
  expect(screen.getByRole("alert")).toHaveTextContent("endliche");
  expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!).performance).toEqual(
    {},
  );
  await user.clear(input);
  await user.type(input, "10,45");
  await user.click(screen.getByRole("button", { name: "Ergebnis prüfen" }));
  expect(screen.getByRole("status")).toHaveTextContent("Richtig");
  expect(
    screen.getByRole("heading", { name: "Schrittweise Musterlösung" }),
  ).toBeInTheDocument();
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).performance[
      "calc-heat-water"
    ],
  ).toMatchObject({ attempts: 1, correctCount: 1 });
});
it("erklärt eine neue Schwäche im Dashboard mit Bezug zum Thema", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(
    screen.getByRole("button", { name: "Rechenaufgaben üben →" }),
  );
  await user.type(
    screen.getByLabelText("Dein Ergebnis: Sensible Wärmeleistung"),
    "1",
  );
  await user.click(screen.getByRole("button", { name: "Ergebnis prüfen" }));
  await user.click(screen.getByRole("button", { name: "Dashboard" }));
  const dashboard = screen.getByRole("region", {
    name: "Persönliches Lern-Dashboard",
  });
  expect(
    within(dashboard).getByText(/Mindestens eine letzte Antwort war falsch/),
  ).toBeInTheDocument();
  expect(
    within(dashboard).getByText("0/1 bewertete Versuche richtig."),
  ).toBeInTheDocument();
});
it("kennzeichnet den Prüfungsmodus, weist fehlende Inhalte zurück und zeigt vor Abgabe keine Lösungen", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(
    screen.getByRole("button", { name: "Übungsprüfung öffnen →" }),
  );
  expect(
    screen.getByText(/Keine offiziellen Meisterprüfungsaufgaben/),
  ).toBeInTheDocument();
  await user.selectOptions(
    screen.getByLabelText("Fachgebiet der Übungsprüfung"),
    "lueftung",
  );
  await user.click(
    screen.getByRole("button", { name: "Übungsprüfung starten" }),
  );
  expect(screen.getByRole("alert")).toHaveTextContent("beide Fragetypen");
  await user.selectOptions(
    screen.getByLabelText("Fachgebiet der Übungsprüfung"),
    "elektro",
  );
  await user.click(
    screen.getByRole("button", { name: "Übungsprüfung starten" }),
  );
  expect(screen.getByRole("timer")).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Schrittweise Musterlösung" }),
  ).not.toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Prüfung abschließen und auswerten" }),
  );
  expect(
    screen.getByRole("heading", { name: "Ergebnis: 0 %" }),
  ).toBeInTheDocument();
  expect(screen.getAllByText("Nicht beantwortet")).toHaveLength(6);
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).examHistory,
  ).toHaveLength(1);
});
