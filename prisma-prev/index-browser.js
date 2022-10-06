
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.2.1
 * Query Engine version: 2920a97877e12e055c1333079b8d19cee7f33826
 */
Prisma.prismaVersion = {
  client: "4.2.1",
  engine: "2920a97877e12e055c1333079b8d19cee7f33826"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.DbCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  uid: 'uid',
  value: 'value',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.DbConfigScalarFieldEnum = makeEnum({
  key: 'key',
  value: 'value'
});

exports.Prisma.DbFeedbackScalarFieldEnum = makeEnum({
  id: 'id',
  uid: 'uid',
  message: 'message'
});

exports.Prisma.DbPremiumPriceScalarFieldEnum = makeEnum({
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
});

exports.Prisma.DbScheduledTaskScalarFieldEnum = makeEnum({
  id: 'id',
  latest: 'latest',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.DbTransactionScalarFieldEnum = makeEnum({
  id: 'id',
  uid: 'uid',
  categoryId: 'categoryId',
  comment: 'comment',
  integerAmount: 'integerAmount',
  time: 'time',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  scheduleId: 'scheduleId'
});

exports.Prisma.DbTransactionScheduleScalarFieldEnum = makeEnum({
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
});

exports.Prisma.DbUserPreferenceScalarFieldEnum = makeEnum({
  uid: 'uid',
  key: 'key',
  value: 'value'
});

exports.Prisma.DbUserScalarFieldEnum = makeEnum({
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
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});
exports.IntervalType = makeEnum({
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
});

exports.Prisma.ModelName = makeEnum({
  DbUser: 'DbUser',
  DbUserPreference: 'DbUserPreference',
  DbTransaction: 'DbTransaction',
  DbTransactionSchedule: 'DbTransactionSchedule',
  DbCategory: 'DbCategory',
  DbFeedback: 'DbFeedback',
  DbConfig: 'DbConfig',
  DbPremiumPrice: 'DbPremiumPrice',
  DbScheduledTask: 'DbScheduledTask'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
