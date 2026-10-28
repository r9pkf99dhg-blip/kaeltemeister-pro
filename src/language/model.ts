import type { Level,LearningContent } from '../academy/model';
/** Nur sprachliche Fassung; Formeln, Quellen, Modellgrenzen, Beispiele und Aufgaben bleiben im Fachkatalog. */
export interface SimpleCore {
 id:string;
 introduction:string;
 levels:Record<Level,string>;
 connections:string;
 summary:string;
}
export function simpleContent(original:LearningContent,core:SimpleCore,level:Level):LearningContent{return {...original,introduction:core.introduction,explanation:core.levels[level],connections:core.connections,summary:core.summary};}
