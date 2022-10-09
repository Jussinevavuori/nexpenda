import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { AppLayout } from "@/layouts/app/AppLayout";
import { trpc } from "@/utils/trpc";
import { useMemo, useRef, useState } from "react";
import { useVirtual } from '@tanstack/react-virtual';
import { Divider } from "@/components/Divider/Divider";
import { Input } from "@/components/Input/Input";
import { Icon } from "@/components/Icon/Icon";
import { Select } from "@/components/Select/Select";
import { Switch } from "@/components/Switch/Switch";
import { useDebounce } from "@/hooks/useDebounce";
import { Avatar } from "@/components/Avatar/Avatar";
import { formatDateString } from "@/utils/dates/formatDateString";

const estimateSize = () => 100

const UserSortOptions = {
	CREATED_AT: "Joined At",
	UPDATED_AT: "Updated At",
	NAME: "Name",
	EMAIL: "Email",
	N_TRANSACTIONS: "# Transactions",
	ACCOUNT: "Account",
	ROLE: "Role",
}

type UserSort = keyof typeof UserSortOptions

export default function AdminUsersPage() {
	useRequireAuth("ADMIN");

	const [search, setSearch] = useState("");
	const [sort, setSort] = useState<UserSort>("CREATED_AT");
	const [reverseSort, setReverseSort] = useState(false);

	const debouncedSearch = useDebounce(search);

	const { data: users, isLoading } = trpc.useQuery(["user.list"])

	const resultUsers = useMemo(() => {
		const filter = createUserFilter(debouncedSearch)
		const sorter = createUserSorter(sort, reverseSort)
		return (users ?? []).filter(filter).sort(sorter)
	}, [users, sort, reverseSort, debouncedSearch])

	// Virtualized list
	const parentRef = useRef<HTMLDivElement | null>(null);
	const virtualList = useVirtual({
		size: resultUsers.length,
		parentRef,
		estimateSize,
		overscan: 5,
	});

	return <AppLayout active="settings">
		<PageHead title={["Admin", "Users"]} />
		<AdminLayout title="Manage users">

			<h2 className="text-xl font-semibold pt-8">
				Search users
			</h2>

			<div className="w-full flex gap-4 pt-4">
				<div className="w-full">
					<label className="block pb-2 text-sm" htmlFor="searchinput">
						Search
					</label>
					<Input
						id="searchinput"
						value={search}
						onChange={e => setSearch(e.target.value)}
						endIcon={<Icon.Material icon="search" />}
					/>
				</div>
				<div style={{ width: 320 }}>
					<label className="block pb-2 text-sm" htmlFor="sortinput">
						Sort
					</label>
					<Select<UserSort>
						id="sortinput"
						value={sort}
						onChange={e => setSort(e)}
						renderValue={(value) => UserSortOptions[value]}
					>
						{
							Object.keys(UserSortOptions).map((op) => (
								<Select.Option<UserSort> key={op} value={op as UserSort}>
									{UserSortOptions[op as UserSort]}
								</Select.Option>
							))
						}
					</Select>
				</div>
				<div>
					<label className="block pb-2 text-sm" htmlFor="reverseinput">
						Reverse
					</label>
					<Switch
						id="reverseinput"
						value={reverseSort}
						onChange={value => setReverseSort(value)}
					/>
				</div>
			</div>

			<Divider className="my-8" />

			{
				isLoading ? (
					<div className="mx-auto">
						<LoadingSpinner />
					</div>
				) : (
					<div
						ref={parentRef}
						className="overflow-auto"
					>
						<ul
							className="relative w-full"
							style={{ height: virtualList.totalSize }}
						>
							{
								virtualList.virtualItems.map(row => {
									const user = resultUsers[row.index]!; //eslint-disable-line

									return <li
										key={row.index}
										ref={row.measureRef}
										className="absolute top-0 left-0 w-full pb-8 flex items-center gap-4"
										style={{
											transform: `translateY(${row.start}px)`
										}}
										data-userid={user.id}
									>
										<Avatar
											image={user.image}
											name={user.name}
											size={42}
										/>
										<div className="flex flex-col gap-1">
											<div className="flex gap-4">
												<p className="text-sm font-semibold">
													{user.name}
													{user.role === "ADMIN" ? " (Admin)" : ""}
												</p>
												<p className="text-sm flex gap-2">
													{user.email}
													<Icon.Material
														size={16}
														icon={user.emailVerified ? "check" : "clear"}
														className={user.emailVerified ? "text-emerald-600" : "text-black-2 dark:text-white-2"}
													/>
												</p>
												{
													user.accounts.map(account => <div key={account.provider} className="flex gap-4 items-center">
														<Icon.Simple icon={account.provider} size={16} />
													</div>)
												}
											</div>
											<div className="flex gap-4">
												<p className="text-sm text-black-3 dark:text-white-3">
													Joined {formatDateString(user.createdAt)}
												</p>
												<p className="text-sm text-black-3 dark:text-white-3">
													Updated {formatDateString(user.updatedAt)}
												</p>
												<p className="text-sm text-black-3 dark:text-white-3">
													<span className="underline">{user.transactions.length}</span> transactions
												</p>
												<p className="text-sm text-black-3 dark:text-white-3">
													<span className="underline">{user.categories.length}</span> categories
												</p>
												<p className="text-sm text-black-3 dark:text-white-3">
													<span className="underline">{user.transactionSchedules.length}</span> schedules
												</p>
												<p className="text-sm text-black-3 dark:text-white-3">
													<span className="underline">{user.budgets.length}/{user.budgetEntries.length}</span> schedules
												</p>
											</div>
										</div>
									</li>
								})
							}
						</ul>
					</div>
				)
			}
		</AdminLayout>
	</AppLayout >
}

function createUserFilter(search: string) {

	const term = search.toLowerCase().trim()

	if (!term) return () => true;

	return (user: UserListItem) => {
		return [
			user.name,
			user.email,
			user.role === "ADMIN" ? "admin" : "",
			user.emailVerified ? "verified" : "",
			user.accounts.map(_ => _.provider),
			formatDateString(user.createdAt),
			formatDateString(user.updatedAt),
		]
			.flat()
			.filter(Boolean)
			.map(_ => _.toLowerCase())
			.some(target => target.includes(term))
	}
}

function createUserSorter(sort: UserSort, reverse: boolean) {
	return (a: UserListItem, b: UserListItem) => {
		const fn = () => {
			switch (sort) {
				case "CREATED_AT": {
					return a.createdAt.getTime() - b.createdAt.getTime()
				}
				case "UPDATED_AT": {
					return a.updatedAt.getTime() - b.updatedAt.getTime()
				}
				case "EMAIL": {
					return (a.email ?? "").localeCompare(b.email ?? "")
				}
				case "NAME": {
					return (a.name ?? a.email ?? "").localeCompare(b.name ?? b.email ?? "")
				}
				case "N_TRANSACTIONS": {
					return a.transactions.length - b.transactions.length
				}
				case "ACCOUNT": {
					return a.accounts.map(_ => _.provider).join("_")
						.localeCompare(b.accounts.map(_ => _.provider).join("_"))
				}
				case "ROLE": {
					return a.role.localeCompare(b.role);
				}
			}
		}
		return reverse ? -fn() : fn();
	}
}