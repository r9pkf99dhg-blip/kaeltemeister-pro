import { it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { ACADEMY_KEY } from "../academy/progress";
beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn();
});
it("verwendet dasselbe Rechenblatt, erhält Missionsposition und Hilfe und erlaubt einen neuen unabhängigen Abrufversuch", async () => {
  const user = userEvent.setup(),
    v = render(<App />);
  await user.click(screen.getByRole("button", { name: "Mastery" }));
  await screen.findByRole("heading", { name: "KälteMeister Mastery" });
  await user.click(
    screen.getByRole("button", {
      name: "4 · Den Kreisprozess selbst berechnen öffnen",
    }),
  );
  await user.selectOptions(screen.getByLabelText("Missionsschritt"), "1");
  await user.type(
    screen.getByLabelText("Rechenblatt: Verwendete Formel"),
    "q0 = h1 - h4",
  );
  await user.click(screen.getByRole("button", { name: "Hinweis 1" }));
  await user.type(
    screen.getByLabelText("Dein Ergebnis: Spezifischer Wärmeeintrag"),
    "152,30839",
  );
  await user.click(
    screen.getByRole("button", { name: "Werkstatt-Ergebnis prüfen" }),
  );
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).performance[
      "refrig-basis-q0-v08"
    ].support.hint,
  ).toBe(1);
  expect(
    screen.queryByText("Fachliche Aufgabenbedingungen erfüllt."),
  ).toBeNull();
  v.unmount();
  render(<App />);
  await user.click(
    screen.getByRole("button", { name: "Fachmission fortsetzen" }),
  );
  await screen.findByRole("heading", { name: "KälteMeister Mastery" });
  expect(screen.getByLabelText("Missionsschritt")).toHaveValue("1");
  expect(screen.getByLabelText("Rechenblatt: Verwendete Formel")).toHaveValue(
    "q0 = h1 - h4",
  );
  await user.click(
    screen.getByRole("button", {
      name: "Neuen Abrufversuch ohne geöffnete Hilfe beginnen",
    }),
  );
  expect(
    screen.getByLabelText("Dein Ergebnis: Spezifischer Wärmeeintrag"),
  ).toHaveValue("");
  await user.type(
    screen.getByLabelText("Dein Ergebnis: Spezifischer Wärmeeintrag"),
    "152,30839",
  );
  await user.click(
    screen.getByRole("button", { name: "Werkstatt-Ergebnis prüfen" }),
  );
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).performance[
      "refrig-basis-q0-v08"
    ].support,
  ).toMatchObject({ hint: 1, independent: 1 });
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).mastery.evidence[
      "refrig-basis-q0-v08"
    ].spacedAt,
  ).toBeUndefined();
});
