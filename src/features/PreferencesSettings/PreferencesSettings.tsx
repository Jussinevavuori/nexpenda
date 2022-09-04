import { Divider } from "@/components/Divider/Divider";
import { CurrencySelector } from "./components/CurrencySelector";
import { FlipCurrencyToggle } from "./components/FlipCurrencyToggle";
import { HideCurrencyToggle } from "./components/HideCurrencyToggle";
import { PaletteSelector } from "./components/PaletteSelector";
import { ThemeSelector } from "./components/ThemeSelector";

export function PreferencesSettings() {

	return <div>

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

			<CurrencySelector />
		</section>

		<Divider />

		<section className="py-4">
			<HideCurrencyToggle />
		</section>

		<Divider />

		<section className="py-4">
			<FlipCurrencyToggle />
		</section>
	</div>

}