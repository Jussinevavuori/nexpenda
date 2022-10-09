import React from "react";
import { Popover as HeadlessPopover } from "@headlessui/react"

const { motion, AnimatePresence }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export type PopoverProps = {
	button?: React.ReactNode;
	children?: ((renderProps: { open: boolean, close(): void }) => React.ReactNode);
}

export function Popover(props: PopoverProps) {

	return <AnimatePresence>
		<HeadlessPopover className="relative">
			{({ open, close }) => (<>
				<HeadlessPopover.Button as="div">
					{props.button}
				</HeadlessPopover.Button>
				{
					open && <HeadlessPopover.Panel
						className="z-10 absolute right-0 max-w-sm lg:max-w-2xl transform mt-2 min-w-full bg-white dark:bg-black-bg-2 border border-white-bg-3 dark:border-black-bg-3 text-black dark:text-white rounded-xl d:rounded-lg shadow-lg"
						static
						as={motion.div}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{props.children?.({ open, close })}
					</HeadlessPopover.Panel>
				}
			</>)}
		</HeadlessPopover>
	</AnimatePresence>

}