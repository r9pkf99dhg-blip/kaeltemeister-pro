import { labFormulas } from "../../lab/formulas";
import { workshopFormula } from "../../workshop/data";
import type { ClaimEvidence } from "../../quality/evidence";
import { math_formulas } from "./math-formulas";
import { electrical_formulas } from "./electrical-formulas";
import { thermal_formulas } from "./thermal-formulas";
import { math_lessons } from "./math-lessons";
import { electrical_lessons } from "./electrical-lessons";
import { thermal_lessons } from "./thermal-lessons";
import { math_tasks } from "./math-tasks";
import { electrical_tasks } from "./electrical-tasks";
import { thermal_tasks } from "./thermal-tasks";
const lessons = [...math_lessons, ...electrical_lessons, ...thermal_lessons];
// Konkreter Abgleich nur für die angegebenen Beziehungen. Herleitungen sind ausdrücklich eigene.
const sections: Record<string, [string, boolean]> = {
  "geo-circle": [
    "Eigene Sektor-/Flächenableitung in math-geometry; Flächen- und Maßstabsregeln. Direkter externer Einzelabgleich noch offen.",
    false,
  ],
  "geo-annulus": [
    "Eigene Differenz zweier Kreisflächen; externer Einzelabgleich offen.",
    false,
  ],
  "geo-volume": [
    "Eigene Extrusion konstanter Kreisfläche; externer Einzelabgleich offen.",
    false,
  ],
  "geo-surface": [
    "Eigene Abwicklung des Zylindermantels; externer Einzelabgleich offen.",
    false,
  ],
  "geo-pythagoras": [
    "m51284 Right Triangle Trigonometry: rechtwinklige Seitenbeziehungen; eigener Flächenbeweis.",
    true,
  ],
  "geo-trig": [
    "m51284 Right Triangle Trigonometry: Sinus/Kosinus/Tangens als Seitenverhältnisse.",
    true,
  ],
  "geo-slope": [
    "m51284: Tangens als Höhen-/Grundseitenverhältnis; eigene Übertragung auf Prozentsteigung.",
    true,
  ],
  "algebra-domain": [
    "Eigene geprüfte Bruchgleichung und Originalprobe; Grundlagen in math-equations. Externer Einzelabgleich des Beispiels offen.",
    false,
  ],
  "algebra-system": [
    "Eigene Elimination aus zwei linearen Gleichungen; m49326 allgemeine Modellbildung. Kein behaupteter direkter Beleg für genau diesen Fall.",
    false,
  ],
  "algebra-quadratic": [
    "m51256 Quadratic Equations: Faktorisieren, quadratische Ergänzung, Lösungsformel.",
    true,
  ],
  "algebra-interpolation": [
    "Eigene Geradenableitung aus relativer Lage zwischen zwei Punkten; m49326 lineare Modelle. Näherung für echte Kennlinien.",
    false,
  ],
  "algebra-log": [
    "m49363 Logarithmic Functions: Umkehrung der Exponentialfunktion und Definitionsbereich.",
    true,
  ],
  "ac-period": [
    "m58485 Simple AC Circuits: sinusförmige Zeitfunktionen und Kreisfrequenz.",
    true,
  ],
  "ac-rms": [
    "m58490 Power in an AC Circuit: Effektivwerte aus quadratischem Zeitmittel.",
    true,
  ],
  "ac-reactance-l": [
    "m58485: idealer induktiver Wechselstromzweig; m58748 Selbstinduktivität.",
    true,
  ],
  "ac-reactance-c": [
    "m58485: idealer kapazitiver Wechselstromzweig; m58448 Kapazität.",
    true,
  ],
  "ac-impedance": [
    "m58658 RLC Series Circuits with AC: Zeigersumme und Impedanzbetrag.",
    true,
  ],
  "ac-apparent": [
    "Eigene Bezeichnung S=Ueff Ieff auf Grundlage der Effektivwerte in m58490. Terminologischer Fachabgleich offen.",
    false,
  ],
  "ac-real": [
    "m58490 Power in an AC Circuit: Zeitmittel P=Ueff Ieff cos φ.",
    true,
  ],
  "ac-reactive": [
    "Eigene Definition Q=S sin φ und Leistungsdreieck im Sinusmodell; Vorzeichen induktiv positiv. Vollständiger terminologischer Quellenabgleich offen.",
    false,
  ],
  "ac-factor": [
    "m58490: cos φ als Faktor zwischen Scheinprodukt und Wirkleistung für Sinusgrößen. Erweiterung λ-Begriff mit Modellgrenze gekennzeichnet.",
    true,
  ],
  "ac-star": [
    "Eigene 120°-Zeigerdifferenz auf Grundlage m58485 und Trigonometrie m51284. Keine behauptete Drehstromfundstelle im Buch.",
    false,
  ],
  "ac-delta": [
    "Eigene Stromzeigerdifferenz bei 120°, gleiche Modellgrundlagen. Direkter externer Dreiphasenabgleich offen.",
    false,
  ],
  "ac-three-power": [
    "Eigene Summe dreier gleicher Strangleistungen mit Stern-/Dreiecksubstitution; m58490 belegt einphasige Grundlage.",
    false,
  ],
  "thermo-pressure-abs": [
    "Definition des Druckbezugs und eigene Additionsrechnung. Direkter aktueller Quellenabgleich offen.",
    false,
  ],
  "thermo-specific-volume": [
    "Eigener Kehrwert der Dichtedefinition; m42187 Dichte (bereits 0.5 eingesehen).",
    true,
  ],
  "thermo-mass-volume": [
    "Eigene stationäre Mengenbilanz aus lokaler Dichte; kein direkter Quellenbeleg für die konkrete Messanordnung.",
    false,
  ],
  "thermo-latent": [
    "m42225 Phase Change and Latent Heat: Q=mL unter definierten Übergangsbedingungen.",
    true,
  ],
  "thermo-conduction": [
    "m42228 Conduction: Q/t=kA(T2−T1)/d für die ebene stationäre Schicht.",
    true,
  ],
  "thermo-resistance": [
    "Eigene Umstellung der in m42228 belegten ebenen Wärmeleitung.",
    true,
  ],
  "thermo-layers": [
    "Eigene Summe gleicher stationärer Wärmeströme / Temperaturabfälle, aus m42228. Direkter Schichtmodellabgleich offen.",
    false,
  ],
  "thermo-u": [
    "Eigene Reihenschaltung mit vorgegebenen Übergangskoeffizienten; kein eingesehener normativer U-Wert-Nachweis.",
    false,
  ],
  "thermo-first-law": [
    "m42232 The First Law of Thermodynamics: ΔEint=Q−W mit Q hinein und W vom System.",
    true,
  ],
  "thermo-enthalpy": [
    "Definition h=u+pv und eigene stationäre Bilanz; externer gezielter Enthalpie-/offenes-System-Abgleich offen.",
    false,
  ],
  "thermo-cycle": [
    "Eigene Bilanz des idealisierten Fluidkreislaufs; geschlossene Energieerhaltungsgrundlage in m42232. Vollständiger kältetechnischer Abgleich offen.",
    false,
  ],
};
export const deepClaims: ClaimEvidence[] = [
  ...[...labFormulas, workshopFormula].map((f) => ({
    id: `claim-${f.id}`,
    domainId:
      f.id === "unit-conversion-affine"
        ? "mathematik"
        : f.id === "lab-heat-cp"
          ? "thermodynamik"
          : f.id === "lab-cylinder-total"
            ? "mathematik"
            : "elektro",
    moduleIds: [
      f.id === "unit-conversion-affine"
        ? "math-units"
        : f.id === "lab-heat-cp"
          ? "thermo-calorimetry"
          : f.id === "lab-cylinder-total"
            ? "math-pipe-volume"
            : f.id === "lab-capacitive-q"
              ? "electric-ac-power"
              : "electric-work",
    ],
    formulaIds: [f.id],
    statement: `${f.title}: ${f.expression}`,
    kind: "model" as const,
    sourceId: f.sourceIds[0],
    section:
      "Eigene mathematische Umstellung, Kombination oder Vorzeichenkonvention auf Basis der zugeordneten Grundbeziehungen. Kein behaupteter neuer direkter Kapitelabgleich. Feste unabhängige Zahlenreferenzen in src/lab/validation.test.ts und src/technical/calculations.test.ts.",
    checkedAt: "2026-10-28",
    assumptions: f.assumptions,
    limitations:
      "Unabhängiger Rechentest ist keine menschliche Fachfreigabe. Quellenzuordnung unterstützt Grundbeziehungen, nicht automatisch diese gesamte Ableitung oder die reale Anwendbarkeit. SI-Primärquellenabgleich aktuell teilweise blockiert.",
    checks: ["calculated", "humanRequired"] as ClaimEvidence["checks"],
    humanReview: null,
  })),

  ...[...math_formulas, ...electrical_formulas, ...thermal_formulas].map(
    (f) => {
      const owners = lessons.filter((l) => l.formulaIds.includes(f.id));
      const [section, sourced] = sections[f.id];
      return {
        id: `claim-${f.id}`,
        domainId: owners[0].domainId,
        moduleIds: owners.map((l) => l.id),
        formulaIds: [f.id],
        statement: `${f.title}: ${f.expression}`,
        kind:
          f.id === "algebra-interpolation"
            ? ("approximation" as const)
            : ("model" as const),
        sourceId:
          f.id === "thermo-specific-volume"
            ? "openstax-physics-v05"
            : f.sourceIds[0],
        section,
        checkedAt: "2026-10-28",
        assumptions: f.assumptions,
        limitations:
          "Belegt ist nur der ausdrücklich genannte Umfang. Eigene Herleitungen und technische Übertragung sind keine unabhängige Fachfreigabe. Keine realen Stoff-/Herstellerdaten oder Normanforderung.",
        checks: [
          "researched",
          ...(sourced ? ["sourced" as const] : []),
          "calculated",
          "humanRequired",
        ] as ClaimEvidence["checks"],
        humanReview: null,
      };
    },
  ),
  ...[...math_tasks, ...electrical_tasks, ...thermal_tasks].map((t) => ({
    id: `claim-${t.id}`,
    domainId: t.domainId,
    moduleIds: [t.topicId],
    formulaIds: t.formulaId ? [t.formulaId] : [],
    statement: `Zahlenbeispiel: ${t.title}. ${t.steps.join(" ")}`,
    kind: "model" as const,
    sourceId: t.sourceIds[0],
    section:
      "Eigener Zahlenfall; unabhängiger fester SI-Sollwert in src/technical/calculations.test.ts, zusätzliche Modellkontrollen in deep.test.ts. Quelle unterstützt die Grundbeziehung im verknüpften Formelbeleg, nicht die Realität der Beispielwerte.",
    checkedAt: "2026-10-28",
    assumptions: t.assumptions,
    limitations:
      "Rechentest belegt arithmetische Konsistenz und Bewertungslogik, keine unabhängige menschliche Prüfung oder reale Messung.",
    checks: ["calculated", "humanRequired"] as ClaimEvidence["checks"],
    humanReview: null,
  })),
  {
    id: "claim-temperature-reference-v06",
    domainId: "thermodynamik",
    moduleIds: ["thermo-states"],
    formulaIds: [],
    statement:
      "Absolute Celsius-/Kelvintemperatur erfordert einen Offset; derselbe Offset fällt bei Temperaturdifferenzen weg.",
    kind: "law",
    sourceId: "bipm-si-v06",
    section:
      "SI Brochure zur gezielten aktuellen Primärquellenprüfung vorgesehen; Zugriff gesperrt.",
    checkedAt: "2026-10-28",
    assumptions:
      "Temperaturskalen und positive absolute Temperatur, keine Offsetkorrektur für Differenzen.",
    limitations:
      "Primärquellenabgleich offen, nur Umrechnungstests im vorhandenen Rechenkern. Keine normative Freigabe.",
    checks: ["draft", "calculated", "humanRequired"],
    humanReview: null,
  },
];
