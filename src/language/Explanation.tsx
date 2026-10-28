import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { MathText } from '../math/Math';
export type ExplanationLevel='simple'|'technical';
export interface ExplanationPair {simple:string;technical:string;}
const Context=createContext<ExplanationLevel>('technical');
export const useExplanation=()=>useContext(Context);
export function ExplanationProvider({level,children}:{level:ExplanationLevel;children:ReactNode}){return <Context.Provider value={level}>{children}</Context.Provider>;}
export function Explain({simple,technical}:ExplanationPair){const mode=useExplanation();return <MathText text={mode==='simple'?simple:technical}/>;}
export function ExplanationPreference({value,change}:{value:ExplanationLevel;change:(v:ExplanationLevel)=>void}){return <fieldset className="language-preference"><legend>Bevorzugte Erklärungsebene</legend>{(['simple','technical']as const).map(v=><button type="button" key={v} aria-pressed={value===v} className={`button ${value===v?'primary':'secondary'}`} onClick={()=>change(v)}>{v==='simple'?'Einfach erklärt':'Fachsprache'}</button>)}<p>Die Erklärungsebene verändert weder Formeln noch Schwierigkeit oder Bewertung.</p></fieldset>;}
export function LessonExplanation({lessonId,children}:{lessonId:string;children:ReactNode}){
 const global=useExplanation();const[local,setLocal]=useState<'inherit'|ExplanationLevel>('inherit');useEffect(()=>setLocal('inherit'),[lessonId]);
 return <Context.Provider value={local==='inherit'?global:local}><label className="lesson-language">Darstellung dieser Lektion<select aria-label="Darstellung dieser Lektion" value={local} onChange={e=>setLocal(e.target.value as typeof local)}><option value="inherit">Bevorzugte Erklärungsebene verwenden</option><option value="simple">Nur hier: Einfach erklärt</option><option value="technical">Nur hier: Fachsprache</option></select></label>{children}</Context.Provider>;
}
