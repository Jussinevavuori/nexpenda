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

  // Format numeric to 2 decimals (divide to euros)
  const numeric = (value / 100).toFixed(2);

  if (hideCurrency) return numeric;

  if (flip) return `${currencySymbol} ${numeric}`;

  return `${numeric} ${currencySymbol}`;
}
