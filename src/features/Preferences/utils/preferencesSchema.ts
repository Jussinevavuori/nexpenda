import { z } from "zod";

export const preferencesSchema = {
  currencyFormatting: {
    defaultValue: "default",
    schema: z.enum(["default", "reverse"]),
  },

  currency: {
    defaultValue: "eur",
    schema: z.string(),
  },

  hideCurrency: {
    defaultValue: "false",
    schema: z.enum(["true", "false"]),
  },
};

export type PreferenceKey = keyof typeof preferencesSchema;
