import { db } from "@/libs/duck";
import { DuckDBDataProtocol } from "@duckdb/duckdb-wasm";

const connection = await db.connect();

await connection.send(`INSTALL spatial;`);

await connection.send(`LOAD spatial;`);

await db.registerFileURL(
  "sekolah.parquet",
  `${window.location.origin}/sekolah.parquet`,
  DuckDBDataProtocol.HTTP,
  false
);

await db.registerFileURL(
  "popgrid.parquet",
  `${window.location.origin}/popgrid.parquet`,
  DuckDBDataProtocol.HTTP,
  false
);
