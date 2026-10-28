import { goalNames } from "./model";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import type { AcademyProgress } from "../academy/model";
import { domains } from "../academy/catalog";
import { learningItems } from "../academy/exercises/items";
import { recommendations } from "../academy/adaptive/algorithm";
import {
  badges,
  beginSession,
  finishSession,
  pauseSession,
  domainStages,
  competencyStages,
} from "./engine";
import { emptyMastery, type MotivationMode, type LearningGoal } from "./model";
export default function MasteryHub({
  progress,
  setProgress,
  practice,
  children,
}: {
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  practice: (id: string) => void;
  children?: ReactNode;
}) {
  const m = progress.mastery ?? emptyMastery();
  const [clock, setClock] = useState(Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setClock(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);
  const change = (patch: Partial<typeof m>) =>
    setProgress((p) => ({
      ...p,
      mastery: { ...(p.mastery ?? emptyMastery()), ...patch },
    }));
  const allBadges = badges(progress).filter((b) =>
    b.tasks.every((id) => learningItems.some((i) => i.id === id)),
  );
  const recommendation = recommendations(progress, new Date(clock)).find(
    (r) => r.priority > 0,
  );
  const next = learningItems.find((i) => i.topicId === recommendation?.id);
  const session = m.session;
  const activeMinutes = session
    ? (clock -
        Date.parse(session.startedAt) -
        session.pauseMs -
        (session.pausedAt ? clock - Date.parse(session.pausedAt) : 0)) /
      60000
    : 0;
  return (
    <section className={`mastery mastery-${m.motivation}`}>
      <h1>KälteMeister Mastery</h1>
      <p>
        Deine fachlichen Lernziele, freiwillige Missionen und beobachtbare
        Fortschritte. Keine offiziellen Zertifikate und keine Bewertung deiner
        Intelligenz.
      </p>
      <details className="academy-panel">
        <summary>Motivation und Fokus selbst wählen</summary>
        <label>
          Motivationsfunktionen
          <select
            aria-label="Motivationsfunktionen"
            value={m.motivation}
            onChange={(e) =>
              change({ motivation: e.target.value as MotivationMode })
            }
          >
            <option value="enabled">Aktiviert</option>
            <option value="reduced">Reduziert</option>
            <option value="disabled">Deaktiviert</option>
          </select>
        </label>
        <p>
          Reduziert unterdrückt Erfolgsanimationen. Deaktiviert blendet
          Abzeichen aus. Fachliche Inhalte, Missionen und Fortschrittsnachweise
          bleiben immer frei zugänglich.
        </p>
        <label className="mastery-check">
          <input
            type="checkbox"
            checked={m.focus}
            onChange={(e) => change({ focus: e.target.checked })}
          />
          Freiwillige Fokusansicht
        </label>
        <p>
          Weniger dekorative Inhalte, klare nächste Schritte. Jederzeit
          verlassbar; individuell wählbare Ergonomie, keine medizinische
          Aussage.
        </p>
      </details>
      <section className="academy-panel" aria-label="Freiwillige Lerneinheit">
        <h2>Eine passende Lerneinheit</h2>
        <label>
          Persönliches Lernziel
          <select
            aria-label="Persönliches Lernziel"
            value={m.goal}
            onChange={(e) => change({ goal: e.target.value as LearningGoal })}
          >
            {Object.entries(goalNames).map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Zeitorientierung in Minuten
          <input
            aria-label="Zeitorientierung in Minuten"
            type="number"
            min="5"
            max="90"
            step="5"
            value={m.minutes}
            onChange={(e) => {
              const minutes = Number(e.target.value);
              if (Number.isInteger(minutes) && minutes >= 5 && minutes <= 90)
                change({ minutes });
            }}
          />
        </label>
        <p>
          5–10 Minuten kurz, 20–30 Minuten fokussiert oder 40–60 Minuten
          vertieft sind unverbindliche Beispiele. Kein Mindestpensum, keine
          Belohnung für Bildschirmzeit.
        </p>
        {!session ? (
          <button
            className="button primary"
            onClick={() =>
              setProgress((p) => beginSession(p, m.goal, m.minutes))
            }
          >
            Lerneinheit beginnen
          </button>
        ) : (
          <>
            <p>
              {session.pausedAt
                ? "Lerneinheit pausiert."
                : "Lerneinheit aktiv."}{" "}
              Dein Entwurf und die bewerteten Aufgaben bleiben gespeichert.
            </p>
            <div className="mastery-actions">
              <button
                className="button secondary"
                onClick={() => setProgress((p) => pauseSession(p))}
              >
                {session.pausedAt ? "Lerneinheit fortsetzen" : "Pause einlegen"}
              </button>
              <button
                className="button primary"
                onClick={() => setProgress((p) => finishSession(p))}
              >
                Lerneinheit abschließen
              </button>
            </div>
            {activeMinutes >= session.minutes && !session.pausedAt && (
              <p className="notice">
                Dein gewählter Zeitrahmen ist erreicht. Wenn du möchtest, lege
                eine Pause ein oder schließe die Einheit ab. Es entstehen keine
                Strafpunkte.
              </p>
            )}
          </>
        )}
        {recommendation && next && (
          <div className="notice">
            <h3>Nachvollziehbarer Übungsvorschlag</h3>
            <p>
              {recommendation.title}: {recommendation.reason}
            </p>
            <button
              className="button secondary"
              onClick={() => practice(next.id)}
            >
              Vorgeschlagene Aufgabe üben
            </button>
            <p>
              Du kannst stattdessen jede andere Aufgabe oder Mission wählen.
            </p>
          </div>
        )}
      </section>
      {children}
      <section className="academy-panel">
        <h2>Was deine bisherigen Aktivitäten zeigen</h2>
        <p>
          Lesen heißt kennengelernt; mehrere aktuelle Aufgaben ohne angebotene
          Hilfe zeigen selbstständige Anwendung. Freie Erklärungen bleiben ohne
          Fachprüfung Selbstkontrolle.
        </p>
        <div className="mastery-domains">
          {domainStages(progress).map((d) => (
            <div key={d.id}>
              <h3>{domains.find((x) => x.id === d.id)?.title}</h3>
              <strong>{d.stage}</strong>
              <p>
                {d.assessed} verschiedene Aufgaben bearbeitet · {d.independent}{" "}
                ohne Hilfe bestätigt · {d.transfer} Transferaufgaben.
              </p>
              {d.spaced > 0 && <p>{d.spaced} zeitversetzt erneut bestätigt.</p>}
            </div>
          ))}
        </div>
        <details>
          <summary>Gemeinsame Kompetenzziele und Nachweisgrenzen</summary>
          {competencyStages(progress).map((c) => (
            <p key={c.id}>
              <strong>{c.title}:</strong> {c.stage} · {c.independent} aktuelle
              Aufgaben ohne Hilfe.
            </p>
          ))}
          <p>
            Unbekannt bedeutet nicht schwach. Bei geänderten Aufgabenrevisionen
            müssen die neuen Anforderungen erneut bestätigt werden. Diese Stufen
            sind keine umfassende berufliche Qualifikation.
          </p>
        </details>
      </section>
      {m.motivation !== "disabled" && (
        <section
          className="academy-panel"
          aria-label="Fachliche Lernmeilensteine"
        >
          <h2>Fachliche Lernmeilensteine</h2>
          <p>
            Einmalige Anerkennung klarer Leistungen, keine Punkte für Öffnen
            oder Zeit und keine offiziellen Zertifikate.
          </p>
          {allBadges.map((b) => (
            <details key={b.id} className={b.earned ? "mastery-success" : ""}>
              <summary>
                {b.earned ? "Erreicht" : "Offen"}: {b.title}
              </summary>
              <p>{b.criteria}</p>
              <p>
                {b.confirmed} von {b.tasks.length} konkreten Nachweisen
                vorhanden. Keine Aussage über unbekannte Aufgaben.
              </p>
              {b.tasks.map((id) => (
                <button
                  key={id}
                  className="text-button"
                  onClick={() => practice(id)}
                >
                  {learningItems.find((i) => i.id === id)?.title} üben
                </button>
              ))}
            </details>
          ))}
        </section>
      )}
      {m.history.length > 0 && (
        <section
          className="academy-panel"
          aria-label="Ergebnisse deiner Lerneinheiten"
        >
          <h2>Deine erreichten Lernschritte</h2>
          {m.history.map((h) => (
            <details key={h.id}>
              <summary>
                {new Date(h.finishedAt).toLocaleDateString("de-DE")} ·{" "}
                {goalNames[h.goal]}
              </summary>
              <p>
                {h.independentIds.length} verschiedene Aufgaben selbstständig,{" "}
                {h.hintIds.length} mit Hinweis und {h.workedIds.length} nach
                Musterlösung gelöst. {h.improvedIds.length} frühere Fehler
                verbessert; {h.transferIds.length} Transferaufgaben ohne
                angebotene Hilfe.
              </p>
              <h3>Das hast du angewendet</h3>
              <ul>
                {h.independentIds.map((id) => (
                  <li key={id}>
                    {learningItems.find((i) => i.id === id)?.title ?? id}
                  </li>
                ))}
              </ul>
              {!h.independentIds.length && (
                <p>
                  In dieser Einheit ist noch keine selbstständige richtige
                  Lösung dokumentiert. Das ist kein Urteil über dein Wissen.
                </p>
              )}
              <p>
                Nächster Schritt: passende Wiederholung oder frei gewählte
                Mission; freies Erklären anhand der Musterkriterien prüfen.
              </p>
            </details>
          ))}
        </section>
      )}
    </section>
  );
}
