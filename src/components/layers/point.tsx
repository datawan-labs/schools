import { worker } from "@/stores";
import { toast } from "solid-sonner";
import { Table, tableFromIPC } from "apache-arrow";
import { createSignal, onCleanup } from "solid-js";
import type { WorkerPointData } from "@/services/worker-point";
import { ScatterplotLayer, ScatterplotLayerProps } from "@deck.gl/layers";

type PointLayerProps = Partial<
  Omit<ScatterplotLayerProps, "data" | "onHover">
> & {
  onHover?: (index: number) => void;

  data: {
    /**
     * color in INT8 value
     */
    colors: Uint8Array;

    /**
     * radius buffer for radius size each cell, we call it radiuses
     * for plural of radius and idc if you use radii :D
     */
    radiuses: Uint16Array;

    /**
     * coordinates buffer
     */
    coordinates: Float64Array;
  };
};

const usePointLayer = (props: PointLayerProps) =>
  new ScatterplotLayer({
    id: "point",
    pickable: true,
    radiusUnits: "meters",
    /**
     * we only use hover when index more than 0,
     * because deck.gl still fires hover even the index
     * is -1
     */
    onHover: (e) => e.index > 0 && props.onHover?.(e.index),
    data: {
      length: props.data.coordinates.length / 2,
      attributes: {
        getRadius: { value: props.data.radiuses, size: 1 },
        getFillColor: { value: props.data.colors, size: 4 },
        getPosition: { value: props.data.coordinates, size: 2 },
      },
    },
  });

/**
 * event listner from worker
 */
export const usePointDataLayer = () => {
  const [table, setTable] = createSignal<Table>();

  const [data, setData] = createSignal<PointLayerProps["data"]>({
    colors: new Uint8Array(),
    radiuses: new Uint16Array(),
    coordinates: new Float64Array(),
  });

  const showTooltip = (index: number) =>
    console.log(table()?.get(index)?.toJSON());

  const layer = () => usePointLayer({ data: data(), onHover: showTooltip });

  const processMessage = (e: MessageEvent<WorkerPointData>) => {
    setData({
      colors: e.data.colors,
      radiuses: e.data.radiuses,
      coordinates: e.data.coordinates,
    });

    setTable(tableFromIPC(e.data.table));

    toast.info(`finishing process in ${e.data.timer}`);
  };

  worker.point.addEventListener("message", processMessage);

  onCleanup(() => worker.point.removeEventListener("message", processMessage));

  return layer;
};
