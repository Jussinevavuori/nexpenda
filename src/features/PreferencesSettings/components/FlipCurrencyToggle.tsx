import { Switch } from "@/components/Switch/Switch"
import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreference } from "@/features/Preferences/hooks/useUpdatePreference";

export function FlipCurrencyToggle() {

	// Currency formatting
	const currencyFormatting = usePreference("currencyFormatting");
	const updateCurrencyFormatting = useUpdatePreference("currencyFormatting")

	return <div className="flex items-center justify-between">
		<div>
			<p>
				Flip currency formatting
			</p>
			<p className="text-sm text-black-3 dark:text-white-3">
				Reverses the order of the currency symbol and number
			</p>
		</div>
		<Switch
			value={currencyFormatting === "reverse"}
			onChange={() => updateCurrencyFormatting(currencyFormatting === "reverse" ? "default" : "reverse")}
		/>
	</div>

}