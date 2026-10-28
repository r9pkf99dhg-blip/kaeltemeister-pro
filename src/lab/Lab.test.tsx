import LabVisualization from "./Visualization";
import { calculators } from "./catalog";
import { it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn();
});
it("berechnet Wärme mit dem gemeinsamen Kern und startet eine eigene Übung ohne vorweggenommene Lösung", async () => {
  const user = userEvent.setup(),
    view = render(<App />);
  await user.click(screen.getByRole("button", { name: "Techniklabor" }));
  await user.selectOptions(
    screen.getByLabelText("Labor-Rechner"),
    "heat-power",
  );
  await user.click(screen.getByRole("button", { name: "Laborwert berechnen" }));
  expect(screen.getByRole("status")).toHaveTextContent("10,45 kW");
  expect(view.container.querySelector(".math-error")).toBeNull();
  await user.click(
    screen.getByRole("button", { name: "Rechnung selbst üben" }),
  );
  expect(
    screen.getByLabelText(
      "Dein Ergebnis: Wärmeträgerleistung mit vorgegebenem cp",
    ),
  ).toHaveValue("");
  expect(screen.queryByRole("status")).toBeNull();
  expect(
    screen.queryByRole("heading", { name: "Schrittweise Musterlösung" }),
  ).toBeNull();
});
it("trennt absolute Temperatur, Differenz und Leistungsarten im Umrechner", async () => {
  const user = userEvent.setup(),
    view = render(<App />);
  await user.click(screen.getByRole("button", { name: "Techniklabor" }));
  await user.selectOptions(
    screen.getByLabelText("Umrechner-Größe"),
    "temperature",
  );
  await user.clear(screen.getByLabelText("Umrechner-Zahlenwert"));
  await user.type(screen.getByLabelText("Umrechner-Zahlenwert"), "-10");
  await user.click(screen.getByRole("button", { name: "Einheit umrechnen" }));
  expect(screen.getByRole("status")).toHaveTextContent("263,15 K");
  expect(view.container.querySelector(".math-error")).toBeNull();
  await user.selectOptions(
    screen.getByLabelText("Umrechner-Größe"),
    "temperature-difference",
  );
  await user.clear(screen.getByLabelText("Umrechner-Zahlenwert"));
  await user.type(screen.getByLabelText("Umrechner-Zahlenwert"), "-5");
  await user.click(screen.getByRole("button", { name: "Einheit umrechnen" }));
  expect(screen.getByRole("status")).toHaveTextContent("-5 °C");
});
it("verbindet Fachlektion und passenden Laborrechner in beiden Richtungen", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Techniklabor" }));
  await user.selectOptions(
    screen.getByLabelText("Labor-Rechner"),
    "heat-power",
  );
  await user.click(
    screen.getByRole("button", { name: "Grundlagen verstehen" }),
  );
  await user.click(
    screen.getByText("Dieses Modell im Techniklabor untersuchen"),
  );
  await user.click(
    screen.getByRole("button", {
      name: "Massenstrom aus Wärmeleistung im Labor öffnen",
    }),
  );
  expect(screen.getByLabelText("Labor-Rechner")).toHaveValue("heat-flow");
});
it("zeichnet auch bei endlichen extremen Modellwerten ausschließlich endliche Diagrammkoordinaten", () => {
  for (const [id, values] of [
    ["heat-power", { massFlow: 1e307, cp: 1e-300, deltaT: 1 }],
    ["ac-real", { voltage: 1e154, current: 1e154, factor: 0.8 }],
  ] as const) {
    const view = render(
      <LabVisualization
        tool={calculators.find((c) => c.id === id)!}
        values={values}
        changeMass={() => {}}
      />,
    );
    for (const node of view.container.querySelectorAll("path,circle"))
      for (const attribute of ["d", "cx", "cy"])
        expect(node.getAttribute(attribute) ?? "").not.toMatch(/NaN|Infinity/);
    view.unmount();
  }
});
