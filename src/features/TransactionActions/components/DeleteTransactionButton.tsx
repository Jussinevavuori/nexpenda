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


	if (props.icon) {
		return <IconButton
			variant="bordered"
			disabled={selectedTransactions.length === 0}
			onClick={() => deleteMutation.mutate({ ids: selectedIds })}
			color="danger"
			loading={deleteMutation.isLoading}
		>
			<Icon.Material icon="delete" />
		</IconButton>
	}

	return <Button
		disabled={selectedTransactions.length === 0}
		onClick={() => deleteMutation.mutate({ ids: selectedIds })}
		startIcon={<Icon.Material icon="delete" />}
		variant="bordered"
		color="danger"
		loading={deleteMutation.isLoading}
	>
		Delete
	</Button>
}