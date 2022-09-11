import { Button } from "@/components/Button/Button";
import { PageHead } from "@/components/PageHead/PageHead";
import { SiteLayout } from "@/layouts/SiteLayout/SiteLayout";
import { pages } from "@/utils/pages";
import Image from "next/future/image";

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

				<div className="relative flex gap-12 mt-8">
					<Button.Link href={pages.login} color="monochrome" className="scale-125 origin-top-left">
						Get started for free
					</Button.Link>
					<Button.Link href={pages.login} variant="text" color="monochrome" className="scale-125 origin-top-left">
						Login
					</Button.Link>
				</div>
			</div>

			<div className="mt-16 w-full relative" style={{ height: 600 }}>
				<Image src={"/assets/svg/ui-example.svg"} alt="" fill />
			</div>
		</section>

	</SiteLayout>
}