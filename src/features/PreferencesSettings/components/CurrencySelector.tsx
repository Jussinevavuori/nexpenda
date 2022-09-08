import { Autocomplete } from "@/components/Autocomplete/Autocomplete";
import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";
import { formatMoney } from "@/utils/currency/formatMoney";
import { selectableCurrencies, SelectableCurrency } from "@/utils/currency/selectableCurrencies";
import { useState } from "react";

export function CurrencySelector() {

	// Force updates on formatting changes
	usePreference("hideCurrency");
	usePreference("currencyFormatting");

	// Currency preference
	const currency = usePreference("currency");
	const updateCurrency = useUpdatePreference("currency")

	// Selected currency
	const selectedCurrency = selectableCurrencies.find(_ => _.code.toLowerCase() === currency?.toLowerCase())

	// Currency search query and filtered results
	const [currencyQuery, setCurrencyQuery] = useState("");
	const filteredCurrencies = currencyQuery.trim() === ''
		? selectableCurrencies
		: selectableCurrencies.filter((curr) => {
			return `${curr.code}${curr.countries}${curr.currency}`.toLowerCase().replace(/\s+/g, "")
				.includes(currencyQuery.trim().toLowerCase().replace(/\s+/g, ""))
		})

	return <Autocomplete
		value={selectedCurrency}
		onChange={currency => {
			if (typeof currency !== "string") return;
			updateCurrency(currency)
			setCurrencyQuery("")
		}}
	>
		<Autocomplete.Input
			placeholder="Search by name, code or country..."
			onChange={e => setCurrencyQuery(e.target.value)}
			fullWidth
			displayValue={(_currency: SelectableCurrency) => _currency.code}
			className="font-mono"
			helperText="Start typing currency or country name"
		/>

		{
			!currencyQuery && selectedCurrency &&
			<div className="pointer-events-none absolute inset-0 flex items-center gap-4 pl-4 pr-12">
				<span className="font-mono">{selectedCurrency.code}</span>
				<span className="">{selectedCurrency.currency}</span>
				<span className="ml-auto text-slate-500">{formatMoney(-12345)}</span>
			</div>
		}

		<Autocomplete.Options onResetQuery={() => setCurrencyQuery("")}>
			{
				filteredCurrencies.map(curr => <Autocomplete.Option
					key={curr.code}
					value={curr.code}
				>
					<div className="flex items-center gap-4 w-full">
						<span className="font-mono">{curr.code}</span>
						<span className="">{curr.currency}</span>
						<span className="ml-auto text-slate-500">
							{formatMoney(-12345, { currency: curr.code })}
						</span>
					</div>
				</Autocomplete.Option>)
			}
		</Autocomplete.Options>
	</Autocomplete>

}