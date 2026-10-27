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
  RotateCcw,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Target,
  Trophy,
  Wind,
  Zap,
} from "lucide-react";
import { articles, questions } from "./content";
import {
  calculateHeat,
  emptyProgress,
  format,
  loadProgress,
  parseDecimal,
  STORAGE_KEY,
} from "./logic";
import type { Progress } from "./logic";

type Page = "dashboard" | "lernen" | "quiz" | "rechner";
const navigation = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "lernen" as const, label: "Lernbereich", icon: BookOpen },
  { id: "quiz" as const, label: "Wissensquiz", icon: CircleHelp },
  { id: "rechner" as const, label: "Rechner", icon: Calculator },
];

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [storageError, setStorageError] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress]);
  function navigate(next: Page) {
    setPage(next);
    setArticleId(null);
    setResetConfirm(false);
    window.scrollTo?.({ top: 0, behavior: "instant" });
    mainRef.current?.focus();
  }
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
              Dein Browser erlaubt keine lokale Speicherung. Dein Fortschritt
              bleibt nur bis zum Schließen dieser Seite erhalten.
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
                  value={`${progress.read.length} von 3`}
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
                    12 Fragen. Direktes Feedback.
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
                Alle gelesenen Artikel und Quiz-Ergebnisse in diesem Browser
                löschen?
              </p>
              <button
                className="button danger"
                onClick={() => {
                  setProgress({ ...emptyProgress, read: [] });
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

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
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

function Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const question = questions[answers.length];
  const correctCount = answers.filter(
    (answer, index) => answer === questions[index].correct,
  ).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const nextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    nextRef.current?.focus();
  }, [answers.length, finished]);
  function advance() {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);
    setSubmitted(false);
    if (next.length === questions.length) {
      setFinished(true);
      onComplete(
        Math.round(
          (next.filter((a, i) => a === questions[i].correct).length /
            questions.length) *
            100,
        ),
      );
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="ZEIG, WAS DU KANNST"
        title="Dein Wissen auf dem Prüfstand."
        description="12 Fragen zur Kältetechnik. Ohne Zeitdruck, mit einer Erklärung zu jeder Antwort."
      />
      <div className="quiz-layout">
        <div className="quiz-card" ref={nextRef} tabIndex={-1}>
          {finished ? (
            <>
              <span className="result-icon">
                <Trophy size={42} />
              </span>
              <p className="eyebrow">QUIZ ABGESCHLOSSEN</p>
              <h2>
                {score >= 75
                  ? "Starkes Fachwissen!"
                  : "Jede Runde bringt dich weiter."}
              </h2>
              <div className="score">
                {score}
                <span> %</span>
              </div>
              <p>
                Du hast {correctCount} von {questions.length} Fragen richtig
                beantwortet.
              </p>
              <p>
                Dein Ergebnis ist in deinem lokalen Lernfortschritt gespeichert.
              </p>
              <button
                className="button primary"
                onClick={() => {
                  setAnswers([]);
                  setSelected(null);
                  setSubmitted(false);
                  setFinished(false);
                }}
              >
                <RotateCcw size={17} /> Noch einmal üben
              </button>
              <div className="review-list">
                <h3>Deine Auswertung</h3>
                {questions.map((q, i) => (
                  <div key={q.question} className="review-item">
                    <span
                      className={
                        answers[i] === q.correct
                          ? "correct-text"
                          : "incorrect-text"
                      }
                    >
                      {answers[i] === q.correct
                        ? "✓ Richtig"
                        : "✕ Nicht richtig"}{" "}
                      · Frage {i + 1}
                    </span>
                    <h4>{q.question}</h4>
                    <p>Deine Antwort: {q.options[answers[i]]}</p>
                    <p>
                      <strong>Richtige Antwort:</strong> {q.options[q.correct]}
                    </p>
                    <small>{q.explanation}</small>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="quiz-meta">
                <span>
                  FRAGE {answers.length + 1} VON {questions.length}
                </span>
                <span>Grundlagen & Praxis</span>
              </div>
              <progress
                value={answers.length}
                max={questions.length}
                aria-label="Quizfortschritt"
              />
              <h2>{question.question}</h2>
              <fieldset className="answers" disabled={submitted}>
                <legend className="sr-only">Wähle eine Antwort</legend>
                {question.options.map((option, i) => (
                  <label
                    className={`answer ${selected === i ? "selected" : ""} ${submitted && i === question.correct ? "correct" : ""} ${submitted && selected === i && i !== question.correct ? "incorrect" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={selected === i}
                      onChange={() => setSelected(i)}
                    />
                    <span className="answer-letter" aria-hidden="true">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{option}</span>
                    {submitted && i === question.correct && (
                      <CheckCircle2 size={20} />
                    )}
                  </label>
                ))}
              </fieldset>
              {submitted && (
                <div
                  role="status"
                  className={`feedback ${selected === question.correct ? "success" : "retry"}`}
                >
                  <strong>
                    {selected === question.correct
                      ? "Richtig. Gut gemacht!"
                      : "Noch nicht ganz."}
                  </strong>
                  <p>{question.explanation}</p>
                </div>
              )}
              <div className="quiz-actions">
                <span>
                  {submitted
                    ? "Verstehen zählt mehr als Raten."
                    : "Eine Antwort ist richtig."}
                </span>
                {submitted ? (
                  <button className="button primary" onClick={advance}>
                    {answers.length === questions.length - 1
                      ? "Auswertung ansehen"
                      : "Nächste Frage"}{" "}
                    <ArrowRight size={17} />
                  </button>
                ) : (
                  <button
                    className="button primary"
                    disabled={selected === null}
                    onClick={() => setSubmitted(true)}
                  >
                    Antwort prüfen <Check size={17} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <aside className="quiz-aside">
          <span className="icon-box orange">
            <GraduationCap size={25} />
          </span>
          <h3>Lernen, das hängen bleibt.</h3>
          <p>
            Lies die Erklärung nach jeder Antwort. So verstehst du auch, warum
            eine Antwort richtig ist.
          </p>
          <div className="aside-fact">
            <ShieldCheck size={18} />
            <span>
              Nur abgeschlossene Runden zählen. Dein Bestwert bleibt erhalten.
            </span>
          </div>
          <p className="small-muted">
            Beim Verlassen des Quiz beginnt die aktuelle Runde wieder von vorn.
          </p>
        </aside>
      </div>
    </>
  );
}

function HeatCalculator() {
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
            <div className="formula">
              Q̇ = ṁ × c<sub>p</sub> × ΔT
            </div>
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
