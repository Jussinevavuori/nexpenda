import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function AdminFeedbackPage() {
	return <AppLayout active="settings">
		<AdminLayout title="Read All Feedback">
			Admin Feedback
		</AdminLayout>
	</AppLayout>
}