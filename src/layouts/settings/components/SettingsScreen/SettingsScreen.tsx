import { Avatar } from "@/components/Avatar/Avatar"
import { Divider } from "@/components/Divider/Divider"
import { Icon } from "@/components/Icon/Icon"
import { pages } from "@/utils/pages"
import { trpc } from "@/utils/trpc"
import { SettingsButton } from "../SettingsButton/SettingsButton"

export type SettingsScreenProps = {

}

export function SettingsScreen(props: SettingsScreenProps) {

	const { data: user } = trpc.useQuery(["user.me"])

	return <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">

		<section className="flex flex-col items-stretch gap-4">
			<p className="text-sm font-semibold text-slate-500">
				Account
			</p>
			<div className="flex flex-col items-stretch gap-1">
				<div className="w-full flex flex-col items-center xl:flex-row gap-4 xl:gap-6 mx-auto px-4 py-6 bg-slate-100 dark:bg-slate-780 rounded">
					<Avatar size={84} image={user?.image} name={user?.name} />
					<div className="flex flex-col items-center xl:items-start">
						<p className="dark:text-slate-100">
							{user?.name}
						</p>
						<p className="text-slate-600 dark:text-slate-400">
							{user?.email}
						</p>
					</div>
				</div>

				<SettingsButton
					href={pages.settings.account}
					icon={<Icon.Material icon="account_circle" />}
				>
					Account
				</SettingsButton>
			</div>
		</section>

		<Divider />

		<section className="flex flex-col items-stretch gap-4">
			<p className="text-sm font-semibold text-slate-500">
				Preferences
			</p>
			<div className="flex flex-col items-stretch gap-1">
				<SettingsButton
					href={pages.settings.appearance}
					icon={<Icon.Material icon="brush" />}
				>
					Appearance
				</SettingsButton>
				<SettingsButton
					href={pages.settings.preferences}
					icon={<Icon.Material icon="settings" />}
				>
					Preferences
				</SettingsButton>
			</div>
		</section>

		<Divider />

		<section className="flex flex-col items-stretch gap-4">
			<p className="text-sm font-semibold text-slate-500">
				Options
			</p>
			<div className="flex flex-col items-stretch gap-1">
				<SettingsButton
					href={pages.settings.download}
					icon={<Icon.Material icon="file_download" />}
				>
					Download data
				</SettingsButton>
				<SettingsButton
					href={pages.settings.upload}
					icon={<Icon.Material icon="file_upload" />}
				>
					Upload data
				</SettingsButton>
				<SettingsButton
					href={pages.settings.feedback}
					icon={<Icon.Material icon="rate_review" />}
				>
					Feedback
				</SettingsButton>
			</div>
		</section>

		<Divider />

		{
			user?.role === "USER" && <>

				<section className="flex flex-col items-stretch gap-4">
					<p className="text-sm font-semibold text-slate-500">
						Admin
					</p>
					<div className="flex flex-col items-stretch gap-1">
						<SettingsButton
							href={pages.admin.users}
							icon={<Icon.Material icon="admin_panel_settings" />}
						>
							Admin: Users
						</SettingsButton>
						<SettingsButton
							href={pages.admin.feedback}
							icon={<Icon.Material icon="admin_panel_settings" />}
						>
							Admin: Feedback
						</SettingsButton>
					</div>
				</section>
				<Divider />
			</>
		}

		<section className="flex flex-col items-stretch gap-4">
			<p className="text-sm font-semibold text-slate-500">
				Other
			</p>
			<div className="flex flex-col items-stretch gap-1">
				<SettingsButton
					href={pages.home}
					icon={<Icon.Material icon="file_download" />}
					indicator={<Icon.Material icon="link" />}
				>
					Home
				</SettingsButton>
			</div>
		</section>

	</div >
}