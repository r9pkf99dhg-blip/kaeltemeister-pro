import { numericTasks } from "../exercises/data";
import { useEffect, useState } from "react";
import { domains, flashcards, modules } from "../catalog";
import type { AcademyProgress } from "../model";
import { moduleRead } from "../progress";
import { learningItems } from "../exercises/items";
import { recommendations } from "./algorithm";
export default function LearningDashboard({
  progress,
  error,
  openModule,
  openView,
}: {
  progress: AcademyProgress;
  error: string | null;
  openModule: (id: string) => void;
  openView: (view: "review" | "exercises" | "exam", taskId?: string) => void;
}) {
  const [clock, setClock] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setClock(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const now = new Date(clock);
  const dayEnd = new Date(clock);
  dayEnd.setHours(23, 59, 59, 999);
  const topics = recommendations(progress, now);
  const recommended = topics.filter((topic) => topic.priority > 0);
  const dueCards = flashcards.filter(
    (card) =>
      !progress.reviews[card.id] ||
      progress.reviews[card.id].cardRevision !== card.revision ||
      Date.parse(progress.reviews[card.id].dueAt) <= dayEnd.getTime(),
  ).length;
  const dueTasks = learningItems.filter(
    (item) =>
      progress.performance[item.id]?.itemRevision === item.revision &&
      Date.parse(progress.performance[item.id].dueAt) <= dayEnd.getTime(),
  ).length;
  const activeDomains = domains.filter((domain) =>
    modules.some((module) => module.domainId === domain.id),
  );
  return (
    <section
      className="learning-dashboard"
      aria-label="Persönliches Lern-Dashboard"
    >
      <div className="section-title">
        <div>
          <h2>Dein nächster Lernschritt</h2>
          <p>Nachvollziehbare Empfehlungen aus deinen bewerteten Antworten.</p>
        </div>
        <button className="text-button" onClick={() => openView("exam")}>
          Übungsprüfung öffnen →
        </button>
      </div>
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      <div className="learning-dashboard-grid">
        <div className="learning-metric">
          <h3>Heute fällig</h3>
          <strong>{dueCards + dueTasks}</strong>
          <p>
            {dueCards} Karteikarten · {dueTasks} Fragen/Rechenaufgaben bis
            Tagesende in deiner Browser-Zeitzone. Karten sind
            Selbsteinschätzung.
          </p>
          <button className="text-button" onClick={() => openView("review")}>
            Karten wiederholen →
          </button>
          <button className="text-button" onClick={() => openView("exercises")}>
            Rechenaufgaben üben →
          </button>
        </div>
        <div className="learning-metric">
          <h3>Wissenslücken pro Thema</h3>
          {topics.filter((topic) => topic.weak).length ? (
            topics
              .filter((topic) => topic.weak)
              .map((topic) => (
                <p key={topic.id}>
                  <strong>{topic.title}</strong>
                  <br />
                  {topic.attempts
                    ? `${topic.correct}/${topic.attempts} bewertete Versuche richtig.`
                    : "Letzte Antwort aus früherem Fortschritt falsch; frühere Versuchszahl unbekannt."}
                </p>
              ))
          ) : (
            <p>
              Noch keine erkannten Wissenslücken. Ohne bewertete Antworten
              bedeutet das nicht, dass alle Themen beherrscht werden.
            </p>
          )}
        </div>
      </div>
      <div className="learning-recommendations">
        <h3>Empfehlungen mit Begründung</h3>
        {!recommended.length && (
          <p>
            Aktuell ist keine zusätzliche Wiederholung empfohlen. Deine nächsten
            Termine bleiben im Plan.
          </p>
        )}
        {topics
          .filter((topic) => topic.priority > 0)
          .slice(0, 3)
          .map((topic) => (
            <div key={topic.id}>
              <h4>{topic.title}</h4>
              <p>{topic.reason}</p>
              <button
                className="text-button"
                onClick={() =>
                  topic.moduleId
                    ? openModule(topic.moduleId)
                    : openView(
                        "exercises",
                        numericTasks.find((task) => task.topicId === topic.id)
                          ?.id,
                      )
                }
              >
                {topic.moduleId
                  ? "Passendes Lernmodul öffnen"
                  : "Passende Rechenaufgabe öffnen"}{" "}
                →
              </button>
            </div>
          ))}
      </div>
      <div className="learning-dashboard-grid">
        <div className="learning-metric">
          <h3>Lernfortschritt je Fachgebiet</h3>
          {activeDomains.map((domain) => {
            const domainModules = modules.filter(
              (module) => module.domainId === domain.id,
            );
            const count = domainModules.filter((module) =>
              moduleRead(progress, module.id, "grundlagen"),
            ).length;
            return (
              <div key={domain.id}>
                <p>
                  {domain.title}: {count}/{domainModules.length} Grundlagen
                  gelesen
                </p>
                <progress
                  value={count}
                  max={domainModules.length}
                  aria-label={`Lesefortschritt ${domain.title}`}
                />
              </div>
            );
          })}
          <details>
            <summary>Weitere Fachgebiete anzeigen</summary>
            {domains
              .filter((domain) => !activeDomains.includes(domain))
              .map((domain) => (
                <p key={domain.id}>
                  {domain.title}: noch keine ausgearbeiteten Lernmodule .
                </p>
              ))}
          </details>
        </div>
        <div className="learning-metric">
          <h3>Zuletzt bearbeitete Module</h3>
          {progress.recentModules.length ? (
            progress.recentModules.map((entry) => (
              <p key={entry.moduleId}>
                <button
                  className="text-button"
                  onClick={() => openModule(entry.moduleId)}
                >
                  {modules.find((module) => module.id === entry.moduleId)
                    ?.title ?? entry.moduleId}
                </button>
                <br />
                <small>
                  {new Date(entry.openedAt).toLocaleString("de-DE")}
                </small>
              </p>
            ))
          ) : (
            <p>Noch kein Modul geöffnet.</p>
          )}
        </div>
      </div>
      <div className="learning-recommendations">
        <h3>Verlauf deiner Übungsprüfungen</h3>
        {progress.activeExam && (
          <p>
            Eine Übungsprüfung läuft. Die Zeit läuft auch außerhalb der
            Prüfungsansicht weiter.
          </p>
        )}
        {progress.examHistory.length ? (
          <ol>
            {progress.examHistory.slice(0, 5).map((result) => (
              <li key={result.id}>
                {new Date(result.finishedAt).toLocaleString("de-DE")} ·{" "}
                {result.scorePercent} % · {result.correctCount}/{result.total}{" "}
                richtig{result.timedOut ? " · Zeitlimit erreicht" : ""}
              </li>
            ))}
          </ol>
        ) : (
          <p>Noch keine abgeschlossene Übungsprüfung.</p>
        )}
        <button className="text-button" onClick={() => openView("exam")}>
          Prüfung und ausführliche Fehleranalyse öffnen →
        </button>
      </div>
      <p className="small-muted">
        Algorithmus: falsche letzte Antwort zuerst, dann zeitlich fällige
        Wiederholung, dann Trefferquote unter 75 %. Richtige Serien verlängern
        Abstände bis 30 Tage; bei Wissenslücken höchstens 3 Tage. Keine
        KI-Diagnose und kein offizieller Kompetenznachweis.
      </p>
    </section>
  );
}
