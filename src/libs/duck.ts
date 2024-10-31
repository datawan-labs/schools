import * as duckdb from "@duckdb/duckdb-wasm";

const bundle = await duckdb.selectBundle(duckdb.getJsDelivrBundles());

const worker_url = URL.createObjectURL(
  new Blob([`importScripts("${bundle.mainWorker!}");`], {
    type: "text/javascript",
  })
);

const worker = new Worker(worker_url);

const logger = new duckdb.VoidLogger();

const db = new duckdb.AsyncDuckDB(logger, worker);

await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

export { db };
