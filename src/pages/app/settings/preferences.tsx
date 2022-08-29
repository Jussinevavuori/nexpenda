import { Autocomplete } from "@/components/Autocomplete/Autocomplete";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { Switch } from "@/components/Switch/Switch";
import { PaletteSelector } from "@/features/PaletteSelector/PaletteSelector";
import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";
import { ThemeSelector } from "@/features/ThemeSelector/ThemeSelector";
import { useFormatMoney } from "@/hooks/useFormatMoney";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";
import { selectableCurrencies, SelectableCurrency } from "@/utils/currency/selectableCurrencies";
import { useState } from "react";

export default function PreferencesSettingsPage() {

	// Select currency
	const currency = usePreference("currency");
	const updateCurrency = useUpdatePreference("currency")
	const [currencyQuery, setCurrencyQuery] = useState("");
	const selectedCurrency = selectableCurrencies.find(_ => _.code.toLowerCase() === currency?.toLowerCase())
	const filteredCurrencies = currencyQuery.trim() === ''
		? selectableCurrencies
		: selectableCurrencies.filter((curr) => {
			return `${curr.code}${curr.countries}${curr.currency}`.toLowerCase().replace(/\s+/g, "")
				.includes(currencyQuery.trim().toLowerCase().replace(/\s+/g, ""))
		})

	// Money formatter
	const formatMoney = useFormatMoney({ currency: selectedCurrency?.code });

	// Hide currency
	const hideCurrency = usePreference("hideCurrency");
	const updateHideCurrency = useUpdatePreference("hideCurrency")

	// Currency formatting
	const currencyFormatting = usePreference("currencyFormatting");
	const updateCurrencyFormatting = useUpdatePreference("currencyFormatting")

	return <AppLayout active="settings">
		<SettingsLayout title="User preferences">

			<section>
				<p className="text-sm text-black-secondary dark:text-white-secondary">
					Choose your accent color
				</p>

				<div className="py-2">
					<PaletteSelector />
				</div>
			</section>

			<Divider />

			<section className="pt-4">
				<p className="text-sm text-black-secondary dark:text-white-secondary">
					Choose your theme
				</p>

				<div className="py-4">
					<ThemeSelector />
				</div>
			</section>

			<Divider />

			<section className="pt-4 pb-8">
				<p className="text-sm text-black-secondary dark:text-white-secondary pb-4">
					Choose your currency
				</p>

				<Autocomplete
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
			</section>

			<Divider />

			<section className="flex items-center justify-between py-4">
				<div>
					<p>
						Hide currency
					</p>
					<p className="text-sm text-black-secondary dark:text-white-secondary">
						Hides the currency symbol
					</p>
				</div>
				<Switch
					value={hideCurrency === "true"}
					onChange={() => updateHideCurrency(hideCurrency === "true" ? "false" : "true")}
				/>
			</section>

			<Divider />

			<section className="flex items-center justify-between py-4">
				<div>
					<p>
						Flip currency formatting
					</p>
					<p className="text-sm text-black-secondary dark:text-white-secondary">
						Reverses the order of the currency symbol and number
					</p>
				</div>
				<Switch
					value={currencyFormatting === "reverse"}
					onChange={() => updateCurrencyFormatting(currencyFormatting === "reverse" ? "default" : "reverse")}
				/>
			</section>

		</SettingsLayout>
	</AppLayout >
}