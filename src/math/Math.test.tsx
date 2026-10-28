import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  BlockMath,
  MathText,
  FormulaBox,
  VariableDefinitions,
  SolutionSteps,
} from "./Math";
import { formulas } from "../academy/catalog";
it("rendert echte Brüche, Wurzeln, Potenzen, Vektoren und chemische Formeln", () => {
  const { container } = render(
    <>
      <BlockMath
        tex={String.raw`\frac{U}{I}+\sqrt{x^2}+\vec F+\sum_{i=1}^n i+\int_0^1 x\,dx`}
      />
      <BlockMath tex={String.raw`\ce{CO2 + H2O}`} />
    </>,
  );
  expect(container.querySelector("mfrac")).toBeTruthy();
  expect(container.querySelector("msqrt")).toBeTruthy();
  expect(container.querySelectorAll(".katex")).toHaveLength(2);
  expect(container.querySelector(".math-error")).toBeNull();
});
it("rendert mehrzeilige und verschachtelte Ausdrücke und alle alten Registerformeln", () => {
  const { container } = render(
    <>
      <BlockMath
        tex={String.raw`\begin{aligned}R&=\frac{1}{\frac1{R_1}+\frac1{R_2}}\\U&=RI\end{aligned}`}
      />
      {formulas.map((f) => (
        <BlockMath key={f.id} tex={f.tex!} />
      ))}
    </>,
  );
  expect(formulas.every((f) => !!f.tex)).toBe(true);
  expect(container.querySelector(".math-error")).toBeNull();
});
it("fängt ungültige und zu lange Syntax ab und lässt HTML oder externe Links nicht zu", () => {
  const { container } = render(
    <>
      <BlockMath tex={"\\frac{"} />
      <BlockMath tex={"x".repeat(4100)} />
      <BlockMath tex={String.raw`\href{javascript:alert(1)}{x}`} />
    </>,
  );
  expect(
    container.querySelectorAll(".math-error").length,
  ).toBeGreaterThanOrEqual(2);
  expect(container.querySelector("a")).toBeNull();
});
it("interpretiert nur ausdrücklich markierte Formeln, keine Textschrägstriche", () => {
  const { container } = render(
    <MathText
      text={String.raw`iPad/iPhone; kg/s. \(R=\frac U I\) und \[U=RI\]`}
    />,
  );
  expect(container.textContent).toContain("iPad/iPhone; kg/s.");
  expect(container.querySelectorAll(".katex")).toHaveLength(2);
});
it("stellt Formelkästen, Variablen und Lösungsschritte zugänglich bereit", () => {
  render(
    <FormulaBox title="Widerstand" tex={String.raw`R=\frac U I`}>
      <VariableDefinitions
        variables={[{ symbol: "R", meaning: "Widerstand", unit: "Ω" }]}
      />
      <SolutionSteps steps={[String.raw`Beide Seiten durch \(I\) teilen.`]} />
    </FormulaBox>,
  );
  expect(
    screen.getByRole("heading", { name: "Widerstand" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Widerstand · Ω")).toBeInTheDocument();
});

it("Migrierte Musterlösungen aller 24 bisherigen Aufgaben haben gültigen Formelsatz", async () => {
  const { solutionNotation } = await import("./legacy-solutions");
  const { numericTasks } = await import("../academy/exercises/data");
  expect(Object.keys(solutionNotation)).toHaveLength(24);
  const { container } = render(
    <>
      {numericTasks.map((task) => (
        <SolutionSteps key={task.id} steps={task.texSteps ?? task.steps} />
      ))}
    </>,
  );
  expect(container.querySelector(".math-error")).toBeNull();
});

it("zeigt ausdrücklich zugeordnete Bruchantworten als echte Brüche und lässt normale Textschrägstriche unverändert", async () => {
  const { OptionMath } = await import("./Math");
  const { container } = render(
    <>
      <OptionMath text="3/4" />
      <OptionMath text="iPad/iPhone" />
    </>,
  );
  expect(container.querySelector("mfrac")).toBeTruthy();
  expect(container.textContent).toContain("iPad/iPhone");
  expect(screen.getByRole("math", { name: "3/4" })).toBeInTheDocument();
});

for (const level of ["grundlagen", "fachkraft", "meister"] as const) {
  it(`rendert alle Modultexte auf Niveau ${level} ohne Syntaxfehler`, async () => {
    const { modules } = await import("../academy/catalog");
    const texts = modules.flatMap((m) =>
      Object.values(m.levels[level])
        .flat()
        .filter((v): v is string => typeof v === "string"),
    );
    const { container } = render(
      <>
        {texts.map((text, i) => (
          <MathText key={i} text={text} />
        ))}
      </>,
    );
    expect(container.querySelector(".math-error")).toBeNull();
  });
}
it("alle kuratierten Antwortnotationen bleiben darstellbar", async () => {
  const { OptionMath } = await import("./Math");
  const { optionNotation } = await import("./notation");
  const { container } = render(
    <>
      {Object.keys(optionNotation).map((text) => (
        <OptionMath key={text} text={text} />
      ))}
    </>,
  );
  expect(container.querySelector(".math-error")).toBeNull();
});
it("rendert neue Variablen, Fragen und Rückmeldungen auch mit expliziten TeX-Antworten", async () => {
  const { academyQuestions } = await import("../academy/catalog");
  const { container } = render(
    <>
      {formulas
        .filter((f) => f.variables)
        .map((f) => (
          <VariableDefinitions key={f.id} variables={f.variables!} />
        ))}
      {academyQuestions
        .flatMap((q) => [
          q.prompt,
          q.explanation,
          ...q.options.map((o) => o.text),
        ])
        .map((text, i) => (
          <MathText key={i} text={text} />
        ))}
    </>,
  );
  expect(container.querySelector(".math-error")).toBeNull();
});
