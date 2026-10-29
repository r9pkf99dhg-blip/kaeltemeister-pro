import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
try {
  const { reviewMarkdown } = await server.ssrLoadModule(
    "/src/quality/register.ts",
  );
  await writeFile("docs/REVIEW_REGISTER.md", reviewMarkdown());
} finally {
  await server.close();
}
