import { load } from "@loaders.gl/core";
import { WKBLoader } from "@loaders.gl/wkt";
import { tableFromIPC } from "apache-arrow";

/**
 * this woker handle data transformation and preparation before
 * can be usage in layaer.
 */
self.onmessage = async (event: MessageEvent<Uint8Array>) => {
  const table = tableFromIPC(event.data);

  const WKBArray = table.getChild("location")?.toArray() as Array<Uint8Array>;

  const result: Float64Array = new Float64Array(WKBArray.length * 2);

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

    result[offset] = coordinates[0];

    result[offset + 1] = coordinates[1];

    offset += 2;
  }

  (self as unknown as Worker).postMessage(result, [result.buffer]);
};
