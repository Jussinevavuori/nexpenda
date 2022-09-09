import { CreateTransactionFormModal } from "../TransactionForm/CreateTransactionFormModal";
import { EditTransactionFormModal } from "../TransactionForm/EditTransactionFormModal";

export function GlobalModalManager() {
	return (
		<>
			<CreateTransactionFormModal />
			<EditTransactionFormModal />
		</>
	)
}