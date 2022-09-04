export function allFulfilled<T>(promises: PromiseSettledResult<Awaited<T>>[]) {
  const settledValues: T[] = [];

  for (const promise of promises) {
    if (promise.status === "fulfilled") {
      settledValues.push(promise.value);
    }
  }

  return settledValues;
}
