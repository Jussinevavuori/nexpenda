import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";
import { usePeriodStore } from "@/stores/periodStore";
import { BudgetForm } from "@/features/BudgetForm/BudgetForm";
import { formatPeriod } from "@/utils/dates/formatPeriod";

export default function CreateBudgetPage() {
	useRequireAuth();

	const period = usePeriodStore(_ => _.period);

	return <AppLayout active="budgets">

		<PageHead title="Create Budget" />

		<AppLayoutHeader>
			<div className="px-6 d:px-10 py-4 d:py-8 flex items-center justify-between gap-4">
				<h1 className="text-2xl font-bold">
					Create budget
				</h1>
				<p>
					<span className="text-black-2 dark:text-white-2">
						Creating budget starting from{" "}
					</span>
					{formatPeriod(period)}
				</p>
			</div>
		</AppLayoutHeader>

		<div className="px-10 py-10">
			<BudgetForm onSubmit={(res) => { console.log(res) }} />
		</div>
	</AppLayout >
}