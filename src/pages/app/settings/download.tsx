import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function AccountSettingsPage() {
	return <AppLayout active="settings">
		<SettingsLayout title="Download transactions">
			Download
		</SettingsLayout>
	</AppLayout>
}