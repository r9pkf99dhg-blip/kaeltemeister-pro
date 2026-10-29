import { expect, it, beforeEach } from "vitest";
import { emptyAcademy, validateProgress } from "../academy/progress";
import { createBackup, parseBackup, restoreBackup } from "../storage/backup";
import { initialCycleDraft } from "./draft";
import { emptyMastery } from "../mastery/model";
import { beginSession, finishSession } from "../mastery/engine";
import { recordOutcome } from "../academy/adaptive/algorithm";
import { learningItems } from "../academy/exercises/items";
beforeEach(() => localStorage.clear());
it("erhält neue Daten einschließlich falscher Roh-Eingabe, Sitzung, zeitlicher Evidenz und Missionsposition ohne Doppelbuchung", () => {
  const now = new Date("2026-10-28T15:00:00Z");
  let p = { ...emptyAcademy(), mastery: emptyMastery() };
  p = beginSession(p, "mission", 25, now) as typeof p;
  p.mastery!.mission = {
    id: "mission-cycle-calculate-v08",
    revision: 1,
    step: 2,
    seen: ["a"],
  };
  p = recordOutcome(
    p,
    learningItems.find((i) => i.id === "refrig-basis-q0-v08")!,
    true,
    now,
    undefined,
    "independent",
  ) as typeof p;
  p = {
    ...p,
    cycleDraft: {
      ...initialCycleDraft(),
      mode: "reference",
      massFlow: "-1",
      appliedMassFlow: 0.1,
    },
  } as typeof p;
  const b = createBackup(
    p,
    { read: [], attempts: 0, best: 0, last: null },
    localStorage,
    now,
  );
  const imported = parseBackup(JSON.stringify(b));
  restoreBackup(imported, localStorage);
  expect(imported.data.academy).toEqual(p);
  const finished = finishSession(imported.data.academy, now);
  expect(finishSession(finished, now)).toEqual(finished);
  expect(finished.mastery?.history[0].independentIds).toEqual([
    "refrig-basis-q0-v08",
  ]);
});
it("weist beschädigte neue Metadaten und doppelte Sitzungen vor jeder Schreiboperation zurück", () => {
  const p = {
    ...emptyAcademy(),
    mastery: emptyMastery(),
    cycleDraft: initialCycleDraft(),
  };
  for (const patch of [{ zoom: NaN }, { appliedMassFlow: -1 }, { point: 9 }])
    expect(
      validateProgress({ ...p, cycleDraft: { ...p.cycleDraft, ...patch } }),
    ).toBe(false);
  for (const patch of [
    { mission: { id: "x", revision: 1, step: 99 } },
    { session: { id: "x" } },
    { evidence: { x: { revision: 1, firstAt: "bad", lastAt: "bad" } } },
  ])
    expect(
      validateProgress({ ...p, mastery: { ...p.mastery, ...patch } }),
    ).toBe(false);
  expect(localStorage.length).toBe(0);
});
