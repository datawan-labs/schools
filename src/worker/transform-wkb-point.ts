import { load } from "@loaders.gl/core";
import { WKBLoader } from "@loaders.gl/wkt";

self.onmessage = async (WKBArray: MessageEvent<Array<Uint32Array>>) => {
  const result: Float64Array = new Float64Array(WKBArray.data.length * 2);

  let offset = 0;
  for (const element of WKBArray.data) {
    const pointWKB = (await load(element, WKBLoader, {
      worker: false,
    })) as { positions: { value: Float64Array } };

    const coordinates = pointWKB.positions.value;

    result[offset] = coordinates[0];

    result[offset + 1] = coordinates[1];

    offset += 2;
  }

  self.postMessage(result);
};
