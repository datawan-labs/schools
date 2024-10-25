import { db } from "@/libs/duck";
import { worker } from "@/stores";
import { tableToIPC } from "apache-arrow";

const connection = await db.connect();

export const getPoint = async (query: string) => {
  const result = await connection.query(query);

  const table = tableToIPC(result);

  worker.point.postMessage(table, [table.buffer]);
};