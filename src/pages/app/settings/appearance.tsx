import { Divider } from "@/components/Divider/Divider";
import { PaletteSelector } from "@/features/PaletteSelector/PaletteSelector";
import { ThemeSelector } from "@/features/ThemeSelector/ThemeSelector";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function ThemeSettingsPage() {
	return <AppLayout active="settings">
		<SettingsLayout title="Appearance">

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

		</SettingsLayout>
	</AppLayout>
}