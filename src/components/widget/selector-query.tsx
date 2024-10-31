import { For } from "solid-js";
import { cn } from "@/libs/classnames";
import { createList } from "solid-list";
import { config, layer } from "@/stores";
import { SAVED_QUERY } from "@/constants";
import { Label } from "@/components/ui/label";
import { useMap } from "@/components/ui/maps";
import { triggerGridQuery, triggerPointQuery } from "@/services/trigger";

export const SelectorSavedQuery = () => {
  const map = useMap();

  const { active, setActive } = createList({
    items: () => SAVED_QUERY,
    onActiveChange: (active) => {
      if (!active) return;

      layer.grid = {
        query: active.layer.grid.query,
        color: active.layer.grid.color || layer.grid.color,
        legend: new Map(),
      };

      layer.point = {
        query: active.layer.point.query,
        color: active.layer.point.color || layer.point.color,
        legend: new Map(),
      };

      triggerGridQuery(layer.grid.query);

      triggerPointQuery(layer.point.query);

      if (active.map) {
        map()?.fitBounds(active.map.bbox, active.map.view);

        if (active.map.styles) config.styles = active.map.styles;
      }
    },
  });
  return (
    <div class="space-y-2">
      <For each={SAVED_QUERY}>
        {(query) => (
          <div
            onClick={() => setActive(query)}
            class={cn(
              "cursor-pointer rounded-sm p-2 hover:bg-accent",
              query === active() && "bg-accent"
            )}
          >
            <Label class="cursor-pointer">{query.title}</Label>
            <div class="cursor-pointer text-muted-foreground text-xs">
              {query.description}
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
