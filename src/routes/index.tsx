import { config } from "@/stores";
import { Widget } from "@/components/widget";
import { Layers } from "@/components/layers";
import { MapInstance, MapProvider } from "@/components/ui/maps";
import { LayersTooltip } from "@/components/widget/layers-tooltip";

export default function Home() {
  return (
    <main class="relative h-svh w-full overflow-hidden">
      <MapProvider>
        <MapInstance
          mapStyle={config.styles.styles}
          class="absolute top-0 left-0 size-full"
          mapView={{ center: [106.847021, -6.248413], zoom: 6 }}
        />
        <Widget />
        <LayersTooltip />
        <Layers />
      </MapProvider>
    </main>
  );
}
