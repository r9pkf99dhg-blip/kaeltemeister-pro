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

const mathDomain=domains.find(d=>d.id==='mathematik')!;
mathDomain.description='Acht vollständige Grundlagenlektionen; weiterführende Themen ausdrücklich geplant.';
mathDomain.chapters[0].subchapters[0].moduleIds=mathematicsLessons.filter(l=>['math-arithmetic','math-fractions','math-percent','math-powers','math-units'].includes(l.id)).map(l=>l.id);
mathDomain.chapters[0].subchapters[0].plannedTopics=[];
mathDomain.chapters[0].subchapters[1].moduleIds=['math-algebra','math-equations','math-rearrange'];
mathDomain.chapters[0].subchapters[1].plannedTopics=['Quadratische Gleichungen und lineare Gleichungssysteme'];

domains.push({id:'physik',title:'Physik-Grundlagen',description:'Vier ausgearbeitete Kernmodule mit Bezug zu Kälte- und Energietechnik.',chapters:[
 {id:'physik-mechanik',title:'Mechanik und Energie',subchapters:[{id:'physik-bewegung',title:'Bewegung und Kräfte',moduleIds:['physics-motion'],plannedTopics:['Vertiefte Kinematik, Vektoren und Drehbewegung']},{id:'physik-energie',title:'Arbeit und Energie',moduleIds:['physics-energy'],plannedTopics:[]}]},
 {id:'physik-stoff-waerme',title:'Stoffe und Wärme',subchapters:[{id:'physik-druck-dichte',title:'Druck und Dichte',moduleIds:['physics-pressure-density'],plannedTopics:['Strömung und Gasgesetze']},{id:'physik-waerme',title:'Temperatur und Wärme',moduleIds:['physics-heat'],plannedTopics:['Vertiefte Wärmeübertragung und Hauptsätze']}]},
 {id:'physik-felder',title:'Felder, Messung und Wellen',subchapters:[{id:'physik-messung',title:'Messunsicherheit',moduleIds:[],plannedTopics:['Messketten und Unsicherheitsfortpflanzung']},{id:'physik-wellen',title:'Magnetismus und Wellen',moduleIds:[],plannedTopics:['Magnetismus, Schwingungen und Wellen; Elektro-Grundgrößen im vorhandenen Elektro-Lernpfad']}]}]});
