/** Geprüfte SI-Lehrmodelle; verwendbar von Aufgaben und späteren Rechnern. Kein eval/CAS. */
export const deepKinds = [
 "heat-cp", "dc-power-i2r", "dc-power-u2r", "cylinder-total-surface", "ac-reactive-capacitive",
  "pressure-absolute",
  "specific-volume",
  "volume-to-mass",
  "latent-heat",
  "conduction",
  "thermal-resistance",
  "layered-conduction",
  "overall-u",
  "cycle-condenser",
  "ac-period",
  "ac-rms",
  "ac-xl",
  "ac-xc",
  "ac-impedance",
  "ac-apparent",
  "ac-real",
  "ac-reactive",
  "ac-factor",
  "ac-star-voltage",
  "ac-delta-current",
  "ac-three-power",
  "circle-area",
  "annulus-area",
  "cylinder-volume",
  "cylinder-surface",
  "pythagoras",
  "triangle-side",
  "slope-angle",
  "linear-system-x",
  "quadratic-larger-root",
  "interpolation",
  "logarithm",
] as const;
export type DeepKind = (typeof deepKinds)[number];
export function calculateDeep(
  kind: DeepKind,
  values: Record<string, number>,
): number {
  const n = (id: string) => {
    const v = values[id];
    if (!Number.isFinite(v))
      throw new Error("Fehlender oder nicht endlicher Wert.");
    return v;
  };
  const p = (id: string, zero = false) => {
    const v = n(id);
    if (v < 0 || (!zero && v === 0))
      throw new Error("Positive Größe erforderlich.");
    return v;
  };
  const div = (a: number, b: number) => {
    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0)
      throw new Error("Nicht endlicher Zwischenschritt oder Nullnenner.");
    return a / b;
  };
  let r: number;
  switch (kind) {
    case "heat-cp":r=div(p('heat'),p('massFlow')*p('deltaT'));break;
    case "dc-power-i2r":r=p('current',true)**2*p('resistance');break;
    case "dc-power-u2r":r=div(p('voltage',true)**2,p('resistance'));break;
    case "cylinder-total-surface":r=calculateDeep('cylinder-surface',values)+2*calculateDeep('circle-area',values);break;
    case "ac-reactive-capacitive":r=-calculateDeep('ac-reactive',values);break;
    case "pressure-absolute":
      r = p("gauge", true) + p("ambient");
      break;
    case "specific-volume":
      r = 1 / p("density");
      break;
    case "volume-to-mass":
      r = p("density") * p("volumeFlow", true);
      break;
    case "latent-heat":
      r = p("mass", true) * p("latent");
      break;
    case "conduction":
      r = (p("conductivity") * p("area") * p("deltaT", true)) / p("thickness");
      break;
    case "thermal-resistance":
      r = div(p("thickness"), p("conductivity") * p("area"));
      break;
    case "layered-conduction":
      r = div(
        p("area") * p("deltaT", true),
        div(p("d1"), p("lambda1")) + div(p("d2"), p("lambda2")),
      );
      break;
    case "overall-u":
      r = div(
        1,
        div(1, p("inside")) +
          div(p("d1"), p("lambda1")) +
          div(p("d2"), p("lambda2")) +
          div(1, p("outside")),
      );
      break;
    case "cycle-condenser":
      r = p("coolingPower", true) + p("fluidPower", true);
      break;
    case "ac-period":
      r = 1 / p("frequency");
      break;
    case "ac-rms":
      r = p("peak", true) / Math.SQRT2;
      break;
    case "ac-xl":
      r = 2 * Math.PI * p("frequency") * p("inductance");
      break;
    case "ac-xc":
      r = div(1, 2 * Math.PI * p("frequency") * p("capacitance"));
      break;
    case "ac-impedance":
      r = Math.hypot(p("resistance", true), p("xl", true) - p("xc", true));
      break;
    case "ac-apparent":
      r = p("voltage", true) * p("current", true);
      break;
    case "ac-real":
    case "ac-reactive":
    case "ac-three-power": {
      const f = p("factor", true);
      if (f > 1) throw new Error("Leistungsfaktor außerhalb 0 bis 1.");
      r =
        p("voltage", true) *
        p("current", true) *
        (kind === "ac-reactive" ? Math.sqrt((1 - f) * (1 + f)) : f) *
        (kind === "ac-three-power" ? Math.sqrt(3) : 1);
      break;
    }
    case "ac-factor":
      r = p("power", true) / p("apparent");
      if (r > 1)
        throw new Error(
          "Wirkleistung über Scheinleistung passt nicht zum Modell.",
        );
      break;
    case "ac-star-voltage":
      r = Math.sqrt(3) * p("phaseVoltage", true);
      break;
    case "ac-delta-current":
      r = Math.sqrt(3) * p("phaseCurrent", true);
      break;
    case "circle-area":
      r = (Math.PI * p("diameter", true) ** 2) / 4;
      break;
    case "annulus-area": {
      const d = p("outer"),
        i = p("inner", true);
      if (i >= d) throw new Error("Innendurchmesser muss kleiner sein.");
      r = (Math.PI * (d - i) * (d + i)) / 4;
      break;
    }
    case "cylinder-volume":
      r = (Math.PI * p("diameter") ** 2 * p("length")) / 4;
      break;
    case "cylinder-surface":
      r = Math.PI * p("diameter") * p("length");
      break;
    case "pythagoras":
      r = Math.hypot(p("a", true), p("b", true));
      break;
    case "triangle-side": {
      const angle = p("angle");
      if (angle >= Math.PI / 2) throw new Error("Spitzer Winkel erforderlich.");
      r = p("adjacent") * Math.tan(angle);
      break;
    }
    case "slope-angle":
      r = Math.atan(p("height", true) / p("horizontal"));
      break;
    case "linear-system-x": {
      const a = n("a"),
        b = n("b"),
        c = n("c"),
        d = n("d"),
        e = n("e"),
        f = n("f");
      const det = a * e - b * d;
      if (det === 0 || !Number.isFinite(det))
        throw new Error("Keine eindeutige Lösung.");
      r = (c * e - b * f) / det;
      break;
    }
    case "quadratic-larger-root": {
      const a = n("a"),
        b = n("b"),
        c = n("c");
      if (a === 0) throw new Error("Keine quadratische Gleichung.");
      const disc = b * b - 4 * a * c;
      if (disc < 0 || !Number.isFinite(disc))
        throw new Error("Keine endlichen reellen Nullstellen.");
      const q = -0.5 * (b + (b >= 0 ? 1 : -1) * Math.sqrt(disc));
      r = q === 0 ? 0 : Math.max(q / a, c / q);
      break;
    }
    case "interpolation": {
      const x = n("x"),
        x0 = n("x0"),
        x1 = n("x1");
      if (x0 === x1 || x < Math.min(x0, x1) || x > Math.max(x0, x1))
        throw new Error(
          "Nur Interpolation zwischen verschiedenen Stützstellen.",
        );
      r = n("y0") + div((n("y1") - n("y0")) * (x - x0), x1 - x0);
      break;
    }
    case "logarithm": {
      const base = p("base");
      if (base === 1) throw new Error("Logarithmusbasis darf nicht eins sein.");
      r = Math.log(p("value")) / Math.log(base);
      break;
    }
    default:
      throw new Error("Unbekanntes Lehrmodell.");
  }
  if (!Number.isFinite(r)) throw new Error("Nicht endliches Ergebnis.");
  return r;
}
