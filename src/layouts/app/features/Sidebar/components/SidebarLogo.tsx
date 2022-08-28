import { NexpendaLogo } from "@/components/NexpendaLogo/NexpendaLogo";
import { c } from "@/utils/generic/classnames";

const { motion } = require("framer-motion");

export interface SidebarLogoProps {
	isSidebarOpen?: boolean;
}

export function SidebarLogo(props: SidebarLogoProps) {
	return <div className="px-10 pt-12 pb-4">
		<motion.div className="flex" initial={false} animate={{ transform: `translateX(${props.isSidebarOpen ? 0 : 4}px)` }}>
			<NexpendaLogo.Icon />
			<span className={c("absolute left-12 m:opacity-0", c.if(!props.isSidebarOpen)("opacity-0"))}>
				<NexpendaLogo.Type />
			</span>
		</motion.div>
	</div>

}