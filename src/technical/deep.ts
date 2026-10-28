/** Geprüfte SI-Lehrmodelle; verwendbar von Aufgaben und späteren Rechnern. Kein eval/CAS. */
export const deepKinds = ['circle-area','annulus-area','cylinder-volume','cylinder-surface','pythagoras','triangle-side','slope-angle','linear-system-x','quadratic-larger-root','interpolation','logarithm'] as const;
export type DeepKind = typeof deepKinds[number];
export function calculateDeep(kind: DeepKind, values: Record<string,number>):number {
 const n=(id:string)=>{const v=values[id];if(!Number.isFinite(v))throw new Error('Fehlender oder nicht endlicher Wert.');return v;};
 const p=(id:string,zero=false)=>{const v=n(id);if(v<0||(!zero&&v===0))throw new Error('Positive Größe erforderlich.');return v;};
 let r:number;
 switch(kind){
 case 'circle-area':r=Math.PI*p('diameter')**2/4;break;
 case 'annulus-area':{const d=p('outer'),i=p('inner',true);if(i>=d)throw new Error('Innendurchmesser muss kleiner sein.');r=Math.PI*(d-i)*(d+i)/4;break;}
 case 'cylinder-volume':r=Math.PI*p('diameter')**2*p('length')/4;break;
 case 'cylinder-surface':r=Math.PI*p('diameter')*p('length');break;
 case 'pythagoras':r=Math.hypot(p('a',true),p('b',true));break;
 case 'triangle-side':{const angle=p('angle');if(angle>=Math.PI/2)throw new Error('Spitzer Winkel erforderlich.');r=p('adjacent')*Math.tan(angle);break;}
 case 'slope-angle':r=Math.atan(p('height',true)/p('horizontal'));break;
 case 'linear-system-x':{const a=n('a'),b=n('b'),c=n('c'),d=n('d'),e=n('e'),f=n('f');const det=a*e-b*d;if(det===0||!Number.isFinite(det))throw new Error('Keine eindeutige Lösung.');r=(c*e-b*f)/det;break;}
 case 'quadratic-larger-root':{const a=n('a'),b=n('b'),c=n('c');if(a===0)throw new Error('Keine quadratische Gleichung.');const disc=b*b-4*a*c;if(disc<0||!Number.isFinite(disc))throw new Error('Keine endlichen reellen Nullstellen.');const q=-.5*(b+(b>=0?1:-1)*Math.sqrt(disc));r=q===0?0:Math.max(q/a,c/q);break;}
 case 'interpolation':{const x=n('x'),x0=n('x0'),x1=n('x1');if(x0===x1||x<Math.min(x0,x1)||x>Math.max(x0,x1))throw new Error('Nur Interpolation zwischen verschiedenen Stützstellen.');r=n('y0')+(n('y1')-n('y0'))*(x-x0)/(x1-x0);break;}
 case 'logarithm':{const base=p('base');if(base===1)throw new Error('Logarithmusbasis darf nicht eins sein.');r=Math.log(p('value'))/Math.log(base);break;}
 default:throw new Error('Unbekanntes Lehrmodell.');
 }
 if(!Number.isFinite(r))throw new Error('Nicht endliches Ergebnis.');return r;
}
