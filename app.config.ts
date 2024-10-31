import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "@solidjs/start/config";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default defineConfig({
  ssr: false,
  server: {
    static: true,
    preset: "cloudflare-pages-static",
    compressPublicAssets: {
      brotli: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["@duckdb/duckdb-wasm"],
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
