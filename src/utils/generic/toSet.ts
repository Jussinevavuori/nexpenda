export function toSet<T>(array: T[]): Set<T> {
  const set = new Set<T>();

  array.forEach((item) => set.add(item));

  return set;
}
