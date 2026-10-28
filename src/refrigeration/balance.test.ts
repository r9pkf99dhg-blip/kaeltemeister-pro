import { it, expect } from "vitest";
import {
  cycleBalance,
  calculateRefrigeration,
} from "../technical/refrigeration";
import { refrigerationCases } from "./data";
import { caseBalance } from "./balance";
const simple = { h1: 400000, h2: 450000, h3: 250000, h4: 250000 };
it("prüft unabhängigen einfachen SI-Fall und Referenzverschiebung", () => {
  expect(cycleBalance(simple)).toMatchObject({
    q0: 150000,
    w: 50000,
    qk: 200000,
    cop: 3,
    residual: 0,
  });
  expect(
    calculateRefrigeration("refrigeration-q0-power", {
      ...simple,
      massFlow: 0.05,
    }),
  ).toBe(7500);
  const shifted = Object.fromEntries(
    Object.entries(simple).map(([k, v]) => [k, v - 900000]),
  );
  expect(cycleBalance(shifted)).toEqual(cycleBalance(simple));
});
it.each([
  {},
  { ...simple, h4: 240000 },
  { ...simple, h2: 400000 },
  { ...simple, h1: 200000 },
  { ...simple, h1: NaN },
  { ...simple, h2: Infinity },
])("weist widersprüchliche Bilanzdaten zurück", (v) =>
  expect(() => cycleBalance(v)).toThrow(),
);
it("prüft Massenstromgrenzen, echte Nullleistung und Überlauf", () => {
  expect(
    calculateRefrigeration("refrigeration-q0-power", {
      ...simple,
      massFlow: 0,
    }),
  ).toBe(0);
  expect(() =>
    calculateRefrigeration("refrigeration-q0-power", {
      ...simple,
      massFlow: -0.1,
    }),
  ).toThrow();
  expect(() =>
    calculateRefrigeration("refrigeration-q0-power", {
      ...simple,
      massFlow: 1e308,
    }),
  ).toThrow();
});
const refs = [
  [152308.38977203, 31735.2960559, 184043.68582793, 4.79933729],
  [151027.09806049, 30571.16573993, 181598.26380042, 4.94018119],
  [158452.04834239, 23651.4345835, 182103.48292589, 6.69946881],
  [137540.76975445, 37593.54317223, 175134.31292668, 3.65862747],
  [156562.33909592, 32530.6348201, 189092.97391602, 4.81276618],
  [159521.14363994, 31735.2960559, 191256.43969584, 5.0266159],
  [152308.38977203, 42313.72807453, 194622.11784656, 3.59950297],
  [157426.91862395, 23035.09828925, 180462.0169132, 6.83421953],
];
it.each(refrigerationCases.map((c, i) => [c, refs[i]] as const))(
  "prüft $0.id gegen feste getrennte SI-Bilanzreferenzen",
  (c, r) => {
    const b = caseBalance(c);
    [b.q0, b.w, b.qk, b.cop].forEach((v, i) =>
      expect(Math.abs(v - r[i])).toBeLessThan(1e-6),
    );
  },
);
