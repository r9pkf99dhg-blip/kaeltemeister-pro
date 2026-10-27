import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { questions } from "../../content";
import PageHeading from "../../components/PageHeading";

export default function Quiz({
  onComplete,
}: {
  onComplete: (score: number) => void;
}) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const question = questions[answers.length];
  const correctCount = answers.filter(
    (answer, index) => answer === questions[index].correct,
  ).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const nextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    nextRef.current?.focus();
  }, [answers.length, finished]);
  function advance() {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);
    setSubmitted(false);
    if (next.length === questions.length) {
      setFinished(true);
      onComplete(
        Math.round(
          (next.filter((a, i) => a === questions[i].correct).length /
            questions.length) *
            100,
        ),
      );
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="ZEIG, WAS DU KANNST"
        title="Dein Wissen auf dem Prüfstand."
        description={`${questions.length} Fragen zur Kältetechnik. Ohne Zeitdruck, mit einer Erklärung zu jeder Antwort.}`}
      />
      <div className="quiz-layout">
        <div className="quiz-card" ref={nextRef} tabIndex={-1}>
          {finished ? (
            <>
              <span className="result-icon">
                <Trophy size={42} />
              </span>
              <p className="eyebrow">QUIZ ABGESCHLOSSEN</p>
              <h2>
                {score >= 75
                  ? "Starkes Fachwissen!"
                  : "Jede Runde bringt dich weiter."}
              </h2>
              <div className="score">
                {score}
                <span> %</span>
              </div>
              <p>
                Du hast {correctCount} von {questions.length} Fragen richtig
                beantwortet.
              </p>
              <p>
                Dein Ergebnis ist in deinem lokalen Lernfortschritt gespeichert.
              </p>
              <button
                className="button primary"
                onClick={() => {
                  setAnswers([]);
                  setSelected(null);
                  setSubmitted(false);
                  setFinished(false);
                }}
              >
                <RotateCcw size={17} /> Noch einmal üben
              </button>
              <div className="review-list">
                <h3>Deine Auswertung</h3>
                {questions.map((q, i) => (
                  <div key={q.question} className="review-item">
                    <span
                      className={
                        answers[i] === q.correct
                          ? "correct-text"
                          : "incorrect-text"
                      }
                    >
                      {answers[i] === q.correct
                        ? "✓ Richtig"
                        : "✕ Nicht richtig"}{" "}
                      · Frage {i + 1}
                    </span>
                    <h4>{q.question}</h4>
                    <p>Deine Antwort: {q.options[answers[i]]}</p>
                    <p>
                      <strong>Richtige Antwort:</strong> {q.options[q.correct]}
                    </p>
                    <small>{q.explanation}</small>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="quiz-meta">
                <span>
                  FRAGE {answers.length + 1} VON {questions.length}
                </span>
                <span>Grundlagen & Praxis</span>
              </div>
              <progress
                value={answers.length}
                max={questions.length}
                aria-label="Quizfortschritt"
              />
              <h2>{question.question}</h2>
              <fieldset className="answers" disabled={submitted}>
                <legend className="sr-only">Wähle eine Antwort</legend>
                {question.options.map((option, i) => (
                  <label
                    className={`answer ${selected === i ? "selected" : ""} ${submitted && i === question.correct ? "correct" : ""} ${submitted && selected === i && i !== question.correct ? "incorrect" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={selected === i}
                      onChange={() => setSelected(i)}
                    />
                    <span className="answer-letter" aria-hidden="true">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{option}</span>
                    {submitted && i === question.correct && (
                      <CheckCircle2 size={20} />
                    )}
                  </label>
                ))}
              </fieldset>
              {submitted && (
                <div
                  role="status"
                  className={`feedback ${selected === question.correct ? "success" : "retry"}`}
                >
                  <strong>
                    {selected === question.correct
                      ? "Richtig. Gut gemacht!"
                      : "Noch nicht ganz."}
                  </strong>
                  <p>{question.explanation}</p>
                </div>
              )}
              <div className="quiz-actions">
                <span>
                  {submitted
                    ? "Verstehen zählt mehr als Raten."
                    : "Eine Antwort ist richtig."}
                </span>
                {submitted ? (
                  <button className="button primary" onClick={advance}>
                    {answers.length === questions.length - 1
                      ? "Auswertung ansehen"
                      : "Nächste Frage"}{" "}
                    <ArrowRight size={17} />
                  </button>
                ) : (
                  <button
                    className="button primary"
                    disabled={selected === null}
                    onClick={() => setSubmitted(true)}
                  >
                    Antwort prüfen <Check size={17} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <aside className="quiz-aside">
          <span className="icon-box orange">
            <GraduationCap size={25} />
          </span>
          <h3>Lernen, das hängen bleibt.</h3>
          <p>
            Lies die Erklärung nach jeder Antwort. So verstehst du auch, warum
            eine Antwort richtig ist.
          </p>
          <div className="aside-fact">
            <ShieldCheck size={18} />
            <span>
              Nur abgeschlossene Runden zählen. Dein Bestwert bleibt erhalten.
            </span>
          </div>
          <p className="small-muted">
            Beim Verlassen des Quiz beginnt die aktuelle Runde wieder von vorn.
          </p>
        </aside>
      </div>
    </>
  );
}
