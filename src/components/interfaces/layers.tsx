import { store } from "@/stores";
import { ScatterplotLayer } from "@deck.gl/layers";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { DeckGLOverlay } from "@/components/ui/deck-gl";

export const usePointLayer = (props: { data: Float64Array }) => {
  return new ScatterplotLayer({
    id: "schools-point",
    data: {
      length: props.data.length / 2,
      attributes: {
        getPosition: { value: props.data, size: 2 },
      },
    },
    getFillColor: [255, 140, 0],
    getLineColor: [0, 0, 0],
    getLineWidth: 10,
    radiusScale: 1000,
    radiusUnits: "meters",
    pickable: true,
  });
};

export const Layers = () => {
  const [data, setData] = createSignal<Float64Array>(new Float64Array(), {
    equals: false,
  });

  const layer = () => usePointLayer({ data: data() });

  const processMessage = (e: MessageEvent<Float64Array>) => setData(e.data);

  store.worker.addEventListener("message", processMessage);

  onCleanup(() => store.worker.removeEventListener("message", processMessage));

  return <DeckGLOverlay layers={[layer()]} />;
};
