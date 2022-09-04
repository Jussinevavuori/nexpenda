import { readPersistedPreference } from "@/features/Preferences/utils/readPersistedPreference";

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

  // Default formatting
  const formatResult = new Intl.NumberFormat(
    new Intl.NumberFormat().resolvedOptions().locale,
    {
      style: "currency",
      currency: currency.toUpperCase(),
      currencyDisplay: "narrowSymbol",
    }
  )
    // Optionally take absolute value
    .format((options.absolute ? Math.abs(value) : value) / 100);

  const sign = formatResult.includes("-") ? "-" : "";

  const nonnumeric = Array.from(formatResult)
    .filter((char) => char.match(nonNumericRegex) && char !== "-")
    .join("");

  const numeric = Array.from(formatResult)
    .filter((char) => !char.match(nonNumericRegex) && char !== "-")
    .join("");

  // Format:
  // $ stands for the symbol
  // # stands for the numeric part
  // - stands for the sign
  const format = hideCurrency ? "-#" : flip ? "$ -#" : "-# $";

  return format
    .replace("-", sign)
    .replace("$", nonnumeric)
    .replace("#", numeric);
}

// Numeric regex for all number characters
const nonNumericRegex = /[^-\d\.,]+/;
