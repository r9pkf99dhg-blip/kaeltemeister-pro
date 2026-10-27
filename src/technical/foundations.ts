/** Begrenzte Schulmathematik: keine Auswertung frei eingegebener Formeln. */
export const schoolKinds = ['math-order','math-fraction-add','math-fraction-subtract','math-fraction-multiply','math-fraction-divide','math-percent-value','math-percent-rate','math-proportion','math-term','math-linear','math-power','math-root','identity'] as const;
export type SchoolKind = typeof schoolKinds[number];
export function calculateSchool(kind: SchoolKind, values: Record<string, number>) {
 const get=(id:string)=>{const v=values[id];if(!Number.isFinite(v))throw new Error('Endliche Werte erforderlich.');return v;};
 const divisor=(id:string)=>{const v=get(id);if(v===0)throw new Error('Division durch null ist nicht definiert.');return v;};
 let result:number;
 switch(kind){
  case 'math-order': result=get('a')+get('b')*get('c');break;
  case 'math-fraction-add':result=get('n1')/divisor('d1')+get('n2')/divisor('d2');break;
  case 'math-fraction-subtract':result=get('n1')/divisor('d1')-get('n2')/divisor('d2');break;
  case 'math-fraction-multiply':result=(get('n1')/divisor('d1'))*(get('n2')/divisor('d2'));break;
  case 'math-fraction-divide':result=(get('n1')/divisor('d1'))/(divisor('n2')/divisor('d2'));break;
  case 'math-percent-value':result=get('base')*get('rate');break;
  case 'math-percent-rate':result=get('part')/divisor('base');break;
  case 'math-proportion':result=get('target')*get('value')/divisor('base');break;
  case 'math-term':result=get('a')*(get('x')+get('b'));break;
  case 'math-linear':result=(get('c')-get('b'))/divisor('a');break;
  case 'math-power':{const exponent=get('exponent');if(!Number.isInteger(exponent)||Math.abs(exponent)>100)throw new Error('Hier nur ganzzahlige Exponenten von −100 bis 100.'); const base=get('base');if(base===0&&exponent<=0)throw new Error('Null hoch null und negative Potenzen von null werden hier ausgeschlossen.');result=base**exponent;break;}
  case 'math-root':{const v=get('value');if(v<0)throw new Error('Keine reelle Quadratwurzel einer negativen Zahl.');result=Math.sqrt(v);break;}
  case 'identity':result=get('value');break;
 }
 if(!Number.isFinite(result))throw new Error('Ergebnis nicht endlich.');return result;
}

/** Ein explizites numerisches Antwortfeld darf zusätzlich einen einfachen Bruch enthalten. */
export function parseSchoolAnswer(value: string): number {
 const parts=value.trim().replaceAll(',', '.').split('/');
 const decimal=/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/;
 if(parts.length<1||parts.length>2||!parts.every(p=>decimal.test(p.trim()))) return NaN;
 const numerator=Number(parts[0]); if(parts.length===1)return numerator;
 const denominator=Number(parts[1]);return denominator===0?NaN:numerator/denominator;
}
