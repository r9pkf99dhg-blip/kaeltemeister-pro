import { modules } from "../catalog";
import type { AcademyProgress } from "../model";
import type { NumericTask } from "../exercises/model";
import type { Dispatch, SetStateAction } from "react";
import { bridgeRecommendations } from "./learning-bridge";
import LessonReading from "../components/LessonReading";
import ModuleQuiz from "../components/ModuleQuiz";
import { markRead, moduleRead } from "../progress";
export default function LearningBridge({
  task,
  progress,
  setProgress,
  lessonId,
  openLesson,
  closeLesson,
}: {
  task: NumericTask;
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  lessonId: string | null;
  openLesson: (id: string) => void;
  closeLesson: () => void;
}) {
  const suggestions = bridgeRecommendations(progress, task);
  const lesson = modules.find((m) => m.id === lessonId);
  if (!suggestions.length) return null;
  return (
    <aside className="learning-bridge" aria-label="Intelligente Lernbrücke">
      <h3>Eine mögliche Grundlage auffrischen</h3>
      <p>
        Eine falsche Antwort zeigt noch nicht, welche Grundlage fehlt. Diese
        Empfehlungen nutzen die Anforderungen der Aufgabe und deinen bisherigen
        Lernstand.
      </p>
      {!lesson && (
        <>
          <p>
            <strong>{suggestions[0].title}</strong>: {suggestions[0].reason}
          </p>
          <button
            className="button secondary"
            onClick={() => openLesson(suggestions[0].lessonId)}
          >
            Empfohlene Grundlage öffnen
          </button>
          <details>
            <summary>Weitere zugeordnete Grundlagen</summary>
            {suggestions.slice(1).map((s) => (
              <p key={s.id}>
                {s.title}: {s.reason}{" "}
                <button
                  className="text-button"
                  onClick={() => openLesson(s.lessonId)}
                >
                  Grundlage {s.title} öffnen
                </button>
              </p>
            ))}
          </details>
        </>
      )}
      {lesson && (
        <section
          className="bridge-lesson"
          aria-label="Eingeblendete Grundlagenlektion"
        >
          <h2>Grundlage: {lesson.title}</h2>
          <p>
            Deine ursprüngliche Aufgabe „{task.title}“ mit Eingabe und Einheit
            bleibt geöffnet. Die Lektion verwendet dieselben Inhalte und
            denselben Lernfortschritt wie die Akademie.
          </p>
          <p className="review-notice">
            Unabhängige menschliche Fachprüfung offen; Formeln und
            Modellannahmen beachten.
          </p>
          {lesson.safety && <p>{lesson.safety}</p>}
          <button className="button primary" onClick={closeLesson}>
            Zur ursprünglichen Aufgabe zurück
          </button>
          <LessonReading module={lesson} level="grundlagen" embedded />
          <button
            className="button secondary"
            disabled={moduleRead(progress, lesson.id, "grundlagen")}
            onClick={() =>
              setProgress((p) => markRead(p, lesson.id, "grundlagen"))
            }
          >
            {moduleRead(progress, lesson.id, "grundlagen")
              ? "Grundlage ist als gelesen gespeichert"
              : "Grundlage als gelesen markieren"}
          </button>
          <h3>Selbsttest zur Grundlage</h3>
          <ModuleQuiz
            moduleId={lesson.id}
            level="grundlagen"
            progress={progress}
            setProgress={setProgress}
          />
          <button className="button primary" onClick={closeLesson}>
            Zur Aufgabe zurückkehren
          </button>
        </section>
      )}
    </aside>
  );
}
