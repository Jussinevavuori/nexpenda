import { Switch } from "@/components/Switch/Switch";
import { usePreference } from "@/features/Preferences/hooks/usePreference";
import { useUpdatePreferenceMutation } from "@/features/Preferences/hooks/useUpdatePreference";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function PreferencesSettingsPage() {

	const hideCurrency = usePreference("hideCurrency");
	const updateHideCurrency = useUpdatePreferenceMutation("hideCurrency")

	const currencyFormatting = usePreference("currencyFormatting");
	const updateCurrencyFormatting = useUpdatePreferenceMutation("currencyFormatting")

	return <AppLayout active="settings">
		<SettingsLayout title="User preferences">

			<div className="flex items-center justify-between py-4">
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

			<div className="flex items-center justify-between py-4">
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
			</div>

		</SettingsLayout>
	</AppLayout>
}