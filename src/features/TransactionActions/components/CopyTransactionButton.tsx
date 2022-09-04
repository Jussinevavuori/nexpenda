import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { useTransactionSelectionStore } from "../../../stores/transactionSelectionStore";

export type CopyTransactionButtonProps = {
	transactions: TransactionItem[];
}

export function CopyTransactionButton(props: CopyTransactionButtonProps) {
	// Get selected transaction
	const selection = useTransactionSelectionStore(_ => _.selection);
	const transaction = selection.size === 1
		? props.transactions.find(_ => selection.has(_.id))
		: undefined


	return <Button
		disabled={!transaction}
		// onClick={() => {
		// createDialogState.open();
		// copy.copy(selection.selectedTransactions[0]);
		// }}
		startIcon={<Icon.Material icon="content_copy" />}
		variant="bordered"
	>
		Copy
	</Button>
}