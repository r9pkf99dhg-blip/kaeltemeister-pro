import type { AcademyProgress } from "../academy/model";
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
  return (
    <section
      className="academy-panel mastery-summary"
      aria-label="Lernziel und Wiedereinstieg"
    >
      <div>
        <h2>
          {m?.mission
            ? "Deine Fachmission fortsetzen"
            : "Dein persönliches Lernziel"}
        </h2>
        <p>
          {m?.session
            ? goalNames[m.session.goal]
            : "Wähle eine überschaubare Mission oder eine freiwillige Lerneinheit."}
        </p>
        {last && (
          <p>
            Zuletzt: {last.independentIds.length} verschiedene Aufgaben ohne
            angebotene Hilfe, {last.improvedIds.length} vorherige Fehler
            verbessert.
          </p>
        )}
      </div>
      <button className="button primary" onClick={open}>
        {m?.mission
          ? "Fachmission fortsetzen"
          : "Mastery und Fachmissionen öffnen"}
      </button>
    </section>
  );
}
