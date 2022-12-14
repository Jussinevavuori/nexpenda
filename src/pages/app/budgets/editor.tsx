import { PageHead } from "@/components/PageHead/PageHead";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AppLayout } from "@/layouts/app/AppLayout";
import { AppLayoutHeader } from "@/layouts/app/components/AppLayoutHeader/AppLayoutHeader";
import { usePeriodStore } from "@/stores/periodStore";
import { BudgetForm, BudgetFormSchema } from "@/features/BudgetForm/BudgetForm";
import { Button } from "@/components/Button/Button";
import { pages } from "@/utils/pages";
import { trpc } from "@/utils/trpc";
import { useCallback } from "react";
import { parseAmountStringWithSign } from "@/utils/transaction/parseAmountStringWithSign";
import { useRouter } from "next/router";
import { useNotify } from "@/stores/notificationStore";

export default function BudgetEditorPage() {
	useRequireAuth();

	const period = usePeriodStore(_ => _.period);
	const { data: budget } = trpc.useQuery(["budgets.get", { period }]);

	const notify = useNotify();
	const router = useRouter();
	const utils = trpc.useContext();
	const createMutation = trpc.useMutation(["budgets.create"], {
		onSettled() {
			utils.invalidateQueries("budgets.get")
			utils.invalidateQueries("budgets.summary.get")
			router.push(pages.budgets.dashboard)
			notify.success("Budget updated");
		}
	})

	const handleSubmit = useCallback((form: BudgetFormSchema) => {
		createMutation.mutate({
			period,
			name: form.name,
			savingsTarget: form.savingsTarget,
			entries: [
				...form.incomes.map(cat => ({
					categoryId: cat.categoryId,
					averagedOverMonths: cat.averagedOverMonths,
					amount: parseAmountStringWithSign(cat.amount, "+"),
				})),
				...form.expenses.map(cat => ({
					categoryId: cat.categoryId,
					averagedOverMonths: cat.averagedOverMonths,
					amount: parseAmountStringWithSign(cat.amount, "-"),
				}))
			],
		})
	}, [createMutation, period])

	return <AppLayout active="budgets">

		<PageHead title="Create Budget" />

		<AppLayoutHeader>
			<div className="px-6 d:px-10 py-4 d:py-8 flex items-center justify-between gap-4">
				<h1 className="text-2xl font-bold">
					Budget editor
				</h1>
				<Button.Link variant="flat" color="danger" href={pages.budgets.dashboard}>
					Cancel
				</Button.Link>
			</div>
		</AppLayoutHeader>

		<div className="px-10 py-10">
			<BudgetForm
				period={period}
				budget={budget}
				isLoading={createMutation.isLoading}
				onSubmit={handleSubmit}
				key={budget?.id}
			/>
		</div>
	</AppLayout >
}