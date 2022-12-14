import { Avatar } from '@/components/Avatar/Avatar';
import { c } from '@/utils/generic/classnames';
import { pages } from '@/utils/pages';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';

const { motion, AnimatePresence }: typeof import("framer-motion") = require("framer-motion"); // eslint-disable-line

export interface SidebarUserProps {
	isSidebarOpen: boolean;

}

export function SidebarUser(props: SidebarUserProps) {
	const { data: user } = trpc.useQuery(["user.me"])

	return <Link href={pages.settings.root} className={c("bg-transparent group relative w-full px-4 py-4 inline-flex items-center gap-4 rounded hover:bg-hover-overlay transition-colors duration-100")}>
		<motion.span
			initial={false}
			animate={{
				justifySelf: props.isSidebarOpen ? "stretch" : "start",
				transform: props.isSidebarOpen ? `translateX(0px)` : `translateX(-2px)`,
			}}
			className={c("inline")}
		>
			<Avatar size={36} image={user?.image} name={user?.name} />
		</motion.span>
		<AnimatePresence>
			{
				props.isSidebarOpen &&
				<motion.p
					style={{ transformOrigin: "left" }}
					animate={{ scaleX: 1, opacity: 1 }}
					exit={{ scaleX: 0, opacity: 0 }}
					className={c("absolute left-16 right-4 max-w-full")}
				>
					<span
						className="block font-medium text-sm truncate text-ellipsis"
					>
						{user?.name ?? "..."}
					</span>
					<span className="block text-slate-700 dark:text-slate-400 text-sm truncate text-ellipsis">
						{"Signed in"}
					</span>
				</motion.p>
			}
		</AnimatePresence>
	</Link >
}