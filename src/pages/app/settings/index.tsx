import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";

export default function SettingsPage() {
	useRequireAuth();

	return <AppLayout active="settings">
		<SettingsLayout />
	</AppLayout>
}