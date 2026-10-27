/** Gemeinsame SI-Rechenfunktionen für Aufgaben und technische Rechner. */
export type CalculationKind =
  | "heat"
  | "mass-flow"
  | "temperature-difference"
  | "superheat"
  | "subcooling"
  | "dc-power"
  | "cooling-cop"
  | "heating-cop";
export type Quantity =
  | "power"
  | "mass-flow"
  | "specific-heat"
  | "temperature-difference"
  | "temperature"
  | "voltage"
  | "current"
  | "ratio";
export const units: Record<Quantity, string[]> = {
  power: ["W", "kW"],
  "mass-flow": ["kg/s", "kg/h"],
  "specific-heat": ["J/(kg·K)", "kJ/(kg·K)"],
  "temperature-difference": ["K"],
  temperature: ["°C", "K"],
  voltage: ["V"],
  current: ["A"],
  ratio: ["1"],
};
export function toSI(value: number, unit: string, quantity: Quantity): number {
  if (!Number.isFinite(value) || !units[quantity].includes(unit))
    throw new Error("Ungültiger Zahlenwert oder unpassende Einheit.");
  let result = value;
  if (unit === "kW" || unit === "kJ/(kg·K)") result *= 1000;
  if (unit === "kg/h") result /= 3600;
  if (quantity === "temperature" && unit === "°C") result += 273.15;
  if (!Number.isFinite(result) || result < 0)
    throw new Error(
      "Die Größe liegt außerhalb des zulässigen physikalischen Bereichs.",
    );
  return result;
}
export function fromSI(
  value: number,
  unit: string,
  quantity: Quantity,
): number {
  if (!units[quantity].includes(unit) || !Number.isFinite(value))
    throw new Error("Unpassende Einheit.");
  if (unit === "kW" || unit === "kJ/(kg·K)") return value / 1000;
  if (unit === "kg/h") return value * 3600;
  if (quantity === "temperature" && unit === "°C") return value - 273.15;
  return value;
}
export function calculateTechnical(
  kind: CalculationKind,
  values: Record<string, number>,
): number {
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
