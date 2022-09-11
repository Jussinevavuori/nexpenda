import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { usePeriodStore } from "@/stores/periodStore";
import { useActiveQuery } from "@/stores/transactionSearchAtom";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { capitalize } from "@/utils/generic/capitalize";
import { c } from "@/utils/generic/classnames";
import { Divider } from "../Divider/Divider";
import { Popover } from "../Popover/Popover";

export function PeriodLengthToggle() {
	const isActiveQuery = !!useActiveQuery();
	const period = usePeriodStore(_ => _.period);
	const changeLength = usePeriodStore(_ => _.changeLength)

	const periodLength = getPeriodLength(period);

	return <Popover
		button={<Button
			variant="flat"
			color="monochrome"
			endIcon={<Icon.Material icon="unfold_more" size={20} />}
			style={{ width: 140 }}
			className="pr-1 pl-3 justify-between"
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
}