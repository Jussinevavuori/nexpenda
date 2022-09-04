import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function AdminFeedbackPage() {
	useRequireAuth("ADMIN");

	return <AppLayout active="settings">
		<PageHead title="Admin | Feedback" />

		<AdminLayout title="Read All Feedback">
			Admin Feedback
		</AdminLayout>
	</AppLayout>
}