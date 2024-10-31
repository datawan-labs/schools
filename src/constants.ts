import { LayerStore } from "./stores";
import { LngLatBoundsLike } from "maplibre-gl";
import { ViewOptions } from "./components/ui/maps";

/**
 * collection of map styles for maps
 */
export const MAP_STYLES = [
  {
    name: "Dark",
    styles: "https://maps.datawan.id/styles/dark.json",
  },
  {
    name: "Dark No Label",
    styles: "https://maps.datawan.id/styles/dark-no-label.json",
  },
  {
    name: "Black",
    styles: "https://maps.datawan.id/styles/black.json",
  },
  {
    name: "Black No Label",
    styles: "https://maps.datawan.id/styles/black-no-label.json",
  },
  {
    name: "Grayscale",
    styles: "https://maps.datawan.id/styles/grayscale.json",
  },
  {
    name: "Grayscale No Label",
    styles: "https://maps.datawan.id/styles/grayscale-no-label.json",
  },
  {
    name: "White",
    styles: "https://maps.datawan.id/styles/white.json",
  },
  {
    name: "White No Label",
    styles: "https://maps.datawan.id/styles/white-no-label.json",
  },
  {
    name: "Light",
    styles: "https://maps.datawan.id/styles/light.json",
  },
  {
    name: "Light No Label",
    styles: "https://maps.datawan.id/styles/light-no-label.json",
  },
];

type SavedQuery = {
  id: string;
  title: string;
  description: string;
  layer: {
    grid: LayerStore;
    point: LayerStore;
  };
  map?: {
    bbox: LngLatBoundsLike;
    view?: ViewOptions;
    styles?: (typeof MAP_STYLES)[number];
  };
};

/**
 * just for make query looks good when writing
 * in this files and also beautiful in value
 */
function formatQuery(query: string) {
  const lines = query.split("\n").slice(1);

  const indentArray = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)?.[0].length) as number[];

  const minIndent = Math.min(...indentArray);

  return lines.map((line) => line.slice(minIndent)).join("\n");
}

/**
 * saved analytical query with
 */
export const SAVED_QUERY: SavedQuery[] = [
  {
    id: "jakarta",
    title: "All Schools in Jakarta Province",
    description: "Schools in Jakarta",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 0
        `),
        color: {
          alpha: 50,
          code: "Turbo",
          length: 16,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT
            75 as radius,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_provinsi = 31 AND
            location_status = 'valid'`),
        color: {
          alpha: 255,
          code: "Viridis",
          length: 3,
          reverse: false,
        },
      },
    },
    map: {
      styles: MAP_STYLES[7],
      bbox: [
        [106.50387, -6.421073],
        [107.190172, -6.075695],
      ],
    },
  },
  {
    id: "malang-es",
    title: "All Senior High Schools in Malang",
    description: "Show senior high schools in malang city, East Java",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet
          WHERE 
            kode_kabupaten IN ['3507', '3573']`),
        color: {
          alpha: 50,
          code: "Turbo",
          length: 16,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT
            500 as radius,
            jenjang as color,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_kabupaten IN [3507, 3573] AND
            jenjang IN ['SMA', 'SMK', 'MA']`),
        color: {
          alpha: 255,
          code: "Magma",
          length: 3,
          reverse: false,
        },
      },
    },
    map: {
      styles: MAP_STYLES[0],
      bbox: [
        [112.2874069, -8.46415819999993],
        [112.959591, -7.761085],
      ],
    },
  },
  {
    id: "bandung-elementary",
    title: "All Elementary Schools in Bandung",
    description: "Show Elementary Schools in Bandung, West Java",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet
          WHERE 
            kode_kabupaten IN ['3204', '3273']`),
        color: {
          alpha: 50,
          code: "Turbo",
          length: 16,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT
            250 as radius,
            jenjang as color,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_kabupaten IN [3204, 3273] AND
            jenjang IN ['SD', 'MI']`),
        color: {
          alpha: 255,
          code: "Magma",
          length: 3,
          reverse: false,
        },
      },
    },
    map: {
      styles: MAP_STYLES[1],
      bbox: [
        [107.2510377, -7.31607359999998],
        [107.9315644, -6.81082279999993],
      ],
    },
  },
];
