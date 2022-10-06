import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { useOnKeyCombination } from "@/hooks/useOnKeyCombination";
import { useGlobalModal } from "@/stores/globalModalAtom";
import { transactionCopyAtom } from "@/stores/transactionCopyAtom";
import { useAtom } from "jotai";
import { useRef } from "react";
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

	const ref = useRef<HTMLButtonElement>(null);
	useOnKeyCombination({ key: "c", shift: true }, () => ref.current?.click());

	return <>
		{
			props.icon
				? <IconButton
					variant="bordered"
					disabled={!transaction}
					onClick={handleCopy}
					ref={ref}
				>
					<Icon.Material icon="content_copy" />
				</IconButton>
				: <Button
					disabled={!transaction}
					onClick={handleCopy}
					startIcon={<Icon.Material size={20} icon="content_copy" />}
					variant="bordered"
					ref={ref}
				>
					Copy
				</Button>
		}
	</>
}