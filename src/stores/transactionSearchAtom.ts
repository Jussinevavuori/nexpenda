import { atom, useAtomValue } from "jotai";

export const transactionSearchAtom = atom("");

export const MINIMUM_ACTIVE_QUERY_LENGTH = 3;

export function useActiveQuery() {
  const query = useAtomValue(transactionSearchAtom);

  if (query.length >= MINIMUM_ACTIVE_QUERY_LENGTH) return query;
  return "";
}
