import { chemistryLessons, chemistryFormulas } from "./foundations/chemistry";
import { physicsLessons, physicsFormulas } from "./foundations/physics";
import { mathematicsLessons, mathematicsFormulas } from "./foundations/mathematics";
import { foundationSources } from "./foundations/sources";
import { lessonModule, lessonQuestions, lessonCards } from "./foundations/model";
const foundationLessons = [...mathematicsLessons, ...physicsLessons, ...chemistryLessons];
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
export const modules = [...refrigerationModules, ...electricalModules, ...foundationLessons.map(lessonModule)];
export const academyQuestions = [
  ...refrigerationQuestions,
  ...electricalModuleQuestions,
  ...foundationLessons.flatMap(lessonQuestions),
];
export const flashcards = [...refrigerationCards, ...electricalCards, ...foundationLessons.flatMap(lessonCards)];
export const formulas = [...baseFormulas, ...electricalFormulas, ...mathematicsFormulas, ...physicsFormulas, ...chemistryFormulas].map(formula => ({ ...formula, tex: formula.tex ?? formulaNotation[formula.id] }));
export const sources = [...baseSources, ...electricalSources, ...foundationSources];
export const objectives = [...baseObjectives, ...electricalObjectives, ...foundationLessons.map(l=>({id:`${l.id}-objective`,text:l.goal}))];
export const terms = [...baseTerms, ...electricalTerms];
export { workedCycle } from "./data/registers";

export { legacyBridges } from "./data/legacy";
