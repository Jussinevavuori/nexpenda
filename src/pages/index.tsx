import { PageHead } from "@/components/PageHead/PageHead";
import { NexpendaExampleUI } from "@/features/Marketing/NexpendaExampleUI";
import { SiteLayout } from "@/layouts/SiteLayout/SiteLayout";

export default function HomePage() {
	return <SiteLayout>
		<PageHead title="Home" />

		<div className="h-32" />

		<section id="home" className="max-w-4xl mx-auto">
			<div className="flex flex-col gap-4">
				<h1 className="text-6xl font-bold">
					Piece of mind is here.
				</h1>

				<h2 className="text-2xl text-black-2">
					Control your budgets, spending and personal finances.
					<span className="font-semibold text-primary">
						{" "}Better.
					</span>
				</h2>
			</div>

			<div className="py-8">
				<NexpendaExampleUI />
			</div>
		</section>

		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>


		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>
		<section id="home" className="max-w-4xl mx-auto py-16">
			<p>Test</p>
		</section>

	</SiteLayout>
}