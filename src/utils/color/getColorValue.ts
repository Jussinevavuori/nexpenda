import { getRoot } from "../dom/getRoot";
import { colorValuesMap } from "./colorValuesMap";
import { getDynamicColorPropertyName } from "./getDynamicColorPropertyName";
import { getPaletteFromColor } from "./getPaletteFromColor";
import { getShadeFromColor } from "./getShadeFromColor";
import { isDynamicPalette } from "./isDynamicPalette";
import { offsetPalette } from "./offsetPalette";

export function getDefaultDynamicColorValue(
  palette: DynamicPalette,
  shade: Shade
) {
  switch (palette) {
    case "primary":
      return colorValuesMap.blue[shade]!;
    case "off-primary":
      return colorValuesMap[offsetPalette("blue", 1)][shade]!;
    case "off-primary-alt":
      return colorValuesMap[offsetPalette("blue", -1)][shade]!;
  }
}

export function getDynamicColorValue(
  palette: DynamicPalette,
  shade: Shade,
  target?: HTMLElement
) {
  // Get default value for query
  const defaultValue = getDefaultDynamicColorValue(palette, shade);

  // Get target element, return default if not able to get target element or root
  const el = target ?? getRoot();
  if (!el) return defaultValue;

  // Get value of property
  const propertyName = getDynamicColorPropertyName(palette, shade);
  const value = el.style.getPropertyValue(propertyName);

  // Return value if it exists, else fallback to default value
  return value || defaultValue;
}

export function getColorValue(color: AnyColor): string;
export function getColorValue(palette: AnyPalette, shade: Shade): string;
export function getColorValue(
  ...args: [AnyColor] | [AnyPalette, Shade]
): string {
  // Parse args to palette and shade
  const [palette, shade] =
    args.length === 2
      ? args
      : [getPaletteFromColor(args[0]), getShadeFromColor(args[0])];

  // Check dynamic colors
  if (isDynamicPalette(palette)) {
    return getDynamicColorValue(palette, shade);
  }

  // By default fetch static colors from color map
  return colorValuesMap[palette][shade]!;
}