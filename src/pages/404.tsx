import { Button } from "@/components/Button/Button";
import { PageHead } from "@/components/PageHead/PageHead";
import { useClientSideMemo } from "@/hooks/useClientSideMemo";
import { AppLayout } from "@/layouts/app/AppLayout";
import { SiteLayout } from "@/layouts/SiteLayout/SiteLayout";
import { pages } from "@/utils/pages";
import { useRouter } from "next/router";

export default function NotFoundPage() {
	const router = useRouter();
	const path = useClientSideMemo(() => router.asPath, [router.asPath]);

	const content = <div className="flex flex-col items-center gap-6">
		<h1 className="text-4xl font-bold">Looks like you're lost</h1>
		<span className="text-2xl font-medium">🔎 404</span>
		<p>
			We couldn't find anything for you at{" "}
			<span className="font-mono">{path}</span>
		</p>
	</div>

	if (path?.startsWith("/app")) {
		return <AppLayout>
			<PageHead title="Not Found" />
			<div className="flex flex-col gap-16 max-w-4xl mx-auto py-32">
				{content}
			</div>
		</AppLayout>
	}

	return <SiteLayout>
		<PageHead title="Not Found" />

		<div className="h-32" />

		<section id="home" className="max-w-4xl mx-auto">
			<div className="flex flex-col gap-16">
				{content}
				<Button.Link href={pages.home} color="monochrome" className="!py-4 text-lg">
					This way back to safety, please ❤️
				</Button.Link>
			</div>
		</section>
	</SiteLayout>
}