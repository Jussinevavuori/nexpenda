import { addYears, startOfDay } from "date-fns";

/**
 * When working with schedules, consider today + 10 years as the maximum
 * possible date.
 */
export const LAST_CONSIDERED_DAY = startOfDay(addYears(new Date(), 10));
