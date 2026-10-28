import { mathematicsLessons } from "../foundations/mathematics";
import { electricalModules, electricalPlanned } from "./electrical";
import type { Domain } from "../model";

// Explizite Slugs bleiben bei Umordnungen erhalten; Arraypositionen sind keine IDs.
const outlines = [
  [
    "thermodynamik",
    "Thermodynamik",
    "Zustände und Energiebilanzen",
    [
      "zustand",
      "Zustandsgrößen",
      "druck-temperatur",
      "Druck und Temperatur",
      "energie",
      "Energie und Enthalpie",
    ],
    [
      "prozesse",
      "Thermodynamische Prozesse",
      "hauptsaetze",
      "Hauptsätze",
      "kreisprozesse",
      "Kreisprozesse",
    ],
  ],
  [
    "elektro",
    "Elektrotechnik",
    "Elektrische Grundlagen und Antriebe",
    [
      "grundlagen",
      "Elektrische Größen",
      "gleichstrom",
      "Gleichstromkreise",
      "wechselstrom",
      "Wechselstrom",
    ],
    [
      "antriebe",
      "Antriebe und Schutz",
      "drehstrom",
      "Drehstrommotoren",
      "schutz",
      "Schutzmaßnahmen",
    ],
  ],
  [
    "regelung",
    "Steuerungs- und Regelungstechnik",
    "Vom Signal zum stabilen Betrieb",
    [
      "steuern",
      "Steuerungstechnik",
      "signale",
      "Signale und Sensoren",
      "logik",
      "Schaltlogik",
    ],
    [
      "regeln",
      "Regelkreise",
      "regelgroessen",
      "Regelgrößen",
      "regler",
      "Regler und Dynamik",
    ],
  ],
  [
    "klima",
    "Klimatechnik",
    "Luftzustände und Raumklima",
    [
      "luft",
      "Feuchte Luft",
      "feuchte",
      "Feuchtebegriffe",
      "hx",
      "h-x-Diagramm",
    ],
    [
      "lasten",
      "Raumlasten",
      "sensibel",
      "Sensible Lasten",
      "latent",
      "Latente Lasten",
    ],
  ],
  [
    "lueftung",
    "Lüftungstechnik",
    "Luftführung und Ventilatoren",
    [
      "luftfuehrung",
      "Luftführung",
      "volumenstrom",
      "Volumenstrom",
      "kanaele",
      "Kanalnetze",
    ],
    [
      "foerderung",
      "Luftförderung",
      "ventilatoren",
      "Ventilatoren",
      "hygiene",
      "Hygiene und Betrieb",
    ],
  ],
  [
    "waermepumpen",
    "Wärmepumpentechnik",
    "Wärmequellen und Systembewertung",
    [
      "quellen",
      "Wärmequellen",
      "luftquelle",
      "Luft als Quelle",
      "erdquelle",
      "Erdreich und Wasser",
    ],
    [
      "systeme",
      "Wärmepumpensysteme",
      "kennzahlen",
      "COP und Jahresarbeitszahl",
      "hydraulik",
      "Hydraulische Einbindung",
    ],
  ],
  [
    "waerme",
    "Wärmeübertragung und Dämmung",
    "Wärmeströme und Feuchteschutz",
    [
      "uebertragung",
      "Wärmeübertragung",
      "leitung",
      "Wärmeleitung",
      "konvektion",
      "Konvektion und Strahlung",
    ],
    [
      "daemmung",
      "Dämmung",
      "rohre",
      "Rohrdämmung",
      "tauwasser",
      "Tauwasser und Wärmebrücken",
    ],
  ],
  [
    "mathematik",
    "Technische Mathematik",
    "Sicher mit Größen und Gleichungen",
    [
      "rechnen",
      "Rechengrundlagen",
      "einheiten",
      "Einheitenumrechnung",
      "gleichungen",
      "Gleichungen umstellen",
    ],
    [
      "auswertung",
      "Technische Auswertung",
      "diagramme",
      "Diagramme lesen",
      "fehler",
      "Fehler und Genauigkeit",
    ],
  ],
  [
    "messtechnik",
    "Messtechnik",
    "Messketten und belastbare Ergebnisse",
    [
      "messgroessen",
      "Messgrößen",
      "temperatur",
      "Temperaturmessung",
      "druck",
      "Druckmessung",
    ],
    [
      "messpraxis",
      "Messpraxis",
      "kontakt",
      "Fühler und Messstellen",
      "unsicherheit",
      "Messunsicherheit",
    ],
  ],
  [
    "anlagenbau",
    "Komponenten und Anlagenbau",
    "Bauteile im System verstehen",
    [
      "bauteile",
      "Komponenten",
      "ventile",
      "Ventile und Armaturen",
      "waermeuebertrager",
      "Wärmeübertrager",
    ],
    [
      "montage",
      "Anlagenaufbau",
      "leitungen",
      "Rohrleitungen",
      "dokumentation",
      "Anlagendokumentation",
    ],
  ],
  [
    "sicherheit",
    "Sicherheit, Umwelt und rechtliche Grundlagen",
    "Verantwortung und sichere Arbeitsweise",
    [
      "sicherarbeiten",
      "Sicher arbeiten",
      "gefahren",
      "Gefährdungen",
      "schutzmassnahmen",
      "Schutzmaßnahmen",
    ],
    [
      "umweltrecht",
      "Umwelt und Recht",
      "kaeltemittelrecht",
      "Kältemittelbezogene Anforderungen",
      "nachweise",
      "Nachweise und Aktualisierung",
    ],
  ],
] as const;

export const domains: Domain[] = [
  {
    id: "kaelte",
    title: "Kältetechnik und Kältekreislauf",
    description: "Fünf ausgearbeitete Beispielmodule auf drei Niveaus.",
    chapters: [
      {
        id: "kaelte-kreis",
        title: "Kältekreislauf und Hauptbauteile",
        subchapters: [
          {
            id: "kaelte-kreis-ueberblick",
            title: "Kreislauf verstehen",
            moduleIds: ["cycle-basics"],
            plannedTopics: [],
          },
          {
            id: "kaelte-kreis-bauteile",
            title: "Verdampfer, Verdichter und Verflüssiger",
            moduleIds: ["evaporation", "compression", "condensation"],
            plannedTopics: ["Expansionsorgane im Detail"],
          },
        ],
      },
      {
        id: "kaelte-zustaende",
        title: "Zustände und Anlagenpraxis",
        subchapters: [
          {
            id: "kaelte-zustaende-messen",
            title: "Temperaturabstände einordnen",
            moduleIds: ["superheat-subcooling"],
            plannedTopics: [],
          },
          {
            id: "kaelte-zustaende-diagnose",
            title: "Vom Messwert zur Diagnose",
            moduleIds: [],
            plannedTopics: ["Diagnosefälle und Betriebsprotokolle"],
          },
        ],
      },
    ],
  },
  ...outlines.map(
    ([id, title, description, first, second]): Domain => ({
      id,
      title,
      description,
      chapters: [first, second].map(
        ([chapterId, chapterTitle, aId, aTitle, bId, bTitle]) => ({
          id: `${id}-${chapterId}`,
          title: chapterTitle,
          subchapters: [
            {
              id: `${id}-${aId}`,
              title: aTitle,
              moduleIds: [],
              plannedTopics: [`Lernmodul: ${aTitle}`],
            },
            {
              id: `${id}-${bId}`,
              title: bTitle,
              moduleIds: [],
              plannedTopics: [`Lernmodul: ${bTitle}`],
            },
          ],
        }),
      ),
    }),
  ),
];

// Die bisherigen Elektro-Kapitel-IDs bleiben erhalten; nur deren Zuordnung wird ausgearbeitet.
const electricDomain = domains.find((d) => d.id === "elektro")!;
electricDomain.description =
  "Fünf nutzbare Grundlagenmodule; elf weitere Themen ausdrücklich geplant.";
electricDomain.chapters[0].subchapters[0].moduleIds = electricalModules.map(
  (m) => m.id,
);
electricDomain.chapters[0].subchapters[0].plannedTopics = [];
electricDomain.chapters[0].subchapters[1].plannedTopics =
  electricalPlanned.slice(0, 3);
electricDomain.chapters[1].subchapters[0].plannedTopics =
  electricalPlanned.slice(3, 5);
electricDomain.chapters[1].subchapters[1].plannedTopics =
  electricalPlanned.slice(5);

const mathDomain = domains.find((d) => d.id === "mathematik")!;
mathDomain.description =
  "Acht vollständige Grundlagenlektionen; weiterführende Themen ausdrücklich geplant.";
mathDomain.chapters[0].subchapters[0].moduleIds = mathematicsLessons
  .filter((l) =>
    [
      "math-arithmetic",
      "math-fractions",
      "math-percent",
      "math-powers",
      "math-units",
    ].includes(l.id),
  )
  .map((l) => l.id);
mathDomain.chapters[0].subchapters[0].plannedTopics = [];
mathDomain.chapters[0].subchapters[1].moduleIds = [
  "math-algebra",
  "math-equations",
  "math-rearrange",
];
mathDomain.chapters[0].subchapters[1].plannedTopics = [
  "Quadratische Gleichungen und lineare Gleichungssysteme",
];

domains.push({
  id: "physik",
  title: "Physik-Grundlagen",
  description:
    "Vier ausgearbeitete Kernmodule mit Bezug zu Kälte- und Energietechnik.",
  chapters: [
    {
      id: "physik-mechanik",
      title: "Mechanik und Energie",
      subchapters: [
        {
          id: "physik-bewegung",
          title: "Bewegung und Kräfte",
          moduleIds: ["physics-motion"],
          plannedTopics: ["Vertiefte Kinematik, Vektoren und Drehbewegung"],
        },
        {
          id: "physik-energie",
          title: "Arbeit und Energie",
          moduleIds: ["physics-energy"],
          plannedTopics: [],
        },
      ],
    },
    {
      id: "physik-stoff-waerme",
      title: "Stoffe und Wärme",
      subchapters: [
        {
          id: "physik-druck-dichte",
          title: "Druck und Dichte",
          moduleIds: ["physics-pressure-density"],
          plannedTopics: ["Strömung und Gasgesetze"],
        },
        {
          id: "physik-waerme",
          title: "Temperatur und Wärme",
          moduleIds: ["physics-heat"],
          plannedTopics: ["Vertiefte Wärmeübertragung und Hauptsätze"],
        },
      ],
    },
    {
      id: "physik-felder",
      title: "Felder, Messung und Wellen",
      subchapters: [
        {
          id: "physik-messung",
          title: "Messunsicherheit",
          moduleIds: [],
          plannedTopics: ["Messketten und Unsicherheitsfortpflanzung"],
        },
        {
          id: "physik-wellen",
          title: "Magnetismus und Wellen",
          moduleIds: [],
          plannedTopics: [
            "Magnetismus, Schwingungen und Wellen; Elektro-Grundgrößen im vorhandenen Elektro-Lernpfad",
          ],
        },
      ],
    },
  ],
});

domains.push({
  id: "chemie",
  title: "Chemie-Grundlagen",
  description:
    "Drei vollständige Grundlagenmodule; weiterführende Stoff- und Sicherheitsthemen geplant.",
  chapters: [
    {
      id: "chemie-stoffe",
      title: "Stoffe und Aufbau",
      subchapters: [
        {
          id: "chemie-klassifikation",
          title: "Stoffe und Gemische",
          moduleIds: ["chemistry-matter"],
          plannedTopics: [],
        },
        {
          id: "chemie-atombau",
          title: "Atome und Formelsprache",
          moduleIds: ["chemistry-atoms"],
          plannedTopics: ["Periodensystem und Bindungsmodelle vertiefen"],
        },
      ],
    },
    {
      id: "chemie-bilanzen",
      title: "Stoffmengen und Reaktionen",
      subchapters: [
        {
          id: "chemie-stoffmenge",
          title: "Stoffmenge und Atombilanz",
          moduleIds: ["chemistry-amount"],
          plannedTopics: ["Weiterführende Stöchiometrie"],
        },
        {
          id: "chemie-reaktionen",
          title: "Reaktionsklassen",
          moduleIds: [],
          plannedTopics: ["Säuren/Basen, Oxidation und Reduktion"],
        },
      ],
    },
    {
      id: "chemie-technik",
      title: "Technische Stoffe",
      subchapters: [
        {
          id: "chemie-organik",
          title: "Organische Grundlagen",
          moduleIds: [],
          plannedTopics: ["Kohlenwasserstoffe und halogenierte Verbindungen"],
        },
        {
          id: "chemie-kaeltemittel",
          title: "Kältemittel und Umwelt",
          moduleIds: [],
          plannedTopics: [
            "Geprüfte Stoffeigenschaften, Umweltwirkung und aktuelle Sicherheitsdaten",
          ],
        },
      ],
    },
  ],
});

mathDomain.chapters.push({
  id: "mathematik-vertiefung-v06",
  title: "Geometrie und Algebra vertiefen",
  subchapters: [
    {
      id: "mathematik-geometrie-v06",
      title: "Geometrie und Trigonometrie",
      moduleIds: [
        "math-geometry",
        "math-pipe-volume",
        "math-triangles",
        "math-trigonometry",
      ],
      plannedTopics: [],
    },
    {
      id: "mathematik-algebra-v06",
      title: "Gleichungen und Funktionen",
      moduleIds: ["math-domains", "math-systems-quadratic", "math-functions"],
      plannedTopics: ["Weitere nichtlineare Systeme und vertiefte Analysis"],
    },
  ],
});
mathDomain.description =
  "Grundlagen, technische Geometrie, Trigonometrie und vertiefte Algebra mit Modellgrenzen.";
mathDomain.chapters[0].subchapters[1].plannedTopics = [];

electricDomain.description =
  "Fünf Gleichstrom-Grundlagenmodule sowie vier vertiefte Wechsel- und Drehstrommodule.";
electricDomain.chapters[0].subchapters[1].moduleIds = [
  "electric-ac-wave",
  "electric-ac-reactance",
  "electric-ac-power",
];
electricDomain.chapters[0].subchapters[1].plannedTopics = [];
electricDomain.chapters[1].subchapters[0].moduleIds = ["electric-three-phase"];
electricDomain.chapters[1].subchapters[0].plannedTopics = [
  "Drehfeld, Asynchronmotor, Schlupf und reale Motorkennlinien",
];

const thermoDomain = domains.find((d) => d.id === "thermodynamik")!;
thermoDomain.description =
  "Zusammenhängender Pfad von Zuständen über Wärmeträger und Wärmeübertragung zur Kreislaufbilanz.";
thermoDomain.chapters[0].subchapters[0].moduleIds = [
  "thermo-states",
  "thermo-calorimetry",
  "thermo-phase",
];
thermoDomain.chapters[0].subchapters[0].plannedTopics = [];
thermoDomain.chapters[0].subchapters[1].moduleIds = ["thermo-transfer"];
thermoDomain.chapters[0].subchapters[1].plannedTopics = [];
thermoDomain.chapters[1].subchapters[1].moduleIds = ["thermo-cycle-balance"];
thermoDomain.chapters[1].subchapters[1].plannedTopics = [
  "Reale Stoffwerte und validierte log-p-h-Darstellung",
];
domains.find(
  (d) => d.id === "waerme",
)!.chapters[0].subchapters[0].plannedTopics = [
  "Lehrmodell im Fachgebiet Thermodynamik: Wärmeleitung, Wärmewiderstand und U-Wert; Fachauslegung später.",
];

for (const [domainId, moduleIds] of [
  ["mathematik", ["case-pipe"]],
  ["elektro", ["case-ac"]],
  ["thermodynamik", ["case-heat", "case-conduction"]],
] as const) {
  domains
    .find((d) => d.id === domainId)!
    .chapters.push({
      id: `${domainId}-faelle-v06`,
      title: "Fachübergreifende Lernfälle",
      subchapters: [
        {
          id: `${domainId}-fallstudien-v06`,
          title: "Selbst erstellte Transferübungen mit Bewertung",
          moduleIds: [...moduleIds],
          plannedTopics: [],
        },
      ],
    });
}
