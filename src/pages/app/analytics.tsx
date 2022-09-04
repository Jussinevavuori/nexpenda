import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function AnalyticsPage() {
	useRequireAuth();

	return <AppLayout active="analytics">
		<PageHead title="Analytics" />
		Analytics
	</AppLayout>
}