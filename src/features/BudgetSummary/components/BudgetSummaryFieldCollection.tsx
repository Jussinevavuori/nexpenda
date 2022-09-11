import React from "react"

export type BudgetSummaryFieldCollectionProps = {
	children?: React.ReactNode;
	title?: string;
}

export function BudgetSummaryFieldCollection({ title, children }: BudgetSummaryFieldCollectionProps) {

	return <div className="flex flex-col">
		{title && <p className="uppercase font-semibold pb-4">{title}</p>}
		<div className="flex gap-8 flex-wrap">
			{children}
		</div>
	</div>

}