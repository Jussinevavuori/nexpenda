import React from "react";

export function renderVariant<T extends string>(t: T) {
  return function _variantStylesInner(variants: {
    [key in T]: () => React.ReactNode;
  }) {
    return variants[t]();
  };
}
