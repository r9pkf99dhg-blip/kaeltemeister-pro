import { BlockMath } from "../../math/Math";
import { formulas } from "../../academy/catalog";
import { useState } from "react";
import { ArrowRight, Calculator, ShieldCheck, Zap } from "lucide-react";
import { calculateHeat, format, parseDecimal } from "../../logic";
import PageHeading from "../../components/PageHeading";

export default function HeatCalculator() {
  const [mass, setMass] = useState("0,5");
  const [cp, setCp] = useState("4,18");
  const [delta, setDelta] = useState("5");
  const [massUnit, setMassUnit] = useState("kg/s");
  const [cpUnit, setCpUnit] = useState("kJ/(kg·K)");
  const [result, setResult] = useState<ReturnType<typeof calculateHeat> | null>(
    null,
  );
  const [error, setError] = useState("");
  function invalidate() {
    setResult(null);
    setError("");
  }
  return (
    <>
      <PageHeading
        eyebrow="DEIN DIGITALES WERKZEUG"
        title="Von der Formel zur Lösung."
        description="Berechne die sensible Wärmeleistung – mit klaren Einheiten und jedem Rechenschritt."
      />
      <div className="calculator-layout">
        <section className="calculator-card">
          <div className="card-heading">
            <span className="icon-box green">
              <Calculator size={22} />
            </span>
            <div>
              <h2>Sensible Wärmeleistung</h2>
              <p>Temperaturänderung ohne Phasenwechsel</p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              try {
                setResult(
                  calculateHeat(
                    parseDecimal(mass),
                    parseDecimal(cp),
                    parseDecimal(delta),
                    massUnit,
                    cpUnit,
                  ),
                );
                setError("");
              } catch (err) {
                setResult(null);
                setError((err as Error).message);
              }
            }}
            noValidate
          >
            <label className="field-label" htmlFor="mass">
              Massenstrom <span>ṁ</span>
            </label>
            <div className="input-row">
              <input
                id="mass"
                inputMode="decimal"
                value={mass}
                onChange={(e) => {
                  setMass(e.target.value);
                  invalidate();
                }}
              />
              <select
                aria-label="Einheit Massenstrom"
                value={massUnit}
                onChange={(e) => {
                  setMassUnit(e.target.value);
                  invalidate();
                }}
              >
                <option>kg/s</option>
                <option>kg/h</option>
              </select>
            </div>
            <label className="field-label" htmlFor="cp">
              Spezifische Wärmekapazität <span>cp</span>
            </label>
            <div className="input-row">
              <input
                id="cp"
                inputMode="decimal"
                value={cp}
                onChange={(e) => {
                  setCp(e.target.value);
                  invalidate();
                }}
              />
              <select
                aria-label="Einheit Wärmekapazität"
                value={cpUnit}
                onChange={(e) => {
                  setCpUnit(e.target.value);
                  invalidate();
                }}
              >
                <option>kJ/(kg·K)</option>
                <option>J/(kg·K)</option>
              </select>
            </div>
            <p className="field-hint">
              Beispiel: Wasser bei etwa 20 °C ≈ 4,18 kJ/(kg·K). Stoffwert und
              Temperatur beachten.
            </p>
            <label className="field-label" htmlFor="delta">
              Temperaturdifferenz <span>ΔT</span>
            </label>
            <div className="input-row">
              <input
                id="delta"
                inputMode="decimal"
                value={delta}
                onChange={(e) => {
                  setDelta(e.target.value);
                  invalidate();
                }}
              />
              <span className="unit-label">K</span>
            </div>
            <p className="field-hint">
              Betrag der Differenz: z. B. |12 °C − 7 °C| = 5 K.
            </p>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
            <button className="button primary full-width" type="submit">
              Wärmeleistung berechnen <ArrowRight size={18} />
            </button>
          </form>
        </section>
        <div>
          <section className="formula-card">
            <p className="eyebrow">DIE FORMEL</p>
            <BlockMath tex={formulas.find(f => f.id === 'sensible-heat')!.tex!} label="Q Punkt gleich m Punkt mal cp mal Delta T" />
            <p>
              Die Leistung steigt mit dem Massenstrom, der Wärmekapazität und
              der Temperaturdifferenz.
            </p>
          </section>
          <section className="result-card" aria-live="polite">
            {result ? (
              <>
                <p className="eyebrow">DEIN ERGEBNIS</p>
                <div className="result-value">
                  {format(result.kw)} <span>kW</span>
                </div>
                <p>entspricht {format(result.kw * 1000)} W</p>
                <h3>Schritt für Schritt</h3>
                <ol>
                  <li>
                    Massenstrom in kg/s:
                    <br />
                    <strong>
                      {mass} {massUnit}
                      {massUnit === "kg/h" ? " ÷ 3.600" : ""} ={" "}
                      {format(result.massKgS)} kg/s
                    </strong>
                  </li>
                  <li>
                    Wärmekapazität in kJ/(kg·K):
                    <br />
                    <strong>
                      {cp} {cpUnit}
                      {cpUnit === "J/(kg·K)" ? " ÷ 1.000" : ""} ={" "}
                      {format(result.cpKj)} kJ/(kg·K)
                    </strong>
                  </li>
                  <li>
                    In die Formel einsetzen:
                    <br />
                    <strong>
                      {format(result.massKgS)} × {format(result.cpKj)} × {delta}{" "}
                      = {format(result.kw)} kW
                    </strong>
                  </li>
                </ol>
                <p className="field-hint">
                  Einheiten: kg/s × kJ/(kg·K) × K = kJ/s = kW. Anzeige auf
                  maximal 6 Nachkommastellen gerundet; intern wird ungerundet
                  gerechnet.
                </p>
              </>
            ) : (
              <div className="result-placeholder">
                <Zap size={28} />
                <h3>Dein Rechenweg wartet.</h3>
                <p>
                  Trage deine Werte ein. Das Ergebnis erscheint hier inklusive
                  Umrechnung.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
      <div className="notice">
        <ShieldCheck size={22} />
        <span>
          Berechnet wird der <strong>Betrag der sensiblen Wärmeleistung</strong>{" "}
          bei konstant angenommenem cp. Nicht geeignet für Verdampfung,
          Kondensation oder feuchte Luft mit Entfeuchtung. Keine Berechnung der
          gesamten Kälteleistung bei Phasenwechsel.
        </span>
      </div>
    </>
  );
}
