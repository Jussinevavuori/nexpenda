import { PageHead } from "@/components/PageHead/PageHead";
import { PreferencesSettings } from "@/features/PreferencesSettings/PreferencesSettings";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function PreferencesSettingsPage() {
	useRequireAuth();

	return <AppLayout active="settings">
		<PageHead title="User Preferences" />
		<SettingsLayout title="User preferences">
			<PreferencesSettings />
		</SettingsLayout>
	</AppLayout >
}