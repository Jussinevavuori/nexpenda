export function isSamePeriod(a: Period, b: Period) {
  const aMonth = "month" in a ? a.month : null;
  const bMonth = "month" in b ? b.month : null;
  const aYear = "year" in a ? a.year : null;
  const bYear = "year" in b ? b.year : null;

  return aMonth === bMonth && aYear === bYear;
}
