import { beforeEach, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { academyQuestions, modules } from "./catalog";
import { ACADEMY_KEY } from "./progress";
import { STORAGE_KEY } from "../logic";

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  window.scrollTo = vi.fn();
});
async function openAcademy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "Akademie" }));
}
async function openCycle(user: ReturnType<typeof userEvent.setup>) {
  await openAcademy(user);
  await user.click(
    screen.getByRole("button", {
      name: /KÄLTETECHNIK · 01 Grundlagen des Kältekreislaufs/,
    }),
  );
}
it("zeigt alle Modulabschnitte, echte Niveauunterschiede und den offenen Prüfstatus", async () => {
  const user = userEvent.setup();
  render(<App />);
  await openCycle(user);
  for (const heading of [
    "Lernziele",
    "Einfacher Einstieg",
    "Fachliche Erklärung",
    "Technische Zusammenhänge",
    "Formeln und Einheiten",
    "Durchgerechnetes Praxisbeispiel",
    "Typische Fehler",
    "Zusammenfassung",
    "Verständnisfragen",
    "Vertiefung",
    "Quellen und fachlicher Prüfstatus",
  ])
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
  expect(
    screen.getByText(modules[0].levels.grundlagen.explanation),
  ).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Meisterniveau" }));
  expect(
    screen.getByText(modules[0].levels.meister.explanation),
  ).toBeInTheDocument();
  expect(
    screen.queryByText(modules[0].levels.grundlagen.explanation),
  ).not.toBeInTheDocument();
  expect(
    screen.getByText(/Status: unabhängige Fachprüfung ausstehend/),
  ).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Niveau als gelesen markieren" }),
  );
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).read["cycle-basics"].levels,
  ).toEqual(["meister"]);
});
it("sucht über Fachbegriffe und zeigt geplante Fachgebiete ehrlich als offen", async () => {
  const user = userEvent.setup();
  render(<App />);
  await openAcademy(user);
  await user.type(screen.getByRole("searchbox"), "ENTHALPIE");
  expect(
    screen.getByRole("heading", { name: "Fachbegriffe" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Enthalpie" }),
  ).toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText("Fachgebiet"), "elektro");
  expect(screen.getByRole("status")).toHaveTextContent(
    "0 verfügbare Lernmodule",
  );
  expect(
    screen.getByText("Hier gibt es noch keine passenden Lernmodule."),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Elektrotechnik", { selector: "summary span" }),
  ).toBeInTheDocument();
});
it("speichert Modulantworten, zeigt Übungsbedarf und erhält Antworten nach Neuladen", async () => {
  const user = userEvent.setup();
  const view = render(<App />);
  await openCycle(user);
  const question = academyQuestions[0];
  const wrong = question.options.find(
    (option) => option.id !== question.correctOptionId,
  )!;
  await user.click(screen.getByRole("radio", { name: wrong.text }));
  await user.click(
    screen.getAllByRole("button", { name: "Antwort prüfen" })[0],
  );
  expect(screen.getByText("Noch nicht richtig.")).toBeInTheDocument();
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).answers[question.id],
  ).toMatchObject({ optionId: wrong.id, correct: false });
  view.unmount();
  render(<App />);
  await openAcademy(user);
  await user.selectOptions(screen.getByLabelText("Lernstatus"), "practice");
  expect(screen.getByRole("status")).toHaveTextContent(
    "1 verfügbare Lernmodule",
  );
  await user.click(
    screen.getByRole("button", {
      name: /KÄLTETECHNIK · 01 Grundlagen des Kältekreislaufs/,
    }),
  );
  expect(screen.getByText(/Zuletzt gespeichert:/)).toHaveTextContent(
    wrong.text,
  );
  await user.click(
    screen.getByRole("radio", {
      name: question.options.find(
        (option) => option.id === question.correctOptionId,
      )!.text,
    }),
  );
  await user.click(
    screen.getAllByRole("button", { name: "Antwort prüfen" })[0],
  );
  expect(screen.getByText("Richtig.", { exact: true })).toBeInTheDocument();
});
it("verlangt zuerst das Umdrehen und speichert anschließend den Wiederholungstermin", async () => {
  const user = userEvent.setup();
  render(<App />);
  await openAcademy(user);
  await user.click(
    screen.getByRole("button", { name: /Karteikarten wiederholen/ }),
  );
  expect(screen.getByRole("button", { name: "Gewusst" })).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "Antwort zeigen" }));
  await user.click(screen.getByRole("button", { name: "Gewusst" }));
  expect(screen.getByRole("status")).toHaveTextContent("Wiederholung in 1 Tag");
  expect(
    JSON.parse(localStorage.getItem(ACADEMY_KEY)!).reviews["cycle-card1"]
      .intervalDays,
  ).toBe(1);
});
it("erhält alte Daten und erfindet bei der Migration keine Einzelantworten", async () => {
  const old = { read: ["kreislauf"], attempts: 1, best: 75, last: 75 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(old));
  const user = userEvent.setup();
  render(<App />);
  await openAcademy(user);
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(old);
  const migrated = JSON.parse(localStorage.getItem(ACADEMY_KEY)!);
  expect(migrated.legacySummary).toEqual({ attempts: 1, best: 75, last: 75 });
  expect(migrated.answers).toEqual({});
  expect(migrated.read["cycle-basics"].levels).toEqual(["grundlagen"]);
});
it("überschreibt eine unbekannte Version auch nach Lernaktionen nicht", async () => {
  const unknown = '{"schemaVersion":99}';
  localStorage.setItem(ACADEMY_KEY, unknown);
  const user = userEvent.setup();
  render(<App />);
  await openCycle(user);
  expect(screen.getByRole("alert")).toHaveTextContent("nicht überschrieben");
  await user.click(
    screen.getByRole("button", { name: "Niveau als gelesen markieren" }),
  );
  expect(localStorage.getItem(ACADEMY_KEY)).toBe(unknown);
});

it("verknüpft den bestehenden Lernartikel mit dem zugehörigen Akademiemodul", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Lernbereich" }));
  await user.click(
    screen.getByRole("button", { name: /Den Kältekreislauf verstehen/ }),
  );
  await user.click(
    screen.getByRole("button", {
      name: /Dieses Thema in der Akademie vertiefen/,
    }),
  );
  expect(
    screen.getByRole("heading", { name: "Grundlagen des Kältekreislaufs" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Verständnisfragen" }),
  ).toBeInTheDocument();
});

it("meldet einen v2-Schreibfehler und lässt vorhandene v1-Daten bestehen", async () => {
  const old = { read: ["kreislauf"], attempts: 1, best: 75, last: 75 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(old));
  const write = Storage.prototype.setItem;
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (
    this: Storage,
    key: string,
    value: string,
  ) {
    if (key === ACADEMY_KEY)
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    write.call(this, key, value);
  });
  const user = userEvent.setup();
  render(<App />);
  await openAcademy(user);
  expect(screen.getByRole("alert")).toHaveTextContent(
    "konnte nicht gespeichert werden",
  );
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(old);
});
