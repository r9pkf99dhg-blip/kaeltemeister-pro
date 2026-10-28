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
