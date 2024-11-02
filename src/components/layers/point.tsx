import { toast } from "solid-sonner";
import { layer, worker } from "@/stores";
import { Table, tableFromIPC } from "apache-arrow";
import { createSignal, onCleanup } from "solid-js";
import type { WorkerPointData } from "@/services/worker-point";
import { ScatterplotLayer, ScatterplotLayerProps } from "@deck.gl/layers";

type PointLayerProps = Partial<
  Omit<ScatterplotLayerProps, "data" | "onHover">
> & {
  onHover?: (x: number, y: number, index: number | undefined) => void;

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
    onHover: (e) =>
      props.onHover?.(e.x, e.y, e.index > 0 ? e.index : undefined),
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

  const showTooltip = (x: number, y: number, index: number | undefined) => {
    if (!index) layer.point.tooltip = undefined;
    else
      layer.point.tooltip = {
        position: { x, y },
        data: table()?.get(index)?.toJSON() as Record<string, unknown>,
      };
  };

  const points = () => usePointLayer({ data: data(), onHover: showTooltip });

  const processMessage = (e: MessageEvent<WorkerPointData>) => {
    setData({
      colors: e.data.colors,
      radiuses: e.data.radiuses,
      coordinates: e.data.coordinates,
    });

    setTable(tableFromIPC(e.data.table));

    layer.point.legend = e.data.legend;

    toast.info(`finishing process in ${e.data.timer.toFixed(2)} ms`);
  };

  worker.point.addEventListener("message", processMessage);

  onCleanup(() => worker.point.removeEventListener("message", processMessage));

  return points;
};
