import type { CalculatorDefinition, LabField } from "./model";
const inputSymbols: Record<string, string> = {
  massFlow: String.raw`\dot m`,
  cp: "c_p",
  deltaT: String.raw`\Delta T`,
  heat: String.raw`\dot Q`,
  voltage: "U",
  current: "I",
  resistance: "R",
  factor: String.raw`\cos\varphi`,
  phaseVoltage: String.raw`U_\mathrm{Str}`,
  phaseCurrent: String.raw`I_\mathrm{Str}`,
  diameter: "d",
  length: "L",
  outer: "d_a",
  inner: "d_i",
  conductivity: String.raw`\lambda`,
  area: "A",
  thickness: "d",
  d1: "d_1",
  d2: "d_2",
  lambda1: String.raw`\lambda_1`,
  lambda2: String.raw`\lambda_2`,
  inside: String.raw`\alpha_i`,
  outside: String.raw`\alpha_a`,
};
export function fieldSymbol(tool: CalculatorDefinition, f: LabField) {
  if (tool.kind === "ac-three-power" && f.id === "voltage") return "U_L";
  if (tool.kind === "ac-three-power" && f.id === "current") return "I_L";
  return inputSymbols[f.id];
}
export function fallbackVariables(tool: CalculatorDefinition) {
  return tool.inputs.map((f) => ({
    symbol: fieldSymbol(tool, f),
    meaning: f.label,
    unit: f.unit,
  }));
}
