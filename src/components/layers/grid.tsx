import { layer, worker } from "@/stores";
import { toast } from "solid-sonner";
import { createSignal, onCleanup } from "solid-js";
import { WorkerGridData } from "@/services/worker-grid";
import { GridCellLayer, GridCellLayerProps } from "@deck.gl/layers";

type GridLayerProps = Partial<Omit<GridCellLayerProps, "data" | "onHover">> & {
  onHover?: (index: number) => void;

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
    extruded: false,
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
  const [data, setData] = createSignal<GridLayerProps["data"]>({
    colors: new Uint8Array(),
    coordinates: new Float64Array(),
  });

  const grids = () => useGridLayer({ data: data() });

  const processMessage = (e: MessageEvent<WorkerGridData>) => {
    setData({
      colors: e.data.colors,
      coordinates: e.data.coordinates,
    });

    layer.grid.legend = e.data.legend;

    toast.info(`finishing process in ${e.data.timer.toFixed(2)} ms`);
  };

  worker.grid.addEventListener("message", processMessage);

  onCleanup(() => worker.grid.removeEventListener("message", processMessage));

  return grids;
};
