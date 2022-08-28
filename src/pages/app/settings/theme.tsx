import { PaletteSelector } from "@/features/PaletteSelector/PaletteSelector";
import { ThemeSelector } from "@/features/ThemeSelector/ThemeSelector";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function ThemeSettingsPage() {
	return <AppLayout active="settings">
		<SettingsLayout title="Theme">

			<section>
				<p>
					Mode
				</p>
				<p className="text-black-secondary dark:text-white-secondary text-sm">
					Select either light or dark mode or use your system default.
				</p>

				<div className="pt-6 pb-12">
					<ThemeSelector />
				</div>
			</section>

			<section>
				<p>
					Color
				</p>
				<p className="text-black-secondary dark:text-white-secondary text-sm">
					Customize Nexpenda by picking your favorite color.
				</p>

				<div className="pt-6 pb-12">
					<PaletteSelector />
				</div>
			</section>

		</SettingsLayout>
	</AppLayout>
}