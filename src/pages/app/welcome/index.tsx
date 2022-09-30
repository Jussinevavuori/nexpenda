import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { PageHead } from "@/components/PageHead/PageHead";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useTimeSinceMount } from "@/hooks/useTimeSinceMount";
import { useNotify } from "@/stores/notificationStore";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
	const message = messages[Math.min(messages.length - 1, Math.floor(time / 1500))]
	const router = useRouter();
	const notify = useNotify();

	const migrationMutation = trpc.useMutation("migrations.migrate", {
		onSuccess() {
			router.push(pages.onboarding.whatnext);
		},
		onError(err) {
			notify.error("Something went wrong while transferring your data!")
			console.error(err)
			router.push(pages.onboarding.whatnext);
		}
	})
	useEffectOnce(() => migrationMutation.mutate({}));

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

			<LoadingSpinner color="primary-500" />

			<div>
				{message}
			</div>
		</div>

	</div>
}