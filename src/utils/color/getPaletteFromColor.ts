export function getPaletteFromColor(color: AnyColor): AnyPalette {
  return color.split("-")[0] as AnyPalette;
}
