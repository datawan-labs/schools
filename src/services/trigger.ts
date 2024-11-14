import { toast } from "solid-sonner";
import { connection } from "./setup";
import { unwrap } from "solid-js/store";
import { layer, worker } from "@/stores";
import { tableToIPC } from "apache-arrow";
import { WorkerGridInput } from "./worker-grid";
import { WorkerPointInput } from "./worker-point";

export const triggerPointQuery = async (query: string) => {
  toast.loading("querying point data...", { id: "point" });

  const result = await connection.query(query).catch((error) => {
    toast.error(error.message);
  });

  if (!result) return;

  toast.loading("procesing point data...", { id: "point" });

  const table = tableToIPC(result);

  worker.point.postMessage(
    { table, color: unwrap(layer.point.color)! } as WorkerPointInput,
    [table.buffer]
  );
};

export const triggerGridQuery = async (query: string) => {
  toast.loading("querying grid data...", { id: "grid" });

  const result = await connection.query(query).catch((error) => {
    toast.error(error.message);
  });

  if (!result) return;

  toast.loading("procesing grid data...", { id: "grid" });

  const table = tableToIPC(result);

  worker.grid.postMessage(
    { table, color: unwrap(layer.grid.color)! } as WorkerGridInput,
    [table.buffer]
  );
};
