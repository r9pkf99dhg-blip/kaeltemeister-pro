import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RearrangementTrainer from "./RearrangementTrainer";
it("erklärt falsche Operationen und führt eine zweistufige Umstellung zur Probe", async () => {
  const user = userEvent.setup();
  const setProgress = vi.fn();
  render(<RearrangementTrainer setProgress={setProgress} />);
  await user.selectOptions(
    screen.getByLabelText("Formel und Zielvariable"),
    "pressure-a",
  );
  await user.click(
    screen.getByRole("radio", { name: "Nur links mit A multiplizieren" }),
  );
  await user.click(screen.getByRole("button", { name: "Umformung prüfen" }));
  expect(screen.getByRole("status")).toHaveTextContent("Noch nicht richtig");
  await user.click(
    screen.getByRole("radio", { name: "Beide Seiten mit A multiplizieren" }),
  );
  await user.click(screen.getByRole("button", { name: "Umformung prüfen" }));
  await user.click(
    screen.getByRole("button", { name: "Nächster Umstellungsschritt" }),
  );
  await user.click(
    screen.getByRole("radio", { name: "Beide Seiten durch p teilen" }),
  );
  await user.click(screen.getByRole("button", { name: "Umformung prüfen" }));
  expect(
    screen.getByRole("heading", { name: "Probe durch Einsetzen" }),
  ).toBeInTheDocument();
  expect(setProgress).toHaveBeenCalledTimes(3);
});

it('unterscheidet verlorene Lösungen von einer zulässigen vollständigen Lösung', async()=>{
 const user=userEvent.setup();render(<RearrangementTrainer setProgress={vi.fn()} />);
 await user.selectOptions(screen.getByLabelText('Formel und Zielvariable'),'zero-solutions');
 await user.click(screen.getByRole('radio',{name:'Durch x teilen und nur x = 2 behalten'}));
 await user.click(screen.getByRole('button',{name:'Umformung prüfen'}));
 expect(screen.getByRole('status')).toHaveTextContent('Verlorene Lösung');
 await user.click(screen.getByRole('radio',{name:'Nullprodukt: beide Faktoren getrennt gleich null setzen'}));
 await user.click(screen.getByRole('button',{name:'Umformung prüfen'}));
 expect(screen.getByRole('heading',{name:'Probe durch Einsetzen'})).toBeInTheDocument();
});
