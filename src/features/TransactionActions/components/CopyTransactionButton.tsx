import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useTransactionSelectionStore } from "../../../stores/transactionSelectionStore";

export type CopyTransactionButtonProps = {
	transactions: TransactionItem[];
	icon?: boolean;
}

export function CopyTransactionButton(props: CopyTransactionButtonProps) {
	// Get selected transaction
	const selection = useTransactionSelectionStore(_ => _.selection);
	const transaction = selection.size === 1
		? props.transactions.find(_ => selection.has(_.id))
		: undefined

	if (props.icon) {
		return <IconButton
			variant="bordered"
			disabled={!transaction}
		>
			<Icon.Material icon="content_copy" />
		</IconButton>
	}

	return <Button
		disabled={!transaction}
		// onClick={() => {
		// createDialogState.open();
		// copy.copy(selection.selectedTransactions[0]);
		// }}
		startIcon={<Icon.Material size={20} icon="content_copy" />}
		variant="bordered"
	>
		Copy
	</Button>
}