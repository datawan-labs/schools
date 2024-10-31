import { MAP_STYLES } from "./constants";
import { ColorConfig } from "./libs/colors";
import { createStore, createMutable } from "solid-js/store";

const config = createMutable({
  query: undefined as number | undefined,
  /**
   * map style config
   */
  styles: MAP_STYLES[0],
});

/**
 * we save worker to store so we can use it anywhere
 */
const [worker] = createStore({
  grid: new Worker(new URL("./services/worker-grid.ts", import.meta.url), {
    type: "module",
  }),
  point: new Worker(new URL("./services/worker-point.ts", import.meta.url), {
    type: "module",
  }),
});

export type LegendLayer = Map<
  string | number | undefined,
  {
    total: number;
    /**
     * [r, g, b, alpha]
     */
    color: [number, number, number, number];
  }
>;

export interface LayerStore {
  query: string;
  color?: ColorConfig;
  legend?: LegendLayer;
}

const layer = createMutable<{ point: LayerStore; grid: LayerStore }>({
  grid: {
    query:
      "SELECT value, ST_AsWKB(location) as location FROM popgrid.parquet WHERE kode_provinsi = '33'",
    legend: new Map(),
    color: {
      code: "Turbo",
      alpha: 255,
      length: 32,
      reverse: false,
    },
  },
  point: {
    query:
      "SELECT jenjang as color, ST_AsWKB(location) as location, 500 as radius FROM sekolah.parquet LIMIT 10000;",
    legend: new Map(),
    color: {
      code: "Viridis",
      alpha: 255,
      length: 8,
      reverse: false,
    },
  },
});

export { worker, layer, config };
