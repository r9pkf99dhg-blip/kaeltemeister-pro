import{expect,it,beforeEach,vi}from'vitest';import{render,screen}from'@testing-library/react';import userEvent from'@testing-library/user-event';import App from'../App';import{ACADEMY_KEY}from'../academy/progress';
beforeEach(()=>{localStorage.clear();window.scrollTo=vi.fn();});
it('bewertet eine eigene Ausdrucksantwort mit Rechenblatt ohne Spracheinfluss und setzt den Entwurf fort',async()=>{
 const user=userEvent.setup();const first=render(<App/>);await user.click(screen.getByRole('button',{name:'Übungswerkstatt'}));await user.selectOptions(screen.getByLabelText('Werkstatt-Aufgabe'),'calc-heat-water');
 await user.type(screen.getByLabelText('Rechenblatt: Verwendete Formel'),'Qdot = mdot * cp * deltaT');await user.type(screen.getByLabelText('Dein Ergebnis: Sensible Wärmeleistung'),'0,5*4,18*5');
 await user.click(screen.getByRole('button',{name:'Einfach erklärt'}));expect(screen.getByLabelText('Rechenblatt: Verwendete Formel')).toHaveValue('Qdot = mdot * cp * deltaT');
 await user.click(screen.getByRole('button',{name:'Werkstatt-Ergebnis prüfen'}));expect(screen.getByRole('status')).toHaveTextContent('Richtig innerhalb');
 expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!).performance['calc-heat-water'].support.independent).toBe(1);
 first.unmount();render(<App/>);await user.click(screen.getByRole('button',{name:'Werkstattentwurf fortsetzen'}));expect(screen.getByLabelText('Dein Ergebnis: Sensible Wärmeleistung')).toHaveValue('0,5*4,18*5');expect(screen.getByLabelText('Rechenblatt: Verwendete Formel')).toHaveValue('Qdot = mdot * cp * deltaT');
});
it('führt Fehlersuche zur numerischen Korrektur und kennzeichnet einen Hinweisversuch',async()=>{
 const user=userEvent.setup();render(<App/>);await user.click(screen.getByRole('button',{name:'Übungswerkstatt'}));await user.selectOptions(screen.getByLabelText('Werkstatt-Aufgabe'),'workshop-error-prefix');await user.click(screen.getByRole('radio',{name:'Der Faktor 1000 fehlt; richtig sind 1500 W.'}));await user.click(screen.getByRole('button',{name:'Werkstatt-Ergebnis prüfen'}));await user.click(screen.getByRole('button',{name:'Nächster Rechenschritt'}));await user.click(screen.getByRole('button',{name:'Hinweis 1'}));await user.type(screen.getByLabelText('Dein Ergebnis: Umrechnung: kW in W'),'1500');await user.click(screen.getByRole('button',{name:'Werkstatt-Ergebnis prüfen'}));expect(screen.getByRole('status')).toHaveTextContent('Mit Unterstützung');expect(JSON.parse(localStorage.getItem(ACADEMY_KEY)!).performance['workshop-conversion-power'].support.hint).toBe(1);
});
