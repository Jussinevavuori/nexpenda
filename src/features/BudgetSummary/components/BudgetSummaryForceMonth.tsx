import { Button } from "@/components/Button/Button"
import { usePeriodStore } from "@/stores/periodStore"

export function BudgetSummaryForceMonth() {

	const changePeriodLength = usePeriodStore(_ => _.changeLength)

	return <div className="flex flex-col items-stretch max-w-xl mx-auto py-16 gap-8">
		<p className="text-center">
			Viewing budgets is only available in monthly view.
		</p>

		<Button
			onClick={() => changePeriodLength("month")}
			variant="default"
			color="monochrome"
		>
			Show monthly view
		</Button>
	</div>

}