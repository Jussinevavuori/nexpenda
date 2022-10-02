import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import { NexpendaLogo } from "@/components/NexpendaLogo/NexpendaLogo";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIsPageScrolled } from "@/hooks/useIsPageScrolled";
import { c } from "@/utils/generic/classnames";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";

export type SiteLayoutHeaderProps = {
}

export function SiteLayoutHeader(props: SiteLayoutHeaderProps) {
	const isLargeScreen = useBreakpoint("sm");
	const isPageScrolled = useIsPageScrolled(20);

	const { data: user } = trpc.useQuery(["user.me"])

	return <header className={c("sticky top-0 transition-all", c.if(isPageScrolled)("border-b border-b-divider bg-white/50 backdrop-blur-md"))}>

		<div className="mx-auto max-w-6xl flex gap-4 py-4 px-6 sm:px-16">

			<div className="flex items-center justify-start gap-4">
				<NexpendaLogo.Icon />
				{isLargeScreen && <NexpendaLogo.Type />}
			</div>

			<div className="flex items-center justify-end gap-4 flex-1">
				{
					user ? (<>
						<Button.Link href={pages.dashboard}>
							Continue as {user.name?.split(/\s/)[0]}
						</Button.Link>
						<Avatar name={user.name} image={user.image} />
					</>) : (<>
						<Button.Link href={pages.login} color="monochrome" variant="text">
							Login
						</Button.Link>
						<Button.Link href={pages.login} color="monochrome">
							Get started
						</Button.Link>
					</>)
				}
			</div>

		</div >

	</header >
}