import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function SchedulesPage() {
	useRequireAuth();

	return <AppLayout active="schedules">
		Schedules
	</AppLayout>

}