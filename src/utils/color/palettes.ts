export const palettes: {
  static: Array<StaticPalette>;
  staticColor: Array<StaticPalette>;
  staticGrayscale: Array<GrayscaleStaticPalette>;
  dynamic: Array<DynamicPalette>;
} = {
  static: [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ],

  staticColor: [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ],

  staticGrayscale: ["gray", "neutral", "slate", "stone", "zinc"],

  dynamic: ["primary", "off-primary", "off-primary-alt"],
} as const;
