import { Button } from "@/components/Button/Button";
import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { pages } from "@/utils/pages";

export default function WhatNextPage() {
	useRequireAuth();

	return <div className="bg-white-bg dark:bg-black-bg min-h-screen">
		<PageHead title="What next?" />

		<div className="flex flex-col items-center gap-8 py-32 px-6 max-w-4xl mx-auto">
			<span className="text-4xl">
				👋🏻
			</span>
			<h1 className="text-4xl font-bold mb-8">
				What's next?
			</h1>

			<div>
				Actually for now, nothing so...
			</div>
			<Button.Link href={pages.dashboard}>
				Just go to the app
			</Button.Link>
		</div>

	</div>
}