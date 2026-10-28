import { simpleCores } from "../language/core";
import { simpleArticles } from "../language/articles";
import { simpleTerms } from "../language/terms";
import { calculators } from "../lab/catalog";
import { workshopQuestions } from "../workshop/data";
import { deepClaims } from "../academy/deep/claims";
import { evidenceStatusNames } from "./evidence";
import { trainerQuestions } from "../academy/foundations/trainer-data";
import { articles, questions } from "../content";
import {
  modules,
  academyQuestions,
  flashcards,
  formulas,
  sources,
  terms,
  objectives,
} from "../academy/catalog";
import { numericTasks, learningNotes } from "../academy/exercises/data";
import { electricalQuestions } from "../academy/exercises/items";
import { levels } from "../academy/model";
export const statusNames = {
  draft: "Entwurf",
  automatic: "Automatisch geprüft",
  sourced: "Quellenbasiert geprüft",
  independent: "Unabhängig fachlich geprüft",
  revision: "Überarbeitung erforderlich",
} as const;
export type ReviewStatus = keyof typeof statusNames;
export interface ReviewEntry {
  id: string;
  contentId: string;
  title: string;
  kind: string;
  domain: string;
  status: ReviewStatus;
  scope: string;
  formulaIds: string[];
  sourceIds: string[];
  reference: string;
  assumptions: string;
  risks: string[];
  questions: string[];
  independentReviewer: string | null;
  reviewedAt: string;
}
const entry = (
  contentId: string,
  title: string,
  kind: string,
  domain: string,
  partial: Partial<ReviewEntry> = {},
): ReviewEntry => ({
  id: `${kind}:${contentId}`,
  contentId,
  title,
  kind,
  domain,
  status: "draft",
  scope:
    "Bestandsaufnahme und Strukturprüfung. Keine vollständige fachliche Freigabe.",
  formulaIds: [],
  sourceIds: [],
  reference:
    "Keine eigene numerische Referenz für diesen Inhalt; siehe verknüpfte Aufgaben und Formeln.",
  assumptions:
    "Didaktischer Lerninhalt, keine Anlagenplanung und keine praktische Arbeitsanweisung.",
  risks: [
    "Modellgrenzen können übersehen werden.",
    "Fachliche Aussagen ohne eingesehene Fundstelle bleiben ungeprüft.",
  ],
  questions: [
    "Sind Formulierung, Praxisbezug und alle Randbedingungen fachlich korrekt?",
    "Sind Quellen passend und ausreichend für die gesamte Aussage?",
  ],
  independentReviewer: null,
  reviewedAt: "2026-10-28",
  ...partial,
});
const referencedSource = (ids: string[]) =>
  ids.some((id) => sources.find((s) => s.id === id)?.access === "consulted");
// Nur konkret abgeglichene Beziehungen erhalten den Quellenstatus, nicht jedes Objekt mit Link.
const sourceReviewedFormulaIds = new Set([
  "sensible-heat",
  "sensible-mass-flow",
  "sensible-temperature-difference",
  "dc-electric-power",
  "cooling-cop",
  "heating-cop",
  "electric-current-charge",
  "ohm-current",
  "ohm-voltage",
  "ohm-resistance",
  "electric-energy",
  "series-resistance",
  "parallel-resistance",
  "math-fraction-multiply",
  "math-fraction-divide",
  "math-linear-rule",
  "math-percent-rule",
  "math-heat-energy",
  "physics-pressure",
  "physics-density",
  "physics-force",
  "physics-work",
  "chemistry-atom-count",
  "chemistry-amount-rule",
  "chemistry-reaction-example",
]);
const formulaSourceChecked = (id: string, ids: string[]) =>
  sourceReviewedFormulaIds.has(id) && referencedSource(ids);
/** Explizite Abdeckung; ein Quellenlink allein setzt niemals den Status auf fachlich freigegeben. */
export const reviewRegister: ReviewEntry[] = [
  ...simpleCores.flatMap((c) =>
    levels.map((level) => {
      const module = modules.find((m) => m.id === c.id)!;
      return entry(
        `${c.id}/${level}`,
        `${module.title} · einfach · ${level}`,
        "language-module",
        module.domainId,
        {
          reference: [
            c.introduction,
            c.levels[level],
            c.connections,
            c.summary,
          ].join("\n"),
          formulaIds: module.formulaIds,
          sourceIds: module.sourceIds,
          scope:
            "Eigene sprachliche Ergänzung zur gemeinsamen Fachgrundlage. Struktur, Referenzen und unveränderte gemeinsame Rechenbeispiele getestet; unabhängige sprachliche und fachliche Gesamtprüfung offen.",
        },
      );
    }),
  ),
  ...Object.entries(simpleArticles).map(([id, texts]) =>
    entry(id, `Artikel einfach: ${id}`, "language-article", "kaelte", {
      reference: texts.join("\n"),
    }),
  ),
  ...Object.entries(simpleTerms).map(([title, text]) =>
    entry(title, `${title} einfach`, "language-term", "fachuebergreifend", {
      reference: text,
    }),
  ),
  ...calculators.map((c) =>
    entry(c.id, c.title, "laboratory", c.group, {
      status: "automatic",
      formulaIds: [c.formulaId],
      reference: `Unabhängiger SI-Sollwert je ID: src/lab/validation.test.ts. Eingaben: ${c.inputs.map((f) => `${f.id}=${f.value} ${f.unit}`).join("; ")}.`,
      assumptions: c.limits.technical,
      scope:
        "Eigener eingeschränkter Laborfall, gemeinsamer SI-Kern. Feste unabhängige Zahlenreferenz und Fehlereingaben geprüft; keine reale Auslegungsfreigabe.",
    }),
  ),
  entry("units", "Einheitenumrechner", "laboratory", "fachuebergreifend", {
    status: "automatic",
    formulaIds: ["unit-conversion-affine"],
    reference:
      "Unabhängige Zahlen-/Offset-/Flächen-/Zeitfaktorprüfungen in src/lab/validation.test.ts; alle registrierten Einheiten auf Identität geprüft.",
    assumptions:
      "Gleiche Größenart und gleicher Druckbezug; absolute Temperatur und Differenz getrennt.",
    scope:
      "Umrechnung rechnerisch getestet; aktueller SI-Primärquellenabgleich wegen Zugriffssperre offen.",
  }),

  ...workshopQuestions.map((q) =>
    entry(q.id, q.title, "workshop-question", q.domainId, {
      status: "automatic",
      reference: q.explanation,
      scope:
        "Kuratierte Auswahl/Fehlerkorrektur; Optionen und Bewertungsfunktion geprüft, unabhängige Fachfreigabe offen.",
    }),
  ),
  ...deepClaims.map((c) =>
    entry(c.id, c.statement, "claim", c.domainId, {
      status: c.checks.includes("sourced")
        ? "sourced"
        : c.checks.includes("calculated")
          ? "automatic"
          : "draft",
      scope: `${c.section} Nachweise: ${c.checks.map((s) => evidenceStatusNames[s]).join(", ")}. Menschliche Fachfreigabe offen.`,
      formulaIds: c.formulaIds,
      sourceIds: [c.sourceId],
      reference: c.statement,
      assumptions: c.assumptions,
      risks: [c.limitations],
      reviewedAt: c.checkedAt,
    }),
  ),
  ...articles.map((a) =>
    entry(a.id, a.title, "article", "kaelte", {
      reference: a.sections.map((s) => `${s.title}: ${s.text}`).join("\n"),
      scope:
        "Bestehender Artikel vollständig inventarisiert; externer Aussagenabgleich offen.",
    }),
  ),
  ...questions.map((q, i) =>
    entry(`legacy-question-${i + 1}`, q.question, "legacy-question", "kaelte", {
      reference: q.explanation,
    }),
  ),
  ...modules.flatMap((m) =>
    levels.map((level) =>
      entry(`${m.id}/${level}`, `${m.title} · ${level}`, "module", m.domainId, {
        formulaIds: m.formulaIds,
        sourceIds: m.sourceIds,
        reference: m.levels[level].example,
        assumptions: m.safety ?? m.levels[level].deepening,
        risks: m.levels[level].mistakes,
        scope:
          "Struktur und Referenzen automatisch geprüft; Teilbeziehungen ggf. quellenbasiert. Vollständiger Text einschließlich Praxisbezug ist noch Entwurf zur Fachabnahme.",
      }),
    ),
  ),
  ...formulas.map((f) =>
    entry(f.id, f.title, "formula", "fachuebergreifend", {
      status: formulaSourceChecked(f.id, f.sourceIds) ? "sourced" : "automatic",
      scope: formulaSourceChecked(f.id, f.sourceIds)
        ? "Nur die Grundgleichung und ihre genannten Modellbedingungen wurden mit der angegebenen Fundstelle abgeglichen; keine unabhängige Fachfreigabe."
        : "Rechenbeispiele und Einheiten automatisch geprüft. Externer Aussagenabgleich insbesondere für Messvoraussetzungen offen.",
      formulaIds: [f.id],
      sourceIds: f.sourceIds,
      reference: `${f.expression}; ${f.units}`,
      assumptions: f.assumptions,
    }),
  ),
  ...academyQuestions.map((q) =>
    entry(
      q.id,
      q.prompt,
      "question",
      modules.find((m) => m.id === q.moduleId)!.domainId,
      {
        status: "automatic",
        scope:
          "Optionen, Lösungsreferenz und Erklärung strukturell geprüft; Zahlenfälle durch separate Referenztests. Formulierungs- und Transferprüfung durch Fachperson offen.",
        sourceIds: q.sourceIds,
        reference: q.explanation,
      },
    ),
  ),
  ...flashcards.map((c) =>
    entry(
      c.id,
      c.front,
      "card",
      modules.find((m) => m.id === c.moduleId)!.domainId,
      { sourceIds: c.sourceIds, reference: c.back },
    ),
  ),
  ...numericTasks.map((t) =>
    entry(t.id, t.title, "numeric", t.domainId, {
      status: "automatic",
      scope:
        "Jedes Soll-Ergebnis mit unabhängig festgelegtem Referenzwert, Einheiten und Bewertungstoleranz getestet. Teilformeln quellenbasiert, vollständiger Anwendungsfall noch nicht menschlich freigegeben.",
      formulaIds: t.formulaId ? [t.formulaId] : [],
      sourceIds: t.sourceIds,
      reference: t.steps.join("\n"),
      assumptions: t.assumptions,
      risks: t.mistakes,
    }),
  ),
  ...terms.map((t) =>
    entry(t.id, t.title, "term", "fachuebergreifend", {
      reference: t.definition,
    }),
  ),
  ...objectives.map((o) =>
    entry(o.id, o.text, "objective", "fachuebergreifend"),
  ),
  ...learningNotes.map((n) =>
    entry(n.id, n.title, "note", n.domainId, {
      sourceIds: [...n.sourceIds],
      formulaIds: [...n.formulaIds],
      reference: n.text,
    }),
  ),
  ...trainerQuestions.map((q) =>
    entry(q.id, q.title, "trainer-question", "mathematik", {
      status: "automatic",
      formulaIds: q.formulaId ? [q.formulaId] : [],
      sourceIds: q.formulaId
        ? (formulas.find((f) => f.id === q.formulaId)?.sourceIds ?? [
            "openstax-prealgebra-v05",
          ])
        : ["openstax-prealgebra-v05"],
      reference: q.explanation,
      scope:
        "Umformung, Nullbedingungen und Zahlenproben automatisch geprüft; unabhängige menschliche Abnahme offen.",
    }),
  ),
  ...electricalQuestions.map((q) =>
    entry(q.id, q.prompt, "standalone-question", "elektro", {
      status: "automatic",
      reference: q.explanation,
      formulaIds: q.formulaId ? [q.formulaId] : [],
    }),
  ),
];
export function reviewMarkdown() {
  return (
    "# Fachliches Prüfregister · Version 0.6\n\nStand: 28.10.2026. Keine unabhängige menschliche Fachprüfung erfolgt. Automatische Tests sind keine fachliche Freigabe. Status „quellenbasiert“ gilt ausschließlich für den angegebenen Prüfumfang. Entwurf ist nutzbarer Lerninhalt mit offener Fachabnahme.\n\n" +
    reviewRegister
      .map(
        (e) =>
          `## ${e.id}: ${e.title}\n\n- Fachgebiet: ${e.domain}\n- Status: ${statusNames[e.status]}\n- Prüfumfang: ${e.scope}\n- Formel-IDs: ${e.formulaIds.join(", ") || "—"}\n- Quellen: ${
            e.sourceIds
              .map((id) => {
                const s = sources.find((s) => s.id === id);
                return `${id}: ${s?.url ?? s?.note ?? "keine externe Quelle"}; ${s?.locator ?? "keine externe Fundstelle"}`;
              })
              .join(" | ") ||
            "Keine belastbare externe Fundstelle zugeordnet; Aussagenabgleich offen."
          }\n- Referenz / Rechnung: ${e.reference.replaceAll("\n", " / ")}\n- Annahmen: ${e.assumptions}\n- Mögliche Fehler: ${e.risks.join(" ")}\n- Offene Fragen: ${e.questions.join(" ")}\n- Fachprüfer/in: ____________________\n- Datum / Fundstelle / Freigabeumfang: ____________________\n- Korrekturbedarf / Entscheidung: ____________________\n`,
      )
      .join("\n")
  );
}
