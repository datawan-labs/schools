import "@/services/setup";
import { ShellWidget } from "./shell";
import { Separator } from "../ui/separator";
import { QueryGridWidget } from "./query-grid";
import { QueryPointWidget } from "./query-point";
import { SavedQueryWidget } from "./saved-query";

const WidgetWrapper = () => {
  return (
    <div class="flex flex-col space-y-2">
      <QueryPointWidget />
      <Separator orientation="horizontal" />
      <QueryGridWidget />
      <Separator orientation="horizontal" />
      <SavedQueryWidget />
      <Separator orientation="horizontal" />
      <span class="text-muted-foreground text-sm">
        Use DB console if you want more access to the data
      </span>
      <ShellWidget />
    </div>
  );
};

export default WidgetWrapper;
