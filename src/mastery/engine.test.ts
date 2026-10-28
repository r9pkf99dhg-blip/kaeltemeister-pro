import { expect, it, beforeEach } from "vitest";
import { emptyAcademy, validateProgress } from "../academy/progress";
import { recordOutcome } from "../academy/adaptive/algorithm";
import { createBackup, parseBackup } from "../storage/backup";
import {
  beginSession,
  finishSession,
  sessionSummary,
  badges,
  progressStage,
} from "./engine";
import { emptyMastery } from "./model";
import { learningItems } from "../academy/exercises/items";
beforeEach(() => localStorage.clear());
const item = learningItems.find((i) => i.id === "workshop-conversion-power")!;
const start = new Date("2026-10-28T10:00:00Z");
it("erzeugt keine Kompetenz durch Öffnen, Zeit oder unbekannte alte Erfolge", () => {
  let p = emptyAcademy();
  expect(progressStage(p, [item.id], []).stage).toBe("Noch nicht bearbeitet");
  p = recordOutcome(p, item, true, start);
  expect(p.mastery).toBeUndefined();
  expect(badges(p).every((b) => !b.earned)).toBe(true);
  expect(progressStage(p, [item.id], []).independent).toBe(0);
});
it("unterscheidet unabhängige, Hinweis- und Musterlösungsversuche und bestätigt nur echte spätere Wiederholung", () => {
  let p = emptyAcademy();
  p = recordOutcome(p, item, true, start, undefined, "hint");
  expect(p.mastery).toBeUndefined();
  p = recordOutcome(p, item, true, start, undefined, "independent");
  expect(p.mastery?.evidence[item.id].spacedAt).toBeUndefined();
  p = recordOutcome(
    p,
    item,
    true,
    new Date(start.getTime() + 86399999),
    undefined,
    "independent",
  );
  expect(p.mastery?.evidence[item.id].spacedAt).toBeUndefined();
  p = recordOutcome(
    p,
    item,
    true,
    new Date(start.getTime() + 86400000),
    undefined,
    "independent",
  );
  expect(p.mastery?.evidence[item.id].spacedAt).toBeTruthy();
  expect(validateProgress(p)).toBe(true);
  const newer = recordOutcome(
    p,
    { ...item, revision: 2 },
    true,
    new Date(start.getTime() + 172800000),
    undefined,
    "independent",
  );
  expect(newer.mastery?.evidence[item.id].spacedAt).toBeUndefined();
});
it("vergibt gleiche Lernmeilensteine nur einmal und ignoriert veraltete Revisionen", () => {
  let p = emptyAcademy();
  for (const id of [
    "workshop-conversion-power",
    "workshop-conversion-flow",
    "workshop-conversion-area",
  ])
    p = recordOutcome(
      p,
      learningItems.find((i) => i.id === id)!,
      true,
      start,
      undefined,
      "independent",
    );
  const a = badges(p).find((b) => b.id === "badge-units-v08")!;
  expect(a.earned).toBe(true);
  p = recordOutcome(p, item, true, start, undefined, "independent");
  expect(badges(p).find((b) => b.id === a.id)!.earned).toBe(true);
  p.performance[item.id].itemRevision = 999;
  expect(badges(p).find((b) => b.id === a.id)!.earned).toBe(false);
});
it("fasst konkrete unterschiedliche Aufgaben zusammen und bucht eine Sitzung nicht doppelt", () => {
  let p = recordOutcome(emptyAcademy(), item, false, start);
  p = beginSession(p, "independent", 25, start);
  for (let n = 0; n < 3; n++)
    p = recordOutcome(p, item, true, start, undefined, "independent");
  expect(sessionSummary(p, start)).toMatchObject({
    independentIds: [item.id],
    improvedIds: [item.id],
    attempts: 3,
  });
  p = finishSession(p, start);
  expect(p.mastery?.history).toHaveLength(1);
  expect(finishSession(p, start)).toBe(p);
  expect(validateProgress(p)).toBe(true);
});
it("sichert optionale Motivations-, Nachweis- und Sitzungsdaten im bestehenden Backup und blockiert beschädigte Daten", () => {
  let p = beginSession(emptyAcademy(), "mission", 50, start);
  p = recordOutcome(p, item, true, start, undefined, "independent");
  p.mastery = {
    ...p.mastery!,
    motivation: "disabled",
    focus: true,
    mission: { id: "cycle-components", revision: 1, step: 2 },
  };
  const b = createBackup(
    p,
    { read: [], attempts: 0, best: 0, last: null },
    localStorage,
  );
  expect(parseBackup(JSON.stringify(b)).data.academy).toEqual(p);
  const bad = structuredClone(b);
  bad.data.academy.mastery!.evidence[item.id].spacedAt = start.toISOString();
  expect(() => parseBackup(JSON.stringify(bad))).toThrow();
  expect(
    validateProgress({
      ...p,
      mastery: { ...emptyMastery(), motivation: "invalid" },
    }),
  ).toBe(false);
});
