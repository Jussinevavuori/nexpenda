import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { useQueryParam } from "@/hooks/useSearchParam";
import { AuthLayout } from "@/layouts/auth/AuthLayout";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";


export default function LoginPage() {
	const authError = useQueryParam("error");	// Provided by next auth
	const session = useSession();

	const { data: user } = trpc.useQuery(["user.me"], {
		enabled: session.status === "authenticated"
	})

	return <AuthLayout>

		<div className="flex flex-col gap-4 pb-8">
			<h1 className="text-4xl font-bold text-black dark:text-white">
				Welcome!
			</h1>
			<p className="text-xl text-black-secondary dark:text-white-secondary">
				Let's get you signed in
			</p>
		</div>

		{
			authError &&
			<div className="flex gap-4 my-4 bg-danger-100 border border-danger-outline rounded-lg p-4">
				<Icon.Feather icon="alertCircle" className="text-danger" />
				<div>
					<p className="font-semibold text-danger">That wasn't supposed to happen...</p>
					{JSON.stringify(authError)}
				</div>
			</div>
		}

		{
			session.status === "loading" && <div className="flex flex-col gap-8 py-8">
				<LoadingSpinner variant="puff" />
			</div>
		}

		{

			session.status === "authenticated" && <div className="flex flex-col gap-4 py-8">
				<div className="flex gap-4 items-center pb-4">
					<Avatar image={user?.image} name={user?.name} size={64} />
					<div>
						<p className="text-sm text-black-secondary dark:text-white-secondary">Already signed in as</p>
						<p className="">{user?.name}</p>
					</div>
				</div>

				<Button.Link
					href={pages.dashboard}
					color="primary"
				>
					Continue as {user?.name}
				</Button.Link>
				<Button

					onClick={() => signOut()}
					color="monochrome"
					variant="bordered"
				>
					Sign out
				</Button>
			</div>
		}


		{
			session.status === "unauthenticated" && <div className="flex flex-col gap-8 py-8">
				<Button
					onClick={() => signIn("google", { callbackUrl: pages.dashboard })}
					color="monochrome"
					variant="bordered"
					startIcon={<Icon.Simple icon="google" />}
				>
					Login with Google
				</Button>
			</div>
		}

	</AuthLayout>
}