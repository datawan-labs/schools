import "@xterm/xterm/css/xterm.css";

import { onMount } from "solid-js";
import { db } from "@/services/setup";
import * as shell from "@duckdb/duckdb-wasm-shell";
import shellWasm from "@duckdb/duckdb-wasm-shell/dist/shell_bg.wasm?url";

const ShellCanvas = () => {
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
    <div class="relative h-full w-full overflow-scroll" ref={container!} />
  );
};

export default ShellCanvas;
