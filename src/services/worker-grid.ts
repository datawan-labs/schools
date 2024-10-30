import { load } from "@loaders.gl/core";
import { WKBLoader } from "@loaders.gl/wkt";
import { tableFromIPC, Vector } from "apache-arrow";
import { ColorConfig, getColorSchema } from "@/libs/colors";
import { LegendLayer } from "@/stores";

/**
 * input for this worker
 */
export type WorkerGridInput = {
  table: Uint8Array;
  color: ColorConfig;
};

/**
 * value thet exported from this worker
 */
export type WorkerGridData = {
  /**
   * just for record how much time needed
   */
  timer: number;
  /**
   * quantile of the data
   */
  legend: LegendLayer;
  /**
   * color in INT8 value
   */
  colors: Uint8Array;

  /**
   * coordinates buffer
   */
  coordinates: Float64Array;
};

/**
 * this woker handle data transformation and preparation before it
 * can be usage in layer. we will generate coordinates, radiuses, and
 * colors binary array from the data
 */
self.onmessage = async (event: MessageEvent<WorkerGridInput>) => {
  const start = performance.now();

  const table = tableFromIPC(event.data.table);

  const WKBCoords = table.getChild("location") || [];

  const values = table.getChild("value");

  /**
   * we count data length based on location column, if they
   * don't exist so we don't have to return anything
   */
  const length = WKBCoords.length;

  /**
   * flat coordinates [x0, y0, x1, y1, ...]
   */
  const flatCoordinates = new Float64Array(length * 2);

  /**
   * we store color value as INT8 (max 256),
   * [r0, g0, b0, alpha0, r1, g1, b1, alpha1, ...]
   */
  const flatColors = new Uint8Array(length * 4);

  /**
   * sorted data to create a histogram max min and range
   */
  const sorted = (values?.toArray() as Float64Array | undefined)?.toSorted();

  const min = sorted?.[0]!;

  const max = sorted?.[sorted?.length - 1]!;

  const width = (max! - min!) / event.data.color.length;

  const colorsSchema = getColorSchema(event.data.color);

  /**
   * create legend with cutoff
   */
  const legend: LegendLayer = new Map(
    Array.from({ length: event.data.color.length }).map((_, id) => {
      return [
        (min! + (id + 1) * width).toFixed(2).toString(),
        { total: 0, color: colorsSchema[id] },
      ];
    })
  );

  const cutOff = [...legend.keys()];

  /**
   * legend will be used to show the mathing color, value, and
   * it's total.
   */
  for (let index = 0; index < length; index++) {
    const coord = (WKBCoords as Vector).get(index);

    type WKB = { positions: { value: Float64Array } };

    /**
     * parsing wellknown binary to FLoat64
     */
    const point = await load(coord, WKBLoader, { worker: false }).catch(() => {
      return { positions: { value: [0, 0] } };
    });

    const coordinates = (point as WKB).positions.value;

    flatCoordinates[index * 2] = coordinates[0];

    flatCoordinates[index * 2 + 1] = coordinates[1];

    const value = values?.get(index) || 0;

    // const lastCutoff = cutOff.find((x) => Math.log(value) <= Math.log(Number(x!)));
    const lastCutoff = cutOff.find((x) => value <= Number(x!));

    flatColors.set(legend.get(lastCutoff)!.color, 4 * index);

    legend.get(lastCutoff)!.total++;
  }

  const end = performance.now();

  (self as unknown as Worker).postMessage(
    {
      timer: end - start,
      legend: legend,
      colors: flatColors,
      coordinates: flatCoordinates,
    } as WorkerGridData,
    [flatColors.buffer, flatCoordinates.buffer]
  );
};
