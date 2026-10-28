import { useId, useState } from 'react';
function sinePath(phase:number){return Array.from({length:121},(_,i)=>`${i===0?'M':'L'}${30+i*3},${110-65*Math.sin(i/120*2*Math.PI-phase)}`).join(' ');}
export default function Diagrams({moduleId}:{moduleId:string}){
 const [degrees,setDegrees]=useState('30');const id=useId();
 if(!['electric-ac-wave','electric-ac-reactance','electric-ac-power','electric-three-phase'].includes(moduleId))return null;
 const phi=Number(degrees)*Math.PI/180;
 return <section className="technical-diagrams"><h2>Zusammenhang im Diagramm</h2>
 {moduleId==='electric-ac-power'?<>
 <svg viewBox="0 0 400 240" role="img" aria-labelledby={id}><title id={id}>Induktives Leistungsdreieck: P 120 Watt, Q 160 var und S 200 VA</title><path d="M40 210 L184 210 L184 18 Z" fill="none" stroke="currentColor" strokeWidth="3"/><text x="80" y="232">P = 120 W</text><text x="194" y="120">Q = 160 var</text><text x="2" y="65">S = 200 VA</text></svg>
 <p>Rechtwinkliges Dreieck im reinen Sinusmodell: 120² + 160² = 200². Die Achsen zeigen verschiedene Leistungsarten; die Einheiten bleiben W, var und VA. Für verzerrte Signale reicht dieses Dreieck nicht allgemein.</p></>:<>
 {moduleId!=='electric-three-phase'&&<label>Strom nacheilend um<select aria-label="Strom nacheilend um" value={degrees} onChange={e=>setDegrees(e.target.value)}>{['0','30','60','90'].map(d=><option key={d} value={d}>{d}°</option>)}</select></label>}
 <svg viewBox="0 0 420 230" role="img" aria-labelledby={id}><title id={id}>{moduleId==='electric-three-phase'?'Drei normierte Sinusspannungen mit 120 Grad Phasenabstand':`Normierte Spannung und um ${degrees} Grad nacheilender Strom`}</title>
 <path d="M30 25 V195 M30 110 H390" fill="none" stroke="currentColor"/><text x="5" y="46">+1</text><text x="6" y="180">−1</text><text x="28" y="214">0</text><text x="192" y="214">T/2</text><text x="380" y="214">T</text>
 <path d={sinePath(0)} fill="none" stroke="#0369a1" strokeWidth="3"/>
 <path d={sinePath(moduleId==='electric-three-phase'?2*Math.PI/3:phi)} fill="none" stroke="#b45309" strokeWidth="3" strokeDasharray="8 4"/>
 {moduleId==='electric-three-phase'&&<path d={sinePath(4*Math.PI/3)} fill="none" stroke="#7e22ce" strokeWidth="3" strokeDasharray="2 4"/>}</svg>
 <p>{moduleId==='electric-three-phase'?'Blau durchgezogen: Phase 1; orange gestrichelt: Phase 2, um 120° versetzt; violett gepunktet: Phase 3, um 240° versetzt. Gleiche Amplituden, gleiche Frequenz; Summe der drei Momentanwerte ist null.':'Blau durchgezogen: u/Û, orange gestrichelt: i/Î. Beide Achsenwerte sind auf ihre eigenen Scheitelwerte normiert; gleiche Kurvenhöhe bedeutet keine Gleichheit von Volt und Ampere.'}</p>
 <details><summary>Diagramm als Text lesen</summary><p>{moduleId==='electric-three-phase'?'Bei t = 0 sind die normierten Werte 0, −√3/2 und +√3/2. Alle drei Spannungen haben dieselbe Periodendauer T.':'Bei t = 0 ist die normierte Spannung null. Der normierte Strom ist −sin φ. Bei t = T/4 ist die Spannung +1 und der Strom cos φ. Bei φ = 0 sind beide in Phase; bei φ = 90° liegt der Strom um eine Viertelperiode zurück.'}</p></details>
 </>}
 </section>;
}
