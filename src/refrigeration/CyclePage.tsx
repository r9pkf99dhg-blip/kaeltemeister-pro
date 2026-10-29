import PageHeading from "../components/PageHeading";
import ReferencePanel from "./ReferencePanel";
import { referenceProof } from "./backend";
import ReferenceNotice from "./ReferenceNotice";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { AcademyProgress } from "../academy/model";
import { Explain } from "../language/Explanation";
import CycleSchematic from "./CycleSchematic";
import {
  componentNames,
  componentExplanations,
  stateDescriptions,
} from "./qualitative";
import { initialCycleDraft, type CycleDraft } from "./draft";
export interface CyclePageProps {
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  openModule: (id: string) => void;
  practice: (id: string) => void;
  openMissions: () => void;
}
export default function CyclePage({
  progress,
  setProgress,
  openModule,
  practice,
  openMissions,
}: CyclePageProps) {
  const saved = progress.cycleDraft;
  const d = saved?.datasetRevision === 1 ? saved : initialCycleDraft();
  const [moving, setMoving] = useState(false);
  const update = (patch: Partial<CycleDraft>) =>
    setProgress((p) => ({
      ...p,
      cycleDraft: {
        ...(p.cycleDraft?.datasetRevision === 1
          ? p.cycleDraft
          : initialCycleDraft()),
        ...patch,
      },
    }));
  const state = stateDescriptions[d.point - 1];
  return (
    <div className="refrigeration-page">
      <PageHeading
        eyebrow="VERSTEHEN · RECHNEN · ANWENDEN"
        title="Der interaktive Kältekreislauf"
        description="Vier Bauteile, vier Zustände und eine nachvollziehbare Energiebilanz."
      />
      {saved && saved.datasetRevision !== 1 && (
        <p role="status">
          Die gespeicherte Stoffdatenrevision ist hier nicht verfügbar. Die
          sichere qualitative Ansicht bleibt nutzbar; dein gespeicherter Stand
          wird nicht automatisch überschrieben.
        </p>
      )}
      <fieldset className="cycle-model">
        <legend>Lernmodell wählen</legend>
        <button
          className="button secondary"
          aria-pressed={d.mode === "qualitative"}
          onClick={() => update({ mode: "qualitative" })}
        >
          A · Qualitativ
        </button>
        <button
          className="button secondary"
          aria-pressed={d.mode === "reference"}
          disabled={!referenceProof().ok}
          onClick={() => update({ mode: "reference" })}
        >
          B · R134a-Referenzfälle
        </button>
      </fieldset>
      <section className="academy-panel">
        <h2>
          {d.mode === "qualitative"
            ? "Modell A · Qualitativ verstehen"
            : "Kreislaufschema zum Referenzmodell"}
        </h2>
        <p>
          Diese Ansicht erklärt Zusammenhänge ohne erfundene Druck-, Temperatur-
          oder Enthalpiewerte. Das Modell vernachlässigt Druckverluste und
          Wärmeverluste des Verdichters.
        </p>
        <button
          className="button secondary"
          onClick={() => setMoving((x) => !x)}
          aria-pressed={moving}
        >
          {moving
            ? "Strömungsbewegung pausieren"
            : "Strömungsrichtung animieren"}
        </button>
        <CycleSchematic
          component={d.component}
          point={d.point}
          selectComponent={(component) =>
            update({ component, point: component + 1 })
          }
          selectPoint={(point) => update({ point, component: point - 1 })}
          moving={moving}
        />
        <h3>{componentNames[d.component]}</h3>
        <p>
          Eintritt: Zustand {d.component + 1} → Austritt: Zustand{" "}
          {((d.component + 1) % 4) + 1}.
        </p>
        <Explain {...componentExplanations[d.component]} />
        <h3>
          Zustand {d.point}: {state.title}
        </h3>
        <p>
          <strong>
            {state.pressure} · {state.phase}
          </strong>
        </p>
        <Explain simple={state.simple} technical={state.technical} />
        <div className="button-row">
          <button
            className="button secondary"
            onClick={() =>
              update({
                component: (d.component + 1) % 4,
                point: ((d.component + 1) % 4) + 1,
              })
            }
          >
            Nächsten Prozess erklären
          </button>
          <button
            className="button secondary"
            onClick={() => openModule("refrig-cycle-v08")}
          >
            Grundlagen mit Fachbegriffen öffnen
          </button>
          <button className="button primary" onClick={openMissions}>
            Kreisprozess als Fachmission üben
          </button>
          <button
            className="button secondary"
            onClick={() => practice("refrig-diagram-high-v08")}
          >
            Druckbereiche selbst zuordnen
          </button>
        </div>
      </section>
      {d.mode === "reference" && (
        <ReferencePanel
          d={d}
          update={update}
          progress={progress}
          setProgress={setProgress}
          openModule={openModule}
          practice={practice}
          openMissions={openMissions}
        />
      )}
      <ReferenceNotice />
      <p>
        Modell C mit freien Stoffzuständen wird erst nach belastbarem
        Browser-Stoffdaten-Nachweis freigegeben. Kein Anlagenplanungswerkzeug
        und keine Freigabe für reale Arbeiten.
      </p>
    </div>
  );
}
