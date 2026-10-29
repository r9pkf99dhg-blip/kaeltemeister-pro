import { useState } from "react";
import { referenceBackend } from "./backend";
import { refrigerationCases } from "./data";
import { caseBalance, caseEnthalpies } from "./balance";
import { calculateRefrigeration } from "../technical/refrigeration";
import { parseDecimal } from "../logic";
import { Explain } from "../language/Explanation";
import PHDiagram from "./PHDiagram";
import type { CycleDraft } from "./draft";
import type { CyclePageProps } from "./CyclePage";
import Workshop from "../workshop/Workshop";
const number = (v: number, digits = 3) =>
  v.toLocaleString("de-DE", { maximumFractionDigits: digits });
export default function ReferencePanel({
  d,
  update,
  progress,
  setProgress,
  openModule,
  openMissions,
  practice,
}: CyclePageProps & {
  d: CycleDraft;
  update: (patch: Partial<CycleDraft>) => void;
}) {
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [prediction, setPrediction] = useState(""),
    [feedback, setFeedback] = useState(""),
    [exercise, setExercise] = useState("refrig-diagram-high-v08");
  const result = referenceBackend.case(d.caseId);
  if (!result.ok)
    return (
      <section className="academy-panel">
        <p role="alert">
          {result.message} Die qualitative Ansicht bleibt verfügbar.
        </p>
        <button
          className="button secondary"
          onClick={() => update({ caseId: refrigerationCases[0].id })}
        >
          Basisfall wählen
        </button>
      </section>
    );
  const c = result.value,
    b = caseBalance(c),
    mass = d.appliedMassFlow ?? 0.05;
  let nextMass: number | null = null;
  try {
    const n = parseDecimal(d.massFlow);
    if (n >= 0 && n <= 1) nextMass = n;
  } catch {
    /* Invalid input remains visible; calculations keep the last confirmed value. */
  }
  const changed = nextMass !== null && nextMass !== mass;
  const apply = (assess: boolean) => {
    if (nextMass === null) return;
    const correct = nextMass > mass ? "up" : nextMass < mass ? "down" : "same";
    if (assess && !prediction) {
      setFeedback(
        "Bitte zuerst eine Vorhersage wählen oder die Änderung ohne Bewertung übernehmen.",
      );
      return;
    }
    setFeedback(
      assess
        ? prediction === correct
          ? "Die Vorhersage passt: Leistungen ändern sich proportional zum Massenstrom; spezifische Energien und die formale Fluid-COP bleiben gleich."
          : "Die Vorhersage passt noch nicht: Bei unveränderten vier Zuständen ändern sich nur die Leistungen proportional zum Massenstrom. q₀, w, qₖ und die formale Fluid-COP bleiben gleich."
        : "Massenstrom übernommen. Diese freie Erkundung wird nicht als selbstständige Aufgabenleistung gewertet.",
    );
    update({ appliedMassFlow: nextMass });
    setPrediction("");
  };
  return (
    <section
      className="academy-panel"
      aria-label="Quantitatives Referenzmodell"
    >
      <h2>Modell B · Berechnete Referenzfälle</h2>
      <p>
        Reines R134a · HEOS / CoolProp 7.2.0 · IIR-Bezug. Jeder Fall ist
        vollständig vorab berechnet; es werden keine frei kombinierten
        Temperaturen simuliert.
      </p>
      <label className="field">
        Betriebsfall auswählen
        <select
          aria-label="Betriebsfall auswählen"
          value={d.caseId}
          onChange={(e) => {
            update({ caseId: e.target.value });
            setFeedback("");
          }}
        >
          {refrigerationCases.map((x) => (
            <option key={x.id} value={x.id}>
              {x.title}
            </option>
          ))}
        </select>
      </label>
      <p>
        Verdampfung: {number(c.evaporationC)} °C · Verflüssigung:{" "}
        {number(c.condensationC)} °C · Überhitzung: {number(c.superheatK)} K ·
        Unterkühlung: {number(c.subcoolingK)} K · η_is = {number(c.etaIs)}.
      </p>
      <Explain
        simple="Die Zahlen gelten nur für diesen ausgewählten Fall. Wechselst du den Fall, ändern sich die hinterlegten Stoffwerte wirklich. Das sind Modellwerte, keine Messwerte einer Anlage."
        technical="Stationärer Kreisprozess ohne Druckverluste, adiabater Verdichter, isenthalpe Drossel, vernachlässigte kinetische und potenzielle Energie. η_is = (h₂s − h₁)/(h₂ − h₁); Zustand 2s folgt aus p₂ und s₁. Bei η_is = 1 ist die Fluidverdichtung ideal-isentrop, sonst nur ein definierter Endpunktvergleich."
      />
      <PHDiagram c={c} d={d} update={update} />
      <h3>Zustandswerte als Textalternative</h3>
      <p>
        Alle Drücke sind absolut. Intern: Pa, K und J/kg. Anzeige: bar = Pa /
        100000, °C = K − 273,15, kJ/kg = J/kg / 1000. „Nicht definiert“ beim
        Dampfgehalt ist kein Wert von null.
      </p>
      <div className="table-scroll">
        <table>
          <caption>Vier Zustände · {c.title}</caption>
          <thead>
            <tr>
              <th scope="col">Zustand</th>
              <th scope="col">p [bar abs.]</th>
              <th scope="col">T [°C]</th>
              <th scope="col">h [kJ/kg]</th>
              <th scope="col">Phase / x</th>
            </tr>
          </thead>
          <tbody>
            {c.points.map((p, i) => (
              <tr key={i} aria-selected={d.point === i + 1}>
                <th scope="row">
                  <button
                    className="text-button"
                    onClick={() => update({ point: i + 1, component: i })}
                  >
                    Punkt {i + 1}
                  </button>
                </th>
                <td>{number(p.p / 1e5, 4)}</td>
                <td>{number(p.T - 273.15, 2)}</td>
                <td>{number(p.h / 1000, 5)}</td>
                <td>
                  {i === 2
                    ? "Unterkühlte Flüssigkeit; x nicht definiert"
                    : p.quality === null
                      ? "Überhitzter Dampf; x nicht definiert"
                      : `Nassdampf; x = ${number(p.quality, 4)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section aria-label="Nachvollziehbare Kreisprozessbilanz">
        <h3>Enthalpiedifferenzen und Fluid-Leistungszahl</h3>
        <p>
          q₀ = h₁ − h₄ = {number(c.points[0].h / 1000, 5)} −{" "}
          {number(c.points[3].h / 1000, 5)} ={" "}
          <strong>{number(b.q0 / 1000, 5)} kJ/kg</strong>
        </p>
        <p>
          w = h₂ − h₁ = {number(c.points[1].h / 1000, 5)} −{" "}
          {number(c.points[0].h / 1000, 5)} ={" "}
          <strong>{number(b.w / 1000, 5)} kJ/kg</strong>
        </p>
        <p>
          qₖ = h₂ − h₃ = {number(c.points[1].h / 1000, 5)} −{" "}
          {number(c.points[2].h / 1000, 5)} ={" "}
          <strong>{number(b.qk / 1000, 5)} kJ/kg</strong>
        </p>
        <p>
          h₄ = h₃ (idealisierte Drossel). qₖ = q₀ + w ={" "}
          {number((b.q0 + b.w) / 1000, 5)} kJ/kg.
        </p>
        <p>
          <strong>Fluid-COP = q₀ / w = {number(b.cop, 5)}</strong>{" "}
          (dimensionslos). Keine elektrische Anlagen-COP: Motor-, Umrichter- und
          Hilfsantriebsleistungen fehlen.
        </p>
        <label className="field">
          Massenstrom ṁ [kg/s]
          <input
            inputMode="decimal"
            maxLength={40}
            value={d.massFlow}
            onChange={(e) => {
              update({ massFlow: e.target.value });
              setFeedback("");
            }}
            aria-invalid={nextMass === null}
          />
        </label>
        <p>
          Erkundungsbereich: 0–1 kg/s, keine allgemeine Auslegungsgrenze.
          Aktuell bestätigt: {number(mass)} kg/s.
        </p>
        {nextMass === null && (
          <p role="alert">
            Bitte eine endliche Zahl zwischen 0 und 1 kg/s eingeben. Die letzte
            bestätigte Bilanz bleibt erhalten.
          </p>
        )}
        {changed && (
          <fieldset>
            <legend>
              Zuerst vermuten: Was ändert sich bei gleichen vier Zuständen?
            </legend>
            <label>
              Vorhersage
              <select
                aria-label="Vorhersage"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
              >
                <option value="">Bitte wählen</option>
                <option value="up">
                  Alle drei Leistungen steigen; Fluid-COP bleibt gleich
                </option>
                <option value="down">
                  Alle drei Leistungen sinken; Fluid-COP bleibt gleich
                </option>
                <option value="same">
                  Leistungen und Fluid-COP bleiben gleich
                </option>
              </select>
            </label>
            <div className="button-row">
              <button className="button primary" onClick={() => apply(true)}>
                Vorhersage prüfen und übernehmen
              </button>
              <button className="button secondary" onClick={() => apply(false)}>
                Änderung ohne Bewertung übernehmen
              </button>
            </div>
            <p>
              Freie Erkundung ohne Kompetenzbewertung. Unabhängige Aufgaben
              findest du weiter unten.
            </p>
          </fieldset>
        )}
        {feedback && <p role="status">{feedback}</p>}
        <ul>
          {(["q0", "w", "qk"] as const).map((key, i) => {
            const power = calculateRefrigeration(`refrigeration-${key}-power`, {
              ...caseEnthalpies(c),
              massFlow: mass,
            });
            return (
              <li key={key}>
                {
                  [
                    "Kälteaufnahme Q̇₀",
                    "Fluid-Verdichterleistung P_fluid",
                    "Wärmeabgabe Q̇ₖ",
                  ][i]
                }{" "}
                = {number(mass)} kg/s × {number(b[key] / 1000, 5)} kJ/kg ={" "}
                <strong>{number(power / 1000, 5)} kW</strong>
              </li>
            );
          })}
        </ul>
        {mass === 0 && (
          <p>
            Nullförderung: Alle Leistungen sind null. Die angezeigte Fluid-COP
            ist nur das formale Enthalpieverhältnis des Referenzfalls, kein
            COP-Betriebswert bei Stillstand.
          </p>
        )}
        <p>
          q₀ umfasst die modellierte Überhitzung. Nutzkälteleistung im Raum und
          reale elektrische Leistungszahl benötigen passende Systemgrenzen und
          zusätzliche Daten.
        </p>
      </section>
      <section aria-label="Diagramm selbst auswerten">
        <h3>Jetzt selbst am Diagramm üben</h3>
        <label className="field">
          Diagrammaufgabe auswählen
          <select
            aria-label="Diagrammaufgabe auswählen"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          >
            <option value="refrig-diagram-high-v08">Hochdruck erkennen</option>
            <option value="refrig-diagram-evap-v08">
              Wärmeaufnahme zuordnen
            </option>
            <option value="refrig-diagram-throttle-v08">
              Drosselung interpretieren
            </option>
            <option value="refrig-compare-v08">
              Zwei Betriebsfälle vergleichen
            </option>
          </select>
        </label>
        <p>
          Die Antwortalternativen sind zugleich die Textalternative zum
          Diagramm. Bewertung und Hilfen verwenden dieselbe Werkstatt wie die
          Fachmissionen.
        </p>
        <p>
          Die Auswahl allein ersetzt keine vorhandenen Rechenblattnotizen. Erst
          beim Öffnen der Aufgabe wird der einzelne Werkstattentwurf gewechselt.
        </p>
        <button
          className="button secondary"
          onClick={() => setExerciseOpen((x) => !x)}
        >
          {exerciseOpen
            ? "Diagrammaufgabe schließen"
            : "Diagrammaufgabe bearbeiten"}
        </button>
        {exerciseOpen && (
          <Workshop
            key={exercise}
            embedded
            progress={progress}
            setProgress={setProgress}
            initialItemId={exercise}
            initialMode="independent"
            openModule={openModule}
            openExam={openMissions}
          />
        )}
      </section>
      <div className="button-row">
        <button
          className="button primary"
          onClick={() =>
            practice(
              `refrig-${c.id.includes("transfer") ? "transfer" : c.id.includes("kuehlraum") ? "kuehlraum" : "basis"}-q0-v08`,
            )
          }
        >
          Referenzfall im Rechenblatt üben (Basis / Kühlraum / Transfer)
        </button>
        <button
          className="button secondary"
          onClick={() => openModule("refrig-state-v08")}
        >
          Enthalpie und Einheiten wiederholen
        </button>
        <button className="button secondary" onClick={openMissions}>
          Zum vollständigen Missionspfad
        </button>
      </div>
    </section>
  );
}
