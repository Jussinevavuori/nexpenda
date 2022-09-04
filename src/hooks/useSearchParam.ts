import { useRouter } from "next/router";

/**
 * Get a search param from the query.
 */
export function useQueryParam(key: string) {
  return useRouter().query[key];
}
