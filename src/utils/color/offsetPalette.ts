import { palettes } from "./palettes";

export function offsetPalette(
  palette: StaticPalette,
  offset: number
): StaticPalette {
  // Based on whether the palette is a grayscale or a colored palette,
  // offset based on a cycle of grayscale palettes or coloured palettes
  const paletteList = palettes.staticGrayscale.includes(palette as any)
    ? palettes.staticGrayscale
    : palettes.static;

  // N for length of palettes, I for index of palette in palettes
  const n = paletteList.length;
  const i = paletteList.indexOf(palette);

  // Offset position by given offset and return next palette
  return paletteList[(n + i + offset) % n]!;
}
