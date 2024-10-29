import { Title } from "@solidjs/meta";
import { Widget } from "@/components/widget";
import { Layers } from "@/components/layers";
import { MapInstance, MapProvider } from "@/components/ui/maps";

export default function Home() {
  return (
    <main class="relative h-svh w-full overflow-hidden">
      <Title>Indonesia Schools</Title>
      <MapProvider>
        <MapInstance
          attributionControl={false}
          class="absolute top-0 left-0 size-full"
          mapStyle="https://maps.datawan.id/styles/dark.json"
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
