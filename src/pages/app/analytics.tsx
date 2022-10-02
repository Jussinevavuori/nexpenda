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

export default function AnalyticsPage() {
	useRequireAuth();
	const isDesktop = useBreakpoint("desktop");

	const period = usePeriodStore(_ => _.period);
	const { data: analytics } = trpc.useQuery(["analytics.get", { period }]);

	return <AppLayout active="analytics">
		<PageHead title="Analytics" />

		<AppLayoutHeader>
			<div className="px-10 py-8 flex flex-col gap-4">
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
				<div className="px-10">
					<div className="py-6">
						<h2 className="">
							Total
						</h2>

						<p className={c("text-3xl font-semibold", analytics.sums.tot >= 0 ? "text-emerald-600" : "text-rose-500")}>
							{formatMoney(analytics.sums.tot)}
						</p>
					</div>

					<div className="">
						<PeriodTotalLineChart height={240} />
					</div>

					<div className="h-6" />

					<div className="flex gap-6 flex-wrap">
						<div className="min-w-[240px] rounded px-6 pt-4 pb-16 relative border border-divider flex-1">
							<p className="">
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
							<p className="">
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
				</div>
			) : (
				<div className="flex items-center justify-center py-16">
					<LoadingSpinner />
				</div>
			)
		}


	</AppLayout >
}
