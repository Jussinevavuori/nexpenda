import { getDefaultedCategoryIcon } from "./getDefaultedCategoryIcon";

/**
 * Get the full label of the category, which includes the name and the icon.
 * Uses a defaulted icon, using the given sign.
 */
export function getCategoryLabel<
  CategoryLike extends { icon?: string | null | undefined; name: string }
>(
  category: CategoryLike,
  sign: number | "-" | "+",
  reverseIconPosition?: boolean
) {
  if (reverseIconPosition) {
    return `${category.name} ${getDefaultedCategoryIcon(category, sign)}`;
  } else {
    return `${getDefaultedCategoryIcon(category, sign)} ${category.name}`;
  }
}
