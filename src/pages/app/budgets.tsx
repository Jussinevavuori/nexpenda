import { PageHead } from "@/components/PageHead/PageHead";
import { PeriodSelectorButtons } from "@/components/PeriodSelectorButtons/PeriodSelectorButtons";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";
import { usePeriodStore } from "@/stores/periodStore";
import { formatBudgetDate } from "@/utils/budgets/formatBudgetDate";
import { trpc } from "@/utils/trpc";
import { EditBudgetButton } from "@/features/BudgetActions/EditBudgetButton";
import { getPeriodStartDate } from "@/utils/dates/getPeriodStartDate";
import { BudgetSummary } from "@/features/BudgetSummary/BudgetSummary";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { PeriodSelectorCarousel } from "@/components/PeriodSelectorCarousel/PeriodSelectorCarousel";
import { PeriodLengthToggle } from "@/components/PeriodLengthToggle/PeriodLengthToggle";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function AnalyticsPage() {
	useRequireAuth();
	const isDesktop = useBreakpoint("desktop");

	const period = usePeriodStore(_ => _.period);
	const { data: budget, isLoading } = trpc.useQuery(["budgets.get", { period }]);

	return <AppLayout active="budgets">

		<PageHead title="Budgets" />

		<AppLayoutHeader>
			<div className="px-10 py-8 flex flex-col gap-4">
				<div className="flex items-start justify-between gap-4">
					<div className="mr-auto">
						<h1 className="text-2xl font-bold">
							Budget
						</h1>
						<p className="text-sm text-black-3 dark:text-white-3">
							{
								getPeriodLength(period) === "month"
									? isLoading
										? "Loading budget..."
										: budget
											? `${budget.name ?? "Untitled budget"}`
											: `No budget for ${formatBudgetDate(getPeriodStartDate(period))}`
									: "Go to month view"
							}
						</p>
					</div>
					{isDesktop ? <PeriodSelectorButtons /> : <PeriodLengthToggle />}
				</div>
				{!isDesktop && <PeriodSelectorCarousel />}
			</div>
		</AppLayoutHeader>

		<div className="px-10 py-8 w-full">
			<BudgetSummary />
		</div>
	</AppLayout >
}