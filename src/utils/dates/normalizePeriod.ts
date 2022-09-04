export function normalizePeriod(period: Period): Period {
  // Only months require normalization
  if ("month" in period) {
    // Copy period
    const p = { month: period.month, year: period.year };

    // Fix month underflow
    while (p.month < 0) {
      p.month += 12;
      p.year -= 1;
    }

    // Fix month overflow
    while (p.month > 11) {
      p.month -= 12;
      p.year += 1;
    }

    // Return normalized period
    return p;
  }

  // Years and all period require no normalization. Return as is.
  return period;
}
