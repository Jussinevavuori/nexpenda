// This file defines common TypeScript generic utility types

/**
 * Array<T | undefined>.filter(Boolean) => Array<T>
 */
interface Array<T> {
  filter(predicate: BooleanConstructor): NonNullable<T>[];
}

/**
 * Utility type to extract the resolved value T
 * from a promise of type Promise<T>
 */
type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * Utility type to extract the resolved value T
 * from a promise of type Promise<T>
 */
type Unwrap<T> = T extends PromiseLike<infer U>
  ? U
  : T extends Array<infer U>
  ? U
  : T;

/**
 * Utility type that creates a type that is either of type T or
 * Promise<T>
 */
type MaybePromise<T> = T | Promise<T>;

/**
 * Array which contains at least one element of type T
 */
type NonEmptyArray<T> = [T, ...T[]];

/**
 * Maybe array is either a single item or an array of items
 */
type MaybeArray<T> = T | Array<T>;

/**
 * Key combination
 */
type KeyCombination = {
  key: string;
  alt?: boolean;
  shift?: boolean;
  ctrl?: boolean;
};

/**
 * Setter
 */
type Setter<T> = T | ((t: T) => T);

/**
 * Action type for reducers
 */
type ReducerAction<TType extends string, TData> = { type: TType; data: TData };

/**
 * Sorting direction
 */
type SortDirection = "asc" | "desc" | "none";
