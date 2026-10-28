import type { AcademyProgress, Level } from "../academy/model";
import { modules } from "../academy/catalog";
import { learningItems } from "../academy/exercises/items";
import { independentItem } from "./assessment";
export interface MissionStep {
  id: string;
  kind: "read" | "example" | "practice" | "selfcheck";
  title: string;
  moduleId?: string;
  itemId?: string;
  guided?: boolean;
  independent?: boolean;
  example?: "heat" | "cycle";
  prompt?: string;
}
export interface Fachmission {
  id: string;
  revision: number;
  title: string;
  domainId: string;
  level: Level;
  length: "short" | "standard" | "deep";
  minutes: string;
  goals: string[];
  prerequisiteIds: string[];
  sourceIds: string[];
  competencyIds: string[];
  steps: MissionStep[];
}
const read = (id: string, title: string, moduleId: string): MissionStep => ({
  id,
  kind: "read",
  title,
  moduleId,
});
const exercise = (
  id: string,
  itemId: string,
  title: string,
  independent = false,
  guided = false,
): MissionStep => ({
  id,
  kind: "practice",
  itemId,
  title,
  independent,
  guided,
});
const cycleSources = ["coolprop-r134a-v08", "openstax-thermal-v06"];
export const missions: Fachmission[] = [
  {
    id: "mission-cycle-components-v08",
    revision: 1,
    title: "1 · Die Komponenten verstehen",
    domainId: "kaelte",
    level: "grundlagen",
    length: "short",
    minutes: "5–10 Minuten",
    goals: [
      "Vier Hauptbauteile ihren Funktionen zuordnen.",
      "Wärmeaufnahme, Wärmeabgabe und Arbeit unterscheiden.",
    ],
    prerequisiteIds: ["competency-heat"],
    sourceIds: cycleSources,
    competencyIds: ["competency-refrig-cycle"],
    steps: [
      read("intro", "Kreislauf kennenlernen", "cycle-basics"),
      ...["compressor", "condenser", "valve", "evaporator"].map((id, i) =>
        exercise(
          `component-${i}`,
          `refrig-component-${id}-v08`,
          "Bauteil und Funktion zuordnen",
        ),
      ),
      exercise(
        "order",
        "refrig-order-v08",
        "Reihenfolge ab Zustand 1 einordnen",
      ),
    ],
  },
  {
    id: "mission-cycle-states-v08",
    revision: 1,
    title: "2 · Zustände und Druckbereiche verstehen",
    domainId: "kaelte",
    level: "grundlagen",
    length: "short",
    minutes: "5–10 Minuten",
    goals: [
      "Unsere Zustände 1–4 verwenden.",
      "Hoch-/Niederdruck und Prozesslinien unterscheiden.",
    ],
    prerequisiteIds: ["competency-refrig-cycle"],
    sourceIds: cycleSources,
    competencyIds: ["competency-refrig-cycle", "competency-refrig-state"],
    steps: [
      read("intro", "Zustandsnummern und Bilanz lesen", "refrig-cycle-v08"),
      exercise("high", "refrig-diagram-high-v08", "Hochdruckseite finden"),
      exercise("evap", "refrig-diagram-evap-v08", "Wärmeaufnahme zuordnen"),
      exercise(
        "throttle",
        "refrig-diagram-throttle-v08",
        "Drossellinie verstehen",
      ),
    ],
  },
  {
    id: "mission-cycle-enthalpy-v08",
    revision: 1,
    title: "3 · Enthalpiedifferenzen verstehen",
    domainId: "thermodynamik",
    level: "fachkraft",
    length: "standard",
    minutes: "15–25 Minuten",
    goals: [
      "Gemeinsamen Enthalpiebezug kontrollieren.",
      "Spezifische Energie, Temperatur und Leistung unterscheiden.",
    ],
    prerequisiteIds: ["competency-refrig-state", "competency-fractions"],
    sourceIds: cycleSources,
    competencyIds: ["competency-refrig-state", "competency-refrig-phase"],
    steps: [
      read("intro", "Stoffgrößen und Bezug", "refrig-state-v08"),
      {
        id: "example",
        kind: "example",
        title: "Ein gemeinsames synthetisches Beispiel nachvollziehen",
        example: "cycle",
      },
      exercise(
        "reference",
        "refrig-error-reference-v08",
        "Fehler im vorgegebenen Bezug erkennen",
      ),
      exercise(
        "guided",
        "refrig-basis-q0-v08",
        "Eine Enthalpiedifferenz mit optionaler Hilfe bearbeiten",
        false,
        true,
      ),
      exercise(
        "own",
        "refrig-kuehlraum-q0-v08",
        "Einen anderen Fall ohne angebotene Hilfe berechnen",
        true,
      ),
    ],
  },
  {
    id: "mission-cycle-calculate-v08",
    revision: 1,
    title: "4 · Den Kreisprozess selbst berechnen",
    domainId: "thermodynamik",
    level: "fachkraft",
    length: "standard",
    minutes: "20–30 Minuten",
    goals: [
      "q0, w, qk und Fluid-COP aus denselben Referenzzuständen bestimmen.",
      "Eigenen Rechenweg und SI-Einheiten dokumentieren.",
    ],
    prerequisiteIds: [
      "competency-refrig-phase",
      "competency-refrig-compression",
      "competency-si-units",
    ],
    sourceIds: cycleSources,
    competencyIds: ["competency-refrig-cycle", "competency-refrig-compression"],
    steps: [
      read("intro", "Kreisbilanz und Modellgrenzen", "refrig-cycle-v08"),
      ...["q0", "w", "qk", "cop"].map((key) =>
        exercise(
          key,
          `refrig-basis-${key}-v08`,
          "Eine Zielgröße selbstständig mit dem Rechenblatt bestimmen",
          true,
        ),
      ),
      {
        id: "self",
        kind: "selfcheck",
        title: "Systemgrenze selbst erklären",
        prompt:
          "Warum ist q0/w nicht automatisch der elektrische Anlagen-COP? Notiere und prüfe deine Argumente anhand Motor, Nebenaggregaten, Systemgrenze und Modellverlusten.",
      },
    ],
  },
  {
    id: "mission-cycle-interpret-v08",
    revision: 1,
    title: "5 · Änderungen am Prozess interpretieren",
    domainId: "kaelte",
    level: "meister",
    length: "standard",
    minutes: "15–25 Minuten",
    goals: [
      "Nur unter festgelegten Randbedingungen vergleichen.",
      "Modellgrenzen und Phasenwechsel begründen.",
    ],
    prerequisiteIds: ["competency-refrig-cycle", "competency-refrig-phase"],
    sourceIds: cycleSources,
    competencyIds: ["competency-refrig-cycle"],
    steps: [
      exercise(
        "prediction",
        "refrig-predict-increase-v08",
        "Änderung vorhersagen",
      ),
      exercise(
        "compare",
        "refrig-compare-v08",
        "Zwei konkrete Katalogfälle vergleichen",
        true,
      ),
      exercise(
        "phase",
        "refrig-error-cp-v08",
        "Eine falsche Phasenwechselrechnung korrigieren",
      ),
      {
        id: "self",
        kind: "selfcheck",
        title: "Eigene Erklärung prüfen",
        prompt:
          "Erkläre, welche Größen beim vorgegebenen Vergleich konstant sind und weshalb die Beobachtung keine pauschale Aussage über jede reale Anlage ist.",
      },
    ],
  },
  {
    id: "mission-cycle-transfer-v08",
    revision: 1,
    title: "6 · Einen neuen Referenzfall übertragen",
    domainId: "thermodynamik",
    level: "meister",
    length: "deep",
    minutes: "30–50 Minuten",
    goals: [
      "Einen anderen vorgegebenen Zustandssatz zusammenhängend bilanzieren.",
      "Leistung und spezifische Energie unterscheiden und Grenzen begründen.",
    ],
    prerequisiteIds: [
      "competency-refrig-cycle",
      "competency-si-units",
      "competency-refrig-compression",
    ],
    sourceIds: cycleSources,
    competencyIds: ["competency-refrig-cycle", "competency-refrig-phase"],
    steps: [
      read("intro", "Phasen und Bilanz auffrischen", "refrig-phase-v08"),
      ...["q0", "w", "qk", "cop", "power"].map((key) =>
        exercise(
          key,
          `refrig-transfer-${key}-v08`,
          "Neue Zustandsdaten selbstständig anwenden",
          true,
        ),
      ),
      exercise(
        "conclusion",
        "refrig-transfer-electric-v08",
        "Fachliche Schlussfolgerung ziehen",
        true,
      ),
      {
        id: "self",
        kind: "selfcheck",
        title: "Originalprobe und Begründung",
        prompt:
          "Prüfe qk = q0 + w, h4 = h3, positive Arbeit und dieselbe IIR-Referenz. Was fehlt für eine reale elektrische Anlagenbilanz?",
      },
    ],
  },
  {
    id: "mission-heat-v08",
    revision: 1,
    title: "Wärmeleistung verstehen und anwenden",
    domainId: "thermodynamik",
    level: "fachkraft",
    length: "standard",
    minutes: "15–25 Minuten",
    goals: [
      "Sensible Wärmeleistung mit Einheiten berechnen.",
      "Massenstrom aus demselben Modell bestimmen.",
    ],
    prerequisiteIds: ["competency-si-units", "competency-heat"],
    sourceIds: ["openstax-heat-capacity-github"],
    competencyIds: ["competency-calorimetry", "competency-rearrangement"],
    steps: [
      read("intro", "Sensible Wärmeleistung verstehen", "thermo-calorimetry"),
      {
        id: "example",
        kind: "example",
        title: "Ein anderes Zahlenbeispiel nachvollziehen",
        example: "heat",
      },
      exercise(
        "formula",
        "workshop-formula-heat",
        "Modell und Formel auswählen",
      ),
      exercise(
        "own",
        "calc-heat-water",
        "Wärmeleistung selbstständig lösen",
        true,
      ),
      exercise(
        "error",
        "workshop-error-prefix",
        "Vorgegebenen Einheitenfehler korrigieren",
      ),
      exercise(
        "transfer",
        "calc-mass-flow",
        "Nach einer anderen Zielgröße auflösen",
        true,
      ),
    ],
  },
  {
    id: "mission-electric-v08",
    revision: 1,
    title: "Elektrische Leistungsarten unterscheiden",
    domainId: "elektro",
    level: "meister",
    length: "deep",
    minutes: "25–45 Minuten",
    goals: [
      "W, VA und var im passenden Sinusmodell unterscheiden.",
      "Leitergrößen im symmetrischen Drehstrommodell anwenden.",
    ],
    prerequisiteIds: ["competency-power-factor", "competency-three-phase"],
    sourceIds: ["openstax-ac-v06"],
    competencyIds: ["competency-power-factor", "competency-three-phase"],
    steps: [
      read("intro", "Leistungsarten und Grenzen", "electric-ac-power"),
      exercise(
        "apparent",
        "ac-s-a",
        "Scheinleistung selbstständig berechnen",
        true,
      ),
      exercise("real", "ac-p-a", "Wirkleistung selbstständig berechnen", true),
      exercise(
        "error",
        "workshop-error-factor",
        "Eine zu weitgehende Sinusannahme erkennen",
      ),
      exercise(
        "transfer",
        "ac-three-a",
        "Leitergrößen im Drehstromfall anwenden",
        true,
      ),
      {
        id: "self",
        kind: "selfcheck",
        title: "Eigene Fachbegründung prüfen",
        prompt:
          "Welche Angaben wären bei unsymmetrischen oder stark verzerrten Signalen zusätzlich nötig? Die einfache Sinusformel ist dann nicht pauschal ausreichend.",
      },
    ],
  },
];
export function stepStatus(p: AcademyProgress, m: Fachmission, s: MissionStep) {
  if (s.kind === "read") {
    const module = modules.find((x) => x.id === s.moduleId);
    return !!(
      module &&
      p.read[module.id]?.revision === module.revision &&
      p.read[module.id].levels.length
    );
  }
  if (s.kind === "example" || s.kind === "selfcheck")
    return !!(
      p.mastery?.mission?.id === m.id &&
      p.mastery.mission.revision === m.revision &&
      p.mastery.mission.seen?.includes(s.id)
    );
  const i = learningItems.find((i) => i.id === s.itemId),
    e = i && p.performance[i.id];
  return !!(
    i &&
    e?.itemRevision === i.revision &&
    e.correctCount > 0 &&
    (!s.independent || independentItem(p, i.id))
  );
}
export function missionStatus(p: AcademyProgress, m: Fachmission) {
  const done = m.steps.filter((s) => stepStatus(p, m, s));
  const graded = m.steps.filter((s) => s.kind === "practice");
  const objective = graded.every((s) => stepStatus(p, m, s));
  return {
    done: done.length,
    total: m.steps.length,
    complete: objective && graded.length >= 2,
    allSteps: done.length === m.steps.length,
    independentRequired: graded.filter((s) => s.independent).length,
    criteria:
      "Der Abschluss verlangt die angegebenen verschiedenen aktuellen Aufgaben und die ausdrücklich unabhängigen Versuche. Gelesene Inhalte und Selbstprüfungen ergänzen den Lernweg; sie allein verleihen keinen Abschluss oder objektiven Freitextnachweis.",
  };
}
missions.push({
  id: "mission-units-v08",
  revision: 1,
  title: "SI-Einheiten gezielt anwenden",
  domainId: "mathematik",
  level: "grundlagen",
  length: "short",
  minutes: "5–10 Minuten",
  goals: [
    "Vorsilben, Zeitfaktoren und quadrierte Einheiten getrennt anwenden.",
  ],
  prerequisiteIds: ["competency-si-units"],
  sourceIds: ["openstax-prealgebra-v05"],
  competencyIds: ["competency-si-units"],
  steps: [
    read("intro", "Einheiten auffrischen", "math-units"),
    exercise("power", "workshop-conversion-power", "Leistung umrechnen", true),
    exercise("flow", "workshop-conversion-flow", "Zeitfaktor prüfen", true),
    exercise(
      "area",
      "workshop-conversion-area",
      "Flächenfaktor anwenden",
      true,
    ),
  ],
});
export function recommendedMission(p: AcademyProgress) {
  const current = missions.find(
    (m) =>
      m.id === p.mastery?.mission?.id &&
      m.revision === p.mastery.mission.revision,
  );
  if (current && !missionStatus(p, current).complete)
    return {
      mission: current,
      reason:
        "Deine zuletzt gewählte Mission ist noch offen; die Schrittposition ist gespeichert.",
    };
  const unitWrong = learningItems.some(
    (i) =>
      i.topicId === "math-units" &&
      p.performance[i.id]?.itemRevision === i.revision &&
      p.performance[i.id].lastCorrect === false,
  );
  if (unitWrong)
    return {
      mission: missions.find((m) => m.id === "mission-units-v08")!,
      reason:
        "Mindestens eine letzte bewertete Einheitenantwort war falsch. Die kurze Einheitenmission passt dazu.",
    };
  const available = missions.filter(
    (m) =>
      !missionStatus(p, m).complete &&
      parseInt(m.minutes) <= (p.mastery?.minutes ?? 25) &&
      (!p.mastery?.preferredLevel ||
        p.mastery.preferredLevel === "all" ||
        m.level === p.mastery.preferredLevel),
  );
  return {
    mission: available[0] ?? missions[0],
    reason: available.length
      ? "Passt zu deiner Zeitorientierung und gewünschten Schwierigkeit; unbekannte Grundlagen sind keine diagnostizierte Schwäche."
      : "Freiwillige Auffrischung; du kannst jede andere Mission ohne Sperre wählen.",
  };
}
export function interleavedTasks(p: AcademyProgress, m: Fachmission) {
  const foundationItems = learningItems.filter((i) =>
    i.requiredCompetencyIds?.some((id) => m.prerequisiteIds.includes(id)),
  );
  if (
    foundationItems.filter(
      (i) =>
        p.performance[i.id]?.itemRevision === i.revision &&
        p.performance[i.id].lastCorrect,
    ).length < 2
  )
    return [];
  return (
    m.domainId === "elektro"
      ? ["workshop-conversion-power", "ac-p-a", "ac-s-a"]
      : m.id === "mission-units-v08"
        ? [
            "workshop-conversion-area",
            "workshop-conversion-flow",
            "workshop-conversion-power",
          ]
        : ["calc-heat-water", "workshop-conversion-flow", "refrig-basis-q0-v08"]
  ).filter((id) => learningItems.some((i) => i.id === id));
}

export function newlyCompletedMissions(p: AcademyProgress) {
  const baseline = p.mastery?.session?.baseline;
  if (!baseline) return [];
  return missions
    .filter(
      (m) =>
        missionStatus(p, m).complete &&
        !m.steps
          .filter((s) => s.kind === "practice")
          .every((s) => {
            const i = learningItems.find((i) => i.id === s.itemId);
            const e = i && baseline[i.id];
            return !!(
              i &&
              e?.revision === i.revision &&
              e.correct > 0 &&
              (!s.independent || e.independent > 0)
            );
          }),
    )
    .map((m) => m.id);
}
