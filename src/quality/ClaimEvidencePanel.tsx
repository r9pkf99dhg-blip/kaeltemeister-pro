import { sources } from "../academy/catalog";
import { deepClaims } from "../academy/deep/claims";
import { sourceEvaluations } from "../academy/deep/sources";
import { claimKindNames, evidenceStatusNames } from "./evidence";
import { MathText } from "../math/Math";
export default function ClaimEvidencePanel({ moduleId }: { moduleId: string }) {
  const entries = deepClaims.filter((c) => c.moduleIds.includes(moduleId));
  if (!entries.length) return null;
  return (
    <details className="claim-evidence">
      <summary>
        Aussagenbelege, Modellgrenzen und Prüfstatus ({entries.length})
      </summary>
      <p>
        Quellenabgleich und Rechentests haben unterschiedliche Aussagekraft.
        Unabhängige menschliche Fachfreigabe ist weiterhin offen.
      </p>
      {entries.map((c) => {
        const source = sources.find((s) => s.id === c.sourceId);
        const evaluation = sourceEvaluations.find(
          (s) => s.sourceId === c.sourceId,
        );
        return (
          <details key={c.id}>
            <summary>
              {c.id} · {claimKindNames[c.kind]}
            </summary>
            <p>
              <MathText text={c.statement} />
            </p>
            <p>
              Fachgebiet: {c.domainId}; Module: {c.moduleIds.join(", ")};
              Formeln: {c.formulaIds.join(", ") || "keine"}.
            </p>
            <p>
              Quelle:{" "}
              {source?.url ? (
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              ) : (
                source?.title
              )}
              . Quellentyp: {evaluation?.type ?? "textbook"}. Zugriff:{" "}
              {source?.access === "consulted"
                ? "tatsächlich eingesehen"
                : "nicht einsehbar"}
              .
            </p>
            <p>Fundstelle und Prüfumfang: {c.section}</p>
            <p>
              Datum: {c.checkedAt}. Nachweise:{" "}
              {c.checks.map((s) => evidenceStatusNames[s]).join(" · ")}.
            </p>
            <p>Annahmen: {c.assumptions}</p>
            <p>Einschränkungen: {c.limitations}</p>
            <p>
              Quelleneignung: {evaluation?.suitability} Aktualität:{" "}
              {evaluation?.currency} Grenzen: {evaluation?.limitations}
            </p>
            <p>
              Widerspruchsabgleich: {evaluation?.conflicts} Menschliche
              Fachfreigabe: offen.
            </p>
          </details>
        );
      })}
    </details>
  );
}
