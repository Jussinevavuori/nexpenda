// Main color varinats

type ColorVariant = "primary" | "success" | "warning" | "danger";

// Shades

type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Palettes

type DynamicPalette = "primary" | "off-primary" | "off-primary-alt";

type GrayscaleStaticPalette = "slate" | "gray" | "zinc" | "neutral" | "stone";

type StaticPalette =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

// Full colors

type StaticColor = `${StaticPalette}-${Shade}`;

type DynamicColor = `${DynamicPalette}-${Shade}`;

// Combined static + dynamic

type AnyColor = StaticColor | DynamicColor;

type AnyPalette = DynamicPalette | StaticPalette;
