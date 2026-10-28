import type { NumericTask, ItemAnswer } from "../exercises/model";
import { gradeSnapshot, snapshotItem, expectedSI } from "../exercises/engine";
import { fromSI, toSI, units } from "../../technical/calculations";
export interface ErrorPattern {
  id: string;
  lessonId: string;
  observation: string;
}
/** Nur numerische Übereinstimmungen; keine Behauptung über den tatsächlichen Denkweg. */
export function errorPatterns(
  task: NumericTask,
  answer: ItemAnswer,
): ErrorPattern[] {
  const grade = gradeSnapshot(snapshotItem(task), answer);
  if (grade.status !== "incorrect" || grade.answerSI === undefined) return [];
  const actual = grade.answerSI,
    expected = expectedSI(task);
  const near = (a: number, b: number) =>
    Math.abs(a - b) <=
    Math.max(task.absoluteToleranceSI, Math.abs(b) * task.relativeTolerance);
  const found: ErrorPattern[] = [];
  const add = (id: string, lessonId: string, observation: string) =>
    found.push({ id, lessonId, observation });
  const value = (id: string) => {
    const g = task.givens.find((g) => g.id === id);
    return g ? toSI(g.value, g.unit, g.quantity) : NaN;
  };
  const raw = fromSI(actual, answer.unit, task.quantity);
  const other = units[task.quantity].find(
    (u) => u !== answer.unit && near(raw, fromSI(expected, u, task.quantity)),
  );
  if (other)
    add(
      "unit-selection",
      "math-units",
      `Dein Zahlenwert passt zum Sollwert in ${other}, ausgewählt ist ${answer.unit}. Das ist ein Hinweis auf eine mögliche Einheitenverwechslung; der Rechenweg ist unbekannt.`,
    );
  if (
    ["circle-area", "cylinder-volume"].includes(task.calculation) &&
    (near(actual, expected * 4) || near(actual, expected / 4))
  )
    add(
      "radius-diameter",
      "math-geometry",
      "Das Ergebnis unterscheidet sich um den Faktor vier. Das passt beispielsweise zu einer Verwechslung von Radius und Durchmesser; andere Rechenwege sind ebenfalls möglich.",
    );
  if (task.calculation === "ac-rms" && near(actual, value("peak")))
    add(
      "peak-rms",
      "electric-ac-wave",
      "Deine Antwort stimmt mit dem gegebenen Scheitelwert überein. Gefragt ist der Effektivwert eines reinen Sinus. Prüfe den Faktor √2; eine bestimmte Fehlerursache ist damit nicht bewiesen.",
    );
  if (
    task.calculation === "ac-real" &&
    near(actual, value("voltage") * value("current"))
  )
    add(
      "apparent-real",
      "electric-ac-power",
      "Die Antwort passt zum Produkt UI, also zur Scheinleistung im Modell. Für Wirkleistung ist zusätzlich der Verschiebungsfaktor nötig. Das ist eine mögliche Erklärung, keine sichere Diagnose.",
    );
  if (
    task.calculation === "ac-three-power" &&
    near(actual, expected / Math.sqrt(3))
  )
    add(
      "line-phase",
      "electric-three-phase",
      "Die Antwort entspricht der einphasigen Rechnung ohne √3. Prüfe, ob Leiter- und Stranggrößen korrekt zugeordnet sind. Dein tatsächlicher Rechenweg ist nicht bekannt.",
    );
  if (
    task.calculation === "volume-to-mass" &&
    near(actual, value("volumeFlow"))
  )
    add(
      "mass-volume",
      "thermo-states",
      "Die Zahl entspricht dem Volumenstrom in m³/s. Ein Massenstrom benötigt zusätzlich die Dichte am selben Zustand. Das Zahlenmuster ist ein Hinweis, keine bewiesene Ursache.",
    );
  if (task.calculation === "math-fraction-add") {
    const wrong = (value("n1") + value("n2")) / (value("d1") + value("d2"));
    if (near(actual, wrong))
      add(
        "fraction-add",
        "math-fractions",
        "Die Antwort entspricht dem getrennten Addieren der Zähler und Nenner. Bei der Addition müssen die Teilgrößen zuerst gleichnamig sein; der Zahlenvergleich beweist den Denkweg nicht.",
      );
  }
  if (expected !== 0 && near(actual, -expected))
    add(
      "sign",
      "math-arithmetic",
      "Der Betrag stimmt, aber das Vorzeichen ist entgegengesetzt. Prüfe die Vorzeichen und die Richtung der gesuchten Änderung; die Ursache bleibt offen.",
    );
  if (
    !found.length &&
    expected !== 0 &&
    [0.001, 0.01, 0.1, 10, 100, 1000, 1e6].some((f) =>
      near(actual, expected * f),
    )
  )
    add(
      "power-of-ten",
      "math-units",
      "Die Abweichung entspricht einer Zehnerpotenz. Prüfe Vorsilben und Umrechnungen; daraus lässt sich kein bestimmter Rechenfehler sicher ableiten.",
    );
  if(task.id === 'workshop-conversion-temperature' && near(actual, task.givens[0].value))
    add('celsius-kelvin','thermo-states','Die Zahl entspricht der gegebenen Celsiusanzeige, ausgewählt ist Kelvin. Bei absoluten Temperaturen ist der Offset 273,15 nötig. Das Zahlenmuster beweist deinen Rechenweg nicht.');
  if(task.id === 'workshop-conversion-difference' && near(actual, expected + 273.15))
    add('temperature-difference-offset','physics-heat','Deine Antwort enthält gegenüber dem Sollwert den Offset 273,15. Bei einer Temperaturdifferenz entfällt dieser Offset; eine Fehlerursache bleibt eine Vermutung.');
  if(task.id === 'workshop-conversion-area' && near(actual, task.givens[0].value * .001))
    add('area-prefix','math-units','Die Zahl passt zur einfachen Längen-Vorsilbenumrechnung statt zum quadrierten Flächenfaktor. Für mm² nach m² gilt (10⁻³)². Der tatsächliche Rechenweg ist unbekannt.');
  if (task.calculation === "ac-factor" && actual > 1)
    add(
      "implausible-factor",
      "electric-ac-power",
      "Ein Leistungsfaktor über eins passt nicht zum hier gewählten aufnehmenden Sinusmodell. Prüfe die Zuordnung P/S; eine Ursache ist nicht sicher bekannt.",
    );
  return found.slice(0, 2);
}
