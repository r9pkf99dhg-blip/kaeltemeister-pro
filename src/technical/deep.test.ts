import { expect, it } from 'vitest';
import { calculateDeep } from './deep';
import { toSI, fromSI } from './calculations';
it('prüft Geometrie unabhängig über Kreisverhältnis, Pythagoras und Grenzfälle',()=>{
 expect(calculateDeep('circle-area',{diameter:2})).toBeCloseTo(Math.PI,12);
 expect(calculateDeep('annulus-area',{outer:4,inner:2})).toBeCloseTo(3*Math.PI,12);
 expect(calculateDeep('cylinder-volume',{diameter:2,length:3})).toBeCloseTo(3*Math.PI,12);
 expect(calculateDeep('cylinder-surface',{diameter:2,length:3})).toBeCloseTo(6*Math.PI,12);
 expect(calculateDeep('pythagoras',{a:5,b:12})).toBe(13);
 expect(calculateDeep('triangle-side',{adjacent:1,angle:Math.PI/4})).toBeCloseTo(1,12);
 expect(calculateDeep('slope-angle',{height:1,horizontal:1})).toBeCloseTo(Math.PI/4,12);
 expect(()=>calculateDeep('annulus-area',{outer:2,inner:2})).toThrow();
 expect(()=>calculateDeep('triangle-side',{adjacent:1,angle:Math.PI/2})).toThrow();
 expect(()=>calculateDeep('circle-area',{diameter:Infinity})).toThrow();
});
it('prüft Systeme, beide quadratischen Proben und Definitionsbereiche',()=>{
 expect(calculateDeep('linear-system-x',{a:1,b:1,c:5,d:2,e:-1,f:1})).toBe(2);
 expect(()=>calculateDeep('linear-system-x',{a:1,b:1,c:5,d:2,e:2,f:1})).toThrow();
 expect(calculateDeep('quadratic-larger-root',{a:1,b:-5,c:6})).toBe(3);
 for(const x of [2,3])expect(x*x-5*x+6).toBe(0);
 expect(calculateDeep('quadratic-larger-root',{a:1,b:0,c:0})).toBe(0);
 expect(calculateDeep('quadratic-larger-root',{a:-1,b:0,c:4})).toBe(2);
 expect(()=>calculateDeep('quadratic-larger-root',{a:1,b:0,c:1})).toThrow();
 expect(()=>calculateDeep('quadratic-larger-root',{a:0,b:2,c:1})).toThrow();
 expect(calculateDeep('interpolation',{x0:0,x1:10,y0:10,y1:30,x:5})).toBe(20);
 expect(()=>calculateDeep('interpolation',{x0:0,x1:10,y0:10,y1:30,x:11})).toThrow();
 expect(()=>calculateDeep('logarithm',{base:1,value:100})).toThrow();
 expect(()=>calculateDeep('logarithm',{base:10,value:0})).toThrow();
 expect(calculateDeep('logarithm',{base:2,value:8})).toBeCloseTo(3,12);
});
it('unterscheidet Quadrat-/Kubikvorsilben und Grad/Bogenmaß',()=>{
 expect(toSI(1,'mm²','area')).toBe(.000001);
 expect(toSI(1,'cm³','volume')).toBe(.000001);
 expect(toSI(180,'°','angle')).toBeCloseTo(Math.PI,12);
 expect(fromSI(Math.PI/6,'°','angle')).toBeCloseTo(30,12);
});
it('prüft Sinusmittel, Leistung und dreiphasige Zeiger unabhängig',()=>{
 // Numerische Periodenintegration als unabhängige Kontrolle der analytischen Formeln.
 const N=3600,phi=Math.acos(.6);let square=0,power=0;
 for(let i=0;i<N;i++){const t=2*Math.PI*i/N;const u=100*Math.SQRT2*Math.sin(t),j=2*Math.SQRT2*Math.sin(t-phi);square+=u*u/N;power+=u*j/N;}
 expect(Math.sqrt(square)).toBeCloseTo(100,8);expect(power).toBeCloseTo(120,8);
 expect(calculateDeep('ac-real',{voltage:100,current:2,factor:.6})).toBeCloseTo(power,8);
 expect(calculateDeep('ac-reactive',{voltage:100,current:2,factor:.6})).toBeCloseTo(160,10);
 expect(120**2+160**2).toBe(200**2);
 const ux=100-100*Math.cos(2*Math.PI/3),uy=-100*Math.sin(2*Math.PI/3);
 expect(Math.hypot(ux,uy)).toBeCloseTo(calculateDeep('ac-star-voltage',{phaseVoltage:100}),10);
 expect(calculateDeep('ac-three-power',{voltage:100*Math.sqrt(3),current:2,factor:.6})).toBeCloseTo(3*100*2*.6,10);
 expect(calculateDeep('ac-delta-current',{phaseCurrent:2/Math.sqrt(3)})).toBeCloseTo(2,10);
 for(const phi of [0,.3,1])expect(Math.sin(phi)+Math.sin(phi-2*Math.PI/3)+Math.sin(phi-4*Math.PI/3)).toBeCloseTo(0,12);
});
it('bewahrt elektrische Einheiten und Grenzen des Sinusmodells',()=>{
 expect(toSI(100,'µF','capacitance')).toBe(.0001);
 expect(toSI(100,'mH','inductance')).toBe(.1);
 expect(toSI(1,'kVA','apparent-power')).toBe(1000);
 expect(()=>toSI(1,'VA','power')).toThrow();expect(()=>toSI(1,'W','reactive-power')).toThrow();
 expect(()=>calculateDeep('ac-xc',{frequency:0,capacitance:1})).toThrow();
 expect(()=>calculateDeep('ac-real',{voltage:100,current:2,factor:1.1})).toThrow();
 expect(()=>calculateDeep('ac-factor',{power:201,apparent:200})).toThrow();
 expect(calculateDeep('ac-reactive',{voltage:100,current:2,factor:1})).toBe(0);
});
it('kontrolliert stationäre Wärmeübertragung, Bezugsdruck und Volumenstrom unabhängig',()=>{
 expect(calculateDeep('pressure-absolute',{gauge:200000,ambient:100000})).toBe(300000);
 expect(calculateDeep('volume-to-mass',{density:1000,volumeFlow:.0005})).toBe(.5);
 expect(toSI(1.8,'m³/h','volume-flow')).toBe(.0005);
 expect(toSI(30,'L/min','volume-flow')).toBe(.0005);
 expect(calculateDeep('latent-heat',{mass:2,latent:200000})).toBe(400000);
 const r=calculateDeep('thermal-resistance',{thickness:.1,conductivity:.04,area:2});expect(r).toBe(1.25);
 const q=calculateDeep('conduction',{thickness:.1,conductivity:.04,area:2,deltaT:20});expect(q).toBe(16);expect(q*r).toBe(20);
 expect(calculateDeep('layered-conduction',{d1:.1,lambda1:.04,d2:.1,lambda2:.04,area:2,deltaT:20})).toBe(8);
 expect(calculateDeep('overall-u',{inside:10,outside:10,d1:.04,lambda1:.04,d2:.04,lambda2:.04})).toBeCloseTo(1/2.2,12);
 expect(calculateDeep('cycle-condenser',{coolingPower:15000,fluidPower:5000})).toBe(20000);
 expect(()=>calculateDeep('conduction',{thickness:0,conductivity:.04,area:2,deltaT:20})).toThrow();
 expect(()=>calculateDeep('specific-volume',{density:0})).toThrow();
 expect(()=>calculateDeep('overall-u',{inside:0,outside:10,d1:.04,lambda1:.04,d2:.04,lambda2:.04})).toThrow();
});
