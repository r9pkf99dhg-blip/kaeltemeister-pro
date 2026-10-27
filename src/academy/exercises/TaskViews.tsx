import { BlockMath, MathText, SolutionSteps } from "../../math/Math";
import { formulas, modules, sources } from "../catalog";
import { format } from "../../logic";
import { units, fromSI } from "../../technical/calculations";
import { learningNotes } from "./data";
import { expectedSI } from "./engine";
import type { ItemAnswer, LearningItem } from "./model";

export function TaskPrompt({ item }: { item: LearningItem }) {
  return (
    <>
      <h3>{item.title}</h3>
      <p><MathText text={item.prompt} /></p>
      {item.kind === "numeric" && (
        <>
          <dl className="task-givens">
            {item.givens.map((given) => (
              <div key={given.id}>
                <dt>{given.label}</dt>
                <dd>
                  {format(given.value)} {given.unit}
                </dd>
              </div>
            ))}
          </dl>
          <p>
            <strong>Gesucht:</strong> {item.sought}
          </p>
          <p className="task-assumptions">
            <strong>Annahmen:</strong> {item.assumptions}
          </p>
        </>
      )}
    </>
  );
}
export function TaskAnswer({
  item,
  answer,
  onChange,
  disabled = false,
}: {
  item: LearningItem;
  answer: ItemAnswer;
  onChange: (answer: ItemAnswer) => void;
  disabled?: boolean;
}) {
  if (item.kind === "choice")
    return (
      <fieldset className="task-choices" disabled={disabled}>
        <legend>Deine Antwort zu „{item.title}“</legend>
        {item.options.map((option) => (
          <label className="module-option" key={option.id}>
            <input
              type="radio"
              name={`task-${item.id}`}
              checked={answer.value === option.id}
              onChange={() => onChange({ value: option.id, unit: "" })}
            />
            <span>{option.text}</span>
          </label>
        ))}
      </fieldset>
    );
  return (
    <div className="task-answer">
      <label htmlFor={`result-${item.id}`}>
        Dein Ergebnis: {item.sought}
        <input
          id={`result-${item.id}`}
          inputMode="decimal"
          value={answer.value}
          disabled={disabled}
          onChange={(event) =>
            onChange({ ...answer, value: event.target.value })
          }
        />
      </label>
      <label htmlFor={`unit-${item.id}`}>
        Ergebniseinheit
        <select
          id={`unit-${item.id}`}
          aria-label={`Einheit für ${item.sought}`}
          value={answer.unit}
          disabled={disabled}
          onChange={(event) =>
            onChange({ ...answer, unit: event.target.value })
          }
        >
          {units[item.quantity].map((unit) => (
            <option key={unit}>{unit}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
export function TaskSolution({
  item,
  expected,
}: {
  item: LearningItem;
  expected?: number;
}) {
  if (item.kind === "choice")
    return (
      <div className="task-solution">
        <p>
          <strong>Richtige Antwort:</strong>{" "}
          {
            item.options.find((option) => option.id === item.correctOptionId)
              ?.text
          }
        </p>
        <p><MathText text={item.explanation} /></p>
      </div>
    );
  const value = expected ?? expectedSI(item);
  return (
    <div className="task-solution">
      <h4>Schrittweise Musterlösung</h4>
      <p>
        <strong>
          Ergebnis: {format(fromSI(value, item.answerUnit, item.quantity))}{" "}
          {item.answerUnit}
        </strong>
      </p>
<SolutionSteps steps={item.texSteps ?? item.steps} />
      <h4>Typische Rechenfehler</h4>
      <ul>
        {item.mistakes.map((mistake) => (
          <li key={mistake}>{mistake}</li>
        ))}
      </ul>
      <p className="small-muted">
        Rechentoleranz: maximaler Wert aus{" "}
        {format(item.relativeTolerance * 100)} % des Sollwerts und{" "}
        {format(item.absoluteToleranceSI)} in der SI-Ergebniseinheit. Das ist
        eine didaktische Rundungstoleranz, keine Messunsicherheit.
      </p>
    </div>
  );
}
export function TaskReference({
  item,
  openModule,
}: {
  item: LearningItem;
  openModule: (id: string) => void;
}) {
  const formula = formulas.find((entry) => entry.id === item.formulaId);
  const note =
    item.article.kind === "note"
      ? learningNotes.find((entry) => entry.id === item.article.id)
      : null;
  return (
    <aside className="task-reference">
      <h4>Fachlicher Bezug</h4>
      {formula && (
        <>
          <p>
            <strong>{formula.title}:</strong>
          </p>
          <BlockMath tex={formula.tex ?? formula.expression} label={formula.expression} />
          <p>{formula.units}</p>
        </>
      )}
      {item.article.kind === "module" ? (
        <button
          className="text-button"
          onClick={() => openModule(item.article.id)}
        >
          Fachartikel:{" "}
          {modules.find((entry) => entry.id === item.article.id)?.title}
        </button>
      ) : (
        note && (
          <details>
            <summary>Fachnotiz: {note.title}</summary>
            <p>{note.text}</p>
          </details>
        )
      )}
      {item.kind === "numeric" && (
        <details>
          <summary>Quellen und Umfang der Prüfung</summary>
          {item.sourceIds.map((id) => {
            const source = sources.find((entry) => entry.id === id);
            return source ? (
              <div key={id}>
                <p>
                  <strong>{source.title}</strong> ·{" "}
                  {source.access === "consulted"
                    ? "tatsächlich eingesehen"
                    : "eigener Modellfall"}
                </p>
                {source.locator && <p>{source.locator}</p>}
                <p>{source.supports ?? source.note}</p>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fundstelle öffnen ↗
                  </a>
                )}
              </div>
            ) : null;
          })}
        </details>
      )}
      <p className="small-muted">
        Rechenbeispiel und Einheiten getestet; unabhängige fachliche Freigabe
        ausstehend. Eigenständig erstellte Lernaufgabe, keine Hersteller- oder
        Normvorgabe.
      </p>
    </aside>
  );
}
export const emptyAnswer = (item: LearningItem): ItemAnswer => ({
  value: "",
  unit: item.kind === "numeric" ? item.answerUnit : "",
});
