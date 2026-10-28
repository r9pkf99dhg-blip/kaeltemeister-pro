import { learningItems } from "../academy/exercises/items";
import { errorCorrections, guidedHeatSteps } from "./data";
import type { WorkshopKind } from "./model";
import type { Level } from "../academy/model";
export interface WorkshopEntry {
  id: string;
  title: string;
  domainId: string;
  topicId: string;
  level: Level;
  kind: WorkshopKind;
  itemIds: string[];
}
export const workshopKindNames: Record<WorkshopKind, string> = {
  choice: "Auswahlfrage",
  numeric: "Freie Zahlenantwort",
  formula: "Formel auswählen",
  rearrangement: "Formel umstellen",
  conversion: "Einheiten umrechnen",
  error: "Fehler finden und korrigieren",
  steps: "Mehrstufige Rechnung",
  decision: "Fachliche Entscheidung",
};
export const workshopEntries: WorkshopEntry[] = learningItems
  .filter(
    (i) => !i.id.startsWith("trainer-") && !i.id.startsWith("workshop-step-"),
  )
  .map((i) => ({
    id: i.id,
    title: i.title,
    domainId: i.domainId,
    topicId: i.topicId,
    level: i.level,
    kind: i.id.startsWith("workshop-conversion-")
      ? "conversion"
      : i.kind === "numeric"
        ? "numeric"
        : i.id.startsWith("workshop-formula-")
          ? "formula"
          : i.id.startsWith("workshop-error-")
            ? "error"
            : i.id === "workshop-decision-model" ||
                (i.id.startsWith("case-") && i.level === "meister")
              ? "decision"
              : "choice",
    itemIds: errorCorrections[i.id] ? [i.id, errorCorrections[i.id]] : [i.id],
  }));
workshopEntries.unshift({
  id: "workshop-guided-heat",
  title: "Wärmeleistung in vier kontrollierbaren Schritten",
  domainId: "thermodynamik",
  topicId: "thermo-calorimetry",
  level: "fachkraft",
  kind: "steps",
  itemIds: guidedHeatSteps,
});
workshopEntries.push({
  id: "workshop-trainer",
  title: "Kuratierter Formelumstellungstrainer",
  domainId: "mathematik",
  topicId: "math-rearrange",
  level: "grundlagen",
  kind: "rearrangement",
  itemIds: [],
});
