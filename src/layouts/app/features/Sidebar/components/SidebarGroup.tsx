import React from "react";

const { motion, AnimatePresence }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

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
				<span className="inline-block ml-9 w-8 h-px bg-divider-strong" />
				<AnimatePresence>
					{
						props.isSidebarOpen &&
						<motion.span

							className="absolute left-20 text-sm text-slate-500"
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