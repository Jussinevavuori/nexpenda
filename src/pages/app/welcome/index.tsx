import { Button } from "@/components/Button/Button";
import { PageHead } from "@/components/PageHead/PageHead";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { ProgressBarPubSub } from "@/components/ProgressBar/utils/ProgressBarPubSub";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { chunkify } from "@/utils/generic/chunkify";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useMutation } from "react-query";

export default function WelcomePage() {
	useRequireAuth();

	const [message, setMessage] = useState("Setting you up...");
	const [isMigrated, setIsMigrated] = useState(false);

	const userdataMutation = trpc.useMutation("migrations.migrate.userdata")
	const cleardataMutation = trpc.useMutation("migrations.migrate.cleardata")
	const getOldDataMutation = trpc.useMutation("migrations.migrate.getOldData")
	const pushCategoriesMutation = trpc.useMutation("migrations.migrate.pushCategories")
	const pushSchedulesMutation = trpc.useMutation("migrations.migrate.pushSchedules")
	const pushTransactionsMutation = trpc.useMutation("migrations.migrate.pushTransactions")

	const migrationMutation = useMutation(async () => {
		if (window.location.href.includes("localhost")) {
			setMessage("Clearing your old data...")
			await cleardataMutation.mutateAsync({});
		}

		setMessage("Looking up previous data...")
		const user = await userdataMutation.mutateAsync({});
		ProgressBarPubSub.publish({ key: "welcome", value: 1, target: 5 })

		setMessage("Listing all things to be copied...")
		const data = await getOldDataMutation.mutateAsync({ oldUserId: user.id })
		ProgressBarPubSub.publish({ key: "welcome", value: 2, target: 5 })

		const ctChunks = chunkify(data.oldCategories, 50);
		const scChunks = chunkify(data.oldSchedules, 50);
		const txChunks = chunkify(data.oldTransactions, 50);

		setMessage(`Copying ${data.oldCategories.length} categories`)
		await Promise.allSettled(ctChunks.map(categories => pushCategoriesMutation.mutateAsync({ categories })))
		ProgressBarPubSub.publish({ key: "welcome", value: 3, target: 5 })

		setMessage(`Copying ${data.oldSchedules.length} transaction schedules`)
		await Promise.allSettled(scChunks.map(schedules => pushSchedulesMutation.mutateAsync({ schedules })))
		ProgressBarPubSub.publish({ key: "welcome", value: 4, target: 5 })

		setMessage(`Copying ${data.oldTransactions.length} transactions`)
		await Promise.allSettled(txChunks.map(transactions => pushTransactionsMutation.mutateAsync({ transactions })))
		ProgressBarPubSub.publish({ key: "welcome", value: 5, target: 5 })

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
					<ProgressBar progress="welcome" />
					<div>{message}</div>
				</>
			}
		</div>

	</div>
}
