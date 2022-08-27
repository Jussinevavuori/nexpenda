import { useRouter } from "next/router";

export function useQueryParam(key: string) {
  return useRouter().query[key];
}
