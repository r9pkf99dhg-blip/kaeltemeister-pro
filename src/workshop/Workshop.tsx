import { useEffect,useState,type Dispatch,type SetStateAction } from 'react';
import type { AcademyProgress } from '../academy/model';
import { domains,modules } from '../academy/catalog';
import { learningItems } from '../academy/exercises/items';
import type { NumericTask,ItemAnswer } from '../academy/exercises/model';
import { snapshotItem,gradeSnapshot } from '../academy/exercises/engine';
import { TaskPrompt,TaskAnswer,TaskSolution,TaskReference,emptyAnswer } from '../academy/exercises/TaskViews';
import { recordOutcome } from '../academy/adaptive/algorithm';
import RearrangementTrainer from '../academy/foundations/RearrangementTrainer';
import LearningBridge from '../academy/foundations/LearningBridge';
import { Explain,useExplanation } from '../language/Explanation';
import { BlockMath,MathText } from '../math/Math';
import { emptyWorksheet,worksheetKeys,type WorkshopState,type PracticeMode } from './model';
import { workshopEntries,workshopKindNames } from './entries';
const labels={given:'Gegeben',sought:'Gesucht',formula:'Verwendete Formel',transformed:'Umgestellte Formel',conversion:'Einheitenumrechnung',substitution:'Eingesetzte Zahlenwerte',plausibility:'Plausibilitätskontrolle und Begründung'};
export default function Workshop({progress,setProgress,openModule,openExam,initialItemId}:{progress:AcademyProgress;setProgress:Dispatch<SetStateAction<AcademyProgress>>;openModule:(id:string)=>void;openExam:()=>void;initialItemId?:string|null}){
 const saved=!initialItemId&&progress.exerciseDraft?.workspace==='workshop'?progress.exerciseDraft:undefined;
 const initial=workshopEntries.find(e=>e.id===(initialItemId??saved?.workshop?.entryId))??workshopEntries[0];
 const [entryId,setEntryId]=useState(initial.id),[domain,setDomain]=useState('all'),[topic,setTopic]=useState('all'),[level,setLevel]=useState('all'),[kind,setKind]=useState('all');
 const [state,setState]=useState<WorkshopState>(saved?.workshop??{entryId:initial.id,kind:initial.kind,mode:'independent',fields:emptyWorksheet(),help:0,step:0,choices:{},solutionOpen:false,responses:{},checkedIds:[]});
 const [answer,setAnswer]=useState<ItemAnswer>(saved?.answer??emptyAnswer(learningItems.find(i=>i.id===initial.itemIds[0])??learningItems[0]));
 const [bridge,setBridge]=useState<string|null>(saved?.bridgeLessonId??null),[skipBridge,setSkipBridge]=useState(false);
 const entry=workshopEntries.find(e=>e.id===entryId)!;const item=learningItems.find(i=>i.id===entry.itemIds[Math.min(state.step,entry.itemIds.length-1)]);
 const checked=!!item&&state.checkedIds?.includes(item.id);const snapshot=item?snapshotItem(item.kind==='numeric'?{...item,answerSyntax:'arithmetic'}:item):null;
 const grade=checked&&snapshot?gradeSnapshot(snapshot,answer):null;
 const filtered=workshopEntries.filter(e=>(domain==='all'||e.domainId===domain)&&(topic==='all'||e.topicId===topic)&&(level==='all'||e.level===level)&&(kind==='all'||e.kind===kind));
 useEffect(()=>{if(!item||entry.kind==='rearrangement')return;setProgress(p=>{
  const next={workspace:'workshop' as const,taskId:item.id,revision:item.revision,answer,bridgeLessonId:bridge,checked:!!checked,workshop:{...state,entryId:entry.id,kind:entry.kind,responses:{...state.responses,[item.id]:answer}}};
  const previous=p.exerciseDraft;if(previous){const{updatedAt,...old}=previous;if(JSON.stringify(old)===JSON.stringify(next))return p;}
  return {...p,exerciseDraft:{...next,updatedAt:new Date().toISOString()}};
 });},[entry.id,item?.id,answer,state,bridge,checked,setProgress]);
 function select(id:string){const e=workshopEntries.find(e=>e.id===id);if(!e)return;setEntryId(e.id);setState({entryId:e.id,kind:e.kind,mode:state.mode,fields:emptyWorksheet(),help:0,step:0,choices:{},solutionOpen:false,responses:{},checkedIds:[]});const i=learningItems.find(i=>i.id===e.itemIds[0]);setAnswer(i?emptyAnswer(i):{value:'',unit:''});setBridge(null);setSkipBridge(false);}
 function move(step:number){if(!item)return;const next=learningItems.find(i=>i.id===entry.itemIds[step]);if(!next)return;setState(s=>({...s,step,responses:{...s.responses,[item.id]:answer},solutionOpen:false}));setAnswer(state.responses?.[next.id]??emptyAnswer(next));setBridge(null);setSkipBridge(false);}
 function check(){if(!item||!snapshot)return;const g=gradeSnapshot(snapshot,answer);if(g.status==='unanswered'||g.status==='invalid'){setValidation(g.message);return;}setValidation('');setState(s=>({...s,checkedIds:[...new Set([...(s.checkedIds??[]),item.id])],responses:{...s.responses,[item.id]:answer}}));setProgress(p=>recordOutcome({...p,exerciseAnswers:{...p.exerciseAnswers,[item.id]:{answer,correct:g.correct,revision:item.revision,answeredAt:new Date().toISOString()}}},item,g.correct,new Date(),undefined,state.help===3?'worked':state.help>0||state.mode==='guided'?'hint':'independent'));}
 const [validation,setValidation]=useState('');
 return <section className="workshop"><h1>Übungswerkstatt</h1><p><Explain simple="Hier rechnest du selbst. Wähle eine Aufgabe, notiere deinen Weg und prüfe erst danach dein Ergebnis. Dein letzter Entwurf wird in diesem Browser gesichert." technical="Aufgaben, Grader und Wiederholungslogik sind mit der Akademie verbunden. Freie Notizen werden gespeichert, aber nicht als symbolisch oder fachlich geprüft ausgegeben."/></p>
 <div className="workshop-filters">
 <label>Fachgebiet<select aria-label="Werkstatt-Fachgebiet" value={domain} onChange={e=>{setDomain(e.target.value);setTopic('all');}}><option value="all">Alle</option>{domains.filter(d=>workshopEntries.some(e=>e.domainId===d.id)).map(d=><option key={d.id} value={d.id}>{d.title}</option>)}</select></label>
 <label>Thema<select aria-label="Werkstatt-Thema" value={topic} onChange={e=>setTopic(e.target.value)}><option value="all">Alle</option>{modules.filter(m=>domain==='all'||m.domainId===domain).map(m=><option key={m.id} value={m.id}>{m.title}</option>)}</select></label>
 <label>Schwierigkeit<select aria-label="Werkstatt-Schwierigkeit" value={level} onChange={e=>setLevel(e.target.value)}><option value="all">Alle</option><option value="grundlagen">Grundlagen</option><option value="fachkraft">Fachkraft</option><option value="meister">Meister</option></select></label>
 <label>Aufgabenart<select aria-label="Werkstatt-Aufgabenart" value={kind} onChange={e=>setKind(e.target.value)}><option value="all">Alle</option>{Object.entries(workshopKindNames).map(([id,title])=><option key={id} value={id}>{title}</option>)}</select></label>
 <label>Übungsmodus<select aria-label="Werkstatt-Übungsmodus" value={state.mode} onChange={e=>e.target.value==='exam'?openExam():setState(s=>({...s,mode:e.target.value as PracticeMode,help:e.target.value==='guided'?Math.max(s.help,1) as 1|2|3:s.help}))}><option value="guided">Geführtes Lernen</option><option value="independent">Selbstständig üben</option><option value="exam">Übungsprüfung öffnen</option></select></label>
 </div>
 <p>{filtered.length} passende Aufgaben. Filtern erhält den offenen Entwurf; eine neue Aufgabenauswahl ersetzt ihn.</p>
 <label className="workshop-picker">Aufgabe wählen<select aria-label="Werkstatt-Aufgabe" value={filtered.some(e=>e.id===entry.id)?entry.id:''} onChange={e=>select(e.target.value)}><option value="" disabled>Eine passende Aufgabe auswählen</option>{filtered.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}</select></label>
 {entry.kind==='rearrangement'?<RearrangementTrainer setProgress={setProgress} workshop progress={progress}/>:item&&<div className="workshop-body">
 <div className="academy-panel"><p className="pill">{workshopKindNames[entry.kind]} · Schritt {state.step+1} von {entry.itemIds.length}</p><TaskPrompt item={item}/>
 {state.mode==='guided'&&<div className="notice"><Explain simple="Lies zuerst Gegeben und Gesucht. Wähle dann den Zusammenhang. Notiere die Umstellung und rechne die Einheiten um. Erst am Ende runden." technical="Geführte Bearbeitung: Größen-/Modellzuordnung, Äquivalenzbedingungen, SI-Umrechnung, Einsetzen und Plausibilitätsprüfung. Dieser Modus gilt als unterstütztes Lernen."/></div>}
 <TaskAnswer item={item} answer={answer} onChange={a=>{setAnswer(a);setValidation('');setState(s=>({...s,checkedIds:s.checkedIds?.filter(id=>id!==item.id)}));setBridge(null);setSkipBridge(false);}}/>
 <p className="small-muted">Zahlenfeld: Dezimalkomma, Brüche, wissenschaftliche Schreibweise und einfache Arithmetik mit Klammern. Die Einheit separat wählen. Keine freie symbolische Algebra.</p>
 <button className="button primary" disabled={!!checked} onClick={check}>Werkstatt-Ergebnis prüfen</button>
 {validation&&<p role="alert" className="notice">{validation}</p>}
 {grade&&<div role="status" className={`feedback ${grade.correct?'success':'retry'}`}>{grade.message}<p>{state.help===3?'Mit angesehener Musterlösung bearbeitet.':state.help>0||state.mode==='guided'?'Mit Unterstützung bearbeitet.':'Ohne angebotene Hilfe bearbeitet.'}</p></div>}
 <div className="workshop-help"><button className="button secondary" onClick={()=>setState(s=>({...s,help:Math.max(s.help,1) as 1|2|3}))}>Hinweis 1</button><button className="button secondary" onClick={()=>setState(s=>({...s,help:Math.max(s.help,2) as 2|3}))}>Formelhilfe / Hinweis 2</button></div>
 {state.help>0&&<p className="notice">{item.kind==='numeric'?item.hint??'Größen und Einheiten zuerst prüfen.':'Prüfe den physikalischen Zusammenhang und die ausdrücklich genannten Modellgrenzen.'}</p>}
 {state.help>=2&&<TaskReference item={item} openModule={openModule}/>}
 {checked&&<button className="text-button" onClick={()=>setState(s=>({...s,solutionOpen:true,help:3}))}>Musterlösung ansehen</button>}
 {state.solutionOpen&&checked&&<TaskSolution item={item}/>}
 {grade?.status==='incorrect'&&item.kind==='numeric'&&!skipBridge&&<LearningBridge task={item} answer={answer} progress={progress} setProgress={setProgress} lessonId={bridge} openLesson={id=>{setBridge(id);setState(s=>({...s,help:Math.max(s.help,2) as 2|3}));}} closeLesson={()=>{setBridge(null);document.getElementById(`result-${item.id}`)?.focus();}} skip={()=>{setSkipBridge(true);setBridge(null);document.getElementById(`result-${item.id}`)?.focus();}}/>}
 {checked&&<button className="button secondary" onClick={()=>setState(s=>({...s,checkedIds:s.checkedIds?.filter(id=>id!==item.id)}))}>Selbst noch einmal versuchen</button>}
 <div className="workshop-help">{state.step>0&&<button className="text-button" onClick={()=>move(state.step-1)}>Vorheriger Rechenschritt</button>}{checked&&state.step+1<entry.itemIds.length&&<button className="button primary" onClick={()=>move(state.step+1)}>Nächster Rechenschritt</button>}</div>
 {checked&&state.step+1===entry.itemIds.length&&<p className="notice">Aufgabe bearbeitet. Zur fachlichen Selbstkontrolle: Sind Modell, Nennerbedingungen, Einheiten, Größenordnung und Grenzen deiner Schlussfolgerung benannt?</p>}
 </div>
 <section className="academy-panel worksheet" aria-label="Eigenes Rechenblatt"><h2>Dein eigener Rechenweg</h2><p>Notizen sind dein Entwurf. Freie Formeln und Begründungen werden nicht automatisch fachlich oder symbolisch bewertet.</p>{worksheetKeys.map(k=><label key={k}>{labels[k]}<textarea aria-label={`Rechenblatt: ${labels[k]}`} rows={k==='plausibility'?4:2} maxLength={2000} value={state.fields[k]} onChange={e=>setState(s=>({...s,fields:{...s.fields,[k]:e.target.value}}))}/></label>)}
 {state.fields.transformed&&<details><summary>Notierte Formel darstellen (keine Bewertung)</summary><BlockMath tex={state.fields.transformed}/></details>}
 <details><summary>Musterkriterien zur Selbstkontrolle</summary><ul><li>Größen und Einheiten vollständig?</li><li>Formel für genau dieses Modell geeignet?</li><li>Umstellung mit erlaubten Nennern und erhaltenem Definitionsbereich?</li><li>Umrechnung und Einsetzen nachvollziehbar?</li><li>Ergebnis mit Einheit und sinnvoller Größenordnung?</li><li>Grenzen und alternative Betrachtung benannt?</li></ul></details>
 <p className="small-muted">Ein letzter Werkstattentwurf bleibt einschließlich Notizen, Hilfe und Schrittposition erhalten. Neue Aufgabenauswahl ersetzt diesen Entwurf.</p>
 </section></div>}
 </section>;
}
