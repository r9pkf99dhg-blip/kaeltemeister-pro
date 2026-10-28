/** Aussagenbelege sind unabhängig vom Präsentationsregister und vergeben keine menschliche Freigabe. */
export type ClaimKind = 'law' | 'model' | 'approximation' | 'manufacturer' | 'normative' | 'legal';
export const evidenceStatusNames = {
  draft: 'Entwurf', researched: 'Quellenrecherche abgeschlossen', sourced: 'Quellenbasiert geprüft',
  calculated: 'Rechnerisch unabhängig geprüft', edited: 'Redaktionell geprüft',
  humanRequired: 'Menschliche Fachprüfung erforderlich', approved: 'Unabhängig fachlich freigegeben', revision: 'Überarbeitung erforderlich',
} as const;
export interface ClaimEvidence {
  id: string;
  domainId: string;
  moduleIds: string[];
  formulaIds: string[];
  statement: string;
  kind: ClaimKind;
  sourceId: string;
  section: string;
  checkedAt: string;
  assumptions: string;
  limitations: string;
  checks: (keyof typeof evidenceStatusNames)[];
  humanReview: { reviewer: string; date: string; scope: string } | null;
}
export interface SourceEvaluation {
  sourceId: string;
  type: 'textbook' | 'law' | 'curriculum' | 'si' | 'safety' | 'research';
  authority: string;
  suitability: string;
  currency: string;
  limitations: string;
  conflicts: string;
}
export const claimKindNames: Record<ClaimKind,string> = {
  law: 'Physikalische / mathematische Beziehung', model: 'Vereinfachtes Rechenmodell', approximation: 'Näherung',
  manufacturer: 'Herstellerangabe', normative: 'Normative Anforderung', legal: 'Rechtliche Vorschrift',
};
