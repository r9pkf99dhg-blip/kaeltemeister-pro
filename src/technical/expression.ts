/** Begrenzte reelle Arithmetik: keine Namen, Funktionen, Einheiten oder Codeausführung. */
export function parseArithmetic(input: string): number {
  if (input.length > 200)
    throw new Error("Der Ausdruck darf höchstens 200 Zeichen haben.");
  const text = input.trim().replaceAll(",", ".");
  let i = 0,
    depth = 0,
    tokens = 0;
  const fail = () => {
    throw new Error(
      "Bitte eine Zahl oder einen Ausdruck mit + − * / ^ und Klammern eingeben. Keine Tausendertrenner oder Einheiten im Zahlenfeld.",
    );
  };
  const finite = (n: number) => {
    if (!Number.isFinite(n)) throw new Error("Nicht endlicher Rechenschritt.");
    return n;
  };
  const skip = () => {
    while (/\s/.test(text[i] ?? "") && i < text.length) i++;
  };
  const eat = (c: string) => {
    skip();
    if (text[i] === c) {
      i++;
      if (++tokens > 80) throw new Error("Zu viele Rechenschritte.");
      return true;
    }
    return false;
  };
  function primary(): number {
    skip();
    if (++depth > 20) throw new Error("Zu viele verschachtelte Klammern.");
    let value: number;
    if (eat("(")) {
      value = add();
      if (!eat(")")) fail();
    } else {
      const m = text
        .slice(i)
        .match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);
      if (!m) return fail();
      i += m[0].length;
      if (++tokens > 80) throw new Error("Zu viele Zahlen.");
      value = finite(Number(m[0]));
      if (value === 0 && /[1-9]/.test(m[0].split(/[eE]/)[0]))
        throw new Error("Zahl zu klein für den endlichen Rechenbereich.");
    }
    depth--;
    return value;
  }
  function power(): number {
    const base = primary();
    if (eat("^")) {
      const exponent = unary();
      if (
        !Number.isInteger(exponent) ||
        Math.abs(exponent) > 12 ||
        (base === 0 && exponent <= 0)
      )
        throw new Error(
          "Potenzen: ganzzahliger Exponent von −12 bis 12; 0 hoch 0 und Nullnenner sind nicht zugelassen.",
        );
      const r = finite(base ** exponent);
      if (r === 0 && base !== 0) throw new Error("Numerischer Unterlauf.");
      return r;
    }
    return base;
  }
  function unary(): number {
    if (eat("+")) return unary();
    if (eat("-") || eat("−")) return -unary();
    return power();
  }
  function multiply(): number {
    let v = unary();
    while (true) {
      if (eat("*") || eat("×") || eat("·")) {
        const d = unary();
        const r = finite(v * d);
        if (r === 0 && v !== 0 && d !== 0)
          throw new Error("Numerischer Unterlauf.");
        v = r;
      } else if (eat("/") || eat(":")) {
        const d = unary();
        if (d === 0) throw new Error("Division durch null.");
        const r = finite(v / d);
        if (r === 0 && v !== 0) throw new Error("Numerischer Unterlauf.");
        v = r;
      } else return v;
    }
  }
  function add(): number {
    let v = multiply();
    while (true) {
      if (eat("+")) v = finite(v + multiply());
      else if (eat("-") || eat("−")) v = finite(v - multiply());
      else return v;
    }
  }
  if (!text) fail();
  const result = add();
  skip();
  if (i !== text.length) fail();
  return finite(result);
}
