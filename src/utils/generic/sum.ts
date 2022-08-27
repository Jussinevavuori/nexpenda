export function sum(nums: number[] | number, ...restNums: number[]) {
  return [nums, ...restNums].flat().reduce((s, n) => s + n, 0);
}
