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
