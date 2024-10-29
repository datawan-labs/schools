import * as duckdb from "@duckdb/duckdb-wasm";
import wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import wasm_mvp from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import worker_eh from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";
import worker_mvp from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";

const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: wasm_mvp,
    mainWorker: worker_mvp,
  },
  eh: {
    mainModule: wasm_eh,
    mainWorker: worker_eh,
  },
};

const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

const worker = new Worker(bundle.mainWorker!);

const logger = new duckdb.VoidLogger();

const db = new duckdb.AsyncDuckDB(logger, worker);

await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

export { db };
