export function getShadeFromColor(color: AnyColor): Shade {
  return parseInt(color.split("-")[1] ?? "") as Shade;
}
