import type { ItemAnswer } from '../academy/exercises/model';
export type PracticeMode='guided'|'independent';
export type WorkshopKind='choice'|'numeric'|'formula'|'rearrangement'|'conversion'|'error'|'steps'|'decision';
export const worksheetKeys=['given','sought','formula','transformed','conversion','substitution','plausibility'] as const;
export type Worksheet=Record<typeof worksheetKeys[number],string>;
export const emptyWorksheet=():Worksheet=>({given:'',sought:'',formula:'',transformed:'',conversion:'',substitution:'',plausibility:''});
export interface WorkshopState {entryId:string;kind:WorkshopKind;mode:PracticeMode;fields:Worksheet;help:0|1|2|3;step:number;choices:Record<string,string>;solutionOpen:boolean;}
export interface TrainerState {caseId:string;index:number;answer:string;checked:boolean;correct:boolean;}
export interface LabDraft {calculatorId:string;values:Record<string,ItemAnswer>;updatedAt:string;}
