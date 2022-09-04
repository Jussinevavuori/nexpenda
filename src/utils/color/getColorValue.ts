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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return colorValuesMap.blue[shade]!;
    case "off-primary":
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return colorValuesMap[offsetPalette("blue", 1)][shade]!;
    case "off-primary-alt":
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return colorValuesMap[palette][shade]!;
}

export function getColorHex(color: AnyColor): string;
export function getColorHex(palette: AnyPalette, shade: Shade): string;
export function getColorHex(...args: [AnyColor] | [AnyPalette, Shade]): string {
  const value =
    args.length === 1
      ? getColorValue(args[0])
      : getColorValue(args[0], args[1]);

  if (value.startsWith("#")) return value;

  return (
    "#" +
    value
      .split(",")
      .map((str) => Number.parseInt(str).toString(16).padStart(2, "0"))
      .join("")
  );
}
