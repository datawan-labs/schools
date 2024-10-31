import { db } from "@/libs/duck";
import { DuckDBDataProtocol } from "@duckdb/duckdb-wasm";

const connection = await db.connect();

await connection.send(`INSTALL spatial;`);

await connection.send(`LOAD spatial;`);

await db.registerFileURL(
  "sekolah.parquet",
  "https://datawan.sgp1.digitaloceanspaces.com/parquet/sekolah.parquet",
  DuckDBDataProtocol.HTTP,
  false
);

await db.registerFileURL(
  "popgrid.parquet",
  "https://datawan.sgp1.digitaloceanspaces.com/parquet/popgrid.parquet",
  DuckDBDataProtocol.HTTP,
  false
);
