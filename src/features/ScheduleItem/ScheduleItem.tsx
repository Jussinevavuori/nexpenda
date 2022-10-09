import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
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

	return <div className="flex flex-col gap-4">
		<div
			className="relative group flex items-center gap-4 !d-active:opacity-50"
			data-active={!!next}
		>
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

		<div data-active={!!next} className="!d-active:opacity-50">

			<div className="flex flex-wrap justify-between items-start">
				<p className="text-black-2 dark:text-white-2">
					{next ? "Repeats" : "Repeated"} every{" "}
					<span className="font-bold text-black dark:text-white">
						{formatOccurrenceInterval(schedule)}
					</span>
					{
						schedule.occurrences && <span>
							{" until "}
							<span className="font-bold text-black dark:text-white">
								{formatDateString(getLastOccurrence(schedule) ?? new Date())}
							</span>
						</span>
					}
				</p>
			</div>
		</div>

		<div data-active={!!next} className="!d-active:opacity-50">

			<div className="flex gap-8 items-center">
				<ProgressBar
					progress={getPercentageUntilNextOccurrence(schedule) / 100}
					variant="circle"
					size={48}
					strokeWidth={8}
				/>

				<div className="flex-1 gap-x-4 text-sm text-black-2 dark:text-white-2 grid grid-cols-[auto_1fr] ">
					<span className="text-black-3 dark:text-white-3">
						{next ? `Next in ${differenceInCalendarDays(next, new Date())} days` : "No more occurrences"}
					</span>
					{
						next ? <span className="font-bold">
							{formatDateString(next)}
						</span> : <span />
					}
					<span className="text-black-3 dark:text-white-3">
						{previous ? "Previous" : "Today"}
					</span>
					<span className="font-bold">
						{formatDateString(previous ?? new Date())}
					</span>
					<span className="text-black-3 dark:text-white-3">
						Occurrences
					</span>
					<span className="font-bold">
						x {schedule.transactions.length}
					</span>
				</div>

				<div className="ml-auto self-end translate-x-4 translate-y-2">
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
							variant="text"
							startIcon={<Icon.Material icon="clear" />}
						>
							Cancel
						</Button>
					</AlertDialog>
				</div>
			</div>
		</div>
	</div >
}