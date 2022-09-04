export function allRejected<T>(promises: PromiseSettledResult<Awaited<T>>[]) {
  const reasons: T[] = [];

  for (const promise of promises) {
    if (promise.status === "rejected") {
      reasons.push(promise.reason);
    }
  }

  return reasons;
}
