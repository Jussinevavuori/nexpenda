import { pages } from "@/utils/pages";
import Link from "next/link";

export default function HomePage() {
	return <div className="dark:bg-slate-900">
		HomePage
		<Link href={pages.login}>
			Login
		</Link>
	</div>
}