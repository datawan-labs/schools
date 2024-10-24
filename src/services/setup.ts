import { db } from "@/libs/duck";

const connection = await db.connect();

await connection.send(`INSTALL spatial;`);

await connection.send(`LOAD spatial;`);
