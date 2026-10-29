import { it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { ACADEMY_KEY } from "../academy/progress";
beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn();
});
it("schaltet Motivation ab, erhält Fachzugang und bewahrt Fokus/Ziel nach Neuladen", async () => {
  const user = userEvent.setup(),
    v = render(<App />);
  await user.click(screen.getByRole("button", { name: "Mastery" }));
  await screen.findByRole("heading", { name: "KälteMeister Mastery" });
  await user.click(screen.getByText("Motivation und Fokus selbst wählen"));
  await user.selectOptions(
    screen.getByLabelText("Motivationsfunktionen"),
    "disabled",
  );
  expect(
    screen.queryByRole("region", { name: "Fachliche Lernmeilensteine" }),
  ).toBeNull();
  expect(
    screen.getByRole("heading", {
      name: "Was deine bisherigen Aktivitäten zeigen",
    }),
  ).toBeInTheDocument();
  await user.click(screen.getByLabelText("Freiwillige Fokusansicht"));
  expect(
    screen.getByRole("button", { name: "Fokusansicht beenden" }),
  ).toBeInTheDocument();
  await user.selectOptions(
    screen.getByLabelText("Persönliches Lernziel"),
    "independent",
  );
  v.unmount();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Mastery" }));
  await screen.findByRole("heading", { name: "KälteMeister Mastery" });
  expect(screen.getByLabelText("Persönliches Lernziel")).toHaveValue(
    "independent",
  );
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).mastery.motivation,
  ).toBe("disabled");
  await user.click(
    screen.getByRole("button", { name: "Fokusansicht beenden" }),
  );
  expect(
    screen.queryByRole("button", { name: "Fokusansicht beenden" }),
  ).toBeNull();
});
it("vergibt für eine leere Lerneinheit keine Erfolgsaussage und erhält die übrigen Lernbereiche", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Mastery" }));
  await screen.findByRole("heading", { name: "KälteMeister Mastery" });
  await user.click(
    screen.getByRole("button", { name: "Lerneinheit beginnen" }),
  );
  await user.click(screen.getByRole("button", { name: "Pause einlegen" }));
  await user.click(
    screen.getByRole("button", { name: "Lerneinheit fortsetzen" }),
  );
  await user.click(
    screen.getByRole("button", { name: "Lerneinheit abschließen" }),
  );
  expect(
    screen.getByText(
      /ist noch keine selbstständige richtige Lösung dokumentiert/,
    ),
  ).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Techniklabor" }));
  expect(
    screen.getByRole("heading", { name: "Techniklabor" }),
  ).toBeInTheDocument();
});
