import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function SettingsPage() {
	return <AppLayout active="settings">
		<SettingsLayout />
	</AppLayout>
}