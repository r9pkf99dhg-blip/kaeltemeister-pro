import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { domains, modules, academyQuestions, formulas } =
    await server.ssrLoadModule("/src/academy/catalog.ts");
  const { numericTasks } = await server.ssrLoadModule(
    "/src/academy/exercises/data.ts",
  );
  const rows = domains.map((d) => {
    const available = modules.filter((m) => m.domainId === d.id);
    const planned = d.chapters.flatMap((c) =>
      c.subchapters.flatMap((s) => s.plannedTopics),
    );
    return `| ${d.title} | ${available.length} | ${academyQuestions.filter((q) => available.some((m) => m.id === q.moduleId)).length} | ${numericTasks.filter((t) => t.domainId === d.id).length} | ${planned.join("; ") || "Vertiefung nach Fachabnahme"} |`;
  });
  const unused = formulas.filter(
    (f) =>
      !modules.some((m) => m.formulaIds.includes(f.id)) &&
      !numericTasks.some((t) => t.formulaId === f.id),
  );
  await writeFile(
    "docs/DOMAIN_AUDIT.md",
    `# Fachgebiets-Bestandsaufnahme · 0.6\n\nAus demselben Fachkatalog erzeugt: npm run docs:audit. Ein Modul ist verfügbar, wenn seine Inhalte, Fragen und Karten im Katalog vorliegen; das ist keine unabhängige fachliche Freigabe. Leere Fachgebiete zählen nicht als abgeschlossen.\n\n| Fachgebiet | Module | Modulfragen | Zahlenaufgaben | Weitere Themen, ausdrücklich geplant |\n| --- | ---: | ---: | ---: | --- |\n${rows.join("\n")}\n\n## Offene Architektur-/Inhaltsarbeit\n\n- Alle Modul- und Kompetenzverweise werden auf Existenz und Zyklen geprüft.\n- Fachgebiete ohne Module besitzen Kapitelstruktur, aber noch keinen vollständigen Lernpfad.\n- Nicht direkt mit Modul/Zahlenaufgabe verbundene Formeln: ${unused.map((f) => f.id).join(", ") || "keine"}. Standalone-Fragen/Fachnotizen können weitere legitime Referenzen enthalten.\n- Formelsatz und Rechenkern bleiben gemeinsame Bausteine für spätere professionelle Rechner.\n- Externe Fachabnahme, echte Apple-Geräte und reale Stoff-/Bauteildaten bleiben getrennte Aufgaben.\n`,
  );
} finally {
  await server.close();
}
