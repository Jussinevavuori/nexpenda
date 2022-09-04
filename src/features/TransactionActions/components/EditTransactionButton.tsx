import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { useTransactionSelectionStore } from "../../../stores/transactionSelectionStore";

export interface EditTransactionButtonProps {
	transactions: TransactionItem[]
}

export function EditTransactionButton(props: EditTransactionButtonProps) {

	// Get selected transaction
	const selection = useTransactionSelectionStore(_ => _.selection);
	const transaction = selection.size === 1
		? props.transactions.find(_ => selection.has(_.id))
		: undefined

	// const state = useTransactionEditFormDialogState();

	return <Button
		disabled={!transaction}
		// onClick={() => transaction ? state.setValue(transaction.id) : null}
		startIcon={<Icon.Material icon="edit" />}
		{...props}
	>
		Edit
	</Button>

}