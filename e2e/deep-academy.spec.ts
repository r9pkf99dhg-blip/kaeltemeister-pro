import { test, expect } from '@playwright/test';
test('Geometriepfad und Winkelrechnung bleiben auf kleinen Bildschirmen lesbar',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Akademie',exact:true}).click();
 await page.getByLabel('Fachgebiet',{exact:true}).selectOption('mathematik');
 await page.getByRole('button',{name:/MATHEMATIK.*Winkel, Trigonometrie und Gefälle/}).click();
 await page.getByLabel('Aufgabe wählen',{exact:true}).selectOption('geo-angle-a');
 await page.getByLabel('Dein Ergebnis: Winkel aus einer Steigung',{exact:true}).fill('36,87');
 await page.getByRole('button',{name:'Ergebnis prüfen',exact:true}).click();
 await expect(page.getByText('Richtig innerhalb der Rechentoleranz.',{exact:true})).toBeVisible();
 await expect(page.locator('.math-error')).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('Wechselstromdiagramm und Drehstromaufgabe unterscheiden Leitergrößen',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Akademie',exact:true}).click();
 await page.getByLabel('Fachgebiet',{exact:true}).selectOption('elektro');
 await page.getByRole('button',{name:/ELEKTRO.*Wechselstrom: Sinus, Zeit und Effektivwert/}).click();
 await page.getByLabel('Strom nacheilend um',{exact:true}).selectOption('90');
 await expect(page.getByRole('img',{name:'Normierte Spannung und um 90 Grad nacheilender Strom'})).toBeVisible();
 await page.getByRole('button',{name:'Zur Modulübersicht',exact:true}).click();
 await page.getByRole('button',{name:/ELEKTRO.*Drehstrom: Leiter-, Stranggrößen und Leistung/}).click();
 await expect(page.getByRole('img',{name:'Drei normierte Sinusspannungen mit 120 Grad Phasenabstand'})).toBeVisible();
 await page.getByLabel('Aufgabe wählen',{exact:true}).selectOption('ac-three-a');
 await page.getByLabel('Dein Ergebnis: Symmetrische Dreiphasen-Wirkleistung',{exact:true}).fill('5542,56');
 await page.getByRole('button',{name:'Ergebnis prüfen',exact:true}).click();
 await expect(page.getByText('Richtig innerhalb der Rechentoleranz.',{exact:true})).toBeVisible();
 await expect(page.locator('.math-error')).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('Thermodynamikpfad rechnet Schichtwärme mit offengelegten Grenzen',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Akademie',exact:true}).click();
 await page.getByLabel('Fachgebiet',{exact:true}).selectOption('thermodynamik');
 await page.getByRole('button',{name:/Wärmeleitung, Wärmewiderstand und U-Wert/}).click();
 await page.getByLabel('Aufgabe wählen',{exact:true}).selectOption('th-layer-a');
 await page.getByLabel('Dein Ergebnis: Wärmestrom durch zwei Schichten',{exact:true}).fill('8');
 await page.getByRole('button',{name:'Ergebnis prüfen',exact:true}).click();
 await expect(page.getByText('Richtig innerhalb der Rechentoleranz.',{exact:true})).toBeVisible();
 await expect(page.locator('.math-error')).toHaveCount(0);
});
