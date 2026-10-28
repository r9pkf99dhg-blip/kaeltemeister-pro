import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { caseSteps } from './cases';
import { learningItems } from '../exercises/items';
import { snapshotItem, gradeSnapshot } from '../exercises/engine';
import { TaskPrompt, TaskAnswer, TaskSolution, emptyAnswer } from '../exercises/TaskViews';
import { recordOutcome } from '../adaptive/algorithm';
import type { AcademyProgress } from '../model';
import type { ItemAnswer, Grade } from '../exercises/model';
export default function CaseStudy({moduleId,setProgress}:{moduleId:string;setProgress:Dispatch<SetStateAction<AcademyProgress>>}){
 const ids=caseSteps[moduleId];
 const [index,setIndex]=useState(0),[answers,setAnswers]=useState<Record<string,ItemAnswer>>({}),[grades,setGrades]=useState<Record<string,Grade>>({}),[finished,setFinished]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(index>0||finished)heading.current?.focus();},[index,finished]);
 if(!ids)return null;
 const items=ids.map(id=>learningItems.find(i=>i.id===id)!);const item=items[index];const answer=answers[item.id]??emptyAnswer(item),grade=grades[item.id];
 return <section className="academy-panel case-study" aria-label="Mehrstufige Fallstudie"><h2 tabIndex={-1} ref={heading}>Fallstudie aktiv bearbeiten</h2>
 <p>Selbst erstellter Übungsfall mit fachlicher Bewertung, keine offizielle Meisterprüfungsaufgabe und keine freigegebene Anlagenauslegung. Bewertete Versuche werden gespeichert; Schrittposition und unbewertete Fallantworten gelten für diese Sitzung.</p>
 <progress aria-label="Bearbeitete Fallschritte" max={items.length} value={finished?items.length:index}/>
 {finished?<><h3>Fallauswertung</h3><p>{items.filter(i=>grades[i.id]?.correct).length} von {items.length} zuletzt geprüften Antworten richtig. Zur fachlichen Bewertung gehört, Annahmen und Grenzen auch selbst in Worten zu begründen.</p><ul>{items.map(i=><li key={i.id}>{i.title}: {grades[i.id]?.correct?'richtig':'wiederholen'}</li>)}</ul><p>Wiederholung: Öffne die in der Lektion genannten Voraussetzungen. Fehler in Einheiten führen zur Einheitenlektion, fachliche Unsicherheit zu den Modellgrenzen des jeweiligen Lernpfads. Deine bewerteten Antworten fließen in die vorhandenen Wiederholungsempfehlungen ein.</p><button className="button secondary" onClick={()=>{setFinished(false);setIndex(0);}}>Rechenwege erneut ansehen</button></>:<>
 <p>Schritt {index+1} von {items.length}: {item.kind==='choice'?'Fachliche Bewertung und Entscheidung':'Größen klären, rechnen und prüfen'}</p>
 <TaskPrompt item={item}/><TaskAnswer item={item} answer={answer} onChange={a=>{setAnswers(v=>({...v,[item.id]:a}));setGrades(v=>{const n={...v};delete n[item.id];return n;});}}/>
 <button className="button primary" disabled={!!grade&&['correct','incorrect'].includes(grade.status)} onClick={()=>{
  const g=gradeSnapshot(snapshotItem(item),answer);setGrades(v=>({...v,[item.id]:g}));
  if(g.status==='correct'||g.status==='incorrect')setProgress(p=>recordOutcome({...p,exerciseAnswers:{...p.exerciseAnswers,[item.id]:{answer,correct:g.correct,revision:item.revision,answeredAt:new Date().toISOString()}}},item,g.correct));
 }}>Fallschritt prüfen</button>
 {grade&&<div role={['invalid','unanswered'].includes(grade.status)?'alert':'status'} className={`feedback ${grade.correct?'success':'retry'}`}>{grade.message}</div>}
 {grade&&['correct','incorrect'].includes(grade.status)&&<><TaskSolution item={item}/><p>Vergleiche den Lösungsweg mit deinem eigenen Ansatz. Die nächste Teilaufgabe gibt benötigte Größen erneut an, damit ein früherer Fehler nicht unbemerkt weitergerechnet wird.</p><button className="button secondary" onClick={()=>index+1===items.length?setFinished(true):setIndex(i=>i+1)}>{index+1===items.length?'Fall auswerten':'Nächster Fallschritt'}</button></>}
 {index>0&&<button className="text-button" onClick={()=>setIndex(i=>i-1)}>Vorheriger Fallschritt</button>}
 </>}
 </section>;
}
