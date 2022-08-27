export function getDynamicColorPropertyName(
  palette: DynamicPalette,
  shade: Shade
) {
  return `--color-${palette}-${shade}`;
}
