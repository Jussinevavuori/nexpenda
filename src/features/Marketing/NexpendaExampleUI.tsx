import { Icon } from "@/components/Icon/Icon";
import { NexpendaLogo } from "@/components/NexpendaLogo/NexpendaLogo";

export function NexpendaExampleUI() {
	return (
		<div className="relative w-full aspect-video">

			{/** Main window */}
			<div className="absolute rounded-xl border border-divider shadow-xl top-4 bottom-0 left-8 right-8">

				{/* Window decorations */}
				<div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-danger" />
				<div className="absolute top-2 left-5 w-2 h-2 rounded-full bg-warning" />
				<div className="absolute top-2 left-8 w-2 h-2 rounded-full bg-success" />
				<div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-slate-500">
					Nexpenda
				</div>

				{/* Content */}
				<div className="absolute top-8 left-48 right-8">

					{/* Search and new */}
					<div className="absolute flex left-0 right-0 top-0 gap-4">
						<div className="flex gap-1 bg-primary rounded-lg text-white font-medium text-xs px-2 py-1">
							<Icon.Material icon="add" size={16} />
							New
						</div>
						<div className="flex justify-end items-center bg-white-bg-4 rounded-lg w-full text-xs px-2 py-1">
							<Icon.Material icon="search" size={16} />
						</div>
					</div>

					{/* Summary and period select */}
					<div className="absolute flex justify-between items-center left-0 right-0 top-12 gap-4">

						{/* Summary */}
						<div className="flex flex-col">
							<div className="font-bold text-success text-lg">
								+ 2,584 €
							</div>
							<div className="flex gap-2">
								<div className="w-7 h-3 rounded-full bg-success/50" />
								<div className="w-8 h-3 rounded-full bg-danger/50" />
								<div className="w-4 h-3 rounded-full bg-black/30" />
							</div>
						</div>

						{/* Period select */}
						<div className="flex items-center gap-1">
							<div className="flex h-6 gap-1 bg-primary rounded-lg text-white font-medium text-xs p-1">
								<Icon.Material icon="chevron_left" size={16} />
							</div>
							<div className="flex h-6 gap-1 bg-primary rounded-lg text-white font-medium text-xs p-1">
								<Icon.Material icon="chevron_right" size={16} />
							</div>
							<p className="px-2 text-xs h-6 flex items-center bg-slate-200 text-black-2 rounded-lg">This month</p>
							<div className="flex h-6 gap-1 bg-primary rounded-lg text-white font-medium text-xs p-1">
								<Icon.Material icon="unfold_more" size={16} />
							</div>
						</div>
					</div>

				</div>
			</div>

			{/* Sidebar */}
			<div className="absolute rounded-xl border border-divider bg-white-bg-2 left-0 top-12 bottom-12 w-48">

				{/* Sidebar logo */}
				<div className="absolute top-4 left-4 flex gap-2 items-center">
					<NexpendaLogo.Icon size={16} />
					<NexpendaLogo.Type size="sm" />
				</div>

				{/* Sidebar items */}
				<div className="absolute top-14 left-4 right-4 flex flex-col gap-2 text-xs font-medium">
					<div className="bg-primary text-white rounded px-3 py-1">Dashboard</div>
					<div className="px-3 py-1">Analytics</div>
					<div className="px-3 py-1">Schedules</div>
					<div className="px-3 py-1">Budgets</div>
					<div className="px-3 py-1">Settings</div>
				</div>
			</div>
		</div>
	)
}