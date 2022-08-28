import { trpc } from "@/utils/trpc";
import { useCallback } from "react";
import { z } from "zod";
import { persistPreference } from "../utils/persistPreference";
import { PreferenceKey, preferencesSchema } from "../utils/preferencesSchema";

export function useUpdatePreferenceMutation<Key extends PreferenceKey>(
  key: Key
) {
  const utils = trpc.useContext();

  const mutation = trpc.useMutation(["preferences.update"], {
    async onMutate(vars) {
      console.log({ vars });
      await utils.cancelQuery(["preferences.get", key]);
      const snapshot = utils.getQueryData(["preferences.get", key]);
      utils.setQueryData(["preferences.get", key], vars.value);
      return { snapshot };
    },
    onError(error, vars, ctx) {
      if (ctx?.snapshot)
        utils.setQueryData(["preferences.get", key], ctx.snapshot);
    },
    onSuccess(data) {
      persistPreference(key, data);
    },
    onSettled() {
      utils.invalidateQueries(["preferences.get", key]);
    },
  });

  return useCallback(
    (value: null | z.TypeOf<typeof preferencesSchema[Key]["schema"]>) => {
      return mutation.mutate({
        key,
        value: value === null ? null : value,
      });
    },
    [mutation.mutate]
  );
}
