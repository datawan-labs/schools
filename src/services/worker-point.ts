import { LegendLayer } from "@/stores";
import { load } from "@loaders.gl/core";
import { WKBLoader } from "@loaders.gl/wkt";
import { tableFromIPC, Vector } from "apache-arrow";
import { ColorConfig, getColorSchema } from "@/libs/colors";

/**
 * input for this worker
 */
export type WorkerPointInput = {
  table: Uint8Array;
  color: ColorConfig;
};

/**
 * value thet exported from this worker
 */
export type WorkerPointData = {
  /**
   * just for record how much time needed
   */
  timer: number;

  /**
   * IPC buffer for apache arrow tables
   */
  table: Uint8Array;

  /**
   * legend is summary of the data with color
   */
  legend: LegendLayer;

  /**
   * color in INT8 value
   */
  colors: Uint8Array;

  /**
   * radius buffer for radius size each cell, we call it radiuses
   * for plural of radius and idc if you use radii :D
   */
  radiuses: Uint16Array;

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
self.onmessage = async (event: MessageEvent<WorkerPointInput>) => {
  const start = performance.now();

  const table = tableFromIPC(event.data.table);

  const WKBCoords = table.getChild("location") || [];

  const radiuses = table.getChild("radius");

  const colors = table.getChild("color");

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
   * flat radiues, [r0, r1, r2, ...]
   */
  const flatRadiuses = new Uint16Array(length);

  /**
   * we store color value as INT8 (max 256),
   * [r0, g0, b0, alpha0, r1, g1, b1, alpha1, ...]
   */
  const flatColors = new Uint8Array(length * 4);

  const colorSchema = getColorSchema(event.data.color);

  /**
   * legend will be used to show the mathing color, value, and
   * it's total.
   */
  const legend: LegendLayer = new Map();

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

    flatRadiuses[index] = radiuses?.get(index) ?? 50;

    /**
     * if we don't have color columns, then use undefined as fallback
     * legend
     */
    if (!colors) {
      if (!legend.has(undefined))
        legend.set(undefined, { total: 1, color: colorSchema[legend.size] });
      else legend.get(undefined)!.total++;

      flatColors.set(legend.get(undefined)!.color, index * 4);

      continue;
    }

    /**
     * then whatever the color is, we can save the value,
     * until Map length is equals to color length
     */
    const colorValue = colors?.get(index);

    /**
     * if color value available in color map, we can use
     * available color
     */
    if (legend.has(colorValue)) {
      flatColors.set(legend.get(colorValue)!.color, 4 * index);

      /**
       * we increment this data
       */
      legend.get(colorValue)!.total++;
    } else {
      /**
       * then if the color not available, but color map size
       * is not more than n-1, we can safely save the value
       * to legend, then apply the value.
       */
      if (legend.size < event.data.color.length - 1) {
        legend.set(colorValue, {
          total: 1, // first data to add
          color: colorSchema[legend.size],
        });

        flatColors.set(legend.get(colorValue)!.color, 4 * index);
      } else if (legend.size === event.data.color.length - 1) {
        const color = colorSchema[legend.size];

        /**
         * then if one remaining value allowed for legend, we check
         * if we accidently add undefiend to legend or not. if yes,
         * we can set the value to legend
         */
        if (legend.has(undefined))
          legend.set(colorValue, { color: color, total: 1 });
        else legend.set(undefined, { color: color, total: 1 });

        flatColors.set(color, 4 * index);
      } else {
        /**
         * then for fallback, we set all remaing value same color as undefined
         * color. so we can mark this color as others
         */
        flatColors.set(legend.get(undefined)!.color, 4 * index);

        /**
         * also increment the value
         */
        legend.get(undefined)!.total++;
      }
    }
  }

  const end = performance.now();

  (self as unknown as Worker).postMessage(
    {
      timer: end - start,
      table: event.data.table,
      legend: legend,
      colors: flatColors,
      radiuses: flatRadiuses,
      coordinates: flatCoordinates,
    } as WorkerPointData,
    [
      event.data.table.buffer,
      flatColors.buffer,
      flatRadiuses.buffer,
      flatCoordinates.buffer,
    ]
  );
};
