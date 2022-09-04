/* eslint-disable @typescript-eslint/no-explicit-any */

import { palettes } from "./palettes";

export function isDynamicPalette(palette: any): palette is DynamicPalette {
  return palettes.dynamic.includes(palette as any);
}
