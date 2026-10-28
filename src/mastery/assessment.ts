import type { AcademyProgress } from "../academy/model";
import { modules } from "../academy/catalog";
import { learningItems } from "../academy/exercises/items";
export function independentItem(p: AcademyProgress, id: string) {
  const i = learningItems.find((i) => i.id === id),
    e = p.performance[id];
  return !!(
    i &&
    e?.itemRevision === i.revision &&
    (e.support?.independent ?? 0) > 0
  );
}
export function spacedItem(p: AcademyProgress, id: string) {
  const i = learningItems.find((i) => i.id === id),
    e = p.mastery?.evidence[id];
  return !!(
    i &&
    e?.revision === i.revision &&
    e.spacedAt &&
    independentItem(p, id)
  );
}
export const isTransferId = (id: string) =>
  id.startsWith("refrig-transfer-") || id.endsWith("-decision");
export function progressStage(
  p: AcademyProgress,
  itemIds: string[],
  moduleIds: string[],
) {
  const items = learningItems.filter((i) => itemIds.includes(i.id));
  const assessed = items.filter(
    (i) =>
      p.performance[i.id]?.itemRevision === i.revision &&
      p.performance[i.id].attempts > 0,
  );
  const independent = items.filter((i) => independentItem(p, i.id));
  const transfer = independent.filter((i) => isTransferId(i.id));
  const spaced = independent.filter((i) => spacedItem(p, i.id));
  const read = moduleIds.some((id) => {
    const m = modules.find((m) => m.id === id);
    return m && p.read[id]?.revision === m.revision && p.read[id].levels.length;
  });
  return {
    stage:
      transfer.length && independent.length >= 3
        ? "In Transfer angewendet"
        : independent.length >= 2
          ? "Selbstständig angewendet"
          : assessed.length
            ? "Geübt"
            : read
              ? "Grundlagen kennengelernt"
              : "Noch nicht bearbeitet",
    assessed: assessed.length,
    independent: independent.length,
    transfer: transfer.length,
    spaced: spaced.length,
    explanation:
      "Stufen beruhen auf aktuellen Aufgabenrevisionen und dokumentierten Versuchen; keine umfassende Fachqualifikation. Freie Erklärungen sind nicht objektiv fachlich geprüft.",
  };
}
