import { Dialog } from "@/components/Dialog/Dialog";
import { useGlobalModal } from "@/stores/globalModalAtom";
import { getSign } from "@/utils/generic/getSign";
import { parseAmountStringWithSign } from "@/utils/transaction/parseAmountStringWithSign";
import { trpc } from "@/utils/trpc";
import { lightFormat } from "date-fns";
import { TransactionForm } from "./TransactionForm";

export function EditTransactionFormModal() {

	const { isOpen, state, close } = useGlobalModal("editTransaction");

	// Fetch initial values
	const { data } = trpc.useQuery(["transactions.get", { id: state?.id ?? "" }], {
		enabled: !!state
	})

	// Mutations
	const utils = trpc.useContext();
	const editMutation = trpc.useMutation(["transactions.update"], {
		onSettled: () => {
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
		<Dialog
			open={isOpen}
			onClose={close}
			title="Edit Transaction"
		>
			<TransactionForm
				key={data?.id} // Force remount when data ID changes
				initialValues={data ? {
					amount: Math.abs(data.amount / 100).toFixed(2),
					sign: getSign(data.amount),
					category: data.category.name,
					comment: data.comment,
					date: lightFormat(data.time, "yyyy-MM-dd"),
				} : undefined}
				disableScheduleForm
				onSubmit={async (values) => {
					close();
					if (data) {
						// Update edit mutation
						const result = await editMutation.mutateAsync({
							id: data.id,
							amount: parseAmountStringWithSign(values.amount, values.sign),
							category: values.category,
							comment: values.comment,
							time: new Date(values.date),
						})

						// Update category icon
						if (values.icon) {
							iconMutation.mutate({
								categoryId: result.category.id,
								icon: values.icon,
							})
						}
					}
				}}
			/>
		</Dialog>
	)
}