import { worker } from "@/stores";
import { toast } from "solid-sonner";
import { ScatterplotLayer } from "@deck.gl/layers";
import { Table, tableFromIPC } from "apache-arrow";
import { createSignal, onCleanup } from "solid-js";
import { DeckGLOverlay } from "@/components/ui/maps";
import type { WorkerPointData } from "@/services/worker-point";

type LayerProps = {
  data: Float64Array;

  onHover?: (index: number) => void;
};

const usePointLayer = (props: LayerProps) =>
  new ScatterplotLayer({
    id: "point",
    pickable: true,
    radiusScale: 1000,
    radiusUnits: "meters",
    getFillColor: [255, 140, 0],
    onHover: (e) => props.onHover?.(e.index),
    data: {
      length: props.data.length / 2,
      attributes: {
        getPosition: { value: props.data, size: 2 },
      },
    },
  });

/**
 * event listner from worker
 */
const usePointDataLayer = () => {
  const [table, setTable] = createSignal<Table>();

  const [data, setData] = createSignal<Float64Array>(new Float64Array());

  const showTooltip = (index: number) =>
    console.log(table()?.get(index)?.toJSON());

  const layer = () => usePointLayer({ data: data(), onHover: showTooltip });

  const processMessage = (e: MessageEvent<WorkerPointData>) => {
    setData(e.data.points);

    setTable(tableFromIPC(e.data.table));

    toast.info("displaying data");
  };

  worker.point.addEventListener("message", processMessage);

  onCleanup(() => worker.point.removeEventListener("message", processMessage));

  return layer;
};

export const Layers = () => {
  const layer = usePointDataLayer();

  return <DeckGLOverlay layers={[layer()]} />;
};
