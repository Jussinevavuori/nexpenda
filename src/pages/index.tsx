import { PageHead } from "@/components/PageHead/PageHead";
import { pages } from "@/utils/pages";
import Link from "next/link";

export default function HomePage() {
	return <div className="dark:bg-slate-900">
		<PageHead title="Home" />
		HomePage
		<Link href={pages.login}>
			Login
		</Link>
	</div>
}