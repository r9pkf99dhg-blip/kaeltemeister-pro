import { MathText, OptionMath } from "../../math/Math";
import { useState } from "react";
import { academyQuestions } from "../catalog";
import { levels, type AcademyProgress, type Level } from "../model";
import { answerQuestion } from "../progress";
import type { Dispatch, SetStateAction } from "react";

export default function ModuleQuiz({
  moduleId,
  level,
  progress,
  setProgress,
}: {
  moduleId: string;
  level: Level;
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
}) {
  const questions = academyQuestions.filter(
    (question) =>
      question.moduleId === moduleId &&
      levels.indexOf(question.level) <= levels.indexOf(level),
  );
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const answered = questions.filter(
    (question) =>
      progress.answers[question.id]?.questionRevision === question.revision,
  );
  const correct = answered.filter(
    (question) => progress.answers[question.id].correct,
  ).length;
  return (
    <div className="module-quiz">
      <p>
        Eine Antwort ist jeweils richtig. Antworten werden nach „Antwort prüfen“
        gespeichert. Du kannst jede Frage erneut bearbeiten.
      </p>
      <p className="module-score" aria-live="polite">
        Gespeichert: {answered.length} von {questions.length} beantwortet ·{" "}
        {correct} richtig
      </p>
      {questions.map((question, index) => {
        const saved = progress.answers[question.id];
        return (
          <div className="module-question" key={question.id}>
            <fieldset>
              <legend>
                {index + 1}. <MathText text={question.prompt} />
              </legend>
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className={`module-option ${selected[question.id] === option.id ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    aria-label={option.text}
                    checked={selected[question.id] === option.id}
                    onChange={() => {
                      setSelected((current) => ({
                        ...current,
                        [question.id]: option.id,
                      }));
                      setChecked((current) => ({
                        ...current,
                        [question.id]: false,
                      }));
                    }}
                  />
                  <span>
                    <OptionMath text={option.text} />
                  </span>
                </label>
              ))}
            </fieldset>
            <button
              className="button primary"
              disabled={!selected[question.id] || checked[question.id]}
              onClick={() => {
                setProgress((current) =>
                  answerQuestion(current, question.id, selected[question.id]),
                );
                setChecked((current) => ({ ...current, [question.id]: true }));
              }}
            >
              Antwort prüfen
            </button>
            {checked[question.id] && (
              <div
                className={`feedback ${selected[question.id] === question.correctOptionId ? "success" : "retry"}`}
                role="status"
              >
                <strong>
                  {selected[question.id] === question.correctOptionId
                    ? "Richtig."
                    : "Noch nicht richtig."}
                </strong>
                <p>
                  <MathText text={question.explanation} />
                </p>
                <p>
                  Richtige Antwort:{" "}
                  {
                    question.options.find(
                      (option) => option.id === question.correctOptionId,
                    )?.text
                  }
                </p>
              </div>
            )}
            {!checked[question.id] &&
              saved?.questionRevision === question.revision && (
                <p className="saved-answer">
                  Zuletzt gespeichert:{" "}
                  {question.options.find(
                    (option) => option.id === saved.optionId,
                  )?.text ?? "Antwort nicht mehr verfügbar"}{" "}
                  · {saved.correct ? "richtig" : "erneut üben"}
                </p>
              )}
          </div>
        );
      })}
    </div>
  );
}
