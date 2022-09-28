import { CopyTransactionButton } from "./components/CopyTransactionButton";
import { CreateTransactionButton } from "./components/CreateTransactionButton";
import { DeleteTransactionButton } from "./components/DeleteTransactionButton";
import { EditTransactionButton } from "./components/EditTransactionButton";
import { SelectAllTransactionsButton } from "./components/SelectAllTransactionsButton";

export const TransactionActions = {
	Edit: EditTransactionButton,
	Copy: CopyTransactionButton,
	Delete: DeleteTransactionButton,
	SelectAll: SelectAllTransactionsButton,
	Create: CreateTransactionButton,
}