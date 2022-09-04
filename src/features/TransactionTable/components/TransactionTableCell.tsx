import { c } from "@/utils/generic/classnames";
import { ReactNode } from "react";

export interface TransactionTableCellProps {
	children?: ReactNode;
	className?: string;
}

export function TransactionTableCell(props: TransactionTableCellProps) {

	return <div className={c(`py-2 rounded relative flex items-center h-full`, props.className)}>
		<div className="absolute inset-0 flex items-center px-4">
			{props.children}
		</div>
	</div>

}