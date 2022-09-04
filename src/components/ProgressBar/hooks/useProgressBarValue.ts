import { ProgressBarPubSub } from "../utils/ProgressBarPubSub";
import { useEffect, useState } from "react";
import { clamp } from "@/utils/generic/clamp";

export function useProgressBarValue(
  progress: string | { value: number; target: number }
) {
  // Get pubsub progress
  const [pubsubProgress, setPubsubProgress] = useState<{
    target: number;
    value: number;
  }>({ value: 0, target: 0 });

  // Subscribe to progress and update
  useEffect(() => {
    if (typeof progress !== "string") return;
    return ProgressBarPubSub.subscribe(({ key, value, target }) => {
      if (key === progress) setPubsubProgress({ value, target });
    });
  }, [progress, setPubsubProgress]);

  // Resolved progress, clamp between 0 and 1
  const resolvedProgress = clamp(
    typeof progress === "string"
      ? pubsubProgress.value / (pubsubProgress.target || 1)
      : progress.value / (progress.target || 1),
    0,
    1
  );

  // Resolve value
  const resolvedValue =
    typeof progress === "string" ? pubsubProgress.value : progress.value;
  const resolvedTarget =
    typeof progress === "string" ? pubsubProgress.target : progress.target;

  return {
    progress: resolvedProgress,
    target: resolvedTarget,
    value: resolvedValue,
  };
}
