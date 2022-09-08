import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useTransactionSelectionStore } from "../../../stores/transactionSelectionStore";

export interface EditTransactionButtonProps {
	transactions: TransactionItem[];
	icon?: boolean;
}

export function EditTransactionButton(props: EditTransactionButtonProps) {

	// Get selected transaction
	const selection = useTransactionSelectionStore(_ => _.selection);
	const transaction = selection.size === 1
		? props.transactions.find(_ => selection.has(_.id))
		: undefined

	// const state = useTransactionEditFormDialogState();



	if (props.icon) {
		return <IconButton
			variant="bordered"
			disabled={!transaction}
		>
			<Icon.Material icon="edit" />
		</IconButton>
	}

	return <Button
		disabled={!transaction}
		// onClick={() => transaction ? state.setValue(transaction.id) : null}
		startIcon={<Icon.Material size={20} icon="edit" />}
		{...props}
	>
		Edit
	</Button>

}