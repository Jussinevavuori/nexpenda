type Unit = "B" | "kB" | "MB" | "GB";

const unitExponents: Record<Unit, number> = {
  B: 0,
  kB: 1,
  MB: 2,
  GB: 3,
};

const baseFactor = 1000;

const getFactor = (unit: Unit) => Math.pow(baseFactor, unitExponents[unit]);

interface Bytes {
  (n: number, unit: Unit): number;
  string(str: string): number;
}

export const bytes: Bytes = (n: number, unit: Unit) => n * getFactor(unit);
bytes.string = (str: string) => Buffer.byteLength(str, "utf8");
