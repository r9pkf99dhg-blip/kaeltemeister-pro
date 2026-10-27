/** Von Hand ausgezeichnete Musterrechnungen. Freitext und historische Snapshots bleiben zulässig. */
export const solutionNotation: Record<string, string[]> = {
  "calc-heat-water": [
    String.raw`\(c_p=4{,}18\cdot1000=4180\,\mathrm{J/(kg\,K)}\)`,
    String.raw`\(\dot Q=0{,}5\cdot4180\cdot5=10450\,\mathrm W\)`,
  ],
  "calc-mass-flow": [
    String.raw`\(\dot Q=8360\,\mathrm W\)`,
    String.raw`\(\dot m=\frac{8360}{4180\cdot4}=0{,}5\,\mathrm{kg/s}=1800\,\mathrm{kg/h}\)`,
  ],
  "calc-temperature-difference": [
    String.raw`\(\dot Q=12540\,\mathrm W\)`,
    String.raw`\(\Delta T=\frac{12540}{0{,}5\cdot4180}=6\,\mathrm K\)`,
  ],
  "calc-superheat": [
    String.raw`\(\Delta T_{\mathrm{\ddot U}}=T_{\mathrm{Dampf}}-T_{\mathrm{sat}}\)`,
    String.raw`\(\Delta T_{\mathrm{\ddot U}}=-4-(-10)=6\,\mathrm K\)`,
  ],
  "calc-subcooling": [
    String.raw`\(\Delta T_{\mathrm U}=T_{\mathrm{sat}}-T_{\mathrm{Fl}}\)`,
    String.raw`\(\Delta T_{\mathrm U}=40-35=5\,\mathrm K\)`,
  ],
  "calc-electric-dc": [
    String.raw`\(P=UI\)`,
    String.raw`\(P=24\cdot2=48\,\mathrm W\)`,
  ],
  "calc-cooling-cop": [
    String.raw`\(\varepsilon=\frac{\dot Q_0}{P_{\mathrm{el}}}\)`,
    String.raw`\(\varepsilon=\frac{7500}{2500}=3\)`,
  ],
  "calc-heating-cop": [
    String.raw`\(\mathrm{COP}_{\mathrm{Heiz}}=\frac{\dot Q_{\mathrm{Heiz}}}{P_{\mathrm{el}}}\)`,
    String.raw`\(\mathrm{COP}_{\mathrm{Heiz}}=\frac{10000}{2500}=4\)`,
  ],
  "el-current-charge-a": [
    String.raw`\(I=\frac{\Delta Q}{\Delta t}\)`,
    String.raw`\(I=\frac2{10}=0{,}2\,\mathrm A=200\,\mathrm{mA}\)`,
  ],
  "el-current-charge-b": [
    String.raw`\(1\,\mathrm{min}=60\,\mathrm s\)`,
    String.raw`\(I=\frac{18}{60}=0{,}3\,\mathrm A=300\,\mathrm{mA}\)`,
  ],
  "el-ohm-current-a": [
    String.raw`\(I=\frac U R\)`,
    String.raw`\(I=\frac{24}{120}=0{,}2\,\mathrm A\)`,
  ],
  "el-ohm-current-b": [
    String.raw`\(1{,}2\,\mathrm{k\Omega}=1200\,\Omega\)`,
    String.raw`\(I=\frac{12}{1200}=0{,}01\,\mathrm A=10\,\mathrm{mA}\)`,
  ],
  "el-ohm-voltage-a": [
    String.raw`\(100\,\mathrm{mA}=0{,}1\,\mathrm A\)`,
    String.raw`\(U=240\cdot0{,}1=24\,\mathrm V\)`,
  ],
  "el-ohm-voltage-b": [
    String.raw`\(2{,}2\,\mathrm{k\Omega}=2200\,\Omega,\quad5\,\mathrm{mA}=0{,}005\,\mathrm A\)`,
    String.raw`\(U=2200\cdot0{,}005=11\,\mathrm V\)`,
  ],
  "el-ohm-resistance-a": [
    String.raw`\(R=\frac U I\)`,
    String.raw`\(R=\frac{24}{0{,}2}=120\,\Omega\)`,
  ],
  "el-ohm-resistance-b": [
    String.raw`\(10\,\mathrm{mA}=0{,}01\,\mathrm A\)`,
    String.raw`\(R=\frac{12}{0{,}01}=1200\,\Omega=1{,}2\,\mathrm{k\Omega}\)`,
  ],
  "el-power-a": [
    String.raw`\(P=UI\)`,
    String.raw`\(P=24\cdot0{,}5=12\,\mathrm W\)`,
  ],
  "el-power-b": [
    String.raw`\(50\,\mathrm{mA}=0{,}05\,\mathrm A\)`,
    String.raw`\(P=12\cdot0{,}05=0{,}6\,\mathrm W\)`,
  ],
  "el-energy-a": [
    String.raw`\(2\,\mathrm h=7200\,\mathrm s\)`,
    String.raw`\(E=12\cdot7200=86400\,\mathrm J=24\,\mathrm{Wh}\)`,
  ],
  "el-energy-b": [
    String.raw`\(30\,\mathrm{min}=1800\,\mathrm s\)`,
    String.raw`\(E=150\cdot1800=270000\,\mathrm J=0{,}075\,\mathrm{kWh}\)`,
  ],
  "el-series-a": [
    String.raw`\(R_{\mathrm{ges}}=R_1+R_2\)`,
    String.raw`\(R_{\mathrm{ges}}=120+240=360\,\Omega\)`,
  ],
  "el-series-b": [
    String.raw`\(R_1=1000\,\Omega,\quad R_2=2200\,\Omega\)`,
    String.raw`\(R_{\mathrm{ges}}=3200\,\Omega=3{,}2\,\mathrm{k\Omega}\)`,
  ],
  "el-parallel-a": [
    String.raw`\(\frac1{R_{\mathrm{ges}}}=\frac1{120}+\frac1{240}=\frac3{240}\)`,
    String.raw`\(R_{\mathrm{ges}}=80\,\Omega\)`,
  ],
  "el-parallel-b": [
    String.raw`\(\frac1{R_{\mathrm{ges}}}=\frac1{100}+\frac1{100}\)`,
    String.raw`\(R_{\mathrm{ges}}=50\,\Omega\)`,
  ],
  // Einheitenumrechnungen sind bei komplexen Rechnungen eigene aufklappbare Schritte.
};
solutionNotation["calc-heat-water"].push(
  String.raw`\(10450\,\mathrm W=10{,}45\,\mathrm{kW}\).`,
);
solutionNotation["calc-mass-flow"].push(
  String.raw`\(0{,}5\,\mathrm{kg/s}\cdot3600=1800\,\mathrm{kg/h}\).`,
);
solutionNotation["el-energy-a"].push(
  String.raw`\(86400\,\mathrm J=24\,\mathrm{Wh}=0{,}024\,\mathrm{kWh}\).`,
);
solutionNotation["el-energy-b"].push(
  String.raw`\(270000\,\mathrm J=75\,\mathrm{Wh}=0{,}075\,\mathrm{kWh}\).`,
);
