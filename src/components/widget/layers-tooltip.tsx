import { For, Show } from "solid-js";
import { config, layer } from "@/stores";
import { Label } from "@/components/ui/label";
import {
  Switch,
  SwitchLabel,
  SwitchThumb,
  SwitchControl,
} from "@/components/ui/switch";

export const LayersTooltip = () => {
  const hasCoordinates = () =>
    layer.point.tooltip?.position || layer.grid.tooltip?.position;

  return (
    <Show when={config.tooltip && hasCoordinates()}>
      <div
        style={{
          top: String(hasCoordinates()!.y) + "px",
          left: String(hasCoordinates()!.x) + "px",
        }}
        class="-translate-x-[50%] -translate-y-full pointer-events-none absolute z-[100] w-64 cursor-pointer gap-0.5 rounded-sm border bg-background p-4 shadow-sm"
      >
        <Show when={layer.point.tooltip?.data}>
          <Label class="mb-2">Schools Coordinate</Label>
          <For
            each={Object.keys(layer.point.tooltip?.data || {}).filter((key) => {
              return key !== "location";
            })}
          >
            {(key) => (
              <div class="flex flex-row items-center justify-between gap-0.5">
                <Label class="font-bold text-xs">{key}</Label>
                <Label class="line-clamp-1 text-right font-light font-mono text-xs">
                  {layer.point.tooltip!.data?.[key] as Element}
                </Label>
              </div>
            )}
          </For>
        </Show>
        <Show when={layer.grid.tooltip?.data}>
          <Label class="mb-2">Population Grid</Label>
          <For
            each={Object.keys(layer.grid.tooltip?.data || {}).filter((key) => {
              return key !== "location";
            })}
          >
            {(key) => (
              <div class="flex flex-row items-center justify-between gap-0.5">
                <Label class="font-bold text-xs">{key}</Label>
                <Label class="line-clamp-1 font-light font-mono text-xs">
                  {layer.grid.tooltip!.data?.[key] as Element}
                </Label>
              </div>
            )}
          </For>
        </Show>
      </div>
    </Show>
  );
};

export const LayersTooltipToogle = () => {
  return (
    <Switch
      class="flex flex-col space-y-4"
      checked={config.tooltip}
      onChange={(v) => {
        config.tooltip = v;
      }}
    >
      <SwitchLabel class="font-medium text-sm leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70">
        Tooltip
      </SwitchLabel>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
    </Switch>
  );
};
