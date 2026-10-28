import { record, integer } from "../academy/exams/validation";
export interface CycleDraft {
  schemaVersion: 1;
  datasetRevision: 1;
  mode: "qualitative" | "reference";
  caseId: string;
  point: number;
  component: number;
  massFlow: string;
  appliedMassFlow?: number;
  showIsotherms: boolean;
  showQuality: boolean;
  showProcess: boolean;
  zoom: number;
  panX: number;
  panY: number;
}
export const initialCycleDraft = (): CycleDraft => ({
  schemaVersion: 1,
  datasetRevision: 1,
  mode: "qualitative",
  caseId: "r134a-basis-v1",
  point: 1,
  component: 0,
  massFlow: "0,05",
  appliedMassFlow: 0.05,
  showIsotherms: false,
  showQuality: false,
  showProcess: true,
  zoom: 1,
  panX: 0,
  panY: 0,
});
export function validCycleDraft(d: unknown): d is CycleDraft {
  return (
    record(d) &&
    (d.appliedMassFlow === undefined ||
      (typeof d.appliedMassFlow === "number" &&
        Number.isFinite(d.appliedMassFlow) &&
        d.appliedMassFlow >= 0 &&
        d.appliedMassFlow <= 1)) &&
    d.schemaVersion === 1 &&
    integer(d.datasetRevision) &&
    d.datasetRevision >= 1 &&
    ["qualitative", "reference"].includes(String(d.mode)) &&
    typeof d.caseId === "string" &&
    d.caseId.length > 0 &&
    d.caseId.length <= 120 &&
    integer(d.point) &&
    d.point >= 1 &&
    d.point <= 4 &&
    integer(d.component) &&
    d.component <= 3 &&
    typeof d.massFlow === "string" &&
    d.massFlow.length <= 40 &&
    ["showIsotherms", "showQuality", "showProcess"].every(
      (k) => typeof d[k] === "boolean",
    ) &&
    typeof d.zoom === "number" &&
    Number.isFinite(d.zoom) &&
    d.zoom >= 1 &&
    d.zoom <= 6 &&
    ["panX", "panY"].every(
      (k) =>
        typeof d[k] === "number" &&
        Number.isFinite(d[k]) &&
        Math.abs(Number(d[k])) <= 1,
    )
  );
}
