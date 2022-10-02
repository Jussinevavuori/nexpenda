/**
 * Groups an array into multiple arrays based on a get group function.
 */
export function divide<T, Key extends string>(
  data: T[],
  getGroup: (item: T, index: number, array: T[]) => Key
): Partial<Record<Key, T[]>> {
  return data.reduce<Partial<Record<Key, T[]>>>(
    (result, item, index, array) => {
      (result[getGroup(item, index, array)] ??= [] as T[]).push(item);
      return result;
    },
    {}
  );
}
