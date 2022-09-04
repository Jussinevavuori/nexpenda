/* eslint-disable @typescript-eslint/no-explicit-any */

import { palettes } from "./palettes";

export function isStaticPalette(palette: any): palette is StaticPalette {
  return palettes.static.includes(palette as any);
}
