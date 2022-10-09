import { Button } from "@/components/Button/Button";
import { PageHead } from "@/components/PageHead/PageHead";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { ProgressBarPubSub } from "@/components/ProgressBar/utils/ProgressBarPubSub";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useTimeSinceMount } from "@/hooks/useTimeSinceMount";
import { chunkify } from "@/utils/generic/chunkify";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useMutation } from "react-query";

export default function WelcomePage() {
	useRequireAuth();

	const time = useTimeSinceMount();

	const [message, setMessage] = useState("Setting you up...");
	const [isMigrated, setIsMigrated] = useState(false);

	const userdataMutation = trpc.useMutation("migrations.migrate.userdata", {
		onMutate: () => setMessage("Fetching your user data...")
	})
	const cleardataMutation = trpc.useMutation("migrations.migrate.cleardata", {
		onMutate: () => setMessage("Clearing your current data...")
	})
	const getOldDataMutation = trpc.useMutation("migrations.migrate.getOldData", {
		onMutate: () => setMessage("Fetching your old data...")
	})
	const pushCategoriesMutation = trpc.useMutation("migrations.migrate.pushCategories", {
		onMutate: () => setMessage("Updating your categories...")
	})
	const pushSchedulesMutation = trpc.useMutation("migrations.migrate.pushSchedules", {
		onMutate: () => setMessage("Updating your transaction schedules...")
	})
	const pushTransactionsMutation = trpc.useMutation("migrations.migrate.pushTransactions", {
		onMutate: () => setMessage("Updating your transactions...")
	})
	const migrationMutation = useMutation(async () => {
		if (window.location.href.includes("localhost")) await cleardataMutation.mutateAsync({});
		const user = await userdataMutation.mutateAsync({});
		ProgressBarPubSub.publish({ key: "welcome", value: 1, target: 6 })
		const data = await getOldDataMutation.mutateAsync({ oldUserId: user.id })
		ProgressBarPubSub.publish({ key: "welcome", value: 2, target: 6 })

		const ctChunks = chunkify(data.oldCategories, 50);
		const scChunks = chunkify(data.oldSchedules, 50);
		const txChunks = chunkify(data.oldTransactions, 50);

		const itemsToPost = data.oldCategories.length + data.oldSchedules.length + data.oldTransactions.length;
		let itemsPosted = 0;

		const update = (items: number) => {
			itemsPosted += items;
			ProgressBarPubSub.publish({
				key: "welcome",
				value: itemsPosted + itemsToPost,
				target: 3 * itemsToPost,
			})
		}

		for (const chunk of ctChunks) {
			await pushCategoriesMutation.mutateAsync({ categories: chunk });
			update(chunk.length);
		}

		for (const chunk of scChunks) {
			await pushSchedulesMutation.mutateAsync({ schedules: chunk });
			update(chunk.length);
		}

		for (const chunk of txChunks) {
			await pushTransactionsMutation.mutateAsync({ transactions: chunk });
			update(chunk.length);
		}
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

function useProgressBarValue(arg0: string) {
	throw new Error("Function not implemented.");
}
