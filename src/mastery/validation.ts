import{record,date,integer}from'../academy/exams/validation';
const goal=(v:unknown)=>['understand','independent','mission','due','case','resume'].includes(String(v));
const id=(v:unknown):v is string=>typeof v==='string'&&v.length>0&&v.length<=120;
const ids=(v:unknown)=>Array.isArray(v)&&v.length<=512&&v.every(id)&&new Set(v).size===v.length;
const minutes=(v:unknown)=>integer(v)&&v>=5&&v<=90;
export function validMastery(v:unknown):boolean{
 if(!record(v)||v.schemaVersion!==1||!['enabled','reduced','disabled'].includes(String(v.motivation))||!goal(v.goal)||typeof v.focus!=='boolean'||!minutes(v.minutes)||!record(v.evidence)||Object.keys(v.evidence).length>1024||!Array.isArray(v.history)||v.history.length>10)return false;
 for(const[key,e]of Object.entries(v.evidence))if(!id(key)||!record(e)||!integer(e.revision)||e.revision<1||!date(e.firstAt)||!date(e.lastAt)||Date.parse(e.lastAt)<Date.parse(e.firstAt)||!(e.spacedAt===undefined||(date(e.spacedAt)&&Date.parse(e.spacedAt)-Date.parse(e.firstAt)>=86400000&&Date.parse(e.spacedAt)<=Date.parse(e.lastAt))))return false;
 if(v.mission!==null&&(!record(v.mission)||!id(v.mission.id)||!integer(v.mission.revision)||v.mission.revision<1||!integer(v.mission.step)||v.mission.step>40))return false;
 const s=v.session;if(s!==null){if(!record(s)||!id(s.id)||!date(s.startedAt)||!goal(s.goal)||!minutes(s.minutes)||!(s.pausedAt===null||date(s.pausedAt))||!integer(s.pauseMs)||!record(s.baseline)||Object.keys(s.baseline).length>1024)return false;for(const[k,b]of Object.entries(s.baseline))if(!id(k)||!record(b)||!['revision','attempts','correct','independent','hint','worked'].every(key=>integer(b[key]))||Number(b.revision)<1||Number(b.correct)>Number(b.attempts)||Number(b.independent)+Number(b.hint)+Number(b.worked)>Number(b.correct)||typeof b.lastCorrect!=='boolean')return false;}
 const seen=new Set<string>();for(const h of v.history){if(!record(h)||!id(h.id)||seen.has(h.id)||!date(h.startedAt)||!date(h.finishedAt)||Date.parse(h.finishedAt)<Date.parse(h.startedAt)||!goal(h.goal)||!['independentIds','hintIds','workedIds','improvedIds','transferIds'].every(k=>ids(h[k]))||!integer(h.attempts))return false;seen.add(h.id);}
 return true;
}
