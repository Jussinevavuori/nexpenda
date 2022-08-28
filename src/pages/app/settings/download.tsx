import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { useNotify } from "@/features/Notifications/hooks/useNotify";
import { createTransactionSpreadsheet } from "@/features/Spreadsheet/utils/TransactionSpreadsheet";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";
import { trpc } from "@/utils/trpc";
import { useCallback, useState } from "react";

export default function AccountSettingsPage() {
	const notify = useNotify();
	const [isLoading, setIsLoading] = useState(false);

	const transactions = trpc.useQuery(["transactions.list", {}])
	const handleDownload = useCallback(async () => {
		setIsLoading(true);

		const spreadsheet = createTransactionSpreadsheet();
		await spreadsheet.loadTransactions(transactions.data ?? []);
		await spreadsheet.downloadFile();

		setIsLoading(false);

		notify.success("File downloaded");
	}, [setIsLoading, notify, transactions]);

	return <AppLayout active="settings">
		<SettingsLayout title="Download transactions">
			<section className="flex flex-col gap-4">
				<p className="text-sm text-black-secondary dark:text-white-secondary">
					Download transactions
				</p>
				<Button
					disabled={transactions.isLoading}
					endIcon={<Icon.Material icon="file_download" />}
					onClick={handleDownload}
					loading={isLoading}
				>
					Download
				</Button>

				<p>
					All of your
					<span className="font-semibold"> {transactions.data?.length ?? "..."} </span>
					transactions will be downloaded in a .xlsx spreadsheet file.
				</p>

			</section>
		</SettingsLayout>
	</AppLayout>
}