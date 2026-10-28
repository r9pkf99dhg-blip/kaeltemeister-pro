import { expect, it } from "vitest";
import { numericTasks } from "../exercises/data";
import { errorPatterns } from "./error-patterns";
const task = (id: string) => numericTasks.find((t) => t.id === id)!;
it.each([
  ["workshop-conversion-difference", "278.15", "K", "temperature-difference-offset"],
  ["workshop-conversion-area", "0.314", "m²", "area-prefix"],
  ["calc-heat-water", "10,45", "W", "unit-selection"],
  ["geo-area-a", "1256.637", "mm²", "radius-diameter"],
  ["ac-rms-a", "100", "V", "peak-rms"],
  ["ac-p-a", "200", "W", "apparent-real"],
  ["ac-three-a", "3200", "W", "line-phase"],
  ["th-mass-flow-a", "0.0005", "kg/s", "mass-volume"],
  ["math-fraction-add-a", "0.333333", "1", "fraction-add"],
  ["math-fraction-sub-a", "0.5", "1", "sign"],
  ["ac-factor-a", "1.2", "1", "implausible-factor"],
])(
  "erkennt das Zahlenmuster %s, ohne den Denkweg zu behaupten",
  (id, value, unit, pattern) => {
    expect(errorPatterns(task(id), { value, unit }).map((p) => p.id)).toContain(
      pattern,
    );
  },
);
it("erfindet bei unbekannter, ungültiger oder richtiger Antwort keine Fehlerursache", () => {
  expect(
    errorPatterns(task("calc-heat-water"), { value: "1", unit: "kW" }),
  ).toEqual([]);
  expect(
    errorPatterns(task("calc-heat-water"), { value: "abc", unit: "kW" }),
  ).toEqual([]);
  expect(
    errorPatterns(task("calc-heat-water"), { value: "10.45", unit: "kW" }),
  ).toEqual([]);
});

it('erkennt den fehlenden absoluten Temperatur-Offset bei einem gültigen Kelvinwert',()=>{
 const example={...task('workshop-conversion-temperature'),givens:[{...task('workshop-conversion-temperature').givens[0],value:20}]};
 expect(errorPatterns(example,{value:'20',unit:'K'}).map(p=>p.id)).toContain('celsius-kelvin');
});
