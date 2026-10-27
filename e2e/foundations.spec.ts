import { test,expect } from '@playwright/test';
test('Mathematik-Kernpfad speichert negative Bruchantworten und einen mehrstufigen Umstellungstrainer',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Mit Mathematik beginnen',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Zahlen und Rechenregeln',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Niveau als gelesen markieren',exact:true}).click();await page.getByRole('button',{name:'Zur Modulübersicht',exact:true}).click();
 await page.getByLabel('Fachgebiet',{exact:true}).selectOption('mathematik');await expect(page.getByRole('status')).toContainText('8 verfügbare Lernmodule');
 await page.getByRole('button',{name:/MATHEMATIK.*Brüche verstehen und berechnen/}).click();
 await page.getByLabel('Aufgabe wählen',{exact:true}).selectOption('math-fraction-sub-a');await page.getByLabel('Dein Ergebnis: Brüche subtrahieren',{exact:true}).fill('-1/2');
 await page.getByRole('button',{name:'Ergebnis prüfen',exact:true}).click();await expect(page.getByText('Richtig innerhalb der Rechentoleranz.',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Zur Modulübersicht',exact:true}).click();await page.getByRole('button',{name:/MATHEMATIK.*Technische Formeln umstellen/}).click();
 await page.getByLabel('Formel und Zielvariable',{exact:true}).selectOption('pressure-a');
 await page.getByRole('radio',{name:'Beide Seiten mit A multiplizieren',exact:true}).check();await page.getByRole('button',{name:'Umformung prüfen',exact:true}).click();
 await page.getByRole('button',{name:'Nächster Umstellungsschritt',exact:true}).click();
 await page.getByRole('radio',{name:'Beide Seiten durch p teilen',exact:true}).check();await page.getByRole('button',{name:'Umformung prüfen',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Probe durch Einsetzen',exact:true})).toBeVisible();await expect(page.locator('.math-error')).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.reload();const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('kaeltemeister-pro:progress:v3')!));
 expect(state.read['math-arithmetic'].levels).toContain('grundlagen');expect(state.exerciseAnswers['math-fraction-sub-a'].correct).toBe(true);expect(state.performance['trainer-pressure-a-step2'].lastCorrect).toBe(true);
});
test('Physik-Kernmodule sind verknüpft und prüfen Druck mit SI-Umrechnung',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Akademie',exact:true}).click();
 await page.getByLabel('Fachgebiet',{exact:true}).selectOption('physik');await expect(page.getByRole('status')).toContainText('4 verfügbare Lernmodule');
 await page.getByRole('button',{name:/PHYSIK-GRUNDLAGEN.*Druck und Dichte verstehen/}).click();
 await page.getByLabel('Aufgabe wählen',{exact:true}).selectOption('physics-pressure-b');
 await page.getByLabel('Dein Ergebnis: Druck mit Quadratzentimetern',{exact:true}).fill('0,5');
 await page.getByLabel('Einheit für Druck mit Quadratzentimetern',{exact:true}).selectOption('bar');
 await page.getByRole('button',{name:'Ergebnis prüfen',exact:true}).click();await expect(page.getByText('Richtig innerhalb der Rechentoleranz.',{exact:true})).toBeVisible();
 await expect(page.locator('.math-error')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
