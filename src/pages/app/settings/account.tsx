import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { IconButton } from "@/components/IconButton/IconButton";
import { Input } from "@/components/Input/Input";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useNotify } from "@/stores/notificationStore";
import { PictureChanger } from "@/features/PictureChanger/PictureChanger";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SettingsLayout } from "@/layouts/settings/SettingsLayout";
import { capitalize } from "@/utils/generic/capitalize";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { PageHead } from "@/components/PageHead/PageHead";

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
			if (vars.image === null) notify.success("Image removed");
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

	// Change picture
	const [pictureChangerIsOpen, setPictureChangerIsOpen] = useState(false);

	if (!user) return null;

	return <AppLayout active="settings">
		<PageHead title="Account Settings" />

		<SettingsLayout title="Account settings">

			<PictureChanger.Dialog
				open={pictureChangerIsOpen}
				onClose={() => setPictureChangerIsOpen(false)}
			/>

			<section className="flex flex-col gap-4">
				<p className="text-sm text-black-secondary dark:text-white-secondary">
					Your profile
				</p>


				<div className="flex py-4 items-center gap-4">
					<Avatar
						image={user.image}
						name={user.name}
						size={96}
					/>
					<div className="space-y-2">
						<Button variant="default" onClick={() => setPictureChangerIsOpen(true)}>
							Change picture
						</Button>
						<AlertDialog
							title="Remove picture"
							description="Are you sure you want to remove your profile picture?"
							cancelLabel="Cancel"
							confirmLabel="Confirm"
							onConfirm={() => updateUserMutation.mutate({ image: null })}
							variant="danger"
						>
							<Button disabled={!user.image} variant="ghost" color="danger">
								Remove picture
							</Button>
						</AlertDialog>
					</div>
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
							? <IconButton variant="text" color="success" inputAdornment="end" startLabel="Verified">
								<Icon.Material icon="check" />
							</IconButton>
							: <IconButton variant="text" color="warning" inputAdornment="end" startLabel="Unverified">
								<Icon.Material icon="warning" />
							</IconButton>
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
						endIcon={<Tooltip value="Request password change email">
							<IconButton variant="text" color="primary" inputAdornment="end" startLabel="Change">
								<Icon.Material icon="lock_reset" />
							</IconButton>
						</Tooltip>}
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
					user.accounts.map(account => <div key={account.provider} className="flex gap-4 items-center">
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
