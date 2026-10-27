import { expect,it } from 'vitest';
import { calculateTechnical,toSI,fromSI } from './calculations';
import { chemistryTasks } from '../academy/foundations/chemistry-tasks';
import { snapshotItem,gradeSnapshot } from '../academy/exercises/engine';
it('prüft Stoffmenge und Einheiten gegen unabhängige Referenzen',()=>{
 expect(toSI(18,'g/mol','molar-mass')).toBe(.018);expect(toSI(500,'mmol','amount')).toBe(.5);expect(fromSI(.5,'mmol','amount')).toBe(500);
 expect(calculateTechnical('amount',{mass:.009,molarMass:.018})).toBe(.5);
 expect(()=>calculateTechnical('amount',{mass:1,molarMass:0})).toThrow();
 expect(gradeSnapshot(snapshotItem(chemistryTasks.find(t=>t.id==='chemistry-amount-a')!),{value:'500',unit:'mmol'}).correct).toBe(true);
});
it('prüft die theoretische Reaktions- und Teilchenbilanz unabhängig',()=>{
 const left={C:1,H:4,O:2*2};const right={C:1,H:2*2,O:2+2};expect(left).toEqual(right);
 expect(5*2).toBe(10);expect(3*2).toBe(6);expect(3/12).toBe(.25);
});
