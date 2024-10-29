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

export type Legend = Map<
  string | number | undefined,
  {
    total: number;
    /**
     * [r, g, b, alpha]
     */
    color: [number, number, number, number];
  }
>;

interface LayerStore {
  query: string;
  color?: ColorConfig;
  legend?: Legend;
}

const layer = createMutable<{ point: LayerStore }>({
  point: {
    query:
      "SELECT jenjang as color, ST_AsWKB(location) as location, 500 as radius FROM final.parquet LIMIT 10000;",
    color: {
      code: "Viridis",
      alpha: 255,
      length: 8,
      reverse: false,
    },
    legend: new Map(),
  },
});

export { worker, layer };
