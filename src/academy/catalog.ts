import { formulaNotation } from "../math/notation";
export { domains } from "./data/domains";
import { modules as refrigerationModules } from "./data/modules";
import {
  academyQuestions as refrigerationQuestions,
  flashcards as refrigerationCards,
} from "./data/practice";
import {
  formulas as baseFormulas,
  sources as baseSources,
  objectives as baseObjectives,
  terms as baseTerms,
} from "./data/registers";
import {
  electricalModules,
  electricalModuleQuestions,
  electricalCards,
  electricalFormulas,
  electricalSources,
  electricalObjectives,
  electricalTerms,
} from "./data/electrical";
export const modules = [...refrigerationModules, ...electricalModules];
export const academyQuestions = [
  ...refrigerationQuestions,
  ...electricalModuleQuestions,
];
export const flashcards = [...refrigerationCards, ...electricalCards];
export const formulas = [...baseFormulas, ...electricalFormulas].map(formula => ({ ...formula, tex: formula.tex ?? formulaNotation[formula.id] }));
export const sources = [...baseSources, ...electricalSources];
export const objectives = [...baseObjectives, ...electricalObjectives];
export const terms = [...baseTerms, ...electricalTerms];
export { workedCycle } from "./data/registers";

export { legacyBridges } from "./data/legacy";
