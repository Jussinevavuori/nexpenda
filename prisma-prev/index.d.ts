
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model DbUser
 * 
 */
export type DbUser = {
  id: string
  email: string | null
  emailVerified: boolean
  password: string | null
  tokenVersion: number
  disabled: boolean
  isAdmin: boolean
  googleId: string | null
  stripeCustomerId: string | null
  displayName: string | null
  photoUrl: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model DbUserPreference
 * 
 */
export type DbUserPreference = {
  uid: string
  key: string
  value: string
}

/**
 * Model DbTransaction
 * 
 */
export type DbTransaction = {
  id: string
  uid: string
  categoryId: string
  comment: string | null
  integerAmount: number
  time: Date
  createdAt: Date
  updatedAt: Date
  scheduleId: string | null
}

/**
 * Model DbTransactionSchedule
 * 
 */
export type DbTransactionSchedule = {
  id: string
  uid: string
  categoryId: string
  comment: string | null
  integerAmount: number
  intervalType: IntervalType
  intervalEvery: number
  firstOccurrence: Date
  occurrences: number | null
  createdAt: Date
  updatedAt: Date
  latestCreatedOccurrence: Date | null
}

/**
 * Model DbCategory
 * 
 */
export type DbCategory = {
  id: string
  uid: string
  value: string
  icon: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model DbFeedback
 * 
 */
export type DbFeedback = {
  id: string
  uid: string
  message: string | null
}

/**
 * Model DbConfig
 * 
 */
export type DbConfig = {
  key: string
  value: string
}

/**
 * Model DbPremiumPrice
 * 
 */
export type DbPremiumPrice = {
  id: string
  unitAmount: number | null
  productId: string
  active: boolean
  currency: string
  nickname: string | null
  type: string
  recurringInterval: string | null
  recurringIntervalCount: number | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model DbScheduledTask
 * 
 */
export type DbScheduledTask = {
  id: string
  latest: Date
  createdAt: Date
  updatedAt: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const IntervalType: {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
};

export type IntervalType = (typeof IntervalType)[keyof typeof IntervalType]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DbUsers
 * const dbUsers = await prisma.dbUser.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DbUsers
   * const dbUsers = await prisma.dbUser.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.dbUser`: Exposes CRUD operations for the **DbUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbUsers
    * const dbUsers = await prisma.dbUser.findMany()
    * ```
    */
  get dbUser(): Prisma.DbUserDelegate<GlobalReject>;

  /**
   * `prisma.dbUserPreference`: Exposes CRUD operations for the **DbUserPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbUserPreferences
    * const dbUserPreferences = await prisma.dbUserPreference.findMany()
    * ```
    */
  get dbUserPreference(): Prisma.DbUserPreferenceDelegate<GlobalReject>;

  /**
   * `prisma.dbTransaction`: Exposes CRUD operations for the **DbTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbTransactions
    * const dbTransactions = await prisma.dbTransaction.findMany()
    * ```
    */
  get dbTransaction(): Prisma.DbTransactionDelegate<GlobalReject>;

  /**
   * `prisma.dbTransactionSchedule`: Exposes CRUD operations for the **DbTransactionSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbTransactionSchedules
    * const dbTransactionSchedules = await prisma.dbTransactionSchedule.findMany()
    * ```
    */
  get dbTransactionSchedule(): Prisma.DbTransactionScheduleDelegate<GlobalReject>;

  /**
   * `prisma.dbCategory`: Exposes CRUD operations for the **DbCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbCategories
    * const dbCategories = await prisma.dbCategory.findMany()
    * ```
    */
  get dbCategory(): Prisma.DbCategoryDelegate<GlobalReject>;

  /**
   * `prisma.dbFeedback`: Exposes CRUD operations for the **DbFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbFeedbacks
    * const dbFeedbacks = await prisma.dbFeedback.findMany()
    * ```
    */
  get dbFeedback(): Prisma.DbFeedbackDelegate<GlobalReject>;

  /**
   * `prisma.dbConfig`: Exposes CRUD operations for the **DbConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbConfigs
    * const dbConfigs = await prisma.dbConfig.findMany()
    * ```
    */
  get dbConfig(): Prisma.DbConfigDelegate<GlobalReject>;

  /**
   * `prisma.dbPremiumPrice`: Exposes CRUD operations for the **DbPremiumPrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbPremiumPrices
    * const dbPremiumPrices = await prisma.dbPremiumPrice.findMany()
    * ```
    */
  get dbPremiumPrice(): Prisma.DbPremiumPriceDelegate<GlobalReject>;

  /**
   * `prisma.dbScheduledTask`: Exposes CRUD operations for the **DbScheduledTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbScheduledTasks
    * const dbScheduledTasks = await prisma.dbScheduledTask.findMany()
    * ```
    */
  get dbScheduledTask(): Prisma.DbScheduledTaskDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.2.1
   * Query Engine version: 2920a97877e12e055c1333079b8d19cee7f33826
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    DbUser: 'DbUser',
    DbUserPreference: 'DbUserPreference',
    DbTransaction: 'DbTransaction',
    DbTransactionSchedule: 'DbTransactionSchedule',
    DbCategory: 'DbCategory',
    DbFeedback: 'DbFeedback',
    DbConfig: 'DbConfig',
    DbPremiumPrice: 'DbPremiumPrice',
    DbScheduledTask: 'DbScheduledTask'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    postgresql?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DbUserCountOutputType
   */


  export type DbUserCountOutputType = {
    Transactions: number
    Categories: number
    Feedback: number
    TransactionSchedule: number
    Preferences: number
  }

  export type DbUserCountOutputTypeSelect = {
    Transactions?: boolean
    Categories?: boolean
    Feedback?: boolean
    TransactionSchedule?: boolean
    Preferences?: boolean
  }

  export type DbUserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | DbUserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? DbUserCountOutputType
    : S extends undefined
    ? never
    : S extends DbUserCountOutputTypeArgs
    ?'include' extends U
    ? DbUserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DbUserCountOutputType ? DbUserCountOutputType[P] : never
  } 
    : DbUserCountOutputType
  : DbUserCountOutputType




  // Custom InputTypes

  /**
   * DbUserCountOutputType without action
   */
  export type DbUserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DbUserCountOutputType
     * 
    **/
    select?: DbUserCountOutputTypeSelect | null
  }



  /**
   * Count Type DbTransactionScheduleCountOutputType
   */


  export type DbTransactionScheduleCountOutputType = {
    Transactions: number
  }

  export type DbTransactionScheduleCountOutputTypeSelect = {
    Transactions?: boolean
  }

  export type DbTransactionScheduleCountOutputTypeGetPayload<
    S extends boolean | null | undefined | DbTransactionScheduleCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? DbTransactionScheduleCountOutputType
    : S extends undefined
    ? never
    : S extends DbTransactionScheduleCountOutputTypeArgs
    ?'include' extends U
    ? DbTransactionScheduleCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DbTransactionScheduleCountOutputType ? DbTransactionScheduleCountOutputType[P] : never
  } 
    : DbTransactionScheduleCountOutputType
  : DbTransactionScheduleCountOutputType




  // Custom InputTypes

  /**
   * DbTransactionScheduleCountOutputType without action
   */
  export type DbTransactionScheduleCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DbTransactionScheduleCountOutputType
     * 
    **/
    select?: DbTransactionScheduleCountOutputTypeSelect | null
  }



  /**
   * Count Type DbCategoryCountOutputType
   */


  export type DbCategoryCountOutputType = {
    Transactions: number
    TransactionSchedule: number
  }

  export type DbCategoryCountOutputTypeSelect = {
    Transactions?: boolean
    TransactionSchedule?: boolean
  }

  export type DbCategoryCountOutputTypeGetPayload<
    S extends boolean | null | undefined | DbCategoryCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? DbCategoryCountOutputType
    : S extends undefined
    ? never
    : S extends DbCategoryCountOutputTypeArgs
    ?'include' extends U
    ? DbCategoryCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DbCategoryCountOutputType ? DbCategoryCountOutputType[P] : never
  } 
    : DbCategoryCountOutputType
  : DbCategoryCountOutputType




  // Custom InputTypes

  /**
   * DbCategoryCountOutputType without action
   */
  export type DbCategoryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DbCategoryCountOutputType
     * 
    **/
    select?: DbCategoryCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model DbUser
   */


  export type AggregateDbUser = {
    _count: DbUserCountAggregateOutputType | null
    _avg: DbUserAvgAggregateOutputType | null
    _sum: DbUserSumAggregateOutputType | null
    _min: DbUserMinAggregateOutputType | null
    _max: DbUserMaxAggregateOutputType | null
  }

  export type DbUserAvgAggregateOutputType = {
    tokenVersion: number | null
  }

  export type DbUserSumAggregateOutputType = {
    tokenVersion: number | null
  }

  export type DbUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: boolean | null
    password: string | null
    tokenVersion: number | null
    disabled: boolean | null
    isAdmin: boolean | null
    googleId: string | null
    stripeCustomerId: string | null
    displayName: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: boolean | null
    password: string | null
    tokenVersion: number | null
    disabled: boolean | null
    isAdmin: boolean | null
    googleId: string | null
    stripeCustomerId: string | null
    displayName: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbUserCountAggregateOutputType = {
    id: number
    email: number
    emailVerified: number
    password: number
    tokenVersion: number
    disabled: number
    isAdmin: number
    googleId: number
    stripeCustomerId: number
    displayName: number
    photoUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DbUserAvgAggregateInputType = {
    tokenVersion?: true
  }

  export type DbUserSumAggregateInputType = {
    tokenVersion?: true
  }

  export type DbUserMinAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    password?: true
    tokenVersion?: true
    disabled?: true
    isAdmin?: true
    googleId?: true
    stripeCustomerId?: true
    displayName?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbUserMaxAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    password?: true
    tokenVersion?: true
    disabled?: true
    isAdmin?: true
    googleId?: true
    stripeCustomerId?: true
    displayName?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbUserCountAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    password?: true
    tokenVersion?: true
    disabled?: true
    isAdmin?: true
    googleId?: true
    stripeCustomerId?: true
    displayName?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DbUserAggregateArgs = {
    /**
     * Filter which DbUser to aggregate.
     * 
    **/
    where?: DbUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbUsers to fetch.
     * 
    **/
    orderBy?: Enumerable<DbUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbUsers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbUsers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbUsers
    **/
    _count?: true | DbUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DbUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DbUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbUserMaxAggregateInputType
  }

  export type GetDbUserAggregateType<T extends DbUserAggregateArgs> = {
        [P in keyof T & keyof AggregateDbUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbUser[P]>
      : GetScalarType<T[P], AggregateDbUser[P]>
  }




  export type DbUserGroupByArgs = {
    where?: DbUserWhereInput
    orderBy?: Enumerable<DbUserOrderByWithAggregationInput>
    by: Array<DbUserScalarFieldEnum>
    having?: DbUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbUserCountAggregateInputType | true
    _avg?: DbUserAvgAggregateInputType
    _sum?: DbUserSumAggregateInputType
    _min?: DbUserMinAggregateInputType
    _max?: DbUserMaxAggregateInputType
  }


  export type DbUserGroupByOutputType = {
    id: string
    email: string | null
    emailVerified: boolean
    password: string | null
    tokenVersion: number
    disabled: boolean
    isAdmin: boolean
    googleId: string | null
    stripeCustomerId: string | null
    displayName: string | null
    photoUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: DbUserCountAggregateOutputType | null
    _avg: DbUserAvgAggregateOutputType | null
    _sum: DbUserSumAggregateOutputType | null
    _min: DbUserMinAggregateOutputType | null
    _max: DbUserMaxAggregateOutputType | null
  }

  type GetDbUserGroupByPayload<T extends DbUserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbUserGroupByOutputType[P]>
            : GetScalarType<T[P], DbUserGroupByOutputType[P]>
        }
      >
    >


  export type DbUserSelect = {
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    password?: boolean
    tokenVersion?: boolean
    disabled?: boolean
    isAdmin?: boolean
    googleId?: boolean
    stripeCustomerId?: boolean
    displayName?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Transactions?: boolean | DbTransactionFindManyArgs
    Categories?: boolean | DbCategoryFindManyArgs
    Feedback?: boolean | DbFeedbackFindManyArgs
    TransactionSchedule?: boolean | DbTransactionScheduleFindManyArgs
    Preferences?: boolean | DbUserPreferenceFindManyArgs
    _count?: boolean | DbUserCountOutputTypeArgs
  }

  export type DbUserInclude = {
    Transactions?: boolean | DbTransactionFindManyArgs
    Categories?: boolean | DbCategoryFindManyArgs
    Feedback?: boolean | DbFeedbackFindManyArgs
    TransactionSchedule?: boolean | DbTransactionScheduleFindManyArgs
    Preferences?: boolean | DbUserPreferenceFindManyArgs
    _count?: boolean | DbUserCountOutputTypeArgs
  }

  export type DbUserGetPayload<
    S extends boolean | null | undefined | DbUserArgs,
    U = keyof S
      > = S extends true
        ? DbUser
    : S extends undefined
    ? never
    : S extends DbUserArgs | DbUserFindManyArgs
    ?'include' extends U
    ? DbUser  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Transactions' ? Array < DbTransactionGetPayload<S['include'][P]>>  :
        P extends 'Categories' ? Array < DbCategoryGetPayload<S['include'][P]>>  :
        P extends 'Feedback' ? Array < DbFeedbackGetPayload<S['include'][P]>>  :
        P extends 'TransactionSchedule' ? Array < DbTransactionScheduleGetPayload<S['include'][P]>>  :
        P extends 'Preferences' ? Array < DbUserPreferenceGetPayload<S['include'][P]>>  :
        P extends '_count' ? DbUserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Transactions' ? Array < DbTransactionGetPayload<S['select'][P]>>  :
        P extends 'Categories' ? Array < DbCategoryGetPayload<S['select'][P]>>  :
        P extends 'Feedback' ? Array < DbFeedbackGetPayload<S['select'][P]>>  :
        P extends 'TransactionSchedule' ? Array < DbTransactionScheduleGetPayload<S['select'][P]>>  :
        P extends 'Preferences' ? Array < DbUserPreferenceGetPayload<S['select'][P]>>  :
        P extends '_count' ? DbUserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof DbUser ? DbUser[P] : never
  } 
    : DbUser
  : DbUser


  type DbUserCountArgs = Merge<
    Omit<DbUserFindManyArgs, 'select' | 'include'> & {
      select?: DbUserCountAggregateInputType | true
    }
  >

  export interface DbUserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbUser that matches the filter.
     * @param {DbUserFindUniqueArgs} args - Arguments to find a DbUser
     * @example
     * // Get one DbUser
     * const dbUser = await prisma.dbUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbUserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbUserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbUser'> extends True ? CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>> : CheckSelect<T, Prisma__DbUserClient<DbUser | null >, Prisma__DbUserClient<DbUserGetPayload<T> | null >>

    /**
     * Find the first DbUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserFindFirstArgs} args - Arguments to find a DbUser
     * @example
     * // Get one DbUser
     * const dbUser = await prisma.dbUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbUserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbUserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbUser'> extends True ? CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>> : CheckSelect<T, Prisma__DbUserClient<DbUser | null >, Prisma__DbUserClient<DbUserGetPayload<T> | null >>

    /**
     * Find zero or more DbUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbUsers
     * const dbUsers = await prisma.dbUser.findMany()
     * 
     * // Get first 10 DbUsers
     * const dbUsers = await prisma.dbUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbUserWithIdOnly = await prisma.dbUser.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DbUserFindManyArgs>(
      args?: SelectSubset<T, DbUserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbUser>>, PrismaPromise<Array<DbUserGetPayload<T>>>>

    /**
     * Create a DbUser.
     * @param {DbUserCreateArgs} args - Arguments to create a DbUser.
     * @example
     * // Create one DbUser
     * const DbUser = await prisma.dbUser.create({
     *   data: {
     *     // ... data to create a DbUser
     *   }
     * })
     * 
    **/
    create<T extends DbUserCreateArgs>(
      args: SelectSubset<T, DbUserCreateArgs>
    ): CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>>

    /**
     * Create many DbUsers.
     *     @param {DbUserCreateManyArgs} args - Arguments to create many DbUsers.
     *     @example
     *     // Create many DbUsers
     *     const dbUser = await prisma.dbUser.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbUserCreateManyArgs>(
      args?: SelectSubset<T, DbUserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbUser.
     * @param {DbUserDeleteArgs} args - Arguments to delete one DbUser.
     * @example
     * // Delete one DbUser
     * const DbUser = await prisma.dbUser.delete({
     *   where: {
     *     // ... filter to delete one DbUser
     *   }
     * })
     * 
    **/
    delete<T extends DbUserDeleteArgs>(
      args: SelectSubset<T, DbUserDeleteArgs>
    ): CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>>

    /**
     * Update one DbUser.
     * @param {DbUserUpdateArgs} args - Arguments to update one DbUser.
     * @example
     * // Update one DbUser
     * const dbUser = await prisma.dbUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbUserUpdateArgs>(
      args: SelectSubset<T, DbUserUpdateArgs>
    ): CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>>

    /**
     * Delete zero or more DbUsers.
     * @param {DbUserDeleteManyArgs} args - Arguments to filter DbUsers to delete.
     * @example
     * // Delete a few DbUsers
     * const { count } = await prisma.dbUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbUserDeleteManyArgs>(
      args?: SelectSubset<T, DbUserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbUsers
     * const dbUser = await prisma.dbUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbUserUpdateManyArgs>(
      args: SelectSubset<T, DbUserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbUser.
     * @param {DbUserUpsertArgs} args - Arguments to update or create a DbUser.
     * @example
     * // Update or create a DbUser
     * const dbUser = await prisma.dbUser.upsert({
     *   create: {
     *     // ... data to create a DbUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbUser we want to update
     *   }
     * })
    **/
    upsert<T extends DbUserUpsertArgs>(
      args: SelectSubset<T, DbUserUpsertArgs>
    ): CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>>

    /**
     * Find one DbUser that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbUserFindUniqueOrThrowArgs} args - Arguments to find a DbUser
     * @example
     * // Get one DbUser
     * const dbUser = await prisma.dbUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbUserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbUserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>>

    /**
     * Find the first DbUser that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserFindFirstOrThrowArgs} args - Arguments to find a DbUser
     * @example
     * // Get one DbUser
     * const dbUser = await prisma.dbUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbUserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbUserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbUserClient<DbUser>, Prisma__DbUserClient<DbUserGetPayload<T>>>

    /**
     * Count the number of DbUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserCountArgs} args - Arguments to filter DbUsers to count.
     * @example
     * // Count the number of DbUsers
     * const count = await prisma.dbUser.count({
     *   where: {
     *     // ... the filter for the DbUsers we want to count
     *   }
     * })
    **/
    count<T extends DbUserCountArgs>(
      args?: Subset<T, DbUserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbUserAggregateArgs>(args: Subset<T, DbUserAggregateArgs>): PrismaPromise<GetDbUserAggregateType<T>>

    /**
     * Group by DbUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbUserGroupByArgs['orderBy'] }
        : { orderBy?: DbUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbUserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Transactions<T extends DbTransactionFindManyArgs = {}>(args?: Subset<T, DbTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbTransaction>>, PrismaPromise<Array<DbTransactionGetPayload<T>>>>;

    Categories<T extends DbCategoryFindManyArgs = {}>(args?: Subset<T, DbCategoryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbCategory>>, PrismaPromise<Array<DbCategoryGetPayload<T>>>>;

    Feedback<T extends DbFeedbackFindManyArgs = {}>(args?: Subset<T, DbFeedbackFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbFeedback>>, PrismaPromise<Array<DbFeedbackGetPayload<T>>>>;

    TransactionSchedule<T extends DbTransactionScheduleFindManyArgs = {}>(args?: Subset<T, DbTransactionScheduleFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbTransactionSchedule>>, PrismaPromise<Array<DbTransactionScheduleGetPayload<T>>>>;

    Preferences<T extends DbUserPreferenceFindManyArgs = {}>(args?: Subset<T, DbUserPreferenceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbUserPreference>>, PrismaPromise<Array<DbUserPreferenceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbUser base type for findUnique actions
   */
  export type DbUserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
    /**
     * Filter, which DbUser to fetch.
     * 
    **/
    where: DbUserWhereUniqueInput
  }

  /**
   * DbUser: findUnique
   */
  export interface DbUserFindUniqueArgs extends DbUserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbUser base type for findFirst actions
   */
  export type DbUserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
    /**
     * Filter, which DbUser to fetch.
     * 
    **/
    where?: DbUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbUsers to fetch.
     * 
    **/
    orderBy?: Enumerable<DbUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbUsers.
     * 
    **/
    cursor?: DbUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbUsers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbUsers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbUsers.
     * 
    **/
    distinct?: Enumerable<DbUserScalarFieldEnum>
  }

  /**
   * DbUser: findFirst
   */
  export interface DbUserFindFirstArgs extends DbUserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbUser findMany
   */
  export type DbUserFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
    /**
     * Filter, which DbUsers to fetch.
     * 
    **/
    where?: DbUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbUsers to fetch.
     * 
    **/
    orderBy?: Enumerable<DbUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbUsers.
     * 
    **/
    cursor?: DbUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbUsers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbUsers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbUserScalarFieldEnum>
  }


  /**
   * DbUser create
   */
  export type DbUserCreateArgs = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
    /**
     * The data needed to create a DbUser.
     * 
    **/
    data: XOR<DbUserCreateInput, DbUserUncheckedCreateInput>
  }


  /**
   * DbUser createMany
   */
  export type DbUserCreateManyArgs = {
    /**
     * The data used to create many DbUsers.
     * 
    **/
    data: Enumerable<DbUserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbUser update
   */
  export type DbUserUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
    /**
     * The data needed to update a DbUser.
     * 
    **/
    data: XOR<DbUserUpdateInput, DbUserUncheckedUpdateInput>
    /**
     * Choose, which DbUser to update.
     * 
    **/
    where: DbUserWhereUniqueInput
  }


  /**
   * DbUser updateMany
   */
  export type DbUserUpdateManyArgs = {
    /**
     * The data used to update DbUsers.
     * 
    **/
    data: XOR<DbUserUpdateManyMutationInput, DbUserUncheckedUpdateManyInput>
    /**
     * Filter which DbUsers to update
     * 
    **/
    where?: DbUserWhereInput
  }


  /**
   * DbUser upsert
   */
  export type DbUserUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
    /**
     * The filter to search for the DbUser to update in case it exists.
     * 
    **/
    where: DbUserWhereUniqueInput
    /**
     * In case the DbUser found by the `where` argument doesn't exist, create a new DbUser with this data.
     * 
    **/
    create: XOR<DbUserCreateInput, DbUserUncheckedCreateInput>
    /**
     * In case the DbUser was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbUserUpdateInput, DbUserUncheckedUpdateInput>
  }


  /**
   * DbUser delete
   */
  export type DbUserDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
    /**
     * Filter which DbUser to delete.
     * 
    **/
    where: DbUserWhereUniqueInput
  }


  /**
   * DbUser deleteMany
   */
  export type DbUserDeleteManyArgs = {
    /**
     * Filter which DbUsers to delete
     * 
    **/
    where?: DbUserWhereInput
  }


  /**
   * DbUser: findUniqueOrThrow
   */
  export type DbUserFindUniqueOrThrowArgs = DbUserFindUniqueArgsBase
      

  /**
   * DbUser: findFirstOrThrow
   */
  export type DbUserFindFirstOrThrowArgs = DbUserFindFirstArgsBase
      

  /**
   * DbUser without action
   */
  export type DbUserArgs = {
    /**
     * Select specific fields to fetch from the DbUser
     * 
    **/
    select?: DbUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserInclude | null
  }



  /**
   * Model DbUserPreference
   */


  export type AggregateDbUserPreference = {
    _count: DbUserPreferenceCountAggregateOutputType | null
    _min: DbUserPreferenceMinAggregateOutputType | null
    _max: DbUserPreferenceMaxAggregateOutputType | null
  }

  export type DbUserPreferenceMinAggregateOutputType = {
    uid: string | null
    key: string | null
    value: string | null
  }

  export type DbUserPreferenceMaxAggregateOutputType = {
    uid: string | null
    key: string | null
    value: string | null
  }

  export type DbUserPreferenceCountAggregateOutputType = {
    uid: number
    key: number
    value: number
    _all: number
  }


  export type DbUserPreferenceMinAggregateInputType = {
    uid?: true
    key?: true
    value?: true
  }

  export type DbUserPreferenceMaxAggregateInputType = {
    uid?: true
    key?: true
    value?: true
  }

  export type DbUserPreferenceCountAggregateInputType = {
    uid?: true
    key?: true
    value?: true
    _all?: true
  }

  export type DbUserPreferenceAggregateArgs = {
    /**
     * Filter which DbUserPreference to aggregate.
     * 
    **/
    where?: DbUserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbUserPreferences to fetch.
     * 
    **/
    orderBy?: Enumerable<DbUserPreferenceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbUserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbUserPreferences from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbUserPreferences.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbUserPreferences
    **/
    _count?: true | DbUserPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbUserPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbUserPreferenceMaxAggregateInputType
  }

  export type GetDbUserPreferenceAggregateType<T extends DbUserPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateDbUserPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbUserPreference[P]>
      : GetScalarType<T[P], AggregateDbUserPreference[P]>
  }




  export type DbUserPreferenceGroupByArgs = {
    where?: DbUserPreferenceWhereInput
    orderBy?: Enumerable<DbUserPreferenceOrderByWithAggregationInput>
    by: Array<DbUserPreferenceScalarFieldEnum>
    having?: DbUserPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbUserPreferenceCountAggregateInputType | true
    _min?: DbUserPreferenceMinAggregateInputType
    _max?: DbUserPreferenceMaxAggregateInputType
  }


  export type DbUserPreferenceGroupByOutputType = {
    uid: string
    key: string
    value: string
    _count: DbUserPreferenceCountAggregateOutputType | null
    _min: DbUserPreferenceMinAggregateOutputType | null
    _max: DbUserPreferenceMaxAggregateOutputType | null
  }

  type GetDbUserPreferenceGroupByPayload<T extends DbUserPreferenceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbUserPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbUserPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbUserPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], DbUserPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type DbUserPreferenceSelect = {
    uid?: boolean
    key?: boolean
    value?: boolean
    User?: boolean | DbUserArgs
  }

  export type DbUserPreferenceInclude = {
    User?: boolean | DbUserArgs
  }

  export type DbUserPreferenceGetPayload<
    S extends boolean | null | undefined | DbUserPreferenceArgs,
    U = keyof S
      > = S extends true
        ? DbUserPreference
    : S extends undefined
    ? never
    : S extends DbUserPreferenceArgs | DbUserPreferenceFindManyArgs
    ?'include' extends U
    ? DbUserPreference  & {
    [P in TrueKeys<S['include']>]:
        P extends 'User' ? DbUserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'User' ? DbUserGetPayload<S['select'][P]> :  P extends keyof DbUserPreference ? DbUserPreference[P] : never
  } 
    : DbUserPreference
  : DbUserPreference


  type DbUserPreferenceCountArgs = Merge<
    Omit<DbUserPreferenceFindManyArgs, 'select' | 'include'> & {
      select?: DbUserPreferenceCountAggregateInputType | true
    }
  >

  export interface DbUserPreferenceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbUserPreference that matches the filter.
     * @param {DbUserPreferenceFindUniqueArgs} args - Arguments to find a DbUserPreference
     * @example
     * // Get one DbUserPreference
     * const dbUserPreference = await prisma.dbUserPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbUserPreferenceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbUserPreferenceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbUserPreference'> extends True ? CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>> : CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference | null >, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T> | null >>

    /**
     * Find the first DbUserPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserPreferenceFindFirstArgs} args - Arguments to find a DbUserPreference
     * @example
     * // Get one DbUserPreference
     * const dbUserPreference = await prisma.dbUserPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbUserPreferenceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbUserPreferenceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbUserPreference'> extends True ? CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>> : CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference | null >, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T> | null >>

    /**
     * Find zero or more DbUserPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserPreferenceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbUserPreferences
     * const dbUserPreferences = await prisma.dbUserPreference.findMany()
     * 
     * // Get first 10 DbUserPreferences
     * const dbUserPreferences = await prisma.dbUserPreference.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const dbUserPreferenceWithUidOnly = await prisma.dbUserPreference.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends DbUserPreferenceFindManyArgs>(
      args?: SelectSubset<T, DbUserPreferenceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbUserPreference>>, PrismaPromise<Array<DbUserPreferenceGetPayload<T>>>>

    /**
     * Create a DbUserPreference.
     * @param {DbUserPreferenceCreateArgs} args - Arguments to create a DbUserPreference.
     * @example
     * // Create one DbUserPreference
     * const DbUserPreference = await prisma.dbUserPreference.create({
     *   data: {
     *     // ... data to create a DbUserPreference
     *   }
     * })
     * 
    **/
    create<T extends DbUserPreferenceCreateArgs>(
      args: SelectSubset<T, DbUserPreferenceCreateArgs>
    ): CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>>

    /**
     * Create many DbUserPreferences.
     *     @param {DbUserPreferenceCreateManyArgs} args - Arguments to create many DbUserPreferences.
     *     @example
     *     // Create many DbUserPreferences
     *     const dbUserPreference = await prisma.dbUserPreference.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbUserPreferenceCreateManyArgs>(
      args?: SelectSubset<T, DbUserPreferenceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbUserPreference.
     * @param {DbUserPreferenceDeleteArgs} args - Arguments to delete one DbUserPreference.
     * @example
     * // Delete one DbUserPreference
     * const DbUserPreference = await prisma.dbUserPreference.delete({
     *   where: {
     *     // ... filter to delete one DbUserPreference
     *   }
     * })
     * 
    **/
    delete<T extends DbUserPreferenceDeleteArgs>(
      args: SelectSubset<T, DbUserPreferenceDeleteArgs>
    ): CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>>

    /**
     * Update one DbUserPreference.
     * @param {DbUserPreferenceUpdateArgs} args - Arguments to update one DbUserPreference.
     * @example
     * // Update one DbUserPreference
     * const dbUserPreference = await prisma.dbUserPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbUserPreferenceUpdateArgs>(
      args: SelectSubset<T, DbUserPreferenceUpdateArgs>
    ): CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>>

    /**
     * Delete zero or more DbUserPreferences.
     * @param {DbUserPreferenceDeleteManyArgs} args - Arguments to filter DbUserPreferences to delete.
     * @example
     * // Delete a few DbUserPreferences
     * const { count } = await prisma.dbUserPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbUserPreferenceDeleteManyArgs>(
      args?: SelectSubset<T, DbUserPreferenceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbUserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbUserPreferences
     * const dbUserPreference = await prisma.dbUserPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbUserPreferenceUpdateManyArgs>(
      args: SelectSubset<T, DbUserPreferenceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbUserPreference.
     * @param {DbUserPreferenceUpsertArgs} args - Arguments to update or create a DbUserPreference.
     * @example
     * // Update or create a DbUserPreference
     * const dbUserPreference = await prisma.dbUserPreference.upsert({
     *   create: {
     *     // ... data to create a DbUserPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbUserPreference we want to update
     *   }
     * })
    **/
    upsert<T extends DbUserPreferenceUpsertArgs>(
      args: SelectSubset<T, DbUserPreferenceUpsertArgs>
    ): CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>>

    /**
     * Find one DbUserPreference that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbUserPreferenceFindUniqueOrThrowArgs} args - Arguments to find a DbUserPreference
     * @example
     * // Get one DbUserPreference
     * const dbUserPreference = await prisma.dbUserPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbUserPreferenceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbUserPreferenceFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>>

    /**
     * Find the first DbUserPreference that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserPreferenceFindFirstOrThrowArgs} args - Arguments to find a DbUserPreference
     * @example
     * // Get one DbUserPreference
     * const dbUserPreference = await prisma.dbUserPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbUserPreferenceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbUserPreferenceFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbUserPreferenceClient<DbUserPreference>, Prisma__DbUserPreferenceClient<DbUserPreferenceGetPayload<T>>>

    /**
     * Count the number of DbUserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserPreferenceCountArgs} args - Arguments to filter DbUserPreferences to count.
     * @example
     * // Count the number of DbUserPreferences
     * const count = await prisma.dbUserPreference.count({
     *   where: {
     *     // ... the filter for the DbUserPreferences we want to count
     *   }
     * })
    **/
    count<T extends DbUserPreferenceCountArgs>(
      args?: Subset<T, DbUserPreferenceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbUserPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbUserPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbUserPreferenceAggregateArgs>(args: Subset<T, DbUserPreferenceAggregateArgs>): PrismaPromise<GetDbUserPreferenceAggregateType<T>>

    /**
     * Group by DbUserPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbUserPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbUserPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbUserPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: DbUserPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbUserPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbUserPreferenceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbUserPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbUserPreferenceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends DbUserArgs = {}>(args?: Subset<T, DbUserArgs>): CheckSelect<T, Prisma__DbUserClient<DbUser | null >, Prisma__DbUserClient<DbUserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbUserPreference base type for findUnique actions
   */
  export type DbUserPreferenceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
    /**
     * Filter, which DbUserPreference to fetch.
     * 
    **/
    where: DbUserPreferenceWhereUniqueInput
  }

  /**
   * DbUserPreference: findUnique
   */
  export interface DbUserPreferenceFindUniqueArgs extends DbUserPreferenceFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbUserPreference base type for findFirst actions
   */
  export type DbUserPreferenceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
    /**
     * Filter, which DbUserPreference to fetch.
     * 
    **/
    where?: DbUserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbUserPreferences to fetch.
     * 
    **/
    orderBy?: Enumerable<DbUserPreferenceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbUserPreferences.
     * 
    **/
    cursor?: DbUserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbUserPreferences from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbUserPreferences.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbUserPreferences.
     * 
    **/
    distinct?: Enumerable<DbUserPreferenceScalarFieldEnum>
  }

  /**
   * DbUserPreference: findFirst
   */
  export interface DbUserPreferenceFindFirstArgs extends DbUserPreferenceFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbUserPreference findMany
   */
  export type DbUserPreferenceFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
    /**
     * Filter, which DbUserPreferences to fetch.
     * 
    **/
    where?: DbUserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbUserPreferences to fetch.
     * 
    **/
    orderBy?: Enumerable<DbUserPreferenceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbUserPreferences.
     * 
    **/
    cursor?: DbUserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbUserPreferences from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbUserPreferences.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbUserPreferenceScalarFieldEnum>
  }


  /**
   * DbUserPreference create
   */
  export type DbUserPreferenceCreateArgs = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
    /**
     * The data needed to create a DbUserPreference.
     * 
    **/
    data: XOR<DbUserPreferenceCreateInput, DbUserPreferenceUncheckedCreateInput>
  }


  /**
   * DbUserPreference createMany
   */
  export type DbUserPreferenceCreateManyArgs = {
    /**
     * The data used to create many DbUserPreferences.
     * 
    **/
    data: Enumerable<DbUserPreferenceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbUserPreference update
   */
  export type DbUserPreferenceUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
    /**
     * The data needed to update a DbUserPreference.
     * 
    **/
    data: XOR<DbUserPreferenceUpdateInput, DbUserPreferenceUncheckedUpdateInput>
    /**
     * Choose, which DbUserPreference to update.
     * 
    **/
    where: DbUserPreferenceWhereUniqueInput
  }


  /**
   * DbUserPreference updateMany
   */
  export type DbUserPreferenceUpdateManyArgs = {
    /**
     * The data used to update DbUserPreferences.
     * 
    **/
    data: XOR<DbUserPreferenceUpdateManyMutationInput, DbUserPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which DbUserPreferences to update
     * 
    **/
    where?: DbUserPreferenceWhereInput
  }


  /**
   * DbUserPreference upsert
   */
  export type DbUserPreferenceUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
    /**
     * The filter to search for the DbUserPreference to update in case it exists.
     * 
    **/
    where: DbUserPreferenceWhereUniqueInput
    /**
     * In case the DbUserPreference found by the `where` argument doesn't exist, create a new DbUserPreference with this data.
     * 
    **/
    create: XOR<DbUserPreferenceCreateInput, DbUserPreferenceUncheckedCreateInput>
    /**
     * In case the DbUserPreference was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbUserPreferenceUpdateInput, DbUserPreferenceUncheckedUpdateInput>
  }


  /**
   * DbUserPreference delete
   */
  export type DbUserPreferenceDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
    /**
     * Filter which DbUserPreference to delete.
     * 
    **/
    where: DbUserPreferenceWhereUniqueInput
  }


  /**
   * DbUserPreference deleteMany
   */
  export type DbUserPreferenceDeleteManyArgs = {
    /**
     * Filter which DbUserPreferences to delete
     * 
    **/
    where?: DbUserPreferenceWhereInput
  }


  /**
   * DbUserPreference: findUniqueOrThrow
   */
  export type DbUserPreferenceFindUniqueOrThrowArgs = DbUserPreferenceFindUniqueArgsBase
      

  /**
   * DbUserPreference: findFirstOrThrow
   */
  export type DbUserPreferenceFindFirstOrThrowArgs = DbUserPreferenceFindFirstArgsBase
      

  /**
   * DbUserPreference without action
   */
  export type DbUserPreferenceArgs = {
    /**
     * Select specific fields to fetch from the DbUserPreference
     * 
    **/
    select?: DbUserPreferenceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbUserPreferenceInclude | null
  }



  /**
   * Model DbTransaction
   */


  export type AggregateDbTransaction = {
    _count: DbTransactionCountAggregateOutputType | null
    _avg: DbTransactionAvgAggregateOutputType | null
    _sum: DbTransactionSumAggregateOutputType | null
    _min: DbTransactionMinAggregateOutputType | null
    _max: DbTransactionMaxAggregateOutputType | null
  }

  export type DbTransactionAvgAggregateOutputType = {
    integerAmount: number | null
  }

  export type DbTransactionSumAggregateOutputType = {
    integerAmount: number | null
  }

  export type DbTransactionMinAggregateOutputType = {
    id: string | null
    uid: string | null
    categoryId: string | null
    comment: string | null
    integerAmount: number | null
    time: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    scheduleId: string | null
  }

  export type DbTransactionMaxAggregateOutputType = {
    id: string | null
    uid: string | null
    categoryId: string | null
    comment: string | null
    integerAmount: number | null
    time: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    scheduleId: string | null
  }

  export type DbTransactionCountAggregateOutputType = {
    id: number
    uid: number
    categoryId: number
    comment: number
    integerAmount: number
    time: number
    createdAt: number
    updatedAt: number
    scheduleId: number
    _all: number
  }


  export type DbTransactionAvgAggregateInputType = {
    integerAmount?: true
  }

  export type DbTransactionSumAggregateInputType = {
    integerAmount?: true
  }

  export type DbTransactionMinAggregateInputType = {
    id?: true
    uid?: true
    categoryId?: true
    comment?: true
    integerAmount?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    scheduleId?: true
  }

  export type DbTransactionMaxAggregateInputType = {
    id?: true
    uid?: true
    categoryId?: true
    comment?: true
    integerAmount?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    scheduleId?: true
  }

  export type DbTransactionCountAggregateInputType = {
    id?: true
    uid?: true
    categoryId?: true
    comment?: true
    integerAmount?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    scheduleId?: true
    _all?: true
  }

  export type DbTransactionAggregateArgs = {
    /**
     * Filter which DbTransaction to aggregate.
     * 
    **/
    where?: DbTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbTransactions to fetch.
     * 
    **/
    orderBy?: Enumerable<DbTransactionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbTransactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbTransactions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbTransactions
    **/
    _count?: true | DbTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DbTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DbTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbTransactionMaxAggregateInputType
  }

  export type GetDbTransactionAggregateType<T extends DbTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateDbTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbTransaction[P]>
      : GetScalarType<T[P], AggregateDbTransaction[P]>
  }




  export type DbTransactionGroupByArgs = {
    where?: DbTransactionWhereInput
    orderBy?: Enumerable<DbTransactionOrderByWithAggregationInput>
    by: Array<DbTransactionScalarFieldEnum>
    having?: DbTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbTransactionCountAggregateInputType | true
    _avg?: DbTransactionAvgAggregateInputType
    _sum?: DbTransactionSumAggregateInputType
    _min?: DbTransactionMinAggregateInputType
    _max?: DbTransactionMaxAggregateInputType
  }


  export type DbTransactionGroupByOutputType = {
    id: string
    uid: string
    categoryId: string
    comment: string | null
    integerAmount: number
    time: Date
    createdAt: Date
    updatedAt: Date
    scheduleId: string | null
    _count: DbTransactionCountAggregateOutputType | null
    _avg: DbTransactionAvgAggregateOutputType | null
    _sum: DbTransactionSumAggregateOutputType | null
    _min: DbTransactionMinAggregateOutputType | null
    _max: DbTransactionMaxAggregateOutputType | null
  }

  type GetDbTransactionGroupByPayload<T extends DbTransactionGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], DbTransactionGroupByOutputType[P]>
        }
      >
    >


  export type DbTransactionSelect = {
    id?: boolean
    uid?: boolean
    categoryId?: boolean
    comment?: boolean
    integerAmount?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    scheduleId?: boolean
    User?: boolean | DbUserArgs
    Category?: boolean | DbCategoryArgs
    Schedule?: boolean | DbTransactionScheduleArgs
  }

  export type DbTransactionInclude = {
    User?: boolean | DbUserArgs
    Category?: boolean | DbCategoryArgs
    Schedule?: boolean | DbTransactionScheduleArgs
  }

  export type DbTransactionGetPayload<
    S extends boolean | null | undefined | DbTransactionArgs,
    U = keyof S
      > = S extends true
        ? DbTransaction
    : S extends undefined
    ? never
    : S extends DbTransactionArgs | DbTransactionFindManyArgs
    ?'include' extends U
    ? DbTransaction  & {
    [P in TrueKeys<S['include']>]:
        P extends 'User' ? DbUserGetPayload<S['include'][P]> :
        P extends 'Category' ? DbCategoryGetPayload<S['include'][P]> :
        P extends 'Schedule' ? DbTransactionScheduleGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'User' ? DbUserGetPayload<S['select'][P]> :
        P extends 'Category' ? DbCategoryGetPayload<S['select'][P]> :
        P extends 'Schedule' ? DbTransactionScheduleGetPayload<S['select'][P]> | null :  P extends keyof DbTransaction ? DbTransaction[P] : never
  } 
    : DbTransaction
  : DbTransaction


  type DbTransactionCountArgs = Merge<
    Omit<DbTransactionFindManyArgs, 'select' | 'include'> & {
      select?: DbTransactionCountAggregateInputType | true
    }
  >

  export interface DbTransactionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbTransaction that matches the filter.
     * @param {DbTransactionFindUniqueArgs} args - Arguments to find a DbTransaction
     * @example
     * // Get one DbTransaction
     * const dbTransaction = await prisma.dbTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbTransactionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbTransactionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbTransaction'> extends True ? CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>> : CheckSelect<T, Prisma__DbTransactionClient<DbTransaction | null >, Prisma__DbTransactionClient<DbTransactionGetPayload<T> | null >>

    /**
     * Find the first DbTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionFindFirstArgs} args - Arguments to find a DbTransaction
     * @example
     * // Get one DbTransaction
     * const dbTransaction = await prisma.dbTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbTransactionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbTransactionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbTransaction'> extends True ? CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>> : CheckSelect<T, Prisma__DbTransactionClient<DbTransaction | null >, Prisma__DbTransactionClient<DbTransactionGetPayload<T> | null >>

    /**
     * Find zero or more DbTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbTransactions
     * const dbTransactions = await prisma.dbTransaction.findMany()
     * 
     * // Get first 10 DbTransactions
     * const dbTransactions = await prisma.dbTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbTransactionWithIdOnly = await prisma.dbTransaction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DbTransactionFindManyArgs>(
      args?: SelectSubset<T, DbTransactionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbTransaction>>, PrismaPromise<Array<DbTransactionGetPayload<T>>>>

    /**
     * Create a DbTransaction.
     * @param {DbTransactionCreateArgs} args - Arguments to create a DbTransaction.
     * @example
     * // Create one DbTransaction
     * const DbTransaction = await prisma.dbTransaction.create({
     *   data: {
     *     // ... data to create a DbTransaction
     *   }
     * })
     * 
    **/
    create<T extends DbTransactionCreateArgs>(
      args: SelectSubset<T, DbTransactionCreateArgs>
    ): CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>>

    /**
     * Create many DbTransactions.
     *     @param {DbTransactionCreateManyArgs} args - Arguments to create many DbTransactions.
     *     @example
     *     // Create many DbTransactions
     *     const dbTransaction = await prisma.dbTransaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbTransactionCreateManyArgs>(
      args?: SelectSubset<T, DbTransactionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbTransaction.
     * @param {DbTransactionDeleteArgs} args - Arguments to delete one DbTransaction.
     * @example
     * // Delete one DbTransaction
     * const DbTransaction = await prisma.dbTransaction.delete({
     *   where: {
     *     // ... filter to delete one DbTransaction
     *   }
     * })
     * 
    **/
    delete<T extends DbTransactionDeleteArgs>(
      args: SelectSubset<T, DbTransactionDeleteArgs>
    ): CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>>

    /**
     * Update one DbTransaction.
     * @param {DbTransactionUpdateArgs} args - Arguments to update one DbTransaction.
     * @example
     * // Update one DbTransaction
     * const dbTransaction = await prisma.dbTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbTransactionUpdateArgs>(
      args: SelectSubset<T, DbTransactionUpdateArgs>
    ): CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>>

    /**
     * Delete zero or more DbTransactions.
     * @param {DbTransactionDeleteManyArgs} args - Arguments to filter DbTransactions to delete.
     * @example
     * // Delete a few DbTransactions
     * const { count } = await prisma.dbTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbTransactionDeleteManyArgs>(
      args?: SelectSubset<T, DbTransactionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbTransactions
     * const dbTransaction = await prisma.dbTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbTransactionUpdateManyArgs>(
      args: SelectSubset<T, DbTransactionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbTransaction.
     * @param {DbTransactionUpsertArgs} args - Arguments to update or create a DbTransaction.
     * @example
     * // Update or create a DbTransaction
     * const dbTransaction = await prisma.dbTransaction.upsert({
     *   create: {
     *     // ... data to create a DbTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbTransaction we want to update
     *   }
     * })
    **/
    upsert<T extends DbTransactionUpsertArgs>(
      args: SelectSubset<T, DbTransactionUpsertArgs>
    ): CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>>

    /**
     * Find one DbTransaction that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbTransactionFindUniqueOrThrowArgs} args - Arguments to find a DbTransaction
     * @example
     * // Get one DbTransaction
     * const dbTransaction = await prisma.dbTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbTransactionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbTransactionFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>>

    /**
     * Find the first DbTransaction that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionFindFirstOrThrowArgs} args - Arguments to find a DbTransaction
     * @example
     * // Get one DbTransaction
     * const dbTransaction = await prisma.dbTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbTransactionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbTransactionFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbTransactionClient<DbTransaction>, Prisma__DbTransactionClient<DbTransactionGetPayload<T>>>

    /**
     * Count the number of DbTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionCountArgs} args - Arguments to filter DbTransactions to count.
     * @example
     * // Count the number of DbTransactions
     * const count = await prisma.dbTransaction.count({
     *   where: {
     *     // ... the filter for the DbTransactions we want to count
     *   }
     * })
    **/
    count<T extends DbTransactionCountArgs>(
      args?: Subset<T, DbTransactionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbTransactionAggregateArgs>(args: Subset<T, DbTransactionAggregateArgs>): PrismaPromise<GetDbTransactionAggregateType<T>>

    /**
     * Group by DbTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbTransactionGroupByArgs['orderBy'] }
        : { orderBy?: DbTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbTransactionGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbTransactionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends DbUserArgs = {}>(args?: Subset<T, DbUserArgs>): CheckSelect<T, Prisma__DbUserClient<DbUser | null >, Prisma__DbUserClient<DbUserGetPayload<T> | null >>;

    Category<T extends DbCategoryArgs = {}>(args?: Subset<T, DbCategoryArgs>): CheckSelect<T, Prisma__DbCategoryClient<DbCategory | null >, Prisma__DbCategoryClient<DbCategoryGetPayload<T> | null >>;

    Schedule<T extends DbTransactionScheduleArgs = {}>(args?: Subset<T, DbTransactionScheduleArgs>): CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule | null >, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbTransaction base type for findUnique actions
   */
  export type DbTransactionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
    /**
     * Filter, which DbTransaction to fetch.
     * 
    **/
    where: DbTransactionWhereUniqueInput
  }

  /**
   * DbTransaction: findUnique
   */
  export interface DbTransactionFindUniqueArgs extends DbTransactionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbTransaction base type for findFirst actions
   */
  export type DbTransactionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
    /**
     * Filter, which DbTransaction to fetch.
     * 
    **/
    where?: DbTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbTransactions to fetch.
     * 
    **/
    orderBy?: Enumerable<DbTransactionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbTransactions.
     * 
    **/
    cursor?: DbTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbTransactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbTransactions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbTransactions.
     * 
    **/
    distinct?: Enumerable<DbTransactionScalarFieldEnum>
  }

  /**
   * DbTransaction: findFirst
   */
  export interface DbTransactionFindFirstArgs extends DbTransactionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbTransaction findMany
   */
  export type DbTransactionFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
    /**
     * Filter, which DbTransactions to fetch.
     * 
    **/
    where?: DbTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbTransactions to fetch.
     * 
    **/
    orderBy?: Enumerable<DbTransactionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbTransactions.
     * 
    **/
    cursor?: DbTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbTransactions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbTransactions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbTransactionScalarFieldEnum>
  }


  /**
   * DbTransaction create
   */
  export type DbTransactionCreateArgs = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
    /**
     * The data needed to create a DbTransaction.
     * 
    **/
    data: XOR<DbTransactionCreateInput, DbTransactionUncheckedCreateInput>
  }


  /**
   * DbTransaction createMany
   */
  export type DbTransactionCreateManyArgs = {
    /**
     * The data used to create many DbTransactions.
     * 
    **/
    data: Enumerable<DbTransactionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbTransaction update
   */
  export type DbTransactionUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
    /**
     * The data needed to update a DbTransaction.
     * 
    **/
    data: XOR<DbTransactionUpdateInput, DbTransactionUncheckedUpdateInput>
    /**
     * Choose, which DbTransaction to update.
     * 
    **/
    where: DbTransactionWhereUniqueInput
  }


  /**
   * DbTransaction updateMany
   */
  export type DbTransactionUpdateManyArgs = {
    /**
     * The data used to update DbTransactions.
     * 
    **/
    data: XOR<DbTransactionUpdateManyMutationInput, DbTransactionUncheckedUpdateManyInput>
    /**
     * Filter which DbTransactions to update
     * 
    **/
    where?: DbTransactionWhereInput
  }


  /**
   * DbTransaction upsert
   */
  export type DbTransactionUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
    /**
     * The filter to search for the DbTransaction to update in case it exists.
     * 
    **/
    where: DbTransactionWhereUniqueInput
    /**
     * In case the DbTransaction found by the `where` argument doesn't exist, create a new DbTransaction with this data.
     * 
    **/
    create: XOR<DbTransactionCreateInput, DbTransactionUncheckedCreateInput>
    /**
     * In case the DbTransaction was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbTransactionUpdateInput, DbTransactionUncheckedUpdateInput>
  }


  /**
   * DbTransaction delete
   */
  export type DbTransactionDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
    /**
     * Filter which DbTransaction to delete.
     * 
    **/
    where: DbTransactionWhereUniqueInput
  }


  /**
   * DbTransaction deleteMany
   */
  export type DbTransactionDeleteManyArgs = {
    /**
     * Filter which DbTransactions to delete
     * 
    **/
    where?: DbTransactionWhereInput
  }


  /**
   * DbTransaction: findUniqueOrThrow
   */
  export type DbTransactionFindUniqueOrThrowArgs = DbTransactionFindUniqueArgsBase
      

  /**
   * DbTransaction: findFirstOrThrow
   */
  export type DbTransactionFindFirstOrThrowArgs = DbTransactionFindFirstArgsBase
      

  /**
   * DbTransaction without action
   */
  export type DbTransactionArgs = {
    /**
     * Select specific fields to fetch from the DbTransaction
     * 
    **/
    select?: DbTransactionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionInclude | null
  }



  /**
   * Model DbTransactionSchedule
   */


  export type AggregateDbTransactionSchedule = {
    _count: DbTransactionScheduleCountAggregateOutputType | null
    _avg: DbTransactionScheduleAvgAggregateOutputType | null
    _sum: DbTransactionScheduleSumAggregateOutputType | null
    _min: DbTransactionScheduleMinAggregateOutputType | null
    _max: DbTransactionScheduleMaxAggregateOutputType | null
  }

  export type DbTransactionScheduleAvgAggregateOutputType = {
    integerAmount: number | null
    intervalEvery: number | null
    occurrences: number | null
  }

  export type DbTransactionScheduleSumAggregateOutputType = {
    integerAmount: number | null
    intervalEvery: number | null
    occurrences: number | null
  }

  export type DbTransactionScheduleMinAggregateOutputType = {
    id: string | null
    uid: string | null
    categoryId: string | null
    comment: string | null
    integerAmount: number | null
    intervalType: IntervalType | null
    intervalEvery: number | null
    firstOccurrence: Date | null
    occurrences: number | null
    createdAt: Date | null
    updatedAt: Date | null
    latestCreatedOccurrence: Date | null
  }

  export type DbTransactionScheduleMaxAggregateOutputType = {
    id: string | null
    uid: string | null
    categoryId: string | null
    comment: string | null
    integerAmount: number | null
    intervalType: IntervalType | null
    intervalEvery: number | null
    firstOccurrence: Date | null
    occurrences: number | null
    createdAt: Date | null
    updatedAt: Date | null
    latestCreatedOccurrence: Date | null
  }

  export type DbTransactionScheduleCountAggregateOutputType = {
    id: number
    uid: number
    categoryId: number
    comment: number
    integerAmount: number
    intervalType: number
    intervalEvery: number
    firstOccurrence: number
    occurrences: number
    createdAt: number
    updatedAt: number
    latestCreatedOccurrence: number
    _all: number
  }


  export type DbTransactionScheduleAvgAggregateInputType = {
    integerAmount?: true
    intervalEvery?: true
    occurrences?: true
  }

  export type DbTransactionScheduleSumAggregateInputType = {
    integerAmount?: true
    intervalEvery?: true
    occurrences?: true
  }

  export type DbTransactionScheduleMinAggregateInputType = {
    id?: true
    uid?: true
    categoryId?: true
    comment?: true
    integerAmount?: true
    intervalType?: true
    intervalEvery?: true
    firstOccurrence?: true
    occurrences?: true
    createdAt?: true
    updatedAt?: true
    latestCreatedOccurrence?: true
  }

  export type DbTransactionScheduleMaxAggregateInputType = {
    id?: true
    uid?: true
    categoryId?: true
    comment?: true
    integerAmount?: true
    intervalType?: true
    intervalEvery?: true
    firstOccurrence?: true
    occurrences?: true
    createdAt?: true
    updatedAt?: true
    latestCreatedOccurrence?: true
  }

  export type DbTransactionScheduleCountAggregateInputType = {
    id?: true
    uid?: true
    categoryId?: true
    comment?: true
    integerAmount?: true
    intervalType?: true
    intervalEvery?: true
    firstOccurrence?: true
    occurrences?: true
    createdAt?: true
    updatedAt?: true
    latestCreatedOccurrence?: true
    _all?: true
  }

  export type DbTransactionScheduleAggregateArgs = {
    /**
     * Filter which DbTransactionSchedule to aggregate.
     * 
    **/
    where?: DbTransactionScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbTransactionSchedules to fetch.
     * 
    **/
    orderBy?: Enumerable<DbTransactionScheduleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbTransactionScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbTransactionSchedules from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbTransactionSchedules.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbTransactionSchedules
    **/
    _count?: true | DbTransactionScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DbTransactionScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DbTransactionScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbTransactionScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbTransactionScheduleMaxAggregateInputType
  }

  export type GetDbTransactionScheduleAggregateType<T extends DbTransactionScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateDbTransactionSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbTransactionSchedule[P]>
      : GetScalarType<T[P], AggregateDbTransactionSchedule[P]>
  }




  export type DbTransactionScheduleGroupByArgs = {
    where?: DbTransactionScheduleWhereInput
    orderBy?: Enumerable<DbTransactionScheduleOrderByWithAggregationInput>
    by: Array<DbTransactionScheduleScalarFieldEnum>
    having?: DbTransactionScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbTransactionScheduleCountAggregateInputType | true
    _avg?: DbTransactionScheduleAvgAggregateInputType
    _sum?: DbTransactionScheduleSumAggregateInputType
    _min?: DbTransactionScheduleMinAggregateInputType
    _max?: DbTransactionScheduleMaxAggregateInputType
  }


  export type DbTransactionScheduleGroupByOutputType = {
    id: string
    uid: string
    categoryId: string
    comment: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery: number
    firstOccurrence: Date
    occurrences: number | null
    createdAt: Date
    updatedAt: Date
    latestCreatedOccurrence: Date | null
    _count: DbTransactionScheduleCountAggregateOutputType | null
    _avg: DbTransactionScheduleAvgAggregateOutputType | null
    _sum: DbTransactionScheduleSumAggregateOutputType | null
    _min: DbTransactionScheduleMinAggregateOutputType | null
    _max: DbTransactionScheduleMaxAggregateOutputType | null
  }

  type GetDbTransactionScheduleGroupByPayload<T extends DbTransactionScheduleGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbTransactionScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbTransactionScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbTransactionScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], DbTransactionScheduleGroupByOutputType[P]>
        }
      >
    >


  export type DbTransactionScheduleSelect = {
    id?: boolean
    uid?: boolean
    categoryId?: boolean
    comment?: boolean
    integerAmount?: boolean
    intervalType?: boolean
    intervalEvery?: boolean
    firstOccurrence?: boolean
    occurrences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    latestCreatedOccurrence?: boolean
    User?: boolean | DbUserArgs
    Category?: boolean | DbCategoryArgs
    Transactions?: boolean | DbTransactionFindManyArgs
    _count?: boolean | DbTransactionScheduleCountOutputTypeArgs
  }

  export type DbTransactionScheduleInclude = {
    User?: boolean | DbUserArgs
    Category?: boolean | DbCategoryArgs
    Transactions?: boolean | DbTransactionFindManyArgs
    _count?: boolean | DbTransactionScheduleCountOutputTypeArgs
  }

  export type DbTransactionScheduleGetPayload<
    S extends boolean | null | undefined | DbTransactionScheduleArgs,
    U = keyof S
      > = S extends true
        ? DbTransactionSchedule
    : S extends undefined
    ? never
    : S extends DbTransactionScheduleArgs | DbTransactionScheduleFindManyArgs
    ?'include' extends U
    ? DbTransactionSchedule  & {
    [P in TrueKeys<S['include']>]:
        P extends 'User' ? DbUserGetPayload<S['include'][P]> :
        P extends 'Category' ? DbCategoryGetPayload<S['include'][P]> :
        P extends 'Transactions' ? Array < DbTransactionGetPayload<S['include'][P]>>  :
        P extends '_count' ? DbTransactionScheduleCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'User' ? DbUserGetPayload<S['select'][P]> :
        P extends 'Category' ? DbCategoryGetPayload<S['select'][P]> :
        P extends 'Transactions' ? Array < DbTransactionGetPayload<S['select'][P]>>  :
        P extends '_count' ? DbTransactionScheduleCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof DbTransactionSchedule ? DbTransactionSchedule[P] : never
  } 
    : DbTransactionSchedule
  : DbTransactionSchedule


  type DbTransactionScheduleCountArgs = Merge<
    Omit<DbTransactionScheduleFindManyArgs, 'select' | 'include'> & {
      select?: DbTransactionScheduleCountAggregateInputType | true
    }
  >

  export interface DbTransactionScheduleDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbTransactionSchedule that matches the filter.
     * @param {DbTransactionScheduleFindUniqueArgs} args - Arguments to find a DbTransactionSchedule
     * @example
     * // Get one DbTransactionSchedule
     * const dbTransactionSchedule = await prisma.dbTransactionSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbTransactionScheduleFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbTransactionScheduleFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbTransactionSchedule'> extends True ? CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>> : CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule | null >, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T> | null >>

    /**
     * Find the first DbTransactionSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionScheduleFindFirstArgs} args - Arguments to find a DbTransactionSchedule
     * @example
     * // Get one DbTransactionSchedule
     * const dbTransactionSchedule = await prisma.dbTransactionSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbTransactionScheduleFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbTransactionScheduleFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbTransactionSchedule'> extends True ? CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>> : CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule | null >, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T> | null >>

    /**
     * Find zero or more DbTransactionSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionScheduleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbTransactionSchedules
     * const dbTransactionSchedules = await prisma.dbTransactionSchedule.findMany()
     * 
     * // Get first 10 DbTransactionSchedules
     * const dbTransactionSchedules = await prisma.dbTransactionSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbTransactionScheduleWithIdOnly = await prisma.dbTransactionSchedule.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DbTransactionScheduleFindManyArgs>(
      args?: SelectSubset<T, DbTransactionScheduleFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbTransactionSchedule>>, PrismaPromise<Array<DbTransactionScheduleGetPayload<T>>>>

    /**
     * Create a DbTransactionSchedule.
     * @param {DbTransactionScheduleCreateArgs} args - Arguments to create a DbTransactionSchedule.
     * @example
     * // Create one DbTransactionSchedule
     * const DbTransactionSchedule = await prisma.dbTransactionSchedule.create({
     *   data: {
     *     // ... data to create a DbTransactionSchedule
     *   }
     * })
     * 
    **/
    create<T extends DbTransactionScheduleCreateArgs>(
      args: SelectSubset<T, DbTransactionScheduleCreateArgs>
    ): CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>>

    /**
     * Create many DbTransactionSchedules.
     *     @param {DbTransactionScheduleCreateManyArgs} args - Arguments to create many DbTransactionSchedules.
     *     @example
     *     // Create many DbTransactionSchedules
     *     const dbTransactionSchedule = await prisma.dbTransactionSchedule.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbTransactionScheduleCreateManyArgs>(
      args?: SelectSubset<T, DbTransactionScheduleCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbTransactionSchedule.
     * @param {DbTransactionScheduleDeleteArgs} args - Arguments to delete one DbTransactionSchedule.
     * @example
     * // Delete one DbTransactionSchedule
     * const DbTransactionSchedule = await prisma.dbTransactionSchedule.delete({
     *   where: {
     *     // ... filter to delete one DbTransactionSchedule
     *   }
     * })
     * 
    **/
    delete<T extends DbTransactionScheduleDeleteArgs>(
      args: SelectSubset<T, DbTransactionScheduleDeleteArgs>
    ): CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>>

    /**
     * Update one DbTransactionSchedule.
     * @param {DbTransactionScheduleUpdateArgs} args - Arguments to update one DbTransactionSchedule.
     * @example
     * // Update one DbTransactionSchedule
     * const dbTransactionSchedule = await prisma.dbTransactionSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbTransactionScheduleUpdateArgs>(
      args: SelectSubset<T, DbTransactionScheduleUpdateArgs>
    ): CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>>

    /**
     * Delete zero or more DbTransactionSchedules.
     * @param {DbTransactionScheduleDeleteManyArgs} args - Arguments to filter DbTransactionSchedules to delete.
     * @example
     * // Delete a few DbTransactionSchedules
     * const { count } = await prisma.dbTransactionSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbTransactionScheduleDeleteManyArgs>(
      args?: SelectSubset<T, DbTransactionScheduleDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbTransactionSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbTransactionSchedules
     * const dbTransactionSchedule = await prisma.dbTransactionSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbTransactionScheduleUpdateManyArgs>(
      args: SelectSubset<T, DbTransactionScheduleUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbTransactionSchedule.
     * @param {DbTransactionScheduleUpsertArgs} args - Arguments to update or create a DbTransactionSchedule.
     * @example
     * // Update or create a DbTransactionSchedule
     * const dbTransactionSchedule = await prisma.dbTransactionSchedule.upsert({
     *   create: {
     *     // ... data to create a DbTransactionSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbTransactionSchedule we want to update
     *   }
     * })
    **/
    upsert<T extends DbTransactionScheduleUpsertArgs>(
      args: SelectSubset<T, DbTransactionScheduleUpsertArgs>
    ): CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>>

    /**
     * Find one DbTransactionSchedule that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbTransactionScheduleFindUniqueOrThrowArgs} args - Arguments to find a DbTransactionSchedule
     * @example
     * // Get one DbTransactionSchedule
     * const dbTransactionSchedule = await prisma.dbTransactionSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbTransactionScheduleFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbTransactionScheduleFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>>

    /**
     * Find the first DbTransactionSchedule that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionScheduleFindFirstOrThrowArgs} args - Arguments to find a DbTransactionSchedule
     * @example
     * // Get one DbTransactionSchedule
     * const dbTransactionSchedule = await prisma.dbTransactionSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbTransactionScheduleFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbTransactionScheduleFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbTransactionScheduleClient<DbTransactionSchedule>, Prisma__DbTransactionScheduleClient<DbTransactionScheduleGetPayload<T>>>

    /**
     * Count the number of DbTransactionSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionScheduleCountArgs} args - Arguments to filter DbTransactionSchedules to count.
     * @example
     * // Count the number of DbTransactionSchedules
     * const count = await prisma.dbTransactionSchedule.count({
     *   where: {
     *     // ... the filter for the DbTransactionSchedules we want to count
     *   }
     * })
    **/
    count<T extends DbTransactionScheduleCountArgs>(
      args?: Subset<T, DbTransactionScheduleCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbTransactionScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbTransactionSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbTransactionScheduleAggregateArgs>(args: Subset<T, DbTransactionScheduleAggregateArgs>): PrismaPromise<GetDbTransactionScheduleAggregateType<T>>

    /**
     * Group by DbTransactionSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbTransactionScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbTransactionScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbTransactionScheduleGroupByArgs['orderBy'] }
        : { orderBy?: DbTransactionScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbTransactionScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbTransactionScheduleGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbTransactionSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbTransactionScheduleClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends DbUserArgs = {}>(args?: Subset<T, DbUserArgs>): CheckSelect<T, Prisma__DbUserClient<DbUser | null >, Prisma__DbUserClient<DbUserGetPayload<T> | null >>;

    Category<T extends DbCategoryArgs = {}>(args?: Subset<T, DbCategoryArgs>): CheckSelect<T, Prisma__DbCategoryClient<DbCategory | null >, Prisma__DbCategoryClient<DbCategoryGetPayload<T> | null >>;

    Transactions<T extends DbTransactionFindManyArgs = {}>(args?: Subset<T, DbTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbTransaction>>, PrismaPromise<Array<DbTransactionGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbTransactionSchedule base type for findUnique actions
   */
  export type DbTransactionScheduleFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
    /**
     * Filter, which DbTransactionSchedule to fetch.
     * 
    **/
    where: DbTransactionScheduleWhereUniqueInput
  }

  /**
   * DbTransactionSchedule: findUnique
   */
  export interface DbTransactionScheduleFindUniqueArgs extends DbTransactionScheduleFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbTransactionSchedule base type for findFirst actions
   */
  export type DbTransactionScheduleFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
    /**
     * Filter, which DbTransactionSchedule to fetch.
     * 
    **/
    where?: DbTransactionScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbTransactionSchedules to fetch.
     * 
    **/
    orderBy?: Enumerable<DbTransactionScheduleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbTransactionSchedules.
     * 
    **/
    cursor?: DbTransactionScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbTransactionSchedules from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbTransactionSchedules.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbTransactionSchedules.
     * 
    **/
    distinct?: Enumerable<DbTransactionScheduleScalarFieldEnum>
  }

  /**
   * DbTransactionSchedule: findFirst
   */
  export interface DbTransactionScheduleFindFirstArgs extends DbTransactionScheduleFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbTransactionSchedule findMany
   */
  export type DbTransactionScheduleFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
    /**
     * Filter, which DbTransactionSchedules to fetch.
     * 
    **/
    where?: DbTransactionScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbTransactionSchedules to fetch.
     * 
    **/
    orderBy?: Enumerable<DbTransactionScheduleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbTransactionSchedules.
     * 
    **/
    cursor?: DbTransactionScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbTransactionSchedules from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbTransactionSchedules.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbTransactionScheduleScalarFieldEnum>
  }


  /**
   * DbTransactionSchedule create
   */
  export type DbTransactionScheduleCreateArgs = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
    /**
     * The data needed to create a DbTransactionSchedule.
     * 
    **/
    data: XOR<DbTransactionScheduleCreateInput, DbTransactionScheduleUncheckedCreateInput>
  }


  /**
   * DbTransactionSchedule createMany
   */
  export type DbTransactionScheduleCreateManyArgs = {
    /**
     * The data used to create many DbTransactionSchedules.
     * 
    **/
    data: Enumerable<DbTransactionScheduleCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbTransactionSchedule update
   */
  export type DbTransactionScheduleUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
    /**
     * The data needed to update a DbTransactionSchedule.
     * 
    **/
    data: XOR<DbTransactionScheduleUpdateInput, DbTransactionScheduleUncheckedUpdateInput>
    /**
     * Choose, which DbTransactionSchedule to update.
     * 
    **/
    where: DbTransactionScheduleWhereUniqueInput
  }


  /**
   * DbTransactionSchedule updateMany
   */
  export type DbTransactionScheduleUpdateManyArgs = {
    /**
     * The data used to update DbTransactionSchedules.
     * 
    **/
    data: XOR<DbTransactionScheduleUpdateManyMutationInput, DbTransactionScheduleUncheckedUpdateManyInput>
    /**
     * Filter which DbTransactionSchedules to update
     * 
    **/
    where?: DbTransactionScheduleWhereInput
  }


  /**
   * DbTransactionSchedule upsert
   */
  export type DbTransactionScheduleUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
    /**
     * The filter to search for the DbTransactionSchedule to update in case it exists.
     * 
    **/
    where: DbTransactionScheduleWhereUniqueInput
    /**
     * In case the DbTransactionSchedule found by the `where` argument doesn't exist, create a new DbTransactionSchedule with this data.
     * 
    **/
    create: XOR<DbTransactionScheduleCreateInput, DbTransactionScheduleUncheckedCreateInput>
    /**
     * In case the DbTransactionSchedule was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbTransactionScheduleUpdateInput, DbTransactionScheduleUncheckedUpdateInput>
  }


  /**
   * DbTransactionSchedule delete
   */
  export type DbTransactionScheduleDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
    /**
     * Filter which DbTransactionSchedule to delete.
     * 
    **/
    where: DbTransactionScheduleWhereUniqueInput
  }


  /**
   * DbTransactionSchedule deleteMany
   */
  export type DbTransactionScheduleDeleteManyArgs = {
    /**
     * Filter which DbTransactionSchedules to delete
     * 
    **/
    where?: DbTransactionScheduleWhereInput
  }


  /**
   * DbTransactionSchedule: findUniqueOrThrow
   */
  export type DbTransactionScheduleFindUniqueOrThrowArgs = DbTransactionScheduleFindUniqueArgsBase
      

  /**
   * DbTransactionSchedule: findFirstOrThrow
   */
  export type DbTransactionScheduleFindFirstOrThrowArgs = DbTransactionScheduleFindFirstArgsBase
      

  /**
   * DbTransactionSchedule without action
   */
  export type DbTransactionScheduleArgs = {
    /**
     * Select specific fields to fetch from the DbTransactionSchedule
     * 
    **/
    select?: DbTransactionScheduleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbTransactionScheduleInclude | null
  }



  /**
   * Model DbCategory
   */


  export type AggregateDbCategory = {
    _count: DbCategoryCountAggregateOutputType | null
    _min: DbCategoryMinAggregateOutputType | null
    _max: DbCategoryMaxAggregateOutputType | null
  }

  export type DbCategoryMinAggregateOutputType = {
    id: string | null
    uid: string | null
    value: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbCategoryMaxAggregateOutputType = {
    id: string | null
    uid: string | null
    value: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbCategoryCountAggregateOutputType = {
    id: number
    uid: number
    value: number
    icon: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DbCategoryMinAggregateInputType = {
    id?: true
    uid?: true
    value?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbCategoryMaxAggregateInputType = {
    id?: true
    uid?: true
    value?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbCategoryCountAggregateInputType = {
    id?: true
    uid?: true
    value?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DbCategoryAggregateArgs = {
    /**
     * Filter which DbCategory to aggregate.
     * 
    **/
    where?: DbCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<DbCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbCategories
    **/
    _count?: true | DbCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbCategoryMaxAggregateInputType
  }

  export type GetDbCategoryAggregateType<T extends DbCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDbCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbCategory[P]>
      : GetScalarType<T[P], AggregateDbCategory[P]>
  }




  export type DbCategoryGroupByArgs = {
    where?: DbCategoryWhereInput
    orderBy?: Enumerable<DbCategoryOrderByWithAggregationInput>
    by: Array<DbCategoryScalarFieldEnum>
    having?: DbCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbCategoryCountAggregateInputType | true
    _min?: DbCategoryMinAggregateInputType
    _max?: DbCategoryMaxAggregateInputType
  }


  export type DbCategoryGroupByOutputType = {
    id: string
    uid: string
    value: string
    icon: string | null
    createdAt: Date
    updatedAt: Date
    _count: DbCategoryCountAggregateOutputType | null
    _min: DbCategoryMinAggregateOutputType | null
    _max: DbCategoryMaxAggregateOutputType | null
  }

  type GetDbCategoryGroupByPayload<T extends DbCategoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], DbCategoryGroupByOutputType[P]>
        }
      >
    >


  export type DbCategorySelect = {
    id?: boolean
    uid?: boolean
    value?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Transactions?: boolean | DbTransactionFindManyArgs
    TransactionSchedule?: boolean | DbTransactionScheduleFindManyArgs
    User?: boolean | DbUserArgs
    _count?: boolean | DbCategoryCountOutputTypeArgs
  }

  export type DbCategoryInclude = {
    Transactions?: boolean | DbTransactionFindManyArgs
    TransactionSchedule?: boolean | DbTransactionScheduleFindManyArgs
    User?: boolean | DbUserArgs
    _count?: boolean | DbCategoryCountOutputTypeArgs
  }

  export type DbCategoryGetPayload<
    S extends boolean | null | undefined | DbCategoryArgs,
    U = keyof S
      > = S extends true
        ? DbCategory
    : S extends undefined
    ? never
    : S extends DbCategoryArgs | DbCategoryFindManyArgs
    ?'include' extends U
    ? DbCategory  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Transactions' ? Array < DbTransactionGetPayload<S['include'][P]>>  :
        P extends 'TransactionSchedule' ? Array < DbTransactionScheduleGetPayload<S['include'][P]>>  :
        P extends 'User' ? DbUserGetPayload<S['include'][P]> :
        P extends '_count' ? DbCategoryCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Transactions' ? Array < DbTransactionGetPayload<S['select'][P]>>  :
        P extends 'TransactionSchedule' ? Array < DbTransactionScheduleGetPayload<S['select'][P]>>  :
        P extends 'User' ? DbUserGetPayload<S['select'][P]> :
        P extends '_count' ? DbCategoryCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof DbCategory ? DbCategory[P] : never
  } 
    : DbCategory
  : DbCategory


  type DbCategoryCountArgs = Merge<
    Omit<DbCategoryFindManyArgs, 'select' | 'include'> & {
      select?: DbCategoryCountAggregateInputType | true
    }
  >

  export interface DbCategoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbCategory that matches the filter.
     * @param {DbCategoryFindUniqueArgs} args - Arguments to find a DbCategory
     * @example
     * // Get one DbCategory
     * const dbCategory = await prisma.dbCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbCategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbCategory'> extends True ? CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>> : CheckSelect<T, Prisma__DbCategoryClient<DbCategory | null >, Prisma__DbCategoryClient<DbCategoryGetPayload<T> | null >>

    /**
     * Find the first DbCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCategoryFindFirstArgs} args - Arguments to find a DbCategory
     * @example
     * // Get one DbCategory
     * const dbCategory = await prisma.dbCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbCategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbCategory'> extends True ? CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>> : CheckSelect<T, Prisma__DbCategoryClient<DbCategory | null >, Prisma__DbCategoryClient<DbCategoryGetPayload<T> | null >>

    /**
     * Find zero or more DbCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbCategories
     * const dbCategories = await prisma.dbCategory.findMany()
     * 
     * // Get first 10 DbCategories
     * const dbCategories = await prisma.dbCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbCategoryWithIdOnly = await prisma.dbCategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DbCategoryFindManyArgs>(
      args?: SelectSubset<T, DbCategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbCategory>>, PrismaPromise<Array<DbCategoryGetPayload<T>>>>

    /**
     * Create a DbCategory.
     * @param {DbCategoryCreateArgs} args - Arguments to create a DbCategory.
     * @example
     * // Create one DbCategory
     * const DbCategory = await prisma.dbCategory.create({
     *   data: {
     *     // ... data to create a DbCategory
     *   }
     * })
     * 
    **/
    create<T extends DbCategoryCreateArgs>(
      args: SelectSubset<T, DbCategoryCreateArgs>
    ): CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>>

    /**
     * Create many DbCategories.
     *     @param {DbCategoryCreateManyArgs} args - Arguments to create many DbCategories.
     *     @example
     *     // Create many DbCategories
     *     const dbCategory = await prisma.dbCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbCategoryCreateManyArgs>(
      args?: SelectSubset<T, DbCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbCategory.
     * @param {DbCategoryDeleteArgs} args - Arguments to delete one DbCategory.
     * @example
     * // Delete one DbCategory
     * const DbCategory = await prisma.dbCategory.delete({
     *   where: {
     *     // ... filter to delete one DbCategory
     *   }
     * })
     * 
    **/
    delete<T extends DbCategoryDeleteArgs>(
      args: SelectSubset<T, DbCategoryDeleteArgs>
    ): CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>>

    /**
     * Update one DbCategory.
     * @param {DbCategoryUpdateArgs} args - Arguments to update one DbCategory.
     * @example
     * // Update one DbCategory
     * const dbCategory = await prisma.dbCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbCategoryUpdateArgs>(
      args: SelectSubset<T, DbCategoryUpdateArgs>
    ): CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>>

    /**
     * Delete zero or more DbCategories.
     * @param {DbCategoryDeleteManyArgs} args - Arguments to filter DbCategories to delete.
     * @example
     * // Delete a few DbCategories
     * const { count } = await prisma.dbCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbCategoryDeleteManyArgs>(
      args?: SelectSubset<T, DbCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbCategories
     * const dbCategory = await prisma.dbCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbCategoryUpdateManyArgs>(
      args: SelectSubset<T, DbCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbCategory.
     * @param {DbCategoryUpsertArgs} args - Arguments to update or create a DbCategory.
     * @example
     * // Update or create a DbCategory
     * const dbCategory = await prisma.dbCategory.upsert({
     *   create: {
     *     // ... data to create a DbCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbCategory we want to update
     *   }
     * })
    **/
    upsert<T extends DbCategoryUpsertArgs>(
      args: SelectSubset<T, DbCategoryUpsertArgs>
    ): CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>>

    /**
     * Find one DbCategory that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbCategoryFindUniqueOrThrowArgs} args - Arguments to find a DbCategory
     * @example
     * // Get one DbCategory
     * const dbCategory = await prisma.dbCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbCategoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbCategoryFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>>

    /**
     * Find the first DbCategory that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCategoryFindFirstOrThrowArgs} args - Arguments to find a DbCategory
     * @example
     * // Get one DbCategory
     * const dbCategory = await prisma.dbCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbCategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbCategoryFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbCategoryClient<DbCategory>, Prisma__DbCategoryClient<DbCategoryGetPayload<T>>>

    /**
     * Count the number of DbCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCategoryCountArgs} args - Arguments to filter DbCategories to count.
     * @example
     * // Count the number of DbCategories
     * const count = await prisma.dbCategory.count({
     *   where: {
     *     // ... the filter for the DbCategories we want to count
     *   }
     * })
    **/
    count<T extends DbCategoryCountArgs>(
      args?: Subset<T, DbCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbCategoryAggregateArgs>(args: Subset<T, DbCategoryAggregateArgs>): PrismaPromise<GetDbCategoryAggregateType<T>>

    /**
     * Group by DbCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbCategoryGroupByArgs['orderBy'] }
        : { orderBy?: DbCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbCategoryGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbCategoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Transactions<T extends DbTransactionFindManyArgs = {}>(args?: Subset<T, DbTransactionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbTransaction>>, PrismaPromise<Array<DbTransactionGetPayload<T>>>>;

    TransactionSchedule<T extends DbTransactionScheduleFindManyArgs = {}>(args?: Subset<T, DbTransactionScheduleFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DbTransactionSchedule>>, PrismaPromise<Array<DbTransactionScheduleGetPayload<T>>>>;

    User<T extends DbUserArgs = {}>(args?: Subset<T, DbUserArgs>): CheckSelect<T, Prisma__DbUserClient<DbUser | null >, Prisma__DbUserClient<DbUserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbCategory base type for findUnique actions
   */
  export type DbCategoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
    /**
     * Filter, which DbCategory to fetch.
     * 
    **/
    where: DbCategoryWhereUniqueInput
  }

  /**
   * DbCategory: findUnique
   */
  export interface DbCategoryFindUniqueArgs extends DbCategoryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbCategory base type for findFirst actions
   */
  export type DbCategoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
    /**
     * Filter, which DbCategory to fetch.
     * 
    **/
    where?: DbCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<DbCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbCategories.
     * 
    **/
    cursor?: DbCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbCategories.
     * 
    **/
    distinct?: Enumerable<DbCategoryScalarFieldEnum>
  }

  /**
   * DbCategory: findFirst
   */
  export interface DbCategoryFindFirstArgs extends DbCategoryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbCategory findMany
   */
  export type DbCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
    /**
     * Filter, which DbCategories to fetch.
     * 
    **/
    where?: DbCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<DbCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbCategories.
     * 
    **/
    cursor?: DbCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbCategories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbCategoryScalarFieldEnum>
  }


  /**
   * DbCategory create
   */
  export type DbCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
    /**
     * The data needed to create a DbCategory.
     * 
    **/
    data: XOR<DbCategoryCreateInput, DbCategoryUncheckedCreateInput>
  }


  /**
   * DbCategory createMany
   */
  export type DbCategoryCreateManyArgs = {
    /**
     * The data used to create many DbCategories.
     * 
    **/
    data: Enumerable<DbCategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbCategory update
   */
  export type DbCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
    /**
     * The data needed to update a DbCategory.
     * 
    **/
    data: XOR<DbCategoryUpdateInput, DbCategoryUncheckedUpdateInput>
    /**
     * Choose, which DbCategory to update.
     * 
    **/
    where: DbCategoryWhereUniqueInput
  }


  /**
   * DbCategory updateMany
   */
  export type DbCategoryUpdateManyArgs = {
    /**
     * The data used to update DbCategories.
     * 
    **/
    data: XOR<DbCategoryUpdateManyMutationInput, DbCategoryUncheckedUpdateManyInput>
    /**
     * Filter which DbCategories to update
     * 
    **/
    where?: DbCategoryWhereInput
  }


  /**
   * DbCategory upsert
   */
  export type DbCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
    /**
     * The filter to search for the DbCategory to update in case it exists.
     * 
    **/
    where: DbCategoryWhereUniqueInput
    /**
     * In case the DbCategory found by the `where` argument doesn't exist, create a new DbCategory with this data.
     * 
    **/
    create: XOR<DbCategoryCreateInput, DbCategoryUncheckedCreateInput>
    /**
     * In case the DbCategory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbCategoryUpdateInput, DbCategoryUncheckedUpdateInput>
  }


  /**
   * DbCategory delete
   */
  export type DbCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
    /**
     * Filter which DbCategory to delete.
     * 
    **/
    where: DbCategoryWhereUniqueInput
  }


  /**
   * DbCategory deleteMany
   */
  export type DbCategoryDeleteManyArgs = {
    /**
     * Filter which DbCategories to delete
     * 
    **/
    where?: DbCategoryWhereInput
  }


  /**
   * DbCategory: findUniqueOrThrow
   */
  export type DbCategoryFindUniqueOrThrowArgs = DbCategoryFindUniqueArgsBase
      

  /**
   * DbCategory: findFirstOrThrow
   */
  export type DbCategoryFindFirstOrThrowArgs = DbCategoryFindFirstArgsBase
      

  /**
   * DbCategory without action
   */
  export type DbCategoryArgs = {
    /**
     * Select specific fields to fetch from the DbCategory
     * 
    **/
    select?: DbCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbCategoryInclude | null
  }



  /**
   * Model DbFeedback
   */


  export type AggregateDbFeedback = {
    _count: DbFeedbackCountAggregateOutputType | null
    _min: DbFeedbackMinAggregateOutputType | null
    _max: DbFeedbackMaxAggregateOutputType | null
  }

  export type DbFeedbackMinAggregateOutputType = {
    id: string | null
    uid: string | null
    message: string | null
  }

  export type DbFeedbackMaxAggregateOutputType = {
    id: string | null
    uid: string | null
    message: string | null
  }

  export type DbFeedbackCountAggregateOutputType = {
    id: number
    uid: number
    message: number
    _all: number
  }


  export type DbFeedbackMinAggregateInputType = {
    id?: true
    uid?: true
    message?: true
  }

  export type DbFeedbackMaxAggregateInputType = {
    id?: true
    uid?: true
    message?: true
  }

  export type DbFeedbackCountAggregateInputType = {
    id?: true
    uid?: true
    message?: true
    _all?: true
  }

  export type DbFeedbackAggregateArgs = {
    /**
     * Filter which DbFeedback to aggregate.
     * 
    **/
    where?: DbFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<DbFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbFeedbacks
    **/
    _count?: true | DbFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbFeedbackMaxAggregateInputType
  }

  export type GetDbFeedbackAggregateType<T extends DbFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateDbFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbFeedback[P]>
      : GetScalarType<T[P], AggregateDbFeedback[P]>
  }




  export type DbFeedbackGroupByArgs = {
    where?: DbFeedbackWhereInput
    orderBy?: Enumerable<DbFeedbackOrderByWithAggregationInput>
    by: Array<DbFeedbackScalarFieldEnum>
    having?: DbFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbFeedbackCountAggregateInputType | true
    _min?: DbFeedbackMinAggregateInputType
    _max?: DbFeedbackMaxAggregateInputType
  }


  export type DbFeedbackGroupByOutputType = {
    id: string
    uid: string
    message: string | null
    _count: DbFeedbackCountAggregateOutputType | null
    _min: DbFeedbackMinAggregateOutputType | null
    _max: DbFeedbackMaxAggregateOutputType | null
  }

  type GetDbFeedbackGroupByPayload<T extends DbFeedbackGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], DbFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type DbFeedbackSelect = {
    id?: boolean
    uid?: boolean
    message?: boolean
    User?: boolean | DbUserArgs
  }

  export type DbFeedbackInclude = {
    User?: boolean | DbUserArgs
  }

  export type DbFeedbackGetPayload<
    S extends boolean | null | undefined | DbFeedbackArgs,
    U = keyof S
      > = S extends true
        ? DbFeedback
    : S extends undefined
    ? never
    : S extends DbFeedbackArgs | DbFeedbackFindManyArgs
    ?'include' extends U
    ? DbFeedback  & {
    [P in TrueKeys<S['include']>]:
        P extends 'User' ? DbUserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'User' ? DbUserGetPayload<S['select'][P]> :  P extends keyof DbFeedback ? DbFeedback[P] : never
  } 
    : DbFeedback
  : DbFeedback


  type DbFeedbackCountArgs = Merge<
    Omit<DbFeedbackFindManyArgs, 'select' | 'include'> & {
      select?: DbFeedbackCountAggregateInputType | true
    }
  >

  export interface DbFeedbackDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbFeedback that matches the filter.
     * @param {DbFeedbackFindUniqueArgs} args - Arguments to find a DbFeedback
     * @example
     * // Get one DbFeedback
     * const dbFeedback = await prisma.dbFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbFeedbackFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbFeedbackFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbFeedback'> extends True ? CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback | null >, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T> | null >>

    /**
     * Find the first DbFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbFeedbackFindFirstArgs} args - Arguments to find a DbFeedback
     * @example
     * // Get one DbFeedback
     * const dbFeedback = await prisma.dbFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbFeedbackFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbFeedbackFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbFeedback'> extends True ? CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback | null >, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T> | null >>

    /**
     * Find zero or more DbFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbFeedbackFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbFeedbacks
     * const dbFeedbacks = await prisma.dbFeedback.findMany()
     * 
     * // Get first 10 DbFeedbacks
     * const dbFeedbacks = await prisma.dbFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbFeedbackWithIdOnly = await prisma.dbFeedback.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DbFeedbackFindManyArgs>(
      args?: SelectSubset<T, DbFeedbackFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbFeedback>>, PrismaPromise<Array<DbFeedbackGetPayload<T>>>>

    /**
     * Create a DbFeedback.
     * @param {DbFeedbackCreateArgs} args - Arguments to create a DbFeedback.
     * @example
     * // Create one DbFeedback
     * const DbFeedback = await prisma.dbFeedback.create({
     *   data: {
     *     // ... data to create a DbFeedback
     *   }
     * })
     * 
    **/
    create<T extends DbFeedbackCreateArgs>(
      args: SelectSubset<T, DbFeedbackCreateArgs>
    ): CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>>

    /**
     * Create many DbFeedbacks.
     *     @param {DbFeedbackCreateManyArgs} args - Arguments to create many DbFeedbacks.
     *     @example
     *     // Create many DbFeedbacks
     *     const dbFeedback = await prisma.dbFeedback.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbFeedbackCreateManyArgs>(
      args?: SelectSubset<T, DbFeedbackCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbFeedback.
     * @param {DbFeedbackDeleteArgs} args - Arguments to delete one DbFeedback.
     * @example
     * // Delete one DbFeedback
     * const DbFeedback = await prisma.dbFeedback.delete({
     *   where: {
     *     // ... filter to delete one DbFeedback
     *   }
     * })
     * 
    **/
    delete<T extends DbFeedbackDeleteArgs>(
      args: SelectSubset<T, DbFeedbackDeleteArgs>
    ): CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>>

    /**
     * Update one DbFeedback.
     * @param {DbFeedbackUpdateArgs} args - Arguments to update one DbFeedback.
     * @example
     * // Update one DbFeedback
     * const dbFeedback = await prisma.dbFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbFeedbackUpdateArgs>(
      args: SelectSubset<T, DbFeedbackUpdateArgs>
    ): CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>>

    /**
     * Delete zero or more DbFeedbacks.
     * @param {DbFeedbackDeleteManyArgs} args - Arguments to filter DbFeedbacks to delete.
     * @example
     * // Delete a few DbFeedbacks
     * const { count } = await prisma.dbFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbFeedbackDeleteManyArgs>(
      args?: SelectSubset<T, DbFeedbackDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbFeedbacks
     * const dbFeedback = await prisma.dbFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbFeedbackUpdateManyArgs>(
      args: SelectSubset<T, DbFeedbackUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbFeedback.
     * @param {DbFeedbackUpsertArgs} args - Arguments to update or create a DbFeedback.
     * @example
     * // Update or create a DbFeedback
     * const dbFeedback = await prisma.dbFeedback.upsert({
     *   create: {
     *     // ... data to create a DbFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbFeedback we want to update
     *   }
     * })
    **/
    upsert<T extends DbFeedbackUpsertArgs>(
      args: SelectSubset<T, DbFeedbackUpsertArgs>
    ): CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>>

    /**
     * Find one DbFeedback that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbFeedbackFindUniqueOrThrowArgs} args - Arguments to find a DbFeedback
     * @example
     * // Get one DbFeedback
     * const dbFeedback = await prisma.dbFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbFeedbackFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbFeedbackFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>>

    /**
     * Find the first DbFeedback that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbFeedbackFindFirstOrThrowArgs} args - Arguments to find a DbFeedback
     * @example
     * // Get one DbFeedback
     * const dbFeedback = await prisma.dbFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbFeedbackFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbFeedbackFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbFeedbackClient<DbFeedback>, Prisma__DbFeedbackClient<DbFeedbackGetPayload<T>>>

    /**
     * Count the number of DbFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbFeedbackCountArgs} args - Arguments to filter DbFeedbacks to count.
     * @example
     * // Count the number of DbFeedbacks
     * const count = await prisma.dbFeedback.count({
     *   where: {
     *     // ... the filter for the DbFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends DbFeedbackCountArgs>(
      args?: Subset<T, DbFeedbackCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbFeedbackAggregateArgs>(args: Subset<T, DbFeedbackAggregateArgs>): PrismaPromise<GetDbFeedbackAggregateType<T>>

    /**
     * Group by DbFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbFeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: DbFeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbFeedbackGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbFeedbackClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends DbUserArgs = {}>(args?: Subset<T, DbUserArgs>): CheckSelect<T, Prisma__DbUserClient<DbUser | null >, Prisma__DbUserClient<DbUserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbFeedback base type for findUnique actions
   */
  export type DbFeedbackFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
    /**
     * Filter, which DbFeedback to fetch.
     * 
    **/
    where: DbFeedbackWhereUniqueInput
  }

  /**
   * DbFeedback: findUnique
   */
  export interface DbFeedbackFindUniqueArgs extends DbFeedbackFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbFeedback base type for findFirst actions
   */
  export type DbFeedbackFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
    /**
     * Filter, which DbFeedback to fetch.
     * 
    **/
    where?: DbFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<DbFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbFeedbacks.
     * 
    **/
    cursor?: DbFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbFeedbacks.
     * 
    **/
    distinct?: Enumerable<DbFeedbackScalarFieldEnum>
  }

  /**
   * DbFeedback: findFirst
   */
  export interface DbFeedbackFindFirstArgs extends DbFeedbackFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbFeedback findMany
   */
  export type DbFeedbackFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
    /**
     * Filter, which DbFeedbacks to fetch.
     * 
    **/
    where?: DbFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<DbFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbFeedbacks.
     * 
    **/
    cursor?: DbFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbFeedbacks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbFeedbackScalarFieldEnum>
  }


  /**
   * DbFeedback create
   */
  export type DbFeedbackCreateArgs = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
    /**
     * The data needed to create a DbFeedback.
     * 
    **/
    data: XOR<DbFeedbackCreateInput, DbFeedbackUncheckedCreateInput>
  }


  /**
   * DbFeedback createMany
   */
  export type DbFeedbackCreateManyArgs = {
    /**
     * The data used to create many DbFeedbacks.
     * 
    **/
    data: Enumerable<DbFeedbackCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbFeedback update
   */
  export type DbFeedbackUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
    /**
     * The data needed to update a DbFeedback.
     * 
    **/
    data: XOR<DbFeedbackUpdateInput, DbFeedbackUncheckedUpdateInput>
    /**
     * Choose, which DbFeedback to update.
     * 
    **/
    where: DbFeedbackWhereUniqueInput
  }


  /**
   * DbFeedback updateMany
   */
  export type DbFeedbackUpdateManyArgs = {
    /**
     * The data used to update DbFeedbacks.
     * 
    **/
    data: XOR<DbFeedbackUpdateManyMutationInput, DbFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which DbFeedbacks to update
     * 
    **/
    where?: DbFeedbackWhereInput
  }


  /**
   * DbFeedback upsert
   */
  export type DbFeedbackUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
    /**
     * The filter to search for the DbFeedback to update in case it exists.
     * 
    **/
    where: DbFeedbackWhereUniqueInput
    /**
     * In case the DbFeedback found by the `where` argument doesn't exist, create a new DbFeedback with this data.
     * 
    **/
    create: XOR<DbFeedbackCreateInput, DbFeedbackUncheckedCreateInput>
    /**
     * In case the DbFeedback was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbFeedbackUpdateInput, DbFeedbackUncheckedUpdateInput>
  }


  /**
   * DbFeedback delete
   */
  export type DbFeedbackDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
    /**
     * Filter which DbFeedback to delete.
     * 
    **/
    where: DbFeedbackWhereUniqueInput
  }


  /**
   * DbFeedback deleteMany
   */
  export type DbFeedbackDeleteManyArgs = {
    /**
     * Filter which DbFeedbacks to delete
     * 
    **/
    where?: DbFeedbackWhereInput
  }


  /**
   * DbFeedback: findUniqueOrThrow
   */
  export type DbFeedbackFindUniqueOrThrowArgs = DbFeedbackFindUniqueArgsBase
      

  /**
   * DbFeedback: findFirstOrThrow
   */
  export type DbFeedbackFindFirstOrThrowArgs = DbFeedbackFindFirstArgsBase
      

  /**
   * DbFeedback without action
   */
  export type DbFeedbackArgs = {
    /**
     * Select specific fields to fetch from the DbFeedback
     * 
    **/
    select?: DbFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DbFeedbackInclude | null
  }



  /**
   * Model DbConfig
   */


  export type AggregateDbConfig = {
    _count: DbConfigCountAggregateOutputType | null
    _min: DbConfigMinAggregateOutputType | null
    _max: DbConfigMaxAggregateOutputType | null
  }

  export type DbConfigMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type DbConfigMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type DbConfigCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type DbConfigMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type DbConfigMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type DbConfigCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type DbConfigAggregateArgs = {
    /**
     * Filter which DbConfig to aggregate.
     * 
    **/
    where?: DbConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<DbConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbConfigs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbConfigs
    **/
    _count?: true | DbConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbConfigMaxAggregateInputType
  }

  export type GetDbConfigAggregateType<T extends DbConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateDbConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbConfig[P]>
      : GetScalarType<T[P], AggregateDbConfig[P]>
  }




  export type DbConfigGroupByArgs = {
    where?: DbConfigWhereInput
    orderBy?: Enumerable<DbConfigOrderByWithAggregationInput>
    by: Array<DbConfigScalarFieldEnum>
    having?: DbConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbConfigCountAggregateInputType | true
    _min?: DbConfigMinAggregateInputType
    _max?: DbConfigMaxAggregateInputType
  }


  export type DbConfigGroupByOutputType = {
    key: string
    value: string
    _count: DbConfigCountAggregateOutputType | null
    _min: DbConfigMinAggregateOutputType | null
    _max: DbConfigMaxAggregateOutputType | null
  }

  type GetDbConfigGroupByPayload<T extends DbConfigGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbConfigGroupByOutputType[P]>
            : GetScalarType<T[P], DbConfigGroupByOutputType[P]>
        }
      >
    >


  export type DbConfigSelect = {
    key?: boolean
    value?: boolean
  }

  export type DbConfigGetPayload<
    S extends boolean | null | undefined | DbConfigArgs,
    U = keyof S
      > = S extends true
        ? DbConfig
    : S extends undefined
    ? never
    : S extends DbConfigArgs | DbConfigFindManyArgs
    ?'include' extends U
    ? DbConfig 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DbConfig ? DbConfig[P] : never
  } 
    : DbConfig
  : DbConfig


  type DbConfigCountArgs = Merge<
    Omit<DbConfigFindManyArgs, 'select' | 'include'> & {
      select?: DbConfigCountAggregateInputType | true
    }
  >

  export interface DbConfigDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbConfig that matches the filter.
     * @param {DbConfigFindUniqueArgs} args - Arguments to find a DbConfig
     * @example
     * // Get one DbConfig
     * const dbConfig = await prisma.dbConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbConfigFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbConfigFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbConfig'> extends True ? CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>> : CheckSelect<T, Prisma__DbConfigClient<DbConfig | null >, Prisma__DbConfigClient<DbConfigGetPayload<T> | null >>

    /**
     * Find the first DbConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConfigFindFirstArgs} args - Arguments to find a DbConfig
     * @example
     * // Get one DbConfig
     * const dbConfig = await prisma.dbConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbConfigFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbConfigFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbConfig'> extends True ? CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>> : CheckSelect<T, Prisma__DbConfigClient<DbConfig | null >, Prisma__DbConfigClient<DbConfigGetPayload<T> | null >>

    /**
     * Find zero or more DbConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConfigFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbConfigs
     * const dbConfigs = await prisma.dbConfig.findMany()
     * 
     * // Get first 10 DbConfigs
     * const dbConfigs = await prisma.dbConfig.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const dbConfigWithKeyOnly = await prisma.dbConfig.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends DbConfigFindManyArgs>(
      args?: SelectSubset<T, DbConfigFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbConfig>>, PrismaPromise<Array<DbConfigGetPayload<T>>>>

    /**
     * Create a DbConfig.
     * @param {DbConfigCreateArgs} args - Arguments to create a DbConfig.
     * @example
     * // Create one DbConfig
     * const DbConfig = await prisma.dbConfig.create({
     *   data: {
     *     // ... data to create a DbConfig
     *   }
     * })
     * 
    **/
    create<T extends DbConfigCreateArgs>(
      args: SelectSubset<T, DbConfigCreateArgs>
    ): CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>>

    /**
     * Create many DbConfigs.
     *     @param {DbConfigCreateManyArgs} args - Arguments to create many DbConfigs.
     *     @example
     *     // Create many DbConfigs
     *     const dbConfig = await prisma.dbConfig.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbConfigCreateManyArgs>(
      args?: SelectSubset<T, DbConfigCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbConfig.
     * @param {DbConfigDeleteArgs} args - Arguments to delete one DbConfig.
     * @example
     * // Delete one DbConfig
     * const DbConfig = await prisma.dbConfig.delete({
     *   where: {
     *     // ... filter to delete one DbConfig
     *   }
     * })
     * 
    **/
    delete<T extends DbConfigDeleteArgs>(
      args: SelectSubset<T, DbConfigDeleteArgs>
    ): CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>>

    /**
     * Update one DbConfig.
     * @param {DbConfigUpdateArgs} args - Arguments to update one DbConfig.
     * @example
     * // Update one DbConfig
     * const dbConfig = await prisma.dbConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbConfigUpdateArgs>(
      args: SelectSubset<T, DbConfigUpdateArgs>
    ): CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>>

    /**
     * Delete zero or more DbConfigs.
     * @param {DbConfigDeleteManyArgs} args - Arguments to filter DbConfigs to delete.
     * @example
     * // Delete a few DbConfigs
     * const { count } = await prisma.dbConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbConfigDeleteManyArgs>(
      args?: SelectSubset<T, DbConfigDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbConfigs
     * const dbConfig = await prisma.dbConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbConfigUpdateManyArgs>(
      args: SelectSubset<T, DbConfigUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbConfig.
     * @param {DbConfigUpsertArgs} args - Arguments to update or create a DbConfig.
     * @example
     * // Update or create a DbConfig
     * const dbConfig = await prisma.dbConfig.upsert({
     *   create: {
     *     // ... data to create a DbConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbConfig we want to update
     *   }
     * })
    **/
    upsert<T extends DbConfigUpsertArgs>(
      args: SelectSubset<T, DbConfigUpsertArgs>
    ): CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>>

    /**
     * Find one DbConfig that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbConfigFindUniqueOrThrowArgs} args - Arguments to find a DbConfig
     * @example
     * // Get one DbConfig
     * const dbConfig = await prisma.dbConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbConfigFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbConfigFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>>

    /**
     * Find the first DbConfig that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConfigFindFirstOrThrowArgs} args - Arguments to find a DbConfig
     * @example
     * // Get one DbConfig
     * const dbConfig = await prisma.dbConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbConfigFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbConfigFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbConfigClient<DbConfig>, Prisma__DbConfigClient<DbConfigGetPayload<T>>>

    /**
     * Count the number of DbConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConfigCountArgs} args - Arguments to filter DbConfigs to count.
     * @example
     * // Count the number of DbConfigs
     * const count = await prisma.dbConfig.count({
     *   where: {
     *     // ... the filter for the DbConfigs we want to count
     *   }
     * })
    **/
    count<T extends DbConfigCountArgs>(
      args?: Subset<T, DbConfigCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbConfigAggregateArgs>(args: Subset<T, DbConfigAggregateArgs>): PrismaPromise<GetDbConfigAggregateType<T>>

    /**
     * Group by DbConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbConfigGroupByArgs['orderBy'] }
        : { orderBy?: DbConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbConfigGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbConfigClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbConfig base type for findUnique actions
   */
  export type DbConfigFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
    /**
     * Filter, which DbConfig to fetch.
     * 
    **/
    where: DbConfigWhereUniqueInput
  }

  /**
   * DbConfig: findUnique
   */
  export interface DbConfigFindUniqueArgs extends DbConfigFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbConfig base type for findFirst actions
   */
  export type DbConfigFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
    /**
     * Filter, which DbConfig to fetch.
     * 
    **/
    where?: DbConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<DbConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbConfigs.
     * 
    **/
    cursor?: DbConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbConfigs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbConfigs.
     * 
    **/
    distinct?: Enumerable<DbConfigScalarFieldEnum>
  }

  /**
   * DbConfig: findFirst
   */
  export interface DbConfigFindFirstArgs extends DbConfigFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbConfig findMany
   */
  export type DbConfigFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
    /**
     * Filter, which DbConfigs to fetch.
     * 
    **/
    where?: DbConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<DbConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbConfigs.
     * 
    **/
    cursor?: DbConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbConfigs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbConfigScalarFieldEnum>
  }


  /**
   * DbConfig create
   */
  export type DbConfigCreateArgs = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
    /**
     * The data needed to create a DbConfig.
     * 
    **/
    data: XOR<DbConfigCreateInput, DbConfigUncheckedCreateInput>
  }


  /**
   * DbConfig createMany
   */
  export type DbConfigCreateManyArgs = {
    /**
     * The data used to create many DbConfigs.
     * 
    **/
    data: Enumerable<DbConfigCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbConfig update
   */
  export type DbConfigUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
    /**
     * The data needed to update a DbConfig.
     * 
    **/
    data: XOR<DbConfigUpdateInput, DbConfigUncheckedUpdateInput>
    /**
     * Choose, which DbConfig to update.
     * 
    **/
    where: DbConfigWhereUniqueInput
  }


  /**
   * DbConfig updateMany
   */
  export type DbConfigUpdateManyArgs = {
    /**
     * The data used to update DbConfigs.
     * 
    **/
    data: XOR<DbConfigUpdateManyMutationInput, DbConfigUncheckedUpdateManyInput>
    /**
     * Filter which DbConfigs to update
     * 
    **/
    where?: DbConfigWhereInput
  }


  /**
   * DbConfig upsert
   */
  export type DbConfigUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
    /**
     * The filter to search for the DbConfig to update in case it exists.
     * 
    **/
    where: DbConfigWhereUniqueInput
    /**
     * In case the DbConfig found by the `where` argument doesn't exist, create a new DbConfig with this data.
     * 
    **/
    create: XOR<DbConfigCreateInput, DbConfigUncheckedCreateInput>
    /**
     * In case the DbConfig was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbConfigUpdateInput, DbConfigUncheckedUpdateInput>
  }


  /**
   * DbConfig delete
   */
  export type DbConfigDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
    /**
     * Filter which DbConfig to delete.
     * 
    **/
    where: DbConfigWhereUniqueInput
  }


  /**
   * DbConfig deleteMany
   */
  export type DbConfigDeleteManyArgs = {
    /**
     * Filter which DbConfigs to delete
     * 
    **/
    where?: DbConfigWhereInput
  }


  /**
   * DbConfig: findUniqueOrThrow
   */
  export type DbConfigFindUniqueOrThrowArgs = DbConfigFindUniqueArgsBase
      

  /**
   * DbConfig: findFirstOrThrow
   */
  export type DbConfigFindFirstOrThrowArgs = DbConfigFindFirstArgsBase
      

  /**
   * DbConfig without action
   */
  export type DbConfigArgs = {
    /**
     * Select specific fields to fetch from the DbConfig
     * 
    **/
    select?: DbConfigSelect | null
  }



  /**
   * Model DbPremiumPrice
   */


  export type AggregateDbPremiumPrice = {
    _count: DbPremiumPriceCountAggregateOutputType | null
    _avg: DbPremiumPriceAvgAggregateOutputType | null
    _sum: DbPremiumPriceSumAggregateOutputType | null
    _min: DbPremiumPriceMinAggregateOutputType | null
    _max: DbPremiumPriceMaxAggregateOutputType | null
  }

  export type DbPremiumPriceAvgAggregateOutputType = {
    unitAmount: number | null
    recurringIntervalCount: number | null
  }

  export type DbPremiumPriceSumAggregateOutputType = {
    unitAmount: number | null
    recurringIntervalCount: number | null
  }

  export type DbPremiumPriceMinAggregateOutputType = {
    id: string | null
    unitAmount: number | null
    productId: string | null
    active: boolean | null
    currency: string | null
    nickname: string | null
    type: string | null
    recurringInterval: string | null
    recurringIntervalCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbPremiumPriceMaxAggregateOutputType = {
    id: string | null
    unitAmount: number | null
    productId: string | null
    active: boolean | null
    currency: string | null
    nickname: string | null
    type: string | null
    recurringInterval: string | null
    recurringIntervalCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbPremiumPriceCountAggregateOutputType = {
    id: number
    unitAmount: number
    productId: number
    active: number
    currency: number
    nickname: number
    type: number
    recurringInterval: number
    recurringIntervalCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DbPremiumPriceAvgAggregateInputType = {
    unitAmount?: true
    recurringIntervalCount?: true
  }

  export type DbPremiumPriceSumAggregateInputType = {
    unitAmount?: true
    recurringIntervalCount?: true
  }

  export type DbPremiumPriceMinAggregateInputType = {
    id?: true
    unitAmount?: true
    productId?: true
    active?: true
    currency?: true
    nickname?: true
    type?: true
    recurringInterval?: true
    recurringIntervalCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbPremiumPriceMaxAggregateInputType = {
    id?: true
    unitAmount?: true
    productId?: true
    active?: true
    currency?: true
    nickname?: true
    type?: true
    recurringInterval?: true
    recurringIntervalCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbPremiumPriceCountAggregateInputType = {
    id?: true
    unitAmount?: true
    productId?: true
    active?: true
    currency?: true
    nickname?: true
    type?: true
    recurringInterval?: true
    recurringIntervalCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DbPremiumPriceAggregateArgs = {
    /**
     * Filter which DbPremiumPrice to aggregate.
     * 
    **/
    where?: DbPremiumPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbPremiumPrices to fetch.
     * 
    **/
    orderBy?: Enumerable<DbPremiumPriceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbPremiumPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbPremiumPrices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbPremiumPrices.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbPremiumPrices
    **/
    _count?: true | DbPremiumPriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DbPremiumPriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DbPremiumPriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbPremiumPriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbPremiumPriceMaxAggregateInputType
  }

  export type GetDbPremiumPriceAggregateType<T extends DbPremiumPriceAggregateArgs> = {
        [P in keyof T & keyof AggregateDbPremiumPrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbPremiumPrice[P]>
      : GetScalarType<T[P], AggregateDbPremiumPrice[P]>
  }




  export type DbPremiumPriceGroupByArgs = {
    where?: DbPremiumPriceWhereInput
    orderBy?: Enumerable<DbPremiumPriceOrderByWithAggregationInput>
    by: Array<DbPremiumPriceScalarFieldEnum>
    having?: DbPremiumPriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbPremiumPriceCountAggregateInputType | true
    _avg?: DbPremiumPriceAvgAggregateInputType
    _sum?: DbPremiumPriceSumAggregateInputType
    _min?: DbPremiumPriceMinAggregateInputType
    _max?: DbPremiumPriceMaxAggregateInputType
  }


  export type DbPremiumPriceGroupByOutputType = {
    id: string
    unitAmount: number | null
    productId: string
    active: boolean
    currency: string
    nickname: string | null
    type: string
    recurringInterval: string | null
    recurringIntervalCount: number | null
    createdAt: Date
    updatedAt: Date
    _count: DbPremiumPriceCountAggregateOutputType | null
    _avg: DbPremiumPriceAvgAggregateOutputType | null
    _sum: DbPremiumPriceSumAggregateOutputType | null
    _min: DbPremiumPriceMinAggregateOutputType | null
    _max: DbPremiumPriceMaxAggregateOutputType | null
  }

  type GetDbPremiumPriceGroupByPayload<T extends DbPremiumPriceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbPremiumPriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbPremiumPriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbPremiumPriceGroupByOutputType[P]>
            : GetScalarType<T[P], DbPremiumPriceGroupByOutputType[P]>
        }
      >
    >


  export type DbPremiumPriceSelect = {
    id?: boolean
    unitAmount?: boolean
    productId?: boolean
    active?: boolean
    currency?: boolean
    nickname?: boolean
    type?: boolean
    recurringInterval?: boolean
    recurringIntervalCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DbPremiumPriceGetPayload<
    S extends boolean | null | undefined | DbPremiumPriceArgs,
    U = keyof S
      > = S extends true
        ? DbPremiumPrice
    : S extends undefined
    ? never
    : S extends DbPremiumPriceArgs | DbPremiumPriceFindManyArgs
    ?'include' extends U
    ? DbPremiumPrice 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DbPremiumPrice ? DbPremiumPrice[P] : never
  } 
    : DbPremiumPrice
  : DbPremiumPrice


  type DbPremiumPriceCountArgs = Merge<
    Omit<DbPremiumPriceFindManyArgs, 'select' | 'include'> & {
      select?: DbPremiumPriceCountAggregateInputType | true
    }
  >

  export interface DbPremiumPriceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbPremiumPrice that matches the filter.
     * @param {DbPremiumPriceFindUniqueArgs} args - Arguments to find a DbPremiumPrice
     * @example
     * // Get one DbPremiumPrice
     * const dbPremiumPrice = await prisma.dbPremiumPrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbPremiumPriceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbPremiumPriceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbPremiumPrice'> extends True ? CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>> : CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice | null >, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T> | null >>

    /**
     * Find the first DbPremiumPrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbPremiumPriceFindFirstArgs} args - Arguments to find a DbPremiumPrice
     * @example
     * // Get one DbPremiumPrice
     * const dbPremiumPrice = await prisma.dbPremiumPrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbPremiumPriceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbPremiumPriceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbPremiumPrice'> extends True ? CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>> : CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice | null >, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T> | null >>

    /**
     * Find zero or more DbPremiumPrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbPremiumPriceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbPremiumPrices
     * const dbPremiumPrices = await prisma.dbPremiumPrice.findMany()
     * 
     * // Get first 10 DbPremiumPrices
     * const dbPremiumPrices = await prisma.dbPremiumPrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbPremiumPriceWithIdOnly = await prisma.dbPremiumPrice.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DbPremiumPriceFindManyArgs>(
      args?: SelectSubset<T, DbPremiumPriceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbPremiumPrice>>, PrismaPromise<Array<DbPremiumPriceGetPayload<T>>>>

    /**
     * Create a DbPremiumPrice.
     * @param {DbPremiumPriceCreateArgs} args - Arguments to create a DbPremiumPrice.
     * @example
     * // Create one DbPremiumPrice
     * const DbPremiumPrice = await prisma.dbPremiumPrice.create({
     *   data: {
     *     // ... data to create a DbPremiumPrice
     *   }
     * })
     * 
    **/
    create<T extends DbPremiumPriceCreateArgs>(
      args: SelectSubset<T, DbPremiumPriceCreateArgs>
    ): CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>>

    /**
     * Create many DbPremiumPrices.
     *     @param {DbPremiumPriceCreateManyArgs} args - Arguments to create many DbPremiumPrices.
     *     @example
     *     // Create many DbPremiumPrices
     *     const dbPremiumPrice = await prisma.dbPremiumPrice.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbPremiumPriceCreateManyArgs>(
      args?: SelectSubset<T, DbPremiumPriceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbPremiumPrice.
     * @param {DbPremiumPriceDeleteArgs} args - Arguments to delete one DbPremiumPrice.
     * @example
     * // Delete one DbPremiumPrice
     * const DbPremiumPrice = await prisma.dbPremiumPrice.delete({
     *   where: {
     *     // ... filter to delete one DbPremiumPrice
     *   }
     * })
     * 
    **/
    delete<T extends DbPremiumPriceDeleteArgs>(
      args: SelectSubset<T, DbPremiumPriceDeleteArgs>
    ): CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>>

    /**
     * Update one DbPremiumPrice.
     * @param {DbPremiumPriceUpdateArgs} args - Arguments to update one DbPremiumPrice.
     * @example
     * // Update one DbPremiumPrice
     * const dbPremiumPrice = await prisma.dbPremiumPrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbPremiumPriceUpdateArgs>(
      args: SelectSubset<T, DbPremiumPriceUpdateArgs>
    ): CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>>

    /**
     * Delete zero or more DbPremiumPrices.
     * @param {DbPremiumPriceDeleteManyArgs} args - Arguments to filter DbPremiumPrices to delete.
     * @example
     * // Delete a few DbPremiumPrices
     * const { count } = await prisma.dbPremiumPrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbPremiumPriceDeleteManyArgs>(
      args?: SelectSubset<T, DbPremiumPriceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbPremiumPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbPremiumPriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbPremiumPrices
     * const dbPremiumPrice = await prisma.dbPremiumPrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbPremiumPriceUpdateManyArgs>(
      args: SelectSubset<T, DbPremiumPriceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbPremiumPrice.
     * @param {DbPremiumPriceUpsertArgs} args - Arguments to update or create a DbPremiumPrice.
     * @example
     * // Update or create a DbPremiumPrice
     * const dbPremiumPrice = await prisma.dbPremiumPrice.upsert({
     *   create: {
     *     // ... data to create a DbPremiumPrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbPremiumPrice we want to update
     *   }
     * })
    **/
    upsert<T extends DbPremiumPriceUpsertArgs>(
      args: SelectSubset<T, DbPremiumPriceUpsertArgs>
    ): CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>>

    /**
     * Find one DbPremiumPrice that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbPremiumPriceFindUniqueOrThrowArgs} args - Arguments to find a DbPremiumPrice
     * @example
     * // Get one DbPremiumPrice
     * const dbPremiumPrice = await prisma.dbPremiumPrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbPremiumPriceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbPremiumPriceFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>>

    /**
     * Find the first DbPremiumPrice that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbPremiumPriceFindFirstOrThrowArgs} args - Arguments to find a DbPremiumPrice
     * @example
     * // Get one DbPremiumPrice
     * const dbPremiumPrice = await prisma.dbPremiumPrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbPremiumPriceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbPremiumPriceFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbPremiumPriceClient<DbPremiumPrice>, Prisma__DbPremiumPriceClient<DbPremiumPriceGetPayload<T>>>

    /**
     * Count the number of DbPremiumPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbPremiumPriceCountArgs} args - Arguments to filter DbPremiumPrices to count.
     * @example
     * // Count the number of DbPremiumPrices
     * const count = await prisma.dbPremiumPrice.count({
     *   where: {
     *     // ... the filter for the DbPremiumPrices we want to count
     *   }
     * })
    **/
    count<T extends DbPremiumPriceCountArgs>(
      args?: Subset<T, DbPremiumPriceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbPremiumPriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbPremiumPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbPremiumPriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbPremiumPriceAggregateArgs>(args: Subset<T, DbPremiumPriceAggregateArgs>): PrismaPromise<GetDbPremiumPriceAggregateType<T>>

    /**
     * Group by DbPremiumPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbPremiumPriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbPremiumPriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbPremiumPriceGroupByArgs['orderBy'] }
        : { orderBy?: DbPremiumPriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbPremiumPriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbPremiumPriceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbPremiumPrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbPremiumPriceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbPremiumPrice base type for findUnique actions
   */
  export type DbPremiumPriceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
    /**
     * Filter, which DbPremiumPrice to fetch.
     * 
    **/
    where: DbPremiumPriceWhereUniqueInput
  }

  /**
   * DbPremiumPrice: findUnique
   */
  export interface DbPremiumPriceFindUniqueArgs extends DbPremiumPriceFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbPremiumPrice base type for findFirst actions
   */
  export type DbPremiumPriceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
    /**
     * Filter, which DbPremiumPrice to fetch.
     * 
    **/
    where?: DbPremiumPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbPremiumPrices to fetch.
     * 
    **/
    orderBy?: Enumerable<DbPremiumPriceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbPremiumPrices.
     * 
    **/
    cursor?: DbPremiumPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbPremiumPrices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbPremiumPrices.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbPremiumPrices.
     * 
    **/
    distinct?: Enumerable<DbPremiumPriceScalarFieldEnum>
  }

  /**
   * DbPremiumPrice: findFirst
   */
  export interface DbPremiumPriceFindFirstArgs extends DbPremiumPriceFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbPremiumPrice findMany
   */
  export type DbPremiumPriceFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
    /**
     * Filter, which DbPremiumPrices to fetch.
     * 
    **/
    where?: DbPremiumPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbPremiumPrices to fetch.
     * 
    **/
    orderBy?: Enumerable<DbPremiumPriceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbPremiumPrices.
     * 
    **/
    cursor?: DbPremiumPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbPremiumPrices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbPremiumPrices.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbPremiumPriceScalarFieldEnum>
  }


  /**
   * DbPremiumPrice create
   */
  export type DbPremiumPriceCreateArgs = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
    /**
     * The data needed to create a DbPremiumPrice.
     * 
    **/
    data: XOR<DbPremiumPriceCreateInput, DbPremiumPriceUncheckedCreateInput>
  }


  /**
   * DbPremiumPrice createMany
   */
  export type DbPremiumPriceCreateManyArgs = {
    /**
     * The data used to create many DbPremiumPrices.
     * 
    **/
    data: Enumerable<DbPremiumPriceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbPremiumPrice update
   */
  export type DbPremiumPriceUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
    /**
     * The data needed to update a DbPremiumPrice.
     * 
    **/
    data: XOR<DbPremiumPriceUpdateInput, DbPremiumPriceUncheckedUpdateInput>
    /**
     * Choose, which DbPremiumPrice to update.
     * 
    **/
    where: DbPremiumPriceWhereUniqueInput
  }


  /**
   * DbPremiumPrice updateMany
   */
  export type DbPremiumPriceUpdateManyArgs = {
    /**
     * The data used to update DbPremiumPrices.
     * 
    **/
    data: XOR<DbPremiumPriceUpdateManyMutationInput, DbPremiumPriceUncheckedUpdateManyInput>
    /**
     * Filter which DbPremiumPrices to update
     * 
    **/
    where?: DbPremiumPriceWhereInput
  }


  /**
   * DbPremiumPrice upsert
   */
  export type DbPremiumPriceUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
    /**
     * The filter to search for the DbPremiumPrice to update in case it exists.
     * 
    **/
    where: DbPremiumPriceWhereUniqueInput
    /**
     * In case the DbPremiumPrice found by the `where` argument doesn't exist, create a new DbPremiumPrice with this data.
     * 
    **/
    create: XOR<DbPremiumPriceCreateInput, DbPremiumPriceUncheckedCreateInput>
    /**
     * In case the DbPremiumPrice was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbPremiumPriceUpdateInput, DbPremiumPriceUncheckedUpdateInput>
  }


  /**
   * DbPremiumPrice delete
   */
  export type DbPremiumPriceDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
    /**
     * Filter which DbPremiumPrice to delete.
     * 
    **/
    where: DbPremiumPriceWhereUniqueInput
  }


  /**
   * DbPremiumPrice deleteMany
   */
  export type DbPremiumPriceDeleteManyArgs = {
    /**
     * Filter which DbPremiumPrices to delete
     * 
    **/
    where?: DbPremiumPriceWhereInput
  }


  /**
   * DbPremiumPrice: findUniqueOrThrow
   */
  export type DbPremiumPriceFindUniqueOrThrowArgs = DbPremiumPriceFindUniqueArgsBase
      

  /**
   * DbPremiumPrice: findFirstOrThrow
   */
  export type DbPremiumPriceFindFirstOrThrowArgs = DbPremiumPriceFindFirstArgsBase
      

  /**
   * DbPremiumPrice without action
   */
  export type DbPremiumPriceArgs = {
    /**
     * Select specific fields to fetch from the DbPremiumPrice
     * 
    **/
    select?: DbPremiumPriceSelect | null
  }



  /**
   * Model DbScheduledTask
   */


  export type AggregateDbScheduledTask = {
    _count: DbScheduledTaskCountAggregateOutputType | null
    _min: DbScheduledTaskMinAggregateOutputType | null
    _max: DbScheduledTaskMaxAggregateOutputType | null
  }

  export type DbScheduledTaskMinAggregateOutputType = {
    id: string | null
    latest: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbScheduledTaskMaxAggregateOutputType = {
    id: string | null
    latest: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbScheduledTaskCountAggregateOutputType = {
    id: number
    latest: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DbScheduledTaskMinAggregateInputType = {
    id?: true
    latest?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbScheduledTaskMaxAggregateInputType = {
    id?: true
    latest?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbScheduledTaskCountAggregateInputType = {
    id?: true
    latest?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DbScheduledTaskAggregateArgs = {
    /**
     * Filter which DbScheduledTask to aggregate.
     * 
    **/
    where?: DbScheduledTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbScheduledTasks to fetch.
     * 
    **/
    orderBy?: Enumerable<DbScheduledTaskOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DbScheduledTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbScheduledTasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbScheduledTasks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbScheduledTasks
    **/
    _count?: true | DbScheduledTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbScheduledTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbScheduledTaskMaxAggregateInputType
  }

  export type GetDbScheduledTaskAggregateType<T extends DbScheduledTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateDbScheduledTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbScheduledTask[P]>
      : GetScalarType<T[P], AggregateDbScheduledTask[P]>
  }




  export type DbScheduledTaskGroupByArgs = {
    where?: DbScheduledTaskWhereInput
    orderBy?: Enumerable<DbScheduledTaskOrderByWithAggregationInput>
    by: Array<DbScheduledTaskScalarFieldEnum>
    having?: DbScheduledTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbScheduledTaskCountAggregateInputType | true
    _min?: DbScheduledTaskMinAggregateInputType
    _max?: DbScheduledTaskMaxAggregateInputType
  }


  export type DbScheduledTaskGroupByOutputType = {
    id: string
    latest: Date
    createdAt: Date
    updatedAt: Date
    _count: DbScheduledTaskCountAggregateOutputType | null
    _min: DbScheduledTaskMinAggregateOutputType | null
    _max: DbScheduledTaskMaxAggregateOutputType | null
  }

  type GetDbScheduledTaskGroupByPayload<T extends DbScheduledTaskGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DbScheduledTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbScheduledTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbScheduledTaskGroupByOutputType[P]>
            : GetScalarType<T[P], DbScheduledTaskGroupByOutputType[P]>
        }
      >
    >


  export type DbScheduledTaskSelect = {
    id?: boolean
    latest?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DbScheduledTaskGetPayload<
    S extends boolean | null | undefined | DbScheduledTaskArgs,
    U = keyof S
      > = S extends true
        ? DbScheduledTask
    : S extends undefined
    ? never
    : S extends DbScheduledTaskArgs | DbScheduledTaskFindManyArgs
    ?'include' extends U
    ? DbScheduledTask 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DbScheduledTask ? DbScheduledTask[P] : never
  } 
    : DbScheduledTask
  : DbScheduledTask


  type DbScheduledTaskCountArgs = Merge<
    Omit<DbScheduledTaskFindManyArgs, 'select' | 'include'> & {
      select?: DbScheduledTaskCountAggregateInputType | true
    }
  >

  export interface DbScheduledTaskDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DbScheduledTask that matches the filter.
     * @param {DbScheduledTaskFindUniqueArgs} args - Arguments to find a DbScheduledTask
     * @example
     * // Get one DbScheduledTask
     * const dbScheduledTask = await prisma.dbScheduledTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DbScheduledTaskFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DbScheduledTaskFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DbScheduledTask'> extends True ? CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>> : CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask | null >, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T> | null >>

    /**
     * Find the first DbScheduledTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbScheduledTaskFindFirstArgs} args - Arguments to find a DbScheduledTask
     * @example
     * // Get one DbScheduledTask
     * const dbScheduledTask = await prisma.dbScheduledTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DbScheduledTaskFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DbScheduledTaskFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DbScheduledTask'> extends True ? CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>> : CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask | null >, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T> | null >>

    /**
     * Find zero or more DbScheduledTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbScheduledTaskFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbScheduledTasks
     * const dbScheduledTasks = await prisma.dbScheduledTask.findMany()
     * 
     * // Get first 10 DbScheduledTasks
     * const dbScheduledTasks = await prisma.dbScheduledTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbScheduledTaskWithIdOnly = await prisma.dbScheduledTask.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DbScheduledTaskFindManyArgs>(
      args?: SelectSubset<T, DbScheduledTaskFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DbScheduledTask>>, PrismaPromise<Array<DbScheduledTaskGetPayload<T>>>>

    /**
     * Create a DbScheduledTask.
     * @param {DbScheduledTaskCreateArgs} args - Arguments to create a DbScheduledTask.
     * @example
     * // Create one DbScheduledTask
     * const DbScheduledTask = await prisma.dbScheduledTask.create({
     *   data: {
     *     // ... data to create a DbScheduledTask
     *   }
     * })
     * 
    **/
    create<T extends DbScheduledTaskCreateArgs>(
      args: SelectSubset<T, DbScheduledTaskCreateArgs>
    ): CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>>

    /**
     * Create many DbScheduledTasks.
     *     @param {DbScheduledTaskCreateManyArgs} args - Arguments to create many DbScheduledTasks.
     *     @example
     *     // Create many DbScheduledTasks
     *     const dbScheduledTask = await prisma.dbScheduledTask.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DbScheduledTaskCreateManyArgs>(
      args?: SelectSubset<T, DbScheduledTaskCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DbScheduledTask.
     * @param {DbScheduledTaskDeleteArgs} args - Arguments to delete one DbScheduledTask.
     * @example
     * // Delete one DbScheduledTask
     * const DbScheduledTask = await prisma.dbScheduledTask.delete({
     *   where: {
     *     // ... filter to delete one DbScheduledTask
     *   }
     * })
     * 
    **/
    delete<T extends DbScheduledTaskDeleteArgs>(
      args: SelectSubset<T, DbScheduledTaskDeleteArgs>
    ): CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>>

    /**
     * Update one DbScheduledTask.
     * @param {DbScheduledTaskUpdateArgs} args - Arguments to update one DbScheduledTask.
     * @example
     * // Update one DbScheduledTask
     * const dbScheduledTask = await prisma.dbScheduledTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DbScheduledTaskUpdateArgs>(
      args: SelectSubset<T, DbScheduledTaskUpdateArgs>
    ): CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>>

    /**
     * Delete zero or more DbScheduledTasks.
     * @param {DbScheduledTaskDeleteManyArgs} args - Arguments to filter DbScheduledTasks to delete.
     * @example
     * // Delete a few DbScheduledTasks
     * const { count } = await prisma.dbScheduledTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DbScheduledTaskDeleteManyArgs>(
      args?: SelectSubset<T, DbScheduledTaskDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbScheduledTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbScheduledTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbScheduledTasks
     * const dbScheduledTask = await prisma.dbScheduledTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DbScheduledTaskUpdateManyArgs>(
      args: SelectSubset<T, DbScheduledTaskUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DbScheduledTask.
     * @param {DbScheduledTaskUpsertArgs} args - Arguments to update or create a DbScheduledTask.
     * @example
     * // Update or create a DbScheduledTask
     * const dbScheduledTask = await prisma.dbScheduledTask.upsert({
     *   create: {
     *     // ... data to create a DbScheduledTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbScheduledTask we want to update
     *   }
     * })
    **/
    upsert<T extends DbScheduledTaskUpsertArgs>(
      args: SelectSubset<T, DbScheduledTaskUpsertArgs>
    ): CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>>

    /**
     * Find one DbScheduledTask that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DbScheduledTaskFindUniqueOrThrowArgs} args - Arguments to find a DbScheduledTask
     * @example
     * // Get one DbScheduledTask
     * const dbScheduledTask = await prisma.dbScheduledTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DbScheduledTaskFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DbScheduledTaskFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>>

    /**
     * Find the first DbScheduledTask that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbScheduledTaskFindFirstOrThrowArgs} args - Arguments to find a DbScheduledTask
     * @example
     * // Get one DbScheduledTask
     * const dbScheduledTask = await prisma.dbScheduledTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DbScheduledTaskFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DbScheduledTaskFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DbScheduledTaskClient<DbScheduledTask>, Prisma__DbScheduledTaskClient<DbScheduledTaskGetPayload<T>>>

    /**
     * Count the number of DbScheduledTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbScheduledTaskCountArgs} args - Arguments to filter DbScheduledTasks to count.
     * @example
     * // Count the number of DbScheduledTasks
     * const count = await prisma.dbScheduledTask.count({
     *   where: {
     *     // ... the filter for the DbScheduledTasks we want to count
     *   }
     * })
    **/
    count<T extends DbScheduledTaskCountArgs>(
      args?: Subset<T, DbScheduledTaskCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbScheduledTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbScheduledTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbScheduledTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbScheduledTaskAggregateArgs>(args: Subset<T, DbScheduledTaskAggregateArgs>): PrismaPromise<GetDbScheduledTaskAggregateType<T>>

    /**
     * Group by DbScheduledTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbScheduledTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbScheduledTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbScheduledTaskGroupByArgs['orderBy'] }
        : { orderBy?: DbScheduledTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbScheduledTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbScheduledTaskGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbScheduledTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DbScheduledTaskClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DbScheduledTask base type for findUnique actions
   */
  export type DbScheduledTaskFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
    /**
     * Filter, which DbScheduledTask to fetch.
     * 
    **/
    where: DbScheduledTaskWhereUniqueInput
  }

  /**
   * DbScheduledTask: findUnique
   */
  export interface DbScheduledTaskFindUniqueArgs extends DbScheduledTaskFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbScheduledTask base type for findFirst actions
   */
  export type DbScheduledTaskFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
    /**
     * Filter, which DbScheduledTask to fetch.
     * 
    **/
    where?: DbScheduledTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbScheduledTasks to fetch.
     * 
    **/
    orderBy?: Enumerable<DbScheduledTaskOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbScheduledTasks.
     * 
    **/
    cursor?: DbScheduledTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbScheduledTasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbScheduledTasks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbScheduledTasks.
     * 
    **/
    distinct?: Enumerable<DbScheduledTaskScalarFieldEnum>
  }

  /**
   * DbScheduledTask: findFirst
   */
  export interface DbScheduledTaskFindFirstArgs extends DbScheduledTaskFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * DbScheduledTask findMany
   */
  export type DbScheduledTaskFindManyArgs = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
    /**
     * Filter, which DbScheduledTasks to fetch.
     * 
    **/
    where?: DbScheduledTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbScheduledTasks to fetch.
     * 
    **/
    orderBy?: Enumerable<DbScheduledTaskOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbScheduledTasks.
     * 
    **/
    cursor?: DbScheduledTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbScheduledTasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbScheduledTasks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DbScheduledTaskScalarFieldEnum>
  }


  /**
   * DbScheduledTask create
   */
  export type DbScheduledTaskCreateArgs = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
    /**
     * The data needed to create a DbScheduledTask.
     * 
    **/
    data: XOR<DbScheduledTaskCreateInput, DbScheduledTaskUncheckedCreateInput>
  }


  /**
   * DbScheduledTask createMany
   */
  export type DbScheduledTaskCreateManyArgs = {
    /**
     * The data used to create many DbScheduledTasks.
     * 
    **/
    data: Enumerable<DbScheduledTaskCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DbScheduledTask update
   */
  export type DbScheduledTaskUpdateArgs = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
    /**
     * The data needed to update a DbScheduledTask.
     * 
    **/
    data: XOR<DbScheduledTaskUpdateInput, DbScheduledTaskUncheckedUpdateInput>
    /**
     * Choose, which DbScheduledTask to update.
     * 
    **/
    where: DbScheduledTaskWhereUniqueInput
  }


  /**
   * DbScheduledTask updateMany
   */
  export type DbScheduledTaskUpdateManyArgs = {
    /**
     * The data used to update DbScheduledTasks.
     * 
    **/
    data: XOR<DbScheduledTaskUpdateManyMutationInput, DbScheduledTaskUncheckedUpdateManyInput>
    /**
     * Filter which DbScheduledTasks to update
     * 
    **/
    where?: DbScheduledTaskWhereInput
  }


  /**
   * DbScheduledTask upsert
   */
  export type DbScheduledTaskUpsertArgs = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
    /**
     * The filter to search for the DbScheduledTask to update in case it exists.
     * 
    **/
    where: DbScheduledTaskWhereUniqueInput
    /**
     * In case the DbScheduledTask found by the `where` argument doesn't exist, create a new DbScheduledTask with this data.
     * 
    **/
    create: XOR<DbScheduledTaskCreateInput, DbScheduledTaskUncheckedCreateInput>
    /**
     * In case the DbScheduledTask was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DbScheduledTaskUpdateInput, DbScheduledTaskUncheckedUpdateInput>
  }


  /**
   * DbScheduledTask delete
   */
  export type DbScheduledTaskDeleteArgs = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
    /**
     * Filter which DbScheduledTask to delete.
     * 
    **/
    where: DbScheduledTaskWhereUniqueInput
  }


  /**
   * DbScheduledTask deleteMany
   */
  export type DbScheduledTaskDeleteManyArgs = {
    /**
     * Filter which DbScheduledTasks to delete
     * 
    **/
    where?: DbScheduledTaskWhereInput
  }


  /**
   * DbScheduledTask: findUniqueOrThrow
   */
  export type DbScheduledTaskFindUniqueOrThrowArgs = DbScheduledTaskFindUniqueArgsBase
      

  /**
   * DbScheduledTask: findFirstOrThrow
   */
  export type DbScheduledTaskFindFirstOrThrowArgs = DbScheduledTaskFindFirstArgsBase
      

  /**
   * DbScheduledTask without action
   */
  export type DbScheduledTaskArgs = {
    /**
     * Select specific fields to fetch from the DbScheduledTask
     * 
    **/
    select?: DbScheduledTaskSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const DbCategoryScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    value: 'value',
    icon: 'icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DbCategoryScalarFieldEnum = (typeof DbCategoryScalarFieldEnum)[keyof typeof DbCategoryScalarFieldEnum]


  export const DbConfigScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type DbConfigScalarFieldEnum = (typeof DbConfigScalarFieldEnum)[keyof typeof DbConfigScalarFieldEnum]


  export const DbFeedbackScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    message: 'message'
  };

  export type DbFeedbackScalarFieldEnum = (typeof DbFeedbackScalarFieldEnum)[keyof typeof DbFeedbackScalarFieldEnum]


  export const DbPremiumPriceScalarFieldEnum: {
    id: 'id',
    unitAmount: 'unitAmount',
    productId: 'productId',
    active: 'active',
    currency: 'currency',
    nickname: 'nickname',
    type: 'type',
    recurringInterval: 'recurringInterval',
    recurringIntervalCount: 'recurringIntervalCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DbPremiumPriceScalarFieldEnum = (typeof DbPremiumPriceScalarFieldEnum)[keyof typeof DbPremiumPriceScalarFieldEnum]


  export const DbScheduledTaskScalarFieldEnum: {
    id: 'id',
    latest: 'latest',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DbScheduledTaskScalarFieldEnum = (typeof DbScheduledTaskScalarFieldEnum)[keyof typeof DbScheduledTaskScalarFieldEnum]


  export const DbTransactionScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    categoryId: 'categoryId',
    comment: 'comment',
    integerAmount: 'integerAmount',
    time: 'time',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    scheduleId: 'scheduleId'
  };

  export type DbTransactionScalarFieldEnum = (typeof DbTransactionScalarFieldEnum)[keyof typeof DbTransactionScalarFieldEnum]


  export const DbTransactionScheduleScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    categoryId: 'categoryId',
    comment: 'comment',
    integerAmount: 'integerAmount',
    intervalType: 'intervalType',
    intervalEvery: 'intervalEvery',
    firstOccurrence: 'firstOccurrence',
    occurrences: 'occurrences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    latestCreatedOccurrence: 'latestCreatedOccurrence'
  };

  export type DbTransactionScheduleScalarFieldEnum = (typeof DbTransactionScheduleScalarFieldEnum)[keyof typeof DbTransactionScheduleScalarFieldEnum]


  export const DbUserPreferenceScalarFieldEnum: {
    uid: 'uid',
    key: 'key',
    value: 'value'
  };

  export type DbUserPreferenceScalarFieldEnum = (typeof DbUserPreferenceScalarFieldEnum)[keyof typeof DbUserPreferenceScalarFieldEnum]


  export const DbUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    emailVerified: 'emailVerified',
    password: 'password',
    tokenVersion: 'tokenVersion',
    disabled: 'disabled',
    isAdmin: 'isAdmin',
    googleId: 'googleId',
    stripeCustomerId: 'stripeCustomerId',
    displayName: 'displayName',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DbUserScalarFieldEnum = (typeof DbUserScalarFieldEnum)[keyof typeof DbUserScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type DbUserWhereInput = {
    AND?: Enumerable<DbUserWhereInput>
    OR?: Enumerable<DbUserWhereInput>
    NOT?: Enumerable<DbUserWhereInput>
    id?: StringFilter | string
    email?: StringNullableFilter | string | null
    emailVerified?: BoolFilter | boolean
    password?: StringNullableFilter | string | null
    tokenVersion?: IntFilter | number
    disabled?: BoolFilter | boolean
    isAdmin?: BoolFilter | boolean
    googleId?: StringNullableFilter | string | null
    stripeCustomerId?: StringNullableFilter | string | null
    displayName?: StringNullableFilter | string | null
    photoUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    Transactions?: DbTransactionListRelationFilter
    Categories?: DbCategoryListRelationFilter
    Feedback?: DbFeedbackListRelationFilter
    TransactionSchedule?: DbTransactionScheduleListRelationFilter
    Preferences?: DbUserPreferenceListRelationFilter
  }

  export type DbUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    tokenVersion?: SortOrder
    disabled?: SortOrder
    isAdmin?: SortOrder
    googleId?: SortOrder
    stripeCustomerId?: SortOrder
    displayName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Transactions?: DbTransactionOrderByRelationAggregateInput
    Categories?: DbCategoryOrderByRelationAggregateInput
    Feedback?: DbFeedbackOrderByRelationAggregateInput
    TransactionSchedule?: DbTransactionScheduleOrderByRelationAggregateInput
    Preferences?: DbUserPreferenceOrderByRelationAggregateInput
  }

  export type DbUserWhereUniqueInput = {
    id?: string
    email?: string
    googleId?: string
  }

  export type DbUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    tokenVersion?: SortOrder
    disabled?: SortOrder
    isAdmin?: SortOrder
    googleId?: SortOrder
    stripeCustomerId?: SortOrder
    displayName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DbUserCountOrderByAggregateInput
    _avg?: DbUserAvgOrderByAggregateInput
    _max?: DbUserMaxOrderByAggregateInput
    _min?: DbUserMinOrderByAggregateInput
    _sum?: DbUserSumOrderByAggregateInput
  }

  export type DbUserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbUserScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbUserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbUserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringNullableWithAggregatesFilter | string | null
    emailVerified?: BoolWithAggregatesFilter | boolean
    password?: StringNullableWithAggregatesFilter | string | null
    tokenVersion?: IntWithAggregatesFilter | number
    disabled?: BoolWithAggregatesFilter | boolean
    isAdmin?: BoolWithAggregatesFilter | boolean
    googleId?: StringNullableWithAggregatesFilter | string | null
    stripeCustomerId?: StringNullableWithAggregatesFilter | string | null
    displayName?: StringNullableWithAggregatesFilter | string | null
    photoUrl?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type DbUserPreferenceWhereInput = {
    AND?: Enumerable<DbUserPreferenceWhereInput>
    OR?: Enumerable<DbUserPreferenceWhereInput>
    NOT?: Enumerable<DbUserPreferenceWhereInput>
    uid?: StringFilter | string
    key?: StringFilter | string
    value?: StringFilter | string
    User?: XOR<DbUserRelationFilter, DbUserWhereInput>
  }

  export type DbUserPreferenceOrderByWithRelationInput = {
    uid?: SortOrder
    key?: SortOrder
    value?: SortOrder
    User?: DbUserOrderByWithRelationInput
  }

  export type DbUserPreferenceWhereUniqueInput = {
    uid_key?: DbUserPreferenceUidKeyCompoundUniqueInput
  }

  export type DbUserPreferenceOrderByWithAggregationInput = {
    uid?: SortOrder
    key?: SortOrder
    value?: SortOrder
    _count?: DbUserPreferenceCountOrderByAggregateInput
    _max?: DbUserPreferenceMaxOrderByAggregateInput
    _min?: DbUserPreferenceMinOrderByAggregateInput
  }

  export type DbUserPreferenceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbUserPreferenceScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbUserPreferenceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbUserPreferenceScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    key?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type DbTransactionWhereInput = {
    AND?: Enumerable<DbTransactionWhereInput>
    OR?: Enumerable<DbTransactionWhereInput>
    NOT?: Enumerable<DbTransactionWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    categoryId?: StringFilter | string
    comment?: StringNullableFilter | string | null
    integerAmount?: IntFilter | number
    time?: DateTimeFilter | Date | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    scheduleId?: StringNullableFilter | string | null
    User?: XOR<DbUserRelationFilter, DbUserWhereInput>
    Category?: XOR<DbCategoryRelationFilter, DbCategoryWhereInput>
    Schedule?: XOR<DbTransactionScheduleRelationFilter, DbTransactionScheduleWhereInput> | null
  }

  export type DbTransactionOrderByWithRelationInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    scheduleId?: SortOrder
    User?: DbUserOrderByWithRelationInput
    Category?: DbCategoryOrderByWithRelationInput
    Schedule?: DbTransactionScheduleOrderByWithRelationInput
  }

  export type DbTransactionWhereUniqueInput = {
    id?: string
  }

  export type DbTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    scheduleId?: SortOrder
    _count?: DbTransactionCountOrderByAggregateInput
    _avg?: DbTransactionAvgOrderByAggregateInput
    _max?: DbTransactionMaxOrderByAggregateInput
    _min?: DbTransactionMinOrderByAggregateInput
    _sum?: DbTransactionSumOrderByAggregateInput
  }

  export type DbTransactionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbTransactionScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbTransactionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbTransactionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    uid?: StringWithAggregatesFilter | string
    categoryId?: StringWithAggregatesFilter | string
    comment?: StringNullableWithAggregatesFilter | string | null
    integerAmount?: IntWithAggregatesFilter | number
    time?: DateTimeWithAggregatesFilter | Date | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    scheduleId?: StringNullableWithAggregatesFilter | string | null
  }

  export type DbTransactionScheduleWhereInput = {
    AND?: Enumerable<DbTransactionScheduleWhereInput>
    OR?: Enumerable<DbTransactionScheduleWhereInput>
    NOT?: Enumerable<DbTransactionScheduleWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    categoryId?: StringFilter | string
    comment?: StringNullableFilter | string | null
    integerAmount?: IntFilter | number
    intervalType?: EnumIntervalTypeFilter | IntervalType
    intervalEvery?: IntFilter | number
    firstOccurrence?: DateTimeFilter | Date | string
    occurrences?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    latestCreatedOccurrence?: DateTimeNullableFilter | Date | string | null
    User?: XOR<DbUserRelationFilter, DbUserWhereInput>
    Category?: XOR<DbCategoryRelationFilter, DbCategoryWhereInput>
    Transactions?: DbTransactionListRelationFilter
  }

  export type DbTransactionScheduleOrderByWithRelationInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    intervalType?: SortOrder
    intervalEvery?: SortOrder
    firstOccurrence?: SortOrder
    occurrences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestCreatedOccurrence?: SortOrder
    User?: DbUserOrderByWithRelationInput
    Category?: DbCategoryOrderByWithRelationInput
    Transactions?: DbTransactionOrderByRelationAggregateInput
  }

  export type DbTransactionScheduleWhereUniqueInput = {
    id?: string
  }

  export type DbTransactionScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    intervalType?: SortOrder
    intervalEvery?: SortOrder
    firstOccurrence?: SortOrder
    occurrences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestCreatedOccurrence?: SortOrder
    _count?: DbTransactionScheduleCountOrderByAggregateInput
    _avg?: DbTransactionScheduleAvgOrderByAggregateInput
    _max?: DbTransactionScheduleMaxOrderByAggregateInput
    _min?: DbTransactionScheduleMinOrderByAggregateInput
    _sum?: DbTransactionScheduleSumOrderByAggregateInput
  }

  export type DbTransactionScheduleScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbTransactionScheduleScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbTransactionScheduleScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbTransactionScheduleScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    uid?: StringWithAggregatesFilter | string
    categoryId?: StringWithAggregatesFilter | string
    comment?: StringNullableWithAggregatesFilter | string | null
    integerAmount?: IntWithAggregatesFilter | number
    intervalType?: EnumIntervalTypeWithAggregatesFilter | IntervalType
    intervalEvery?: IntWithAggregatesFilter | number
    firstOccurrence?: DateTimeWithAggregatesFilter | Date | string
    occurrences?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    latestCreatedOccurrence?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type DbCategoryWhereInput = {
    AND?: Enumerable<DbCategoryWhereInput>
    OR?: Enumerable<DbCategoryWhereInput>
    NOT?: Enumerable<DbCategoryWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    value?: StringFilter | string
    icon?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    Transactions?: DbTransactionListRelationFilter
    TransactionSchedule?: DbTransactionScheduleListRelationFilter
    User?: XOR<DbUserRelationFilter, DbUserWhereInput>
  }

  export type DbCategoryOrderByWithRelationInput = {
    id?: SortOrder
    uid?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Transactions?: DbTransactionOrderByRelationAggregateInput
    TransactionSchedule?: DbTransactionScheduleOrderByRelationAggregateInput
    User?: DbUserOrderByWithRelationInput
  }

  export type DbCategoryWhereUniqueInput = {
    id?: string
    unique_uid_value?: DbCategoryUnique_uid_valueCompoundUniqueInput
    unique_uid_id?: DbCategoryUnique_uid_idCompoundUniqueInput
  }

  export type DbCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    uid?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DbCategoryCountOrderByAggregateInput
    _max?: DbCategoryMaxOrderByAggregateInput
    _min?: DbCategoryMinOrderByAggregateInput
  }

  export type DbCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbCategoryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    uid?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
    icon?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type DbFeedbackWhereInput = {
    AND?: Enumerable<DbFeedbackWhereInput>
    OR?: Enumerable<DbFeedbackWhereInput>
    NOT?: Enumerable<DbFeedbackWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    message?: StringNullableFilter | string | null
    User?: XOR<DbUserRelationFilter, DbUserWhereInput>
  }

  export type DbFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    uid?: SortOrder
    message?: SortOrder
    User?: DbUserOrderByWithRelationInput
  }

  export type DbFeedbackWhereUniqueInput = {
    id?: string
  }

  export type DbFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    uid?: SortOrder
    message?: SortOrder
    _count?: DbFeedbackCountOrderByAggregateInput
    _max?: DbFeedbackMaxOrderByAggregateInput
    _min?: DbFeedbackMinOrderByAggregateInput
  }

  export type DbFeedbackScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbFeedbackScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbFeedbackScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbFeedbackScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    uid?: StringWithAggregatesFilter | string
    message?: StringNullableWithAggregatesFilter | string | null
  }

  export type DbConfigWhereInput = {
    AND?: Enumerable<DbConfigWhereInput>
    OR?: Enumerable<DbConfigWhereInput>
    NOT?: Enumerable<DbConfigWhereInput>
    key?: StringFilter | string
    value?: StringFilter | string
  }

  export type DbConfigOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type DbConfigWhereUniqueInput = {
    key?: string
  }

  export type DbConfigOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: DbConfigCountOrderByAggregateInput
    _max?: DbConfigMaxOrderByAggregateInput
    _min?: DbConfigMinOrderByAggregateInput
  }

  export type DbConfigScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbConfigScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbConfigScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbConfigScalarWhereWithAggregatesInput>
    key?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type DbPremiumPriceWhereInput = {
    AND?: Enumerable<DbPremiumPriceWhereInput>
    OR?: Enumerable<DbPremiumPriceWhereInput>
    NOT?: Enumerable<DbPremiumPriceWhereInput>
    id?: StringFilter | string
    unitAmount?: IntNullableFilter | number | null
    productId?: StringFilter | string
    active?: BoolFilter | boolean
    currency?: StringFilter | string
    nickname?: StringNullableFilter | string | null
    type?: StringFilter | string
    recurringInterval?: StringNullableFilter | string | null
    recurringIntervalCount?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DbPremiumPriceOrderByWithRelationInput = {
    id?: SortOrder
    unitAmount?: SortOrder
    productId?: SortOrder
    active?: SortOrder
    currency?: SortOrder
    nickname?: SortOrder
    type?: SortOrder
    recurringInterval?: SortOrder
    recurringIntervalCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbPremiumPriceWhereUniqueInput = {
    id?: string
  }

  export type DbPremiumPriceOrderByWithAggregationInput = {
    id?: SortOrder
    unitAmount?: SortOrder
    productId?: SortOrder
    active?: SortOrder
    currency?: SortOrder
    nickname?: SortOrder
    type?: SortOrder
    recurringInterval?: SortOrder
    recurringIntervalCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DbPremiumPriceCountOrderByAggregateInput
    _avg?: DbPremiumPriceAvgOrderByAggregateInput
    _max?: DbPremiumPriceMaxOrderByAggregateInput
    _min?: DbPremiumPriceMinOrderByAggregateInput
    _sum?: DbPremiumPriceSumOrderByAggregateInput
  }

  export type DbPremiumPriceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbPremiumPriceScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbPremiumPriceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbPremiumPriceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    unitAmount?: IntNullableWithAggregatesFilter | number | null
    productId?: StringWithAggregatesFilter | string
    active?: BoolWithAggregatesFilter | boolean
    currency?: StringWithAggregatesFilter | string
    nickname?: StringNullableWithAggregatesFilter | string | null
    type?: StringWithAggregatesFilter | string
    recurringInterval?: StringNullableWithAggregatesFilter | string | null
    recurringIntervalCount?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type DbScheduledTaskWhereInput = {
    AND?: Enumerable<DbScheduledTaskWhereInput>
    OR?: Enumerable<DbScheduledTaskWhereInput>
    NOT?: Enumerable<DbScheduledTaskWhereInput>
    id?: StringFilter | string
    latest?: DateTimeFilter | Date | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DbScheduledTaskOrderByWithRelationInput = {
    id?: SortOrder
    latest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbScheduledTaskWhereUniqueInput = {
    id?: string
  }

  export type DbScheduledTaskOrderByWithAggregationInput = {
    id?: SortOrder
    latest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DbScheduledTaskCountOrderByAggregateInput
    _max?: DbScheduledTaskMaxOrderByAggregateInput
    _min?: DbScheduledTaskMinOrderByAggregateInput
  }

  export type DbScheduledTaskScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DbScheduledTaskScalarWhereWithAggregatesInput>
    OR?: Enumerable<DbScheduledTaskScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DbScheduledTaskScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    latest?: DateTimeWithAggregatesFilter | Date | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type DbUserCreateInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutUserInput
    Categories?: DbCategoryCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceCreateNestedManyWithoutUserInput
  }

  export type DbUserUncheckedCreateInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutUserInput
    Categories?: DbCategoryUncheckedCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackUncheckedCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type DbUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUpdateManyWithoutUserNestedInput
  }

  export type DbUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUncheckedUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUncheckedUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DbUserCreateManyInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbUserPreferenceCreateInput = {
    key: string
    value: string
    User: DbUserCreateNestedOneWithoutPreferencesInput
  }

  export type DbUserPreferenceUncheckedCreateInput = {
    uid: string
    key: string
    value: string
  }

  export type DbUserPreferenceUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    User?: DbUserUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type DbUserPreferenceUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbUserPreferenceCreateManyInput = {
    uid: string
    key: string
    value: string
  }

  export type DbUserPreferenceUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbUserPreferenceUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbTransactionCreateInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    User: DbUserCreateNestedOneWithoutTransactionsInput
    Category: DbCategoryCreateNestedOneWithoutTransactionsInput
    Schedule?: DbTransactionScheduleCreateNestedOneWithoutTransactionsInput
  }

  export type DbTransactionUncheckedCreateInput = {
    id?: string
    uid: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleId?: string | null
  }

  export type DbTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: DbUserUpdateOneRequiredWithoutTransactionsNestedInput
    Category?: DbCategoryUpdateOneRequiredWithoutTransactionsNestedInput
    Schedule?: DbTransactionScheduleUpdateOneWithoutTransactionsNestedInput
  }

  export type DbTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbTransactionCreateManyInput = {
    id?: string
    uid: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleId?: string | null
  }

  export type DbTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbTransactionScheduleCreateInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
    User: DbUserCreateNestedOneWithoutTransactionScheduleInput
    Category: DbCategoryCreateNestedOneWithoutTransactionScheduleInput
    Transactions?: DbTransactionCreateNestedManyWithoutScheduleInput
  }

  export type DbTransactionScheduleUncheckedCreateInput = {
    id?: string
    uid: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type DbTransactionScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: DbUserUpdateOneRequiredWithoutTransactionScheduleNestedInput
    Category?: DbCategoryUpdateOneRequiredWithoutTransactionScheduleNestedInput
    Transactions?: DbTransactionUpdateManyWithoutScheduleNestedInput
  }

  export type DbTransactionScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Transactions?: DbTransactionUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type DbTransactionScheduleCreateManyInput = {
    id?: string
    uid: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
  }

  export type DbTransactionScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DbTransactionScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DbCategoryCreateInput = {
    id?: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutCategoryInput
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutCategoryInput
    User: DbUserCreateNestedOneWithoutCategoriesInput
  }

  export type DbCategoryUncheckedCreateInput = {
    id?: string
    uid: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutCategoryInput
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type DbCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutCategoryNestedInput
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutCategoryNestedInput
    User?: DbUserUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type DbCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutCategoryNestedInput
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DbCategoryCreateManyInput = {
    id?: string
    uid: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbFeedbackCreateInput = {
    id?: string
    message?: string | null
    User: DbUserCreateNestedOneWithoutFeedbackInput
  }

  export type DbFeedbackUncheckedCreateInput = {
    id?: string
    uid: string
    message?: string | null
  }

  export type DbFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    User?: DbUserUpdateOneRequiredWithoutFeedbackNestedInput
  }

  export type DbFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbFeedbackCreateManyInput = {
    id?: string
    uid: string
    message?: string | null
  }

  export type DbFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbConfigCreateInput = {
    key: string
    value: string
  }

  export type DbConfigUncheckedCreateInput = {
    key: string
    value: string
  }

  export type DbConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbConfigUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbConfigCreateManyInput = {
    key: string
    value: string
  }

  export type DbConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbConfigUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbPremiumPriceCreateInput = {
    id: string
    unitAmount?: number | null
    productId: string
    active: boolean
    currency: string
    nickname?: string | null
    type: string
    recurringInterval?: string | null
    recurringIntervalCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbPremiumPriceUncheckedCreateInput = {
    id: string
    unitAmount?: number | null
    productId: string
    active: boolean
    currency: string
    nickname?: string | null
    type: string
    recurringInterval?: string | null
    recurringIntervalCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbPremiumPriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitAmount?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    currency?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    recurringInterval?: NullableStringFieldUpdateOperationsInput | string | null
    recurringIntervalCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbPremiumPriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitAmount?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    currency?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    recurringInterval?: NullableStringFieldUpdateOperationsInput | string | null
    recurringIntervalCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbPremiumPriceCreateManyInput = {
    id: string
    unitAmount?: number | null
    productId: string
    active: boolean
    currency: string
    nickname?: string | null
    type: string
    recurringInterval?: string | null
    recurringIntervalCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbPremiumPriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitAmount?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    currency?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    recurringInterval?: NullableStringFieldUpdateOperationsInput | string | null
    recurringIntervalCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbPremiumPriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitAmount?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    currency?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    recurringInterval?: NullableStringFieldUpdateOperationsInput | string | null
    recurringIntervalCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbScheduledTaskCreateInput = {
    id: string
    latest: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbScheduledTaskUncheckedCreateInput = {
    id: string
    latest: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbScheduledTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latest?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbScheduledTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latest?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbScheduledTaskCreateManyInput = {
    id: string
    latest: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbScheduledTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latest?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbScheduledTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    latest?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DbTransactionListRelationFilter = {
    every?: DbTransactionWhereInput
    some?: DbTransactionWhereInput
    none?: DbTransactionWhereInput
  }

  export type DbCategoryListRelationFilter = {
    every?: DbCategoryWhereInput
    some?: DbCategoryWhereInput
    none?: DbCategoryWhereInput
  }

  export type DbFeedbackListRelationFilter = {
    every?: DbFeedbackWhereInput
    some?: DbFeedbackWhereInput
    none?: DbFeedbackWhereInput
  }

  export type DbTransactionScheduleListRelationFilter = {
    every?: DbTransactionScheduleWhereInput
    some?: DbTransactionScheduleWhereInput
    none?: DbTransactionScheduleWhereInput
  }

  export type DbUserPreferenceListRelationFilter = {
    every?: DbUserPreferenceWhereInput
    some?: DbUserPreferenceWhereInput
    none?: DbUserPreferenceWhereInput
  }

  export type DbTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DbCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DbFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DbTransactionScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DbUserPreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DbUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    tokenVersion?: SortOrder
    disabled?: SortOrder
    isAdmin?: SortOrder
    googleId?: SortOrder
    stripeCustomerId?: SortOrder
    displayName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbUserAvgOrderByAggregateInput = {
    tokenVersion?: SortOrder
  }

  export type DbUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    tokenVersion?: SortOrder
    disabled?: SortOrder
    isAdmin?: SortOrder
    googleId?: SortOrder
    stripeCustomerId?: SortOrder
    displayName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    tokenVersion?: SortOrder
    disabled?: SortOrder
    isAdmin?: SortOrder
    googleId?: SortOrder
    stripeCustomerId?: SortOrder
    displayName?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbUserSumOrderByAggregateInput = {
    tokenVersion?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DbUserRelationFilter = {
    is?: DbUserWhereInput
    isNot?: DbUserWhereInput
  }

  export type DbUserPreferenceUidKeyCompoundUniqueInput = {
    uid: string
    key: string
  }

  export type DbUserPreferenceCountOrderByAggregateInput = {
    uid?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type DbUserPreferenceMaxOrderByAggregateInput = {
    uid?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type DbUserPreferenceMinOrderByAggregateInput = {
    uid?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type DbCategoryRelationFilter = {
    is?: DbCategoryWhereInput
    isNot?: DbCategoryWhereInput
  }

  export type DbTransactionScheduleRelationFilter = {
    is?: DbTransactionScheduleWhereInput | null
    isNot?: DbTransactionScheduleWhereInput | null
  }

  export type DbTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    scheduleId?: SortOrder
  }

  export type DbTransactionAvgOrderByAggregateInput = {
    integerAmount?: SortOrder
  }

  export type DbTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    scheduleId?: SortOrder
  }

  export type DbTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    scheduleId?: SortOrder
  }

  export type DbTransactionSumOrderByAggregateInput = {
    integerAmount?: SortOrder
  }

  export type EnumIntervalTypeFilter = {
    equals?: IntervalType
    in?: Enumerable<IntervalType>
    notIn?: Enumerable<IntervalType>
    not?: NestedEnumIntervalTypeFilter | IntervalType
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type DbTransactionScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    intervalType?: SortOrder
    intervalEvery?: SortOrder
    firstOccurrence?: SortOrder
    occurrences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestCreatedOccurrence?: SortOrder
  }

  export type DbTransactionScheduleAvgOrderByAggregateInput = {
    integerAmount?: SortOrder
    intervalEvery?: SortOrder
    occurrences?: SortOrder
  }

  export type DbTransactionScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    intervalType?: SortOrder
    intervalEvery?: SortOrder
    firstOccurrence?: SortOrder
    occurrences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestCreatedOccurrence?: SortOrder
  }

  export type DbTransactionScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    categoryId?: SortOrder
    comment?: SortOrder
    integerAmount?: SortOrder
    intervalType?: SortOrder
    intervalEvery?: SortOrder
    firstOccurrence?: SortOrder
    occurrences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestCreatedOccurrence?: SortOrder
  }

  export type DbTransactionScheduleSumOrderByAggregateInput = {
    integerAmount?: SortOrder
    intervalEvery?: SortOrder
    occurrences?: SortOrder
  }

  export type EnumIntervalTypeWithAggregatesFilter = {
    equals?: IntervalType
    in?: Enumerable<IntervalType>
    notIn?: Enumerable<IntervalType>
    not?: NestedEnumIntervalTypeWithAggregatesFilter | IntervalType
    _count?: NestedIntFilter
    _min?: NestedEnumIntervalTypeFilter
    _max?: NestedEnumIntervalTypeFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type DbCategoryUnique_uid_valueCompoundUniqueInput = {
    uid: string
    value: string
  }

  export type DbCategoryUnique_uid_idCompoundUniqueInput = {
    uid: string
    id: string
  }

  export type DbCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    message?: SortOrder
  }

  export type DbFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    message?: SortOrder
  }

  export type DbFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    message?: SortOrder
  }

  export type DbConfigCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type DbConfigMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type DbConfigMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type DbPremiumPriceCountOrderByAggregateInput = {
    id?: SortOrder
    unitAmount?: SortOrder
    productId?: SortOrder
    active?: SortOrder
    currency?: SortOrder
    nickname?: SortOrder
    type?: SortOrder
    recurringInterval?: SortOrder
    recurringIntervalCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbPremiumPriceAvgOrderByAggregateInput = {
    unitAmount?: SortOrder
    recurringIntervalCount?: SortOrder
  }

  export type DbPremiumPriceMaxOrderByAggregateInput = {
    id?: SortOrder
    unitAmount?: SortOrder
    productId?: SortOrder
    active?: SortOrder
    currency?: SortOrder
    nickname?: SortOrder
    type?: SortOrder
    recurringInterval?: SortOrder
    recurringIntervalCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbPremiumPriceMinOrderByAggregateInput = {
    id?: SortOrder
    unitAmount?: SortOrder
    productId?: SortOrder
    active?: SortOrder
    currency?: SortOrder
    nickname?: SortOrder
    type?: SortOrder
    recurringInterval?: SortOrder
    recurringIntervalCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbPremiumPriceSumOrderByAggregateInput = {
    unitAmount?: SortOrder
    recurringIntervalCount?: SortOrder
  }

  export type DbScheduledTaskCountOrderByAggregateInput = {
    id?: SortOrder
    latest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbScheduledTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    latest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbScheduledTaskMinOrderByAggregateInput = {
    id?: SortOrder
    latest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbTransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutUserInput>, Enumerable<DbTransactionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutUserInput>
    createMany?: DbTransactionCreateManyUserInputEnvelope
    connect?: Enumerable<DbTransactionWhereUniqueInput>
  }

  export type DbCategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbCategoryCreateWithoutUserInput>, Enumerable<DbCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbCategoryCreateOrConnectWithoutUserInput>
    createMany?: DbCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<DbCategoryWhereUniqueInput>
  }

  export type DbFeedbackCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbFeedbackCreateWithoutUserInput>, Enumerable<DbFeedbackUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbFeedbackCreateOrConnectWithoutUserInput>
    createMany?: DbFeedbackCreateManyUserInputEnvelope
    connect?: Enumerable<DbFeedbackWhereUniqueInput>
  }

  export type DbTransactionScheduleCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutUserInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutUserInput>
    createMany?: DbTransactionScheduleCreateManyUserInputEnvelope
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
  }

  export type DbUserPreferenceCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbUserPreferenceCreateWithoutUserInput>, Enumerable<DbUserPreferenceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbUserPreferenceCreateOrConnectWithoutUserInput>
    createMany?: DbUserPreferenceCreateManyUserInputEnvelope
    connect?: Enumerable<DbUserPreferenceWhereUniqueInput>
  }

  export type DbTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutUserInput>, Enumerable<DbTransactionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutUserInput>
    createMany?: DbTransactionCreateManyUserInputEnvelope
    connect?: Enumerable<DbTransactionWhereUniqueInput>
  }

  export type DbCategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbCategoryCreateWithoutUserInput>, Enumerable<DbCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbCategoryCreateOrConnectWithoutUserInput>
    createMany?: DbCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<DbCategoryWhereUniqueInput>
  }

  export type DbFeedbackUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbFeedbackCreateWithoutUserInput>, Enumerable<DbFeedbackUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbFeedbackCreateOrConnectWithoutUserInput>
    createMany?: DbFeedbackCreateManyUserInputEnvelope
    connect?: Enumerable<DbFeedbackWhereUniqueInput>
  }

  export type DbTransactionScheduleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutUserInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutUserInput>
    createMany?: DbTransactionScheduleCreateManyUserInputEnvelope
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
  }

  export type DbUserPreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<DbUserPreferenceCreateWithoutUserInput>, Enumerable<DbUserPreferenceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbUserPreferenceCreateOrConnectWithoutUserInput>
    createMany?: DbUserPreferenceCreateManyUserInputEnvelope
    connect?: Enumerable<DbUserPreferenceWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DbTransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutUserInput>, Enumerable<DbTransactionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbTransactionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbTransactionCreateManyUserInputEnvelope
    set?: Enumerable<DbTransactionWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionWhereUniqueInput>
    delete?: Enumerable<DbTransactionWhereUniqueInput>
    connect?: Enumerable<DbTransactionWhereUniqueInput>
    update?: Enumerable<DbTransactionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbTransactionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbTransactionScalarWhereInput>
  }

  export type DbCategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbCategoryCreateWithoutUserInput>, Enumerable<DbCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbCategoryCreateManyUserInputEnvelope
    set?: Enumerable<DbCategoryWhereUniqueInput>
    disconnect?: Enumerable<DbCategoryWhereUniqueInput>
    delete?: Enumerable<DbCategoryWhereUniqueInput>
    connect?: Enumerable<DbCategoryWhereUniqueInput>
    update?: Enumerable<DbCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbCategoryScalarWhereInput>
  }

  export type DbFeedbackUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbFeedbackCreateWithoutUserInput>, Enumerable<DbFeedbackUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbFeedbackCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbFeedbackUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbFeedbackCreateManyUserInputEnvelope
    set?: Enumerable<DbFeedbackWhereUniqueInput>
    disconnect?: Enumerable<DbFeedbackWhereUniqueInput>
    delete?: Enumerable<DbFeedbackWhereUniqueInput>
    connect?: Enumerable<DbFeedbackWhereUniqueInput>
    update?: Enumerable<DbFeedbackUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbFeedbackUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbFeedbackScalarWhereInput>
  }

  export type DbTransactionScheduleUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutUserInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbTransactionScheduleUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbTransactionScheduleCreateManyUserInputEnvelope
    set?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    delete?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    update?: Enumerable<DbTransactionScheduleUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbTransactionScheduleUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbTransactionScheduleScalarWhereInput>
  }

  export type DbUserPreferenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbUserPreferenceCreateWithoutUserInput>, Enumerable<DbUserPreferenceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbUserPreferenceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbUserPreferenceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbUserPreferenceCreateManyUserInputEnvelope
    set?: Enumerable<DbUserPreferenceWhereUniqueInput>
    disconnect?: Enumerable<DbUserPreferenceWhereUniqueInput>
    delete?: Enumerable<DbUserPreferenceWhereUniqueInput>
    connect?: Enumerable<DbUserPreferenceWhereUniqueInput>
    update?: Enumerable<DbUserPreferenceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbUserPreferenceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbUserPreferenceScalarWhereInput>
  }

  export type DbTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutUserInput>, Enumerable<DbTransactionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbTransactionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbTransactionCreateManyUserInputEnvelope
    set?: Enumerable<DbTransactionWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionWhereUniqueInput>
    delete?: Enumerable<DbTransactionWhereUniqueInput>
    connect?: Enumerable<DbTransactionWhereUniqueInput>
    update?: Enumerable<DbTransactionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbTransactionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbTransactionScalarWhereInput>
  }

  export type DbCategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbCategoryCreateWithoutUserInput>, Enumerable<DbCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbCategoryCreateManyUserInputEnvelope
    set?: Enumerable<DbCategoryWhereUniqueInput>
    disconnect?: Enumerable<DbCategoryWhereUniqueInput>
    delete?: Enumerable<DbCategoryWhereUniqueInput>
    connect?: Enumerable<DbCategoryWhereUniqueInput>
    update?: Enumerable<DbCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbCategoryScalarWhereInput>
  }

  export type DbFeedbackUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbFeedbackCreateWithoutUserInput>, Enumerable<DbFeedbackUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbFeedbackCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbFeedbackUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbFeedbackCreateManyUserInputEnvelope
    set?: Enumerable<DbFeedbackWhereUniqueInput>
    disconnect?: Enumerable<DbFeedbackWhereUniqueInput>
    delete?: Enumerable<DbFeedbackWhereUniqueInput>
    connect?: Enumerable<DbFeedbackWhereUniqueInput>
    update?: Enumerable<DbFeedbackUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbFeedbackUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbFeedbackScalarWhereInput>
  }

  export type DbTransactionScheduleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutUserInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbTransactionScheduleUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbTransactionScheduleCreateManyUserInputEnvelope
    set?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    delete?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    update?: Enumerable<DbTransactionScheduleUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbTransactionScheduleUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbTransactionScheduleScalarWhereInput>
  }

  export type DbUserPreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<DbUserPreferenceCreateWithoutUserInput>, Enumerable<DbUserPreferenceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<DbUserPreferenceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<DbUserPreferenceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: DbUserPreferenceCreateManyUserInputEnvelope
    set?: Enumerable<DbUserPreferenceWhereUniqueInput>
    disconnect?: Enumerable<DbUserPreferenceWhereUniqueInput>
    delete?: Enumerable<DbUserPreferenceWhereUniqueInput>
    connect?: Enumerable<DbUserPreferenceWhereUniqueInput>
    update?: Enumerable<DbUserPreferenceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<DbUserPreferenceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<DbUserPreferenceScalarWhereInput>
  }

  export type DbUserCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<DbUserCreateWithoutPreferencesInput, DbUserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutPreferencesInput
    connect?: DbUserWhereUniqueInput
  }

  export type DbUserUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<DbUserCreateWithoutPreferencesInput, DbUserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutPreferencesInput
    upsert?: DbUserUpsertWithoutPreferencesInput
    connect?: DbUserWhereUniqueInput
    update?: XOR<DbUserUpdateWithoutPreferencesInput, DbUserUncheckedUpdateWithoutPreferencesInput>
  }

  export type DbUserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<DbUserCreateWithoutTransactionsInput, DbUserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutTransactionsInput
    connect?: DbUserWhereUniqueInput
  }

  export type DbCategoryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<DbCategoryCreateWithoutTransactionsInput, DbCategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: DbCategoryCreateOrConnectWithoutTransactionsInput
    connect?: DbCategoryWhereUniqueInput
  }

  export type DbTransactionScheduleCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<DbTransactionScheduleCreateWithoutTransactionsInput, DbTransactionScheduleUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: DbTransactionScheduleCreateOrConnectWithoutTransactionsInput
    connect?: DbTransactionScheduleWhereUniqueInput
  }

  export type DbUserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<DbUserCreateWithoutTransactionsInput, DbUserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutTransactionsInput
    upsert?: DbUserUpsertWithoutTransactionsInput
    connect?: DbUserWhereUniqueInput
    update?: XOR<DbUserUpdateWithoutTransactionsInput, DbUserUncheckedUpdateWithoutTransactionsInput>
  }

  export type DbCategoryUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<DbCategoryCreateWithoutTransactionsInput, DbCategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: DbCategoryCreateOrConnectWithoutTransactionsInput
    upsert?: DbCategoryUpsertWithoutTransactionsInput
    connect?: DbCategoryWhereUniqueInput
    update?: XOR<DbCategoryUpdateWithoutTransactionsInput, DbCategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type DbTransactionScheduleUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<DbTransactionScheduleCreateWithoutTransactionsInput, DbTransactionScheduleUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: DbTransactionScheduleCreateOrConnectWithoutTransactionsInput
    upsert?: DbTransactionScheduleUpsertWithoutTransactionsInput
    disconnect?: boolean
    delete?: boolean
    connect?: DbTransactionScheduleWhereUniqueInput
    update?: XOR<DbTransactionScheduleUpdateWithoutTransactionsInput, DbTransactionScheduleUncheckedUpdateWithoutTransactionsInput>
  }

  export type DbUserCreateNestedOneWithoutTransactionScheduleInput = {
    create?: XOR<DbUserCreateWithoutTransactionScheduleInput, DbUserUncheckedCreateWithoutTransactionScheduleInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutTransactionScheduleInput
    connect?: DbUserWhereUniqueInput
  }

  export type DbCategoryCreateNestedOneWithoutTransactionScheduleInput = {
    create?: XOR<DbCategoryCreateWithoutTransactionScheduleInput, DbCategoryUncheckedCreateWithoutTransactionScheduleInput>
    connectOrCreate?: DbCategoryCreateOrConnectWithoutTransactionScheduleInput
    connect?: DbCategoryWhereUniqueInput
  }

  export type DbTransactionCreateNestedManyWithoutScheduleInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutScheduleInput>, Enumerable<DbTransactionUncheckedCreateWithoutScheduleInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutScheduleInput>
    createMany?: DbTransactionCreateManyScheduleInputEnvelope
    connect?: Enumerable<DbTransactionWhereUniqueInput>
  }

  export type DbTransactionUncheckedCreateNestedManyWithoutScheduleInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutScheduleInput>, Enumerable<DbTransactionUncheckedCreateWithoutScheduleInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutScheduleInput>
    createMany?: DbTransactionCreateManyScheduleInputEnvelope
    connect?: Enumerable<DbTransactionWhereUniqueInput>
  }

  export type EnumIntervalTypeFieldUpdateOperationsInput = {
    set?: IntervalType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DbUserUpdateOneRequiredWithoutTransactionScheduleNestedInput = {
    create?: XOR<DbUserCreateWithoutTransactionScheduleInput, DbUserUncheckedCreateWithoutTransactionScheduleInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutTransactionScheduleInput
    upsert?: DbUserUpsertWithoutTransactionScheduleInput
    connect?: DbUserWhereUniqueInput
    update?: XOR<DbUserUpdateWithoutTransactionScheduleInput, DbUserUncheckedUpdateWithoutTransactionScheduleInput>
  }

  export type DbCategoryUpdateOneRequiredWithoutTransactionScheduleNestedInput = {
    create?: XOR<DbCategoryCreateWithoutTransactionScheduleInput, DbCategoryUncheckedCreateWithoutTransactionScheduleInput>
    connectOrCreate?: DbCategoryCreateOrConnectWithoutTransactionScheduleInput
    upsert?: DbCategoryUpsertWithoutTransactionScheduleInput
    connect?: DbCategoryWhereUniqueInput
    update?: XOR<DbCategoryUpdateWithoutTransactionScheduleInput, DbCategoryUncheckedUpdateWithoutTransactionScheduleInput>
  }

  export type DbTransactionUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutScheduleInput>, Enumerable<DbTransactionUncheckedCreateWithoutScheduleInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutScheduleInput>
    upsert?: Enumerable<DbTransactionUpsertWithWhereUniqueWithoutScheduleInput>
    createMany?: DbTransactionCreateManyScheduleInputEnvelope
    set?: Enumerable<DbTransactionWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionWhereUniqueInput>
    delete?: Enumerable<DbTransactionWhereUniqueInput>
    connect?: Enumerable<DbTransactionWhereUniqueInput>
    update?: Enumerable<DbTransactionUpdateWithWhereUniqueWithoutScheduleInput>
    updateMany?: Enumerable<DbTransactionUpdateManyWithWhereWithoutScheduleInput>
    deleteMany?: Enumerable<DbTransactionScalarWhereInput>
  }

  export type DbTransactionUncheckedUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutScheduleInput>, Enumerable<DbTransactionUncheckedCreateWithoutScheduleInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutScheduleInput>
    upsert?: Enumerable<DbTransactionUpsertWithWhereUniqueWithoutScheduleInput>
    createMany?: DbTransactionCreateManyScheduleInputEnvelope
    set?: Enumerable<DbTransactionWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionWhereUniqueInput>
    delete?: Enumerable<DbTransactionWhereUniqueInput>
    connect?: Enumerable<DbTransactionWhereUniqueInput>
    update?: Enumerable<DbTransactionUpdateWithWhereUniqueWithoutScheduleInput>
    updateMany?: Enumerable<DbTransactionUpdateManyWithWhereWithoutScheduleInput>
    deleteMany?: Enumerable<DbTransactionScalarWhereInput>
  }

  export type DbTransactionCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutCategoryInput>, Enumerable<DbTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutCategoryInput>
    createMany?: DbTransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<DbTransactionWhereUniqueInput>
  }

  export type DbTransactionScheduleCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutCategoryInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutCategoryInput>
    createMany?: DbTransactionScheduleCreateManyCategoryInputEnvelope
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
  }

  export type DbUserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<DbUserCreateWithoutCategoriesInput, DbUserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutCategoriesInput
    connect?: DbUserWhereUniqueInput
  }

  export type DbTransactionUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutCategoryInput>, Enumerable<DbTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutCategoryInput>
    createMany?: DbTransactionCreateManyCategoryInputEnvelope
    connect?: Enumerable<DbTransactionWhereUniqueInput>
  }

  export type DbTransactionScheduleUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutCategoryInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutCategoryInput>
    createMany?: DbTransactionScheduleCreateManyCategoryInputEnvelope
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
  }

  export type DbTransactionUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutCategoryInput>, Enumerable<DbTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<DbTransactionUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: DbTransactionCreateManyCategoryInputEnvelope
    set?: Enumerable<DbTransactionWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionWhereUniqueInput>
    delete?: Enumerable<DbTransactionWhereUniqueInput>
    connect?: Enumerable<DbTransactionWhereUniqueInput>
    update?: Enumerable<DbTransactionUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<DbTransactionUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<DbTransactionScalarWhereInput>
  }

  export type DbTransactionScheduleUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutCategoryInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<DbTransactionScheduleUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: DbTransactionScheduleCreateManyCategoryInputEnvelope
    set?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    delete?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    update?: Enumerable<DbTransactionScheduleUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<DbTransactionScheduleUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<DbTransactionScheduleScalarWhereInput>
  }

  export type DbUserUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<DbUserCreateWithoutCategoriesInput, DbUserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutCategoriesInput
    upsert?: DbUserUpsertWithoutCategoriesInput
    connect?: DbUserWhereUniqueInput
    update?: XOR<DbUserUpdateWithoutCategoriesInput, DbUserUncheckedUpdateWithoutCategoriesInput>
  }

  export type DbTransactionUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<DbTransactionCreateWithoutCategoryInput>, Enumerable<DbTransactionUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<DbTransactionUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: DbTransactionCreateManyCategoryInputEnvelope
    set?: Enumerable<DbTransactionWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionWhereUniqueInput>
    delete?: Enumerable<DbTransactionWhereUniqueInput>
    connect?: Enumerable<DbTransactionWhereUniqueInput>
    update?: Enumerable<DbTransactionUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<DbTransactionUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<DbTransactionScalarWhereInput>
  }

  export type DbTransactionScheduleUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<DbTransactionScheduleCreateWithoutCategoryInput>, Enumerable<DbTransactionScheduleUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<DbTransactionScheduleCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<DbTransactionScheduleUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: DbTransactionScheduleCreateManyCategoryInputEnvelope
    set?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    disconnect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    delete?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    connect?: Enumerable<DbTransactionScheduleWhereUniqueInput>
    update?: Enumerable<DbTransactionScheduleUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<DbTransactionScheduleUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<DbTransactionScheduleScalarWhereInput>
  }

  export type DbUserCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<DbUserCreateWithoutFeedbackInput, DbUserUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutFeedbackInput
    connect?: DbUserWhereUniqueInput
  }

  export type DbUserUpdateOneRequiredWithoutFeedbackNestedInput = {
    create?: XOR<DbUserCreateWithoutFeedbackInput, DbUserUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: DbUserCreateOrConnectWithoutFeedbackInput
    upsert?: DbUserUpsertWithoutFeedbackInput
    connect?: DbUserWhereUniqueInput
    update?: XOR<DbUserUpdateWithoutFeedbackInput, DbUserUncheckedUpdateWithoutFeedbackInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedEnumIntervalTypeFilter = {
    equals?: IntervalType
    in?: Enumerable<IntervalType>
    notIn?: Enumerable<IntervalType>
    not?: NestedEnumIntervalTypeFilter | IntervalType
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedEnumIntervalTypeWithAggregatesFilter = {
    equals?: IntervalType
    in?: Enumerable<IntervalType>
    notIn?: Enumerable<IntervalType>
    not?: NestedEnumIntervalTypeWithAggregatesFilter | IntervalType
    _count?: NestedIntFilter
    _min?: NestedEnumIntervalTypeFilter
    _max?: NestedEnumIntervalTypeFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type DbTransactionCreateWithoutUserInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    Category: DbCategoryCreateNestedOneWithoutTransactionsInput
    Schedule?: DbTransactionScheduleCreateNestedOneWithoutTransactionsInput
  }

  export type DbTransactionUncheckedCreateWithoutUserInput = {
    id?: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleId?: string | null
  }

  export type DbTransactionCreateOrConnectWithoutUserInput = {
    where: DbTransactionWhereUniqueInput
    create: XOR<DbTransactionCreateWithoutUserInput, DbTransactionUncheckedCreateWithoutUserInput>
  }

  export type DbTransactionCreateManyUserInputEnvelope = {
    data: Enumerable<DbTransactionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type DbCategoryCreateWithoutUserInput = {
    id?: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutCategoryInput
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutCategoryInput
  }

  export type DbCategoryUncheckedCreateWithoutUserInput = {
    id?: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutCategoryInput
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type DbCategoryCreateOrConnectWithoutUserInput = {
    where: DbCategoryWhereUniqueInput
    create: XOR<DbCategoryCreateWithoutUserInput, DbCategoryUncheckedCreateWithoutUserInput>
  }

  export type DbCategoryCreateManyUserInputEnvelope = {
    data: Enumerable<DbCategoryCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type DbFeedbackCreateWithoutUserInput = {
    id?: string
    message?: string | null
  }

  export type DbFeedbackUncheckedCreateWithoutUserInput = {
    id?: string
    message?: string | null
  }

  export type DbFeedbackCreateOrConnectWithoutUserInput = {
    where: DbFeedbackWhereUniqueInput
    create: XOR<DbFeedbackCreateWithoutUserInput, DbFeedbackUncheckedCreateWithoutUserInput>
  }

  export type DbFeedbackCreateManyUserInputEnvelope = {
    data: Enumerable<DbFeedbackCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type DbTransactionScheduleCreateWithoutUserInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
    Category: DbCategoryCreateNestedOneWithoutTransactionScheduleInput
    Transactions?: DbTransactionCreateNestedManyWithoutScheduleInput
  }

  export type DbTransactionScheduleUncheckedCreateWithoutUserInput = {
    id?: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type DbTransactionScheduleCreateOrConnectWithoutUserInput = {
    where: DbTransactionScheduleWhereUniqueInput
    create: XOR<DbTransactionScheduleCreateWithoutUserInput, DbTransactionScheduleUncheckedCreateWithoutUserInput>
  }

  export type DbTransactionScheduleCreateManyUserInputEnvelope = {
    data: Enumerable<DbTransactionScheduleCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type DbUserPreferenceCreateWithoutUserInput = {
    key: string
    value: string
  }

  export type DbUserPreferenceUncheckedCreateWithoutUserInput = {
    key: string
    value: string
  }

  export type DbUserPreferenceCreateOrConnectWithoutUserInput = {
    where: DbUserPreferenceWhereUniqueInput
    create: XOR<DbUserPreferenceCreateWithoutUserInput, DbUserPreferenceUncheckedCreateWithoutUserInput>
  }

  export type DbUserPreferenceCreateManyUserInputEnvelope = {
    data: Enumerable<DbUserPreferenceCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type DbTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: DbTransactionWhereUniqueInput
    update: XOR<DbTransactionUpdateWithoutUserInput, DbTransactionUncheckedUpdateWithoutUserInput>
    create: XOR<DbTransactionCreateWithoutUserInput, DbTransactionUncheckedCreateWithoutUserInput>
  }

  export type DbTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: DbTransactionWhereUniqueInput
    data: XOR<DbTransactionUpdateWithoutUserInput, DbTransactionUncheckedUpdateWithoutUserInput>
  }

  export type DbTransactionUpdateManyWithWhereWithoutUserInput = {
    where: DbTransactionScalarWhereInput
    data: XOR<DbTransactionUpdateManyMutationInput, DbTransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type DbTransactionScalarWhereInput = {
    AND?: Enumerable<DbTransactionScalarWhereInput>
    OR?: Enumerable<DbTransactionScalarWhereInput>
    NOT?: Enumerable<DbTransactionScalarWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    categoryId?: StringFilter | string
    comment?: StringNullableFilter | string | null
    integerAmount?: IntFilter | number
    time?: DateTimeFilter | Date | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    scheduleId?: StringNullableFilter | string | null
  }

  export type DbCategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: DbCategoryWhereUniqueInput
    update: XOR<DbCategoryUpdateWithoutUserInput, DbCategoryUncheckedUpdateWithoutUserInput>
    create: XOR<DbCategoryCreateWithoutUserInput, DbCategoryUncheckedCreateWithoutUserInput>
  }

  export type DbCategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: DbCategoryWhereUniqueInput
    data: XOR<DbCategoryUpdateWithoutUserInput, DbCategoryUncheckedUpdateWithoutUserInput>
  }

  export type DbCategoryUpdateManyWithWhereWithoutUserInput = {
    where: DbCategoryScalarWhereInput
    data: XOR<DbCategoryUpdateManyMutationInput, DbCategoryUncheckedUpdateManyWithoutCategoriesInput>
  }

  export type DbCategoryScalarWhereInput = {
    AND?: Enumerable<DbCategoryScalarWhereInput>
    OR?: Enumerable<DbCategoryScalarWhereInput>
    NOT?: Enumerable<DbCategoryScalarWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    value?: StringFilter | string
    icon?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DbFeedbackUpsertWithWhereUniqueWithoutUserInput = {
    where: DbFeedbackWhereUniqueInput
    update: XOR<DbFeedbackUpdateWithoutUserInput, DbFeedbackUncheckedUpdateWithoutUserInput>
    create: XOR<DbFeedbackCreateWithoutUserInput, DbFeedbackUncheckedCreateWithoutUserInput>
  }

  export type DbFeedbackUpdateWithWhereUniqueWithoutUserInput = {
    where: DbFeedbackWhereUniqueInput
    data: XOR<DbFeedbackUpdateWithoutUserInput, DbFeedbackUncheckedUpdateWithoutUserInput>
  }

  export type DbFeedbackUpdateManyWithWhereWithoutUserInput = {
    where: DbFeedbackScalarWhereInput
    data: XOR<DbFeedbackUpdateManyMutationInput, DbFeedbackUncheckedUpdateManyWithoutFeedbackInput>
  }

  export type DbFeedbackScalarWhereInput = {
    AND?: Enumerable<DbFeedbackScalarWhereInput>
    OR?: Enumerable<DbFeedbackScalarWhereInput>
    NOT?: Enumerable<DbFeedbackScalarWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    message?: StringNullableFilter | string | null
  }

  export type DbTransactionScheduleUpsertWithWhereUniqueWithoutUserInput = {
    where: DbTransactionScheduleWhereUniqueInput
    update: XOR<DbTransactionScheduleUpdateWithoutUserInput, DbTransactionScheduleUncheckedUpdateWithoutUserInput>
    create: XOR<DbTransactionScheduleCreateWithoutUserInput, DbTransactionScheduleUncheckedCreateWithoutUserInput>
  }

  export type DbTransactionScheduleUpdateWithWhereUniqueWithoutUserInput = {
    where: DbTransactionScheduleWhereUniqueInput
    data: XOR<DbTransactionScheduleUpdateWithoutUserInput, DbTransactionScheduleUncheckedUpdateWithoutUserInput>
  }

  export type DbTransactionScheduleUpdateManyWithWhereWithoutUserInput = {
    where: DbTransactionScheduleScalarWhereInput
    data: XOR<DbTransactionScheduleUpdateManyMutationInput, DbTransactionScheduleUncheckedUpdateManyWithoutTransactionScheduleInput>
  }

  export type DbTransactionScheduleScalarWhereInput = {
    AND?: Enumerable<DbTransactionScheduleScalarWhereInput>
    OR?: Enumerable<DbTransactionScheduleScalarWhereInput>
    NOT?: Enumerable<DbTransactionScheduleScalarWhereInput>
    id?: StringFilter | string
    uid?: StringFilter | string
    categoryId?: StringFilter | string
    comment?: StringNullableFilter | string | null
    integerAmount?: IntFilter | number
    intervalType?: EnumIntervalTypeFilter | IntervalType
    intervalEvery?: IntFilter | number
    firstOccurrence?: DateTimeFilter | Date | string
    occurrences?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    latestCreatedOccurrence?: DateTimeNullableFilter | Date | string | null
  }

  export type DbUserPreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: DbUserPreferenceWhereUniqueInput
    update: XOR<DbUserPreferenceUpdateWithoutUserInput, DbUserPreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<DbUserPreferenceCreateWithoutUserInput, DbUserPreferenceUncheckedCreateWithoutUserInput>
  }

  export type DbUserPreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: DbUserPreferenceWhereUniqueInput
    data: XOR<DbUserPreferenceUpdateWithoutUserInput, DbUserPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type DbUserPreferenceUpdateManyWithWhereWithoutUserInput = {
    where: DbUserPreferenceScalarWhereInput
    data: XOR<DbUserPreferenceUpdateManyMutationInput, DbUserPreferenceUncheckedUpdateManyWithoutPreferencesInput>
  }

  export type DbUserPreferenceScalarWhereInput = {
    AND?: Enumerable<DbUserPreferenceScalarWhereInput>
    OR?: Enumerable<DbUserPreferenceScalarWhereInput>
    NOT?: Enumerable<DbUserPreferenceScalarWhereInput>
    uid?: StringFilter | string
    key?: StringFilter | string
    value?: StringFilter | string
  }

  export type DbUserCreateWithoutPreferencesInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutUserInput
    Categories?: DbCategoryCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutUserInput
  }

  export type DbUserUncheckedCreateWithoutPreferencesInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutUserInput
    Categories?: DbCategoryUncheckedCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackUncheckedCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutUserInput
  }

  export type DbUserCreateOrConnectWithoutPreferencesInput = {
    where: DbUserWhereUniqueInput
    create: XOR<DbUserCreateWithoutPreferencesInput, DbUserUncheckedCreateWithoutPreferencesInput>
  }

  export type DbUserUpsertWithoutPreferencesInput = {
    update: XOR<DbUserUpdateWithoutPreferencesInput, DbUserUncheckedUpdateWithoutPreferencesInput>
    create: XOR<DbUserCreateWithoutPreferencesInput, DbUserUncheckedCreateWithoutPreferencesInput>
  }

  export type DbUserUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutUserNestedInput
  }

  export type DbUserUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUncheckedUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUncheckedUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DbUserCreateWithoutTransactionsInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Categories?: DbCategoryCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceCreateNestedManyWithoutUserInput
  }

  export type DbUserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Categories?: DbCategoryUncheckedCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackUncheckedCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type DbUserCreateOrConnectWithoutTransactionsInput = {
    where: DbUserWhereUniqueInput
    create: XOR<DbUserCreateWithoutTransactionsInput, DbUserUncheckedCreateWithoutTransactionsInput>
  }

  export type DbCategoryCreateWithoutTransactionsInput = {
    id?: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutCategoryInput
    User: DbUserCreateNestedOneWithoutCategoriesInput
  }

  export type DbCategoryUncheckedCreateWithoutTransactionsInput = {
    id?: string
    uid: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type DbCategoryCreateOrConnectWithoutTransactionsInput = {
    where: DbCategoryWhereUniqueInput
    create: XOR<DbCategoryCreateWithoutTransactionsInput, DbCategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type DbTransactionScheduleCreateWithoutTransactionsInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
    User: DbUserCreateNestedOneWithoutTransactionScheduleInput
    Category: DbCategoryCreateNestedOneWithoutTransactionScheduleInput
  }

  export type DbTransactionScheduleUncheckedCreateWithoutTransactionsInput = {
    id?: string
    uid: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
  }

  export type DbTransactionScheduleCreateOrConnectWithoutTransactionsInput = {
    where: DbTransactionScheduleWhereUniqueInput
    create: XOR<DbTransactionScheduleCreateWithoutTransactionsInput, DbTransactionScheduleUncheckedCreateWithoutTransactionsInput>
  }

  export type DbUserUpsertWithoutTransactionsInput = {
    update: XOR<DbUserUpdateWithoutTransactionsInput, DbUserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<DbUserCreateWithoutTransactionsInput, DbUserUncheckedCreateWithoutTransactionsInput>
  }

  export type DbUserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Categories?: DbCategoryUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUpdateManyWithoutUserNestedInput
  }

  export type DbUserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Categories?: DbCategoryUncheckedUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUncheckedUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DbCategoryUpsertWithoutTransactionsInput = {
    update: XOR<DbCategoryUpdateWithoutTransactionsInput, DbCategoryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<DbCategoryCreateWithoutTransactionsInput, DbCategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type DbCategoryUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutCategoryNestedInput
    User?: DbUserUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type DbCategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DbTransactionScheduleUpsertWithoutTransactionsInput = {
    update: XOR<DbTransactionScheduleUpdateWithoutTransactionsInput, DbTransactionScheduleUncheckedUpdateWithoutTransactionsInput>
    create: XOR<DbTransactionScheduleCreateWithoutTransactionsInput, DbTransactionScheduleUncheckedCreateWithoutTransactionsInput>
  }

  export type DbTransactionScheduleUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: DbUserUpdateOneRequiredWithoutTransactionScheduleNestedInput
    Category?: DbCategoryUpdateOneRequiredWithoutTransactionScheduleNestedInput
  }

  export type DbTransactionScheduleUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DbUserCreateWithoutTransactionScheduleInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutUserInput
    Categories?: DbCategoryCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceCreateNestedManyWithoutUserInput
  }

  export type DbUserUncheckedCreateWithoutTransactionScheduleInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutUserInput
    Categories?: DbCategoryUncheckedCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackUncheckedCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type DbUserCreateOrConnectWithoutTransactionScheduleInput = {
    where: DbUserWhereUniqueInput
    create: XOR<DbUserCreateWithoutTransactionScheduleInput, DbUserUncheckedCreateWithoutTransactionScheduleInput>
  }

  export type DbCategoryCreateWithoutTransactionScheduleInput = {
    id?: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutCategoryInput
    User: DbUserCreateNestedOneWithoutCategoriesInput
  }

  export type DbCategoryUncheckedCreateWithoutTransactionScheduleInput = {
    id?: string
    uid: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type DbCategoryCreateOrConnectWithoutTransactionScheduleInput = {
    where: DbCategoryWhereUniqueInput
    create: XOR<DbCategoryCreateWithoutTransactionScheduleInput, DbCategoryUncheckedCreateWithoutTransactionScheduleInput>
  }

  export type DbTransactionCreateWithoutScheduleInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    User: DbUserCreateNestedOneWithoutTransactionsInput
    Category: DbCategoryCreateNestedOneWithoutTransactionsInput
  }

  export type DbTransactionUncheckedCreateWithoutScheduleInput = {
    id?: string
    uid: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbTransactionCreateOrConnectWithoutScheduleInput = {
    where: DbTransactionWhereUniqueInput
    create: XOR<DbTransactionCreateWithoutScheduleInput, DbTransactionUncheckedCreateWithoutScheduleInput>
  }

  export type DbTransactionCreateManyScheduleInputEnvelope = {
    data: Enumerable<DbTransactionCreateManyScheduleInput>
    skipDuplicates?: boolean
  }

  export type DbUserUpsertWithoutTransactionScheduleInput = {
    update: XOR<DbUserUpdateWithoutTransactionScheduleInput, DbUserUncheckedUpdateWithoutTransactionScheduleInput>
    create: XOR<DbUserCreateWithoutTransactionScheduleInput, DbUserUncheckedCreateWithoutTransactionScheduleInput>
  }

  export type DbUserUpdateWithoutTransactionScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUpdateManyWithoutUserNestedInput
  }

  export type DbUserUncheckedUpdateWithoutTransactionScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUncheckedUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUncheckedUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DbCategoryUpsertWithoutTransactionScheduleInput = {
    update: XOR<DbCategoryUpdateWithoutTransactionScheduleInput, DbCategoryUncheckedUpdateWithoutTransactionScheduleInput>
    create: XOR<DbCategoryCreateWithoutTransactionScheduleInput, DbCategoryUncheckedCreateWithoutTransactionScheduleInput>
  }

  export type DbCategoryUpdateWithoutTransactionScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutCategoryNestedInput
    User?: DbUserUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type DbCategoryUncheckedUpdateWithoutTransactionScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DbTransactionUpsertWithWhereUniqueWithoutScheduleInput = {
    where: DbTransactionWhereUniqueInput
    update: XOR<DbTransactionUpdateWithoutScheduleInput, DbTransactionUncheckedUpdateWithoutScheduleInput>
    create: XOR<DbTransactionCreateWithoutScheduleInput, DbTransactionUncheckedCreateWithoutScheduleInput>
  }

  export type DbTransactionUpdateWithWhereUniqueWithoutScheduleInput = {
    where: DbTransactionWhereUniqueInput
    data: XOR<DbTransactionUpdateWithoutScheduleInput, DbTransactionUncheckedUpdateWithoutScheduleInput>
  }

  export type DbTransactionUpdateManyWithWhereWithoutScheduleInput = {
    where: DbTransactionScalarWhereInput
    data: XOR<DbTransactionUpdateManyMutationInput, DbTransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type DbTransactionCreateWithoutCategoryInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    User: DbUserCreateNestedOneWithoutTransactionsInput
    Schedule?: DbTransactionScheduleCreateNestedOneWithoutTransactionsInput
  }

  export type DbTransactionUncheckedCreateWithoutCategoryInput = {
    id?: string
    uid: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleId?: string | null
  }

  export type DbTransactionCreateOrConnectWithoutCategoryInput = {
    where: DbTransactionWhereUniqueInput
    create: XOR<DbTransactionCreateWithoutCategoryInput, DbTransactionUncheckedCreateWithoutCategoryInput>
  }

  export type DbTransactionCreateManyCategoryInputEnvelope = {
    data: Enumerable<DbTransactionCreateManyCategoryInput>
    skipDuplicates?: boolean
  }

  export type DbTransactionScheduleCreateWithoutCategoryInput = {
    id?: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
    User: DbUserCreateNestedOneWithoutTransactionScheduleInput
    Transactions?: DbTransactionCreateNestedManyWithoutScheduleInput
  }

  export type DbTransactionScheduleUncheckedCreateWithoutCategoryInput = {
    id?: string
    uid: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type DbTransactionScheduleCreateOrConnectWithoutCategoryInput = {
    where: DbTransactionScheduleWhereUniqueInput
    create: XOR<DbTransactionScheduleCreateWithoutCategoryInput, DbTransactionScheduleUncheckedCreateWithoutCategoryInput>
  }

  export type DbTransactionScheduleCreateManyCategoryInputEnvelope = {
    data: Enumerable<DbTransactionScheduleCreateManyCategoryInput>
    skipDuplicates?: boolean
  }

  export type DbUserCreateWithoutCategoriesInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceCreateNestedManyWithoutUserInput
  }

  export type DbUserUncheckedCreateWithoutCategoriesInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutUserInput
    Feedback?: DbFeedbackUncheckedCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type DbUserCreateOrConnectWithoutCategoriesInput = {
    where: DbUserWhereUniqueInput
    create: XOR<DbUserCreateWithoutCategoriesInput, DbUserUncheckedCreateWithoutCategoriesInput>
  }

  export type DbTransactionUpsertWithWhereUniqueWithoutCategoryInput = {
    where: DbTransactionWhereUniqueInput
    update: XOR<DbTransactionUpdateWithoutCategoryInput, DbTransactionUncheckedUpdateWithoutCategoryInput>
    create: XOR<DbTransactionCreateWithoutCategoryInput, DbTransactionUncheckedCreateWithoutCategoryInput>
  }

  export type DbTransactionUpdateWithWhereUniqueWithoutCategoryInput = {
    where: DbTransactionWhereUniqueInput
    data: XOR<DbTransactionUpdateWithoutCategoryInput, DbTransactionUncheckedUpdateWithoutCategoryInput>
  }

  export type DbTransactionUpdateManyWithWhereWithoutCategoryInput = {
    where: DbTransactionScalarWhereInput
    data: XOR<DbTransactionUpdateManyMutationInput, DbTransactionUncheckedUpdateManyWithoutTransactionsInput>
  }

  export type DbTransactionScheduleUpsertWithWhereUniqueWithoutCategoryInput = {
    where: DbTransactionScheduleWhereUniqueInput
    update: XOR<DbTransactionScheduleUpdateWithoutCategoryInput, DbTransactionScheduleUncheckedUpdateWithoutCategoryInput>
    create: XOR<DbTransactionScheduleCreateWithoutCategoryInput, DbTransactionScheduleUncheckedCreateWithoutCategoryInput>
  }

  export type DbTransactionScheduleUpdateWithWhereUniqueWithoutCategoryInput = {
    where: DbTransactionScheduleWhereUniqueInput
    data: XOR<DbTransactionScheduleUpdateWithoutCategoryInput, DbTransactionScheduleUncheckedUpdateWithoutCategoryInput>
  }

  export type DbTransactionScheduleUpdateManyWithWhereWithoutCategoryInput = {
    where: DbTransactionScheduleScalarWhereInput
    data: XOR<DbTransactionScheduleUpdateManyMutationInput, DbTransactionScheduleUncheckedUpdateManyWithoutTransactionScheduleInput>
  }

  export type DbUserUpsertWithoutCategoriesInput = {
    update: XOR<DbUserUpdateWithoutCategoriesInput, DbUserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<DbUserCreateWithoutCategoriesInput, DbUserUncheckedCreateWithoutCategoriesInput>
  }

  export type DbUserUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUpdateManyWithoutUserNestedInput
  }

  export type DbUserUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutUserNestedInput
    Feedback?: DbFeedbackUncheckedUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DbUserCreateWithoutFeedbackInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionCreateNestedManyWithoutUserInput
    Categories?: DbCategoryCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceCreateNestedManyWithoutUserInput
  }

  export type DbUserUncheckedCreateWithoutFeedbackInput = {
    id?: string
    email?: string | null
    emailVerified?: boolean
    password?: string | null
    tokenVersion?: number
    disabled?: boolean
    isAdmin?: boolean
    googleId?: string | null
    stripeCustomerId?: string | null
    displayName?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Transactions?: DbTransactionUncheckedCreateNestedManyWithoutUserInput
    Categories?: DbCategoryUncheckedCreateNestedManyWithoutUserInput
    TransactionSchedule?: DbTransactionScheduleUncheckedCreateNestedManyWithoutUserInput
    Preferences?: DbUserPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type DbUserCreateOrConnectWithoutFeedbackInput = {
    where: DbUserWhereUniqueInput
    create: XOR<DbUserCreateWithoutFeedbackInput, DbUserUncheckedCreateWithoutFeedbackInput>
  }

  export type DbUserUpsertWithoutFeedbackInput = {
    update: XOR<DbUserUpdateWithoutFeedbackInput, DbUserUncheckedUpdateWithoutFeedbackInput>
    create: XOR<DbUserCreateWithoutFeedbackInput, DbUserUncheckedCreateWithoutFeedbackInput>
  }

  export type DbUserUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUpdateManyWithoutUserNestedInput
  }

  export type DbUserUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    tokenVersion?: IntFieldUpdateOperationsInput | number
    disabled?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutUserNestedInput
    Categories?: DbCategoryUncheckedUpdateManyWithoutUserNestedInput
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutUserNestedInput
    Preferences?: DbUserPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DbTransactionCreateManyUserInput = {
    id?: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleId?: string | null
  }

  export type DbCategoryCreateManyUserInput = {
    id?: string
    value: string
    icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbFeedbackCreateManyUserInput = {
    id?: string
    message?: string | null
  }

  export type DbTransactionScheduleCreateManyUserInput = {
    id?: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
  }

  export type DbUserPreferenceCreateManyUserInput = {
    key: string
    value: string
  }

  export type DbTransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Category?: DbCategoryUpdateOneRequiredWithoutTransactionsNestedInput
    Schedule?: DbTransactionScheduleUpdateOneWithoutTransactionsNestedInput
  }

  export type DbTransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbTransactionUncheckedUpdateManyWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbCategoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUpdateManyWithoutCategoryNestedInput
    TransactionSchedule?: DbTransactionScheduleUpdateManyWithoutCategoryNestedInput
  }

  export type DbCategoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Transactions?: DbTransactionUncheckedUpdateManyWithoutCategoryNestedInput
    TransactionSchedule?: DbTransactionScheduleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DbCategoryUncheckedUpdateManyWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbFeedbackUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbFeedbackUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbFeedbackUncheckedUpdateManyWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbTransactionScheduleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Category?: DbCategoryUpdateOneRequiredWithoutTransactionScheduleNestedInput
    Transactions?: DbTransactionUpdateManyWithoutScheduleNestedInput
  }

  export type DbTransactionScheduleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Transactions?: DbTransactionUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type DbTransactionScheduleUncheckedUpdateManyWithoutTransactionScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DbUserPreferenceUpdateWithoutUserInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbUserPreferenceUncheckedUpdateWithoutUserInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbUserPreferenceUncheckedUpdateManyWithoutPreferencesInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DbTransactionCreateManyScheduleInput = {
    id?: string
    uid: string
    categoryId: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DbTransactionUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: DbUserUpdateOneRequiredWithoutTransactionsNestedInput
    Category?: DbCategoryUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type DbTransactionUncheckedUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbTransactionCreateManyCategoryInput = {
    id?: string
    uid: string
    comment?: string | null
    integerAmount: number
    time: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleId?: string | null
  }

  export type DbTransactionScheduleCreateManyCategoryInput = {
    id?: string
    uid: string
    comment?: string | null
    integerAmount: number
    intervalType: IntervalType
    intervalEvery?: number
    firstOccurrence: Date | string
    occurrences?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestCreatedOccurrence?: Date | string | null
  }

  export type DbTransactionUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: DbUserUpdateOneRequiredWithoutTransactionsNestedInput
    Schedule?: DbTransactionScheduleUpdateOneWithoutTransactionsNestedInput
  }

  export type DbTransactionUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbTransactionScheduleUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: DbUserUpdateOneRequiredWithoutTransactionScheduleNestedInput
    Transactions?: DbTransactionUpdateManyWithoutScheduleNestedInput
  }

  export type DbTransactionScheduleUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    integerAmount?: IntFieldUpdateOperationsInput | number
    intervalType?: EnumIntervalTypeFieldUpdateOperationsInput | IntervalType
    intervalEvery?: IntFieldUpdateOperationsInput | number
    firstOccurrence?: DateTimeFieldUpdateOperationsInput | Date | string
    occurrences?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestCreatedOccurrence?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Transactions?: DbTransactionUncheckedUpdateManyWithoutScheduleNestedInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}