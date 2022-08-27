
import { GradientOverlay } from "@/components/GradientOverlay/GradientOverlay";
import { NexpendaLogo } from "@/components/NexpendaLogo/NexpendaLogo";
import { pages } from "@/utils/pages";
import Image from "next/future/image";
import Link from "next/link";
import BgImage from "../../../public/assets/images/landing-bg.jpg";

export type AuthLayoutProps = {
	children?: React.ReactNode;
}

export function AuthLayout(props: AuthLayoutProps) {
	return <div>
		<div className="fixed inset-0 -z-10">
			<Image
				src={BgImage}
				placeholder="blur"
				className="absolute inset-0 scale-y-[-100%] overflow-hidden min-h-[100%] object-cover"
			/>
			<GradientOverlay />
		</div>

		<main className="bg-white max-w-xl shadow min-h-screen">

			<header>
				<Link href={pages.home} className="flex flex-row gap-4 items-center p-8">
					<NexpendaLogo.Icon />
					<NexpendaLogo.Type />
				</Link>
			</header>

			<div className="p-8">
				{props.children}
			</div>
		</main>
	</div>
}