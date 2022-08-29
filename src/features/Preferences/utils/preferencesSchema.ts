import { palettes } from "@/utils/color/palettes";
import { z } from "zod";
const createPreference = <T>(schema: z.ZodType<T>, defaultValue: T) => {
  return { schema, defaultValue };
};

export const preferencesSchema = {
  currencyFormatting: createPreference(
    z.enum(["default", "reverse"]),
    "default"
  ),
  currency: createPreference(z.string(), "eur"),
  hideCurrency: createPreference(z.enum(["true", "false"]), "false"),
  palette: createPreference<StaticPalette>(
    z.enum(palettes.staticColor as [StaticPalette, ...StaticPalette[]]),
    "blue"
  ),
  theme: createPreference<SelectableTheme>(
    z.enum(["system", "dark", "light"]),
    "system"
  ),
};

export type PreferenceKey = keyof typeof preferencesSchema;
