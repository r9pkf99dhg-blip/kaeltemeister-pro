import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
it("erklärt eine mögliche Grundlage und erhält Antwort und Einheit nach der Rückkehr", async () => {
  localStorage.clear();
  window.scrollTo = vi.fn();
  const user = userEvent.setup();
  render(<App />);
  await user.click(
    screen.getByRole("button", { name: "Rechenaufgaben üben →" }),
  );
  const input = screen.getByLabelText("Dein Ergebnis: Sensible Wärmeleistung");
  await user.type(input, "1");
  await user.click(screen.getByRole("button", { name: "Ergebnis prüfen" }));
  await user.click(
    screen.getByRole("button", { name: "Empfohlene Grundlage öffnen" }),
  );
  expect(
    screen.getByRole("region", { name: "Eingeblendete Grundlagenlektion" }),
  ).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Grundlage als gelesen markieren" }),
  );
  await user.click(
    screen.getByRole("button", { name: "Zur ursprünglichen Aufgabe zurück" }),
  );
  expect(input).toHaveValue("1");
  expect(
    screen.getByLabelText("Einheit für Sensible Wärmeleistung"),
  ).toHaveValue("kW");
  expect(input).toHaveFocus();
  await user.clear(input);
  await user.type(input, "10,45");
  await user.click(screen.getByRole("button", { name: "Ergebnis prüfen" }));
  expect(screen.getByRole("status")).toHaveTextContent("Richtig innerhalb");
});
it('nimmt einen gespeicherten Lernbrückenentwurf nach erneutem Laden ohne neuen Versuch wieder auf',async()=>{
 localStorage.clear();window.scrollTo=vi.fn();const user=userEvent.setup();const first=render(<App/>);
 await user.click(screen.getByRole('button',{name:'Rechenaufgaben üben →'}));
 await user.type(screen.getByLabelText('Dein Ergebnis: Sensible Wärmeleistung'),'1');
 await user.click(screen.getByRole('button',{name:'Ergebnis prüfen'}));
 await user.click(screen.getByRole('button',{name:'Empfohlene Grundlage öffnen'}));
 const before=JSON.parse(localStorage.getItem('kaeltemeister-pro:progress:v3')!);
 expect(before.exerciseDraft.bridgeLessonId).toBeTruthy();expect(before.exerciseDraft.answer).toEqual({value:'1',unit:'kW'});
 first.unmount();window.history.replaceState(null,'','/');render(<App/>);
 await user.click(screen.getByRole('button',{name:'Rechenaufgaben üben →'}));
 expect(screen.getByLabelText('Dein Ergebnis: Sensible Wärmeleistung')).toHaveValue('1');
 expect(screen.getByRole('region',{name:'Eingeblendete Grundlagenlektion'})).toBeInTheDocument();
 await user.click(screen.getByRole('button',{name:'Lernbrücke überspringen'}));
 expect(screen.queryByRole('region',{name:'Eingeblendete Grundlagenlektion'})).toBeNull();
 expect(JSON.parse(localStorage.getItem('kaeltemeister-pro:progress:v3')!).performance['calc-heat-water'].attempts).toBe(before.performance['calc-heat-water'].attempts);
});
