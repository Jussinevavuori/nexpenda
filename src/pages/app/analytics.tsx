import { PageHead } from "@/components/PageHead/PageHead";
import { PeriodSelectorButtons } from "@/components/PeriodSelectorButtons/PeriodSelectorButtons";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";

export default function AnalyticsPage() {
	useRequireAuth();

	return <AppLayout active="analytics">
		<PageHead title="Analytics" />

		<AppLayoutHeader>
			<div className="flex flex-col gap-4 py-8 px-10">
				<div className="flex justify-between items-start">
					<h1 className="text-2xl font-bold">
						Analytics
					</h1>

					<PeriodSelectorButtons />
				</div>
			</div>
		</AppLayoutHeader>

	</AppLayout>
}