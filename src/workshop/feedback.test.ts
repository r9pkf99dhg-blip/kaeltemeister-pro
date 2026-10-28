import {expect,it} from 'vitest';
import {numericTasks} from '../academy/exercises/data';
import {numericFeedback,snapshotItem} from '../academy/exercises/engine';
import {bridgeRecommendations} from '../academy/foundations/learning-bridge';
import {learningItems} from '../academy/exercises/items';
import {emptyAcademy} from '../academy/progress';
const task={...numericTasks.find(t=>t.id==='calc-heat-water')!,answerSyntax:'arithmetic' as const};
it('trennt falsche Einheit und Zahl bei identischem Zahlenwert und lässt gleichwertige Einheiten zu',()=>{
 const snapshot=snapshotItem(task);
 expect(numericFeedback(snapshot,{value:'10.45',unit:'W'})).toEqual({number:expect.stringContaining('kW'),unit:expect.stringContaining('W;')});
 expect(numericFeedback(snapshot,{value:'10450',unit:'W'})?.number).toContain('Rechentoleranz');
 expect(numericFeedback(snapshot,{value:'10.45',unit:'J'})?.unit).toContain('nicht zur gesuchten');
 expect(numericFeedback(snapshot,{value:'1/0',unit:'kW'})?.number).toContain('Definitionsbereich');
});
it('verknüpft Formel- und Entscheidungsfragen mit denselben realen Kompetenzlektionen',()=>{
 for(const id of ['workshop-formula-heat','workshop-decision-model']){
 const item=learningItems.find(i=>i.id===id)!;
 const suggestions=bridgeRecommendations(emptyAcademy(),item,{value:'a',unit:''});
 expect(suggestions.length).toBeGreaterThan(0);expect(suggestions[0].reason).toContain('kein Nachweis');
 }
});
