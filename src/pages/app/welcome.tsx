import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function WelcomePage() {
	useRequireAuth();

	return <AppLayout>
		<PageHead title="Welcome" />
		Welcome
	</AppLayout>

}