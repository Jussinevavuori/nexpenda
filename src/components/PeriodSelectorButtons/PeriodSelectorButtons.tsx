import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { usePeriodStore } from "@/stores/periodStore";
import { useActiveQuery } from "@/stores/transactionSearchAtom";
import { formatPeriod } from "@/utils/dates/formatPeriod";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { periodIncludesToday } from "@/utils/dates/periodIncludesToday";
import { capitalize } from "@/utils/generic/capitalize";

type PeriodSelectorButtonsProps = {
	disabledOnQuery?: boolean;
}

export function PeriodSelectorButtons(props: PeriodSelectorButtonsProps) {
	const isActiveQuery = !!useActiveQuery();

	const reset = usePeriodStore(_ => _.reset);
	const forward = usePeriodStore(_ => _.forward);
	const back = usePeriodStore(_ => _.back);
	const period = usePeriodStore(_ => _.period);
	const changeLength = usePeriodStore(_ => _.changeLength)

	const periodLength = getPeriodLength(period);

	const cycleIntervalLength = () => {
		switch (periodLength) {
			case "month": {
				changeLength("year");
				break;
			}
			case "year": {
				changeLength("all");
				break;
			}
			case "all": {
				changeLength("month");
				break;
			}
		}
	}

	return <div className="flex items-center gap-2">

		<Button
			onClick={() => cycleIntervalLength()}
			className="w-28 pr-2 py-[0.45rem] justify-between"
			endIcon={<Icon.Material size={20} icon="unfold_more" />}
			disabled={isActiveQuery}
		>
			{isActiveQuery ? "Results" : capitalize(periodLength)}
		</Button>


		<Button
			onClick={() => back()}
			disabled={isActiveQuery || periodLength === "all"}
			className="px-2 py-[0.45rem]"
		>
			<Icon.Material size={20} icon="chevron_left" />
		</Button>


		<Button
			onClick={() => forward()}
			disabled={isActiveQuery || periodLength === "all"}
			className="px-2 py-[0.45rem]"
		>
			<Icon.Material size={20} icon="chevron_right" />
		</Button>

		<span className="bg-white-bg-5 dark:bg-black-bg-5 rounded w-[155px] h-button flex items-center justify-center">
			<p className="px-4 text-center text-sm dark:text-slate-100 font-semibold">
				{isActiveQuery ? "Search results" : formatPeriod(period)}
			</p>
		</span>

		<Button
			onClick={() => reset()}
			disabled={isActiveQuery || periodIncludesToday(period)}
			className="px-2 py-[0.45rem]"
		>
			<Icon.Material size={20} icon="replay" />
		</Button>

	</div >;
}