import { AlertDialog } from '@/components/AlertDialog/AlertDialog';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { useOnKeyCombination } from '@/hooks/useOnKeyCombination';
import { trpc } from '@/utils/trpc';
import { useRef } from 'react';
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


	const ref = useRef<HTMLButtonElement>(null);
	useOnKeyCombination({ key: "delete" }, () => ref.current?.click());

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
					ref={ref}
				>
					<Icon.Material icon="delete" />
				</IconButton>
				: <Button
					disabled={selectedTransactions.length === 0}
					startIcon={<Icon.Material size={20} icon="delete" />}
					variant="bordered"
					color="danger"
					loading={deleteMutation.isLoading}
					ref={ref}
				>
					Delete
				</Button>
		}
	</AlertDialog>
}