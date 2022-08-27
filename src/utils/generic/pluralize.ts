/**
 * Pluralizes the word if the count is not equal to 1 or an array of length
 * 1
 */
export function pluralize(count: any, singular: string, plural?: string) {
  const shouldPluralize = () => {
    if (typeof count === "number") return count !== 1;
    if (Array.isArray(count)) return count.length !== 1;
    return false;
  };

  if (shouldPluralize()) {
    return plural ?? `${singular}s`;
  } else {
    return singular;
  }
}
