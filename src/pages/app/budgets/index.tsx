import { PageHead } from "@/components/PageHead/PageHead";
import { PeriodSelectorButtons } from "@/components/PeriodSelectorButtons/PeriodSelectorButtons";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";
import { BudgetSummary } from "@/features/BudgetSummary/BudgetSummary";
import { PeriodSelectorCarousel } from "@/components/PeriodSelectorCarousel/PeriodSelectorCarousel";
import { PeriodLengthToggle } from "@/components/PeriodLengthToggle/PeriodLengthToggle";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function BudgetsPage() {
	useRequireAuth();
	const isDesktop = useBreakpoint("desktop");

	return <AppLayout active="budgets">

		<PageHead title="Budgets" />

		<AppLayoutHeader>
			<div className="px-6 d:px-10 py-4 d:py-8 flex flex-col gap-4">
				<div className="flex items-start justify-between gap-4">
					<div className="mr-auto">
						<h1 className="text-2xl font-bold">
							Budget
						</h1>
					</div>
					{isDesktop ? <PeriodSelectorButtons /> : <PeriodLengthToggle />}
				</div>
				{!isDesktop && <PeriodSelectorCarousel />}
			</div>
		</AppLayoutHeader>


		<div className="px-6 d:px-10 py-8 w-full">
			<BudgetSummary />
		</div>
	</AppLayout >
}