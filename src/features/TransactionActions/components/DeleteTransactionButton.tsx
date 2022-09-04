import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import { trpc } from '@/utils/trpc';
import { useSelectedTransactions } from '../../../stores/transactionSelectionStore';

export type DeleteTransactionButtonProps = {
	transactions: TransactionItem[];
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

	return <Button
		disabled={selectedTransactions.length === 0}
		onClick={() => deleteMutation.mutate({ ids: selectedIds })}
		startIcon={<Icon.Material icon="delete" />}
		variant="bordered"
		color="danger"
		loading={deleteMutation.isLoading}
		{...props}
	>
		Delete
	</Button>
}