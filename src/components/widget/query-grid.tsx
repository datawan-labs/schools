import { layer } from "@/stores";
import { cn } from "@/libs/classnames";
import { createList } from "solid-list";
import { createMemo, For } from "solid-js";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { triggerGridQuery } from "@/services/trigger";
import { IconPlayerPlay } from "@tabler/icons-solidjs";
import { CodeEditor } from "@/components/ui/code-editor";
import { ColorCode, getAllColorSchemas } from "@/libs/colors";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "@/components/ui/switch";
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ColorSelector = () => {
  const colors = createMemo(() => {
    return getAllColorSchemas(layer.grid.color?.length || 8);
  });

  const { active, setActive } = createList({
    initialActive: layer.grid.color?.code,
    items: () => Object.keys(colors()),
    onActiveChange: (active) => {
      layer.grid.color!.code = active as ColorCode;
    },
  });

  const activeColor = () =>
    layer.grid.color?.reverse
      ? colors()[layer.grid.color!.code].slice().reverse()
      : colors()[layer.grid.color!.code];

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" class="flex h-4 w-full flex-row p-0">
          <For each={activeColor()}>
            {(color) => (
              <div
                class="h-full flex-1 first:rounded-l-md last:rounded-r-md"
                style={{ "background-color": color }}
              />
            )}
          </For>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="flex w-[--kb-popper-anchor-width] flex-col space-y-4">
        <Slider
          minValue={0}
          maxValue={255}
          value={[layer.grid.color?.alpha || 50]}
          class="space-y-3"
          onChange={(v) => {
            layer.grid.color!.alpha = v[0];
          }}
        >
          <div class="flex w-full justify-between">
            <SliderLabel>Alpha Value</SliderLabel>
            <SliderValueLabel />
          </div>
          <SliderTrack>
            <SliderFill />
            <SliderThumb />
          </SliderTrack>
        </Slider>
        <Slider
          minValue={4}
          maxValue={32}
          value={[layer.grid.color?.length || 10]}
          class="space-y-3"
          onChange={(v) => {
            layer.grid.color!.length = v[0];
          }}
        >
          <div class="flex w-full justify-between">
            <SliderLabel>Total Colors</SliderLabel>
            <SliderValueLabel />
          </div>
          <SliderTrack>
            <SliderFill />
            <SliderThumb />
          </SliderTrack>
        </Slider>
        <Switch
          class="flex items-center justify-between space-x-2"
          checked={layer.grid.color?.reverse}
          onChange={(v) => {
            layer.grid.color!.reverse = v;
          }}
        >
          <SwitchLabel class="font-medium text-sm leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70">
            Reverse Color
          </SwitchLabel>
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
        </Switch>
        <div class="max-h-48 overflow-auto rounded-md border p-1">
          <For each={Object.keys(colors())}>
            {(color) => (
              <div
                title={color}
                onclick={() => setActive(color)}
                class={cn(
                  "flex cursor-pointer flex-col rounded-sm p-1 hover:bg-accent",
                  active() === color && "bg-accent"
                )}
              >
                <div class="flex h-4 flex-row">
                  <For
                    each={
                      layer.grid.color?.reverse
                        ? colors()[color as ColorCode].slice().reverse()
                        : colors()[color as ColorCode]
                    }
                  >
                    {(color) => (
                      <div
                        class="h-full flex-1 first:rounded-l-sm last:rounded-r-sm"
                        style={{ "background-color": color }}
                      />
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
        </div>
        <div class="text-muted-foreground text-xs">
          Colors will be applied in the next execution.
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const QueryGridWidget = () => {
  return (
    <div class="flex w-full flex-col space-y-2">
      <div class="flex flex-row items-center justify-between">
        <Label>Population Grid</Label>
        <Tooltip>
          <TooltipTrigger>
            <Button
              class="h-7 items-center space-x-1 px-2 font-mono"
              onclick={() => triggerGridQuery(layer.grid.query)}
            >
              <span>run</span>
              <IconPlayerPlay class="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Run Grid Query</TooltipContent>
        </Tooltip>
      </div>
      <ColorSelector />
      <CodeEditor
        value={layer.grid.query}
        onChange={(query) => {
          layer.grid.query = query;
        }}
      />
    </div>
  );
};
