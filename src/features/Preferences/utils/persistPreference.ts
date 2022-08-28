import { z } from "zod";
import { PreferenceKey, preferencesSchema } from "./preferencesSchema";

export function persistPreference<Key extends PreferenceKey>(
  key: Key,
  value: z.TypeOf<typeof preferencesSchema[Key]["schema"]> | null
) {
  if (value === null) {
    localStorage.removeItem("@nexpenda/pref/" + key);
  } else {
    localStorage.setItem("@nexpenda/pref/" + key, value);
  }
}
