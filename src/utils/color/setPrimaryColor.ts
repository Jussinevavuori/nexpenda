import { getRoot } from "../dom/getRoot";
import { getDynamicColorPropertyName } from "./getDynamicColorPropertyName";
import { getColorValue } from "./getColorValue";
import { offsetPalette } from "./offsetPalette";
import { shades } from "./shades";

export function toRgbList(hex: string) {
  const offset = hex.startsWith("#") ? 1 : 0;

  const r = Number.parseInt(hex.substring(offset + 0, offset + 2), 16);
  const g = Number.parseInt(hex.substring(offset + 2, offset + 4), 16);
  const b = Number.parseInt(hex.substring(offset + 4, offset + 6), 16);

  return [r, g, b].join(",");
}

export function setPrimaryColor(
  targetPalette: StaticPalette,
  target?: HTMLElement
) {
  // Calculate offset palettes
  const offsetTargetPalette = offsetPalette(targetPalette, 1);
  const altOffsetTargetPalette = offsetPalette(targetPalette, -1);

  // Set all shades for each palette
  for (const shade of shades) {
    const set = (palette: DynamicPalette, value: string) => {
      (target || getRoot())?.style.setProperty(
        getDynamicColorPropertyName(palette, shade),
        value
      );
    };

    // Set each dynamic value separately
    set("primary", toRgbList(getColorValue(targetPalette, shade)));
    set("off-primary", toRgbList(getColorValue(offsetTargetPalette, shade)));
    set(
      "off-primary-alt",
      toRgbList(getColorValue(altOffsetTargetPalette, shade))
    );
  }
}
