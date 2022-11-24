import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { pages } from "@/utils/pages";

export type EditBudgetButtonProps = {
	budget?: BudgetItem;
}

export function EditBudgetButton({ budget }: EditBudgetButtonProps) {
	if (!budget) return <Button.Link
		href={pages.budgets.editor}
		variant="bordered"
		color="monochrome"
		endIcon={<Icon.Material icon="edit" />}
	>
		Create budget
	</Button.Link>

	else return <Button.Link
		href={pages.budgets.editor}
		variant="bordered"
		color="monochrome"
		endIcon={< Icon.Material icon="edit" />}
	>
		Edit budget
	</Button.Link>
}