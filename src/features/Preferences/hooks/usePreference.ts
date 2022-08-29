import { trpc } from "@/utils/trpc";
import { z } from "zod";
import { PreferenceKey, preferencesSchema } from "../utils/preferencesSchema";
import { readPersistedPreference } from "../utils/readPersistedPreference";

export function usePreference<Key extends PreferenceKey>(
  key: Key
): z.TypeOf<typeof preferencesSchema[Key]["schema"]> {
  const query = trpc.useQuery(["preferences.get", key], {
    initialData: readPersistedPreference(key),
    initialDataUpdatedAt: -1,
  });

  const { schema, defaultValue } = preferencesSchema[key];

  const parsed = schema.safeParse(query.data);

  return parsed.success ? parsed.data : defaultValue;
}
