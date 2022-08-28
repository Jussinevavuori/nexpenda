import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function FeedbackSettingsPage() {
	return <AppLayout active="settings">
		<SettingsLayout title="Send Feedback">
			Feedback
		</SettingsLayout>
	</AppLayout>
}