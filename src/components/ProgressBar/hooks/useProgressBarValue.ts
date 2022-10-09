import { ProgressBarPubSub } from "../utils/ProgressBarPubSub";
import { useEffect, useState } from "react";
import { clamp } from "@/utils/generic/clamp";

export type ProgressInput = number | string | { value: number; target: number };

export function useProgressBarValue(progress: ProgressInput) {
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

  return {
    progress: resolveProgress(progress, pubsubProgress),
    target: resolveTarget(progress, pubsubProgress),
    value: resolveValue(progress, pubsubProgress),
  };
}

function resolveProgress(
  progress: ProgressInput,
  pubsubProgress: { target: number; value: number }
) {
  switch (typeof progress) {
    case "string":
      return clamp(pubsubProgress.value / (pubsubProgress.target || 1), 0, 1);
    case "number":
      return clamp(progress, 0, 1);
    default:
      return clamp(progress.value / (progress.target || 1), 0, 1);
  }
}

function resolveValue(
  progress: ProgressInput,
  pubsubProgress: { target: number; value: number }
) {
  switch (typeof progress) {
    case "string":
      return pubsubProgress.value;
    case "number":
      return progress;
    default:
      return progress.value;
  }
}

function resolveTarget(
  progress: ProgressInput,
  pubsubProgress: { target: number; value: number }
) {
  switch (typeof progress) {
    case "string":
      return pubsubProgress.target;
    case "number":
      return 1;
    default:
      return progress.target;
  }
}
