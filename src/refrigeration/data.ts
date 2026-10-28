import raw from './data/r134a-v1.json';
export interface StatePoint {p:number;h:number;T:number;s:number;rho:number;quality:number|null;}
export interface PHPoint {p:number;h:number;}
export interface RefrigerationCase {id:string;title:string;evaporationC:number;condensationC:number;superheatK:number;subcoolingK:number;etaIs:number;points:StatePoint[];isentropicOutlet:StatePoint;compression:PHPoint[];}
export const refrigerantData=raw;
export const refrigerationCases:RefrigerationCase[]=raw.cases;
export function getRefrigerationCase(id:string){const result=refrigerationCases.find(c=>c.id===id);if(!result)throw new Error('Dieser Betriebsfall gehört nicht zum geprüften R134a-Katalog.');return result;}
