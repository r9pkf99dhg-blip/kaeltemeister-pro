import {it,expect}from'vitest';import{parseArithmetic}from'./expression';
it.each([['1,5e3',1500],['(3+2)*4',20],['-1/2',-.5],['-2^2',-4],['(-2)^2',4],['2^-3',.125],['2^3^2',512],['1e-3 * 1000',1],['3·4−2',10]])('berechnet %s mit geprüfter Rangfolge',(s,n)=>expect(parseArithmetic(String(s))).toBe(n));
it.each(['1/0','0^0','0^-1','2^0.5','2^13','1e309','1.000,5','Math.random()','alert(1)','x+1','2(3)','1++','('.repeat(25)+'1'+')'.repeat(25),'1'.repeat(201)])('weist %s sicher zurück',s=>expect(()=>parseArithmetic(s)).toThrow());
