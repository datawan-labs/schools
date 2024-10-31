import "@/services/setup";
import { SelectorSavedQuery } from "./selector-query";
import { SelectorMapStyles } from "./selector-map-styles";

const WidgetWrapper = () => {
  return (
    <div class="flex flex-col space-y-2 py-4">
      <SelectorSavedQuery />
      <SelectorMapStyles />
    </div>
  );
};

export default WidgetWrapper;
