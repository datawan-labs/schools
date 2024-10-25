import { worker } from "@/stores";
import { ScatterplotLayer } from "@deck.gl/layers";
import { createSignal, onCleanup } from "solid-js";
import { DeckGLOverlay } from "@/components/ui/maps";

const usePointLayer = (props: { data: Float64Array }) => {
  return new ScatterplotLayer({
    id: "point",
    data: {
      length: props.data.length / 2,
      attributes: {
        getPosition: { value: props.data, size: 2 },
      },
    },
    getFillColor: [255, 140, 0],
    radiusScale: 1000,
    radiusUnits: "meters",
    pickable: true,
  });
};

const usePointDataLayer = () => {
  const [data, setData] = createSignal<Float64Array>(new Float64Array(), {
    equals: false,
  });

  const layer = () => usePointLayer({ data: data() });

  const processMessage = (e: MessageEvent<Float64Array>) => setData(e.data);

  worker.point.addEventListener("message", processMessage);

  onCleanup(() => worker.point.removeEventListener("message", processMessage));

  return layer;
};

export const Layers = () => {
  const layer = usePointDataLayer();

  return <DeckGLOverlay layers={[layer()]} />;
};
