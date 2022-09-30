import { Button } from "@/components/Button/Button";
import { PageHead } from "@/components/PageHead/PageHead";
import { useTimeSinceMount } from "@/hooks/useTimeSinceMount";
import { SiteLayout } from "@/layouts/SiteLayout/SiteLayout";
import { pages } from "@/utils/pages";

export default function NotFoundPage() {
	const time = useTimeSinceMount(500);

	return <SiteLayout>
		<PageHead title="It's broken..." />

		<div className="h-32" />

		<section id="home" className="max-w-4xl mx-auto">
			<div className="flex flex-col gap-16">
				<div className="flex flex-col items-center gap-6">
					<h1 className="text-4xl font-bold">Oops, looks like we broke something...</h1>
					<span className="text-2xl font-medium">❌ 500</span>
					<p>
						{(() => {
							if (time < 4_000) return "Try again."
							if (time < 8_000) return "And again."
							if (time < 12_000) return "And if it still doesn't work..."
							if (time < 16_000) return "... just keep in mind ..."
							return "I'm not being paid to do this ❤️"
						})()}
					</p>
				</div>

				<Button.Link href={pages.home} color="monochrome" className="!py-4 text-lg">
					This way back to safety, please ❤️
				</Button.Link>
			</div>
		</section>
	</SiteLayout>
}