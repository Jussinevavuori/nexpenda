import { getSvgCornerPiecePath } from "./getSvgCornerPiecePath";
import { getSvgPartialCirclePath } from "./getSvgPartialCirclePath";
import { getSvgSparkLinePath } from "./getSvgSparkLinePath";

export const svg = {
  sparkLine: getSvgSparkLinePath,
  cornerPiece: getSvgCornerPiecePath,
  partialCircle: getSvgPartialCirclePath,
};
