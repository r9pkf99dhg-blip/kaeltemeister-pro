import{test,expect}from'@playwright/test';import{missions}from'../src/mastery/missions';import{learningItems}from'../src/academy/exercises/items';import references from'../src/refrigeration/task-references.json' with {type:'json'};import{fromSI}from'../src/technical/calculations';
test('Sechsteiliger Kreislaufpfad bewertet echte Antworten, Reihenfolge und Referenzrechnungen',async({page})=>{
 test.setTimeout(90000);await page.goto('./');await page.getByRole('button',{name:'Mastery',exact:true}).click();
 for(const mission of missions.filter(m=>m.id.startsWith('mission-cycle-'))){
  await page.getByRole('button',{name:`${mission.title} öffnen`,exact:true}).click();
  for(let index=0;index<mission.steps.length;index++){
   const step=mission.steps[index];if(step.kind!=='practice')continue;await page.getByLabel('Missionsschritt',{exact:true}).selectOption(String(index));const item=learningItems.find(i=>i.id===step.itemId)!;
   if(item.id==='refrig-order-v08'){for(const[i,value]of ['comp','cond','valve','evap'].entries())await page.getByLabel(`Prozessplatz ${i+1}`,{exact:true}).selectOption(value);}
   else if(item.kind==='choice'){const option=item.options.find(o=>o.id===item.correctOptionId)!;await page.getByRole('radio',{name:option.text,exact:true}).check();}
   else{const expected=references[item.id as keyof typeof references];await page.getByLabel(`Dein Ergebnis: ${item.sought}`,{exact:true}).fill(String(fromSI(expected,item.answerUnit,item.quantity)));}
   await page.getByRole('button',{name:'Werkstatt-Ergebnis prüfen',exact:true}).click();await expect(page.locator('.workshop [role=status]')).toContainText('Richtig');
  }
  await expect(page.getByText('Fachliche Aufgabenbedingungen erfüllt.',{exact:true})).toBeVisible();
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('.math-error')).toHaveCount(0);
});
test('Mission erhält eigene Notizen, Hilfe und aktuellen Schritt bei Neuladen',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Mastery',exact:true}).click();await page.getByRole('button',{name:'4 · Den Kreisprozess selbst berechnen öffnen',exact:true}).click();await page.getByLabel('Missionsschritt',{exact:true}).selectOption('2');await page.getByLabel('Rechenblatt: Verwendete Formel',{exact:true}).fill('w=h2-h1');await page.getByLabel('Dein Ergebnis: Spezifische Fluidverdichterarbeit',{exact:true}).fill('31,7353');await page.getByRole('button',{name:'Hinweis 1',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Fachmission fortsetzen',exact:true}).click();await expect(page.getByLabel('Missionsschritt',{exact:true})).toHaveValue('2');await expect(page.getByLabel('Rechenblatt: Verwendete Formel',{exact:true})).toHaveValue('w=h2-h1');await expect(page.getByLabel('Dein Ergebnis: Spezifische Fluidverdichterarbeit',{exact:true})).toHaveValue('31,7353');await page.getByRole('button',{name:'Werkstatt-Ergebnis prüfen',exact:true}).click();await expect(page.locator('.workshop [role=status]')).toContainText('Mit Unterstützung');await expect(page.getByText('Fachliche Aufgabenbedingungen erfüllt.',{exact:true})).toHaveCount(0);
});
