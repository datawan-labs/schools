import { load } from "@loaders.gl/core";
import { WKBLoader } from "@loaders.gl/wkt";
import { tableFromIPC, tableToIPC } from "apache-arrow";

export type WorkerPointInput = {
  table: Uint8Array;
};

export type WorkerPointData = {
  /**
   * IPC buffer for apache arrow tables
   */
  table: Uint8Array;
  /**
   * radius buffer for radius size each cell
   */
  radius: Uint16Array;
  /**
   * coordinates buffer
   */
  coordinates: Float64Array;
};

/**
 * this woker handle data transformation and preparation before
 * can be usage in layer.
 */
self.onmessage = async (event: MessageEvent<WorkerPointInput>) => {
  const table = tableFromIPC(event.data.table);

  const radius = table.getChild("radius");

  const WKBCoords = table.getChild("location")?.toArray() as Array<Uint8Array>;

  const flatCoordinates = new Float64Array(WKBCoords.length * 2);

  const flatRadius = new Uint16Array(WKBCoords.length);

  const invalidCoord = new Float64Array([0, 0]);

  for (let index = 0; index < WKBCoords.length; index++) {
    const coord = WKBCoords[index];

    const offset = 2 * index;

    type WKB = { positions: { value: Float64Array } };

    /**
     * parsing wellknown binary to FLoat64
     */
    const point = await load(coord, WKBLoader, { worker: false }).catch(() => {
      return { positions: { value: invalidCoord } };
    });

    const coordinates = (point as WKB).positions.value;

    flatCoordinates[offset] = coordinates[0];

    flatCoordinates[offset + 1] = coordinates[1];

    flatRadius[index] = radius?.get(index) ?? 50;
  }

  (self as unknown as Worker).postMessage(
    {
      table: event.data.table,
      radius: flatRadius,
      coordinates: flatCoordinates,
    },
    [event.data.table.buffer, flatRadius.buffer, flatCoordinates.buffer]
  );
};
