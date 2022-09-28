import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useTransactionSelectionStore } from "@/stores/transactionSelectionStore";

export type SelectAllTransactionsButtonProps = {
	transactions: TransactionItem[];
	icon?: boolean;
}

export function SelectAllTransactionsButton(props: SelectAllTransactionsButtonProps) {
	const selection = useTransactionSelectionStore(_ => _.selection);
	const selectMany = useTransactionSelectionStore(_ => _.selectMany);
	const areAllSelected = selection.size === props.transactions.length;

	const selectAll = () => {
		selectMany(props.transactions.map(_ => _.id), true)
	}

	if (props.icon) {
		return <IconButton
			variant="bordered"
			onClick={selectAll}
		>
			<Icon.Material icon={areAllSelected ? "deselect" : "select_all"} />
		</IconButton>
	}

	return <Button
		onClick={selectAll}
		startIcon={<Icon.Material size={20} icon={areAllSelected ? "deselect" : "select_all"} />}
		{...props}
	>
		{areAllSelected ? "Deselect" : "Select all"}
	</Button>
}