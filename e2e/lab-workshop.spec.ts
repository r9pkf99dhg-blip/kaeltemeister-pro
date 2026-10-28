import {test,expect}from'@playwright/test';
test('Werkstatt erhält Rechenblatt, Einheit und Hilfe nach Neuladen und Sprachwechsel',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Übungswerkstatt',exact:true}).click();await page.getByLabel('Werkstatt-Aufgabe',{exact:true}).selectOption('calc-heat-water');
 await page.getByLabel('Rechenblatt: Verwendete Formel',{exact:true}).fill('Qdot = mdot cp deltaT');await page.getByLabel('Dein Ergebnis: Sensible Wärmeleistung',{exact:true}).fill('0,5*4,18*5');await page.getByRole('button',{name:'Hinweis 1',exact:true}).click();
 await page.getByRole('button',{name:'Einfach erklärt',exact:true}).click();await expect(page.getByLabel('Dein Ergebnis: Sensible Wärmeleistung',{exact:true})).toHaveValue('0,5*4,18*5');await page.reload();await page.getByRole('button',{name:'Werkstattentwurf fortsetzen',exact:true}).click();await expect(page.getByLabel('Rechenblatt: Verwendete Formel',{exact:true})).toHaveValue('Qdot = mdot cp deltaT');
 await page.getByRole('button',{name:'Werkstatt-Ergebnis prüfen',exact:true}).click();await expect(page.getByRole('status')).toContainText('Mit Unterstützung');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('Temporäre Sprache erhält Lektionsposition, Formeln und globale Präferenz',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Akademie',exact:true}).click();await page.getByRole('searchbox',{name:'Module oder Fachbegriffe suchen',exact:true}).fill('Brüche verstehen');await page.getByRole('button',{name:/MATHEMATIK.*Brüche verstehen und berechnen/}).click();
 const formulas=await page.locator('.learning-formula .katex').count();await page.getByLabel('Darstellung dieser Lektion',{exact:true}).selectOption('simple');await expect(page.getByText(/Stell dir einen ganzen Kuchen vor/).first()).toBeVisible();expect(await page.locator('.learning-formula .katex').count()).toBe(formulas);await page.getByLabel('Darstellung dieser Lektion',{exact:true}).selectOption('technical');await expect(page.getByRole('heading',{name:'Brüche verstehen und berechnen',exact:true})).toBeVisible();
});
