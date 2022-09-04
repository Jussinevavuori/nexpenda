/**
 * Get the item from an array with the minimum value based on a function which
 * calculates a value for each item.
 *
 * @param arr Array of items of type T
 * @param getItemValue Deterministic function which calculates a numeric value
 * for each item T
 * @returns Object which contains the item of type T with the lowest value
 * along with the value that was calculated for it. If an empty array was
 * provided, the item is undefined and its value is NaN.
 */
export function getMin<T>(
  arr: T[],
  getItemValue: (t: T) => number
): { item: T | undefined; value: number } {
  if (arr.length === 0) return { item: undefined, value: NaN };

  return arr.reduce(
    (min, next) => {
      const nextValue = getItemValue(next);
      return nextValue < min.value ? { item: next, value: nextValue } : min;
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { item: arr[0], value: getItemValue(arr[0]!) } as { item: T; value: number }
  );
}
