"use client"

import React from "react";
import { Meta } from '@/features/Meta/Meta'
import { Provider as RadixTooltipProvider } from '@radix-ui/react-tooltip';
import { GlobalModalManager } from "@/features/GlobalModalManager/GlobalModalManager";
import { Notifications } from "@/features/Notifications/Notifications";

export default async function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<Meta.Document />
				<Meta.App />
			</head>
			<body className="text-black dark:text-white">
				<RadixTooltipProvider>
					<Notifications>
						<GlobalModalManager />
						{props.children}
					</Notifications>
				</RadixTooltipProvider>
			</body>
		</html>
	)
}