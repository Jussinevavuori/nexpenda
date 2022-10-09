import { usePeriodStore } from "@/stores/periodStore";
import { colorValuesMap } from "@/utils/color/colorValuesMap";
import { toRgbList } from "@/utils/color/setPrimaryColor";
import { trpc } from "@/utils/trpc";
import type { ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

export type CategoryBarChartProps = {
	type: "inc" | "exp";
}

const BAR_HEIGHT = 24;
const OVERHEAD_HEIGHT = 28;

export function CategoryBarChart({ type }: CategoryBarChartProps) {

	const period = usePeriodStore(_ => _.period);
	const { data: analytics } = trpc.useQuery(["analytics.get", { period }]);
	const barChartOptions = useMemo(() => chartOptions({ type }), [type])

	const barChartData = useMemo(() => {
		const items: Array<{ label: string, value: number }> = [];

		// Gather absolute value of all categories which have expenses or incomes
		// depending on selection listed and list their absolute value
		if (analytics) {
			for (const cat of Object.values(analytics.sums.cat)) {
				if (cat[type] !== 0) {
					items.push({ label: cat.name, value: Math.abs(cat[type]) / 100 })
				}
			}
		}

		// Sort items greatest value first
		items.sort((a, b) => b.value - a.value);

		return {
			labels: items.map(_ => _.label),
			datasets: [{ data: items.map(_ => _.value) }]
		}
	}, [analytics, type])

	return <Bar
		data={barChartData}
		options={barChartOptions}
		style={{ maxHeight: barChartData.labels.length * BAR_HEIGHT + OVERHEAD_HEIGHT }}
	/>
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const chartOptions = (options: CategoryBarChartProps): ChartOptions<"bar"> => {
	const c = colorValuesMap;
	const palette = options.type === "inc" ? c["emerald"] : c["rose"];

	const withOpacity = (_: string, opacity: number) => `rgba(${toRgbList(_, ", ")}, ${opacity})`

	return {
		indexAxis: "y" as const,
		elements: {
			bar: {
				borderWidth: 0,
				backgroundColor: palette[500],
				hoverBackgroundColor: palette[600],
				borderRadius: 4,
			},
		},
		responsive: true,
		scales: {
			xAxis: {
				display: true,
				grid: {
					borderColor: withOpacity(c.slate[500]!, 0.2),
					color: withOpacity(c.slate[500]!, 0.2),
				}
			},
			yAxis: {
				display: true,
				grid: {
					borderColor: withOpacity(c.slate[500]!, 0.2),
					color: withOpacity(c.slate[500]!, 0.2),
				}
			}
		},
	}
}