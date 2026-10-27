import { useState } from "react";
import { reviewRegister, statusNames } from "./register";
export default function QualityPanel() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <details
      className="academy-panel quality-panel"
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>Fachliches Prüfregister und offene Fachabnahme</summary>
      <p>
        Automatische Tests prüfen Zahlen und Struktur. Sie ersetzen keine
        unabhängige menschliche Fachprüfung. Eine solche Freigabe ist für alle
        Inhalte noch offen.
      </p>
      {open && (
        <>
          <label>
            Prüfregister durchsuchen
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Inhalt, Formel oder ID"
            />
          </label>
          <p>
            {reviewRegister.length} Inhalte und Niveaus erfasst. Alle fünf
            Prüfstatus sind vorbereitet; „Unabhängig fachlich geprüft“ wird erst
            mit dokumentierter Fachfreigabe vergeben.
          </p>
          {reviewRegister
            .filter((e) =>
              `${e.id} ${e.title}`
                .toLocaleLowerCase("de")
                .includes(query.toLocaleLowerCase("de")),
            )
            .map((e) => (
              <details key={e.id}>
                <summary>
                  {e.title} · {statusNames[e.status]}
                </summary>
                <p>ID: {e.id}</p>
                <p>{e.scope}</p>
                <p>
                  Formeln: {e.formulaIds.join(", ") || "keine"}. Quellen:{" "}
                  {e.sourceIds.join(", ") || "Aussagenabgleich offen"}.
                </p>
                <p>{e.reference}</p>
                <p>Annahmen: {e.assumptions}</p>
                <p>Mögliche Fehler: {e.risks.join(" ")}</p>
                <p>Offene Prüfung: {e.questions.join(" ")}</p>
              </details>
            ))}
        </>
      )}
    </details>
  );
}
