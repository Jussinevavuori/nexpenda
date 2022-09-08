import { Button } from "@/components/Button/Button";
import { NexpendaLogo } from "@/components/NexpendaLogo/NexpendaLogo";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIsPageScrolled } from "@/hooks/useIsPageScrolled";
import { c } from "@/utils/generic/classnames";
import { pages } from "@/utils/pages";
import Link from "next/link";

export type SiteLayoutHeaderProps = {
	links?: Record<string, string>;
}

export function SiteLayoutHeader(props: SiteLayoutHeaderProps) {
	const isLargeScreen = useBreakpoint("sm");
	const isPageScrolled = useIsPageScrolled(20);

	return <header className={c("sticky top-0 transition-all", c.if(isPageScrolled)("border-b border-b-divider bg-white/50 backdrop-blur-md"))}>

		<div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 py-4 px-6 sm:px-16">

			<div className="flex items-center justify-start gap-4">
				<NexpendaLogo.Icon />
				{isLargeScreen && <NexpendaLogo.Type />}
			</div>

			{
				isLargeScreen &&
				<div className="flex items-center justify-center gap-4">
					{
						Object.entries(props.links ?? {}).map(([title, href]) => (
							<Link key={href} href={href}>{title}</Link>
						))
					}
				</div>
			}

			<div className="flex items-center justify-end gap-4">
				<Button.Link href={pages.login} color="monochrome" variant="text">
					Login
				</Button.Link>
				<Button.Link href={pages.login} color="monochrome">
					Get started
				</Button.Link>
			</div>

		</div >

	</header >
}