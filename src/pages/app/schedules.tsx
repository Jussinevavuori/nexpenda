import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { PageHead } from "@/components/PageHead/PageHead";
import { ScheduleItem } from "@/features/ScheduleItem/ScheduleItem";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";
import { trpc } from "@/utils/trpc";

export default function SchedulesPage() {
	useRequireAuth();

	const { data: schedules } = trpc.useQuery(["schedules.list"]);

	return <AppLayout active="schedules">
		<PageHead title="Schedules" />

		<AppLayoutHeader>
			<div className="px-6 d:px-10 py-4 d:py-8 flex flex-col gap-4">
				<div className="flex justify-between items-start">
					<h1 className="text-2xl font-bold">
						Schedules
					</h1>
				</div>
			</div>
		</AppLayoutHeader>

		{
			!schedules ? (
				<div className="flex flex-col gap-4 items-center justify-center">
					<LoadingSpinner />
					<p>Loading schedules...</p>
				</div>
			) : schedules.length === 0 ? (
				<div className="px-6 d:px-10 py-10 flex flex-col items-center gap-6 [&_b]:text-primary [&_b]:font-medium mx-auto max-w-xl text-center">
					<div className="flex flex-col gap-4 items-center">
						<Icon.Material icon="search" size={48} className="text-black-4 dark:text-white-4" />
						<p className="text-xl text-black-3 dark:text-white-4">
							You don't have any schedules.
						</p>
					</div>
					<Divider />
					<p>
						Here you can view all your <b>transaction schedules</b>.
						They allow you to schedule regular and repeating transactions, such
						as <b>rent</b> or {""}
						<b>subscriptions</b>.
					</p>
					<p>
						<b>Create your first schedule</b> by creating a new transaction,
						pressing the
						<div className="border rounded border-r-divider-strong inline-block mx-2 p-1">
							<Icon.Material icon="unfold_more" size={12} />
						</div>
						button and specifying how often your transaction will repeat.
					</p>
					<p>
						<b>After creating your schedule</b>, new transactions will <b>automatically
							be created</b>.
					</p>
				</div>
			) : (
				<div className="px-6 d:px-10 py-10 flex flex-col max-w-2xl mx-auto">
					{
						schedules.map((s, i, arr) => (<div key={s.id}>
							<ScheduleItem schedule={s} />
							{i < arr.length - 1 && <Divider className="my-10" />}
						</div>))
					}
				</div>
			)
		}

	</AppLayout>

}