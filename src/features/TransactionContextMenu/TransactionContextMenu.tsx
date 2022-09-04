import { ContextMenu } from "@/components/ContextMenu/ContextMenu";
import { Icon } from "@/components/Icon/Icon";
import { getCategoryLabel } from "@/utils/category/getCategoryLabel";
import { formatMoney } from "@/utils/currency/formatMoney";
import { formatDateString } from "@/utils/dates/formatDateString";
import { c } from "@/utils/generic/classnames";
import { useTransactionSelectionStore } from "../../stores/transactionSelectionStore";

export interface TransactionContextMenuProps {
	children?: React.ReactNode;
	transaction: TransactionItem;
}

export function TransactionContextMenu({ transaction, ...props }: TransactionContextMenuProps) {
	// const { selection, search, copy } = useTransactionContext();
	// const editDialogState = useTransactionEditFormDialogState();
	// const createDialogState = useTransactionCreateFormDialogState();
	// const deleteMutation = useDeleteTransactionsMutation();

	const selection = useTransactionSelectionStore(_ => _.selection);
	const isSelected = selection.has(transaction.id);

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
						// onSelect={() => { editDialogState.setValue(transaction.id) }}
						textValue="edit"
					>
						Edit
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="content_copy" />}
						keyCombination={{ key: "c", shift: true }}
						// onSelect={() => { createDialogState.open(); copy.copy(transaction) }}
						textValue="copy"
					>
						Copy
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="delete" className="text-danger" />}
						keyCombination={{ key: "delete" }}
						// onSelect={() => { deleteMutation.mutate(transaction) }}
						textValue="delete"
					>
						Delete
					</ContextMenu.Item>
				</ContextMenu.Group>

				<ContextMenu.Separator />

				<ContextMenu.Group>
					<ContextMenu.Item
					// startIcon={<Icon.Material icon={isSelected />}? "check_box" : "check_box_outline_blank"}
					// onSelect={(e) => { selection.select(transaction, { ctrl: true, shift: false }) }}
					// textValue={isSelected ? "deselect" : "select"}
					>
						{isSelected ? "Deselect" : "Select"}
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="select_all" />}
						keyCombination={{ key: "a", shift: true }}
						// onSelect={() => { if (!selection.areAllCurrentlySelected) selection.toggleSelectAll() }}
						textValue={"select all"}
					>
						{"Select all"}
					</ContextMenu.Item>
					<ContextMenu.Item
						startIcon={<Icon.Material icon="deselect" />}
						keyCombination={{ key: "d", shift: true }}
						// onSelect={() => { selection.clearSelection() }}
						textValue={"deselect all"}
					>
						{"Deselect all"}
					</ContextMenu.Item>
				</ContextMenu.Group>

				<ContextMenu.Separator />

				<ContextMenu.Sub>
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
				</ContextMenu.Sub>
			</ContextMenu.Content >
		</ContextMenu.Portal>
	</ContextMenu >

}