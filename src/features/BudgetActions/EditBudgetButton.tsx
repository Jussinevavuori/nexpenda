import { Button } from "@/components/Button/Button";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { Popover } from "@/components/Popover/Popover";
import { usePeriodStore } from "@/stores/periodStore";
import { formatBudgetDate } from "@/utils/budgets/formatBudgetDate";
import { getPeriodStartDate } from "@/utils/dates/getPeriodStartDate";

export type EditBudgetButtonProps = {
	budget?: BudgetItem;
}

export function EditBudgetButton({ budget }: EditBudgetButtonProps) {
	const period = usePeriodStore(_ => _.period);


	const handleCreate = () => {

	}

	const handleEdit = () => {

	}

	if (!budget) {
		return <Popover
			button={<Button
				variant="bordered"
				color="monochrome"
				endIcon={<Icon.Material icon="edit" />}
			>
				Create budget
			</Button>}
		>
			{
				({ close }) => (
					<div className="w-96">
						<button
							onClick={() => {
								close();
								handleCreate();
							}}
							className="hover:bg-hover-overlay active:bg-active-overlay p-4"
						>
							<div className="flex gap-4">
								<Icon.Material icon="playlist_add" />
								<div>
									<p className="text-sm font-semibold text-left">
										Create new budget
									</p>
									<p className="text-sm text-black-3 dark:text-white-3 text-left">
										Create a new blank budget starting from{" "}
										{formatBudgetDate(getPeriodStartDate(period))}
									</p>
								</div>
							</div>
						</button>
					</div>
				)
			}
		</Popover>
	}

	return <Popover
		button={<Button
			variant="bordered"
			color="monochrome"
			endIcon={<Icon.Material icon="edit" />}
		>
			Edit budget
		</Button>}
	>
		{
			({ close }) => (<div className="w-96">
				<button
					onClick={() => {
						close();
						handleEdit();
					}}
					className="hover:bg-hover-overlay active:bg-active-overlay p-4"
				>
					<div className="flex gap-4">
						<Icon.Material icon="edit_note" />
						<div>
							<p className="text-sm font-semibold text-left">
								Edit current budget
							</p>
							<p className="text-sm text-black-3 dark:text-white-3 text-left">
								Changes the current budget which will affect
								from {formatBudgetDate(budget)}
							</p>
						</div>
					</div>
				</button>

				<Divider disableMargin />

				<button
					onClick={() => {
						close();
						handleCreate();
					}}
					className="hover:bg-hover-overlay active:bg-active-overlay p-4"
				>
					<div className="flex gap-4">
						<Icon.Material icon="playlist_add" />
						<div>
							<p className="text-sm font-semibold text-left">
								Create new budget
							</p>
							<p className="text-sm text-black-3 dark:text-white-3 text-left">
								Create a new budget from the current one starting from{" "}
								{formatBudgetDate(getPeriodStartDate(period))}
							</p>
						</div>
					</div>
				</button>
			</div>)
		}
	</Popover>
}