/**
 * Given an amount string (as decimal), and a sign (+ / -), return an integer
 * representing the amount.
 */
export function parseAmountStringWithSign(
  amount: string,
  sign: "+" | "-"
): number {
  const parsedString = amount.trim().replace(/,/g, ".");
  const parsedNumber = 100 * parseFloat(parsedString);
  const parsedInteger = Math.round(Math.abs(parsedNumber));
  return parsedInteger * (sign === "+" ? 1 : -1);
}
