import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { Input } from "@/components/Input/Input";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useNotify } from "@/features/Notifications/hooks/useNotify";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";
import { capitalize } from "@/utils/generic/capitalize";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function AccountSettingsPage() {
	useRequireAuth();

	const notify = useNotify();
	const utils = trpc.useContext();

	const { data: user } = trpc.useQuery(["user.me"], {
		onSuccess(data) {
			if (data.name) setName(data.name);
		}
	});

	const updateUserMutation = trpc.useMutation("user.update", {
		onSuccess(_, vars) {
			if (vars.name) notify.success("Name updated");
			utils.invalidateQueries("user.me");
		}
	})

	// Edit name
	const [name, setName] = useState(user?.name ?? "");
	const handleSubmitName = () => {
		if (name === user?.name) return;
		if (name.trim()) updateUserMutation.mutate({ name })
		else setName(user?.name ?? "");
	}

	if (!user) return null;

	return <AppLayout active="settings">
		<SettingsLayout title="Active settings">

			<section className="flex flex-col gap-4">
				<p className="text-sm text-black-secondary dark:text-white-secondary">
					Your profile
				</p>


				<div className="flex flex-col items-center gap-1">
					<Avatar image={user.image} name={user.name} size={80} />
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="name" className="text-sm text-black-disabled dark:text-white-disabled">
						Username
					</label>
					<Input
						id="name"
						fullWidth
						disabled={updateUserMutation.isLoading}
						value={name}
						onChange={e => setName(e.target.value)}
						onBlur={handleSubmitName}
						variant="bordered"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm text-black-disabled dark:text-white-disabled">
						Email address
					</label>
					<Input
						fullWidth
						readOnly
						disabled={updateUserMutation.isLoading}
						value={user.email ?? "No email"}
						endIcon={user.email ? user.emailVerified
							? <Icon.Material icon="check" className="text-success" />
							: <Tooltip value="Email address is unverified">
								<Icon.Material icon="warning" className="text-warning" />
							</Tooltip>
							: undefined
						}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm text-black-disabled dark:text-white-disabled">
						Password
					</label>
					<Input
						fullWidth
						readOnly
						value={"No password"}
						endIcon={<IconButton variant="text" color="primary">
							<p className="-mr-2 text-sm">
								Change
							</p>
							<Icon.Material icon="lock_reset" />
						</IconButton>}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<p className="text-sm text-black-disabled dark:text-white-disabled">
						Joined {user.createdAt.toLocaleDateString()}
					</p>
				</div>

			</section>

			<Divider />

			<section className="flex flex-col gap-4">

				<p className="text-sm text-black-secondary dark:text-white-secondary">
					Connected accounts
				</p>

				{
					user.accounts.length === 0 && <p className="text-sm text-black-disabled dark:text-white-disabled">
						No connected accounts
					</p>
				}

				{
					user.accounts.map(account => <div className="flex gap-4 items-center">
						<Icon.Simple icon={account.provider} />
						<div>
							<p>
								{capitalize(account.provider)}
							</p>
							<p className="text-sm text-black-disabled dark:text-white-disabled">
								Created {account.createdAt.toLocaleDateString()}
							</p>
						</div>
					</div>)
				}

			</section>

			<Divider />

			<section className="flex flex-col gap-4">
				<Button
					variant="ghost"
					color="danger"
					onClick={() => signOut({ callbackUrl: pages.signout })}
				>
					Log out
				</Button>
			</section>

		</SettingsLayout>
	</AppLayout >
}
