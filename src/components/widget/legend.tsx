import { layer } from "@/stores";
import { For, Show } from "solid-js";

export const Legend = () => {
  return (
    <div>
      <Show when={layer.point.legend!.size > 0}>
        <div class="p-4">
          <For each={[...layer.point.legend!.entries()]}>
            {([key, value]) => (
              <div class="flex flex-row justify-between space-x-2">
                <div
                  class="aspect-square h-6"
                  style={{
                    "background-color": `rgba(${value.color.join(",")})`,
                  }}
                />
                <div class="flex flex-1 flex-row items-center justify-between space-x-2 text-xs">
                  <div class="line-clamp-1 max-w-24 font-bold">
                    {key || "Others"}
                  </div>
                  <div class="text-right font-mono text-muted-foreground">
                    ({value.total})
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={layer.grid.legend!.size > 0}>
        <div class="p-4">
          <For each={[...layer.grid.legend!.entries()]}>
            {([key, value]) => (
              <div class="flex flex-row justify-between space-x-2">
                <div
                  class="aspect-square h-6"
                  style={{
                    "background-color": `rgba(${value.color.join(",")})`,
                  }}
                />
                <div class="flex flex-1 flex-row items-center justify-between space-x-2 text-xs">
                  <div class="line-clamp-1 max-w-24 font-bold">
                    {key || "Others"}
                  </div>
                  <div class="text-right font-mono text-muted-foreground">
                    ({value.total})
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};
