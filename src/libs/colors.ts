import { scaleSequential } from "d3-scale";
import {
  interpolateBlues,
  interpolateBrBG,
  interpolateYlOrRd,
  interpolateRdYlBu,
  interpolateRdYlGn,
  interpolateReds,
  interpolateSinebow,
  interpolateSpectral,
  interpolateTurbo,
  interpolateViridis,
  interpolateWarm,
  interpolateYlGn,
  interpolateYlGnBu,
  interpolateYlOrBr,
  interpolateRdBu,
  interpolateRdGy,
  interpolateRdPu,
  interpolateBuGn,
  interpolateBuPu,
  interpolateCividis,
  interpolateCool,
  interpolateGnBu,
  interpolateGreens,
  interpolateGreys,
  interpolateInferno,
  interpolateMagma,
  interpolateOrRd,
  interpolateOranges,
  interpolatePRGn,
  interpolatePiYG,
  interpolatePlasma,
  interpolatePuBu,
  interpolatePuBuGn,
  interpolatePuOr,
  interpolatePuRd,
  interpolatePurples,
  interpolateRainbow,
} from "d3-scale-chromatic";

const colorFN = {
  YlOrRd: scaleSequential(interpolateYlOrRd),
  Blues: scaleSequential(interpolateBlues),
  BrBG: scaleSequential(interpolateBrBG),
  RdYlBu: scaleSequential(interpolateRdYlBu),
  RdYlGn: scaleSequential(interpolateRdYlGn),
  Reds: scaleSequential(interpolateReds),
  Sinebow: scaleSequential(interpolateSinebow),
  Spectral: scaleSequential(interpolateSpectral),
  Turbo: scaleSequential(interpolateTurbo),
  Viridis: scaleSequential(interpolateViridis),
  Warm: scaleSequential(interpolateWarm),
  YlGn: scaleSequential(interpolateYlGn),
  YlGnBu: scaleSequential(interpolateYlGnBu),
  YlOrBr: scaleSequential(interpolateYlOrBr),
  RdBu: scaleSequential(interpolateRdBu),
  RdGy: scaleSequential(interpolateRdGy),
  RdPu: scaleSequential(interpolateRdPu),
  BuGn: scaleSequential(interpolateBuGn),
  BuPu: scaleSequential(interpolateBuPu),
  Cividis: scaleSequential(interpolateCividis),
  Cool: scaleSequential(interpolateCool),
  GnBu: scaleSequential(interpolateGnBu),
  Greens: scaleSequential(interpolateGreens),
  Greys: scaleSequential(interpolateGreys),
  Inferno: scaleSequential(interpolateInferno),
  Magma: scaleSequential(interpolateMagma),
  OrRd: scaleSequential(interpolateOrRd),
  Oranges: scaleSequential(interpolateOranges),
  PRGn: scaleSequential(interpolatePRGn),
  PiYG: scaleSequential(interpolatePiYG),
  Plasma: scaleSequential(interpolatePlasma),
  PuBu: scaleSequential(interpolatePuBu),
  PuBuGn: scaleSequential(interpolatePuBuGn),
  PuOr: scaleSequential(interpolatePuOr),
  PuRd: scaleSequential(interpolatePuRd),
  Purples: scaleSequential(interpolatePurples),
  Rainbow: scaleSequential(interpolateRainbow),
} as const;

export type ColorCode = keyof typeof colorFN;

/**
 * just color config
 */
export type ColorConfig = {
  /**
   * color code for generate custom
   * color scheme, this code comes from
   * d3-color-scale
   */
  code: ColorCode;

  /**
   * alpha value from color code
   */
  alpha: number;

  /**
   * total length of schema
   */
  length: number;

  /**
   * if true, the color will be reversed
   *
   * @default false
   */
  reverse?: boolean;
};

/**
 * generate all available color schema
 */
export const getAllColorSchemas = (length: number) => {
  length = length <= 1 ? 1 : length;

  return {
    Viridis: Array.from({ length }).map((_, id) => {
      return colorFN.Viridis((1 / length) * (id + 1));
    }),
    Warm: Array.from({ length }).map((_, id) => {
      return colorFN.Warm((1 / length) * (id + 1));
    }),
    Inferno: Array.from({ length }).map((_, id) => {
      return colorFN.Inferno((1 / length) * (id + 1));
    }),
    Magma: Array.from({ length }).map((_, id) => {
      return colorFN.Magma((1 / length) * (id + 1));
    }),
    Plasma: Array.from({ length }).map((_, id) => {
      return colorFN.Plasma((1 / length) * (id + 1));
    }),
    Cividis: Array.from({ length }).map((_, id) => {
      return colorFN.Cividis((1 / length) * (id + 1));
    }),
    Cool: Array.from({ length }).map((_, id) => {
      return colorFN.Cool((1 / length) * (id + 1));
    }),
    Turbo: Array.from({ length }).map((_, id) => {
      return colorFN.Turbo((1 / length) * (id + 1));
    }),
    YlOrRd: Array.from({ length }).map((_, id) => {
      return colorFN.YlOrRd((1 / length) * (id + 1));
    }),
    BrBG: Array.from({ length }).map((_, id) => {
      return colorFN.BrBG((1 / length) * (id + 1));
    }),
    RdYlBu: Array.from({ length }).map((_, id) => {
      return colorFN.RdYlBu((1 / length) * (length - id + 1));
    }),
    RdYlGn: Array.from({ length }).map((_, id) => {
      return colorFN.RdYlGn((1 / length) * (length - id + 1));
    }),
    Sinebow: Array.from({ length }).map((_, id) => {
      return colorFN.Sinebow((1 / length) * (id + 1));
    }),
    Rainbow: Array.from({ length }).map((_, id) => {
      return colorFN.Rainbow((1 / length) * (id + 1));
    }),
    Spectral: Array.from({ length }).map((_, id) => {
      return colorFN.Spectral((1 / length) * (id + 1));
    }),
    RdBu: Array.from({ length }).map((_, id) => {
      return colorFN.RdBu((1 / length) * (id + 1));
    }),
    RdGy: Array.from({ length }).map((_, id) => {
      return colorFN.RdGy((1 / length) * (id + 1));
    }),
    PRGn: Array.from({ length }).map((_, id) => {
      return colorFN.PRGn((1 / length) * (id + 1));
    }),
    PiYG: Array.from({ length }).map((_, id) => {
      return colorFN.PiYG((1 / length) * (id + 1));
    }),
    PuOr: Array.from({ length }).map((_, id) => {
      return colorFN.PuOr((1 / length) * (id + 1));
    }),
    Reds: Array.from({ length }).map((_, id) => {
      return colorFN.Reds((1 / length) * (id + 1));
    }),
    Blues: Array.from({ length }).map((_, id) => {
      return colorFN.Blues((1 / length) * (id + 1));
    }),
    Greens: Array.from({ length }).map((_, id) => {
      return colorFN.Greens((1 / length) * (id + 1));
    }),
    Greys: Array.from({ length }).map((_, id) => {
      return colorFN.Greys((1 / length) * (id + 1));
    }),
    Oranges: Array.from({ length }).map((_, id) => {
      return colorFN.Oranges((1 / length) * (id + 1));
    }),
    Purples: Array.from({ length }).map((_, id) => {
      return colorFN.Purples((1 / length) * (id + 1));
    }),
    YlGn: Array.from({ length }).map((_, id) => {
      return colorFN.YlGn((1 / length) * (id + 1));
    }),
    YlGnBu: Array.from({ length }).map((_, id) => {
      return colorFN.YlGnBu((1 / length) * (id + 1));
    }),
    YlOrBr: Array.from({ length }).map((_, id) => {
      return colorFN.YlOrBr((1 / length) * (id + 1));
    }),
    RdPu: Array.from({ length }).map((_, id) => {
      return colorFN.RdPu((1 / length) * (id + 1));
    }),
    BuGn: Array.from({ length }).map((_, id) => {
      return colorFN.BuGn((1 / length) * (id + 1));
    }),
    BuPu: Array.from({ length }).map((_, id) => {
      return colorFN.BuPu((1 / length) * (id + 1));
    }),
    GnBu: Array.from({ length }).map((_, id) => {
      return colorFN.GnBu((1 / length) * (id + 1));
    }),
    OrRd: Array.from({ length }).map((_, id) => {
      return colorFN.OrRd((1 / length) * (id + 1));
    }),
    PuBu: Array.from({ length }).map((_, id) => {
      return colorFN.PuBu((1 / length) * (id + 1));
    }),
    PuBuGn: Array.from({ length }).map((_, id) => {
      return colorFN.PuBuGn((1 / length) * (id + 1));
    }),
    PuRd: Array.from({ length }).map((_, id) => {
      return colorFN.PuRd((1 / length) * (id + 1));
    }),
  } as const;
};

/**
 * transform color string to rgb value array, for example
 * rgb(0, 0, 0) or #123456 to [0, 0, 0]. we don't do much validation
 * because we know every value that use this function is valid,
 * is either rgb(0,0,0) or hex
 */
const transformToRGBArray = (color: string): [number, number, number] => {
  if (color.startsWith("rgb"))
    return color
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((x) => Number(x.trim())) as [number, number, number];

  const hex = color.slice(1);

  const r = parseInt(hex.slice(0, 2), 16);

  const g = parseInt(hex.slice(2, 4), 16);

  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
};

/**
 * return color in rgb format
 */
export const getColorSchema = (
  config: ColorConfig
): [number, number, number, number][] => {
  const colors = getAllColorSchemas(config.length)[config.code].map((color) => {
    return [...transformToRGBArray(color), config.alpha];
  });

  if (config.reverse) colors.reverse();

  return colors as [number, number, number, number][];
};
