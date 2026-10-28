import { getRefrigerationCase } from "./data";
import type { NumericTask, ChoiceTask } from "../academy/exercises/model";
const specs = [
  [
    "q0",
    "Spezifischer Wärmeeintrag",
    "refrigeration-q0",
    "specific-energy",
    "kJ/kg",
    "refrig-specific-q0",
    "refrig-phase-v08",
  ],
  [
    "qk",
    "Spezifische Wärmeabgabe",
    "refrigeration-qk",
    "specific-energy",
    "kJ/kg",
    "refrig-specific-qk",
    "refrig-cycle-v08",
  ],
  [
    "w",
    "Spezifische Fluidverdichterarbeit",
    "refrigeration-w",
    "specific-energy",
    "kJ/kg",
    "refrig-specific-w",
    "refrig-compression-v08",
  ],
  [
    "cop",
    "Fluidbezogener Kälte-COP",
    "refrigeration-cop",
    "ratio",
    "1",
    "refrig-cycle-cop",
    "refrig-cycle-v08",
  ],
  [
    "power",
    "Modell-Wärmeleistung",
    "refrigeration-q0-power",
    "power",
    "kW",
    "evaporator-power",
    "refrig-cycle-v08",
  ],
] as const;
export const refrigerationTasks: NumericTask[] = [
  "basis",
  "kuehlraum",
  "transfer",
].flatMap((name, i) => {
  const c = getRefrigerationCase(`r134a-${name}-v1`);
  return specs.map(
    ([key, title, calculation, quantity, answerUnit, formulaId, topicId]) => ({
      id: `refrig-${name}-${key}-v08`,
      revision: 1,
      kind: "numeric" as const,
      answerSyntax: "arithmetic" as const,
      topicId,
      domainId: "thermodynamik",
      level:
        i === 0
          ? ("grundlagen" as const)
          : i === 1
            ? ("fachkraft" as const)
            : ("meister" as const),
      title: `${title} · ${c.title}`,
      prompt: `Berechne ${title} für den festgelegten HEOS::R134a-Katalogfall. Alle Enthalpien verwenden IIR. Nur die angegebene stationäre Fluid-Systemgrenze ist gemeint; kein elektrischer Gesamt-COP und keine Anlagenfreigabe.`,
      article: { kind: "module" as const, id: topicId },
      formulaId,
      requiredCompetencyIds: [
        "competency-refrig-state",
        "competency-refrig-cycle",
        "competency-cycle-balance",
        "competency-thermal-states",
        "competency-si-units",
        "competency-fractions",
      ],
      calculation,
      givens: [
        ...c.points.map((p, j) => ({
          id: `h${j + 1}`,
          label: `Spezifische Enthalpie h${j + 1} (IIR)`,
          value: p.h / 1000,
          unit: "kJ/kg",
          quantity: "specific-energy" as const,
        })),
        ...(key === "power"
          ? [
              {
                id: "massFlow",
                label: "Vorgegebener Massenstrom",
                value: 0.05,
                unit: "kg/s",
                quantity: "mass-flow" as const,
              },
            ]
          : []),
      ],
      sought: title,
      quantity,
      answerUnit,
      absoluteToleranceSI: 1e-6,
      relativeTolerance: 0.005,
      sourceIds: ["coolprop-r134a-v08"],
      hint: "Zustandspunkte und gemeinsame Enthalpiereferenz prüfen. Erst die passende Differenz bilden, dann ggf. mit Massenstrom multiplizieren oder durch w teilen.",
      steps: [
        "Gegeben: vier spezifische Enthalpien desselben Stoffes und IIR-Bezugs. Gesucht: die benannte Größe.",
        "h-Werte nötigenfalls von kJ/kg in J/kg umrechnen; h4=h3 und positive Verdichterarbeit kontrollieren.",
        key === "cop"
          ? "q0=h1−h4 und w=h2−h1 bilden, danach COP=q0/w."
          : key === "qk"
            ? "qk=h2−h3; die hochdruckseitige spezifische Wärmeabgabe ist ein positiver Modellbetrag."
            : key === "w"
              ? "w=h2−h1; dies ist spezifische Fluidarbeit."
              : key === "power"
                ? "q0=h1−h4, danach Q̇0=ṁq0."
                : "q0=h1−h4; die gesuchte spezifische Energie trägt J/kg.",
        "Erst das Endergebnis in die Zieleinheit umrechnen; Größenordnung und Modellgrenzen nennen.",
      ],
      mistakes: [
        "kJ/kg und J/kg oder spezifische Energie und Leistung verwechseln.",
        "Enthalpiereferenzen mischen oder Fluid-COP als elektrischen Anlagen-COP ausgeben.",
      ],
      assumptions:
        "Stationärer geschlossener Fluidkreislauf, keine Druckverluste, adiabatischer Verdichter und Drossel, letztere ohne Wellenarbeit; Änderungen von Geschwindigkeit/Höhe vernachlässigt. Reines R134a, IIR. Q̇0 umfasst die ganze Modellstrecke 4→1 und ist nicht automatisch nutzbare Raumkälte.",
      review: "calculation-tested-expert-review-pending" as const,
    }),
  );
});
function choice(
  id: string,
  title: string,
  prompt: string,
  right: string,
  wrong: [string, string],
  explanation: string,
  level: "grundlagen" | "fachkraft" | "meister" = "grundlagen",
): ChoiceTask {
  return {
    id,
    revision: 1,
    kind: "choice",
    topicId: "refrig-cycle-v08",
    domainId: "thermodynamik",
    level,
    title,
    prompt,
    article: { kind: "module", id: "refrig-cycle-v08" },
    requiredCompetencyIds: [
      "competency-refrig-state",
      "competency-refrig-cycle",
      "competency-cycle-balance",
      "competency-thermal-states",
    ],
    options: [
      { id: "wrong-a", text: wrong[0] },
      { id: "right", text: right },
      { id: "wrong-b", text: wrong[1] },
    ],
    correctOptionId: "right",
    explanation,
  };
}
export const refrigerationQuestions: ChoiceTask[] = [
  choice(
    "refrig-component-compressor-v08",
    "Bauteil zuordnen: Verdichter",
    "Welches Bauteil erhöht im Modell den Druck mit zugeführter Fluidarbeit?",
    "Verdichter",
    ["Verdampfer", "Expansionsorgan"],
    "Der Verdichter führt Arbeit zu und erhöht vom Nieder- auf das Hochdruckniveau.",
  ),
  choice(
    "refrig-component-condenser-v08",
    "Bauteil zuordnen: Verflüssiger",
    "Wo wird im stationären Modell hochdruckseitig Wärme abgegeben?",
    "Verflüssiger",
    ["Verdampfer", "Verdichter"],
    "Die Wärmeabgabe 2→3 umfasst im Modell Enthitzung, Kondensation und Unterkühlung.",
  ),
  choice(
    "refrig-component-valve-v08",
    "Bauteil zuordnen: Expansionsorgan",
    "Wo fällt im gewählten Modell der Druck bei h4=h3?",
    "Expansionsorgan",
    ["Verflüssiger", "Verdichter"],
    "Die adiabatische Drossel ohne Wellenarbeit ist bei vernachlässigter Geschwindigkeits-/Höhenänderung isenthalp.",
  ),
  choice(
    "refrig-component-evaporator-v08",
    "Bauteil zuordnen: Verdampfer",
    "Wo erfolgt die niederdruckseitige Wärmeaufnahme?",
    "Verdampfer",
    ["Verflüssiger", "Expansionsorgan"],
    "Die Strecke 4→1 nimmt Wärme auf; die Systemgrenze schließt hier zugeordnete Überhitzung ein.",
  ),
  choice(
    "refrig-diagram-evap-v08",
    "Diagramm-Challenge: Verdampfung",
    "Welche Zustandspunktfolge beschreibt die niederdruckseitige Wärmeaufnahme?",
    "4 → 1",
    ["1 → 2", "2 → 3"],
    "4→1 ist im idealen Modell die isobare niederdruckseitige Wärmeaufnahme.",
  ),
  choice(
    "refrig-diagram-throttle-v08",
    "Diagramm-Challenge: Drosselung",
    "Welche Linie beschreibt die isenthalpe Drossel im log-p-h?",
    "Vertikal von 3 nach 4; h bleibt gleich.",
    ["Waagerecht von 4 nach 1.", "Eine beliebige Kurve mit steigendem h."],
    "Druck fällt auf der logarithmischen Achse, h3=h4 bleibt die horizontale Koordinate.",
  ),
  choice(
    "refrig-diagram-high-v08",
    "Diagramm-Challenge: Hochdruckseite",
    "Welche beiden Hauptzustände liegen auf dem hohen Druckniveau?",
    "2 und 3",
    ["1 und 4", "1 und 3"],
    "Im Modell liegen Verdichteraustritt und Verflüssigeraustritt auf dem hohen gemeinsamen Druckniveau.",
  ),
  choice(
    "refrig-error-reference-v08",
    "Fehleranalyse: Bezugsniveau",
    "Ein Rechenweg zieht einen IIR-h-Wert von einem ASHRAE-h-Wert ab. Wo liegt der eindeutig vorgegebene Fehler?",
    "Unterschiedliche Enthalpiereferenzen werden gemischt.",
    [
      "Enthalpiedifferenzen sind grundsätzlich verboten.",
      "h muss immer in Celsius eingesetzt werden.",
    ],
    "Erst ein gemeinsamer Bezug erlaubt die passende Differenz. Der Fehler ist im vorgegebenen Rechenweg erkennbar; keine Diagnose deines eigenen Denkwegs.",
    "fachkraft",
  ),
  choice(
    "refrig-error-cp-v08",
    "Fehleranalyse: Phasenwechsel",
    "Ein Rechenweg setzt über die gesamte Verdampfung Q=mcpΔT und folgert bei ΔT=0 stets Q=0. Welche Korrektur ist nötig?",
    "Latente Wärme bzw. passende Enthalpiedifferenz berücksichtigen.",
    [
      "Das Ergebnis ist allgemein richtig.",
      "Nur von Kelvin auf Celsius wechseln.",
    ],
    "Ein Phasenwechsel kann bei konstanter Sättigungstemperatur Wärme aufnehmen; cpΔT allein genügt nicht.",
    "fachkraft",
  ),
  choice(
    "refrig-transfer-electric-v08",
    "Transfer: Fluid und Gesamtanlage",
    "Darf der hier berechnete q0/w-Wert ohne weitere Angaben als elektrischer Anlagen-COP gelten?",
    "Nein; Motor und Nebenaggregate/Systemgrenze fehlen.",
    [
      "Ja, beide Werte sind immer gleich.",
      "Ja, weil ηis ein elektrischer Wirkungsgrad ist.",
    ],
    "Die Fluidbilanz bestimmt nicht automatisch den elektrischen Gesamtbedarf. Zusätzliche reale Beiträge müssen separat bilanziert werden.",
    "meister",
  ),
];
for (const [increase, id] of [
  [true, "increase"],
  [false, "decrease"],
] as const) {
  const q = choice(
    `refrig-predict-${id}-v08`,
    "Ergebnis vorhersagen: Massenstrom",
    `Bei unveränderten Zuständen ${increase ? "steigt" : "sinkt"} der positive Massenstrom. Wie ändert sich Q̇0?`,
    increase
      ? "Die Modell-Wärmeleistung steigt."
      : "Die Modell-Wärmeleistung sinkt.",
    ["Sie bleibt gleich.", "Sie ändert sich in die entgegengesetzte Richtung."],
    "Q̇0=ṁq0: Bei festen Zuständen bleibt q0 konstant. Die Leistung ändert sich proportional; der fluidbezogene COP bleibt gleich.",
  );
  refrigerationQuestions.push(q);
}
refrigerationQuestions.push(
  choice(
    "refrig-compare-v08",
    "Prozessvergleich: höhere Verflüssigungstemperatur",
    "Vergleiche nur die Katalogfälle Basis (−10/35 °C) und höheres Verflüssigungsniveau (−10/45 °C). Verdampfungsniveau, Überhitzung, Unterkühlung und ηis sind gleich. Welche Beobachtung stimmt in diesen Fällen?",
    "Der fluidbezogene COP sinkt; q0 wird kleiner und w größer.",
    [
      "Der COP steigt unabhängig von den übrigen Bedingungen.",
      "Die elektrische Gesamtleistung ist damit vollständig bestimmt.",
    ],
    "Nur die genannten Katalogfälle sind gemeint: q0 etwa 152,308→137,541 kJ/kg, w etwa 31,735→37,594 kJ/kg. Das folgt aus ihren berechneten Zuständen, nicht aus einer pauschalen Aussage für beliebige Anlagen.",
    "meister",
  ),
);
const parts = ["comp", "cond", "valve", "evap"];
const names: Record<string, string> = {
  comp: "Verdichter",
  cond: "Verflüssiger",
  valve: "Expansionsorgan",
  evap: "Verdampfer",
};
function permutations(a: string[]): string[][] {
  return a.length
    ? a.flatMap((v, i) =>
        permutations(a.filter((_, j) => i !== j)).map((rest) => [v, ...rest]),
      )
    : [[]];
}
export const processOrderNames = names;
refrigerationQuestions.push({
  id: "refrig-order-v08",
  revision: 1,
  kind: "choice",
  topicId: "refrig-cycle-v08",
  domainId: "thermodynamik",
  level: "fachkraft",
  title: "Prozessreihenfolge ab Zustand 1",
  prompt:
    "Beginne am Verdichtereintritt (Zustand 1) und folge der Kältemittelrichtung. Ordne die vier Hauptkomponenten.",
  article: { kind: "module", id: "refrig-cycle-v08" },
  requiredCompetencyIds: [
    "competency-refrig-state",
    "competency-refrig-cycle",
    "competency-cycle-balance",
  ],
  options: permutations(parts).map((p) => ({
    id: p.join("|"),
    text: p.map((id) => names[id]).join(" → "),
  })),
  correctOptionId: parts.join("|"),
  explanation:
    "Vom Verdichtereintritt folgen Verdichter, Verflüssiger, Expansionsorgan und Verdampfer. Danach ist wieder Zustand 1 erreicht. Die Anfangsposition ist ausdrücklich festgelegt.",
});
