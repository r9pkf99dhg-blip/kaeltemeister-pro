import { useExplanation } from "../../language/Explanation";
import { simpleCores } from "../../language/core";
import { simpleContent } from "../../language/model";
import ClaimEvidencePanel from "../../quality/ClaimEvidencePanel";
import Diagrams from "../deep/Diagrams";
import { ArrowRight } from "lucide-react";
import { formulas } from "../catalog";
import type { Module, Level } from "../model";
import {
  BlockMath,
  MathText,
  VariableDefinitions,
  SolutionSteps,
} from "../../math/Math";
/** Eine Lesedarstellung für Akademie und Lernbrücke; Inhalte werden nicht kopiert. */
export default function LessonReading({
  module,
  level,
  openCalculator,
  embedded = false,
}: {
  module: Module;
  level: Level;
  openCalculator?: () => void;
  embedded?: boolean;
}) {
  const mode = useExplanation();
  const core = simpleCores.find((c) => c.id === module.id);
  const content =
    mode === "simple" && core
      ? simpleContent(module.levels[level], core, level)
      : module.levels[level];
  const Heading = embedded ? "h3" : "h2";
  const FormulaHeading = embedded ? "h4" : "h3";
  return (
    <>
      {mode === "simple" && !core && (
        <p className="notice">
          Ursprüngliche Darstellung: Für dieses Modul ist die einfache
          Sprachfassung noch nicht ausgearbeitet. Alle Inhalte bleiben
          zugänglich.
        </p>
      )}
      <section>
        <Heading>Einfacher Einstieg</Heading>
        <p>
          <MathText text={content.introduction} />
        </p>
      </section>
      <section>
        <Heading>Fachliche Erklärung</Heading>
        <p>
          <MathText text={content.explanation} />
        </p>
      </section>
      <section>
        <Heading>Technische Zusammenhänge</Heading>
        <p>
          <MathText text={content.connections} />
        </p>
      </section>
      <section>
        <Heading>Formeln und Einheiten</Heading>
        {module.formulaIds.map((id) => {
          const formula = formulas.find((item) => item.id === id)!;
          return (
            <div className="learning-formula" key={id}>
              <FormulaHeading>{formula.title}</FormulaHeading>
              <BlockMath
                tex={formula.tex ?? formula.expression}
                label={formula.expression}
              />
              {formula.variables && (
                <VariableDefinitions variables={formula.variables} />
              )}
              <p>
                <strong>Einheiten:</strong> {formula.units}
              </p>
              <p>
                <strong>Gültigkeit:</strong> {formula.assumptions}
              </p>
              {formula.calculatorId && openCalculator && (
                <button className="text-button" onClick={openCalculator}>
                  Passenden Rechner öffnen <ArrowRight size={16} />
                </button>
              )}
            </div>
          );
        })}
      </section>
      {content.derivation && (
        <section>
          <Heading>Warum funktioniert das? Schrittweise Herleitung</Heading>
          <SolutionSteps steps={content.derivation} />
        </section>
      )}
      <section>
        <Heading>Durchgerechnetes Praxisbeispiel</Heading>
        <p>
          <MathText text={content.example} />
        </p>
      </section>
      <section>
        <Heading>Typische Fehler</Heading>
        <ul>
          {content.mistakes.map((mistake) => (
            <li key={mistake}>
              <MathText text={mistake} />
            </li>
          ))}
        </ul>
      </section>
      <ClaimEvidencePanel moduleId={module.id} />
      <Diagrams moduleId={module.id} />
      <section className="takeaway">
        <Heading>Zusammenfassung</Heading>
        <p>
          <MathText text={content.summary} />
        </p>
      </section>
    </>
  );
}
