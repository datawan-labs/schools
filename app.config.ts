import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "@solidjs/start/config";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default defineConfig({
  ssr: false,
  extensions: [".mdx", ".md"],
  server: {
    static: true,
    compressPublicAssets: {
      brotli: false,
    },
  },
  vite: {
    plugins: [
      mdx({
        jsxImportSource: "solid-js/h",
        remarkPlugins: [remarkGfm],
      }),
    ],
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
