import { ColorConfig } from "./libs/colors";
import { createStore, createMutable } from "solid-js/store";

/**
 * we save worker to store so we can use it anywhere
 */
const [worker] = createStore({
  /**
   * worker for storing worker object, we use in store
   * so we can use it anywhere
   */
  point: new Worker(new URL("./services/worker-point.ts", import.meta.url), {
    type: "module",
  }),
});

interface LayerProps {
  query: string;
  color?: ColorConfig;
  legend?: Set<string>;
}

const layer = createMutable<{
  point: LayerProps;
}>({
  point: {
    query:
      "SELECT jenjang as color, ST_AsWKB(location) as location, 500 as radius FROM final.parquet LIMIT 10000;",
    color: {
      code: "Viridis",
      alpha: 255,
      length: 8,
      reverse: false,
    },
  },
});

export { worker, layer };
