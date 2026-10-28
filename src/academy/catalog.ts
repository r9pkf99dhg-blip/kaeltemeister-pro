import { thermal_lessons } from "./deep/thermal-lessons";
import { thermal_formulas } from "./deep/thermal-formulas";
import { electrical_lessons } from "./deep/electrical-lessons";
import { electrical_formulas } from "./deep/electrical-formulas";
import { math_lessons } from "./deep/math-lessons";
import { math_formulas } from "./deep/math-formulas";
import { deepSources } from "./deep/sources";
import { foundationTerms } from "./foundations/terms";
import { moduleFoundationLinks } from "./foundations/competencies";
import { chemistryLessons, chemistryFormulas } from "./foundations/chemistry";
import { physicsLessons, physicsFormulas } from "./foundations/physics";
import {
  mathematicsLessons,
  mathematicsFormulas,
} from "./foundations/mathematics";
import { foundationSources } from "./foundations/sources";
import {
  lessonModule,
  lessonQuestions,
  lessonCards,
} from "./foundations/model";
const foundationLessons = [
  ...mathematicsLessons,
  ...physicsLessons,
  ...chemistryLessons,
  ...math_lessons,
  ...electrical_lessons,
  ...thermal_lessons,
];
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
export const modules = [
  ...refrigerationModules,
  ...electricalModules,
  ...foundationLessons.map(lessonModule),
].map((module) => ({
  ...module,
  termIds: [
    ...module.termIds,
    ...foundationTerms
      .filter((t) => t.moduleIds.includes(module.id))
      .map((t) => t.id),
  ],
  prerequisites: [
    ...new Set([
      ...(module.prerequisites ?? []),
      ...(moduleFoundationLinks[module.id] ?? []),
    ]),
  ],
}));
export const academyQuestions = [
  ...refrigerationQuestions,
  ...electricalModuleQuestions,
  ...foundationLessons.flatMap(lessonQuestions),
];
export const flashcards = [
  ...refrigerationCards,
  ...electricalCards,
  ...foundationLessons.flatMap(lessonCards),
];
export const formulas = [
  ...baseFormulas,
  ...electricalFormulas,
  ...mathematicsFormulas,
  ...physicsFormulas,
  ...chemistryFormulas,
  ...math_formulas,
  ...electrical_formulas,
  ...thermal_formulas,
].map((formula) => ({
  ...formula,
  tex: formula.tex ?? formulaNotation[formula.id],
}));
export const sources = [
  ...baseSources,
  ...electricalSources,
  ...foundationSources,
  ...deepSources,
];
export const objectives = [
  ...baseObjectives,
  ...electricalObjectives,
  ...foundationLessons.map((l) => ({ id: `${l.id}-objective`, text: l.goal })),
];
export const terms = [...baseTerms, ...electricalTerms, ...foundationTerms];
export { workedCycle } from "./data/registers";

export { legacyBridges } from "./data/legacy";
