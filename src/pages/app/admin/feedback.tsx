import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AppLayout } from "@/layouts/app/AppLayout";
import { useRef } from "react";
import { useVirtual } from '@tanstack/react-virtual';
import { trpc } from "@/utils/trpc";
import { Avatar } from "@/components/Avatar/Avatar";
import { formatDateString } from "@/utils/dates/formatDateString";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { IconButton } from "@/components/IconButton/IconButton";
import { Icon } from "@/components/Icon/Icon";
import { AlertDialog } from "@/components/AlertDialog/AlertDialog";

const estimateSize = () => 100

export default function AdminFeedbackPage() {
	useRequireAuth("ADMIN");

	const utils = trpc.useContext()
	const { data: feedback, isLoading } = trpc.useQuery(["feedback.list"])
	const deleteFeedbackMutation = trpc.useMutation("feedback.delete", {
		onSettled: () => utils.invalidateQueries("feedback.list")
	});

	// Virtualized list
	const parentRef = useRef<HTMLDivElement | null>(null);
	const virtualList = useVirtual({
		size: feedback ? feedback.length : 0,
		parentRef,
		estimateSize,
		overscan: 5,
	});

	return <AppLayout active="settings">
		<PageHead title={["Admin", "Feedback"]} />
		<AdminLayout title="Read All Feedback">
			{
				isLoading || !feedback ? (
					<div className="mx-auto py-16">
						<LoadingSpinner />
					</div>
				) : feedback.length === 0 ? (
					<div className="mx-auto py-16 text-center opacity-50">
						No feedback
					</div>
				) : (
					<div
						ref={parentRef}
						className="overflow-auto py-12"
					>
						<ul
							className="relative w-full"
							style={{ height: virtualList.totalSize }}
						>
							{
								virtualList.virtualItems.map(row => {
									const item = feedback?.[row.index]; //eslint-disable-line

									if (!item) return null;

									return <li
										key={row.index}
										ref={row.measureRef}
										className="absolute top-0 left-0 w-full flex flex-col gap-4 pb-8"
										style={{
											transform: `translateY(${row.start}px)`
										}}
										data-userid={item.user.id}
									>
										<div className="flex gap-4 items-center">
											<Avatar
												image={item.user.image}
												name={item.user.name}
												size={42}
											/>
											<div>
												<p className="text-sm font-semibold">
													{item.user.name}
												</p>
												<p className="flex gap-2 text-sm text-black-2 dark:text-white-2">
													<span>
														Left {formatDateString(item.createdAt)}
													</span>
													<span> · </span>
													<span>
														{item.user.email}
													</span>
													<span> · </span>
													<span>
														Joined {formatDateString(item.user.createdAt)}
													</span>
												</p>
											</div>
											<AlertDialog
												title="Confirm delete"
												description="Are you sure you want to delete this feedback?"
												onConfirm={() => deleteFeedbackMutation.mutate({ id: item.id })}
												variant="danger"
												confirmLabel="Delete"
												cancelLabel="Cancel"
											>
												<IconButton
													className="ml-auto"
													variant="flat"
													color="danger"
												>
													<Icon.Material icon="delete" />
												</IconButton>
											</AlertDialog>
										</div>
										<div className="bg-hover-overlay rounded-lg px-4 py-2">
											{item.message}
										</div>
									</li>
								})
							}
						</ul>
					</div>
				)
			}
		</AdminLayout >
	</AppLayout >
}