import { SubThemeProvider } from "@/features/Theme/components/SubTheme";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog"
import React from "react"
import { Button } from "../Button/Button";

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
			<SubThemeProvider>
				<RadixAlertDialog.Overlay
					className="fixed inset-0 z-[200]"
				/>
				<div
					className="fixed inset-0 z-[210]"
				>
					<RadixAlertDialog.Content
						className="absolute-centered bg-white-bg dark:bg-black-bg rounded-lg shadow-lg p-4 max-w-sm w-full"
					>
						<RadixAlertDialog.Title
							className="font-medium text-black dark:text-white"
						>
							{props.title}
						</RadixAlertDialog.Title>
						<RadixAlertDialog.Description
							className="text-sm text-black-3 dark:text-white-3 py-4"
						>
							{props.description}
						</RadixAlertDialog.Description>
						<div className="flex items-center gap-2 justify-end">
							<RadixAlertDialog.Cancel>
								<Button variant="text" color="monochrome">
									{props.cancelLabel}
								</Button>
							</RadixAlertDialog.Cancel>
							<RadixAlertDialog.Action onClick={() => props.onConfirm()}>
								<Button color={props.variant === "default" ? "primary" : "danger"}>
									{props.confirmLabel}
								</Button>
							</RadixAlertDialog.Action>
						</div>
					</RadixAlertDialog.Content>
				</div>
			</SubThemeProvider>
		</RadixAlertDialog.Portal>
	</RadixAlertDialog.Root>
}