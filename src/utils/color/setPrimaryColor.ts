import { getRoot } from "../dom/getRoot";
import { getDynamicColorPropertyName } from "./getDynamicColorPropertyName";
import { getColorValue } from "./getColorValue";
import { offsetPalette } from "./offsetPalette";
import { shades } from "./shades";

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
    set("primary", getColorValue(targetPalette, shade));
    set("off-primary", getColorValue(offsetTargetPalette, shade));
    set("off-primary-alt", getColorValue(altOffsetTargetPalette, shade));
  }
}
