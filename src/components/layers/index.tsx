import { useGridDataLayer } from "./grid";
import { usePointDataLayer } from "./point";
import { DeckGLOverlay } from "@/components/ui/maps";

/**
 * all layers from deck.gl instance
 */
export const Layers = () => {
  const grid = useGridDataLayer();

  const point = usePointDataLayer();

  return <DeckGLOverlay layers={[grid(), point()]} />;
};
