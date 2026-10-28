import { workshopQuestions } from "../../workshop/data";
import { trainerQuestions } from "../foundations/trainer-data";
import { academyQuestions, modules } from "../catalog";
import type { ChoiceTask, LearningItem } from "./model";
import { numericTasks } from "./data";
export const electricalQuestions: ChoiceTask[] = [
  {
    id: "electric-q-dc",
    revision: 1,
    kind: "choice",
    topicId: "electric-power-topic",
    domainId: "elektro",
    level: "grundlagen",
    title: "Gleichstromleistung",
    prompt:
      "Welche Beziehung gilt im betrachteten stationären Gleichstromfall?",
    article: { kind: "note", id: "electric-power-note" },
    formulaId: "dc-electric-power",
    options: [
      { id: "electric-q-dc-ui", text: "P = U × I" },
      { id: "electric-q-dc-u-i", text: "P = U / I" },
      { id: "electric-q-dc-i-u", text: "P = I / U" },
    ],
    correctOptionId: "electric-q-dc-ui",
    explanation:
      "Volt × Ampere ergibt Watt. Spannung geteilt durch Strom ergibt Widerstand, keine Leistung. Für Wechsel-/Drehstrom gelten zusätzliche Voraussetzungen.",
  },
  {
    id: "electric-q-units",
    revision: 1,
    kind: "choice",
    topicId: "electric-power-topic",
    domainId: "elektro",
    level: "grundlagen",
    title: "Leistung und Energie",
    prompt: "Welche Größe beschreibt kW?",
    article: { kind: "note", id: "electric-power-note" },
    options: [
      { id: "electric-q-units-power", text: "Leistung" },
      { id: "electric-q-units-energy", text: "Energie" },
      { id: "electric-q-units-current", text: "Stromstärke" },
    ],
    correctOptionId: "electric-q-units-power",
    explanation:
      "kW ist eine Leistung. kWh ist eine Energiemenge. Die Leistung muss über eine Zeitdauer betrachtet werden, um eine Energie zu erhalten.",
  },
];
export const choiceTasks: ChoiceTask[] = [
  ...academyQuestions.map((question) => ({
    id: question.id,
    revision: question.revision,
    kind: "choice" as const,
    topicId: question.moduleId,
    domainId: modules.find((module) => module.id === question.moduleId)!
      .domainId,
    level: question.level,
    title: question.prompt,
    prompt: question.prompt,
    article: { kind: "module" as const, id: question.moduleId },
    options: question.options,
    correctOptionId: question.correctOptionId,
    explanation: question.explanation,
  })),
  ...electricalQuestions,
  ...trainerQuestions,
  ...workshopQuestions,
];
export const learningItems: LearningItem[] = [...choiceTasks, ...numericTasks];
export const learningTopics = [
  ...modules.map((module) => ({
    id: module.id,
    title: module.title,
    domainId: module.domainId,
    moduleId: module.id,
  })),
  {
    id: "electric-power-topic",
    title: "Elektrische Gleichstromleistung",
    domainId: "elektro",
    moduleId: null,
  },
];
