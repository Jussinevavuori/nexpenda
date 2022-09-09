import { Dialog } from "@/components/Dialog/Dialog";
import { useGlobalModal } from "@/stores/globalModalAtom";
import { parseAmountStringWithSign } from "@/utils/transaction/parseAmountStringWithSign";
import { trpc } from "@/utils/trpc";
import { TransactionForm } from "./TransactionForm";

export function CreateTransactionFormModal() {
	const { isOpen, close } = useGlobalModal("createTransaction");

	// Mutations
	const utils = trpc.useContext();
	const createMutation = trpc.useMutation(["transactions.create"], {
		onSettled: () => {
			utils.invalidateQueries(["transactions.list"])
			utils.invalidateQueries(["transactions.get"])
		}
	});
	const scheduleMutation = trpc.useMutation(["schedules.create"], {
		onSettled: () => {
			utils.invalidateQueries(["schedules.list"])
			utils.invalidateQueries(["transactions.list"])
			utils.invalidateQueries(["transactions.get"])
		}
	});
	const iconMutation = trpc.useMutation(["categories.updateIcon"], {
		onSettled: () => {
			utils.invalidateQueries(["transactions.list"])
			utils.invalidateQueries(["transactions.get"])
		}
	});

	return (
		<Dialog open={isOpen} onClose={close} title="New transaction">
			<TransactionForm
				onSubmit={async (values) => {
					close();
					// Update edit mutation
					const result = await createMutation.mutateAsync({
						amount: parseAmountStringWithSign(values.amount, values.sign),
						category: values.category,
						comment: values.comment,
						time: new Date(values.date),
					})

					// Add schedule
					if (values.scheduleEnabled) {
						scheduleMutation.mutateAsync({
							amount: result.amount,
							category: result.category.name,
							comment: result.comment,
							firstOccurrence: new Date(values.date),
							every: values.scheduleEvery,
							intervals: values.scheduleType,
							occurrences: values.scheduleOccurrences,
							assignTransactions: [result.id]
						})
					}

					// Update category icon
					if (values.icon) {
						iconMutation.mutate({
							categoryId: result.category.id,
							icon: values.icon,
						})
					}
				}}
			/>
		</Dialog>
	)
}