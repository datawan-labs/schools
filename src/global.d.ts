/// <reference types="@solidjs/start/env" />

interface ImportMetaEnv {
  /**
   * url for data location, all data available in
   * public
   */
  readonly VITE_BASE_DATA_URL: string;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.md" {
  import type { Component } from "solid-js";
  const Component: Component;
  export default Component;
}

declare module "*.mdx" {
  import type { Component } from "solid-js";
  const Component: Component;
  export default Component;
}
