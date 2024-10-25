import { db } from "@/libs/duck";
import { DuckDBDataProtocol } from "@duckdb/duckdb-wasm";

const connection = await db.connect();

await connection.send(`INSTALL spatial;`);

await connection.send(`LOAD spatial;`);

await db.registerFileURL(
  "final.parquet",
  "http://localhost:3000/final.parquet",
  DuckDBDataProtocol.HTTP,
  false
);
