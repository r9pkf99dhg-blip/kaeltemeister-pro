import { competencies } from "../foundations/competencies";
import { modules, formulas } from "../catalog";
import { numericTasks } from "../exercises/data";
/** Abgeleitete Sichten: bestehende Kompetenz-IDs bleiben unverändert, keine zweite Fortschrittsdatenbank. */
export function competencyGraph() {
  return competencies.map((c) => {
    const module = modules.find((m) => m.id === c.lessonId)!;
    return {
      ...c,
      prerequisiteModuleIds: module.prerequisites ?? [],
      formulaIds: module.formulaIds,
      taskIds: numericTasks
        .filter((t) => t.requiredCompetencyIds?.includes(c.id))
        .map((t) => t.id),
      sourceIds: [
        ...new Set(
          module.formulaIds.flatMap(
            (id) => formulas.find((f) => f.id === id)?.sourceIds ?? [],
          ),
        ),
      ],
    };
  });
}
