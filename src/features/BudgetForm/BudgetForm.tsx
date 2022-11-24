import { Button } from "@/components/Button/Button";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { Input } from "@/components/Input/Input";
import { Slider } from "@/components/Slider/Slider";
import { getDefaultedCategoryIcon } from "@/utils/category/getDefaultedCategoryIcon";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import shortid from "shortid";
import { z } from "zod";
import { usePreference } from "../Preferences/hooks/usePreference";

// Define full form schema
export const budgetFormSchema = z.object({
	name: z.string(),
	savingsTarget: z.number().int().min(0).max(100),
	incomes: z.array(z.object({
		_internalId: z.string(),
		amount: z
			.string()
			.regex(/^\+?-?\d*[.,]?\d{0,2}$/, "Invalid amount"),
		categoryId: z.string().min(1),
		averagedOverMonths: z.number().int().min(1),
	})),
	expenses: z.array(z.object({
		_internalId: z.string(),
		amount: z
			.string()
			.regex(/^\d*[.,]?\d{0,2}$/, "Invalid amount"),
		categoryId: z.string().min(1),
		averagedOverMonths: z.number().int().min(1),
	})),
})

// Infer form type
export type BudgetFormSchema = z.TypeOf<typeof budgetFormSchema>;

export type BudgetFormProps = {
	isLoading?: boolean;
	onSubmit(p: BudgetFormSchema): void;
	period: Period;
	budget?: BudgetItem;
}

// Filter out empty inputs
function parseBudgetFormSchemaForSubmit(form: BudgetFormSchema) {
	return {
		...form,
		expenses: form.expenses.filter(_ => _.amount),
		incomes: form.incomes.filter(_ => _.amount),
	}
}

export function BudgetForm(props: BudgetFormProps) {
	const currency = usePreference("currency")
	const { data: categoriesList } = trpc.useQuery(["categories.list"]);
	const { data: categoriesByType } = trpc.useQuery(["categories.listByType"]);

	const categoryById = useMemo(() => {
		const map = new Map<string, CategoryItem>();
		categoriesList?.forEach(cat => {
			map.set(cat.id, cat);
		})
		return map;
	}, [categoriesList])

	// Form
	const {
		register,
		setValue,
		control,
		formState: { errors },
		...form
	} = useForm<BudgetFormSchema>({
		resolver: zodResolver(budgetFormSchema),
		defaultValues: {
			name: "",
			savingsTarget: 20,
			incomes: [{}],
			expenses: [{}],
			...(
				// Apply default values from current budget
				props.budget
					? {
						name: props.budget.name ?? undefined,
						savingsTarget: props.budget.savingsTarget,
					}
					: {}
			)
		},
		reValidateMode: "onBlur",
	})

	// Field array for entries
	const { append: appendIncome, ...incomeFields } = useFieldArray({ control, name: "incomes" })
	const { append: appendExpense, ...expenseFields } = useFieldArray({ control, name: "expenses" })

	// Initialize form with categories
	useEffect(() => {
		setValue("incomes", []);
		setValue("expenses", []);

		// Sort alphabetically
		const incomeCategories = [...(categoriesByType?.incomeCategories ?? [])].sort((a, b) => a.name.localeCompare(b.name))
		const expenseCategories = [...(categoriesByType?.expenseCategories ?? [])].sort((a, b) => a.name.localeCompare(b.name))

		incomeCategories.forEach((cat) => {
			const existing = props.budget?.entries.find(entry => (
				entry.categoryId === cat.id && entry.amount > 0
			))

			appendIncome({
				_internalId: shortid(),
				amount: existing ? Math.abs(existing.amount / 100).toFixed(2) : "",
				averagedOverMonths: existing ? existing.averagedOverMonths : 1,
				categoryId: cat.id,
			})
		})

		expenseCategories.forEach((cat) => {
			const existing = props.budget?.entries.find(entry => (
				entry.categoryId === cat.id && entry.amount < 0
			))

			appendExpense({
				_internalId: shortid(),
				amount: existing ? Math.abs(existing.amount / 100).toFixed(2) : "",
				averagedOverMonths: existing ? existing.averagedOverMonths : 1,
				categoryId: cat.id,
			})
		})
	}, [setValue, categoriesByType, appendIncome, appendExpense, props.budget])

	const watchSavingsTarget = form.watch("savingsTarget")

	return <form
		onSubmit={form.handleSubmit((values) => props.onSubmit(parseBudgetFormSchemaForSubmit(values)))}
		className="flex flex-col gap-8 pt-4 w-full max-w-3xl mx-auto"
	>

		{/* Name input */}
		<div>
			<div className="flex items-center justify-between pb-2">
				<p>
					Name of budget
				</p>
			</div>
			<Input
				id="name"
				{...register("name")}
				fullWidth
				placeholder="Untitled Budget"
				error={!!errors.name}
				disabled={props.isLoading}
			/>
		</div>

		{/* Savings target input */}
		<div>
			<div className="flex items-center justify-between pb-2">
				<p>
					Savings target
				</p>
				<p>
					{watchSavingsTarget} %
				</p>
			</div>
			<Slider
				{...register("savingsTarget")}
				type="default"
				id="savingsTarget"
				min={0}
				max={100}
				value={watchSavingsTarget}
				onValueChange={value => setValue("savingsTarget", value, { shouldTouch: true })}
				disabled={props.isLoading}
			/>
			<p className="pt-2 text-sm text-black-2 dark:text-white-2">
				Define how much of the money left over in your budget you would like to
				save.
			</p>
		</div>

		<Divider className="my-6" />

		<div className="space-y-2">
			<p>
				Incomes
			</p>
			<p className="text-black-4 dark:text-white-4">
				Estimate all your recurring incomes by category.
			</p>
		</div>
		<ul className="gap-x-4 gap-y-4 grid grid-cols-[auto_1fr]">
			{
				incomeFields.fields.map((field, index) => <React.Fragment key={field._internalId}>
					<div className="flex md:hidden gap-2 flex-1 col-span-2">
						<span>
							{getDefaultedCategoryIcon(categoryById.get(field.categoryId), "+")}
						</span>
						<span>
							{categoryById.get(field.categoryId)?.name}
						</span>
					</div>
					<div className="rounded-lg bg-emerald-500/15 border border-emerald-500/20 py-2 px-2 md:px-4 flex gap-2 flex-1">
						<span className="inline md:hidden">
							<Icon.Material icon="add" className="text-emerald-900" />
						</span>
						<span className="hidden md:inline">
							{getDefaultedCategoryIcon(categoryById.get(field.categoryId), "+")}
						</span>
						<span className="hidden md:inline">
							{categoryById.get(field.categoryId)?.name}
						</span>
					</div>
					<Input
						style={{ borderTopLeftRadius: 0 }}
						id="amount"
						{...register(`incomes[${index}].amount` as any)} // eslint-disable-line
						placeholder="Amount"
						fullWidth
						error={!!errors.incomes?.[index]?.amount}
						endLabel={currency.toUpperCase()}
						disabled={props.isLoading}
					/>
				</React.Fragment>)
			}
		</ul>
		<p className="text-black-4 dark:text-white-4 italic text-sm">
			Only categories which have transactions are shown here. To estimate a new
			category, you first have to have a transaction in that category.
		</p>

		<Divider className="my-4" />

		<div className="space-y-2">
			<p>
				Expenses
			</p>
			<p className="text-black-4 dark:text-white-4">
				Estimate all your recurring expenses by category.
			</p>
		</div>
		<ul className="gap-x-4 gap-y-4 grid grid-cols-[auto_1fr]">
			{
				expenseFields.fields.map((field, index) => <React.Fragment key={field._internalId}>
					<div className="flex md:hidden gap-2 flex-1 col-span-2">
						<span>
							{getDefaultedCategoryIcon(categoryById.get(field.categoryId), "-")}
						</span>
						<span>
							{categoryById.get(field.categoryId)?.name}
						</span>
					</div>
					<div className="rounded-lg bg-rose-500/15 border border-rose-500/20 py-2 px-2 md:px-4 flex gap-2 flex-1">
						<span className="inline md:hidden">
							<Icon.Material icon="remove" className="text-rose-900" />
						</span>
						<span className="hidden md:inline">
							{getDefaultedCategoryIcon(categoryById.get(field.categoryId), "-")}
						</span>
						<span className="hidden md:inline">
							{categoryById.get(field.categoryId)?.name}
						</span>
					</div>
					<Input
						style={{ borderTopLeftRadius: 0 }}
						id="amount"
						{...register(`expenses[${index}].amount` as any)} // eslint-disable-line
						placeholder="0"
						fullWidth
						error={!!errors.expenses?.[index]?.amount}
						endLabel={currency.toUpperCase()}
						disabled={props.isLoading}
					/>
				</React.Fragment>)
			}
		</ul>
		<p className="text-black-4 dark:text-white-4 italic text-sm">
			Only categories which have transactions are shown here. To estimate a new
			category, you first have to have a transaction in that category.
		</p>


		<Divider className="my-6" />

		{/* Submit button */}
		< div className="flex gap-4 pt-4" >
			<Button
				type="submit"
				className="w-full"
				loading={props.isLoading}
			>
				Save budget
			</Button>
		</div>
	</form>
}