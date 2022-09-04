import { Switch } from "@/components/Switch/Switch"
import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";

export function HideCurrencyToggle() {

	const hideCurrency = usePreference("hideCurrency");
	const updateHideCurrency = useUpdatePreference("hideCurrency")

	return <div className="flex items-center justify-between">
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
	</div>
}