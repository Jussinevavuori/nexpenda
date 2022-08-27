interface ArraySize2D {
  dimensions: [number, number];
  even: boolean;
}
export class Array2D {
  static filter<T>(
    arr: T[][],
    fn: (t: T, i: number, j: number, arr: T[][], sub: T[]) => boolean
  ): T[][] {
    return arr.map((sub, i) => sub.filter((t, j) => fn(t, i, j, arr, sub)));
  }

  static filterFlat<T>(
    arr: T[][],
    fn: (t: T, i: number, j: number, arr: T[][], sub: T[]) => boolean
  ): T[] {
    return Array2D.filter(arr, fn).flat();
  }

  static map<T, TMapped = T>(
    arr: T[][],
    fn: (t: T, i: number, j: number, arr: T[][], sub: T[]) => TMapped
  ) {
    return arr.map((sub, i) => sub.map((t, j) => fn(t, i, j, arr, sub)));
  }

  static forEach<T>(
    arr: T[][],
    fn: (t: T, i: number, j: number, arr: T[][], sub: T[]) => void
  ) {
    return arr.forEach((sub, i) =>
      sub.forEach((t, j) => fn(t, i, j, arr, sub))
    );
  }

  static getSize<T>(arr: T[][]): ArraySize2D & {
    equals<TSize2D extends ArraySize2D>(t: TSize2D): boolean;
  } {
    const dimensions: [number, number] = [0, 0];

    dimensions[0] = arr.length;
    dimensions[1] = arr.reduce((max, row) => Math.max(max, row.length), 0);

    const even = arr.every((row) => row.length === dimensions[1]);

    return {
      dimensions,
      even,
      equals<TSize2D extends ArraySize2D>(t: TSize2D) {
        return (
          dimensions[0] === t.dimensions[0] && dimensions[1] === t.dimensions[1]
        );
      },
    };
  }
}
