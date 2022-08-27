import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { useRedirectWithTimeout } from "@/hooks/useRedirectWithTimeout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { pages } from "@/utils/pages";


export default function SignoutPage() {
	const secondsToRedirect = useRedirectWithTimeout(pages.auth.login, 3);

	return <AuthLayout>

		<div className="flex flex-col gap-4 pb-8">
			<h1 className="text-4xl font-bold text-black dark:text-white">
				Goodbye!
			</h1>
			<p className="text-xl text-black-secondary dark:text-white-secondary">
				You've logged out.
			</p>
		</div>

		<div className="flex items-center gap-4">
			<LoadingSpinner variant="puff" />
			<p className="text-black-secondary text-sm">
				You will be redirected in {secondsToRedirect}...
			</p>
		</div>

	</AuthLayout>
}