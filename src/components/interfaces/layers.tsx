import { ArcLayer, ScatterplotLayer } from "deck.gl";
import { DeckGLOverlay } from "@/components/ui/deck-gl";

type BartSegment = {
  inbound: number;
  outbound: number;
  from: {
    name: string;
    coordinates: [longitude: number, latitude: number];
  };
  to: {
    name: string;
    coordinates: [longitude: number, latitude: number];
  };
};

export const layer = [
  new ArcLayer<BartSegment>({
    id: "ArcLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json",
    getSourcePosition: (d: BartSegment) => d.from.coordinates,
    getTargetPosition: (d: BartSegment) => d.to.coordinates,
    getSourceColor: (d: BartSegment) => [Math.sqrt(d.inbound), 140, 0],
    getTargetColor: (d: BartSegment) => [Math.sqrt(d.outbound), 140, 0],
    getWidth: 12,
    pickable: true,
  }),
];

export const Layers = () => {
  return <DeckGLOverlay layers={layer} />;
};
