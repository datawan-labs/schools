import { usePointDataLayer } from "./point";
import { DeckGLOverlay } from "@/components/ui/maps";

/**
 * all layers from deck.gl instance
 */
export const Layers = () => {
  const layer = usePointDataLayer();

  return <DeckGLOverlay layers={[layer()]} />;
};
