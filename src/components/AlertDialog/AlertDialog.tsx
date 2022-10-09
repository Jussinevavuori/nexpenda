import * as RadixAlertDialog from "@radix-ui/react-alert-dialog"
import React from "react"
import { Button } from "../Button/Button";

const { motion }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export type AlertDialogProps = {
	children: React.ReactNode;
	variant?: "default" | "danger";
	title: string;
	description: string;
	cancelLabel: string;
	confirmLabel: string;
	onConfirm(): void;
}

export function AlertDialog(props: AlertDialogProps) {

	return <RadixAlertDialog.Root>
		<RadixAlertDialog.Trigger children={props.children} asChild />
		<RadixAlertDialog.Portal>
			<RadixAlertDialog.Overlay asChild>
				<motion.div
					className="fixed inset-0 z-[200] backdrop-blur-sm bg-black-bg/50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.1 }}
				/>
			</RadixAlertDialog.Overlay>
			<div className="fixed inset-0 z-[210]">
				<RadixAlertDialog.Content asChild>
					<motion.div
						className="fixed inset-0"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.1 }}
					>
						<div className="absolute left-1/2 -translate-x-1/2 d:top-1/2 d:-translate-y-1/2 m:bottom-8 bg-white-bg dark:bg-black-bg rounded-lg shadow-lg p-4 max-w-sm w-full">
							<RadixAlertDialog.Title className="font-medium text-black dark:text-white">
								{props.title}
							</RadixAlertDialog.Title>
							<RadixAlertDialog.Description className="text-sm text-black-3 dark:text-white-3 py-4">
								{props.description}
							</RadixAlertDialog.Description>
							<div className="flex items-center gap-2 justify-end">
								<RadixAlertDialog.Cancel asChild>
									<Button variant="text" color="monochrome">
										{props.cancelLabel}
									</Button>
								</RadixAlertDialog.Cancel>
								<RadixAlertDialog.Action asChild>
									<Button onClick={() => props.onConfirm()} color={(props.variant ?? "default") === "default" ? "primary" : "danger"}>
										{props.confirmLabel}
									</Button>
								</RadixAlertDialog.Action>
							</div>
						</div>
					</motion.div>
				</RadixAlertDialog.Content>
			</div>
		</RadixAlertDialog.Portal >
	</RadixAlertDialog.Root >
}