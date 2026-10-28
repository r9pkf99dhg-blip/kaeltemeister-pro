import{it,expect}from'vitest';import{calculators}from'./catalog';import{runCalculator,initialLabValues}from'./engine';import{convertUnit}from'./units';import{units,toSI}from'../technical/calculations';import{formulas,modules}from'../academy/catalog';import{learningItems}from'../academy/exercises/items';
// Separate feste Sollwerte in SI, nicht aus Produktfunktionen erzeugt.
const refs:Record<string,number>={'heat-power':10450,'heat-flow':.5,'heat-difference':5,'heat-cp':4180,'ohm-voltage':24,'ohm-current':.2,'ohm-resistance':120,'dc-power':4.8,'dc-i2r':4.8,'dc-u2r':4.8,'ac-apparent':200,'ac-real':120,'ac-inductive':160,'ac-capacitive':-160,'three-power':5542.562584220407,'star-voltage':173.20508075688772,'delta-current':3.4641016151377544,'circle':.0003801327110843649,'ring':.00007225663103256525,'volume':.0038013271108436494,'mantle':.6911503837897545,'total-surface':.6919106492119232,'conduction':16,'resistance':1.25,'layers':8,'u-value':.1923076923076923};
it.each(calculators.map(c=>[c.id,c]as const))('%s besitzt eine unabhängige SI-Referenz und gültige Lernverknüpfungen',(id,c)=>{expect(runCalculator(c,initialLabValues(c)).resultSI).toBeCloseTo(refs[id],9);expect(modules.some(m=>m.id===c.moduleId)).toBe(true);expect(formulas.some(f=>f.id===c.formulaId)).toBe(true);expect(learningItems.some(i=>i.id===c.exerciseId)).toBe(true);});
it('überspringt keine neue Rechnerreferenz',()=>expect(calculators.map(c=>c.id).sort()).toEqual(Object.keys(refs).sort()));
it('prüft Temperatur, Differenz, Zeitfaktor, Potenzen und Leistungsarten getrennt',()=>{
 expect(convertUnit(-10,'°C','K','temperature').result).toBeCloseTo(263.15,10);expect(convertUnit(-5,'K','°C','temperature-difference').result).toBe(-5);expect(convertUnit(1.5,'m³/h','m³/s','volume-flow').result).toBeCloseTo(.0004166666666666667,12);expect(convertUnit(314,'mm²','m²','area').result).toBeCloseTo(.000314,12);expect(()=>convertUnit(1,'VA','W','power')).toThrow();expect(()=>convertUnit(1,'var','VA','reactive-power')).toThrow();expect(()=>convertUnit(-274,'°C','K','temperature')).toThrow();
 for(const [q,choices]of Object.entries(units))for(const unit of choices){const quantity=q as keyof typeof units;const x=quantity==='temperature'&&unit==='°C'?20:2;expect(convertUnit(x,unit,unit,quantity).result).toBeCloseTo(x,9);}
});
it('verhindert ungültige Eingaben, Nullnenner, widersprüchliche Geometrie und Leistungsfaktoren',()=>{
 for(const c of calculators){const v=initialLabValues(c);v[c.inputs[0].id].value='abc';expect(()=>runCalculator(c,v)).toThrow();}
 for(const [id,key,value]of [['heat-flow','deltaT','0'],['heat-cp','massFlow','0'],['dc-u2r','resistance','0'],['ac-real','factor','1.1'],['ring','inner','25'],['conduction','thickness','0']]as const){const c=calculators.find(c=>c.id===id)!,v=initialLabValues(c);v[key].value=value;expect(()=>runCalculator(c,v)).toThrow();}
 expect(toSI(-160,'var','reactive-power')).toBe(-160);
});
it('prüft die Proportionalität der Heat-Kurve über denselben Kern mit unabhängiger Verhältnisreferenz',()=>{
 const c=calculators.find(c=>c.id==='heat-power')!,a=initialLabValues(c),b=initialLabValues(c);a.massFlow.value='.5';b.massFlow.value='1';expect(runCalculator(c,b).resultSI).toBe(20900);expect(runCalculator(c,b).resultSI/runCalculator(c,a).resultSI).toBe(2);
});
