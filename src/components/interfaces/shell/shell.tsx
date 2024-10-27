// import "xterm/css/xterm.css";
import "@xterm/xterm/css/xterm.css";

import { db } from "@/libs/duck";
import { onMount } from "solid-js";
import * as shell from "@duckdb/duckdb-wasm-shell";
import shellWasm from "@duckdb/duckdb-wasm-shell/dist/shell_bg.wasm?url";

const Shell = () => {
  let container: HTMLDivElement;

  onMount(() => {
    shell.embed({
      container: container,
      shellModule: shellWasm,
      backgroundColor: "#1f2023",
      fontFamily: "JetBrains Mono Variable",
      resolveDatabase: async () => db,
    });
  });

  return (
    <div
      class="relative aspect-video w-full overflow-scroll"
      ref={container!}
    />
  );
};

export default Shell;
