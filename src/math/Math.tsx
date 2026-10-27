import { optionNotation } from "./notation";
import { useMemo, type ReactNode } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import "katex/contrib/mhchem";

export function MathFormula({
  tex,
  display = false,
  label,
}: {
  tex: string;
  display?: boolean;
  label?: string;
}) {
  const rendered = useMemo(() => {
    try {
      if (typeof tex !== "string" || tex.length > 4096)
        throw new Error("Formel zu lang");
      return {
        html: katex.renderToString(tex, {
          displayMode: display,
          throwOnError: true,
          trust: false,
          strict: "ignore",
          maxExpand: 200,
          maxSize: 20,
          output: "htmlAndMathml",
        }),
        error: false,
      };
    } catch {
      return { html: "", error: true };
    }
  }, [tex, display]);
  // Nur von KaTeX erzeugtes HTML; niemals Benutzereingaben als HTML übernehmen.
  return rendered.error ? (
    <span className="math-error">
      Formel nicht darstellbar: <code>{String(tex)}</code>
    </span>
  ) : (
    <span
      className={display ? "math-display" : "math-inline"}
      tabIndex={display ? 0 : undefined}
      role={label ? "math" : undefined}
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: rendered.html }}
    />
  );
}
export const InlineMath = ({ tex, label }: { tex: string; label?: string }) => (
  <MathFormula tex={tex} label={label} />
);
export const BlockMath = ({ tex, label }: { tex: string; label?: string }) => (
  <MathFormula tex={tex} label={label} display />
);
/** Nur explizit markierte Mathematik: \( inline \), \[ abgesetzt \]. Normale Schrägstriche bleiben Text. */
export function MathText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let start = 0;
  for (const match of text.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)) {
    parts.push(text.slice(start, match.index));
    parts.push(
      <MathFormula
        key={match.index}
        tex={match[1] ?? match[2]}
        display={match[2] !== undefined}
      />,
    );
    start = match.index! + match[0].length;
  }
  parts.push(text.slice(start));
  return <>{parts}</>;
}
export function FormulaBox({
  title,
  tex,
  children,
}: {
  title: string;
  tex: string;
  children?: ReactNode;
}) {
  return (
    <section className="learning-formula">
      <h3>{title}</h3>
      <BlockMath tex={tex} />
      {children}
    </section>
  );
}
export function VariableDefinitions({
  variables,
}: {
  variables: { symbol: string; meaning: string; unit: string }[];
}) {
  return (
    <dl className="math-variables">
      {variables.map((v) => (
        <div key={v.symbol}>
          <dt>
            <InlineMath tex={v.symbol} />
          </dt>
          <dd>
            {v.meaning} · {v.unit}
          </dd>
        </div>
      ))}
    </dl>
  );
}
export function SolutionSteps({
  steps,
  collapsible = false,
}: {
  steps: string[];
  collapsible?: boolean;
}) {
  return (
    <ol>
      {steps.map((step, index) => (
        <li key={`${index}-${step}`}>
          <>
            {collapsible ? (
              <details open={index === 0}>
                <summary>Schritt {index + 1}</summary>
                <MathText text={step} />
              </details>
            ) : (
              <MathText text={step} />
            )}
          </>
        </li>
      ))}
    </ol>
  );
}

/** Explizite Notation bekannter Antworttexte; der ursprüngliche Text bleibt das zugängliche Label. */
export function OptionMath({ text }: { text: string }) {
  const tex = optionNotation[text];
  return tex ? <InlineMath tex={tex} label={text} /> : <MathText text={text} />;
}
