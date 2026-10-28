import type { RefrigerationCase } from "./data";
import { cycleBalance } from "../technical/refrigeration";
export function caseEnthalpies(c: RefrigerationCase) {
  return {
    h1: c.points[0].h,
    h2: c.points[1].h,
    h3: c.points[2].h,
    h4: c.points[3].h,
  };
}
export function caseBalance(c: RefrigerationCase) {
  return cycleBalance(caseEnthalpies(c));
}
