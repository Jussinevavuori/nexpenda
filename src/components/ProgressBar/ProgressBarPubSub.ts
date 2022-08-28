import { createSubscribable } from "@/utils/subscribable";

export const ProgressBarPubSub = createSubscribable<{
  /**
   * Key of which progress is being updated
   */
  key: string;
  /**
   * Current value
   */
  value: number;
  /**
   * Current target value
   */
  target: number;
}>();
