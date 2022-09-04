import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";
import { PageHead } from "@/components/PageHead/PageHead";
import { FeedbackForm } from "@/features/FeedbackForm/FeedbackForm";

export default function FeedbackSettingsPage() {
	useRequireAuth();


	return <AppLayout active="settings">
		<PageHead title="Send Feedback" />
		<SettingsLayout title="Send Feedback">
			<FeedbackForm />
		</SettingsLayout>
	</AppLayout>
}