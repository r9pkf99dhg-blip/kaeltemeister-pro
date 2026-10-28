/** Stabile Aufgabenzuordnungen statt eines zweiten Rechenkerns oder kopierter Zahlenfälle. */
export const caseSteps: Record<string, string[]> = {
  "case-heat": ["th-mass-flow-a", "th-heat-a", "case-heat-q3"],
  "case-ac": ["ac-s-a", "ac-p-a", "ac-q-a", "case-ac-q3"],
  "case-pipe": ["geo-area-a", "geo-volume-a", "geo-surface-a", "case-pipe-q3"],
  "case-conduction": ["th-conduction-a", "th-layer-a", "case-conduction-q3"],
};
