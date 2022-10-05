import { Array2D } from "../generic/array2d";
import { range } from "../generic/range";

/**
 * Generate a CSS grid template. For example
 *
 * ```
 * cssGridTemplate(
 *      [
 *              ["a", "b"],
 *              ["c", "c"],
 *              ["d", "d"]
 *      ],
 *      ["1fr", "100px", "1fr"],
 *      ["1fr", "1fr"],
 * )
 * ```
 *
 * will generate the following grid-template
 *
 * ```
 * "a b" 1fr
 * "c c" 100px
 * "d d" 1fr / 1fr 1fr
 * ```
 *
 * Any missing row or column size values will be automatically parsed as "1fr"
 *
 */
export function cssGridTemplate(
  areas: string[][],
  rows: Array<string | number> = [],
  columns: Array<string | number> = []
) {
  // Get size of areas
  const size = Array2D.getSize(areas);
  const [nRows, nCols] = size.dimensions;

  // Validate dimensions
  if (!size.even) throw new Error("CSS Grid template must be an even grid");

  let grid = "";

  // Generate each row
  for (let i = 0; i < nRows; i++) {
    grid += i === 0 ? "" : "\n"; // New line for every subsequential row at start
    // eslint-disable-next-line
    grid += `'${areas[i]!.join(" ")}'`; // Area names separated by spaces, surrounded by quotes
    grid += ` ${rows[i] ?? "1fr"}`; // Row size separated by space
  }

  // Generate columns
  grid += " / "; // Columns separator
  grid += range(nCols)
    .map((i) => columns[i] ?? "1fr")
    .join(" ");

  return grid;
}
