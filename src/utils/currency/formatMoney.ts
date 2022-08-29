export function formatMoney(
  value: number,
  options: {
    currency: string;
    absolute?: boolean;
    currencyFormatting?: "default" | "reverse";
    hideCurrency?: boolean;
  }
) {
  const currency = options.currency;
  const flip = options.currencyFormatting === "reverse";
  const hideCurrency = options.hideCurrency;

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
