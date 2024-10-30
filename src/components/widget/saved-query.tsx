import { layer, LayerStore } from "@/stores";
import { LngLatBoundsLike } from "maplibre-gl";
import { useMap, ViewOptions } from "@/components/ui/maps";
import { For } from "solid-js";
import { createList } from "solid-list";
import { Label } from "../ui/label";
import { triggerGridQuery, triggerPointQuery } from "@/services/trigger";
import { cn } from "@/libs/classnames";

type SavedQuery = {
  title: string;
  description: string;
  layer: {
    grid: LayerStore;
    point: LayerStore;
  };
  map?: {
    bbox: LngLatBoundsLike;
    view?: ViewOptions;
  };
};

const SAVED_QUERY = {
  malang: {
    title: "All Senior High Schools in Malang",
    description: "Show senior high schools in malang city, East Java",
    layer: {
      grid: {
        query: `
SELECT value,
  value,
  ST_AsWKB(location) as location
FROM 
  popgrid.parquet
WHERE 
  kode_kabupaten IN ['3507', '3573']`.trim(),
      },
      point: {
        query: `
SELECT
  500 as radius,
  jenjang as color,
  ST_AsWKB(location) as location
FROM 
  sekolah.parquet
WHERE 
  kode_kabupaten IN [3507, 3573] AND
  jenjang IN ['SMA', 'SMK', 'MA']
`.trim(),
      },
    },
    map: {
      bbox: [
        [112.2874069, -8.46415819999993],
        [112.959591, -7.761085],
      ],
    },
  },
  bandung: {
    title: "All Elementary Schools in Bandung",
    description: "Show Elementary Schools in Bandung, West Java",
    layer: {
      grid: {
        query: `
SELECT value,
  value,
  ST_AsWKB(location) as location
FROM 
  popgrid.parquet
WHERE 
  kode_kabupaten IN ['3204', '3273']
`.trim(),
      },
      point: {
        query: `
SELECT
  50 as radius,
  jenjang as color,
  ST_AsWKB(location) as location
FROM 
  sekolah.parquet
WHERE 
  kode_kabupaten IN [3204, 3273] AND
  jenjang IN ['SD', 'MI']
`.trim(),
      },
    },
    map: {
      bbox: [
        [107.2510377, -7.31607359999998],
        [107.9315644, -6.81082279999993],
      ],
    },
  },
} satisfies Record<string, SavedQuery>;

type AvailableSavedQuery = keyof typeof SAVED_QUERY;

export const SavedQueryWidget = () => {
  const map = useMap();

  const { active, setActive } = createList({
    items: () => Object.keys(SAVED_QUERY),
    onActiveChange: (active) => {
      const query = SAVED_QUERY[active as AvailableSavedQuery];

      layer.grid.query = query.layer.grid.query;

      layer.point.query = query.layer.point.query;

      triggerGridQuery(layer.grid.query);

      triggerPointQuery(layer.point.query);

      map()?.fitBounds(query.map.bbox);
    },
  });
  return (
    <div class="space-y-2">
      <For each={Object.keys(SAVED_QUERY)}>
        {(key) => {
          const query = SAVED_QUERY[key as AvailableSavedQuery];
          return (
            <div
              onClick={() => setActive(key)}
              class={cn(
                "cursor-pointer rounded-sm p-4 hover:bg-accent",
                key === active() && "bg-accent"
              )}
            >
              <Label>{query.title}</Label>
              <div class="text-muted-foreground text-xs">{query.title}</div>
            </div>
          );
        }}
      </For>
    </div>
  );
};
