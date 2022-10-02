import { usePeriodStore } from "@/stores/periodStore";
import { colorValuesMap } from "@/utils/color/colorValuesMap";
import { toRgbList } from "@/utils/color/setPrimaryColor";
import { getSystemThemeMode } from "@/utils/dom/getSystemThemeMode";
import { trpc } from "@/utils/trpc";
import { ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { usePreference } from "../Preferences/hooks/usePreference";

export type PeriodExpensesLineChartProps = {
	height: number;
}

export function PeriodExpensesLineChart({ height }: PeriodExpensesLineChartProps) {

	const period = usePeriodStore(_ => _.period);
	const { data: analytics } = trpc.useQuery(["analytics.get", { period }]);

	const palette = usePreference("palette")
	const theme = usePreference("theme")
	const lineChartOptions = useMemo(
		() => chartOptions({ theme, palette, height }),
		[theme, palette, height]
	)

	const lineChartData = useMemo(() => ({
		labels: analytics?.charts.exp.map(_ => _.x) ?? [],
		datasets: [{ data: analytics?.charts.exp ?? [] },]
	}), [analytics])

	return <Line
		height="100%"
		style={{ maxHeight: height }}
		data={lineChartData}
		options={lineChartOptions}
	/>

}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const chartOptions = (options: {
	theme: SelectableTheme,
	palette: StaticPalette,
	height: number,
}): ChartOptions<"line"> => {

	const dark = options.theme === "dark" || (options.theme === "system" && getSystemThemeMode() === "dark");
	const palette = options.palette;
	const c = colorValuesMap;

	const withOpacity = (_: string, opacity: number) => `rgba(${toRgbList(_, ", ")}, ${opacity})`

	return {
		plugins: {
			legend: {
				display: false,
			}
		},
		elements: {
			line: {
				borderWidth: 2,
				borderColor:
					c["rose"][500],
				fill: "start",
				backgroundColor(ctx) {
					const ctx2d = ctx.chart.canvas.getContext("2d");
					if (!ctx2d) return dark ? c["rose"][800]! : c["rose"][200]!;

					const gradient = ctx2d.createLinearGradient(0, 0, 0, options.height);
					gradient.addColorStop(0, withOpacity(c["rose"][500]!, 0.3))
					gradient.addColorStop(1, withOpacity(c["rose"][500]!, 0))
					return gradient;
				},
			},

			point: {
				radius: 0,
				hitRadius: 0,
			},
		},
		scales: {
			xAxis: {
				display: false,
			},
			yAxis: {
				display: false,
			}
		},
	}
}