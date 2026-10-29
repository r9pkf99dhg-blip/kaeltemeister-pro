import type { AcademyProgress } from "../academy/model";
import { modules } from "../academy/catalog";
import { learningItems } from "../academy/exercises/items";
import { competencyGraph } from "../academy/deep/graph";
import { emptyMastery, type LearningGoal, type SessionResult } from "./model";
import {
  independentItem,
  spacedItem,
  progressStage,
  isTransferId,
} from "./assessment";
export { independentItem, spacedItem, progressStage } from "./assessment";
import { newlyCompletedMissions } from "./missions";
export function competencyStages(p: AcademyProgress) {
  return competencyGraph().map((c) => ({
    ...c,
    ...progressStage(
      p,
      learningItems
        .filter(
          (i) =>
            c.taskIds.includes(i.id) ||
            i.requiredCompetencyIds?.includes(c.id) ||
            i.topicId === c.lessonId,
        )
        .map((i) => i.id),
      [c.lessonId],
    ),
  }));
}
export function domainStages(p: AcademyProgress) {
  return [
    "mathematik",
    "physik",
    "chemie",
    "elektro",
    "thermodynamik",
    "kaelte",
  ].map((id) => ({
    id,
    ...progressStage(
      p,
      learningItems.filter((i) => i.domainId === id).map((i) => i.id),
      modules.filter((m) => m.domainId === id).map((m) => m.id),
    ),
  }));
}
export function beginSession(
  p: AcademyProgress,
  goal: LearningGoal,
  minutes: number,
  now = new Date(),
): AcademyProgress {
  if (
    p.mastery?.session ||
    !Number.isSafeInteger(minutes) ||
    minutes < 5 ||
    minutes > 90
  )
    return p;
  const m = p.mastery ?? emptyMastery();
  const baseline = Object.fromEntries(
    Object.entries(p.performance)
      .filter(([id, e]) =>
        learningItems.some((i) => i.id === id && i.revision === e.itemRevision),
      )
      .map(([id, e]) => [
        id,
        {
          wasDue: Date.parse(e.dueAt) <= now.getTime(),
          revision: e.itemRevision,
          attempts: e.attempts,
          correct: e.correctCount,
          independent: e.support?.independent ?? 0,
          hint: e.support?.hint ?? 0,
          worked: e.support?.worked ?? 0,
          lastCorrect: e.lastCorrect,
        },
      ]),
  );
  let n = 0;
  while (m.history.some((h) => h.id === `session-${now.getTime()}-${n}`)) n++;
  return {
    ...p,
    mastery: {
      ...m,
      goal,
      minutes,
      session: {
        id: `session-${now.getTime()}-${n}`,
        startedAt: now.toISOString(),
        goal,
        minutes,
        baseline,
        pausedAt: null,
        pauseMs: 0,
      },
    },
  };
}
export function sessionSummary(
  p: AcademyProgress,
  now = new Date(),
): SessionResult | null {
  const s = p.mastery?.session;
  if (!s) return null;
  const independentIds: string[] = [],
    hintIds: string[] = [],
    workedIds: string[] = [],
    improvedIds: string[] = [],
    dueIds: string[] = [];
  let attempts = 0;
  for (const i of learningItems) {
    const e = p.performance[i.id];
    if (!e || e.itemRevision !== i.revision) continue;
    const before = s.baseline[i.id];
    if (before && before.revision !== i.revision) continue;
    const delta = e.attempts - (before?.attempts ?? 0);
    if (delta <= 0) continue;
    attempts += delta;
    if (before?.wasDue) dueIds.push(i.id);
    if ((e.support?.independent ?? 0) > (before?.independent ?? 0))
      independentIds.push(i.id);
    if ((e.support?.hint ?? 0) > (before?.hint ?? 0)) hintIds.push(i.id);
    if ((e.support?.worked ?? 0) > (before?.worked ?? 0)) workedIds.push(i.id);
    if (before?.lastCorrect === false && e.lastCorrect) improvedIds.push(i.id);
  }
  return {
    id: s.id,
    startedAt: s.startedAt,
    finishedAt: new Date(
      Math.max(now.getTime(), Date.parse(s.startedAt)),
    ).toISOString(),
    goal: s.goal,
    dueIds,
    missionIds: newlyCompletedMissions(p),
    independentIds,
    hintIds,
    workedIds,
    improvedIds,
    transferIds: independentIds.filter(isTransferId),
    attempts,
  };
}
export function finishSession(
  p: AcademyProgress,
  now = new Date(),
): AcademyProgress {
  const result = sessionSummary(p, now);
  if (!result || !p.mastery) return p;
  return {
    ...p,
    mastery: {
      ...p.mastery,
      session: null,
      history: [
        result,
        ...p.mastery.history.filter((h) => h.id !== result.id),
      ].slice(0, 10),
    },
  };
}
export function pauseSession(
  p: AcademyProgress,
  now = new Date(),
): AcademyProgress {
  const m = p.mastery,
    s = m?.session;
  if (!m || !s) return p;
  return {
    ...p,
    mastery: {
      ...m,
      session: s.pausedAt
        ? {
            ...s,
            pausedAt: null,
            pauseMs:
              s.pauseMs + Math.max(0, now.getTime() - Date.parse(s.pausedAt)),
          }
        : { ...s, pausedAt: now.toISOString() },
    },
  };
}
export const badgeRules = [
  {
    id: "badge-units-v08",
    title: "SI-Einheiten angewendet",
    tasks: [
      "workshop-conversion-power",
      "workshop-conversion-flow",
      "workshop-conversion-area",
    ],
    spaced: false,
  },
  {
    id: "badge-heat-v08",
    title: "Wärmeleistung selbstständig angewendet",
    tasks: ["calc-heat-water", "calc-mass-flow", "calc-temperature-difference"],
    spaced: false,
  },
  {
    id: "badge-cycle-v08",
    title: "Kreisbilanz mit Transfer angewendet",
    tasks: [
      "refrig-basis-q0-v08",
      "refrig-basis-w-v08",
      "refrig-transfer-cop-v08",
      "refrig-transfer-electric-v08",
    ],
    spaced: false,
  },
  {
    id: "badge-electric-v08",
    title: "Leistungsarten im Sinusmodell geübt",
    tasks: ["ac-p-a", "ac-s-a", "ac-three-a"],
    spaced: false,
  },
  {
    id: "badge-spaced-v08",
    title: "Zeitversetzt erneut bestätigt",
    tasks: ["workshop-conversion-power", "workshop-conversion-flow"],
    spaced: true,
  },
];
export function badges(p: AcademyProgress) {
  return badgeRules.map((b) => ({
    ...b,
    earned: b.tasks.every(
      (id) => independentItem(p, id) && (!b.spaced || spacedItem(p, id)),
    ),
    confirmed: b.tasks.filter(
      (id) => independentItem(p, id) && (!b.spaced || spacedItem(p, id)),
    ).length,
    criteria: `${b.tasks.length} verschiedene aktuelle Aufgaben ohne angebotene Hilfe richtig lösen${b.spaced ? "; jede davon nach mindestens 24 Stunden erneut richtig lösen" : ""}. Hilfe-/Musterlösungen und unbekannte historische Selbstständigkeit genügen nicht. Aufgabenrevisionen müssen aktuell sein. Lernmeilenstein, kein Zertifikat.`,
  }));
}
