import React from "react";
import { SiteLayoutHeader } from "./components/SiteLayoutHeader";

export type SiteLayoutProps = {
	children?: React.ReactNode;
	headerLinks?: Record<string, string>;
}

export const SiteLayout = Object.assign(function SiteLayout(props: SiteLayoutProps) {
	return <div className="bg-white-bg dark:bg-black-bg min-h-screen">
		<SiteLayoutHeader links={props.headerLinks} />

		<main className="px-6">
			{props.children}
		</main>
	</div>
}, {
	Header: SiteLayoutHeader
});