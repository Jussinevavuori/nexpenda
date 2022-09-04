
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";
import { PageHead } from "@/components/PageHead/PageHead";
import { AccountSettings } from "@/features/AccountSettings/AccountSettings";

export default function AccountSettingsPage() {
	useRequireAuth();

	return <AppLayout active="settings">
		<PageHead title="Account Settings" />
		<SettingsLayout title="Account settings">
			<AccountSettings />
		</SettingsLayout>
	</AppLayout >
}
