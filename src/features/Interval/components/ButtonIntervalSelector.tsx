import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { formatDateInterval } from "@/utils/dates/formatInterval";
import { intervalIncludesToday } from "@/utils/dates/intervalIncludesToday";
import { capitalize } from "@/utils/generic/capitalize";
import { IntervalSelectorProps } from "../IntervalSelector";
import { useIntervalStore } from "../store/useIntervalStore";

export interface ButtonIntervalSelectorProps extends IntervalSelectorProps { }

export function ButtonIntervalSelector(props: ButtonIntervalSelectorProps) {

	const reset = useIntervalStore(_ => _.reset);
	const forward = useIntervalStore(_ => _.forward);
	const back = useIntervalStore(_ => _.back);
	const intervalDate = useIntervalStore(_ => _.date);
	const intervalLength = useIntervalStore(_ => _.intervalLength);
	const changeIntervalTo = useIntervalStore(_ => _.changeTo)

	const cycleIntervalLength = () => {
		switch (intervalLength) {
			case "month": {
				changeIntervalTo("year");
				break;
			}
			case "year": {
				changeIntervalTo("all");
				break;
			}
			case "all": {
				changeIntervalTo("month");
				break;
			}
		}
	}

	return <div className="flex items-center gap-2">

		<Button
			onClick={() => cycleIntervalLength()}
			color="primary"
			className="w-28 pr-2 py-[0.45rem] justify-between"
			endIcon={<Icon.Material
				className="text-white dark:text-black"
				icon="unfold_more"
			/>}
		>
			{capitalize(intervalLength)}
		</Button>


		<Button
			onClick={() => back()}
			disabled={intervalLength === "all"}
			className="px-2 py-[0.45rem]"
		>
			<Icon.Material
				className={intervalLength === "all" ? "text-slate-400" : "text-slate-white dark:text-black"}
				icon="chevron_left"
			/>
		</Button>


		<Button
			onClick={() => forward()}
			disabled={intervalLength === "all"}
			className="px-2 py-[0.45rem]"
		>
			<Icon.Material
				className={intervalLength === "all" ? "text-slate-400" : "text-slate-white dark:text-black"}
				icon="chevron_right"
			/>
		</Button>

		<span className="bg-slate-100 dark:bg-slate-840 rounded py-[0.62rem] w-[155px]">
			<p className="px-4 text-center text-sm dark:text-slate-100 font-semibold">
				{formatDateInterval(intervalDate, intervalLength)}
			</p>
		</span>

		<Button
			onClick={() => reset()}
			disabled={intervalIncludesToday(intervalDate, intervalLength)}
			color={intervalIncludesToday(intervalDate, intervalLength) ? "monochrome" : "primary"}
			className="px-2 py-[0.45rem]"
		>
			<Icon.Material
				className={intervalIncludesToday(intervalDate, intervalLength) ? "text-slate-400" : "text-slate-white dark:text-black"}
				icon="replay"
			/>
		</Button>

	</div >;
}