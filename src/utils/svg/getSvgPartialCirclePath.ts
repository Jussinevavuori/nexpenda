import { Angle } from "../geometry/Angle";
import { Geometry } from "../geometry/Geometry";

export function getSvgPartialCirclePath(options: {
  radius: number;
  strokeWidth: number;
  sweepAngle: Angle;
  offsetAngle: Angle;
  fillSector?: boolean;
}): string {
  const offsetAngle = options.offsetAngle;

  // Cap sweep angle at 359.999 degrees in order to avoid 360 degrees
  // from looping back to 0 degrees
  const sweepAngle = new Angle(
    Math.min(359.999, options.sweepAngle.degrees),
    "degrees"
  );

  // Parse angles to radians
  const sweep = sweepAngle.radians;

  // Shorthands to half-stroke (s) and radius (R)
  const s = options.strokeWidth / 2;
  const R = options.radius;

  // Empty angle does not generate a path
  if (sweep <= 0) return "";

  // Starting point
  const start = Geometry.polarToCartesian({
    center: { x: R, y: R },
    angle: Angle.add(offsetAngle, sweepAngle),
    radius: R - s,
  });

  // Ending point
  const end = Geometry.polarToCartesian({
    center: { x: R, y: R },
    angle: offsetAngle,
    radius: R - s,
  });

  // Center point
  const center = Geometry.polarToCartesian({
    center: { x: R, y: R },
    angle: Angle.Zero(),
    radius: 0,
  });

  // Arc path
  const arc = [
    // We offset the ending point slightly
    // slightly from the starting point in case
    // they are equal. This ensures we can draw
    // a full circle. If the ending point and
    // starting point are the same, the arc
    // would not be drawn.

    // Starting point
    "M",
    start.x,
    start.y,

    // Arc to ending point
    "A",
    R - s,
    R - s,
    0,
    sweep <= Math.PI ? 0 : 1,
    0,
    end.x + 1e-6,
    end.y,
  ].join(" ");

  if (options.fillSector) {
    return [arc, "L", center.x, center.y, "Z"].join(" ");
  } else {
    return arc;
  }
}
