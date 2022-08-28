import { HoverOverlay } from '@/components/HoverOverlay/HoverOverlay';
import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { useArrayPagination } from '@/hooks/useArrayPagination';
import { c } from '@/utils/generic/classnames';
import { format } from 'date-fns';
import { SpreadsheetTransactionBody } from '../utils/TransactionSpreadsheet';

export interface UploadDataFilePreviewProps {
	spreadsheetTitle?: string;
	sheets: string[];
	selectedSheet: string;
	onSheetSelect?(sheetName: string): void;
	rows: SpreadsheetTransactionBody[];
	pagesize?: number;
}

export function UploadDataFilePreview(props: UploadDataFilePreviewProps) {
	const pagination = useArrayPagination(props.rows, props.pagesize ? Math.round(props.pagesize) : 5);

	return <div>


		<div className="flex flex-row items-center justify-between overflow-hidden flex-nowrap">
			<ul className="flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden">
				{
					props.sheets.map((sheet) => {
						const isSelected = sheet === props.selectedSheet;

						return <li
							key={sheet}
							className={c(
								"group relative cursor-pointer w-fit rounded-t px-3 py-1 text-sm",
								isSelected
									? "bg-primary-500 text-slate-100 dark:text-slate-900"
									: "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
							)}
							onClick={() => props.onSheetSelect?.(sheet)}
						>
							{sheet}
							<HoverOverlay />
						</li>
					})
				}
			</ul>

			{
				props.spreadsheetTitle &&
				<li className="pl-3 py-1 flex items-center gap-2 text-xs dark:text-slate-100">
					<Icon.Simple icon={"microsoft excel"} />
					{props.spreadsheetTitle}
				</li>
			}
		</div>

		<div className="grid grid-cols-4 overflow-x-auto border border-slate-300 dark:border-slate-700">
			<HeaderCell>Date</HeaderCell>
			<HeaderCell>Amount</HeaderCell>
			<HeaderCell>Category</HeaderCell>
			<HeaderCell>Comment</HeaderCell>

			{
				(pagination.page).map((row) => (<>
					<Cell>{format(new Date(row.time), "d.M.yyyy")}</Cell>
					<Cell>{(row.integerAmount / 100).toFixed(2)}</Cell>
					<Cell>{row.category}</Cell>
					<Cell>{row.comment ?? ""}</Cell>
				</>))
			}
		</div>

		{
			(props.rows.length === 0) && <div className="text-center px-3 py-1 border border-slate-300 dark:border-slate-700 dark:text-slate-100">
				{
					props.sheets.length === 0
						? "Could not read file"
						: props.sheets.length === 1
							? "No transactions were found in the file"
							: "No transactions were found on the current sheet"
				}
			</div>
		}

		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<IconButton variant="text" onClick={pagination.goToFirstPage} disabled={pagination.isFirstPage}>
					<Icon.Material className="text-slate-900 dark:text-slate-100" icon="keyboard_double_arrow_left" />
				</IconButton>
				<IconButton variant="text" onClick={pagination.goToPrevPage} disabled={pagination.isFirstPage}>
					<Icon.Material className="text-slate-900 dark:text-slate-100" icon="keyboard_arrow_left" />
				</IconButton>
			</div>
			<p className="text-xs text-slate-700 dark:text-slate-300">
				{pagination.currentPage} / {pagination.maxPage}
			</p>
			<div className="flex items-center gap-2">
				<IconButton variant="text" onClick={pagination.goToNextPage} disabled={pagination.isLastPage}>
					<Icon.Material className="text-slate-900 dark:text-slate-100" icon="keyboard_arrow_right" />
				</IconButton>
				<IconButton variant="text" onClick={pagination.goToLastPage} disabled={pagination.isLastPage}>
					<Icon.Material className="text-slate-900 dark:text-slate-100" icon="keyboard_double_arrow_right" />
				</IconButton>
			</div>
		</div>

	</div>
}

const HeaderCell = (props: { children: string }) => <div
	className="px-3 py-1 border border-slate-300 dark:border-slate-700 dark:text-slate-100 font-semibold"
>
	{props.children}
</div>

const Cell = (props: { children: string }) => <div
	className="truncate text-ellipsis px-3 py-1 border border-slate-300 dark:border-slate-700 dark:text-slate-100"
>
	{props.children}
</div>
