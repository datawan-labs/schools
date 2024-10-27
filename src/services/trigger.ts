import { db } from "@/libs/duck";
import { worker } from "@/stores";
import { toast } from "solid-sonner";
import { tableToIPC } from "apache-arrow";
import { WorkerPointInput } from "./worker-point";

const connection = await db.connect();

export const getPoint = async (query: string) => {
  const result = await connection.query(query).catch((error) => {
    toast.error(error.message);
  });

  if (!result) return;

  toast.info("procesing data...");

  const table = tableToIPC(result);

  worker.point.postMessage({ table } as WorkerPointInput, [table.buffer]);
};
