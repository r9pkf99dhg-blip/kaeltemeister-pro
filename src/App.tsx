import LearningDashboard from "./academy/adaptive/LearningDashboard";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Flame,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Target,
  Trophy,
  Wind,
  Zap,
} from "lucide-react";
import { articles, questions } from "./content";
import { emptyProgress, readProgress, STORAGE_KEY } from "./logic";
import type { Progress } from "./logic";

import PageHeading from "./components/PageHeading";
import Quiz from "./features/quiz/Quiz";
import HeatCalculator from "./features/calculator/HeatCalculator";
import Academy from "./academy/Academy";
import { legacyBridges } from "./academy/catalog";
import { useAcademyProgress } from "./academy/useAcademyProgress";

type Page = "dashboard" | "lernen" | "quiz" | "rechner" | "akademie";
const navigation = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "akademie" as const, label: "Akademie", icon: GraduationCap },
  { id: "lernen" as const, label: "Lernbereich", icon: BookOpen },
  { id: "quiz" as const, label: "Wissensquiz", icon: CircleHelp },
  { id: "rechner" as const, label: "Rechner", icon: Calculator },
];

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const academy = useAcademyProgress();
  const [academyExerciseId, setAcademyExerciseId] = useState<string | null>(
    null,
  );
  const [academyView, setAcademyView] = useState<
    "overview" | "review" | "exercises" | "exam"
  >("overview");
  const [academyModuleId, setAcademyModuleId] = useState<string | null>(null);
  const [initialProgress] = useState(readProgress);
  const [progress, setProgress] = useState<Progress>(initialProgress.progress);
  const [storageError, setStorageError] = useState(initialProgress.readFailed);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    // Nach einem fehlgeschlagenen Lesen darf ein leerer Startwert keine
    // möglicherweise noch vorhandenen Lerndaten überschreiben.
    if (initialProgress.readFailed) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress, initialProgress.readFailed]);
  function navigate(next: Page) {
    setPage(next);
    if (next !== "akademie") {
      setAcademyModuleId(null);
      setAcademyExerciseId(null);
      setAcademyView("overview");
    }
    setArticleId(null);
    setResetConfirm(false);
  }
  // Nach dem Rendern der Zielansicht fokussieren und scrollen. Das gilt auch
  // für Artikelwechsel innerhalb des Lernbereichs, nicht nur für die Navigation.
  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo?.({ top: 0, behavior: "instant" });
  }, [page, articleId]);
  const completed = Math.round((progress.read.length / articles.length) * 100);
  const activeArticle = articles.find((a) => a.id === articleId);
  const nextArticle =
    articles.find((a) => !progress.read.includes(a.id)) ?? articles[0];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("dashboard");
          }}
          aria-label="KälteMeister Pro – Dashboard"
        >
          <span className="brand-icon">
            <Snowflake size={28} />
          </span>
          <span>
            KälteMeister
            <span className="brand-sub">PRO · DEIN LERNBEGLEITER</span>
          </span>
        </a>
        <div className="sidebar-label">DEIN WERKZEUGKASTEN</div>
        <nav aria-label="Hauptnavigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              aria-current={page === id ? "page" : undefined}
              className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => navigate(id)}
            >
              <Icon size={20} />
              <span>{label}</span>
              {page === id && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-tip">
          <GraduationCap size={28} />
          <h3>
            Schritt für Schritt
            <br />
            zum Meister.
          </h3>
          <p>Ein bisschen Wissen jeden Tag macht den Unterschied.</p>
          <span>DU HAST DAS DRAUF.</span>
        </div>
        <div className="sidebar-bottom">
          <span className="avatar">KM</span>
          <div>
            Dein Lernplatz<small>Ohne Konto. Einfach loslegen.</small>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>
            Kältetechnik <ChevronRight size={14} />{" "}
            <strong>{navigation.find((n) => n.id === page)?.label}</strong>
          </span>
          <span className="topbar-note">
            <span className="status-dot" /> Bereit für deinen nächsten Schritt
          </span>
        </header>
        <main ref={mainRef} tabIndex={-1} id="main-content">
          {storageError && (
            <div role="alert" className="notice">
              Dein Lernfortschritt konnte nicht geladen oder gespeichert werden.
              Änderungen bleiben nur bis zum Schließen dieser Seite erhalten.
              Bei einem Lesefehler werden vorhandene Daten nicht überschrieben.
              Versuche, die Seite neu zu laden.
            </div>
          )}
          {page === "dashboard" && (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">WISSEN, DAS DICH WEITERBRINGT</p>
                  <h1>
                    Willkommen in deiner Werkstatt
                    <span className="mint-dot">.</span>
                  </h1>
                  <p>
                    Verstehen. Anwenden. Meister werden. Dein nächster Schritt
                    beginnt hier.
                  </p>
                </div>
                <span className="edition">
                  MEISTERSCHULE EDITION <Snowflake size={15} />
                </span>
              </div>
              <LearningDashboard
                progress={academy.progress}
                error={storageError ? null : academy.error}
                openModule={(id) => {
                  setAcademyModuleId(id);
                  setAcademyView("overview");
                  navigate("akademie");
                }}
                openView={(view, taskId) => {
                  setAcademyExerciseId(taskId ?? null);
                  setAcademyModuleId(null);
                  setAcademyView(view);
                  navigate("akademie");
                }}
              />
              <section className="academy-entry">
                <div>
                  <span className="pill">NEU · VERSION 0.3</span>
                  <h2>Deine intelligente Lernakademie.</h2>
                  <p>
                    Fünf Module, drei Wissensstufen und Karteikarten mit
                    Wiederholungsplan.
                  </p>
                </div>
                <button
                  className="button primary"
                  onClick={() => navigate("akademie")}
                >
                  Akademie öffnen <ArrowRight size={17} />
                </button>
              </section>
              <section className="hero">
                <div className="hero-copy">
                  <span className="hero-badge">
                    <Sparkles size={14} /> DEIN WEG ZUM MEISTER
                  </span>
                  <h2>
                    Kühler Kopf.
                    <br />
                    <span>Starkes Fachwissen.</span>
                  </h2>
                  <p>
                    Mach aus Theorie echtes Verständnis.
                    <br />
                    Mit kompakten Lerneinheiten und Wissen für die Praxis.
                  </p>
                  <button
                    className="button light"
                    onClick={() => {
                      navigate("lernen");
                      setArticleId(nextArticle.id);
                    }}
                  >
                    Jetzt weiterlernen <ArrowRight size={18} />
                  </button>
                </div>
                <CycleIllustration />
              </section>
              <div className="stats-grid">
                <Stat
                  icon={<BookOpen size={22} />}
                  label="Dein Lernfortschritt"
                  value={`${progress.read.length} von ${articles.length}`}
                  detail="Lerneinheiten abgeschlossen"
                  tint="green"
                />
                <Stat
                  icon={<Target size={22} />}
                  label="Dein Quiz-Bestwert"
                  value={
                    progress.attempts ? `${progress.best} %` : "Noch offen"
                  }
                  detail={
                    progress.attempts
                      ? `Aus ${progress.attempts} abgeschlossenen Quiz`
                      : "Zeig, was du schon weißt"
                  }
                  tint="orange"
                />
                <Stat
                  icon={<Zap size={22} />}
                  label="Wissen für die Praxis"
                  value="1 Rechner"
                  detail="Wärmeleistung einfach berechnen"
                  tint="blue"
                />
              </div>
              <div className="section-title">
                <div>
                  <h2>Deine nächste Lerneinheit</h2>
                  <p>Die Grundlagen sitzen. Der Rest baut darauf auf.</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => navigate("lernen")}
                >
                  Alle Lerneinheiten <ArrowRight size={16} />
                </button>
              </div>
              <div className="dashboard-lower">
                <section className="lesson-feature">
                  <div className="lesson-art">
                    <Snowflake size={64} strokeWidth={1} />
                    <div className="orbit" />
                    <span>01 / GRUNDLAGEN</span>
                  </div>
                  <div className="lesson-feature-copy">
                    <span className="pill">{nextArticle.category}</span>
                    <h3>{nextArticle.title}</h3>
                    <p>{nextArticle.intro}</p>
                    <div className="lesson-bottom">
                      <span>{nextArticle.minutes} Min. Lesezeit</span>
                      <button
                        className="round-button"
                        aria-label={`${nextArticle.title} öffnen`}
                        onClick={() => {
                          navigate("lernen");
                          setArticleId(nextArticle.id);
                        }}
                      >
                        <ArrowUpRight size={21} />
                      </button>
                    </div>
                  </div>
                </section>
                <section className="quiz-teaser">
                  <span className="icon-box">
                    <Trophy size={25} />
                  </span>
                  <h3>Wie fit ist dein Fachwissen?</h3>
                  <p>
                    {questions.length} Fragen. Direktes Feedback.
                    <br />
                    Finde heraus, was schon sitzt.
                  </p>
                  <button
                    className="text-button"
                    onClick={() => navigate("quiz")}
                  >
                    Quiz starten <ArrowRight size={17} />
                  </button>
                </section>
              </div>
            </>
          )}
          {page === "lernen" && (
            <>
              {activeArticle ? (
                <article className="article">
                  <button
                    className="text-button back"
                    onClick={() => setArticleId(null)}
                  >
                    <ChevronLeft size={17} /> Alle Lerneinheiten
                  </button>
                  <p className="eyebrow">
                    {activeArticle.category} · {activeArticle.minutes} MIN.
                    LESEZEIT
                  </p>
                  <h1>{activeArticle.title}</h1>
                  <p className="article-intro">{activeArticle.intro}</p>
                  <p className="review-notice">
                    Bestehender Lernartikel · unabhängige Fachprüfung noch
                    offen. Das zugehörige Akademiemodul bietet zusätzliche
                    Niveaus und transparente Quellenhinweise.
                  </p>
                  {legacyBridges.find((bridge) =>
                    bridge.articleIds.some((id) => id === activeArticle.id),
                  ) && (
                    <button
                      className="button secondary"
                      onClick={() => {
                        setAcademyModuleId(
                          legacyBridges.find((bridge) =>
                            bridge.articleIds.some(
                              (id) => id === activeArticle.id,
                            ),
                          )!.moduleId,
                        );
                        navigate("akademie");
                      }}
                    >
                      Dieses Thema in der Akademie vertiefen{" "}
                      <ArrowRight size={17} />
                    </button>
                  )}
                  {activeArticle.id === "kreislauf" && (
                    <div className="article-cycle">
                      <CycleIllustration />
                    </div>
                  )}
                  {activeArticle.sections.map((section) => (
                    <section key={section.title}>
                      <h2>{section.title}</h2>
                      <p>{section.text}</p>
                    </section>
                  ))}
                  <aside className="takeaway">
                    <span>
                      <Sparkles size={21} /> Das nimmst du mit
                    </span>
                    <p>{activeArticle.takeaway}</p>
                  </aside>
                  <button
                    className="button primary"
                    disabled={progress.read.includes(activeArticle.id)}
                    onClick={() =>
                      setProgress((p) => ({
                        ...p,
                        read: [...new Set([...p.read, activeArticle.id])],
                      }))
                    }
                  >
                    <CheckCircle2 size={18} />
                    {progress.read.includes(activeArticle.id)
                      ? "Als gelesen gespeichert"
                      : "Als gelesen markieren"}
                  </button>
                  <button
                    className="text-button article-quiz"
                    onClick={() => navigate("quiz")}
                  >
                    Wissen im Quiz festigen <ArrowRight size={17} />
                  </button>
                </article>
              ) : (
                <>
                  <PageHeading
                    eyebrow="DEIN WISSENSFUNDAMENT"
                    title="Verstehen statt auswendig lernen."
                    description="Kompakte Fachartikel, klare Beispiele und Wissen, das im Alltag hilft."
                  />
                  <div className="learning-progress">
                    <span>
                      <BookOpen size={20} /> {progress.read.length} von{" "}
                      {articles.length} Lerneinheiten gelesen
                    </span>
                    <progress
                      max={100}
                      value={completed}
                      aria-label="Lernfortschritt"
                    />
                    <strong>{completed} %</strong>
                  </div>
                  <div className="article-grid">
                    {articles.map((article, i) => (
                      <button
                        className="article-card"
                        key={article.id}
                        onClick={() => setArticleId(article.id)}
                      >
                        <div className={`article-card-art art-${i}`}>
                          <span>0{i + 1}</span>
                          {i === 0 ? (
                            <Snowflake size={56} />
                          ) : i === 1 ? (
                            <Flame size={56} />
                          ) : (
                            <Wind size={56} />
                          )}
                        </div>
                        <div className="article-card-body">
                          <div className="card-meta">
                            <span className="pill">{article.category}</span>
                            {progress.read.includes(article.id) && (
                              <span className="read-badge">
                                <Check size={14} /> Gelesen
                              </span>
                            )}
                          </div>
                          <h2>{article.title}</h2>
                          <p>{article.intro}</p>
                          <div className="lesson-bottom">
                            <span>{article.minutes} Min. Lesezeit</span>
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="notice">
                    <ShieldCheck size={20} /> Die Artikel dienen dem Lernen. Für
                    Arbeiten an realen Anlagen gelten Herstellerangaben,
                    Sicherheitsvorschriften und die erforderliche Qualifikation.
                  </div>
                </>
              )}
            </>
          )}
          {page === "quiz" && (
            <Quiz
              onComplete={(score) =>
                setProgress((p) => ({
                  ...p,
                  attempts: p.attempts + 1,
                  best: Math.max(p.best, score),
                  last: score,
                }))
              }
            />
          )}
          {page === "rechner" && <HeatCalculator />}
          {page === "akademie" && (
            <Academy
              initialModuleId={academyModuleId}
              initialView={academyView}
              initialExerciseId={academyExerciseId}
              progress={academy.progress}
              setProgress={academy.setProgress}
              error={academy.error}
              openCalculator={() => navigate("rechner")}
            />
          )}
          <footer>
            <span>
              <Snowflake size={15} /> KälteMeister Pro
            </span>
            <span>Für dein Handwerk. Für deine Zukunft.</span>
            <button
              className="text-button"
              onClick={() => setResetConfirm((v) => !v)}
            >
              Fortschritt zurücksetzen
            </button>
          </footer>
          {resetConfirm && (
            <div
              className="reset-panel"
              role="region"
              aria-label="Fortschritt zurücksetzen"
            >
              <p>
                Alle gelesenen Artikel, Quiz-Ergebnisse und Akademie-Lerndaten
                in diesem Browser löschen?
              </p>
              {academy.blocked && (
                <p>
                  Nicht sicher lesbare Akademie-Daten bleiben geschützt und
                  werden nicht automatisch gelöscht.
                </p>
              )}
              <button
                className="button danger"
                onClick={() => {
                  setProgress({ ...emptyProgress, read: [] });
                  academy.reset();
                  setResetConfirm(false);
                }}
              >
                Ja, Fortschritt löschen
              </button>
              <button
                className="text-button"
                onClick={() => setResetConfirm(false)}
              >
                Abbrechen
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  tint: string;
}) {
  return (
    <section className="stat-card">
      <span className={`icon-box ${tint}`}>{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </section>
  );
}
function CycleIllustration() {
  return (
    <div
      className="cycle"
      role="img"
      aria-label="Kältekreislauf: Verdampfer, Verdichter, Verflüssiger und Expansionsorgan"
    >
      <div className="cycle-center">
        <Snowflake size={34} strokeWidth={1.3} />
        <span>DER KÄLTEKREISLAUF</span>
      </div>
      <div className="cycle-node evaporator">
        <Wind size={23} />
        <span>
          Verdampfer<small>Wärme aufnehmen</small>
        </span>
      </div>
      <div className="cycle-node compressor">
        <Zap size={23} />
        <span>
          Verdichter<small>Druck erhöhen</small>
        </span>
      </div>
      <div className="cycle-node condenser">
        <Flame size={23} />
        <span>
          Verflüssiger<small>Wärme abgeben</small>
        </span>
      </div>
      <div className="cycle-node expansion">
        <ArrowDown size={23} />
        <span>
          Expansionsorgan<small>Druck absenken</small>
        </span>
      </div>
      <ArrowRight className="flow flow-top" size={22} />
      <ArrowDown className="flow flow-right" size={22} />
      <ArrowRight className="flow flow-bottom" size={22} />
      <ArrowDown className="flow flow-left" size={22} />
    </div>
  );
}
