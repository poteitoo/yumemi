import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/*.spec*"],
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
    coverage: {
      reporter: ["text", "json-summary", "json"],
    },
  },
});
