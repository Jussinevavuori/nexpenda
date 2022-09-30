import { ContextMenu } from "@/components/ContextMenu/ContextMenu";
import { Icon } from "@/components/Icon/Icon";
import { useGlobalModal } from "@/stores/globalModalAtom";
import { usePeriodStore } from "@/stores/periodStore";
import { transactionCopyAtom } from "@/stores/transactionCopyAtom";
import { useActiveQuery } from "@/stores/transactionSearchAtom";
import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import { useTransactionSelectionStore } from "../../stores/transactionSelectionStore";

export interface TransactionContextMenuProps {
	children?: React.ReactNode;
	transaction: TransactionItem;
}

export function TransactionContextMenu({ transaction, ...props }: TransactionContextMenuProps) {
	const period = usePeriodStore(_ => _.period)
	const query = useActiveQuery();
	const { data: transactions } = trpc.useQuery(["transactions.list", query ? { query } : { period }])

	const selectOne = useTransactionSelectionStore(_ => _.select);
	const selectMany = useTransactionSelectionStore(_ => _.selectMany);
	const clearSelection = useTransactionSelectionStore(_ => _.clear);
	const selection = useTransactionSelectionStore(_ => _.selection);
	const isSelected = selection.has(transaction.id);
	const utils = trpc.useContext();
	const deleteMutation = trpc.useMutation("transactions.delete", {
		onSettled() {
			utils.invalidateQueries(["transactions.list"])
		}
	})
	const editModal = useGlobalModal("editTransaction");
	const createModal = useGlobalModal("createTransaction")
	const { 1: setCopy } = useAtom(transactionCopyAtom)

	const handleEdit = () => {
		editModal.open({ id: transaction.id });
	}

	const handleCopy = () => {
		setCopy(transaction)
		createModal.open({});
	}

	const handleDelete = () => {
		deleteMutation.mutate({ id: transaction.id })
	}

	const handleSelect = () => {
		selectOne(transaction.id, true)
	}

	const handleSelectAll = () => {
		if (transactions) selectMany(transactions.map(_ => _.id))
	}

	const handleDeselect = () => {
		clearSelection();
	}

	return <ContextMenu>
		<ContextMenu.Trigger>
			{props.children}
		</ContextMenu.Trigger>
		<ContextMenu.Portal>
			<ContextMenu.Content>
				<ContextMenu.Group>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="edit" />}
						keyCombination={{ key: "e", shift: true }}
						onSelect={handleEdit}
						textValue="edit"
					>
						Edit
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="content_copy" />}
						keyCombination={{ key: "c", shift: true }}
						onSelect={handleCopy}
						textValue="copy"
					>
						Copy
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="delete" className="text-danger" />}
						keyCombination={{ key: "delete" }}
						onSelect={handleDelete}
						textValue="delete"
					>
						Delete
					</ContextMenu.Item>
				</ContextMenu.Group>

				<ContextMenu.Separator />

				<ContextMenu.Group>
					<ContextMenu.Item
						startIcon={<Icon.Material icon={isSelected ? "check_box" : "check_box_outline_blank"} />}
						onSelect={handleSelect}
						textValue={isSelected ? "deselect" : "select"}
					>
						{isSelected ? "Deselect" : "Select"}
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="select_all" />}
						keyCombination={{ key: "a", shift: true }}
						onSelect={handleSelectAll}
						textValue={"select all"}
					>
						{"Select all"}
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="deselect" />}
						keyCombination={{ key: "d", shift: true }}
						onSelect={handleDeselect}
						textValue={"deselect all"}
					>
						{"Deselect all"}
					</ContextMenu.Item>
				</ContextMenu.Group>

				<ContextMenu.Separator />

				{/* <ContextMenu.Sub>
					<ContextMenu.Group>
						<ContextMenu.SubTrigger
							startIcon={<Icon.Material icon="search" />}
							textValue={`Search similar`}
							endIcon="chevron_right"
						>
							Search similar
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent>
								<ContextMenu.Group>
									<ContextMenu.Item
										startIcon={<Icon.Material icon="category" />}
										// onSelect={() => search.updateFilter({ addItems: transaction.category })}
										textValue="Same category"
										endIcon={<span className="text-slate-500 text-xs">
											{getCategoryLabel(transaction.category, transaction.amount)}
										</span>}
									>
										Same category
									</ContextMenu.Item>
									<ContextMenu.Item
										startIcon={<Icon.Material icon="event" />}
										// onSelect={() => search.updateFilter({ addItems: new DateComparison("=", transaction.date) })}
										textValue="Same date"
										endIcon={<span className="text-slate-500 text-xs">
											{formatDateString(transaction.time)}
										</span>}
									>
										Same date
									</ContextMenu.Item>
									<ContextMenu.Item
										startIcon={<Icon.Material icon="comment" />}
										// onSelect={() => search.updateFilter({ query: transaction.comment })}
										textValue="Same comment"
										endIcon={<span className="text-slate-500 text-xs">
											{transaction.comment}
										</span>}
									>
										Same comment
									</ContextMenu.Item>
									<ContextMenu.Item
										startIcon={<Icon.Material icon="attach_money" />}
										// onSelect={() => search.updateFilter({ addItems: new MoneyAmountComparison("=", transaction.amount) })}
										textValue="Same amount"
										endIcon={<span className={c(`text-xs`, transaction.amount > 0 ? "text-emerald-500" : "text-rose-500")}>
											{formatMoney(transaction.amount)}
										</span>}
									>
										Same amount
									</ContextMenu.Item>
								</ContextMenu.Group>
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Group>
				</ContextMenu.Sub> */}
			</ContextMenu.Content >
		</ContextMenu.Portal>
	</ContextMenu >

}