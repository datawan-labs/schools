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
    grid: Pick<LayerStore, "query" | "color">;
    point: Pick<LayerStore, "query" | "color">;
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
    id: "jakarta-hs",
    title: "High Schools in Jakarta",
    description: "Sort of modern Sparta...",
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
            nama,
            75 as radius,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_provinsi = '31' AND
            jenjang IN ['SMA', 'SMK', 'MA'] AND
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
    id: "bandung-elementary",
    title: "Elementary Schools in Bandung",
    description: "Elementary Schools in Bandung, West Java",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet
          WHERE 
            kode_kabupaten IN ['3273']`),
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
            100 as radius,
            jenjang as color,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_kabupaten IN ['3273'] AND
            jenjang IN ['SD', 'MI'] AND
            location_status = 'valid'`),
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
        [107.546, -6.97],
        [107.739, -6.837],
      ],
    },
  },
  {
    id: "malang-hs",
    title: "Public High Schools in 500m radius, Malang",
    description:
      "All public Senior High Schools in malang, compared to population grid",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet
          WHERE 
            kode_kabupaten IN ['3573']`),
        color: {
          alpha: 50,
          code: "Turbo",
          length: 12,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT
            nama,
            500 as radius,
            nama as color,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_kabupaten IN ['3573'] AND
            jenjang = 'SMA' AND
            status = 'negeri' AND
            location_status = 'valid'`),
        color: {
          alpha: 150,
          code: "Cool",
          length: 16,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[0],
      bbox: [
        [112.569, -8.051],
        [112.695, -7.911],
      ],
    },
  },
  {
    id: "bali-schools",
    title: "Bali Education",
    description: "Schools In Bali",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet
          WHERE 
            provinsi = 'Bali'`),
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
            nama,
            200 as radius,
            jenjang as color,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            provinsi = 'Bali' AND
            location_status = 'valid'
          ORDER BY jenjang`),
        color: {
          alpha: 255,
          code: "Turbo",
          length: 16,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[9],
      bbox: [
        [114.432, -8.847],
        [115.71, -8.061],
      ],
    },
  },
  {
    id: "north-sumatera",
    title: "Public or Private in North Sumatera",
    description: "All Public or Private Schools in North Sumatera",
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
            nama,
            300 as radius,
            status as color,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_provinsi = '12' AND
            location_status = 'valid'
          ORDER BY jenjang`),
        color: {
          alpha: 255,
          code: "Viridis",
          length: 3,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[3],
      bbox: [
        [97.059, -0.639],
        [100.424, 4.292],
      ],
    },
  },
  {
    id: "jakarta-pop-grid",
    title: "Jakarta Population Grid",
    description: "Jakarta Population Density 1km*1km",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet
          WHERE 
            kode_provinsi = '31'
        `),
        color: {
          alpha: 50,
          code: "Magma",
          length: 32,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT 0
        `),
        color: {
          alpha: 255,
          code: "Viridis",
          length: 3,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[2],
      bbox: [
        [106.50387, -6.421073],
        [107.190172, -6.075695],
      ],
    },
  },
  {
    id: "java-pop-grid",
    title: "Population Density In Java",
    description: "Jakarta Population Density 1km*1km",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet
          WHERE 
            kode_provinsi IN ['31', '32', '33', '34', '35', '36']
        `),
        color: {
          alpha: 255,
          code: "Magma",
          length: 32,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT 0
        `),
        color: {
          alpha: 255,
          code: "Viridis",
          length: 3,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[3],
      bbox: [
        [105.101, -8.78],
        [115.907, -5.499],
      ],
    },
  },
  {
    id: "makassar-hs",
    title: "Makassar Junior High Schools",
    description: "All Junior High Schools in Makassar",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 0
        `),
        color: {
          alpha: 255,
          code: "Magma",
          length: 32,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT
            nama,
            100 as radius,
            jenjang as color,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            kode_kabupaten IN ['7371'] AND
            jenjang IN ['SMP', 'MTs'] AND
            location_status = 'valid'
        `),
        color: {
          alpha: 255,
          code: "Viridis",
          length: 3,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[3],
      bbox: [
        [119.271, -5.234],
        [119.543, -5.006],
      ],
    },
  },
  {
    id: "indonesia-full",
    title: "All Schools in Indonesia",
    description: "Even though you can query everything, please be carefull",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT 0
        `),
        color: {
          alpha: 255,
          code: "Magma",
          length: 32,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT
            nama,
            500 as radius,
            ST_AsWKB(location) as location
          FROM 
            sekolah.parquet
          WHERE 
            location_status = 'valid'
        `),
        color: {
          alpha: 255,
          code: "Viridis",
          length: 3,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[3],
      bbox: [
        [95.0, -11.0],
        [141.0, 6.0],
      ],
    },
  },
  {
    id: "indonesia-popgrid",
    title: "Population  Density in Indonesia",
    description: "Everything, everywhere, all at once",
    layer: {
      grid: {
        query: formatQuery(`
          SELECT
            value,
            ST_AsWKB(location) as location
          FROM 
            popgrid.parquet;
        `),
        color: {
          alpha: 255,
          code: "Turbo",
          length: 32,
          reverse: false,
        },
      },
      point: {
        query: formatQuery(`
          SELECT 0
        `),
        color: {
          alpha: 255,
          code: "Viridis",
          length: 3,
          reverse: true,
        },
      },
    },
    map: {
      styles: MAP_STYLES[3],
      bbox: [
        [95.0, -11.0],
        [141.0, 6.0],
      ],
    },
  },
];
