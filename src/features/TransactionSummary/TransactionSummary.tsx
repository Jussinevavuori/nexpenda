import { Chip } from "@/components/Chip/Chip";
import { Icon } from "@/components/Icon/Icon";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { usePeriodStore } from "@/stores/periodStore";
import { formatMoney } from "@/utils/currency/formatMoney";
import { c } from "@/utils/generic/classnames";
import { trpc } from "@/utils/trpc";
import { useTransactionsSummary } from "../../hooks/useTransactionsSummary";

export interface TransactionSummaryProps {
	className?: string;
	hideChips?: boolean;
}

export function TransactionSummary(props: TransactionSummaryProps) {
	const period = usePeriodStore(_ => _.period);
	const { data: transactions } = trpc.useQuery(["transactions.list", { period }])
	const summary = useTransactionsSummary(transactions ?? [])

	return <div className={c("flex gap-2", props.className)}>

		<p className="flex items-center gap-2">
			<Icon.Material
				icon="insights"
				className={summary.total.all >= 0 ? "text-emerald-600" : "text-rose-500"}
			/>
			<span className={c("text-2xl font-semibold", summary.total.all >= 0 ? "text-emerald-600" : "text-rose-500")}>
				{formatMoney(summary.total.all)}
			</span>
		</p>

		{
			!props.hideChips &&
			<div className="flex gap-2">
				<Tooltip value="Total incomes" sideOffset={4}>
					<Chip variant="flat" color="success">
						{"+" + formatMoney(summary.total.positives)}
					</Chip>
				</Tooltip>

				<Tooltip value="Total expenses" sideOffset={4}>
					<Chip variant="flat" color="danger">
						{formatMoney(summary.total.negatives)}
					</Chip>
				</Tooltip>

				<Tooltip value="Number of transactions" sideOffset={4}>
					<Chip variant="flat" color="monochrome">
						{"x " + summary.count.all.toString()}
					</Chip>
				</Tooltip>
			</div>
		}
	</div>
}