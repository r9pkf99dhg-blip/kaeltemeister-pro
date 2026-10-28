import { expect, it } from "vitest";
import { initialCycleDraft, validCycleDraft } from "./draft";
import { validateProgress, emptyAcademy } from "../academy/progress";
it("ergänzt den Kreislauf optional und erhält alte Lerndaten ohne neue Felder", () => {
  expect(validateProgress(emptyAcademy())).toBe(true);
  expect(
    validateProgress({ ...emptyAcademy(), cycleDraft: initialCycleDraft() }),
  ).toBe(true);
});
it("blockiert korrupte Zustände vor dem Überschreiben, erlaubt sichere unbekannte Datenrevision", () => {
  const d = initialCycleDraft();
  for (const patch of [
    { point: 0 },
    { point: 5 },
    { component: 4 },
    { zoom: Infinity },
    { zoom: 0 },
    { panX: NaN },
    { massFlow: 1 },
    { showProcess: "ja" },
    { mode: "live" },
  ])
    expect(validCycleDraft({ ...d, ...patch })).toBe(false);
  expect(validCycleDraft({ ...d, datasetRevision: 3 })).toBe(true);
});
