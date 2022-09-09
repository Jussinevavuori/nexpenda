import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useGlobalModal } from "@/stores/globalModalAtom";
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

	const { open } = useGlobalModal("editTransaction");
	const handleOpen = () => {
		if (transaction) {
			open({ id: transaction.id })
		}
	}

	if (props.icon) {
		return <IconButton
			variant="bordered"
			disabled={!transaction}
			onClick={handleOpen}
		>
			<Icon.Material icon="edit" />
		</IconButton>
	}

	return <Button
		onClick={handleOpen}
		disabled={!transaction}
		startIcon={<Icon.Material size={20} icon="edit" />}
		{...props}
	>
		Edit
	</Button>

}