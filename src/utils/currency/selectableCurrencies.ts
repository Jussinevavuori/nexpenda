import { data } from "currency-codes";

// Not currencies in real use
const invalidCodes = [
  "XAG",
  "XAU",
  "XBA",
  "XBB",
  "XBC",
  "XBD",
  "XDR",
  "XPD",
  "XPF",
  "XPT",
  "XSU",
  "XTS",
  "XUA",
  "XXX",
  "USN",
];

// According to wikipedia
const mostUsedCurrencies: string[] = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "NZD",
  "SEK",
  "KRW",
  "SGD",
  "NOK",
  "MXN",
];
export const selectableCurrencies = data
  // Filter extra currencies out
  .filter((c) => {
    return !invalidCodes.includes(c.code);
  })
  // Temporarily disable currencies with more or less digits than 2
  .filter((c) => c.digits === 2)
  // Clean country names
  .map((c) => ({
    ...c,
    countries: c.countries.map((country) =>
      (country.split("(")[0] ?? "").trim()
    ),
  }))
  // Sort 15 most used currencies first
  .sort((a, b) => {
    const _a = mostUsedCurrencies.includes(a.code)
      ? "_" + String.fromCharCode(mostUsedCurrencies.indexOf(a.code) + 65)
      : a.code;
    const _b = mostUsedCurrencies.includes(b.code)
      ? "_" + String.fromCharCode(mostUsedCurrencies.indexOf(b.code) + 65)
      : b.code;
    return _a.localeCompare(_b);
  })
  // Add item value
  .map((c) => ({
    ...c,
    value: `${c.code} ${c.currency} ${c.countries.join(" ")}`,
  }));

export type SelectableCurrency = Unwrap<typeof selectableCurrencies>;
