import { NexpendaLogo } from "@/components/NexpendaLogo/NexpendaLogo";
import { c } from "@/utils/generic/classnames";

// eslint-disable-next-line
const { motion } = require("framer-motion");

export interface SidebarLogoProps {
	isSidebarOpen?: boolean;
}

export function SidebarLogo(props: SidebarLogoProps) {
	return <div className="px-[2.25rem] pt-8 pb-12">
		<motion.div className="flex items-center" initial={false} animate={{ transform: `translateX(${props.isSidebarOpen ? 0 : 4}px)` }}>
			<NexpendaLogo.Icon size={28} />
			<span className={c("absolute left-[2.75rem] m:opacity-0", c.if(!props.isSidebarOpen)("opacity-0"))}>
				<NexpendaLogo.Type size="xl" />
			</span>
		</motion.div>
	</div>

}