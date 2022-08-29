import { Icon } from '@/components/Icon/Icon';
import { UploadFileButton } from '@/components/UploadFileButton/UploadFileButton';
import { useUploadDataFile } from '../hooks/useUploadDataFile';
import { UploadDataState } from '../hooks/useUploadDataState';
import { UploadDataFileExample } from './UploadDataFileExample';

export interface UploadDataFileUploaderProps {
	state: UploadDataState;
	file: ReturnType<typeof useUploadDataFile>;
}

export function UploadDataFileUploader(props: UploadDataFileUploaderProps) {

	return <div className="flex flex-col items-stretch gap-4">

		<p className="text-sm text-black-secondary dark:text-white-secondary">
			Upload a spreadsheet file. Ensure the spreadsheet contains data that matches the following format.
		</p>

		<UploadDataFileExample />

		<UploadFileButton
			color="primary"
			startIcon={<Icon.Material icon="file_upload" />}
			onChange={props.file.handleFileUpload as any}
		>
			Upload file
		</UploadFileButton>

		<div className="flex gap-2 items-center w-full">
			<Icon.Material icon="help" className="text-primary" />
			<p className="font-semibold text-sm dark:text-slate-300 text-slate-700 flex-1">
				What should the file look like?
			</p>
		</div>

		<ul className="list-disc pl-6">
			<li className="text-sm text-slate-700 dark:text-slate-300">
				The column names should be on the first row, in any column.
			</li>
			<li className="text-sm text-slate-700 dark:text-slate-300">
				The sheet may also contain other columns.
			</li>
			<li className="text-sm text-slate-700 dark:text-slate-300">
				The case of the column titles does not matter.
			</li>
			<li className="text-sm text-slate-700 dark:text-slate-300">
				The data should be on some sheet in the spreadsheet and the spreadsheet
				may contain other sheets.
			</li>
		</ul>
	</div>

}