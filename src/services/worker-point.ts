import { load } from "@loaders.gl/core";
import { WKBLoader } from "@loaders.gl/wkt";
import { tableFromIPC, tableToIPC } from "apache-arrow";

export type WorkerPointData = {
  points: Float64Array;
  table: Uint8Array;
};

/**
 * this woker handle data transformation and preparation before
 * can be usage in layer.
 *
 *
 */
self.onmessage = async (event: MessageEvent<Uint8Array>) => {
  const table = tableFromIPC(event.data);

  const WKBArray = table.getChild("location")?.toArray() as Array<Uint8Array>;

  const points: Float64Array = new Float64Array(WKBArray.length * 2);

  const invalidCoord = new Float64Array([0, 0]);

  let offset = 0;
  for (const e of WKBArray) {
    type WKB = { positions: { value: Float64Array } };

    /**
     * parsing wellknown
     */
    const pointWKB = await load(e, WKBLoader, { worker: false }).catch(() => {
      return { positions: { value: invalidCoord } };
    });

    const coordinates = (pointWKB as WKB).positions.value;

    points[offset] = coordinates[0];

    points[offset + 1] = coordinates[1];

    offset += 2;
  }

  const buffer = tableToIPC(table);

  (self as unknown as Worker).postMessage({ points, table: buffer }, [
    points.buffer,
    buffer.buffer,
  ]);
};
