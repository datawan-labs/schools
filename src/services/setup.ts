import { db } from "@/libs/duck";
import { DuckDBDataProtocol } from "@duckdb/duckdb-wasm";

const connection = await db.connect();

await connection.send(`INSTALL spatial;`);

await connection.send(`LOAD spatial;`);

await db.registerFileURL(
  "final.parquet",
  `${window.location.origin}/final.parquet`,
  DuckDBDataProtocol.HTTP,
  false
);
