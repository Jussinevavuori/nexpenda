import { groupByDate } from './groupByDate';

type SortFn<T> = (a: T, b: T) => number;
type DateGroup<T> = { date: Date; items: T[] };
type FlatItem<T> =
  | {
      type: "groupHeader";
      value: Date;
    }
  | {
      type: "item";
      value: T;
    };

/**
 * Groups items (where items can be associated with a Date object)
 * by their date in a flat list which contains both items and group headers.
 *
 * @param items All items to group
 * @param getDate Function to associate an item with its date
 * @param options Options
 */
export function flatGroupByDate<T>(
  items: T[],
  getDate: (t: T) => Date,
  options?: {
    sort?: boolean | "reverse" | SortFn<DateGroup<T>>;
    sortGroups?: boolean | "reverse" | SortFn<T>;
  }
) {
  const groups = groupByDate(items, getDate, options);

  const result: FlatItem<T>[] = [];

  groups.forEach((group) => {
    result.push({
      type: "groupHeader",
      value: group.date,
    });

    group.items.forEach((item) => {
      result.push({
        type: "item",
        value: item,
      });
    });
  });

  return result;
}
