import { db } from "@/libs/duck";
import { store } from "@/stores";

const connection = await db.connect();

export const getPoints = async (): Promise<Array<Int8Array>> => {
  const result = await connection.query(`
    SELECT ST_AsWKB(point) as point FROM final.parquet WHERE source = 'kemenag' AND point IS NOT NULL;
  `);

  const points = result.getChild("point")?.toArray();

  store.worker.postMessage(points);

  return points;
};

export const getPoint2 = async (): Promise<Array<Int8Array>> => {
  const result = await connection.query(`
    SELECT ST_AsWKB(point) as point FROM final.parquet WHERE source = 'kemdikbud' AND point IS NOT NULL;
  `);

  const points = result.getChild("point")?.toArray();

  store.worker.postMessage(points);

  return points;
};
