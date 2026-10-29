import { expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { modules } from "../academy/catalog";
import { simpleCores } from "./core";
import { simpleContent } from "./model";
import { simpleArticles } from "./articles";
import { articles } from "../content";
import App from "../App";
import {
  ACADEMY_KEY,
  emptyAcademy,
  validateProgress,
} from "../academy/progress";
import { createBackup, parseBackup } from "../storage/backup";
beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn();
});
it("27 Kernmodule besitzen drei echte einfache Erklärungen, gemeinsame Beispiele/Formeln bleiben unverändert", () => {
  expect(simpleCores).toHaveLength(27);
  expect(new Set(simpleCores.map((c) => c.id)).size).toBe(27);
  for (const core of simpleCores) {
    const m = modules.find((m) => m.id === core.id)!;
    expect(m).toBeTruthy();
    for (const level of ["grundlagen", "fachkraft", "meister"] as const) {
      const c = simpleContent(m.levels[level], core, level);
      expect(c.explanation.length).toBeGreaterThan(180);
      expect(c.explanation).not.toBe(m.levels[level].explanation);
      expect(c.example).toBe(m.levels[level].example);
      expect(c.derivation).toBe(m.levels[level].derivation);
    }
  }
  for (const a of articles)
    expect(simpleArticles[a.id]).toHaveLength(a.sections.length);
});
it("speichert die bevorzugte Ebene im alten Fortschritts-/Backupvertrag und weist ungültige Ebenen zurück", () => {
  const p = {
    ...emptyAcademy(),
    preferences: { explanation: "simple" as const },
  };
  expect(
    parseBackup(
      JSON.stringify(
        createBackup(
          p,
          { read: [], attempts: 0, best: 0, last: null },
          localStorage,
        ),
      ),
    ).data.academy.preferences,
  ).toEqual(p.preferences);
  expect(
    validateProgress({ ...p, preferences: { explanation: "beginner" } }),
  ).toBe(false);
  expect(validateProgress(emptyAcademy())).toBe(true);
});
it("wechselt Sprache ohne Modulwechsel, erlaubt lokale Ausnahme und kennzeichnet fehlende Fassungen", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Akademie" }));
  await user.type(
    screen.getByRole("searchbox", { name: "Module oder Fachbegriffe suchen" }),
    "Kältekreislauf",
  );
  await user.click(
    screen.getByRole("button", {
      name: /KÄLTETECHNIK.*Grundlagen des Kältekreislaufs/,
    }),
  );
  await user.click(screen.getByRole("button", { name: "Einfach erklärt" }));
  expect(
    screen.getByText(
      /Für dieses Modul ist die einfache Sprachfassung noch nicht ausgearbeitet/,
    ),
  ).toBeInTheDocument();
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).preferences.explanation,
  ).toBe("simple");
  await user.selectOptions(
    screen.getByLabelText("Darstellung dieser Lektion"),
    "technical",
  );
  expect(
    screen.queryByText(
      /Für dieses Modul ist die einfache Sprachfassung noch nicht ausgearbeitet/,
    ),
  ).toBeNull();
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).preferences.explanation,
  ).toBe("simple");
});
