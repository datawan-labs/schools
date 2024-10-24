import { cn } from "@/libs/classnames";
import * as maplibre from "maplibre-gl";
import {
  Setter,
  onMount,
  Accessor,
  onCleanup,
  splitProps,
  useContext,
  ParentProps,
  createSignal,
  createEffect,
  createContext,
  ComponentProps,
} from "solid-js";

export type ViewOptions = Pick<
  maplibre.FlyToOptions,
  "center" | "bearing" | "pitch" | "zoom"
>;

export type MapInstance = Omit<
  maplibre.MapOptions,
  "style" | "container" | keyof ViewOptions
> &
  Omit<ComponentProps<"div">, "children"> & {
    /**
     * map style, see mapbox style spec
     */
    mapStyle?: maplibre.MapOptions["style"];

    /**
     * handle map view
     */
    mapView?: ViewOptions;
  };

const MapContext = createContext<{
  map: Accessor<maplibre.Map | undefined>;
  setMap: Setter<maplibre.Map | undefined>;
}>();

export const useMap = () => {
  const ctx = useContext(MapContext);

  if (!ctx) throw new Error("you do it wrong");

  return ctx.map;
};

/**
 * wherever you want to render maps, you need to initialize this first
 */
export const MapProvider = (props: ParentProps) => {
  const [map, setMap] = createSignal<maplibre.Map>();

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {props.children}
    </MapContext.Provider>
  );
};

export const MapInstance = (prop: MapInstance) => {
  let map: HTMLDivElement;

  const ctx = useContext(MapContext);

  const [split, rest] = splitProps(prop, [
    "id",
    "style",
    "class",
    "mapView",
    "mapStyle",
    "classList",
  ]);

  onMount(() => {
    const m = new maplibre.Map({
      container: map,
      style: split.mapStyle,
      ...split.mapView,
    });

    ctx?.setMap(m);
  });

  createEffect(() => ctx?.map()?.jumpTo(split.mapView!));

  createEffect(() => ctx?.map()?.setStyle(split.mapStyle!));

  onCleanup(() => ctx?.map()?.remove());

  return (
    <div
      style={split.style}
      classList={split.classList}
      class={cn("absolute size-full", split.class)}
      {...rest}
      ref={(m) => {
        map = m;
      }}
    />
  );
};
