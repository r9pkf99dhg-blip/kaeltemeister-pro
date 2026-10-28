import { emptyMastery, type MasteryState } from "./model";
/** Only new, explicitly independent, graded successes produce dated evidence. */
export function captureIndependentEvidence(
  current: MasteryState | undefined,
  item: { id: string; revision: number; kind: string },
  correct: boolean,
  support: string | undefined,
  now: Date,
): MasteryState | undefined {
  if (!correct || support !== "independent" || item.kind === "card")
    return current;
  const m = current ?? emptyMastery();
  const old =
    m.evidence[item.id]?.revision === item.revision
      ? m.evidence[item.id]
      : undefined;
  const at = now.toISOString();
  if (old && Date.parse(old.lastAt) > now.getTime()) return current;
  const next = old
    ? {
        ...old,
        lastAt: at,
        ...(!old.spacedAt && now.getTime() - Date.parse(old.firstAt) >= 86400000
          ? { spacedAt: at }
          : {}),
      }
    : { revision: item.revision, firstAt: at, lastAt: at };
  return { ...m, evidence: { ...m.evidence, [item.id]: next } };
}
