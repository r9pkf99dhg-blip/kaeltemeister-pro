"""Reproducible, bounded educational HEOS::R134a catalogue; never a free property API."""
import hashlib, json, math
from pathlib import Path
import CoolProp, CoolProp.CoolProp as CP
VERSION='7.2.0'
REVISION='98b3523d5daa98454618d381d2ae53f7471d216b'
assert CoolProp.__version__ == VERSION
assert CP.get_global_param_string('gitrevision') == REVISION
CP.set_reference_state('R134a','IIR')
F='HEOS::R134a'
def prop(out,a,x,b,y):
    n=CP.PropsSI(out,a,x,b,y,F)
    if not math.isfinite(n): raise ValueError('Nonfinite property')
    return n

def state(a,x,b,y):
    q=prop('Q',a,x,b,y)
    return {k:prop(out,a,x,b,y) for k,out in [('p','P'),('h','Hmass'),('T','T'),('s','Smass'),('rho','Dmass')]} | {'quality': q if 0<=q<=1 else None}

settings=[('basis','Basiskreis: −10 / 35 °C',-10,35,5,3,1),('kuehlraum','Vergleich: −5 / 40 °C',-5,40,5,5,1),('verdampfung','Höheres Verdampfungsniveau: 0 / 35 °C',0,35,5,3,1),('verfluessigung','Höheres Verflüssigungsniveau: −10 / 45 °C',-10,45,5,3,1),('ueberhitzung','Mehr Überhitzung: −10 / 35 °C',-10,35,10,3,1),('unterkuehlung','Mehr Unterkühlung: −10 / 35 °C',-10,35,5,8,1),('eta075','Endzustand mit ηis = 0,75',-10,35,5,3,.75),('transfer','Transferfall: 5 / 40 °C',5,40,7,4,1)]
cases=[]
for id,title,te,tc,sh,sc,eta in settings:
    pe=prop('P','T',te+273.15,'Q',1); pc=prop('P','T',tc+273.15,'Q',0)
    one=state('P',pe,'T',te+273.15+sh); two_s=state('P',pc,'Smass',one['s'])
    two=state('P',pc,'Hmass',one['h']+(two_s['h']-one['h'])/eta)
    three=state('P',pc,'T',tc+273.15-sc); four=state('P',pe,'Hmass',three['h'])
    points=[one,two,three,four]
    for v in points:
        assert v['p']>0 and v['T']>0 and v['rho']>0
        # Independent input-pair flash roundtrip, same EOS (not an independent fluid model).
        assert abs(prop('Hmass','P',v['p'],'Smass',v['s'])-v['h']) < .02
    assert one['h']>four['h'] and two['h']>one['h'] and three['h']==four['h']
    assert 0<four['quality']<1 and two['s']>=one['s']-.00001
    compression=[]
    if eta==1:
        for n in range(41):
            p=pe*(pc/pe)**(n/40)
            compression.append({'p':p,'h':prop('Hmass','P',p,'Smass',one['s'])})
    cases.append({'id':f'r134a-{id}-v1','title':title,'evaporationC':te,'condensationC':tc,'superheatK':sh,'subcoolingK':sc,'etaIs':eta,'points':points,'isentropicOutlet':two_s,'compression':compression})

sat=[]; qlines={str(x):[] for x in [.25,.5,.75]}
for n in range(201):
    t=220+145*n/200
    p=prop('P','T',t,'Q',0)
    sat.append({'T':t,'p':p,'liquidH':prop('Hmass','T',t,'Q',0),'vaporH':prop('Hmass','T',t,'Q',1),'liquidRho':prop('Dmass','T',t,'Q',0),'vaporRho':prop('Dmass','T',t,'Q',1)})
    for q,values in qlines.items():values.append({'p':p,'h':prop('Hmass','T',t,'Q',float(q))})

isotherms=[]
for t in [250,273.15,293.15,313.15,333.15]:
    ps=prop('P','T',t,'Q',0)
    liquid=[]; gas=[]
    for n in range(81):
        p=ps*(1+1e-5)*(3500000/(ps*(1+1e-5)))**(n/80)
        liquid.append({'p':p,'h':prop('Hmass','P',p,'T',t)})
        p=60000*((ps*(1-1e-5))/60000)**(n/80)
        gas.append({'p':p,'h':prop('Hmass','P',p,'T',t)})
    transition=[{'p':ps,'h':prop('Hmass','T',t,'Q',q)} for q in [0,1]]
    isotherms.append({'T':t,'segments':[liquid,transition,gas]})

max_h=0;max_logp=0
for a,b in zip(sat,sat[1:]):
    t=(a['T']+b['T'])/2
    for q,key in [(0,'liquidH'),(1,'vaporH')]:max_h=max(max_h,abs(prop('Hmass','T',t,'Q',q)-(a[key]+b[key])/2))
    max_logp=max(max_logp,abs(math.log10(prop('P','T',t,'Q',0))-(math.log10(a['p'])+math.log10(b['p']))/2))
fluid=json.loads(CP.get_fluid_param_string('R134a','JSON'))[0]
payload={'metadata':{'id':'r134a-heos-iir-v1','fluid':'R134a','backend':'HEOS','library':'CoolProp','version':VERSION,'gitRevision':REVISION,'license':'MIT','eos':'Tillner-Roth & Baehr (1994), DOI 10.1063/1.555958','reference':'IIR: saturated liquid at 273.15 K has h=200000 J/kg, s=1000 J/(kg·K)','generatedOn':'2026-10-28','units':{'p':'Pa absolute','h':'J/kg','T':'K','s':'J/(kg·K)','rho':'kg/m³','quality':'kg vapor/kg total'},'criticalT':CP.PropsSI('Tcrit',F),'criticalP':CP.PropsSI('pcrit',F),'eosTmax':455,'eosPmax':70000000,'saturationTmin':220,'saturationTmax':365,'operatingMode':'closed-catalogue-no-interpolation-no-extrapolation','drawingMidpointError':{'maxH_Jkg':max_h,'maxLog10P':max_logp},'verificationScope':'Library provenance, reference anchor, flash consistency, balances and sampled drawing errors; no independent experimental validation or human approval.'},'cases':cases,'saturation':sat,'qualityLines':qlines,'isotherms':isotherms,'ancillaryPressure':fluid['ANCILLARIES']['pS']}
root=Path(__file__).resolve().parents[1]
out=root/'src/refrigeration/data/r134a-v1.json'
b=(json.dumps(payload,ensure_ascii=False,separators=(',',':'),allow_nan=False)+'\n').encode()
out.write_bytes(b);(out.with_suffix('.sha256')).write_text(hashlib.sha256(b).hexdigest()+'\n')
print('Generated',len(cases),'cases,',len(sat),'saturation nodes,',len(b),'bytes; midpoint drawing deviation',max_h,'J/kg;',max_logp,'log10(P).')
for c in cases:
    h=[v['h'] for v in c['points']];print(c['id'],*[round(x,8) for x in [h[0]-h[3],h[1]-h[0],h[1]-h[2],(h[0]-h[3])/(h[1]-h[0])]])
