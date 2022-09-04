import { CopyTransactionButton } from "./components/CopyTransactionButton";
import { CreateTransactionButton } from "./components/CreateTransactionButton";
import { DeleteTransactionButton } from "./components/DeleteTransactionButton";
import { EditTransactionButton } from "./components/EditTransactionButton";

export const TransactionActions = {
	Edit: EditTransactionButton,
	Copy: CopyTransactionButton,
	Delete: DeleteTransactionButton,
	Create: CreateTransactionButton,
}