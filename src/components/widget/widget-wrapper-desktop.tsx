import "@/services/setup";
import { ShellWidget } from "./shell";
import { MetadataWidget } from "./metadata";
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
      <div class="flex flex-row items-center gap-4">
        <SelectorMapStyles />
        <LayersTooltipToogle />
      </div>
      <Separator orientation="horizontal" />
      <span class="text-muted-foreground text-sm">
        Try with our saved analytics, or open DB console if you want more access
        to the data
      </span>
      <div class="flex max-h-32 w-full overflow-hidden rounded-md border bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
        <div class="flex-1 overflow-auto bg-background">
          <SelectorSavedQuery />
        </div>
      </div>
      <div class="flex w-full flex-row gap-2">
        <MetadataWidget />
        <ShellWidget />
      </div>
    </div>
  );
};

export default WidgetWrapper;
