import { SubThemeProvider } from "@/features/Theme/components/SubTheme";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react";

export type DialogProps = {
	open: boolean;
	onClose(): void;
	title?: string;
	description?: string;
	children?: React.ReactNode;
}

export const Dialog = Object.assign(function Dialog(props: DialogProps) {

	return <Transition
		appear
		show={props.open}
		as={Fragment}
	>
		<HeadlessDialog
			open={props.open}
			onClose={props.onClose}
		>
			<SubThemeProvider>
				<div className={"fixed inset-0 flex flex-col items-center justify-end d:justify-center p-4 backdrop-blur-sm bg-black bg-opacity-50"}>
					<HeadlessDialog.Panel className="bg-white dark:bg-slate-740 text-black dark:text-white rounded-t-lg d:rounded-lg shadow-lg p-4">

						{
							props.title && <HeadlessDialog.Title className="font-medium text-black dark:text-white">
								{props.title}
							</HeadlessDialog.Title>
						}

						{
							props.description && <HeadlessDialog.Description className="text-sm text-black-secondary dark:text-white-secondary py-4">
								{props.description}
							</HeadlessDialog.Description>
						}

						{props.children}

					</HeadlessDialog.Panel>
				</div>
			</SubThemeProvider>
		</HeadlessDialog>
	</Transition>
}, {
});