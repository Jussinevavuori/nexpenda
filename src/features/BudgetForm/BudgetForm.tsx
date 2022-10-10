import { Button } from "@/components/Button/Button";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { Input } from "@/components/Input/Input";
import { Slider } from "@/components/Slider/Slider";
import { formatMoney } from "@/utils/currency/formatMoney";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod"
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
			.regex(/^\+?-?\d*[.,]?\d{0,2}$/, "Invalid amount")
			.min(1, "Please enter an amount"),
		categoryId: z.string().min(1),
		averagedOverMonths: z.number().int().min(1),
	})),
	expenses: z.array(z.object({
		_internalId: z.string(),
		amount: z
			.string()
			.regex(/^\d*[.,]?\d{0,2}$/, "Invalid amount")
			.min(1, "Please enter an amount"),
		categoryId: z.string().min(1),
		averagedOverMonths: z.number().int().min(1),
	}))
})

// Infer form type
export type BudgetFormSchema = z.TypeOf<typeof budgetFormSchema>;

export type BudgetFormProps = {
	initialValues?: Partial<BudgetFormSchema>;
	onSubmit(p: BudgetFormSchema): void;
}

export function BudgetForm(props: BudgetFormProps) {
	const currency = usePreference("currency");

	// Fetch all categories for autofill
	const { data: categories } = trpc.useQuery(["categories.list"]);

	// Form
	const { register, setValue, control, formState: { errors }, ...form } = useForm<BudgetFormSchema>({
		resolver: zodResolver(budgetFormSchema),
		defaultValues: {
			name: "",
			savingsTarget: 20,
			incomes: [{
				_internalId: shortid(),
				amount: "",
				categoryId: "",
				averagedOverMonths: 1,
			}],
			expenses: [{
				_internalId: shortid(),
				amount: "",
				categoryId: "",
				averagedOverMonths: 1,
			}],
			...props.initialValues,
		},
		reValidateMode: "onBlur",
	})

	// Field array for entries
	const incomeFields = useFieldArray({ control, name: "incomes" })
	const expenseFields = useFieldArray({ control, name: "expenses" })

	const watchSavingsTarget = form.watch("savingsTarget")

	return <form
		onSubmit={form.handleSubmit((values) => props.onSubmit(values))}
		className="flex flex-col gap-8 pt-4 w-full max-w-2xl mx-auto"
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
			/>
			<p className="pt-2 text-sm text-black-2 dark:text-white-2">
				Define how much of the money left over in your budget you would like to
				save.
			</p>
		</div>

		<Divider className="my-6" />

		<p>
			Incomes
		</p>
		<ul className="flex flex-col gap-8">
			{
				incomeFields.fields.map((field, index) => {
					return <li
						className="border border-divider p-4 rounded-lg flex flex-col gap-4"
						key={field._internalId}
					>
						<div className="flex gap-4 items-center">
							<div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-500/20">
								🖌
							</div>
							<Input
								fullWidth
								placeholder="Category"
							/>
							<Button
								type="button"
								color="danger"
								variant="flat"
								className="px-2"
							>
								<Icon.Material icon="clear" />
							</Button>
						</div>
						<Input
							{...register(`entries[${index}].amount` as any)} // eslint-disable-line
							placeholder={formatMoney(0, { hideCurrency: true })}
							fullWidth
							error={!!errors.expenses?.[index]?.amount}
							startIcon={<Icon.Material icon="add" />}
							endLabel={currency.toUpperCase()}
						/>
					</li>
				})
			}
		</ul>
		<Button
			type="button"
			variant="flat"
			color="success"
		>
			Add income
		</Button>

		<p>
			Expenses
		</p>
		<ul className="flex flex-col gap-8">
			{
				expenseFields.fields.map((field, index) => {
					return <li
						className="border border-divider p-4 rounded-lg flex flex-col gap-4"
						key={field._internalId}
					>
						<div className="flex gap-4 items-center">
							<div className="h-10 w-10 flex items-center justify-center rounded-lg bg-rose-500/20">
								🖌
							</div>
							<Input
								fullWidth
								placeholder="Category"
							/>
							<Button
								type="button"
								color="danger"
								variant="flat"
								className="px-2"
							>
								<Icon.Material icon="clear" />
							</Button>
						</div>
						<Input
							{...register(`entries[${index}].amount` as any)} // eslint-disable-line
							placeholder={formatMoney(0, { hideCurrency: true })}
							fullWidth
							error={!!errors.expenses?.[index]?.amount}
							startIcon={<Icon.Material icon="remove" />}
							endLabel={currency.toUpperCase()}
						/>
					</li>
				})
			}
		</ul>
		<Button
			type="button"
			variant="flat"
			color="danger"
		>
			Add expense
		</Button>

		<Divider className="my-6" />

		{/* Submit button */}
		< div className="flex gap-4 pt-4" >
			<Button type="submit" className="w-full">
				Create budget
			</Button>
		</div>


	</form>

}