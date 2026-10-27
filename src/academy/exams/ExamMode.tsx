import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { domains } from "../catalog";
import { levels, levelNames, type AcademyProgress, type Level } from "../model";
import { createExam, examRemaining, finishExam, setExamAnswer } from "./engine";
import {
  TaskAnswer,
  TaskPrompt,
  TaskReference,
  TaskSolution,
  emptyAnswer,
} from "../exercises/TaskViews";
import type { ExamResult } from "../exercises/model";

export default function ExamMode({
  progress,
  setProgress,
  openModule,
}: {
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  openModule: (id: string) => void;
}) {
  const [domain, setDomain] = useState("all");
  const [level, setLevel] = useState<Level>("grundlagen");
  const [minutes, setMinutes] = useState(10);
  const [error, setError] = useState("");
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [clock, setClock] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const session = progress.activeExam;
  const remaining = session ? examRemaining(session, new Date(clock)) : 0;
  const result =
    progress.examHistory.find((entry) => entry.id === selectedResult) ??
    progress.examHistory[0];
  function start() {
    try {
      const next = createExam(progress, domain, level, minutes);
      setProgress((current) => ({ ...current, activeExam: next }));
      setClock(Date.now());
      setSelectedResult(null);
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <section className="academy-panel exam-mode">
      <h2>Selbst erstellte Übungsprüfung</h2>
      <p className="review-notice">
        Keine offiziellen Meisterprüfungsaufgaben. Eine lokale Lernsimulation
        ohne Aufsicht oder Manipulationsschutz. Während der Prüfung gibt es
        keine Hinweise oder Lösungen. Gleiche Punktzahl pro Aufgabe, keine
        Teilpunkte, keine offizielle Bestehensgrenze.
      </p>
      {session ? (
        <>
          <div className="exam-timer">
            <strong role="timer" aria-live="off">
              Restzeit: {String(Math.floor(remaining / 60)).padStart(2, "0")}:
              {String(remaining % 60).padStart(2, "0")}
            </strong>
            <span>Antworten und Endzeit bleiben nach Neuladen erhalten.</span>
          </div>
          <p>
            Auch beim Wechsel in einen anderen Bereich läuft die Zeit weiter.
            Eine laufende Prüfung wird nach Ablauf automatisch ausgewertet.
          </p>
          {session.snapshots.map((snapshot, index) => (
            <div className="task-card" key={snapshot.item.id}>
              <p className="eyebrow">
                AUFGABE {index + 1} / {session.snapshots.length}
              </p>
              <TaskPrompt item={snapshot.item} />
              <TaskAnswer
                item={snapshot.item}
                answer={
                  session.responses[snapshot.item.id] ??
                  emptyAnswer(snapshot.item)
                }
                disabled={remaining === 0}
                onChange={(answer) =>
                  setProgress((current) =>
                    setExamAnswer(current, snapshot.item.id, answer),
                  )
                }
              />
            </div>
          ))}
          <button
            className="button primary"
            onClick={() => {
              const now = new Date();
              setProgress((current) => finishExam(current, now));
              setSelectedResult(session.id);
            }}
          >
            Prüfung abschließen und auswerten
          </button>
        </>
      ) : (
        <>
          <div className="exam-settings">
            <label htmlFor="exam-domain">
              Fachgebiet
              <select
                id="exam-domain"
                aria-label="Fachgebiet der Übungsprüfung"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
              >
                <option value="all">Alle verfügbaren Fachgebiete</option>
                {domains.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="exam-level">
              Schwierigkeit bis Niveau
              <select
                id="exam-level"
                aria-label="Schwierigkeit bis Niveau"
                value={level}
                onChange={(event) => setLevel(event.target.value as Level)}
              >
                {levels.map((item) => (
                  <option value={item} key={item}>
                    {levelNames[item]}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="exam-duration">
              Zeitbegrenzung
              <select
                id="exam-duration"
                aria-label="Zeitbegrenzung"
                value={minutes}
                onChange={(event) => setMinutes(Number(event.target.value))}
              >
                <option value={5}>5 Minuten</option>
                <option value={10}>10 Minuten</option>
                <option value={20}>20 Minuten</option>
              </select>
            </label>
          </div>
          <p>
            Bis zu sechs Aufgaben, mit beiden Fragetypen. Höhere Niveaus
            enthalten auch Grundlagen. Bekannte Fehler werden bei der Auswahl
            bevorzugt. Noch nicht ausgearbeitete Fachgebiete lassen sich nicht
            starten.
          </p>
          <button className="button primary" onClick={start}>
            Übungsprüfung starten
          </button>
          {error && (
            <p role="alert" className="error-message">
              {error}
            </p>
          )}
          {result && (
            <>
              <h3 className="exam-results-heading">Prüfungsverlauf</h3>
              <label htmlFor="exam-result-select">
                Ergebnis auswählen
                <select
                  id="exam-result-select"
                  aria-label="Ergebnis auswählen"
                  value={result.id}
                  onChange={(event) => setSelectedResult(event.target.value)}
                >
                  {progress.examHistory.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {new Date(entry.finishedAt).toLocaleString("de-DE")} ·{" "}
                      {entry.scorePercent} %
                    </option>
                  ))}
                </select>
              </label>
              <ExamAnalysis result={result} openModule={openModule} />
            </>
          )}
        </>
      )}
    </section>
  );
}
function ExamAnalysis({
  result,
  openModule,
}: {
  result: ExamResult;
  openModule: (id: string) => void;
}) {
  return (
    <div className="exam-analysis">
      <h3>Ergebnis: {result.scorePercent} %</h3>
      <p>
        {result.correctCount} von {result.total} richtig.{" "}
        {result.timedOut ? "Zeitlimit erreicht." : "Vorzeitig abgeschlossen."}{" "}
        Unbeantwortete Aufgaben erhalten 0 Punkte, werden aber nicht als
        nachgewiesene Wissenslücke gespeichert.
      </p>
      {result.results.map((entry, index) => (
        <div className="task-card" key={entry.snapshot.item.id}>
          <p className="pill">
            {entry.grade.status === "correct"
              ? "Richtig"
              : entry.grade.status === "unanswered"
                ? "Nicht beantwortet"
                : entry.grade.status === "invalid"
                  ? "Ungültige Eingabe"
                  : "Erneut üben"}
          </p>
          <h4>
            {index + 1}. {entry.snapshot.item.title}
          </h4>
          <p>
            Deine Antwort:{" "}
            {entry.snapshot.item.kind === "choice"
              ? (entry.snapshot.item.options.find(
                  (option) => option.id === entry.answer.value,
                )?.text ?? "Keine Antwort")
              : `${entry.answer.value || "Keine Antwort"} ${entry.answer.unit}`}
          </p>
          <TaskSolution
            item={entry.snapshot.item}
            expected={entry.snapshot.expectedSI}
          />
          <p>
            <strong>Empfehlung:</strong>{" "}
            {entry.grade.correct
              ? "Behalte die geplante Wiederholung bei."
              : entry.grade.status === "unanswered"
                ? "Bearbeite diese Aufgabe zunächst ohne Zeitdruck; dein Verständnis wurde hier noch nicht geprüft."
                : "Lies den fachlichen Bezug und übe Formel und Einheiten erneut."}
          </p>
          <TaskReference item={entry.snapshot.item} openModule={openModule} />
        </div>
      ))}
    </div>
  );
}
