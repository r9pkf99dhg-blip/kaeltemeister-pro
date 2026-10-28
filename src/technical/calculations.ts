import {calculateRefrigeration,refrigerationKinds,type RefrigerationKind} from "./refrigeration";
import { calculateDeep, deepKinds, type DeepKind } from "./deep";
import { calculateSchool, schoolKinds, type SchoolKind } from "./foundations";
/** Gemeinsame SI-Rechenfunktionen für Aufgaben und technische Rechner. */
export type CalculationKind =
  | RefrigerationKind
  | DeepKind
  | SchoolKind
  | "heat"
  | "mass-flow"
  | "temperature-difference"
  | "superheat"
  | "subcooling"
  | "dc-power"
  | "cooling-cop"
  | "heating-cop"
  | "charge-current"
  | "ohm-current"
  | "ohm-voltage"
  | "ohm-resistance"
  | "electric-energy"
  | "series-resistance"
  | "parallel-resistance"
  | "speed"
  | "force"
  | "mechanical-work"
  | "power-from-energy"
  | "pressure"
  | "density"
  | "sensible-energy"
  | "amount";
export type Quantity =
  | "power"
  | "mass-flow"
  | "specific-heat"
  | "temperature-difference"
  | "temperature"
  | "voltage"
  | "current"
  | "ratio"
  | "resistance"
  | "energy"
  | "time"
  | "charge"
  | "number"
  | "percent"
  | "mass"
  | "length"
  | "area"
  | "volume"
  | "pressure"
  | "density"
  | "force"
  | "acceleration"
  | "speed"
  | "amount"
  | "molar-mass"
  | "angle"
  | "frequency"
  | "inductance"
  | "capacitance"
  | "apparent-power"
  | "reactive-power"
  | "volume-flow"
  | "specific-volume"
  | "specific-energy"
  | "conductivity"
  | "thermal-resistance"
  | "transmittance";
export const units: Record<Quantity, string[]> = {
  power: ["W", "kW"],
  "mass-flow": ["kg/s", "kg/h"],
  "specific-heat": ["J/(kg·K)", "kJ/(kg·K)"],
  "temperature-difference": ["K", "°C"],
  temperature: ["°C", "K"],
  voltage: ["V", "mV"],
  current: ["A", "mA"],
  resistance: ["Ω", "kΩ"],
  energy: ["J", "Wh", "kWh"],
  time: ["s", "min", "h"],
  charge: ["C"],
  ratio: ["1"],
  number: ["1"],
  percent: ["%"],
  amount: ["mol", "mmol"],
  "molar-mass": ["kg/mol", "g/mol"],
  mass: ["kg", "g"],
  length: ["m", "cm", "mm", "km"],
  area: ["m²", "cm²", "mm²"],
  angle: ["rad", "°"],
  frequency: ["Hz", "kHz"],
  inductance: ["H", "mH"],
  capacitance: ["F", "µF"],
  "apparent-power": ["VA", "kVA"],
  "reactive-power": ["var", "kvar"],
  "volume-flow": ["m³/s", "m³/h", "L/min"],
  "specific-volume": ["m³/kg"],
  "specific-energy": ["J/kg", "kJ/kg"],
  conductivity: ["W/(m·K)"],
  "thermal-resistance": ["K/W"],
  transmittance: ["W/(m²·K)"],
  volume: ["m³", "L", "cm³"],
  pressure: ["Pa", "kPa", "bar"],
  density: ["kg/m³"],
  force: ["N", "kN"],
  acceleration: ["m/s²"],
  speed: ["m/s", "km/h"],
};
export const allowsSignedSI = (q: Quantity) =>
  ["number", "reactive-power", "temperature-difference", "angle"].includes(q);
export function toSI(value: number, unit: string, quantity: Quantity): number {
  if (!Number.isFinite(value) || !units[quantity].includes(unit))
    throw new Error("Ungültiger Zahlenwert oder unpassende Einheit.");
  let result = value;
  if (unit === "m³/h") result /= 3600;
  if (unit === "L/min") result /= 60000;
  if (unit === "kJ/kg") result *= 1000;
  if (["kHz", "kVA", "kvar"].includes(unit)) result *= 1000;
  if (unit === "mH") result /= 1000;
  if (unit === "µF") result /= 1000000;
  if (unit === "°") result *= Math.PI / 180;
  if (unit === "mm²" || unit === "cm³") result /= 1000000;
  if (unit === "%") result /= 100;
  if (["g", "mm", "L", "mmol", "g/mol"].includes(unit)) result /= 1000;
  if (unit === "cm") result /= 100;
  if (unit === "cm²") result /= 10000;
  if (["km", "kPa", "kN"].includes(unit)) result *= 1000;
  if (unit === "bar") result *= 100000;
  if (unit === "km/h") result /= 3.6;
  if (unit === "kW" || unit === "kJ/(kg·K)") result *= 1000;
  if (unit === "kg/h") result /= 3600;
  if (unit === "mA" || unit === "mV") result /= 1000;
  if (unit === "kΩ") result *= 1000;
  if (unit === "Wh" || unit === "h") result *= 3600;
  if (unit === "kWh") result *= 3600000;
  if (unit === "min") result *= 60;
  if (quantity === "temperature" && unit === "°C") result += 273.15;
  if (!Number.isFinite(result) || (result < 0 && !allowsSignedSI(quantity)))
    throw new Error(
      "Die Größe liegt außerhalb des zulässigen physikalischen Bereichs.",
    );
  if (result === 0 && value !== 0 && quantity !== "temperature")
    throw new Error("Numerischer Unterlauf bei der SI-Umrechnung.");
  return result;
}
export function fromSI(
  value: number,
  unit: string,
  quantity: Quantity,
): number {
  if (!units[quantity].includes(unit) || !Number.isFinite(value))
    throw new Error("Unpassende Einheit.");
  if (unit === "m³/h") return value * 3600;
  if (unit === "L/min") return value * 60000;
  if (unit === "kJ/kg") return value / 1000;
  if (["kHz", "kVA", "kvar"].includes(unit)) return value / 1000;
  if (unit === "mH") return value * 1000;
  if (unit === "µF") return value * 1000000;
  if (unit === "°") return (value * 180) / Math.PI;
  if (unit === "mm²" || unit === "cm³") return value * 1000000;
  if (unit === "%") return value * 100;
  if (["g", "mm", "L", "mmol", "g/mol"].includes(unit)) return value * 1000;
  if (unit === "cm") return value * 100;
  if (unit === "cm²") return value * 10000;
  if (["km", "kPa", "kN"].includes(unit)) return value / 1000;
  if (unit === "bar") return value / 100000;
  if (unit === "km/h") return value * 3.6;
  if (unit === "kW" || unit === "kJ/(kg·K)") return value / 1000;
  if (unit === "kg/h") return value * 3600;
  if (unit === "mA" || unit === "mV") return value * 1000;
  if (unit === "kΩ") return value / 1000;
  if (unit === "Wh" || unit === "h") return value / 3600;
  if (unit === "kWh") return value / 3600000;
  if (unit === "min") return value / 60;
  if (quantity === "temperature" && unit === "°C") return value - 273.15;
  return value;
}
export function calculateTechnical(
  kind: CalculationKind,
  values: Record<string, number>,
): number {
  if(refrigerationKinds.includes(kind as RefrigerationKind)) return calculateRefrigeration(kind as RefrigerationKind,values);
  if (deepKinds.includes(kind as DeepKind))
    return calculateDeep(kind as DeepKind, values);
  if (schoolKinds.includes(kind as SchoolKind))
    return calculateSchool(kind as SchoolKind, values);
  const get = (id: string, strictlyPositive = false) => {
    const value = values[id];
    if (
      !Number.isFinite(value) ||
      value < 0 ||
      (strictlyPositive && value === 0)
    )
      throw new Error(
        "Bitte prüfe Wertebereiche und Nenner: benötigte Größen dürfen nicht fehlen oder negativ sein, Nenner müssen größer als 0 sein.",
      );
    return value;
  };
  let result: number;
  switch (kind) {
    case "amount":
      result = get("mass") / get("molarMass", true);
      break;
    case "speed":
      result = get("distance") / get("time", true);
      break;
    case "force":
      result = get("mass", true) * get("acceleration");
      break;
    case "mechanical-work":
      result = get("force") * get("distance");
      break;
    case "power-from-energy":
      result = get("energy") / get("time", true);
      break;
    case "pressure":
      result = get("force") / get("area", true);
      break;
    case "density":
      result = get("mass") / get("volume", true);
      break;
    case "sensible-energy":
      result = get("mass") * get("cp", true) * get("deltaT");
      break;
    case "heat":
      result = get("massFlow") * get("cp", true) * get("deltaT");
      break;
    case "mass-flow":
      result = get("heat") / (get("cp", true) * get("deltaT", true));
      break;
    case "temperature-difference":
      result = get("heat") / (get("massFlow", true) * get("cp", true));
      break;
    case "superheat":
      result = get("vaporTemperature") - get("saturationTemperature");
      break;
    case "subcooling":
      result = get("saturationTemperature") - get("liquidTemperature");
      break;
    case "dc-power":
      result = get("voltage") * get("current");
      break;
    case "charge-current":
      result = get("charge") / get("time", true);
      break;
    case "ohm-current":
      result = get("voltage") / get("resistance", true);
      break;
    case "ohm-voltage":
      result = get("current") * get("resistance", true);
      break;
    case "ohm-resistance":
      result = get("voltage") / get("current", true);
      break;
    case "electric-energy":
      result = get("power") * get("time");
      break;
    case "series-resistance":
      result = get("r1", true) + get("r2", true);
      break;
    case "parallel-resistance": {
      const a = get("r1", true),
        b = get("r2", true);
      result = Math.min(a, b) / (1 + Math.min(a, b) / Math.max(a, b));
      break;
    }
    case "cooling-cop":
      result = get("coolingPower") / get("electricPower", true);
      break;
    case "heating-cop":
      result = get("heatingPower") / get("electricPower", true);
      break;
    default:
      throw new Error("Unbekannte Berechnung.");
  }
  if (!Number.isFinite(result) || result < 0)
    throw new Error(
      "Das Ergebnis ist nicht endlich oder passt nicht zum angenommenen Zustand.",
    );
  return result;
}
