/**
 * Escapes a filename: removes unwanted characters and slices to
 * wanted length
 */
export function escapeSpreadsheetFileName(name: string, filetype?: string) {
  /* eslint-disable no-useless-escape */
  return name
    .replace(/[\:\\\/\?\*\[\]]/g, "")
    .slice(0, 29 - (filetype?.length ?? 0))
    .concat(filetype ? "." + filetype : "");
}
