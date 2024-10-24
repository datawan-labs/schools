"use client";

import { db } from "@/libs/duck";

const connection = await db.connect();

export const testQuery = async () => {
  const result = await connection.query(`
    SELECT longitude, latitude FROM parquet_scan("http://localhost:3000/final.parquet") WHERE parquet_scan.source = 'kemenag';
  `);

  return result;
};

export const testQuery2 = async () => {
  const result = await connection.query(`
    SELECT nama FROM read_parquet("http://localhost:3000/final.parquet") WHERE npsn = '69854767';
  `);

  return result;
};
