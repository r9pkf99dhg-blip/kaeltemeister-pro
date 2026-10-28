import {
  calculateTechnical,
  toSI,
  fromSI,
  units,
} from "../technical/calculations";
import { parseArithmetic } from "../technical/expression";
import type { CalculatorDefinition } from "./model";
import type { ItemAnswer } from "../academy/exercises/model";
export function initialLabValues(
  tool: CalculatorDefinition,
): Record<string, ItemAnswer> {
  return Object.fromEntries(
    tool.inputs.map((f) => [
      f.id,
      { value: String(f.value).replace(".", ","), unit: f.unit },
    ]),
  );
}
export function runCalculator(
  tool: CalculatorDefinition,
  input: Record<string, ItemAnswer>,
  outputUnit = tool.answerUnit,
) {
  const values = Object.fromEntries(
    tool.inputs.map((f) => {
      const a = input[f.id];
      if (!a) throw new Error(`Bitte ${f.label} angeben.`);
      return [f.id, toSI(parseArithmetic(a.value), a.unit, f.quantity)];
    }),
  );
  const resultSI = calculateTechnical(tool.kind, values);
  if (
    resultSI === 0 &&
    tool.inputs.every((f) => values[f.id] !== 0) &&
    !(
      ["ac-reactive", "ac-reactive-capacitive"].includes(tool.kind) &&
      values.factor === 1
    )
  )
    throw new Error(
      "Numerischer Unterlauf: Wertebereich verkleinern; kein verlässliches Nullergebnis.",
    );
  if (!units[tool.quantity].includes(outputUnit))
    throw new Error("Unpassende Ergebniseinheit.");
  const result = fromSI(resultSI, outputUnit, tool.quantity);
  if ((result === 0 && resultSI !== 0) || !Number.isFinite(result))
    throw new Error("Nicht endliches Ergebnis.");
  return {
    resultSI,
    result,
    values,
    checks: [
      "Alle erforderlichen Werte und Einheiten sind gültig.",
      "Das Ergebnis liegt im definierten mathematischen Modellbereich.",
      "Eine plausible Größenordnung muss zusätzlich mit realen Randbedingungen geprüft werden.",
    ],
  };
}
