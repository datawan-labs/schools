import "@/services/setup";
import { ShellWidget } from "./shell";
import { QueryGridWidget } from "./query-grid";
import { QueryPointWidget } from "./query-point";
import { Separator } from "@/components/ui/separator";
import { SelectorSavedQuery } from "./selector-query";
import { LayersTooltipToogle } from "./layers-tooltip";
import { SelectorMapStyles } from "./selector-map-styles";

const WidgetWrapper = () => {
  return (
    <div class="flex flex-col space-y-2">
      <QueryPointWidget />
      <Separator orientation="horizontal" />
      <QueryGridWidget />
      <Separator orientation="horizontal" />
      <div class="flex max-h-32 w-full overflow-hidden rounded-sm border p-2">
        <div class="flex-1 overflow-auto">
          <SelectorSavedQuery />
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div class="flex flex-row items-center gap-4">
        <SelectorMapStyles />
        <LayersTooltipToogle />
      </div>
      <Separator orientation="horizontal" />
      <span class="text-muted-foreground text-sm">
        Use DB console if you want more access to the data
      </span>
      <ShellWidget />
    </div>
  );
};

export default WidgetWrapper;
