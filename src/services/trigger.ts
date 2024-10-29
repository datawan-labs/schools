import { db } from "@/libs/duck";
import { toast } from "solid-sonner";
import { layer, worker } from "@/stores";
import { tableToIPC } from "apache-arrow";
import { WorkerPointInput } from "./worker-point";
import { unwrap } from "solid-js/store";

const connection = await db.connect();

export const getPoint = async (query: string) => {
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
