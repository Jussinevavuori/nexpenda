import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";

export default function SchedulesPage() {
	useRequireAuth();

	return <AppLayout active="schedules">
		<PageHead title="Schedules" />

		<AppLayoutHeader>
			<div className="flex flex-col gap-4 py-8 px-10">
				<div className="flex justify-between items-start">
					<h1 className="text-2xl font-bold">
						Schedules
					</h1>
				</div>
			</div>
		</AppLayoutHeader>

	</AppLayout>

}