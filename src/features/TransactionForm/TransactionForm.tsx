import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import emojiRegex from "emoji-regex";
import { format, lightFormat } from "date-fns";
import { usePreference } from "../Preferences/hooks/usePreference";
import { Icon } from "@/components/Icon/Icon";
import { trpc } from "@/utils/trpc";
import { Autocomplete } from "@/components/Autocomplete/Autocomplete";
import { defaultCategoryIcons, getDefaultedCategoryIcon } from "@/utils/category/getDefaultedCategoryIcon";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { transactionCopyAtom } from "@/stores/transactionCopyAtom";
import { getSign } from "@/utils/generic/getSign";
import { useOpenState } from "@/hooks/useOpenState";
import { Divider } from "@/components/Divider/Divider";
import { Switch } from "@/components/Switch/Switch";
import { IntegerInput } from "@/components/IntegerInput/IntegerInput";
import { Select } from "@/components/Select/Select";
import type { IntervalType } from "@prisma/client";
import { selectProperties } from "@/utils/generic/selectProperties";
import { pluralize } from "@/utils/generic/pluralize";
import { capitalize } from "@/utils/generic/capitalize";

// Define full form schema
export const transactionFormSchema = z.object({
	sign: z.enum(["-", "+"]),
	amount: z
		.string()
		.regex(/^\+?-?\d*[.,]?\d{0,2}$/, "Invalid amount")
		.min(1, "Please enter an amount"),
	icon: z
		.string()
		.refine(
			(str) => !str.trim() || emojiRegex().test(str.trim()),
			"Invalid icon"
		)
		.optional(),
	category: z.string().refine((s) => !!s.trim(), "Category cannot be empty"),
	comment: z.string(),
	date: z.string().refine((s) => z.date().safeParse(new Date(s)).success),

	scheduleEnabled: z.boolean(),
	scheduleEvery: z.number().int().positive(),
	scheduleIntervals: z.enum(["DAY", "WEEK", "MONTH", "YEAR"]),
	scheduleOccurrencesEnabled: z.boolean(),
	scheduleOccurrences: z.number().int(),
})

// Infer form type
export type TransactionFormSchema = z.TypeOf<typeof transactionFormSchema>;

// Props
export type TransactionFormProps = {
	initialValues?: Partial<TransactionFormSchema>;
	onSubmit(p: TransactionFormSchema): void;
	disableScheduleForm?: boolean;
}

// Form only component
export function TransactionForm(props: TransactionFormProps) {
	const currency = usePreference("currency");

	// Fetch all categories for autofill
	const { data: categories } = trpc.useQuery(["categories.list"]);

	// Copy and clear if copied
	const [copyTransaction, setCopyTransaction] = useAtom(transactionCopyAtom);
	useEffect(() => {
		if (copyTransaction) {
			setCopyTransaction(undefined)
		}
	}, [copyTransaction, setCopyTransaction])

	// Form
	const { register, setValue, formState: { errors }, ...form } = useForm<TransactionFormSchema>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: {

			sign: "-",
			amount: "",
			category: "",
			comment: "",
			date: format(new Date(), "yyyy-MM-dd"),
			icon: undefined,
			scheduleEnabled: false,
			scheduleEvery: 1,
			scheduleIntervals: "MONTH",
			scheduleOccurrencesEnabled: false,
			scheduleOccurrences: 0,

			// Copied initial values
			// Note: When copying, reset date to today. Assume user doesn't want to
			// duplicate transactions for past or future dates and wants to create
			// a new transaction with the details of the previous transaction for a
			// new date.
			...(copyTransaction ? {
				amount: Math.abs(copyTransaction.amount / 100).toFixed(2),
				sign: getSign(copyTransaction.amount),
				category: copyTransaction.category.name,
				comment: copyTransaction.comment,
				date: lightFormat(new Date(), "yyyy-MM-dd"),
			} : {}),

			// Custom initial values
			...props.initialValues,
		},
		reValidateMode: "onBlur",
	})

	// Schedule editor open status
	const scheduleEditor = useOpenState();

	// Autofocus input field (autofocus prop has trouble)
	useEffect(() => document.getElementById("amount")?.focus(), []);

	// Watched values
	const watchAmount = form.watch("amount");
	const watchSign = form.watch("sign");
	const watchCategory = form.watch("category");

	// Automatically clean "+" and "-" signs from amont input
	useEffect(() => {
		if (watchAmount.includes("-")) setValue("sign", "-", { shouldTouch: true });
		if (watchAmount.includes("+")) setValue("sign", "+", { shouldTouch: true });
		const cleanedAmountInput = watchAmount.replace(/[^1234567890,\.]/g, "");
		if (cleanedAmountInput !== watchAmount) setValue("amount", cleanedAmountInput, { shouldTouch: true });
	}, [setValue, watchAmount])

	// Selected category icon
	const previewCategoryIcon = (categories ?? []).find(cat => cat.name === watchCategory)?.icon
		?? (watchSign === "+" ? defaultCategoryIcons["income"] : defaultCategoryIcons["expense"])

	// Filtered categories by current search
	const filteredCategories = !watchCategory.trim()
		? (categories ?? [])
		: (categories ?? []).filter(cat => cat.name.toLowerCase().includes(watchCategory.toLowerCase()));

	return <form
		onSubmit={form.handleSubmit((values) => props.onSubmit(values))}
		className="flex flex-col gap-4 pt-4 d:w-[520px]"
	>

		{/* Amount input with sign toggle button */}
		<div className="flex gap-2">
			<Button
				type="button"
				style={{ width: "2.5rem" }}
				color={watchSign === "+" ? "success" : "danger"}
				variant="flat"
				onClick={() => {
					setValue("sign", watchSign === "+" ? "-" : "+");
					document.getElementById("amount")?.focus()
				}}
			>
				<Icon.Material icon={watchSign === "+" ? "add" : "remove"} size={18} />
			</Button>
			<Input
				style={{ borderTopLeftRadius: 0 }}
				id="amount"
				{...register("amount")}
				placeholder="Amount"
				fullWidth
				error={!!errors.amount}
				endLabel={currency}
				autoFocus
			/>
		</div>

		{/* Category input */}
		<div className="flex gap-2">
			<Button
				type="button"
				style={{ width: "2.5rem" }}
				color="monochrome"
				variant="flat"
			>
				{previewCategoryIcon}
			</Button>
			<Autocomplete
				className="w-full"
				value={watchCategory}
				onChange={v => { if (typeof v === "string") setValue("category", v) }}
			>
				<Autocomplete.Input
					fullWidth
					placeholder="Enter a category..."
					onChange={e => setValue("category", e.target.value)}
					error={!!errors.category}
				/>

				<Autocomplete.Options maxHeight={180}>
					{
						filteredCategories.map(category => <Autocomplete.Option
							key={category.id}
							value={category.name}
						>
							<div className="flex items-center gap-2 w-full">
								<span>{getDefaultedCategoryIcon(category, watchSign)}</span>
								<span>{category.name}</span>
							</div>
						</Autocomplete.Option>)
					}
				</Autocomplete.Options>
			</Autocomplete>
		</div>

		{/* Comment input */}
		<div>
			<Input
				{...register("comment")}
				fullWidth
				placeholder="Description"
				error={!!errors.comment}
				endIcon={<Icon.Material icon="notes" />}
			/>
		</div>

		{/* Date input */}
		<div>
			<Input
				{...register("date")}
				fullWidth
				type="date"
				className="text-right"
				error={!!errors.date}
				endIcon={<Icon.Material icon="calendar_today" />}
			/>
		</div>

		{
			scheduleEditor.isOpen && <div className="flex flex-col gap-4 -mb-4">
				<Divider />
				<div className="flex items-center gap-4 space-between">
					<Switch
						id="scheduleEnabled"
						value={form.watch("scheduleEnabled")}
						onChange={value => setValue("scheduleEnabled", value)}
					/>
					<label htmlFor="scheduleEnabled">
						Repeat every
					</label>
				</div>
				<div className="flex items-center gap-4 space-between">
					<div className="flex-1">
						<IntegerInput
							disabled={!form.watch("scheduleEnabled")}
							value={form.watch("scheduleEvery")}
							onChange={value => setValue("scheduleEvery", value)}
							min={0}
							error={!!errors.scheduleEvery}
							{...selectProperties(register("scheduleEvery"), ["onBlur"])}
						/>
					</div>
					<div className="flex-[2]">
						<Select<IntervalType>
							renderValue={(value) => capitalize(pluralize(form.watch("scheduleEvery"), value.toLowerCase()))}
							value={form.watch("scheduleIntervals")}
							onChange={value => setValue("scheduleIntervals", value)}
							disabled={!form.watch("scheduleEnabled")}
							{...selectProperties(register("scheduleIntervals"), ["onBlur"])}
						>
							<Select.Option<IntervalType> value="DAY">
								{pluralize(form.watch("scheduleEvery"), "Day")}
							</Select.Option>
							<Select.Option<IntervalType> value="WEEK">
								{pluralize(form.watch("scheduleEvery"), "Week")}
							</Select.Option>
							<Select.Option<IntervalType> value="MONTH">
								{pluralize(form.watch("scheduleEvery"), "Month")}
							</Select.Option>
							<Select.Option<IntervalType> value="YEAR">
								{pluralize(form.watch("scheduleEvery"), "Year")}
							</Select.Option>
						</Select>
					</div>
				</div>
				<div className="flex items-center gap-4 space-between">
					<Switch
						id="scheduleOccurrencesEnabled"
						value={form.watch("scheduleEnabled") && form.watch("scheduleOccurrencesEnabled")}
						onChange={value => {
							if (form.watch("scheduleEnabled")) {
								setValue("scheduleOccurrencesEnabled", value)
							}
						}}
					/>
					<label htmlFor="scheduleOccurrencesEnabled">
						End after
					</label>
				</div>
				<div className="flex items-center gap-4 space-between">
					<div className="flex-1">
						<IntegerInput
							disabled={!form.watch("scheduleEnabled") || !form.watch("scheduleOccurrencesEnabled")}
							value={form.watch("scheduleOccurrences")}
							onChange={value => setValue("scheduleOccurrences", value)}
							min={0}
							error={!!errors.scheduleOccurrences}
							{...selectProperties(register("scheduleOccurrences"), ["onBlur"])}
						/>
					</div>
					<div className="flex-[2]">
						occurrences
					</div>
				</div>
				<Divider />
			</div>
		}

		{/* Submit button */}
		<div className="flex gap-4 pt-4">
			{
				!props.disableScheduleForm &&
				<Button type="button" onClick={scheduleEditor.toggle} variant="flat">
					<Icon.Material icon={scheduleEditor.isOpen ? "unfold_less" : "unfold_more"} />
				</Button>
			}

			<Button type="submit" className="w-full">
				Create
			</Button>
		</div>
	</form >
}