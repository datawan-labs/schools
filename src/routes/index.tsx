import { Title } from "@solidjs/meta";
import { Widget } from "@/components/widget";
import { Layers } from "@/components/layers";
import { MapInstance, MapProvider } from "@/components/ui/maps";
import { config } from "@/stores";

export default function Home() {
  return (
    <main class="relative h-svh w-full overflow-hidden">
      <Title>Indonesia Schools</Title>
      <MapProvider>
        <MapInstance
          attributionControl={false}
          mapStyle={config.styles.styles}
          class="absolute top-0 left-0 size-full"
          mapView={{
            center: [99.3589766, 1.7851095],
            zoom: 8,
          }}
        />
        <Widget />
        <Layers />
      </MapProvider>
    </main>
  );
}
