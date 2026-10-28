import type { CalculationKind,Quantity } from '../technical/calculations';
import type { ExplanationPair } from '../language/Explanation';
export type LabGroup='heat'|'electrical'|'geometry'|'transfer';
export interface LabField {id:string;label:string;quantity:Quantity;value:number;unit:string;}
export interface CalculatorDefinition {id:string;group:LabGroup;title:string;explanation:ExplanationPair;kind:CalculationKind;formulaId:string;quantity:Quantity;answerUnit:string;inputs:LabField[];moduleId:string;exerciseId:string;limits:ExplanationPair;}
