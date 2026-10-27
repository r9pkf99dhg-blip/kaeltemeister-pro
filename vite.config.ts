import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/kaeltemeister-pro/",
  plugins: [react(), tailwindcss()],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
    css: false,
  },
});
