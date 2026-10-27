import { expect,it } from 'vitest';
import { calculateTechnical,toSI,fromSI } from './calculations';
import { createExam,finishExam } from '../academy/exams/engine';
import { emptyAcademy,validateProgress } from '../academy/progress';
it.each([[20,'cm²','area',.002],[10,'L','volume',.01],[2,'bar','pressure',200000],[500,'g','mass',.5],[36,'km/h','speed',10]] as const)('SI-Umrechnung und Rückweg %s %s', (value,unit,quantity,reference)=>{
 expect(toSI(value,unit,quantity)).toBeCloseTo(reference,10);expect(fromSI(reference,unit,quantity)).toBeCloseTo(value,10);
});
it('weist Nullflächen, Nullvolumina, Nullzeiten und negative physikalische Werte zurück',()=>{
 expect(()=>calculateTechnical('pressure',{force:1,area:0})).toThrow();expect(()=>calculateTechnical('density',{mass:1,volume:0})).toThrow();
 expect(()=>calculateTechnical('speed',{distance:1,time:0})).toThrow();expect(()=>calculateTechnical('force',{mass:1,acceleration:-1})).toThrow();
});
it('sichert sensible Wärmemenge gegen separate Referenz und gegen den vorhandenen Leistungskern ab',()=>{
 expect(calculateTechnical('sensible-energy',{mass:2,cp:4180,deltaT:5})).toBe(41800);
 expect(calculateTechnical('heat',{massFlow:.02,cp:4180,deltaT:5})).toBeCloseTo(418,10);
 expect(calculateTechnical('power-from-energy',{energy:41800,time:100})).toBe(418);
});
it('neue Physik-Prüfungssnapshots sind persistierbar und vollständig auswertbar',()=>{
 const p=emptyAcademy();const now=new Date();const session=createExam(p,'physik','grundlagen',5,now,'physics-check');
 expect(validateProgress({...p,activeExam:session})).toBe(true);
 expect(validateProgress(finishExam({...p,activeExam:session},now))).toBe(true);
});
