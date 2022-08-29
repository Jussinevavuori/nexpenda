import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function AdminUsersPage() {
	useRequireAuth("ADMIN");

	return <AppLayout active="settings">
		<AdminLayout title="Manage users">
			Admin Users
		</AdminLayout>
	</AppLayout>
}