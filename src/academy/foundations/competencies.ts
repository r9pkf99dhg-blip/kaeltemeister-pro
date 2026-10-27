import type { NumericTask } from "../exercises/model";
export interface Competency {
  id: string;
  title: string;
  lessonId: string;
}
/** Namen und IDs sind kuratiert; keine Positionsnummer als fachliche Identität. */
export const competencies: Competency[] = [
  ["arithmetic", "Rechenregeln und Vorzeichen", "math-arithmetic"],
  ["fractions", "Brüche und Quotienten", "math-fractions"],
  ["percent", "Anteile und Proportionen", "math-percent"],
  ["algebra", "Variablen und Terme", "math-algebra"],
  ["equations", "Gleichungen lösen", "math-equations"],
  ["rearrangement", "Formeln umstellen", "math-rearrange"],
  ["si-units", "Einheiten umrechnen", "math-units"],
  ["powers", "Potenzen und Wurzeln", "math-powers"],
  ["motion", "Bewegung und Kraft", "physics-motion"],
  ["energy", "Arbeit und Leistung", "physics-energy"],
  ["pressure-density", "Druck und Dichte", "physics-pressure-density"],
  ["heat", "Wärme und Temperatur", "physics-heat"],
  ["matter", "Stoffe und Massenanteile", "chemistry-matter"],
  ["atoms", "Chemische Formelzeichen", "chemistry-atoms"],
  ["amount", "Stoffmenge und molare Masse", "chemistry-amount"],
  ["dc-electric", "Gleichstromleistung", "electric-work"],
].map(([id, title, lessonId]) => ({ id: `competency-${id}`, title, lessonId }));
const byCalculation: Record<string, string[]> = {
  heat: ["arithmetic", "si-units", "heat"],
  "mass-flow": ["fractions", "rearrangement", "si-units", "heat"],
  "temperature-difference": ["fractions", "rearrangement", "si-units", "heat"],
  superheat: ["arithmetic", "si-units", "heat"],
  subcooling: ["arithmetic", "si-units", "heat"],
  "dc-power": ["arithmetic", "si-units", "dc-electric"],
  "cooling-cop": ["fractions", "si-units", "energy"],
  "heating-cop": ["fractions", "si-units", "energy"],
  "charge-current": ["fractions", "si-units"],
  "ohm-current": ["fractions", "rearrangement", "si-units"],
  "ohm-voltage": ["arithmetic", "rearrangement", "si-units"],
  "ohm-resistance": ["fractions", "rearrangement", "si-units"],
  "electric-energy": ["arithmetic", "si-units", "energy"],
  "series-resistance": ["arithmetic", "si-units"],
  "parallel-resistance": ["fractions", "si-units"],
  "math-order": ["arithmetic"],
  "math-fraction-add": ["fractions"],
  "math-fraction-subtract": ["fractions"],
  "math-fraction-multiply": ["fractions"],
  "math-fraction-divide": ["fractions"],
  "math-percent-value": ["percent"],
  "math-percent-rate": ["percent"],
  "math-proportion": ["percent"],
  "math-term": ["algebra"],
  "math-linear": ["equations"],
  "math-power": ["powers"],
  "math-root": ["powers"],
  identity: ["si-units"],
  speed: ["fractions", "si-units", "motion"],
  force: ["arithmetic", "si-units", "motion"],
  "mechanical-work": ["arithmetic", "si-units", "energy"],
  "power-from-energy": ["fractions", "si-units", "energy"],
  pressure: ["fractions", "si-units", "pressure-density"],
  density: ["fractions", "si-units", "pressure-density"],
  "sensible-energy": ["arithmetic", "si-units", "heat"],
  amount: ["fractions", "si-units", "amount"],
};
export function taskCompetencies(
  task: Pick<NumericTask, "calculation" | "topicId">,
): string[] {
  const ids = (byCalculation[task.calculation] ?? []).map(
    (id) => `competency-${id}`,
  );
  const topic = competencies.find((c) => c.lessonId === task.topicId)?.id;
  return [...new Set(topic ? [...ids, topic] : ids)];
}
export const moduleFoundationLinks: Record<string, string[]> = {
  "cycle-basics": ["physics-heat", "physics-pressure-density"],
  evaporation: ["physics-heat"],
  compression: ["physics-energy", "physics-pressure-density"],
  condensation: ["physics-heat"],
  "superheat-subcooling": ["math-arithmetic", "physics-heat"],
  "electric-quantities": ["math-units"],
  "electric-uir": ["math-rearrange"],
  "electric-work": ["physics-energy"],
};
