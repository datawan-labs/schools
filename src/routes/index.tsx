import { config } from "@/stores";
import { Title, Meta } from "@solidjs/meta";
import { Widget } from "@/components/widget";
import { Layers } from "@/components/layers";
import { MapInstance, MapProvider } from "@/components/ui/maps";
import { LayersTooltip } from "@/components/widget/layers-tooltip";

export default function Home() {
  return (
    <main class="relative h-svh w-full overflow-hidden">
      <Title>Mapping Education in Indonesia | Datawan</Title>
      <Meta
        property="og:title"
        content="Mapping Education in Indonesia | Datawan"
      />
      <Meta
        property="og:description"
        content="Mapping Education: Visualizing School Distribution and Population Density in Indonesia"
      />
      <Meta property="og:image" content="https://schools.datawan.id/og.png" />
      <Meta property="og:url" content="https://schools.datawan.id" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content="@jfrAziz" />
      <Meta name="twitter:image" content="https://schools.datawan.id/og.png" />
      <Meta
        property="twitter:title"
        content="Mapping Education in Indonesia | Datawan"
      />
      <Meta
        property="twitter:description"
        content="Mapping Education: Visualizing School Distribution and Population Density in Indonesia"
      />

      <MapProvider>
        <MapInstance
          attributionControl={false}
          mapStyle={config.styles.styles}
          class="absolute top-0 left-0 size-full"
          mapView={{
            center: [106.847021, -6.248413],
            zoom: 6,
          }}
        />
        <Widget />
        <LayersTooltip />
        <Layers />
      </MapProvider>
    </main>
  );
}
