import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function UploadSettingsPage() {
	return <AppLayout active="settings">
		<SettingsLayout title="Upload transactions">
			Upload
		</SettingsLayout>
	</AppLayout>
}