import { expect,it } from 'vitest';
import { modules } from '../catalog';
import { numericTasks } from '../exercises/data';
import { competencies } from './competencies';
import { bridgeRecommendations } from './learning-bridge';
import { emptyAcademy } from '../progress';
it('alle Voraussetzungen und Kompetenzziele sind gültig und der Modulgraph ist azyklisch',()=>{
 const ids=new Set(modules.map(m=>m.id));expect(new Set(competencies.map(c=>c.id)).size).toBe(competencies.length);
 for(const c of competencies)expect(ids.has(c.lessonId)).toBe(true);
 const done=new Set<string>();const visiting=new Set<string>();
 function visit(id:string){expect(ids.has(id)).toBe(true);expect(visiting.has(id)).toBe(false);if(done.has(id))return;visiting.add(id);for(const p of modules.find(m=>m.id===id)!.prerequisites??[])visit(p);visiting.delete(id);done.add(id);}
 for(const m of modules)visit(m.id);
 for(const task of numericTasks){expect(task.requiredCompetencyIds?.length).toBeGreaterThan(0);for(const id of task.requiredCompetencyIds??[])expect(competencies.some(c=>c.id===id)).toBe(true);}
});
it('unbekannter Stand ist keine diagnostizierte Lücke; echte letzte Grundlagenfehler erhalten Vorrang',()=>{
 const task=numericTasks.find(t=>t.id==='calc-heat-water')!;const p=emptyAcademy();const fresh=bridgeRecommendations(p,task);
 expect(fresh.length).toBeGreaterThan(0);expect(fresh[0].reason).toContain('kein Nachweis');
 p.performance['math-unit-a']={topicId:'math-units',itemRevision:1,kind:'numeric',attempts:1,correctCount:0,streak:0,lastCorrect:false,lastAttemptAt:new Date().toISOString(),dueAt:new Date().toISOString(),intervalDays:0};
 expect(bridgeRecommendations(p,task)[0].lessonId).toBe('math-units');expect(bridgeRecommendations(p,task)[0].reason).toContain('bewertete Antwort falsch');
 p.performance['math-unit-a'].itemRevision=999;expect(bridgeRecommendations(p,task).every(r=>r.priority<3)).toBe(true);
});
