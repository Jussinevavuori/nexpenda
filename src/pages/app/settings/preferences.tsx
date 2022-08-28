import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function PreferencesSettingsPage() {
	return <AppLayout active="settings">
		<SettingsLayout title="User preferences">
			Preferences
		</SettingsLayout>
	</AppLayout>
}