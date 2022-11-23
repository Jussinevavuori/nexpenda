import { readPersistedPreference } from "@/features/Preferences/utils/readPersistedPreference";
import { selectableCurrencies } from "./selectableCurrencies";

export function formatMoney(
  value: number,
  options: {
    currency?: string;
    absolute?: boolean;
    currencyFormatting?: "default" | "reverse";
    hideCurrency?: boolean;
  } = {}
) {
  // Apply options or get default options from persisted preferences in
  // local storage.
  const currency = options.currency ?? readPersistedPreference("currency");
  const flip =
    (options.currencyFormatting ??
      readPersistedPreference("currencyFormatting")) == "reverse";
  const hideCurrency =
    options.hideCurrency ?? readPersistedPreference("hideCurrency") === "true";

  // Get currency symbol
  const currencySymbol = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  })
    .format(0)
    .split(/\s/g)[1];

  // Format numeric to 2 decimals (divide to euros) and add spaces
  // as thousand-separators
  const numeric = thousandSeparate((value / 100).toFixed(2));

  // If no currency, return only numeric part
  if (hideCurrency) return numeric;

  // Return currency symbol and numeric part either flipped or not
  return flip ? `${currencySymbol} ${numeric}` : `${numeric} ${currencySymbol}`;
}

// Utility function to add thousand separators
function thousandSeparate(numeric: string) {
  const prefixLen = numeric.startsWith("-") ? 1 : 0; // "-" is considered a prefix if present
  const suffixLen = 3; // ".99" (cents)
  const separator = " "; // Space as thousands
  const groupLength = 3; // Separate every three digits

  // Get integer part of string (remove prefix and suffix)
  let insStr = numeric.substring(prefixLen, numeric.length - suffixLen);

  // Get prefix and suffix
  const prefix = numeric.substring(0, prefixLen);
  const suffix = numeric.substring(numeric.length - suffixLen);

  // Split substring into groups of three starting from the end
  for (let i = insStr.length - groupLength; i > 0; i -= groupLength) {
    insStr = insStr.substring(0, i) + separator + insStr.substring(i);
  }

  return prefix + insStr + suffix;
}
