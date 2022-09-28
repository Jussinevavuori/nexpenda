/* eslint-disable @typescript-eslint/no-explicit-any */

export function selectProperties<
  T extends Record<string, any>,
  Key extends keyof T
>(object: T, keys: Key[]): { [key in Key]: T[key] } {
  return keys.reduce((res, key) => {
    res[key] = object[key];
    return res;
  }, {} as { [key in Key]: T[key] });
}
