import { worker } from "@/stores";
import { WorkerPointData } from "@/services/worker-point";
import { createSignal, For, onCleanup, Show } from "solid-js";

export const Legend = () => {
  const [legend, setLegend] = createSignal<WorkerPointData["legend"]>(
    new Map()
  );

  const updateLegend = (e: MessageEvent<WorkerPointData>) =>
    setLegend(e.data.legend);

  worker.point.addEventListener("message", updateLegend);

  onCleanup(() => worker.point.removeEventListener("message", updateLegend));

  return (
    <Show when={legend().size > 0}>
      <div class="p-4">
        <For each={[...legend().entries()]}>
          {([key, value]) => (
            <div class="flex flex-row justify-between space-x-2">
              <div
                class="aspect-square h-6"
                style={{
                  "background-color": `rgba(${value.color.join(",")})`,
                }}
              />
              <div class="flex flex-1 flex-row items-center justify-between space-x-2 text-xs">
                <div class="font-bold ">{key || "Others"}</div>
                <div class="text-right font-mono text-muted-foreground">
                  ({value.total})
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};
