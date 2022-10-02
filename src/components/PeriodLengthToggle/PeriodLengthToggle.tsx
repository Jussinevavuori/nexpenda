import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { usePeriodStore } from "@/stores/periodStore";
import { useActiveQuery } from "@/stores/transactionSearchAtom";
import { getPeriodLength } from "@/utils/dates/getPeriodLength";
import { capitalize } from "@/utils/generic/capitalize";
import { c } from "@/utils/generic/classnames";
import React from "react";
import { Divider } from "../Divider/Divider";
import { Popover } from "../Popover/Popover";

export type PeriodLengthToggleProps = {
	children?: React.ReactNode;
}

export function PeriodLengthToggle({ children }: PeriodLengthToggleProps) {
	const isActiveQuery = !!useActiveQuery();
	const period = usePeriodStore(_ => _.period);
	const changeLength = usePeriodStore(_ => _.changeLength)

	const periodLength = getPeriodLength(period);

	return <Popover
		button={children || <Button
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
							<span className={c("absolute left-2 bottom-0 text-xs px-1 translate-y-1 rounded-full", c.if(periodLength === "month")("bg-primary-500 text-white").else("bg-white text-black"))}>
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
							<span className={c("absolute left-2 bottom-0 text-xs px-1 translate-y-1 rounded-full", c.if(periodLength === "year")("bg-primary-500 text-white").else("bg-white text-black"))}>
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
							<span className={c("absolute left-2 bottom-0 text-xs px-1 translate-y-1 rounded-full", c.if(periodLength === "all")("bg-primary-500 text-white").else("bg-white text-black"))}>
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