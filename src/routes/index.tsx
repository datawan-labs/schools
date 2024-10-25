import { lazy, Suspense } from "solid-js";
import { Layers } from "@/components/interfaces/layers";
import { MapInstance, MapProvider } from "@/components/ui/maps";
import { Title } from "@solidjs/meta";

const Sidebar = lazy(() => import("@/components/interfaces/sidebar"));

export default function Home() {
  return (
    <main class="relative h-svh w-full overflow-hidden">
      <Title>Indonesia Schools</Title>
      <MapProvider>
        <MapInstance
          class="absolute top-0 left-0 size-full"
          mapStyle="https://maps.datawan.id/styles/dark.json"
          mapView={{
            center: [99.3589766, 1.7851095],
            zoom: 10,
            pitch: 15,
          }}
        />
        <Layers />
        <div class="absolute bg-white top-0 left-0">
          <Suspense fallback="loading...">
            <Sidebar />
          </Suspense>
        </div>
      </MapProvider>
    </main>
  );
}
