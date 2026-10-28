import { domains } from "../catalog";
import LearningBridge from "../foundations/LearningBridge";
import { useState, type Dispatch, type SetStateAction } from "react";
import { numericTasks } from "./data";
import { gradeSnapshot, snapshotItem } from "./engine";
import type { Grade, ItemAnswer } from "./model";
import type { AcademyProgress } from "../model";
import { recordOutcome } from "../adaptive/algorithm";
import {
  TaskAnswer,
  TaskPrompt,
  TaskReference,
  TaskSolution,
  emptyAnswer,
} from "./TaskViews";

export default function Exercises({
  progress,
  setProgress,
  openModule,
  initialTaskId,
  moduleId,
}: {
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  openModule: (id: string) => void;
  initialTaskId?: string | null;
  moduleId?: string;
}) {
  const tasks = moduleId
    ? numericTasks.filter((t) => t.topicId === moduleId)
    : numericTasks;
  const saved=progress.exerciseDraft;
  const draft=(!initialTaskId || initialTaskId===saved?.taskId) && saved && tasks.some(t=>t.id===saved.taskId && t.revision===saved.revision)?saved:undefined;
  const [taskId, setTaskId] = useState(
    tasks.find((item) => item.id === initialTaskId)?.id ?? draft?.taskId ?? tasks[0].id,
  );
  const task = numericTasks.find((item) => item.id === taskId)!;
  const [answer, setAnswer] = useState<ItemAnswer>(draft?.answer ?? emptyAnswer(task));
  const [grade, setGrade] = useState<Grade | null>(draft?.checked ? gradeSnapshot(snapshotItem(task),draft.answer):null);
  const [hint, setHint] = useState(false);
  const [bridgeLesson, setBridgeLesson] = useState<string | null>(draft?.bridgeLessonId??null);
  const [bridgeDismissed,setBridgeDismissed]=useState(false);
  function saveDraft(nextAnswer:ItemAnswer,lessonId:string|null,checked:boolean,nextTask=task){
    setProgress(p=>({...p,exerciseDraft:{taskId:nextTask.id,revision:nextTask.revision,answer:nextAnswer,bridgeLessonId:lessonId,checked,updatedAt:new Date().toISOString()}}));
  }
  const variant = tasks.find(
    (t) =>
      t.id !== task.id &&
      t.topicId === task.topicId &&
      t.calculation === task.calculation,
  );
  function selectTask(id: string) {
    const next = tasks.find((item) => item.id === id);
    if (!next) return;
    setBridgeDismissed(false);
    saveDraft(emptyAnswer(next),null,false,next);
    setTaskId(next.id);
    setAnswer(emptyAnswer(next));
    setGrade(null);
    setHint(false);
    setBridgeLesson(null);
  }
  function check() {
    const result = gradeSnapshot(snapshotItem(task), answer);
    setGrade(result);
    setBridgeDismissed(false);
    saveDraft(answer,bridgeLesson,true);
    if (result.status === "invalid" || result.status === "unanswered") return;
    const now = new Date();
    setProgress((current) =>
      recordOutcome(
        {
          ...current,
          exerciseAnswers: {
            ...current.exerciseAnswers,
            [task.id]: {
              answer,
              correct: result.correct,
              revision: task.revision,
              answeredAt: now.toISOString(),
            },
          },
        },
        task,
        result.correct,
        now,
      ),
    );
  }
  return (
    <section className="academy-panel exercises">
      <h2>Technische Rechenaufgaben</h2>
      <p>
        {tasks.length} klar abgegrenzte Aufgaben. Ein letzter Aufgabenentwurf mit Eingabe und geöffneter Lernbrücke wird lokal gesichert. Erst selbst rechnen, dann
        Ergebnis und Einheit prüfen. Dezimalkomma oder Punkt, keine
        Tausendertrenner.
      </p>
      <label className="task-picker" htmlFor="exercise-select">
        Aufgabe wählen
        <select
          id="exercise-select"
          aria-label="Aufgabe wählen"
          value={taskId}
          onChange={(event) => selectTask(event.target.value)}
        >
          {domains
            .filter((d) => tasks.some((t) => t.domainId === d.id))
            .map((domain) => (
              <optgroup key={domain.id} label={domain.title}>
                {tasks
                  .filter((t) => t.domainId === domain.id)
                  .map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
              </optgroup>
            ))}
        </select>
      </label>
      <div className="task-card">
        <TaskPrompt item={task} />
        <TaskAnswer
          item={task}
          answer={answer}
          onChange={(next) => {
            setAnswer(next);
            setGrade(null);
            setBridgeLesson(null);
            saveDraft(next,null,false);
          }}
        />
        <div className="task-controls">
          <button
            className="button primary"
            onClick={check}
            disabled={
              !!grade && ["correct", "incorrect"].includes(grade.status)
            }
          >
            Ergebnis prüfen
          </button>
          {task.hint && (
            <button
              className="button secondary"
              aria-expanded={hint}
              onClick={() => setHint((value) => !value)}
            >
              Lösungshinweis
            </button>
          )}
        </div>
        {hint && <p className="notice">{task.hint}</p>}
        {grade && (
          <div
            role={
              grade.status === "invalid" || grade.status === "unanswered"
                ? "alert"
                : "status"
            }
            className={`feedback ${grade.correct ? "success" : "retry"}`}
          >
            {grade.message}
          </div>
        )}
        {grade && ["correct", "incorrect"].includes(grade.status) && (
          <TaskSolution item={task} />
        )}
        {!grade &&
          progress.exerciseAnswers[task.id]?.revision === task.revision && (
            <p className="saved-answer">
              Letzter bewerteter Versuch:{" "}
              {progress.exerciseAnswers[task.id].answer.value}{" "}
              {progress.exerciseAnswers[task.id].answer.unit} ·{" "}
              {progress.exerciseAnswers[task.id].correct
                ? "richtig"
                : "erneut üben"}
            </p>
          )}
        {grade?.status === "incorrect" && !bridgeDismissed && (
          <LearningBridge
            task={task}
            answer={answer}
            skip={()=>{setBridgeDismissed(true);setBridgeLesson(null);saveDraft(answer,null,true);document.getElementById(`result-${task.id}`)?.focus();}}
            progress={progress}
            setProgress={setProgress}
            lessonId={bridgeLesson}
            openLesson={id=>{setBridgeLesson(id);saveDraft(answer,id,true);}}
            closeLesson={() => {
              setBridgeLesson(null);
              saveDraft(answer,null,true);
              document.getElementById(`result-${task.id}`)?.focus();
            }}
          />
        )}
        {variant && (
          <button
            className="button secondary"
            onClick={() => selectTask(variant.id)}
          >
            Mit anderen geprüften Zahlen üben
          </button>
        )}
        <TaskReference item={task} openModule={openModule} />
      </div>
    </section>
  );
}
