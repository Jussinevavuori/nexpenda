import { useUploadDataFile } from '../hooks/useUploadDataFile';
import { UploadDataState } from '../hooks/useUploadDataState';
import { UploadDataFilePreview } from './UploadDataFilePreview';
import { Button } from '@/components/Button/Button';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { useProgressBarValue } from '@/components/ProgressBar/useProgressBarValue';

export interface UploadDataFileCommitterProps {
	state: UploadDataState;
	file: ReturnType<typeof useUploadDataFile>;
	onReset(): void;
}

export function UploadDataFileCommitter(props: UploadDataFileCommitterProps) {

	const rows = props.file.selectedSheet?.rows ?? []

	const progress = useProgressBarValue("transactions_file_upload");

	return <div className="flex flex-col items-stretch gap-4">

		<p className="dark:text-slate-100">
			Preview the uploaded file. If your data seems to have been
			uploaded correctly, you can upload your data to Nexpenda.
		</p>

		<UploadDataFilePreview
			spreadsheetTitle={props.state.file?.name}
			rows={rows}
			selectedSheet={props.file.selectedSheet?.sheetName ?? ""}
			sheets={props.file.sheetNames}
			onSheetSelect={props.file.setSelectedSheet}
			pagesize={5}
		/>

		<div className="flex gap-4 w-full items-center justify-between m:flex-col m:items-stretch">
			<Button
				variant="bordered"
				color="monochrome"
				onClick={props.onReset}
				startIcon="refresh"
			>
				Upload another file
			</Button>

			<Button
				color="primary"
				onClick={props.file.handleUploadTransactions}
				startIcon="publish"
				disabled={rows.length === 0}
				loading={props.state.state === "uploading"}
			>
				{`Upload transactions (${rows.length})`}
			</Button>

		</div>

		{
			progress.target > 0 &&
			<ProgressBar progress="transactions_file_upload" />
		}
	</div>

}