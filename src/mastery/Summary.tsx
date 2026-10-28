import type { AcademyProgress } from "../academy/model";
import { learningItems } from "../academy/exercises/items";
import { recommendedMission, missions, missionStatus } from "./missions";
import { goalNames } from "./model";
export function MasterySummary({
  progress,
  open,
}: {
  progress: AcademyProgress;
  open: () => void;
}) {
  const m = progress.mastery,
    last = m?.history[0];
  const current = missions.find(
    (x) => x.id === m?.mission?.id && x.revision === m.mission.revision,
  );
  const resume = current && !missionStatus(progress, current).complete;
  const next = recommendedMission(progress);
  const improved = last?.improvedIds[0];
  return (
    <section
      className="academy-panel mastery-summary"
      aria-label="Lernziel und Wiedereinstieg"
    >
      <div>
        <h2>
          {resume
            ? "Deine Fachmission fortsetzen"
            : "Dein nächster sinnvoller Lernschritt"}
        </h2>
        <p>
          <strong>{resume ? current.title : next.mission.title}</strong>:{" "}
          {resume
            ? "Deine zuletzt gespeicherte Schrittposition bleibt erhalten."
            : next.reason}
        </p>
        {m?.session && (
          <p>Aktuelles freiwilliges Ziel: {goalNames[m.session.goal]}.</p>
        )}
        {last && (
          <p>
            Zuletzt: {last.independentIds.length} verschiedene Aufgaben ohne
            angebotene Hilfe, {last.improvedIds.length} vorherige Fehler
            verbessert.
          </p>
        )}
        {improved && (
          <p>
            Letzter dokumentiert verbesserter Fehler:{" "}
            {learningItems.find((i) => i.id === improved)?.title ?? improved}.
          </p>
        )}
      </div>
      <button className="button primary" onClick={open}>
        {resume ? "Fachmission fortsetzen" : "Mastery und Fachmissionen öffnen"}
      </button>
    </section>
  );
}
