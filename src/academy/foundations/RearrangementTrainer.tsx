import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { AcademyProgress } from "../model";
import { recordOutcome } from "../adaptive/algorithm";
import { BlockMath } from "../../math/Math";
import { rearrangementCases, trainerQuestions } from "./trainer-data";
export default function RearrangementTrainer({
  setProgress,
  workshop = false,
  progress,
}: {
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  workshop?: boolean;
  progress?: AcademyProgress;
}) {
  const saved = workshop ? progress?.exerciseDraft?.trainer : undefined;
  const valid = saved && rearrangementCases.find((c) => c.id === saved.caseId);
  const [helpUsed, setHelpUsed] = useState(
    workshop && (progress?.exerciseDraft?.workshop?.help ?? 0) > 0,
  );
  const [id, setId] = useState(valid?.id ?? rearrangementCases[0].id),
    [index, setIndex] = useState(
      valid ? Math.min(saved!.index, valid.steps.length - 1) : 0,
    ),
    [answer, setAnswer] = useState(valid ? saved!.answer : ""),
    [checked, setChecked] = useState(valid ? saved!.checked : false),
    [correct, setCorrect] = useState(valid ? saved!.correct : false);
  useEffect(() => {
    if (!workshop) return;
    setProgress((p) => {
      const trainer = { caseId: id, index, answer, checked, correct };
      if (
        JSON.stringify(p.exerciseDraft?.trainer) === JSON.stringify(trainer) &&
        p.exerciseDraft?.workspace === "workshop"
      )
        return p;
      return {
        ...p,
        exerciseDraft: {
          taskId: "workshop-trainer",
          revision: 1,
          answer: { value: answer, unit: "" },
          bridgeLessonId: null,
          checked,
          updatedAt: new Date().toISOString(),
          workspace: "workshop",
          workshop: {
            entryId: "workshop-trainer",
            kind: "rearrangement",
            mode: "independent",
            fields: {
              given: "",
              sought: "",
              formula: "",
              transformed: "",
              conversion: "",
              substitution: "",
              plausibility: "",
            },
            help: helpUsed ? 1 : 0,
            step: index,
            choices: {},
            solutionOpen: false,
          },
          trainer,
        },
      };
    });
  }, [id, index, answer, checked, correct, workshop, helpUsed, setProgress]);
  const current = rearrangementCases.find((c) => c.id === id)!;
  const step = current.steps[index];
  const task = trainerQuestions.find(
    (q) => q.id === `trainer-${id}-step${index + 1}`,
  )!;
  function reset(next: string) {
    setId(next);
    setIndex(0);
    setAnswer("");
    setChecked(false);
    setCorrect(false);
  }
  return (
    <section
      className="academy-panel rearrangement-trainer"
      aria-label="Formelumstellungstrainer"
    >
      <h2>Interaktiver Formelumstellungstrainer</h2>
      <p>
        Wähle die Zielgröße und begründe die Operation. Jede Umformung behandelt
        beide Seiten gleich. Schritte zählen als Lernversuche.{" "}
        {workshop
          ? "Die aktuelle Schrittauswahl wird mit deinem Werkstattentwurf lokal gesichert."
          : "Die aktuelle Schrittauswahl bleibt nur in dieser Sitzung."}
      </p>
      <label>
        Formel und Zielvariable
        <select
          aria-label="Formel und Zielvariable"
          value={id}
          onChange={(e) => reset(e.target.value)}
        >
          {rearrangementCases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} · {c.level}
            </option>
          ))}
        </select>
      </label>
      <p>
        <strong>Gesucht: {current.target}</strong> · Schritt {index + 1} von{" "}
        {current.steps.length}
      </p>
      <BlockMath tex={step.before} />
      <p>{current.assumption}</p>
      <details
        key={`${id}-${index}`}
        onToggle={(e) => {
          if (e.currentTarget.open) setHelpUsed(true);
        }}
      >
        <summary>Hilfestufe: Was muss erhalten bleiben?</summary>
        <p>{step.reason}</p>
        <p>
          Nach jedem Schritt bleibt die Gleichheit auf dem angegebenen
          Definitionsbereich erhalten. Am Ende in die Originalgleichung
          einsetzen.
        </p>
      </details>
      <fieldset>
        <legend>Welche Operation führt zum Ziel?</legend>
        {[...task.options]
          .sort((a, b) => a.text.localeCompare(b.text, "de"))
          .map((o) => (
            <label className="module-option" key={o.id}>
              <input
                type="radio"
                name="rearrangement-operation"
                checked={answer === o.id}
                onChange={() => {
                  setAnswer(o.id);
                  setChecked(false);
                }}
              />
              <span>{o.text}</span>
            </label>
          ))}
      </fieldset>
      <button
        className="button primary"
        disabled={!answer || checked}
        onClick={() => {
          const ok = answer === task.correctOptionId;
          setCorrect(ok);
          setChecked(true);
          setProgress((p) =>
            recordOutcome(
              p,
              task,
              ok,
              new Date(),
              undefined,
              workshop ? (helpUsed ? "hint" : "independent") : undefined,
            ),
          );
        }}
      >
        Umformung prüfen
      </button>
      {checked && (
        <div
          role="status"
          className={`feedback ${correct ? "success" : "retry"}`}
        >
          <p>
            {correct
              ? "Richtig."
              : `Noch nicht richtig. ${step.wrongFeedback?.[answer === "wrong-side" ? 0 : 1] ?? "Diese Operation isoliert die gesuchte Größe nicht gleichwertig auf beiden Seiten. Prüfe die genannte Nullbedingung und die Umkehroperation."}`}
          </p>
          <p>{step.reason}</p>
          {correct && (
            <>
              <h3>Neue Gleichung</h3>
              <BlockMath tex={step.after} />
              {index + 1 < current.steps.length ? (
                <button
                  className="button secondary"
                  onClick={() => {
                    setIndex((i) => i + 1);
                    setAnswer("");
                    setChecked(false);
                  }}
                >
                  Nächster Umstellungsschritt
                </button>
              ) : (
                <>
                  <h3>Vereinfachung und Endergebnis</h3>
                  <BlockMath tex={current.result} />
                  <h3>Probe durch Einsetzen</h3>
                  <BlockMath tex={current.probe} />
                  <p>
                    Die Probe bestätigt die Rechnung im genannten Modell. Sie
                    ist keine unabhängige fachliche Modellfreigabe.
                  </p>
                  <button
                    className="button secondary"
                    onClick={() => reset(id)}
                  >
                    Erneut üben
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
