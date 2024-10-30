import { db } from "@/libs/duck";
import { toast } from "solid-sonner";
import { unwrap } from "solid-js/store";
import { layer, worker } from "@/stores";
import { tableToIPC } from "apache-arrow";
import { WorkerGridInput } from "./worker-grid";
import { WorkerPointInput } from "./worker-point";

const connection = await db.connect();

export const triggerPointQuery = async (query: string) => {
  const result = await connection.query(query).catch((error) => {
    toast.error(error.message);
  });

  if (!result) return;

  toast.info("procesing data...");

  const table = tableToIPC(result);

  worker.point.postMessage(
    { table, color: unwrap(layer.point.color)! } as WorkerPointInput,
    [table.buffer]
  );
};

export const triggerGridQuery = async (query: string) => {
  const result = await connection.query(query).catch((error) => {
    toast.error(error.message);
  });

  if (!result) return;

  toast.info("procesing data...");

  const table = tableToIPC(result);

  worker.grid.postMessage(
    { table, color: unwrap(layer.grid.color)! } as WorkerGridInput,
    [table.buffer]
  );
};
