import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useGlobalModal } from "@/stores/globalModalAtom";
import { transactionCopyAtom } from "@/stores/transactionCopyAtom";
import { useAtom } from "jotai";
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

	const { 1: setCopy } = useAtom(transactionCopyAtom)
	const { open } = useGlobalModal("createTransaction");

	const handleCopy = () => {
		if (transaction) {
			setCopy(transaction);
			open({})
		}
	}

	return <>
		{
			props.icon
				? <IconButton
					variant="bordered"
					disabled={!transaction}
					onClick={handleCopy}
				>
					<Icon.Material icon="content_copy" />
				</IconButton>
				: <Button
					disabled={!transaction}
					onClick={handleCopy}
					startIcon={<Icon.Material size={20} icon="content_copy" />}
					variant="bordered"
				>
					Copy
				</Button>
		}
	</>
}