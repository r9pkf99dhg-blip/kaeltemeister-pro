import type { Module, Formula, Source, AcademyQuestion, Flashcard } from '../model';
export interface FoundationLesson {
 id: string; domainId: string; title: string; goal: string; why: string;
 basic: string; reasoning: string; transfer: string; example: string;
 derivation: string[]; mistakes: string[]; summary: string; prerequisites: string[];
 formulaIds: string[]; sourceIds: string[];
 questions: { prompt: string; correct: string; wrong: [string,string]; explanation: string }[];
}
export function lessonModule(lesson: FoundationLesson): Module {
 const common = { introduction: `${lesson.goal} Du gehst in kleinen Schritten vor: erst die Bedeutung verstehen, dann die Regel begründen und zuletzt mit Zahlen und Einheiten prüfen.`, connections: lesson.why, example: lesson.example, mistakes: lesson.mistakes, summary: lesson.summary, deepening: lesson.transfer, derivation: lesson.derivation };
 return { id: lesson.id,revision:1,domainId:lesson.domainId,title:lesson.title,description:lesson.goal,objectiveIds:[`${lesson.id}-objective`],formulaIds:lesson.formulaIds,sourceIds:lesson.sourceIds,termIds:[],questionIds:lesson.questions.map((_,i)=>`${lesson.id}-q${i+1}`),cardIds:[`${lesson.id}-card1`,`${lesson.id}-card2`],prerequisites:lesson.prerequisites,review:'awaiting-expert-review',related:[],levels:{grundlagen:{...common,explanation:lesson.basic},fachkraft:{...common,explanation:lesson.reasoning},meister:{...common,explanation:lesson.transfer}} };
}
export function lessonQuestions(lesson: FoundationLesson): AcademyQuestion[] {
 return lesson.questions.map((q,i)=>{const id=`${lesson.id}-q${i+1}`;const options=[q.correct,...q.wrong].map((text,j)=>({id:`${id}-option-${j}`,text}));return {id,revision:1,moduleId:lesson.id,level:(['grundlagen','fachkraft','meister'] as const)[Math.min(i,2)],prompt:q.prompt,options:[...options.slice((i+1)%3),...options.slice(0,(i+1)%3)],correctOptionId:options[0].id,explanation:q.explanation,objectiveId:`${lesson.id}-objective`,sourceIds:lesson.sourceIds};});
}
export function lessonCards(lesson: FoundationLesson): Flashcard[] {return [{id:`${lesson.id}-card1`,revision:1,moduleId:lesson.id,front:`Was ist die Grundidee: ${lesson.title}?`,back:lesson.summary,sourceIds:lesson.sourceIds},{id:`${lesson.id}-card2`,revision:1,moduleId:lesson.id,front:`Welchen Fehler vermeidest du bei ${lesson.title}?`,back:lesson.mistakes.join(' '),sourceIds:lesson.sourceIds}];}
export type FoundationRegister = {formulas:Formula[];sources:Source[]};
