import { AlertDialog } from '@/components/AlertDialog/AlertDialog';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { trpc } from '@/utils/trpc';
import { useSelectedTransactions } from '../../../stores/transactionSelectionStore';

export type DeleteTransactionButtonProps = {
	transactions: TransactionItem[];
	icon?: boolean;
}

export function DeleteTransactionButton(props: DeleteTransactionButtonProps) {
	const selectedTransactions = useSelectedTransactions(props.transactions);
	const selectedIds = selectedTransactions.map(_ => _.id);

	const utils = trpc.useContext();
	const deleteMutation = trpc.useMutation("transactions.deleteMany", {
		onSettled() {
			utils.invalidateQueries(["transactions.list"])
		}
	})

	return <AlertDialog
		title="Confirm deletion"
		description={`Are you sure you want to delete ${selectedIds.length} transactions?`}
		confirmLabel="Delete"
		cancelLabel="Cancel"
		variant="danger"
		onConfirm={() => deleteMutation.mutate({ ids: selectedIds })}
	>
		{
			props.icon
				? <IconButton
					variant="bordered"
					disabled={selectedTransactions.length === 0}
					color="danger"
					loading={deleteMutation.isLoading}
				>
					<Icon.Material icon="delete" />
				</IconButton>
				: <Button
					disabled={selectedTransactions.length === 0}
					startIcon={<Icon.Material size={20} icon="delete" />}
					variant="bordered"
					color="danger"
					loading={deleteMutation.isLoading}
				>
					Delete
				</Button>
		}
	</AlertDialog>
}