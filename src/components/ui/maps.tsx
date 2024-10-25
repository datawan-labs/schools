import "maplibre-gl/dist/maplibre-gl.css";

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
  createMemo,
} from "solid-js";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox";
import { P } from "node_modules/@kobalte/core/dist/popper-root-4f4dc506";

export type ViewOptions = Pick<
  maplibre.FlyToOptions,
  "center" | "bearing" | "pitch" | "zoom"
>;

export type MapInstance = Omit<
  maplibre.MapOptions,
  "style" | "container" | keyof ViewOptions
> &
  Pick<ComponentProps<"div">, "id" | "style" | "classList" | "class"> & {
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

/**
 * maplibre instance initializations.
 *
 * note: why not using existing library?, why using library when
 * what you need just something simple like this
 */
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
    const viewOptions: ViewOptions = split.mapView
      ? Object.entries(split.mapView).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) acc[key as keyof typeof acc] = value;

            return acc;
          },
          {} as Record<string, unknown>
        )
      : {};

    const m = new maplibre.Map({
      container: map,
      style: split.mapStyle,
      ...viewOptions,
      ...rest,
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
      ref={(m) => {
        map = m;
      }}
    />
  );
};

/**
 * deckgl overlay layer in maplibre
 */
export const DeckGLOverlay = (props: MapboxOverlayProps) => {
  let overlay: MapboxOverlay;

  /**
   * IDK why like this, because when data changes, deck.gl layer change
   * then we need to modify the controls (where the deck.gl lives). first
   * I copy from react-map-gl implementation, for some reason, it does not
   * work the same with solid.js, so this worksaraund solve my issue.
   *
   * nvm, just remove and add control again
   */
  createEffect(() => {
    const map = useMap()?.();

    if (map?.hasControl(overlay)) map?.removeControl(overlay);

    overlay = new MapboxOverlay(props);

    if (!map?.hasControl(overlay)) map?.addControl(overlay);
  });

  onCleanup(() => {
    const map = useMap()?.();

    map?.removeControl(overlay);
  });

  return null;
};
