import { useState, type Dispatch, type SetStateAction } from "react";
import type { AcademyProgress } from "../academy/model";
import { learningItems } from "../academy/exercises/items";
import { modules } from "../academy/catalog";
import { competencies } from "../academy/foundations/competencies";
import { emptyMastery } from "./model";
import {
  missions,
  missionStatus,
  stepStatus,
  recommendedMission,
  interleavedTasks,
  type Fachmission,
} from "./missions";
import Workshop from "../workshop/Workshop";
import { Explain } from "../language/Explanation";
import { calculateTechnical, fromSI } from "../technical/calculations";
import { cycleBalance } from "../technical/refrigeration";
import { format } from "../logic";
export default function MissionView({
  progress,
  setProgress,
  openModule,
  openExam,
  openCycle,
  practice,
}: {
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  openModule: (id: string) => void;
  openExam: () => void;
  openCycle: () => void;
  practice: (id: string) => void;
}) {
  const m = progress.mastery ?? emptyMastery();
  const current = missions.find(
    (x) => x.id === m.mission?.id && x.revision === m.mission.revision,
  );
  const [length, setLength] = useState("all");
  const recommended = recommendedMission(progress);
  const filtered = missions.filter(
    (x) =>
      (length === "all" || x.length === length) &&
      (!m.preferredLevel ||
        m.preferredLevel === "all" ||
        x.level === m.preferredLevel),
  );
  const select = (mission: Fachmission) =>
    setProgress((p) => ({
      ...p,
      mastery: {
        ...(p.mastery ?? emptyMastery()),
        mission: {
          id: mission.id,
          revision: mission.revision,
          step: 0,
          seen: [],
        },
      },
    }));
  function move(step: number) {
    setProgress((p) =>
      p.mastery?.mission
        ? {
            ...p,
            mastery: { ...p.mastery, mission: { ...p.mastery.mission, step } },
          }
        : p,
    );
  }
  function seen(id: string) {
    setProgress((p) =>
      p.mastery?.mission
        ? {
            ...p,
            mastery: {
              ...p.mastery,
              mission: {
                ...p.mastery.mission,
                seen: [...new Set([...(p.mastery.mission.seen ?? []), id])],
              },
            },
          }
        : p,
    );
  }
  return (
    <section className="academy-panel mission-view" aria-label="Fachmissionen">
      <h2>Deine Fachmissionen</h2>
      <p>
        Kurze, zusammenhängende fachliche Ziele. Alle Missionen frei wählbar;
        Zeitorientierungen sind keine Fristen. Eine andere Mission ersetzt die
        zuletzt geöffnete Missionsposition. Bewertete Aufgaben bleiben im
        gemeinsamen Lernverlauf.
      </p>
      <div className="mission-recommendation">
        <strong>Empfohlen: {recommended.mission.title}</strong>
        <p>{recommended.reason}</p>
        <button
          className="button secondary"
          onClick={() => select(recommended.mission)}
        >
          Empfohlene Mission öffnen
        </button>
      </div>
      <div className="mastery-actions">
        <label>
          Missionslänge
          <select
            aria-label="Missionslänge"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          >
            <option value="all">Alle Längen</option>
            <option value="short">Kurzmission</option>
            <option value="standard">Standardmission</option>
            <option value="deep">Vertiefungsmission</option>
          </select>
        </label>
        <label>
          Gewünschtes Missionsniveau
          <select
            aria-label="Gewünschtes Missionsniveau"
            value={m.preferredLevel ?? "all"}
            onChange={(e) =>
              setProgress((p) => ({
                ...p,
                mastery: {
                  ...(p.mastery ?? emptyMastery()),
                  preferredLevel: e.target.value as
                    | "all"
                    | "grundlagen"
                    | "fachkraft"
                    | "meister",
                },
              }))
            }
          >
            <option value="all">Alle Niveaus</option>
            <option value="grundlagen">Grundlagen</option>
            <option value="fachkraft">Fachkraft</option>
            <option value="meister">Meister-Transfer</option>
          </select>
        </label>
      </div>
      <div className="mission-cards">
        {filtered.map((x) => {
          const status = missionStatus(progress, x);
          return (
            <article key={x.id}>
              <h3>{x.title}</h3>
              <p>
                {x.minutes} ·{" "}
                {x.length === "short"
                  ? "Kurzmission"
                  : x.length === "standard"
                    ? "Standardmission"
                    : "Vertiefungsmission"}
              </p>
              <p>
                {status.complete
                  ? "Aufgabenbedingungen erfüllt"
                  : `${status.done} von ${status.total} Lernschritten bearbeitet`}
              </p>
              <button className="button secondary" onClick={() => select(x)}>
                {x.title} öffnen
              </button>
            </article>
          );
        })}
      </div>
      {m.mission && !current && (
        <p className="notice">
          Der gespeicherte Missionsstand gehört zu einer anderen Fassung.
          Aufgabenverlauf bleibt erhalten; wähle eine aktuelle Mission.
        </p>
      )}
      {current &&
        (() => {
          const position = Math.min(
              m.mission?.step ?? 0,
              current.steps.length - 1,
            ),
            s = current.steps[position],
            status = missionStatus(progress, current),
            done = stepStatus(progress, current, s);
          const task = s.itemId
            ? learningItems.find((i) => i.id === s.itemId)
            : undefined;
          const matching =
            progress.exerciseDraft?.workspace === "workshop" &&
            progress.exerciseDraft.taskId === s.itemId &&
            progress.exerciseDraft.revision === task?.revision;
          const mixed = interleavedTasks(progress, current);
          return (
            <section
              aria-label="Aktuelle Fachmission"
              className="active-mission"
            >
              <h2>{current.title}</h2>
              <p>
                <strong>Lernziel:</strong> {current.goals.join(" ")}
              </p>
              <p>
                Voraussetzungen als Empfehlung:{" "}
                {current.prerequisiteIds
                  .map(
                    (id) => competencies.find((c) => c.id === id)?.title ?? id,
                  )
                  .join(", ")}
                . Kein Zugang wird gesperrt.
              </p>
              <p>
                Schritt {position + 1} von {current.steps.length}:{" "}
                <strong>{s.title}</strong>
              </p>
              <label>
                Schritt frei wählen
                <select
                  aria-label="Missionsschritt"
                  value={position}
                  onChange={(e) => move(Number(e.target.value))}
                >
                  {current.steps.map((s, i) => (
                    <option key={s.id} value={i}>
                      {i + 1}. {s.title}
                    </option>
                  ))}
                </select>
              </label>
              {s.kind === "read" && (
                <>
                  <p>
                    <Explain
                      simple="Lies die passende Grundlage in deiner bevorzugten Sprache. Öffnen allein zählt nicht als fachlicher Nachweis; die späteren Aufgaben prüfen deine Anwendung."
                      technical="Lesestatus ist Orientierung, kein objektiver Kompetenznachweis. Der Missionsabschluss verlangt die gesonderten aktuellen Aufgabenbedingungen."
                    />
                  </p>
                  <button
                    className="button primary"
                    onClick={() => openModule(s.moduleId!)}
                  >
                    Grundlage {modules.find((x) => x.id === s.moduleId)?.title}{" "}
                    öffnen
                  </button>
                </>
              )}
              {s.kind === "example" && (
                <>
                  <WorkedExample kind={s.example ?? "cycle"} />
                  <button
                    className="button secondary"
                    onClick={() => seen(s.id)}
                  >
                    Beispiel nachvollzogen – als Selbstangabe markieren
                  </button>
                </>
              )}
              {s.kind === "selfcheck" && (
                <>
                  <p>{s.prompt}</p>
                  <p>
                    Schreibe deine eigene Begründung im Rechenblatt der
                    zugehörigen Aufgabe. Freitext wird nicht objektiv fachlich
                    bewertet.
                  </p>
                  <details>
                    <summary>Musterargumente zur Selbstprüfung</summary>
                    <ul>
                      <li>
                        Systemgrenze und Modellbedingungen ausdrücklich
                        benennen.
                      </li>
                      <li>Einheiten und Zustandsnummern korrekt zuordnen.</li>
                      <li>
                        Gemeinsamen Enthalpiebezug, Druckniveau und
                        Phasenannahmen prüfen.
                      </li>
                      <li>
                        Reale elektrische/thermische Zusatzverluste und fehlende
                        Daten benennen.
                      </li>
                    </ul>
                  </details>
                  <button
                    className="button secondary"
                    onClick={() => seen(s.id)}
                  >
                    Eigene Argumente selbst geprüft – kein Fachnachweis
                  </button>
                </>
              )}
              {s.kind === "practice" && task && (
                <>
                  <p>
                    {s.independent
                      ? "Ziel: mindestens ein richtiger aktueller Versuch ohne in diesem Versuch angebotene Hilfe. Vorherige Hilfe bleibt im Verlauf sichtbar."
                      : "Üben mit optionalen Hilfen. Geöffnete Hilfe zählt als Unterstützung."}
                  </p>
                  <Workshop
                    key={`${current.id}-${s.id}`}
                    embedded
                    initialMode={s.guided ? "guided" : "independent"}
                    progress={progress}
                    setProgress={setProgress}
                    initialItemId={matching ? undefined : task.id}
                    openModule={openModule}
                    openExam={openExam}
                  />
                  {s.independent &&
                    !done &&
                    progress.performance[task.id]?.correctCount > 0 && (
                      <p className="notice">
                        Die Aufgabe wurde bereits geübt. Für dieses Ziel ist
                        noch ein dokumentierter Versuch ohne geöffnete Hilfe
                        nötig. Du kannst einen neuen Abrufversuch beginnen oder
                        frei eine andere Mission wählen.
                      </p>
                    )}
                </>
              )}
              <div className="mastery-actions">
                {position > 0 && (
                  <button
                    className="button secondary"
                    onClick={() => move(position - 1)}
                  >
                    Vorheriger Missionsschritt
                  </button>
                )}
                {position + 1 < current.steps.length && (
                  <button
                    className="button primary"
                    onClick={() => move(position + 1)}
                  >
                    Nächster Missionsschritt
                  </button>
                )}
                <button className="text-button" onClick={openCycle}>
                  Kreislauf als Lernwerkzeug öffnen
                </button>
              </div>
              <p>{status.criteria}</p>
              <p>
                {status.done} von {status.total} Lernschritten dokumentiert;{" "}
                {status.independentRequired} Aufgaben verlangen einen
                unabhängigen Versuch. Schrittwechsel allein erfüllt keine
                Bedingung.
              </p>
              {status.complete && (
                <div className="notice mastery-success" role="status">
                  <strong>Fachliche Aufgabenbedingungen erfüllt.</strong>
                  <p>
                    Du hast die aufgeführten aktuellen Aufgaben gemäß ihren
                    Hilfebedingungen bearbeitet. Freie Erklärungen bleiben
                    Selbstkontrolle, keine unabhängige Fachfreigabe.
                  </p>
                </div>
              )}
              {mixed.length > 0 && (
                <details>
                  <summary>Verwandte Aufgaben gezielt abwechseln</summary>
                  <p>
                    In benötigten Grundlagen liegen mindestens zwei letzte
                    richtige Aufgaben vor. Deshalb ist gemischtes Üben zu
                    verwandten Zusammenhängen sinnvoll auswählbar. Du kannst
                    beim aktuellen Lernweg bleiben; eine neue Aufgabe ersetzt
                    den letzten Rechenblattentwurf.
                  </p>
                  {mixed.map((id) => (
                    <button
                      key={id}
                      className="text-button"
                      onClick={() => practice(id)}
                    >
                      {learningItems.find((i) => i.id === id)?.title} üben
                    </button>
                  ))}
                </details>
              )}
              <details>
                <summary>Mission: Quellen und Nachweisgrenzen</summary>
                <p>
                  {current.sourceIds.join(", ")}. Quellen unterstützen
                  ausdrücklich genannte Grundbeziehungen und Modellmetadaten;
                  unabhängige menschliche Fachfreigabe offen. Keine offizielle
                  Prüfungsaufgabe.
                </p>
              </details>
            </section>
          );
        })()}
    </section>
  );
}
function WorkedExample({ kind }: { kind: "heat" | "cycle" }) {
  const heat = calculateTechnical("heat", {
    massFlow: 0.2,
    cp: 4180,
    deltaT: 10,
  });
  const cycle = cycleBalance({
    h1: 400000,
    h2: 450000,
    h3: 250000,
    h4: 250000,
  });
  return (
    <div className="worked-example">
      <h3>Vollständig erklärtes anderes Beispiel</h3>
      {kind === "heat" ? (
        <>
          <p>
            Gegeben: ṁ=0,2 kg/s, vorgegebenes cp=4180 J/(kg·K), ΔT=10 K.
            Gesucht: sensible Modellwärmeleistung ohne Phasenwechsel.
          </p>
          <ol>
            <li>Formel Q̇=ṁcpΔT; Größen und SI-Einheiten prüfen.</li>
            <li>Einsetzen: 0,2 × 4180 × 10.</li>
            <li>
              Ergebnis: {format(fromSI(heat, "kW", "power"))} kW. Erst am Ende
              gerundet.
            </li>
          </ol>
        </>
      ) : (
        <>
          <p>
            Ausdrücklich synthetische Enthalpien, keine reale Stofftabelle:
            h1=400, h2=450, h3=h4=250 kJ/kg, gemeinsamer Bezug.
          </p>
          <ol>
            <li>SI: alle kJ/kg mit 1000 multiplizieren.</li>
            <li>
              q0=h1−h4={format(cycle.q0 / 1000)} kJ/kg; w=h2−h1=
              {format(cycle.w / 1000)} kJ/kg.
            </li>
            <li>qk=h2−h3={format(cycle.qk / 1000)} kJ/kg; Probe qk=q0+w.</li>
            <li>COP=q0/w={format(cycle.cop)}; kein elektrischer Gesamt-COP.</li>
          </ol>
        </>
      )}
      <p>
        Danach bearbeitest du andere vollständige Angaben selbst. Das Betrachten
        dieses Beispiels ist kein bewerteter Erfolg.
      </p>
    </div>
  );
}
