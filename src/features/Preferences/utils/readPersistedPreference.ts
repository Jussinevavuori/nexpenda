import { z } from "zod";
import { PreferenceKey, preferencesSchema } from "./preferencesSchema";

export function readPersistedPreference<Key extends PreferenceKey>(
  key: Key
): z.TypeOf<typeof preferencesSchema[Key]["schema"]> {
  const { schema, defaultValue } = preferencesSchema[key];

  const value =
    typeof window === "undefined"
      ? undefined
      : localStorage.getItem("@nexpenda/pref/" + key);

  const parsed = schema.safeParse(value);

  return parsed.success ? parsed.data : defaultValue;
}
