import { Dialog as HeadlessDialog } from "@headlessui/react"
import React from "react";

// eslint-disable-next-line
const { motion, AnimatePresence } = require("framer-motion");

export type DialogProps = {
	open: boolean;
	onClose(): void;
	title?: string;
	description?: string;
	children?: React.ReactNode;
}

export const Dialog = Object.assign(function Dialog(props: DialogProps) {

	return <AnimatePresence>
		{
			props.open && (
				<HeadlessDialog static open={props.open} onClose={props.onClose}>
					<motion.div
						className="fixed z-10 inset-0 flex flex-col items-center justify-end d:justify-center p-3 backdrop-blur-sm bg-black-bg bg-opacity-50"
						transition={{ duration: 0.12 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<HeadlessDialog.Panel
							as={motion.div}
							initial={{ y: 100 }}
							animate={{ y: 0 }}
							exit={{ y: 100 }}
							className="relative bg-white-bg-2 dark:bg-black-bg-2 border border-white-bg-3 dark:border-black-bg-3 text-black dark:text-black rounded-xl d:rounded-lg shadow-lg p-4 w-full d:w-auto"
						>

							{
								props.title && <HeadlessDialog.Title className="font-medium text-black dark:text-white">
									{props.title}
								</HeadlessDialog.Title>
							}

							{
								props.description && <HeadlessDialog.Description className="text-sm text-black-4 dark:text-white-4 py-4">
									{props.description}
								</HeadlessDialog.Description>
							}

							{props.children}

						</HeadlessDialog.Panel>
					</motion.div>
				</HeadlessDialog>
			)
		}
	</AnimatePresence>
}, {
});