import React from "react";
const { motion, AnimatePresence } = require("framer-motion");

export interface SidebarGroupProps {
	isSidebarOpen?: boolean;
	children?: React.ReactNode;
	label?: string;
	className?: string;
}

export function SidebarGroup(props: SidebarGroupProps) {
	return <div className={props.className}>
		{
			props.label &&
			<div className="py-6 h-6 flex items-center">
				<span className="inline-block ml-9 w-8 h-px bg-slate-300 dark:bg-slate-700" />
				<AnimatePresence>
					{
						props.isSidebarOpen &&
						<motion.span
							className="absolute left-20 text-sm font-semibold text-slate-500"
							exit={{ opacity: 0 }}
						>
							{props.label}
						</motion.span>
					}
				</AnimatePresence>
			</div>
		}

		<ul className="px-6 flex flex-col gap-1">
			{props.children}
		</ul>
	</div>

}