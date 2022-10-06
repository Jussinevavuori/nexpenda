import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { getDefaultedCategoryIcon } from "@/utils/category/getDefaultedCategoryIcon";
import { formatMoney } from "@/utils/currency/formatMoney";
import { formatDateString } from "@/utils/dates/formatDateString";
import { c } from "@/utils/generic/classnames";
import { formatOccurrenceInterval } from "@/utils/schedules/formatOccurrenceInterval";
import { getLastOccurrence } from "@/utils/schedules/getLastOccurrence";
import { getNextOccurrence } from "@/utils/schedules/getNextOccurrence";
import { getNextOccurrenceFrom } from "@/utils/schedules/getNextOccurrenceFrom";
import { getPercentageUntilNextOccurrence } from "@/utils/schedules/getPercentageUntilNextOccurrence";
import { getPreviousOccurrence } from "@/utils/schedules/getPreviousOccurrence";
import { lineClamp } from "@/utils/styles/lineClamp";
import { trpc } from "@/utils/trpc";
import { differenceInCalendarDays } from "date-fns";
import { useMemo } from "react";

export type ScheduleItemProps = {
	schedule: ScheduleItem
}

export function ScheduleItem({ schedule }: ScheduleItemProps) {

	const utils = trpc.useContext();
	const cancelMutation = trpc.useMutation("schedules.delete", {
		onSettled() {
			utils.invalidateQueries("schedules.list");
		}
	});

	const handleCancel = () => cancelMutation.mutate({ id: schedule.id })

	const previous = useMemo(() => {
		return getPreviousOccurrence(schedule);
	}, [schedule]);

	const next = useMemo(() => {
		return previous ? getNextOccurrenceFrom(schedule, previous) : getNextOccurrence(schedule);
	}, [schedule, previous]);

	return <div className="">
		<div className={c("relative group flex items-center gap-4", c.if(!next)("opacity-50"))}>
			<div className="relative w-12 h-12 bg-white-bg-4 dark:bg-black-bg-4 rounded-full flex items-center justify-center">
				<span className="text-2xl">
					{getDefaultedCategoryIcon(schedule.category, schedule.amount)}
				</span>
			</div>

			<div className={c(
				"flex-1 flex flex-col items-stretch"
			)}>
				<p className="text-black dark:text-white font-semibold" style={lineClamp()}>
					{schedule.category.name}
				</p>
				<p className="text-slate-700 dark:text-slate-300" style={lineClamp()}>
					{schedule.comment}
				</p>
			</div>

			<div className={c(
				"text-xl font-semibold whitespace-nowrap",
				schedule.amount > 0 ? "text-success" : "text-danger"
			)}>
				{formatMoney(schedule.amount)}
			</div>
		</div >

		<div className={c("py-8", c.if(!next)("opacity-50"))}>

			<div className="flex flex-wrap justify-between items-start">
				<p className="">
					{next ? "Repeats" : "Repeated"} every{" "}
					<span className="font-bold">
						{formatOccurrenceInterval(schedule)}
					</span>
					{
						schedule.occurrences && <span>
							{" until "}
							<span className="font-bold">
								{formatDateString(getLastOccurrence(schedule) ?? new Date())}
							</span>
						</span>
					}
				</p>

				<p className="text-black-3 dark:text-white-3">
					{schedule.transactions.length} occurrences
				</p>
			</div>

			<div className="py-4">
				<div className="relative h-1 rounded-full w-full bg-primary bg-opacity-10">
					<div
						className="absolute h-1 left-0 bg-primary rounded-full"
						style={{ width: getPercentageUntilNextOccurrence(schedule) + "%" }}
					/>
				</div>
			</div>


			<div className="flex flex-wrap justify-between items-start">
				<p className="text-sm text-black-2 dark:text-white-2 flex gap-2 items-center">
					<span className="font-bold">
						{formatDateString(previous ?? new Date())}
					</span>
					<span className="text-black-3 dark:text-white-3">
						{previous ? "Previous" : "Today"}
					</span>
				</p>
				<p className="text-sm text-black-2 dark:text-white-2 flex gap-2 items-center">
					<span className="text-black-3 dark:text-white-3">
						{next ? `Next in ${differenceInCalendarDays(next, new Date())} days` : "No more occurrences"}
					</span>
					{
						next &&
						<span className="font-bold">
							{formatDateString(next)}
						</span>
					}
				</p>
			</div>
		</div>

		<div className="flex items-center justify-end gap-6">
			<Tooltip value={<div style={{ maxWidth: 260, padding: 8 }}>
				<p className="text-sm font-bold">Not yet implemented.{" "}</p>
				<p className="text-xs opacity-75 pt-2">To edit, please cancel and create new scheduled transaction.</p>
			</div>}>
				<Button
					variant="flat"
					disabled
					startIcon={<Icon.Material icon="edit" />}
				>
					Edit
				</Button>
			</Tooltip>
			<AlertDialog
				title="Confirm cancel"
				description="Are you sure you want to cancel this transaction? Canceli"
				cancelLabel="Do not cancel"
				confirmLabel="Confirm"
				variant="danger"
				onConfirm={handleCancel}
			>
				<Button
					color="danger"
					variant="flat"
					startIcon={<Icon.Material icon="delete" />}
				>
					Cancel
				</Button>
			</AlertDialog>
		</div>
	</div>
}