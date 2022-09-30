import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useOnKeyCombination } from "@/hooks/useOnKeyCombination";
import { useGlobalModal } from "@/stores/globalModalAtom";
import { useRef } from "react";
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

	const ref = useRef<HTMLButtonElement>(null);
	useOnKeyCombination({ key: "e", shift: true }, () => ref.current?.click());

	if (props.icon) {
		return <IconButton
			variant="bordered"
			disabled={!transaction}
			onClick={handleOpen}
			ref={ref}
		>
			<Icon.Material icon="edit" />
		</IconButton>
	}

	return <Button
		onClick={handleOpen}
		disabled={!transaction}
		startIcon={<Icon.Material size={20} icon="edit" />}
		ref={ref}
		{...props}
	>
		Edit
	</Button>

}