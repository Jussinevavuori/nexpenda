import { CSSProperties } from "react";

/**
 * Apply to style tag
 */
export function lineClamp() {
  return {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
  } as CSSProperties;
}
