import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function AdminUsersPage() {
	useRequireAuth("ADMIN");

	return <AppLayout active="settings">
		<PageHead title="Admin | Users" />

		<AdminLayout title="Manage users">
			Admin Users
		</AdminLayout>
	</AppLayout>
}