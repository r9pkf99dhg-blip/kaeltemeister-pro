import type { CalculationKind } from '../technical/calculations';
export function displayNumber(n:number){if(!Number.isFinite(n))return 'nicht darstellbar';return n!==0&&(Math.abs(n)<.001||Math.abs(n)>=1e8)?n.toExponential(6).replace('.',','):new Intl.NumberFormat('de-DE',{maximumSignificantDigits:8}).format(n);}
export function numberTex(n:number){if(!Number.isFinite(n))throw new Error('Ungültige Formelzahl.');const s=String(n);if(/[eE]/.test(s)){const[m,e]=s.split(/[eE]/);return `${m.replace('.','{,}')}\\cdot10^{${Number(e)}}`;}return s.replace('.','{,}');}
export function substitutionTex(kind:CalculationKind,v:Record<string,number>):string{
 const n=(id:string)=>`(${numberTex(v[id])})`;
 const frac=(a:string,b:string)=>`\\frac{${a}}{${b}}`;
 switch(kind){
 case'heat':return`${n('massFlow')}\\cdot${n('cp')}\\cdot${n('deltaT')}`;
 case'mass-flow':return frac(n('heat'),`${n('cp')}\\cdot${n('deltaT')}`);
 case'temperature-difference':return frac(n('heat'),`${n('massFlow')}\\cdot${n('cp')}`);
 case'heat-cp':return frac(n('heat'),`${n('massFlow')}\\cdot${n('deltaT')}`);
 case'ohm-voltage':return`${n('resistance')}\\cdot${n('current')}`;
 case'ohm-current':return frac(n('voltage'),n('resistance'));
 case'ohm-resistance':return frac(n('voltage'),n('current'));
 case'dc-power':case'ac-apparent':return`${n('voltage')}\\cdot${n('current')}`;
 case'dc-power-i2r':return`${n('current')}^2\\cdot${n('resistance')}`;
 case'dc-power-u2r':return frac(`${n('voltage')}^2`,n('resistance'));
 case'ac-real':return`${n('voltage')}\\cdot${n('current')}\\cdot${n('factor')}`;
 case'ac-reactive':case'ac-reactive-capacitive':return`${kind==='ac-reactive-capacitive'?'-':''}${n('voltage')}\\cdot${n('current')}\\cdot\\sqrt{1-${n('factor')}^2}`;
 case'ac-three-power':return`\\sqrt3\\cdot${n('voltage')}\\cdot${n('current')}\\cdot${n('factor')}`;
 case'ac-star-voltage':return`\\sqrt3\\cdot${n('phaseVoltage')}`;
 case'ac-delta-current':return`\\sqrt3\\cdot${n('phaseCurrent')}`;
 case'circle-area':return frac(`\\pi${n('diameter')}^2`,'4');
 case'annulus-area':return`\\frac\\pi4\\left(${n('outer')}^2-${n('inner')}^2\\right)`;
 case'cylinder-volume':return`${frac(`\\pi${n('diameter')}^2`,'4')}\\cdot${n('length')}`;
 case'cylinder-surface':return`\\pi${n('diameter')}\\cdot${n('length')}`;
 case'cylinder-total-surface':return`\\pi${n('diameter')}\\cdot${n('length')}+${frac(`\\pi${n('diameter')}^2`,'2')}`;
 case'conduction':return frac(`${n('conductivity')}\\cdot${n('area')}\\cdot${n('deltaT')}`,n('thickness'));
 case'thermal-resistance':return frac(n('thickness'),`${n('conductivity')}\\cdot${n('area')}`);
 case'layered-conduction':return frac(`${n('area')}\\cdot${n('deltaT')}`,`${frac(n('d1'),n('lambda1'))}+${frac(n('d2'),n('lambda2'))}`);
 case'overall-u':return frac('1',`${frac('1',n('inside'))}+${frac(n('d1'),n('lambda1'))}+${frac(n('d2'),n('lambda2'))}+${frac('1',n('outside'))}`);
 default:throw new Error('Für diese Rechnung fehlt die geprüfte Einsetzdarstellung.');
 }
}
