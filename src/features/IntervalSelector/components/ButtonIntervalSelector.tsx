import { IntervalSelectorProps } from '../IntervalSelector';
import { Button } from '@components/Button/Button';
import { Icon } from '@components/Icon/Icon';
import { useIntervalContext } from '@contexts/IntervalContext/IntervalContext';

export interface ButtonIntervalSelectorProps extends IntervalSelectorProps { }

export function ButtonIntervalSelector(props: ButtonIntervalSelectorProps) {
	const interval = useIntervalContext();

	return <div className="flex items-center gap-2">

		<Button
			onClick={() => interval.cycleIntervalType()}
			color="primary"
			variant="filled"
			className=" pr-2 py-[0.45rem]"
			endIcon={<Icon
				className="text-white dark:text-slate-900"
				icon="unfold_more"
			/>}
		>
			{interval.isAll ? "All" : (interval.isMonth ? "Month" : "Year")}
		</Button>


		<Button
			onClick={() => { interval.setPreviousInterval(); }}
			disabled={interval.isAll}
			color={interval.isAll ? "slate" : "primary"}
			variant="filled"
			className="px-2 py-[0.45rem]"
		>
			<Icon
				className={interval.isAll ? "text-slate-400" : "text-slate-white dark:text-slate-900"}
				icon="chevron_left"
			/>
		</Button>


		<Button
			onClick={() => { interval.setNextInterval(); }}
			disabled={interval.isAll}
			color={interval.isAll ? "slate" : "primary"}
			variant="filled"
			className="px-2 py-[0.45rem]"
		>
			<Icon
				className={interval.isAll ? "text-slate-400" : "text-slate-white dark:text-slate-900"}
				icon="chevron_right"
			/>
		</Button>

		<span className="bg-slate-100 dark:bg-slate-840 rounded py-[0.62rem] w-[155px]">
			<p className="px-4 text-center text-sm dark:text-slate-100 font-semibold">
				{interval.toString()}
			</p>
		</span>

		<Button
			onClick={() => { interval.setNowInterval() }}
			disabled={interval.includesToday}
			color={interval.includesToday ? "slate" : "primary"}
			variant="filled"
			className="px-2 py-[0.45rem]"
		>
			<Icon
				className={interval.includesToday ? "text-slate-400" : "text-slate-white dark:text-slate-900"}
				icon="replay"
			/>
		</Button>

	</div >;
}