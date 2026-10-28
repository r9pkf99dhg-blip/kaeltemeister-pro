import { simpleTerms } from "../language/terms";
import { Explain, useExplanation, LessonExplanation } from "../language/Explanation";
import CaseStudy from "./deep/CaseStudy";
import RearrangementTrainer from "./foundations/RearrangementTrainer";
import { MathText } from "../math/Math";
import LessonReading from "./components/LessonReading";
import { numericTasks } from "./exercises/data";
import Exercises from "./exercises/Exercises";
import ExamMode from "./exams/ExamMode";
import { visitModule } from "./adaptive/algorithm";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Search,
} from "lucide-react";
import {
  domains,
  formulas,
  modules,
  objectives,
  sources,
  terms,
} from "./catalog";
import {
  levelNames,
  levels,
  type AcademyProgress,
  type Level,
  type Module,
} from "./model";
import {
  dueCards,
  markRead,
  moduleRead,
  needsPractice,
  normalizeSearch,
} from "./progress";
import ModuleQuiz from "./components/ModuleQuiz";
import ReviewCards from "./components/ReviewCards";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  initialModuleId?: string | null;
  initialExerciseId?: string | null;
  initialView?: "overview" | "review" | "exercises" | "exam";
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  error: string | null;
  openCalculator: () => void;
};
export default function Academy({
  progress,
  setProgress,
  error,
  openCalculator,
  initialModuleId,
  initialView = "overview",
  initialExerciseId,
}: Props) {
  const [moduleId, setModuleId] = useState<string | null>(
    initialModuleId ?? null,
  );
  const [level, setLevel] = useState<Level>("grundlagen");
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<
    "overview" | "review" | "exercises" | "exam"
  >(initialView);
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo?.({ top: 0, behavior: "instant" });
  }, [moduleId, level, view]);
  useEffect(() => {
    if (moduleId) {
      const now = new Date();
      setProgress((current) => visitModule(current, moduleId, now));
    }
  }, [moduleId, setProgress]);
  const selectedModule = modules.find((module) => module.id === moduleId);
  const search = normalizeSearch(query);
  const visible = modules.filter((module) => {
    const vocabulary = terms
      .filter((term) => term.moduleIds.includes(module.id))
      .map((term) => `${term.title} ${term.definition}`)
      .join(" ");
    return (
      (domain === "all" || module.domainId === domain) &&
      normalizeSearch(
        `${module.title} ${module.description} ${vocabulary}`,
      ).includes(search) &&
      (status === "all" ||
        (status === "read" && moduleRead(progress, module.id, level)) ||
        (status === "open" && !moduleRead(progress, module.id, level)) ||
        (status === "practice" && needsPractice(progress, module.id)))
    );
  });
  const completed = modules.filter((module) =>
    moduleRead(progress, module.id, level),
  ).length;
  function open(id: string) {
    window.history.pushState(
      { kaeltePage: "akademie", moduleId: id },
      "",
      window.location.href,
    );
    setModuleId(id);
  }
  return (
    <div className="academy" ref={mainRef} tabIndex={-1}>
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      {selectedModule ? (
        <ModuleView
          module={selectedModule}
          level={level}
          setLevel={setLevel}
          progress={progress}
          setProgress={setProgress}
          back={() => {
            window.history.pushState(
              { kaeltePage: "akademie", moduleId: null },
              "",
              window.location.href,
            );
            setModuleId(null);
          }}
          openCalculator={openCalculator}
          openModule={open}
        />
      ) : (
        <>
          <div className="page-heading">
            <div>
              <p className="eyebrow">LERNEN MIT SYSTEM · VERSION 0.6</p>
              <h1>Lernakademie</h1>
              <p>
                Mathematische Grundlagen und technische Fachmodule. Drei
                Wissensstufen. Dein eigenes Lerntempo.
              </p>
            </div>
          </div>
          <div className="academy-tabs" aria-label="Akademieansicht">
            <button
              className={`button ${view === "overview" ? "primary" : "secondary"}`}
              aria-pressed={view === "overview"}
              onClick={() => setView("overview")}
            >
              Module & Fachgebiete
            </button>
            <button
              className={`button ${view === "review" ? "primary" : "secondary"}`}
              aria-pressed={view === "review"}
              onClick={() => setView("review")}
            >
              Karteikarten wiederholen ({dueCards(progress).length})
            </button>
            <button
              className={`button ${view === "exercises" ? "primary" : "secondary"}`}
              aria-pressed={view === "exercises"}
              onClick={() => setView("exercises")}
            >
              Rechenaufgaben
            </button>
            <button
              className={`button ${view === "exam" ? "primary" : "secondary"}`}
              aria-pressed={view === "exam"}
              onClick={() => setView("exam")}
            >
              Übungsprüfung
            </button>
          </div>
          {view === "exercises" ? (
            <Exercises
              initialTaskId={initialExerciseId}
              progress={progress}
              setProgress={setProgress}
              openModule={open}
            />
          ) : view === "exam" ? (
            <ExamMode
              progress={progress}
              setProgress={setProgress}
              openModule={open}
            />
          ) : view === "review" ? (
            <section className="academy-panel">
              <h2>Deine Wiederholung</h2>
              <ReviewCards progress={progress} setProgress={setProgress} />
            </section>
          ) : (
            <>
              <div className="academy-progress">
                <CheckCircle2 size={22} />
                <span>
                  <strong>
                    {completed} von {modules.length}
                  </strong>{" "}
                  Modulen auf Niveau {levelNames[level]} gelesen
                </span>
                <progress
                  value={completed}
                  max={modules.length}
                  aria-label="Akademie-Lesefortschritt"
                />
              </div>
              <div className="academy-filters">
                <label className="academy-search">
                  <span>
                    <Search size={17} /> Module oder Fachbegriffe suchen
                  </span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="z. B. Verdampfung oder Enthalpie"
                  />
                </label>
                <label>
                  Fachgebiet
                  <select
                    aria-label="Fachgebiet"
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                  >
                    <option value="all">Alle Fachgebiete</option>
                    {domains.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Wissensstufe
                  <select
                    aria-label="Wissensstufe"
                    value={level}
                    onChange={(event) => setLevel(event.target.value as Level)}
                  >
                    {levels.map((item) => (
                      <option value={item} key={item}>
                        {levelNames[item]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Lernstatus
                  <select
                    aria-label="Lernstatus"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option value="all">Alle Module</option>
                    <option value="open">Noch offen</option>
                    <option value="read">Gelesen</option>
                    <option value="practice">Erneut üben</option>
                  </select>
                </label>
              </div>
              <p className="academy-result-count" role="status">
                {visible.length} verfügbare Lernmodule gefunden
              </p>
              <div className="academy-module-grid">
                {visible.map((module, index) => (
                  <button
                    className="academy-module-card"
                    key={module.id}
                    onClick={() => open(module.id)}
                  >
                    <span className="eyebrow">
                      {module.domainId === "kaelte"
                        ? "KÄLTETECHNIK"
                        : module.domainId === "elektro"
                          ? "ELEKTROTECHNIK"
                          : domains
                              .find((d) => d.id === module.domainId)
                              ?.title.toLocaleUpperCase("de")}{" "}
                      · {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2>{module.title}</h2>
                    <p>{module.description}</p>
                    <div className="module-labels">
                      <span
                        className={`pill ${moduleRead(progress, module.id, level) ? "read" : ""}`}
                      >
                        {moduleRead(progress, module.id, level)
                          ? "Gelesen"
                          : "Offen"}
                      </span>
                      {needsPractice(progress, module.id) && (
                        <span className="pill practice">Erneut üben</span>
                      )}
                      <span className="pill">Fachprüfung offen</span>
                    </div>
                    <span className="module-open">
                      Lernmodul öffnen <ArrowRight size={17} />
                    </span>
                  </button>
                ))}
              </div>
              {!visible.length && (
                <div className="empty-state">
                  <h2>Hier gibt es noch keine passenden Lernmodule.</h2>
                  <p>
                    Ändere die Suche oder den Lernstatus. Die übrigen
                    Fachgebiete sind strukturiert, aber noch nicht
                    ausgearbeitet.
                  </p>
                </div>
              )}
              {search && (
                <section className="academy-panel">
                  <h2>Fachbegriffe</h2>
                  {terms
                    .filter(
                      (term) =>
                        normalizeSearch(
                          `${term.title} ${term.definition}`,
                        ).includes(search) &&
                        (domain === "all" ||
                          term.moduleIds.some(
                            (id) =>
                              modules.find((module) => module.id === id)
                                ?.domainId === domain,
                          )),
                    )
                    .map((term) => (
                      <div className="glossary-entry" key={term.id}>
                        <h3>{term.title}</h3>
                        <p>{simpleTerms[term.title]?<Explain simple={simpleTerms[term.title]} technical={term.definition}/>:<>{term.definition} <span className="small-muted">Ursprüngliche Begriffsdefinition.</span></>}</p>
                        <div>
                          {term.moduleIds.map((id) => (
                            <button
                              className="text-button"
                              key={id}
                              onClick={() => open(id)}
                            >
                              {
                                modules.find((module) => module.id === id)
                                  ?.title
                              }{" "}
                              <ArrowRight size={14} />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                </section>
              )}
              <section className="domain-outline">
                <h2>Deine Fachgebiete</h2>
                <p>
                  Kapitel → Unterkapitel → Lernmodule. Die verfügbaren Module
                  sind vollständig bearbeitbar; mathematische Grundlagen
                  ergänzen die Kälte- und Elektro-Lernpfade. Weitere Inhalte
                  sind ausdrücklich in Vorbereitung. Rechtsinhalte benötigen vor
                  Veröffentlichung eine datierte Prüfung.
                </p>
                {domains
                  .filter((item) => domain === "all" || item.id === domain)
                  .map((item) => (
                    <details key={item.id}>
                      <summary>
                        <BookOpen size={18} />
                        <span>{item.title}</span>
                        <span className="pill">
                          {modules.some((m) => m.domainId === item.id)
                            ? `${modules.filter((m) => m.domainId === item.id).length} Module verfügbar`
                            : "Inhalte in Vorbereitung"}
                        </span>
                      </summary>
                      <p>{item.description}</p>
                      {item.chapters.map((chapter) => (
                        <div className="domain-chapter" key={chapter.id}>
                          <h3>{chapter.title}</h3>
                          {chapter.subchapters.map((sub) => (
                            <div key={sub.id}>
                              <h4>{sub.title}</h4>
                              {sub.moduleIds.map((id) => (
                                <button
                                  key={id}
                                  className="text-button"
                                  onClick={() => open(id)}
                                >
                                  {
                                    modules.find((module) => module.id === id)
                                      ?.title
                                  }{" "}
                                  <ArrowRight size={15} />
                                </button>
                              ))}
                              {sub.plannedTopics.map((topic) => (
                                <p className="planned-topic" key={topic}>
                                  {topic} · Noch nicht ausgearbeitet
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </details>
                  ))}
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}

function ModuleView({
  module,
  level,
  setLevel,
  progress,
  setProgress,
  back,
  openCalculator,
  openModule,
}: {
  module: Module;
  level: Level;
  setLevel: (level: Level) => void;
  progress: AcademyProgress;
  setProgress: Dispatch<SetStateAction<AcademyProgress>>;
  back: () => void;
  openCalculator: () => void;
  openModule: (id: string) => void;
}) {
  const content = module.levels[level];
  const moduleSourceIds = [
    ...new Set([
      ...module.sourceIds,
      ...formulas
        .filter((formula) => module.formulaIds.includes(formula.id))
        .flatMap((formula) => formula.sourceIds),
    ]),
  ];
  return (
    <article className="learning-module">
      <LessonExplanation lessonId={module.id}>
      <button className="text-button back" onClick={back}>
        <ArrowLeft size={17} /> Zur Modulübersicht
      </button>
      <p className="eyebrow">
        {domains.find((d) => d.id === module.domainId)?.title} ·{" "}
        {levelNames[level]} · REVISION {module.revision}
      </p>
      <h1>{module.title}</h1>
      <p className="article-intro">{module.description}</p>
      <div className="level-switch" aria-label="Wissensstufe wählen">
        {levels.map((item) => (
          <button
            className={`button ${level === item ? "primary" : "secondary"}`}
            aria-pressed={level === item}
            key={item}
            onClick={() => setLevel(item)}
          >
            {levelNames[item]}
          </button>
        ))}
      </div>
      <p className="review-notice">
        Fachprüfung offen: Rechenwege geprüft, einzelne Grundbeziehungen mit
        Quellen abgeglichen. Noch keine unabhängige fachliche Freigabe.
        Quellenstatus und Modellgrenzen stehen am Modulende.
      </p>
      {module.safety && <p className="notice">{module.safety}</p>}
      {!!module.prerequisites?.length && (
        <section>
          <h2>Empfohlene Voraussetzungen</h2>
          {module.prerequisites.map((id) => (
            <button
              key={id}
              className="text-button"
              onClick={() => openModule(id)}
            >
              {modules.find((m) => m.id === id)?.title}
            </button>
          ))}
        </section>
      )}
      <section>
        <h2>Lernziele</h2>
        <ul>
          {module.objectiveIds.map((id) => (
            <li key={id}>
              {objectives.find((objective) => objective.id === id)?.text}
            </li>
          ))}
        </ul>
      </section>
      <CaseStudy
        key={module.id}
        moduleId={module.id}
        setProgress={setProgress}
      />
      <LessonReading
        module={module}
        level={level}
        openCalculator={openCalculator}
      />
      <button
        className="button primary"
        disabled={moduleRead(progress, module.id, level)}
        onClick={() =>
          setProgress((current) => markRead(current, module.id, level))
        }
      >
        <CheckCircle2 size={18} />
        {moduleRead(progress, module.id, level)
          ? "Dieses Niveau ist gelesen"
          : "Niveau als gelesen markieren"}
      </button>
      <p className="field-hint">
        „Gelesen“ gilt pro Niveau und ist kein Nachweis, dass du das Thema
        bereits beherrschst.
      </p>
      <section>
        <h2>Verständnisfragen</h2>
        <ModuleQuiz
          key={`${module.id}-${level}`}
          moduleId={module.id}
          level={level}
          progress={progress}
          setProgress={setProgress}
        />
      </section>
      <section>
        <h2>Karteikarten</h2>
        <ReviewCards
          key={module.id}
          moduleId={module.id}
          progress={progress}
          setProgress={setProgress}
        />
      </section>
      {module.id === "math-rearrange" && (
        <RearrangementTrainer setProgress={setProgress} />
      )}
      {numericTasks.some((t) => t.topicId === module.id) && (
        <Exercises
          key={`exercises-${module.id}`}
          moduleId={module.id}
          progress={progress}
          setProgress={setProgress}
          openModule={openModule}
        />
      )}
      <section>
        <h2>Vertiefung</h2>
        <p>
          <MathText text={content.deepening} />
        </p>
        <div className="related-links">
          {module.related.map((related) =>
            related.available && related.kind === "calculator" ? (
              <button
                key={related.id}
                className="text-button"
                onClick={openCalculator}
              >
                {related.label} <ArrowRight size={16} />
              </button>
            ) : (
              <p key={related.id}>
                {related.label} · Erweiterungspunkt, noch nicht implementiert
              </p>
            ),
          )}
        </div>
      </section>
      <section className="module-sources">
        <h2>Quellen und fachlicher Prüfstatus</h2>
        <p>
          <strong>Status: unabhängige Fachprüfung ausstehend.</strong> Die
          folgenden Referenzen sind kein Nachweis einer abgeschlossenen Prüfung.
          Die Lerntexte sind eigenständig formuliert, keine übernommenen
          Fachbuchkapitel.
        </p>
        {moduleSourceIds.map((id) => {
          const source = sources.find((item) => item.id === id)!;
          return (
            <div key={id}>
              <h3>{source.title}</h3>
              <p>{source.note}</p>
              {source.locator && (
                <p>
                  <strong>Fundstelle:</strong> {source.locator}
                </p>
              )}
              {source.supports && (
                <p>
                  <strong>Prüfumfang:</strong> {source.supports}
                </p>
              )}
              {source.url && (
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  Referenz zur späteren Prüfung öffnen ↗
                </a>
              )}
            </div>
          );
        })}
      </section>
    </LessonExplanation>
    </article>
  );
}
