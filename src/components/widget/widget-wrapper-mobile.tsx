import "@/services/setup";
import { LayersLegend } from "./layers-legend";
import { SelectorSavedQuery } from "./selector-query";
import { SelectorMapStyles } from "./selector-map-styles";

const WidgetWrapper = () => {
  return (
    <div class="flex flex-col space-y-2 py-4">
      <SelectorSavedQuery />
      <div class="rounded-md border">
        <LayersLegend />
      </div>
      <SelectorMapStyles />
    </div>
  );
};

export default WidgetWrapper;
