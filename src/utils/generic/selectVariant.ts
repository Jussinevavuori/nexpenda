export function selectVariant<TValue, TVariant extends string>(
  variant: TVariant
) {
  type TValues = { [key in TVariant]: TValue };
  return function _variantStylesInner(values: TValues): TValues[TVariant] {
    return values[variant];
  };
}
