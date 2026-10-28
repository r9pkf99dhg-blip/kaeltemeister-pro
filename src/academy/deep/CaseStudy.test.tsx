import { emptyAcademy } from "../progress";
import type { AcademyProgress } from "../model";
import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { learningItems } from "../exercises/items";
import { caseSteps } from "./cases";
import CaseStudy from "./CaseStudy";
it("jeder Fall endet mit einer bewertbaren fachlichen Entscheidung auf Transferniveau", () => {
  expect(Object.keys(caseSteps)).toHaveLength(4);
  for (const ids of Object.values(caseSteps)) {
    expect(new Set(ids).size).toBe(ids.length);
    const items = ids.map((id) => learningItems.find((i) => i.id === id)!);
    expect(items.every(Boolean)).toBe(true);
    expect(
      items.filter((i) => i.kind === "numeric").length,
    ).toBeGreaterThanOrEqual(2);
    expect(items.at(-1)?.kind).toBe("choice");
    expect(items.at(-1)?.level).toBe("meister");
  }
});
it("verbindet zwei Rechnungen mit einer kritischen Entscheidung und speichert nur bewertete Versuche", async () => {
  let progress = emptyAcademy();
  const user = userEvent.setup(),
    setProgress = vi.fn(
      (update: AcademyProgress | ((p: AcademyProgress) => AcademyProgress)) => {
        progress = typeof update === "function" ? update(progress) : update;
      },
    );
  render(<CaseStudy moduleId="case-conduction" setProgress={setProgress} />);
  await user.type(
    screen.getByLabelText("Dein Ergebnis: Wärmestrom durch eine ebene Schicht"),
    "16",
  );
  await user.click(screen.getByRole("button", { name: "Fallschritt prüfen" }));
  expect(screen.getByRole("status")).toHaveTextContent("Richtig");
  await user.click(
    screen.getByRole("button", { name: "Nächster Fallschritt" }),
  );
  await user.type(
    screen.getByLabelText("Dein Ergebnis: Wärmestrom durch zwei Schichten"),
    "8",
  );
  await user.click(screen.getByRole("button", { name: "Fallschritt prüfen" }));
  await user.click(
    screen.getByRole("button", { name: "Nächster Fallschritt" }),
  );
  await user.click(
    screen.getByRole("radio", {
      name: "Nein, reale Wärmewege, Feuchte und Betriebsbedingungen sind zusätzlich zu prüfen.",
    }),
  );
  await user.click(screen.getByRole("button", { name: "Fallschritt prüfen" }));
  await user.click(screen.getByRole("button", { name: "Fall auswerten" }));
  expect(
    screen.getByText(/3 von 3 zuletzt geprüften Antworten richtig/),
  ).toBeInTheDocument();
  expect(setProgress).toHaveBeenCalledTimes(3);
  expect(progress.answers["case-conduction-q3"].correct).toBe(true);
  expect(progress.performance["case-conduction-q3"].attempts).toBe(1);
});
