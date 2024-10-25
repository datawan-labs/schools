import { useMap } from "./maps";
import { createEffect, createMemo, onCleanup } from "solid-js";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox";

export const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const map = useMap();

  const overlay = createMemo(() => new MapboxOverlay(props));

  createEffect(() => {
    if (map() && !map()?.hasControl(overlay())) map()?.addControl(overlay());
  });

  onCleanup(() => map()?.removeControl(overlay()));

  return null;
};
