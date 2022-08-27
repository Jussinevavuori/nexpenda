export function canCapitalizeChar(str: string): boolean {
  const c = str[0];
  return !!c && (c !== c.toUpperCase());
}
