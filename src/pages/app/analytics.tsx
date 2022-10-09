import "@/utils/chartjs"
import { PageHead } from "@/components/PageHead/PageHead";
import { PeriodSelectorButtons } from "@/components/PeriodSelectorButtons/PeriodSelectorButtons";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";
import { usePeriodStore } from "@/stores/periodStore";
import { trpc } from "@/utils/trpc";
import { formatMoney } from "@/utils/currency/formatMoney";
import { PeriodTotalLineChart } from "@/features/Charts/PeriodTotalLineChart";
import { c } from "@/utils/generic/classnames";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { PeriodExpensesLineChart } from "@/features/Charts/PeriodExpensesLineChart";
import { PeriodIncomesLineChart } from "@/features/Charts/PeriodIncomesLineChart";
import { Divider } from "@/components/Divider/Divider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { PeriodLengthToggle } from "@/components/PeriodLengthToggle/PeriodLengthToggle";
import { PeriodSelectorCarousel } from "@/components/PeriodSelectorCarousel/PeriodSelectorCarousel";
import { CategoryBarChart } from "@/features/Charts/CategoryBarChart";
import { CategorySummaryChip } from "@/features/Charts/CategorySummaryChip";

export default function AnalyticsPage() {
	useRequireAuth();
	const isDesktop = useBreakpoint("desktop");

	const period = usePeriodStore(_ => _.period);
	const { data: analytics } = trpc.useQuery(["analytics.get", { period }]);

	return <AppLayout active="analytics">
		<PageHead title="Analytics" />

		<AppLayoutHeader>
			<div className="px-6 d:px-10 py-4 d:py-8 flex flex-col gap-4">
				<div className="flex items-start justify-between gap-4">
					<div className="mr-auto">
						<h1 className="text-2xl font-bold">
							Analytics
						</h1>
					</div>
					{isDesktop ? <PeriodSelectorButtons /> : <PeriodLengthToggle />}
				</div>
				{!isDesktop && <PeriodSelectorCarousel />}
			</div>
		</AppLayoutHeader>

		{
			analytics ? (
				<div className="px-6 d:px-10">
					<div className="py-6">
						<h2 className="text-3xl font-semibold pb-6">
							Summary
						</h2>

						<p>
							Total
						</p>

						<p className={c("text-3xl font-semibold", analytics.sums.tot >= 0 ? "text-emerald-600" : "text-rose-500")}>
							{formatMoney(analytics.sums.tot)}
						</p>
					</div>

					<div>
						<PeriodTotalLineChart height={240} />
					</div>

					<div className="h-6" />

					<div className="flex gap-6 flex-wrap">
						<div className="min-w-[240px] rounded px-6 pt-4 pb-16 relative border border-divider flex-1">
							<p>
								Incomes
							</p>
							<p className="text-xl font-semibold text-emerald-500">
								{formatMoney(analytics.sums.inc)}
							</p>
							<div className="absolute bottom-0 right-0 max-w-[70%]">
								<PeriodIncomesLineChart height={100} />
							</div>
						</div>
						<div className="min-w-[240px] rounded px-6 pt-4 pb-16 relative border border-divider flex-1">
							<p>
								Expenses
							</p>
							<p className="text-xl font-semibold text-rose-500">
								{formatMoney(analytics.sums.exp)}
							</p>
							<div className="absolute bottom-0 right-0 max-w-[70%]">
								<PeriodExpensesLineChart height={100} />
							</div>
						</div>
					</div>

					<Divider className="my-8" />

					<div className="pt-6 pb-16 flex flex-col gap-6">
						<h2 className="text-3xl font-semibold">
							Categories
						</h2>

						<p>
							{Object.keys(analytics.sums.cat).length} categories
						</p>

						<div className="space-y-2">
							<div className="flex flex-row flex-wrap gap-2">
								{
									Object.keys(analytics.sums.cat)
										.filter(catId => analytics.sums.cat[catId]?.inc)
										.map(catId => (
											<CategorySummaryChip
												key={catId}
												categoryId={catId}
												sign="inc"
											/>
										))
								}
								{
									Object.keys(analytics.sums.cat)
										.filter(catId => analytics.sums.cat[catId]?.exp)
										.map(catId => (
											<CategorySummaryChip
												key={catId}
												categoryId={catId}
												sign="exp"
											/>
										))
								}
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-semibold pb-6">
							Incomes per category
						</h3>

						<CategoryBarChart type="inc" />

						<div className="h-24" />
					</div>

					<div>
						<h3 className="text-xl font-semibold pb-6">
							Expenses per category
						</h3>

						<CategoryBarChart type="exp" />

						<div className="h-24" />
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center py-16">
					<LoadingSpinner />
				</div>
			)
		}


	</AppLayout >
}
