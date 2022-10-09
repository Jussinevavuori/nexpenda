import { Button } from "@/components/Button/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { PageHead } from "@/components/PageHead/PageHead";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useTimeSinceMount } from "@/hooks/useTimeSinceMount";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useMutation } from "react-query";

const messages = [
	"Setting you up...",
	"Doing things...",
	"Juuust a minute",
	"Shouldn't be much more...",
	"We're almost there...",
	"Just hang on!",
	"Not much longer",
	"Aaalmost...",
]

export default function WelcomePage() {
	useRequireAuth();

	const time = useTimeSinceMount();
	const message = messages[Math.min(messages.length - 1, Math.floor(time / 2500))]

	const [isMigrated, setIsMigrated] = useState(false);

	const userdataMutation = trpc.useMutation("migrations.migrate.userdata")
	const cleardataMutation = trpc.useMutation("migrations.migrate.cleardata")
	const getOldDataMutation = trpc.useMutation("migrations.migrate.getOldData")
	const pushCategoriesMutation = trpc.useMutation("migrations.migrate.pushCategories")
	const pushSchedulesMutation = trpc.useMutation("migrations.migrate.pushSchedules")
	const pushTransactionsMutation = trpc.useMutation("migrations.migrate.pushTransactions")
	const migrationMutation = useMutation(async () => {
		if (window.location.href.includes("localhost")) {
			console.log("Clearing data")
			await cleardataMutation.mutateAsync({});
		}
		const user = await userdataMutation.mutateAsync({});
		const data = await getOldDataMutation.mutateAsync({ oldUserId: user.id })
		await pushCategoriesMutation.mutateAsync({ categories: data.oldCategories })
		await pushSchedulesMutation.mutateAsync({ schedules: data.oldSchedules })
		await pushTransactionsMutation.mutateAsync({ transactions: data.oldTransactions })
	}, {
		onSettled() {
			setIsMigrated(true);
		}
	})
	useEffectOnce(() => migrationMutation.mutate());

	return <div className="bg-white-bg dark:bg-black-bg min-h-screen">
		<PageHead title="Welcome" />

		<div className="flex flex-col items-center gap-8 py-32 px-6 max-w-4xl mx-auto">
			<span className="text-4xl">
				👋🏻
			</span>
			<h1 className="text-4xl font-bold mb-8">
				Welcome!
			</h1>

			<h2 className="text-2xl font-medium">
				We've changed some things around here!
			</h2>
			<p>
				But first - let's you get set up with the new Nexpenda!
			</p>
			<p>
				Please, do not exit this page.
			</p>


			{
				isMigrated ? <Button.Link href={pages.onboarding.whatnext}>
					Continue
				</Button.Link> : <>
					<LoadingSpinner color="primary-500" />
					<div>{message}</div>
				</>
			}
		</div>

	</div>
}