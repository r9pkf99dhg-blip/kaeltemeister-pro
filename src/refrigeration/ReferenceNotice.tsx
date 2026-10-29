import { referenceProof } from "./backend";
export default function ReferenceNotice() {
  const proof = referenceProof();
  return (
    <details className="academy-panel">
      <summary>Herkunft und Grenzen der Referenzdaten</summary>
      <p role={proof.ok ? "status" : "alert"}>
        {proof.ok
          ? `${proof.cases} feste R134a-Betriebsfälle mit ${proof.states} Zuständen verfügbar.`
          : "Die Referenzdaten sind nicht sicher darstellbar. Bitte qualitativ weiterlernen."}
      </p>
      <p>
        Modell B: offline berechnete Referenzfälle aus CoolProp 7.2.0, HEOS,
        reines R134a, IIR-Enthalpiebezug. Keine freie Interpolation, keine
        Gemische und keine Live-Stoffdatenberechnung. Die Auswahl eines Falls
        ändert die tatsächlich hinterlegten Zustände.
      </p>
      <p>
        Bibliotheks- und mathematische Konsistenzprüfung; keine unabhängige
        experimentelle Validierung und keine menschliche Fachfreigabe. R134a ist
        ein Lernbeispiel, keine Empfehlung für neue Anlagen.
      </p>
      <p>
        Die angegebene Leistungszahl bezieht sich auf die Fluidarbeit des
        gewählten Modells. Elektrische Verluste und Hilfsantriebe sind nicht
        enthalten.
      </p>
      <a href={`${import.meta.env.BASE_URL}licenses/CoolProp-MIT.txt`}>
        CoolProp-Lizenz (MIT)
      </a>
    </details>
  );
}
