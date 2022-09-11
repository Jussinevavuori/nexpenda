import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { usePeriodStore } from "@/stores/periodStore";
import { useActiveQuery } from "@/stores/transactionSearchAtom";
import { formatPeriod } from "@/utils/dates/formatPeriod";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { periodIncludesToday } from "@/utils/dates/periodIncludesToday";
import { capitalize } from "@/utils/generic/capitalize";
import { c } from "@/utils/generic/classnames";
import { Divider } from "../Divider/Divider";
import { Popover } from "../Popover/Popover";


export function PeriodSelectorButtons() {
	const isActiveQuery = !!useActiveQuery();

	const reset = usePeriodStore(_ => _.reset);
	const forward = usePeriodStore(_ => _.forward);
	const back = usePeriodStore(_ => _.back);
	const period = usePeriodStore(_ => _.period);
	const changeLength = usePeriodStore(_ => _.changeLength)

	const periodLength = getPeriodLength(period);

	return <div className="flex items-center gap-2">

		<Popover
			button={<Button
				className="w-28 pr-2 py-[0.45rem] justify-between"
				endIcon={<Icon.Material size={20} icon="unfold_more" />}
				disabled={isActiveQuery}
			>
				{isActiveQuery ? "Results" : capitalize(periodLength)}
			</Button>}
		>
			{({ close }) => (
				<div>

					<button
						onClick={() => {
							close();
							changeLength("month");
						}}
						className={c("w-full hover:bg-hover-overlay active:bg-active-overlay p-2", c.if(periodLength === "month")("text-primary"))}
					>
						<div className="flex gap-4">
							<div className="relative">
								<Icon.Material icon="calendar_today" />
								<span className="absolute left-2 bottom-0 bg-white text-xs px-1 translate-y-1 rounded-full">
									30
								</span>
							</div>
							<p className="text-sm">
								Month
							</p>
						</div>
					</button>

					<Divider disableMargin />

					<button
						onClick={() => {
							close();
							changeLength("year");
						}}
						className={c("w-full hover:bg-hover-overlay active:bg-active-overlay p-2", c.if(periodLength === "year")("text-primary"))}
					>
						<div className="flex gap-4">
							<div className="relative">
								<Icon.Material icon="calendar_today" />
								<span className="absolute left-2 bottom-0 bg-white text-xs px-1 translate-y-1 rounded-full">
									365
								</span>
							</div>
							<p className="text-sm">
								Year
							</p>
						</div>
					</button>

					<Divider disableMargin />

					<button
						onClick={() => {
							close();
							changeLength("all");
						}}
						className={c("w-full hover:bg-hover-overlay active:bg-active-overlay p-2", c.if(periodLength === "all")("text-primary"))}
					>
						<div className="flex gap-4">
							<div className="relative">
								<Icon.Material icon="calendar_today" />
								<span className="absolute left-2 bottom-0 bg-white text-sm px-1 translate-y-1 rounded-full">
									{"∞"}
								</span>
							</div>
							<p className="text-sm">
								All
							</p>
						</div>
					</button>
				</div>
			)}
		</Popover>

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