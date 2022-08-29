export function cssScale(scale: number): string;
export function cssScale(scaleX: number, scaleY: number): string;
export function cssScale(scaleX: number, scaleY?: number): string {
  const _x = scaleX;
  const _y = scaleY ?? scaleX;

  return `scale(${100 * _x}%, ${100 * _y}%)`;
}
