import { it, expect } from "vitest";
import {
  missions,
  missionStatus,
  recommendedMission,
  interleavedTasks,
} from "./missions";
import { learningItems } from "../academy/exercises/items";
import { modules, sources } from "../academy/catalog";
import { competencies } from "../academy/foundations/competencies";
import { emptyAcademy, validateProgress } from "../academy/progress";
import { recordOutcome } from "../academy/adaptive/algorithm";
import { emptyMastery } from "./model";
it("verknüpft neun Missionen und den sechsteiligen Kreispfad ausschließlich mit echten gemeinsamen Referenzen", () => {
  expect(missions).toHaveLength(9);
  expect(
    missions.filter((m) => m.id.startsWith("mission-cycle-")),
  ).toHaveLength(6);
  expect(new Set(missions.map((m) => m.id)).size).toBe(missions.length);
  for (const m of missions) {
    expect(
      m.steps.filter((s) => s.kind === "practice").length,
    ).toBeGreaterThanOrEqual(2);
    for (const id of [...m.competencyIds, ...m.prerequisiteIds])
      expect(competencies.some((c) => c.id === id)).toBe(true);
    for (const id of m.sourceIds)
      expect(sources.some((s) => s.id === id)).toBe(true);
    for (const s of m.steps) {
      if (s.itemId)
        expect(learningItems.some((i) => i.id === s.itemId)).toBe(true);
      if (s.moduleId)
        expect(modules.some((m) => m.id === s.moduleId)).toBe(true);
    }
  }
});
it("verleiht durch Öffnen/Lesen/Selbstauskunft keinen Missionsabschluss", () => {
  const p = emptyAcademy(),
    m = missions.find((m) => m.id === "mission-cycle-calculate-v08")!;
  p.mastery = {
    ...emptyMastery(),
    mission: {
      id: m.id,
      revision: m.revision,
      step: 0,
      seen: m.steps.map((s) => s.id),
    },
  };
  expect(missionStatus(p, m).complete).toBe(false);
  expect(validateProgress(p)).toBe(true);
});
it("verlangt tatsächlich unabhängige aktuelle Aufgaben, verwirft veraltete Nachweise und zählt Erfolge nicht mehrfach", () => {
  const m = missions.find((m) => m.id === "mission-cycle-calculate-v08")!;
  let p = emptyAcademy();
  const tasks = m.steps
    .filter((s) => s.itemId)
    .map((s) => learningItems.find((i) => i.id === s.itemId)!);
  for (const i of tasks)
    p = recordOutcome(p, i, true, new Date(), undefined, "hint");
  expect(missionStatus(p, m).complete).toBe(false);
  for (const i of tasks)
    p = recordOutcome(p, i, true, new Date(), undefined, "independent");
  expect(missionStatus(p, m).complete).toBe(true);
  const before = missionStatus(p, m);
  p = recordOutcome(p, tasks[0], true, new Date(), undefined, "independent");
  expect(missionStatus(p, m).done).toBe(before.done);
  p.performance[tasks[0].id].itemRevision = 999;
  expect(missionStatus(p, m).complete).toBe(false);
});
it("empfiehlt Einheiten bei tatsächlichem Fehler und mischt verwandte Aufgaben erst nach Einführung", () => {
  let p = recordOutcome(
    emptyAcademy(),
    learningItems.find((i) => i.id === "workshop-conversion-power")!,
    false,
  );
  expect(recommendedMission(p).mission.id).toBe("mission-units-v08");
  const m = missions.find((m) => m.id === "mission-heat-v08")!;
  expect(interleavedTasks(p, m)).toEqual([]);
  for (const id of ["calc-heat-water", "calc-mass-flow"])
    p = recordOutcome(p, learningItems.find((i) => i.id === id)!, true);
  expect(interleavedTasks(p, m)).toHaveLength(3);
});
