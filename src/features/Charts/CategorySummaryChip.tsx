import { usePeriodStore } from "@/stores/periodStore";
import { getDefaultedCategoryIcon } from "@/utils/category/getDefaultedCategoryIcon";
import { formatMoney } from "@/utils/currency/formatMoney";
import { trpc } from "@/utils/trpc";

export type CategorySummaryChipProps = {
	categoryId: string;
	sign: "inc" | "exp";
}

export function CategorySummaryChip(props: CategorySummaryChipProps) {
	const period = usePeriodStore(_ => _.period);
	const { data: categories } = trpc.useQuery(["categories.list"]);
	const { data: analytics } = trpc.useQuery(["analytics.get", { period }]);

	const category = (categories ?? []).find(cat => {
		return cat.id === props.categoryId
	})

	const sums = analytics?.sums.cat[props.categoryId]

	if (!category || !sums) return null;

	return <div
		className="flex flex-row px-2 py-1 gap-2 whitespace-nowrap border rounded-full d-inc:bg-emerald-500/5 d-inc:border-emerald-500 d-exp:bg-rose-500/5 d-exp:border-rose-500"
		data-sign={props.sign}
	>
		<span className="rounded-full">
			{getDefaultedCategoryIcon(category, props.sign === "inc" ? "+" : "-")}
		</span>
		<span>
			{category.name}
		</span>
		<span className="font-semibold">
			{formatMoney(sums[props.sign])}
		</span>
	</div>
}