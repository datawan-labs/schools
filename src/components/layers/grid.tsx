import { layer, worker } from "@/stores";
import { toast } from "solid-sonner";
import { createSignal, onCleanup } from "solid-js";
import { WorkerGridData } from "@/services/worker-grid";
import { GridCellLayer, GridCellLayerProps } from "@deck.gl/layers";
import { Table, tableFromIPC } from "apache-arrow";

type GridLayerProps = Partial<Omit<GridCellLayerProps, "data" | "onHover">> & {
  onHover?: (x: number, y: number, index: number | undefined) => void;

  data: {
    /**
     * color in INT8 value
     */
    colors: Uint8Array;

    /**
     * coordinates buffer
     */
    coordinates: Float64Array;
  };
};

const useGridLayer = (props: GridLayerProps) =>
  new GridCellLayer({
    id: "grid",
    cellSize: 960,
    pickable: true,
    extruded: false,
    onHover: (e) =>
      props.onHover?.(e.x, e.y, e.index > 0 ? e.index : undefined),
    data: {
      length: props.data.coordinates.length / 2,
      attributes: {
        getFillColor: { value: props.data.colors, size: 4 },
        getPosition: { value: props.data.coordinates, size: 2 },
      },
    },
  });

/**
 * event listner from worker
 */
export const useGridDataLayer = () => {
  const [table, setTable] = createSignal<Table>();

  const [data, setData] = createSignal<GridLayerProps["data"]>({
    colors: new Uint8Array(),
    coordinates: new Float64Array(),
  });

  const showTooltip = (x: number, y: number, index: number | undefined) => {
    if (!index) layer.grid.tooltip = undefined;
    else
      layer.grid.tooltip = {
        position: { x, y },
        data: table()?.get(index)?.toJSON() as Record<string, unknown>,
      };
  };

  const grids = () => useGridLayer({ data: data(), onHover: showTooltip });

  const processMessage = (e: MessageEvent<WorkerGridData>) => {
    setData({
      colors: e.data.colors,
      coordinates: e.data.coordinates,
    });

    setTable(tableFromIPC(e.data.table));

    layer.grid.legend = e.data.legend;

    toast.info(`finishing process in ${e.data.timer.toFixed(2)} ms`);
  };

  worker.grid.addEventListener("message", processMessage);

  onCleanup(() => worker.grid.removeEventListener("message", processMessage));

  return grids;
};
