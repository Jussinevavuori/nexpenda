export function randomItem<T>(arr: T[]): T | undefined {
  return arr[Math.floor(arr.length * Math.random())];
}
