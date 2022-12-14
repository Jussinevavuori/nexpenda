import { NexpendaLogo } from "@/components/NexpendaLogo/NexpendaLogo";
import { c } from "@/utils/generic/classnames";
import { pages } from "@/utils/pages";
import Link from "next/link";

const { motion }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export interface SidebarLogoProps {
	isSidebarOpen?: boolean;
}

export function SidebarLogo(props: SidebarLogoProps) {
	return <Link href={pages.home}>
		<div className="px-[2.25rem] pt-8 pb-12">
			<motion.div className="flex items-center h-10" initial={false} animate={{ transform: `translateX(${props.isSidebarOpen ? 0 : 4}px)` }}>
				<NexpendaLogo.Icon size={28} />
				<span className={c("absolute left-[2.75rem] m:opacity-0", c.if(!props.isSidebarOpen)("opacity-0"))}>
					<NexpendaLogo.Type size="xl" />
				</span>
			</motion.div>
		</div>
	</Link>
}