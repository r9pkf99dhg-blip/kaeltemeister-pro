import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/kaeltemeister-pro/",
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "academy-content-v06",
              test: /src[\\/]academy[\\/]deep[\\/](?:math|electrical|thermal|case)-(?:lessons|formulas|tasks)\.ts$/,
            },
            { name: "formula-renderer", test: /node_modules[\\/]katex[\\/]/ },
            {
              name: "react-vendor",
              test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
            },
          ],
        },
      },
    },
  },
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
    css: false,
  },
});
