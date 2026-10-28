import type { Source } from "../model";
export const foundationSources: Source[] = [
  {
    id: "openstax-prealgebra-v05",
    title: "OpenStax: Prealgebra 2e – ausgewählte Grundlagen",
    access: "consulted",
    url: "https://github.com/openstax/osbooks-prealgebra-bundle/blob/ad40c7e3c9a909cde81a24c526f52fe26a51fb14/collections/prealgebra-2e.collection.xml",
    reviewedCommit: "ad40c7e3c9a909cde81a24c526f52fe26a51fb14",
    accessedAt: "2026-10-27",
    locator:
      "m81270 Ausdrücke; m81285/m81286/m81287/m81288 Brüche; m81306 Prozent; m81320/m81321 Gleichungen; m81335 Potenzen, m81315 rationale/irrationale Zahlen.",
    supports:
      "Definitionen und algebraische Grundregeln; keine fachliche Freigabe der gesamten eigenen deutschen Lernmodule oder technischen Anwendungen.",
    license: "CC BY-NC-SA 4.0 laut LICENSE",
    note: "Offizielles Git-Archiv tatsächlich eingesehen. Texte und Zahlenbeispiele eigenständig formuliert, keine vollständigen Buchtexte oder Abbildungen übernommen.",
  },
  {
    id: "openstax-physics-v05",
    title: "OpenStax: College Physics 2e – ausgewählte Mechanik/Wärmelehre",
    access: "consulted",
    url: "https://github.com/openstax/osbooks-college-physics-bundle/blob/66fcef29596e3a32818162b837dd0c85b754cbad/collections/college-physics-2e.collection.xml",
    reviewedCommit: "66fcef29596e3a32818162b837dd0c85b754cbad",
    accessedAt: "2026-10-27",
    locator:
      "m42073 Newton; m42146 Arbeit; m42151 Energieerhaltung; m42187 Dichte; m42189 Druck; m42224 eip-644 Wärme Q=mcΔT.",
    supports:
      "Physikalische Grundbeziehungen unter genannten Modellannahmen; keine realen Stoff-/Auslegungsdaten oder Anlagenfreigabe.",
    license: "CC BY-NC-SA 4.0 laut LICENSE",
    note: "Offizielles Git-Archiv tatsächlich eingesehen. Eigene fiktive Zahlenfälle, kein Ersatz für unabhängige menschliche Fachprüfung.",
  },
];

foundationSources.push({
  id: "openstax-chemistry-v05",
  title: "OpenStax: Chemistry 2e – ausgewählte Grundlagen",
  access: "consulted",
  url: "https://github.com/openstax/osbooks-chemistry-bundle/blob/db0a8e6027100ce082e67fc8879faab86f9a58a7/collections/chemistry-2e.collection.xml",
  reviewedCommit: "db0a8e6027100ce082e67fc8879faab86f9a58a7",
  accessedAt: "2026-10-27",
  locator:
    "m68667 Phases and Classification of Matter; m68692 Atomic Structure and Symbolism; m68693 Chemical Formulas; m68700 Formula Mass and the Mole Concept; m68709 Writing and Balancing Chemical Equations.",
  supports:
    "Stoffklassifikation, Atombau/Formelsymbolik, Stoffmengen- und Reaktionsgrundlagen. Keine realen Kältemittel-Stoff-/Gefahrdaten oder Freigabe ganzer Module.",
  license: "CC BY-NC-SA 4.0 laut LICENSE",
  note: "Offizielles Git-Archiv tatsächlich eingesehen; eigene deutsche Texte und Zahlenfälle, keine Buchkapitel oder Abbildungen kopiert. Menschliche Fachabnahme offen.",
});
