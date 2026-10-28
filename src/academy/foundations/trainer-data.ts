import { advancedCases } from "../deep/trainer";
import type { ChoiceTask } from "../exercises/model";
import type { Level } from "../model";
export interface RearrangementStep {
  before: string;
  operation: string;
  after: string;
  reason: string;
  wrong: [string, string];
  wrongFeedback?: [string,string];
}
export interface RearrangementCase {
  id: string;
  title: string;
  target: string;
  level: Level;
  formulaId: string;
  steps: RearrangementStep[];
  result: string;
  probe: string;
  assumption: string;
}
const divide = (
  before: string,
  divisor: string,
  after: string,
): RearrangementStep => ({
  before,
  operation: `Beide Seiten durch ${divisor} teilen`,
  after,
  reason: `Eine Gleichheit bleibt erhalten, wenn beide Seiten durch dieselbe von null verschiedene Größe ${divisor} geteilt werden. Anschließend werden gemeinsame Faktoren gekürzt.`,
  wrong: [
    `Nur die rechte Seite durch ${divisor} teilen`,
    `Auf beiden Seiten ${divisor} addieren`,
  ],
});
const multiply = (
  before: string,
  factor: string,
  after: string,
): RearrangementStep => ({
  before,
  operation: `Beide Seiten mit ${factor} multiplizieren`,
  after,
  reason: `Die Multiplikation mit ${factor} auf beiden Seiten beseitigt den zugehörigen Nenner. Für die Äquivalenz wird ${factor} ungleich null vorausgesetzt; andere Nennerbedingungen bleiben bestehen.`,
  wrong: [
    `Nur links mit ${factor} multiplizieren`,
    `Auf beiden Seiten ${factor} subtrahieren`,
  ],
});
export const rearrangementCases: RearrangementCase[] = [
  {
    id: "ohm-r",
    title: "U = R × I → R",
    target: "R",
    level: "grundlagen",
    formulaId: "ohm-resistance",
    steps: [divide("U=RI", "I", String.raw`\frac U I=\frac{RI}{I}`)],
    result: String.raw`R=\frac U I`,
    probe: String.raw`U=24\,\mathrm V,\ I=0{,}2\,\mathrm A:\ R=120\,\Omega;\quad120\cdot0{,}2=24`,
    assumption: "I ≠ 0; ohmsches Gleichstrommodell.",
  },
  {
    id: "ohm-i",
    title: "U = R × I → I",
    target: "I",
    level: "grundlagen",
    formulaId: "ohm-current",
    steps: [divide("U=RI", "R", String.raw`\frac U R=\frac{RI}{R}`)],
    result: String.raw`I=\frac U R`,
    probe: String.raw`U=24\,\mathrm V,\ R=120\,\Omega:\ I=0{,}2\,\mathrm A;\quad120\cdot0{,}2=24`,
    assumption: "R ≠ 0; ohmsches Gleichstrommodell.",
  },
  {
    id: "power-u",
    title: "P = U × I → U",
    target: "U",
    level: "grundlagen",
    formulaId: "dc-electric-power",
    steps: [divide("P=UI", "I", String.raw`\frac P I=\frac{UI}{I}`)],
    result: String.raw`U=\frac P I`,
    probe: String.raw`P=48\,\mathrm W,\ I=2\,\mathrm A:\ U=24\,\mathrm V;\quad24\cdot2=48`,
    assumption: "I ≠ 0; konstante Gleichstromleistung.",
  },
  {
    id: "power-i",
    title: "P = U × I → I",
    target: "I",
    level: "grundlagen",
    formulaId: "dc-electric-power",
    steps: [divide("P=UI", "U", String.raw`\frac P U=\frac{UI}{U}`)],
    result: String.raw`I=\frac P U`,
    probe: String.raw`P=48\,\mathrm W,\ U=24\,\mathrm V:\ I=2\,\mathrm A;\quad24\cdot2=48`,
    assumption: "U ≠ 0; konstante Gleichstromleistung.",
  },
  {
    id: "heat-m",
    title: "Q = m × c × ΔT → m",
    target: "m",
    level: "fachkraft",
    formulaId: "math-heat-energy",
    steps: [
      divide(
        String.raw`Q=mc\Delta T`,
        "c × ΔT",
        String.raw`\frac Q{c\Delta T}=\frac{mc\Delta T}{c\Delta T}`,
      ),
    ],
    result: String.raw`m=\frac Q{c\Delta T}`,
    probe: String.raw`Q=41800\,\mathrm J,\ c=4180\,\mathrm{J/(kg\,K)},\ \Delta T=10\,\mathrm K:\ m=1\,\mathrm{kg};\quad1\cdot4180\cdot10=41800`,
    assumption:
      "c ΔT ≠ 0, konstante Wärmekapazität, kein Phasenwechsel; fiktiver Lernfall.",
  },
  {
    id: "heat-c",
    title: "Q = m × c × ΔT → c",
    target: "c",
    level: "fachkraft",
    formulaId: "math-heat-energy",
    steps: [
      divide(
        String.raw`Q=mc\Delta T`,
        "m × ΔT",
        String.raw`\frac Q{m\Delta T}=\frac{mc\Delta T}{m\Delta T}`,
      ),
    ],
    result: String.raw`c=\frac Q{m\Delta T}`,
    probe: String.raw`Q=41800\,\mathrm J,\ m=1\,\mathrm{kg},\ \Delta T=10\,\mathrm K:\ c=4180\,\mathrm{J/(kg\,K)};\quad1\cdot4180\cdot10=41800`,
    assumption:
      "m ΔT ≠ 0; vorgegebener konstanter Modellwert, keine Stoffwertdatenbank.",
  },
  {
    id: "heat-dt",
    title: "Q = m × c × ΔT → ΔT",
    target: "ΔT",
    level: "fachkraft",
    formulaId: "math-heat-energy",
    steps: [
      divide(
        String.raw`Q=mc\Delta T`,
        "m × c",
        String.raw`\frac Q{mc}=\frac{mc\Delta T}{mc}`,
      ),
    ],
    result: String.raw`\Delta T=\frac Q{mc}`,
    probe: String.raw`Q=41800\,\mathrm J,\ m=1\,\mathrm{kg},\ c=4180\,\mathrm{J/(kg\,K)}:\ \Delta T=10\,\mathrm K;\quad1\cdot4180\cdot10=41800`,
    assumption: "m c ≠ 0; positive Beträge im Wärme-Lernfall.",
  },
  {
    id: "pressure-f",
    title: "p = F / A → F",
    target: "F",
    level: "fachkraft",
    formulaId: "physics-pressure",
    steps: [multiply(String.raw`p=\frac F A`, "A", String.raw`pA=\frac F A A`)],
    result: String.raw`F=pA`,
    probe: String.raw`p=200000\,\mathrm{Pa},\ A=0{,}003\,\mathrm{m^2}:\ F=600\,\mathrm N;\quad\frac{600}{0{,}003}=200000`,
    assumption:
      "A > 0; gleichmäßig verteilte senkrechte Kraft, keine Druckbehälterauslegung.",
  },
  {
    id: "pressure-a",
    title: "p = F / A → A",
    target: "A",
    level: "meister",
    formulaId: "physics-pressure",
    steps: [
      multiply(String.raw`p=\frac F A`, "A", String.raw`pA=F`),
      divide("pA=F", "p", String.raw`\frac{pA}{p}=\frac F p`),
    ],
    result: String.raw`A=\frac F p`,
    probe: String.raw`F=600\,\mathrm N,\ p=200000\,\mathrm{Pa}:\ A=0{,}003\,\mathrm{m^2};\quad\frac{600}{0{,}003}=200000`,
    assumption: "A > 0 und p ≠ 0; vereinfachtes Druckmodell.",
  },
  {
    id: "density-m",
    title: "ρ = m / V → m",
    target: "m",
    level: "fachkraft",
    formulaId: "physics-density",
    steps: [multiply(String.raw`\rho=\frac m V`, "V", String.raw`\rho V=m`)],
    result: String.raw`m=\rho V`,
    probe: String.raw`\rho=800\,\mathrm{kg/m^3},\ V=0{,}01\,\mathrm{m^3}:\ m=8\,\mathrm{kg};\quad\frac8{0{,}01}=800`,
    assumption:
      "V > 0; Dichte ausdrücklich vorgegeben, keine reale Kältemittel-Tabelle.",
  },
  {
    id: "density-v",
    title: "ρ = m / V → V",
    target: "V",
    level: "meister",
    formulaId: "physics-density",
    steps: [
      multiply(String.raw`\rho=\frac m V`, "V", String.raw`\rho V=m`),
      divide(
        String.raw`\rho V=m`,
        "ρ",
        String.raw`\frac{\rho V}{\rho}=\frac m\rho`,
      ),
    ],
    result: String.raw`V=\frac m\rho`,
    probe: String.raw`m=8\,\mathrm{kg},\ \rho=800\,\mathrm{kg/m^3}:\ V=0{,}01\,\mathrm{m^3};\quad\frac8{0{,}01}=800`,
    assumption: "V > 0 und ρ ≠ 0; konstanter vorgegebener Dichtewert.",
  },
];
rearrangementCases.push(...advancedCases);
export const trainerQuestions: ChoiceTask[] = rearrangementCases.flatMap((c) =>
  c.steps.map((step, i) => ({
    id: `trainer-${c.id}-step${i + 1}`,
    revision: 1,
    kind: "choice",
    topicId: "math-rearrange",
    domainId: "mathematik",
    level: c.level,
    title: `${c.title}: Schritt ${i + 1}`,
    prompt: `Gesucht ${c.target}. Welche Umformung ist zulässig und führt zum Ziel?`,
    article: { kind: "module", id: "math-rearrange" },
    formulaId: c.formulaId,
    options: [
      { id: "both", text: step.operation },
      { id: "wrong-side", text: step.wrong[0] },
      { id: "wrong-operation", text: step.wrong[1] },
    ],
    correctOptionId: "both",
    explanation: step.reason,
  })),
);
