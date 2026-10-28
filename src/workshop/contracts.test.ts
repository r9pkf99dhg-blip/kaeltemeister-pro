import {expect,it}from'vitest';import{emptyAcademy,validateProgress}from'../academy/progress';import{recordOutcome}from'../academy/adaptive/algorithm';import{createBackup,parseBackup}from'../storage/backup';import{emptyWorksheet}from'./model';
const item={id:'calc-heat-water',topicId:'cycle-basics',revision:1,kind:'numeric' as const};
it('unterscheidet unabhängig, mit Hinweis und nach Musterlösung und erfindet keine alte Selbstständigkeit',()=>{
 let p=emptyAcademy();p=recordOutcome(p,item,true,new Date(),undefined,'independent');p=recordOutcome(p,item,true,new Date(),undefined,'hint');expect(p.performance[item.id].intervalDays).toBe(1);p=recordOutcome(p,item,true,new Date(),undefined,'worked');expect(p.performance[item.id].intervalDays).toBe(0);expect(p.performance[item.id].support).toEqual({independent:1,hint:1,worked:1,last:'worked'});expect(validateProgress(p)).toBe(true);
 p=recordOutcome(p,item,true);expect(p.performance[item.id].support?.last).toBe('unknown');expect(p.performance[item.id].correctCount).toBe(4);
});
it('sichert Rechenblatt, Schrittposition, Hilfe, Einheiten und Sprache im vorhandenen Backup',()=>{
 const p=emptyAcademy();p.preferences={explanation:'simple'};p.exerciseDraft={taskId:item.id,revision:1,answer:{value:'0,5*4,18*5',unit:'kW'},bridgeLessonId:'math-units',checked:false,updatedAt:new Date().toISOString(),workspace:'workshop',workshop:{entryId:item.id,kind:'steps',mode:'guided',fields:{...emptyWorksheet(),given:'ṁ=0,5 kg/s',formula:'Q̇=ṁcpΔT'},help:1,step:2,choices:{formula:'right'},solutionOpen:false}};
 const b=createBackup(p,{read:[],attempts:0,best:0,last:null},localStorage);expect(parseBackup(JSON.stringify(b)).data.academy).toEqual(p);
 expect(validateProgress({...p,exerciseDraft:{...p.exerciseDraft,workshop:{...p.exerciseDraft.workshop,help:'1'}}})).toBe(false);
 expect(validateProgress({...p,exerciseDraft:{...p.exerciseDraft,workshop:{...p.exerciseDraft.workshop,fields:{...emptyWorksheet(),given:'x'.repeat(2001)}}}})).toBe(false);
});
