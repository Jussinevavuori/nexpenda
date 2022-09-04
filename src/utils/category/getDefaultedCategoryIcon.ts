export const defaultCategoryIcons = {
  income: "💰",
  expense: "💸",
};

/**
 * Return a category's icon if it has one. If not, return either the default
 * income or expense icon based on the given sign. If no sign is given, default
 * to the expense icon.
 */
export function getDefaultedCategoryIcon(
  category: CategoryItem,
  sign: number | "+" | "-" = "-"
) {
  const isPositive = typeof sign === "number" ? sign > 0 : sign === "+";
  return (
    category.icon || defaultCategoryIcons[isPositive ? "income" : "expense"]
  );
}
