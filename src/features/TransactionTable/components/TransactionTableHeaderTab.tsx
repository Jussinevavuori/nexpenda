import { Icon } from '@/components/Icon/Icon';
import { c } from '@/utils/generic/classnames';
import { ReactNode } from 'react';
import { TransactionSortProperty } from '@/stores/transactionSortStore';

export interface TransactionTableHeaderTabProps {
	label?: string;
	onClick?(): void;
	sortDirection?: SortDirection;
	sortProperty?: TransactionSortProperty;
	span?: number;
	className?: string;
	children?: ReactNode;
}

export function TransactionTableHeaderTab(props: TransactionTableHeaderTabProps) {

	return <button
		className={c(`rounded relative flex items-center px-4 h-full hover:bg-hover-overlay`, props.className)}
		onClick={props.onClick}
	>

		{/* Custom children */}
		{
			props.children &&
			<span className="">
				{props.children}
			</span>
		}

		{/* Label */}
		{
			props.label &&
			<p className={c("truncate dark:text-slate-100", props.sortProperty ? "pr-4" : "")}>
				{props.label}
			</p>
		}

		{/* Sort icon */}
		{
			props.sortProperty && props.sortDirection !== "none" &&
			<span className="text-primary-500 dark:text-primary-800 flex items-center absolute right-4 top-0 bottom-0">
				<Icon icon={c.if(props.sortDirection === "asc")("expand_more").else("expand_less")} />
			</span>
		}

	</button>

}