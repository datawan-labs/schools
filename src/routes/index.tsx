import { MapInstance, MapProvider } from "@/components/ui/maps";
import { lazy, Suspense } from "solid-js";

const Sidebar = lazy(() => import("@/components/interfaces/sidebar"));

export default function Home() {
  return (
    <main class="relative h-svh w-full overflow-hidden">
      <MapProvider>
        <MapInstance
          class="absolute top-0 left-0 size-full"
          mapStyle="https://maps.datawan.id/styles/dark.json"
          mapView={{
            zoom: 3,
            center: [120.61413, 6.7754],
          }}
        />
        <div class="absolute bg-white">
          <Suspense fallback="loading...">
            <Sidebar />
          </Suspense>
        </div>
      </MapProvider>
    </main>
  );
}
