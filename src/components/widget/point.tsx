import { layer } from "@/stores";
import { cn } from "@/libs/classnames";
import { createList } from "solid-list";
import { createMemo, For } from "solid-js";
import { getPoint } from "@/services/trigger";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { ColorCode, getAllColorSchemas } from "@/libs/colors";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@/components/ui/slider";
import {
  Switch,
  SwitchLabel,
  SwitchThumb,
  SwitchControl,
} from "@/components/ui/switch";

/**
 * color selector handler to
 */
const ColorSelector = () => {
  const colors = createMemo(() => {
    return getAllColorSchemas(layer.point.color?.length || 10);
  });

  const { active, setActive } = createList({
    initialActive: layer.point.color?.code,
    items: () => Object.keys(colors()),
    onActiveChange: (active) => {
      layer.point.color!.code = active as ColorCode;
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" class="flex h-6 w-full flex-row p-0">
          <For
            each={
              layer.point.color?.reverse
                ? colors()[active() as ColorCode].slice().reverse()
                : colors()[active() as ColorCode]
            }
          >
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
          value={[layer.point.color?.alpha || 100]}
          class="space-y-3"
          onChange={(v) => {
            layer.point.color!.alpha = v[0];
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
          minValue={0}
          maxValue={16}
          value={[layer.point.color?.length || 10]}
          class="space-y-3"
          onChange={(v) => {
            layer.point.color!.length = v[0];
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
          checked={layer.point.color?.reverse}
          onChange={(v) => {
            layer.point.color!.reverse = v;
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
                onclick={() => setActive(color)}
                class={cn(
                  "flex cursor-pointer flex-col rounded-md p-1 hover:bg-accent",
                  active() === color && "bg-accent"
                )}
              >
                <div class="flex h-6 flex-row">
                  <For
                    each={
                      layer.point.color?.reverse
                        ? colors()[color as ColorCode].slice().reverse()
                        : colors()[color as ColorCode]
                    }
                  >
                    {(color) => (
                      <div
                        class="h-full flex-1 first:rounded-l-md last:rounded-r-md"
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

/**
 * place where you run the query, change color settings
 * to update point data
 */
export const PointWidget = () => {
  const run = () => getPoint(layer.point.query);

  return (
    <div class="flex w-full flex-col space-y-2">
      <ColorSelector />
      <CodeEditor
        value={layer.point.query}
        onChange={(query) => {
          layer.point.query = query;
        }}
      />
      <Button onclick={run} class="uppercase">
        execute
      </Button>
    </div>
  );
};
