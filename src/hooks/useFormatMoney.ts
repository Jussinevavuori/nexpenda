import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { formatMoney } from "@/utils/currency/formatMoney";

export function useFormatMoney(
  options: Partial<Parameters<typeof formatMoney>[1]> = {}
) {
  const currency = usePreference("currency");
  const currencyFormatting = usePreference("currencyFormatting");
  const hideCurrency = usePreference("hideCurrency");

  return (
    value: number,
    overrideOptions: Partial<Parameters<typeof formatMoney>[1]> = {}
  ) => {
    return formatMoney(value, {
      currency: currency ?? "eur",
      currencyFormatting,
      hideCurrency: hideCurrency === "true",
      ...options,
      ...overrideOptions,
    });
  };
}
