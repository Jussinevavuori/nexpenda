import { DesktopView } from "@/components/DesktopView/DesktopView";
import { MobileView } from "@/components/MobileView/MobileView";
import { IntervalSelector } from "@/features/Interval/IntervalSelector";
import { AppLayout } from "@/layouts/app/AppLayout";

export default function DashboardPage() {


	return <AppLayout active="dashboard">
		<DesktopView>
			<div className="flex flex-col h-screen">
				<AppLayout.Header>
					<div className="flex flex-col gap-4 pt-8">
						<div className="flex items-center gap-4 px-10 pb-4">
							{/* <TransactionCreateButton /> */}
							{/* <TransactionSearchInput /> */}
						</div>

						<div className="flex px-10 gap-4 flex-wrap justify-between">
							{/* <TransactionSummary className="flex-col" /> */}
							<IntervalSelector variant="button" />
						</div>

						<div className="h-12">
							{/* <TransactionTable.Header /> */}
						</div>
					</div>
				</AppLayout.Header>
				<div className="flex-1">
					{/* <TransactionTable.Body /> */}
				</div>
			</div>
		</DesktopView>

		<MobileView>
			<div className="flex flex-col h-screenMinusTabs">
				<AppLayout.Header>
					<div className="px-6 py-4 flex flex-col items-stretch gap-4">

						<div className="flex gap-4">
							{/* <TransactionSearchInput /> */}
							<IntervalSelector variant="button" intervalLenghtOnly />
						</div>q

						{/* <TransactionSummary hideChips className="flex-row justify-between items-center" /> */}
						<IntervalSelector variant="carousel" />
					</div>
				</AppLayout.Header>
				{/* <TransactionList.Body /> */}
			</div>
		</MobileView>
	</AppLayout>
}