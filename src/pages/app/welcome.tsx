import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function WelcomePage() {
	useRequireAuth();

	return <AppLayout>
		DashboardPage
	</AppLayout>

}