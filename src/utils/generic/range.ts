function _range(start: number, end: number, _step?: number): number[] {
  // Get defaulted args
  const arr: number[] = [];
  const step = _step || (start < end ? 1 : -1);

  // Validate step direction and size
  if (step === 0) throw new Error("Range step can not be zero");
  if (start < end && step < 0)
    throw new Error(
      "Range step can not be negative when end is greater than start"
    );
  if (start > end && step > 0)
    throw new Error(
      "Range step can not be positive when start is greater than end"
    );

  // Generate values
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    arr.push(i);
  }

  // Return values
  return arr;
}

export function range(n: number): number[];
export function range(start: number, end: number): number[];
export function range(start: number, end: number, step: number): number[];
export function range(
  ...args: [number] | [number, number] | [number, number, number]
): number[] {
  if (args.length === 1) return _range(0, args[0]);
  if (args.length === 2) return _range(args[0], args[1]);

  // Default, pass args as is
  return _range(...args);
}
