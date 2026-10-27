import { MathText } from "../../math/Math";
import { useState, type Dispatch, type SetStateAction } from "react";
import { flashcards, modules } from "../catalog";
import type { AcademyProgress } from "../model";
import { dueCards, reviewCard } from "../progress";

export default function ReviewCards({
  progress,
  setProgress,
  moduleId,
}: {
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  moduleId?: string;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<"due" | "all">("due");
  const [notice, setNotice] = useState("");
  const cards =
    mode === "due"
      ? dueCards(progress, new Date(), moduleId)
      : flashcards.filter((card) => !moduleId || card.moduleId === moduleId);
  const card = cards[index % Math.max(cards.length, 1)];
  function rate(remembered: boolean) {
    if (!card || !flipped) return;
    const next = reviewCard(progress, card.id, remembered);
    const review = next.reviews[card.id];
    setProgress(next);
    setNotice(
      remembered
        ? `Gespeichert. Wiederholung in ${review.intervalDays} ${review.intervalDays === 1 ? "Tag" : "Tagen"}.`
        : "Gespeichert. Diese Karte bleibt heute fällig.",
    );
    setFlipped(false);
    // In der Fällig-Liste verschwindet eine gewusste Karte: Index beibehalten.
    setIndex((current) =>
      remembered && mode === "due" ? current : current + 1,
    );
  }
  return (
    <div className="review-cards">
      <p>
        Erst selbst antworten, dann umdrehen und ehrlich bewerten. „Gewusst“
        plant normalerweise nach 1, 3, 7, 14 und danach jeweils 30 Tagen. Bei
        erkannten Wissenslücken im Thema werden Abstände auf höchstens 3 Tage
        begrenzt. „Nochmal“ setzt die Karte auf heute zurück. Einfache
        Lernhilfe, kein Nachweis fachlicher Beherrschung.
      </p>
      <div className="academy-toolbar">
        <label htmlFor={`cards-${moduleId ?? "all"}`}>Karten anzeigen</label>
        <select
          id={`cards-${moduleId ?? "all"}`}
          value={mode}
          onChange={(event) => {
            setMode(event.target.value as "due" | "all");
            setIndex(0);
            setFlipped(false);
          }}
        >
          <option value="due">Jetzt fällig</option>
          <option value="all">Alle Karten freiwillig üben</option>
        </select>
        <span>
          {cards.length} {mode === "due" ? "fällig" : "insgesamt"}
        </span>
      </div>
      {notice && (
        <p role="status" className="card-saved">
          {notice}
        </p>
      )}
      {card ? (
        <div className="flashcard" key={card.id}>
          <p className="eyebrow">
            {modules.find((module) => module.id === card.moduleId)?.title} ·{" "}
            {(index % cards.length) + 1} / {cards.length}
          </p>
          <span className="pill">{flipped ? "Rückseite" : "Vorderseite"}</span>
          <h3><MathText text={card.front} /></h3>
          {flipped && <p className="flashcard-back"><MathText text={card.back} /></p>}
          <button
            className="button primary"
            aria-expanded={flipped}
            onClick={() => setFlipped((value) => !value)}
          >
            {flipped ? "Vorderseite zeigen" : "Antwort zeigen"}
          </button>
          <div className="card-rating">
            <button
              className="button secondary"
              disabled={!flipped}
              onClick={() => rate(false)}
            >
              Nochmal
            </button>
            <button
              className="button primary"
              disabled={!flipped}
              onClick={() => rate(true)}
            >
              Gewusst
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h3>Für jetzt geschafft.</h3>
          <p>
            Aktuell sind keine Karten fällig. Du kannst alle Karten freiwillig
            üben oder später zurückkommen.
          </p>
        </div>
      )}
    </div>
  );
}
