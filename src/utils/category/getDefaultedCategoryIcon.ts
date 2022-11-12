export const defaultCategoryIcons = {
  income: "💰",
  expense: "💸",
};

/**
 * Return a category's icon if it has one. If not, return either the default
 * income or expense icon based on the given sign. If no sign is given, default
 * to the expense icon.
 */
export function getDefaultedCategoryIcon<
  CategoryLike extends { icon?: string | null | undefined } | undefined
>(category: CategoryLike, sign: number | "+" | "-" | "inc" | "exp" = "-") {
  const isPositive =
    typeof sign === "number" ? sign > 0 : sign === "+" || sign === "inc";
  return (
    category?.icon || defaultCategoryIcons[isPositive ? "income" : "expense"]
  );
}
