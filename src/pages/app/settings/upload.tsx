import { useUploadDataState } from "@/features/Spreadsheet/hooks/useUploadDataState";
import { useUploadDataFile } from "@/features/Spreadsheet/hooks/useUploadDataFile";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";
import { UploadDataFileCommitter } from "@/features/Spreadsheet/components/UploadDataFileCommitter";
import { UploadDataFileUploader } from "@/features/Spreadsheet/components/UploadDataFileUploader";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { PageHead } from "@/components/PageHead/PageHead";

export default function UploadSettingsPage() {
	useRequireAuth();

	const state = useUploadDataState();
	const file = useUploadDataFile(state, () => { });


	return <AppLayout active="settings">
		<PageHead title="Upload Transactions" />

		<SettingsLayout title="Upload transactions">
			{
				state.state.file
					? <UploadDataFileCommitter
						state={state.state}
						file={file}
						onReset={state.reset}
					/>
					: <UploadDataFileUploader
						state={state.state}
						file={file}
					/>
			}
		</SettingsLayout>
	</AppLayout>
}