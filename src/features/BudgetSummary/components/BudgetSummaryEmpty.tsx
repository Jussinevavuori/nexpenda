import { Button } from "@/components/Button/Button"
import { pages } from "@/utils/pages"

export function BudgetSummaryEmpty() {

	return <div className="flex flex-col items-stretch max-w-xl mx-auto py-16 gap-8">
		<p className="text-center">
			You don't have a budget created yet. Start off by creating the first version of your budget.
		</p>

		<Button.Link
			href={pages.budgets.editor}
			variant="default"
			color="monochrome"
		>
			Create budget
		</Button.Link>
	</div>

}