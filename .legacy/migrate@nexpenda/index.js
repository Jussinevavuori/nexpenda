const { PrismaClient: PrismaOldClient } = require("@internal/prisma-old/prisma/client")
const { PrismaClient: PrismaNextClient } = require("@internal/prisma-next/prisma/client")
const { PrismaClient: PrismaNextProdClient } = require("@internal/prisma-next-prod/prisma/client")
const c = require("chalk");

const cl = console.log;
const pw = process.stdout.write

const timer = () => {
	const start = Date.now();
	return () => {
		const ms = Date.now() - start;
		return `${ms.toString()}ms`
	}
}

async function clearNew(db) {

	const t = timer();

	cl(c.bold("Clearing new database..."))
	const deletedFeedbacks = await db.dbFeedback.deleteMany();
	cl(c.green(`\t✓ ${t()} Deleted ${deletedFeedbacks.count} feedbacks`))
	const deletedTxSchedules = await db.dbTransactionSchedule.deleteMany();
	cl(c.green(`\t✓ ${t()} Deleted ${deletedTxSchedules.count} transaction schedules`))
	const deletedUserPreferences = await db.dbUserPreference.deleteMany();
	cl(c.green(`\t✓ ${t()} Deleted ${deletedUserPreferences.count} user preferences`))
	const deletedTransactions = await db.dbTransaction.deleteMany();
	cl(c.green(`\t✓ ${t()} Deleted ${deletedTransactions.count} transactions`))
	const deletedCategories = await db.dbCategory.deleteMany();
	cl(c.green(`\t✓ ${t()} Deleted ${deletedCategories.count} categories`))
	const deletedUsers = await db.dbUser.deleteMany();
	cl(c.green(`\t✓ ${t()} Deleted ${deletedUsers.count} users`))
	const deletedTasks = await db.dbScheduledTask.deleteMany();
	cl(c.green(`\t✓ ${t()} Deleted ${deletedTasks.count} tasks`))
	cl(c.green(c.bold(`Succesfully cleared new database in ${t()}`)))
}

async function copyFromOldToNew(oldDb, newDb) {

	const t = timer();

	cl(c.bold("Copying database..."))

	// Copy users
	const createdUsers = [];
	const createdCategories = [];
	const createdTransactions = [];
	const createdTransactionSchedules = [];
	const createdFeedback = [];

	// Get all users and all user data from old database
	const users = await oldDb.user.findMany({
		include: {
			Profile: true,
			Categories: true,
			Feedback: true,
			Transactions: true,
			TransactionSchedule: true,
		},
	});
	cl(c.green(`\t✓ ${t().padStart(8, " ")} Fetched ${users.length} users and all user data`))

	// Create each user and all their data
	for (const user of users) {

		cl(c.white(`\t\t- ${t().padStart(8, " ")} Creating ${user.Profile ? user.Profile.displayName : user.email}`))

		// Create user
		const createdUser = await newDb.dbUser.create({
			data: {
				stripeCustomerId: user.stripeCustomerId,
				tokenVersion: user.tokenVersion,
				updatedAt: user.updatedAt,
				photoUrl: user.Profile ? user.Profile.photoUrl : undefined,
				password: user.password,
				isAdmin: user.isAdmin,
				id: user.id,
				googleId: user.googleId,
				emailVerified: user.emailVerified,
				email: user.email,
				displayName: user.Profile ? user.Profile.displayName : undefined,
				disabled: user.disabled,
				createdAt: user.createdAt,
			},
		});
		cl(c.green(`\t\t✓ ${t().padStart(8, " ")} Created ${createdUser.displayName}`))

		// Create all user's categories
		cl(c.white(`\t\t- ${t().padStart(8, " ")} Creating ${user.Categories.length} categories`))
		for (const category of user.Categories) {
			const createdCategory = await newDb.dbCategory.create({
				data: {
					User: { connect: { id: createdUser.id } },
					value: category.value,
					createdAt: category.createdAt,
					icon: category.icon,
					id: category.id,
					updatedAt: category.updatedAt,
				},
			});
			createdCategories.push(createdCategory);
		}
		cl(c.green(`\t\t✓ ${t().padStart(8, " ")} Created ${user.Categories.length} categories`))


		// Create all user's transaction schedules
		cl(c.white(`\t\t- ${t().padStart(8, " ")} Creating ${user.TransactionSchedule.length} transaction schedules`))
		for (const txs of user.TransactionSchedule) {
			const createdTxs = await newDb.dbTransactionSchedule.create({
				data: {
					User: { connect: { id: createdUser.id } },
					Category: { connect: { id: txs.categoryId } },
					updatedAt: txs.updatedAt,
					id: txs.id,
					occurrences: txs.occurrences,
					latestCreatedOccurrence: txs.latestCreatedOccurrence,
					intervalEvery: txs.intervalEvery,
					createdAt: txs.createdAt,
					comment: txs.comment,
					intervalType: txs.intervalType,
					integerAmount: txs.integerAmount,
					firstOccurrence: txs.firstOccurrence,
				},
			});
			createdTransactionSchedules.push(createdTxs);
		}
		cl(c.green(`\t\t✓ ${t().padStart(8, " ")} Created ${user.TransactionSchedule.length} transaction schedules`))

		// Create all user's transactions
		cl(c.white(`\t\t- ${t().padStart(8, " ")} Creating ${user.Transactions.length} transactions`))
		for (const tx of user.Transactions) {
			const createdTx = await newDb.dbTransaction.create({
				data: {
					User: { connect: { id: createdUser.id } },
					Schedule: tx.scheduleId
						? { connect: { id: tx.scheduleId } }
						: undefined,
					Category: { connect: { id: tx.categoryId } },
					updatedAt: tx.updatedAt,
					id: tx.id,
					createdAt: tx.createdAt,
					comment: tx.comment,
					time: tx.time,
					integerAmount: tx.integerAmount,
				},
			});
			createdTransactions.push(createdTx);
		}
		cl(c.green(`\t\t✓ ${t().padStart(8, " ")} Created ${user.Transactions.length} transactions`))

		// Create all user's feedback
		cl(c.white(`\t\t- ${t().padStart(8, " ")} Creating ${user.Feedback.length} feedback items`))
		for (const fb of user.Feedback) {
			const createdFb = await newDb.dbFeedback.create({
				data: {
					User: { connect: { id: createdUser.id } },
					id: fb.id,
					message: fb.message,
				},
			});
			createdFeedback.push(createdFb);
		}
		cl(c.green(`\t\t✓ ${t().padStart(8, " ")} Created ${user.Feedback.length} feedback items`))

		createdUsers.push(createdUser);

		cl(c.green(`\t✓ ${t().padStart(8, " ")} Created all data for ${createdUser.displayName}`))
	}

	cl(c.green(c.bold(`Succesfully copied all data in ${t()}`)))
	cl(c.green(c.bold(`\t✓ ${createdUsers.length} users`)))
	cl(c.green(c.bold(`\t✓ ${createdCategories.length} categories`)))
	cl(c.green(c.bold(`\t✓ ${createdTransactions.length} transactions`)))
	cl(c.green(c.bold(`\t✓ ${createdTransactionSchedules.length} transaction schedules`)))
	cl(c.green(c.bold(`\t✓ ${createdFeedback.length} feedback items`)))
}

async function main() {
	const envIndex = process.argv.indexOf("--env") + 1;
	const env = process.argv[envIndex];
	if (env !== "prod" && env !== "dev") {
		console.error("Could not find environment. Specify the environment as either the development or production environment by providing the '--prod env' or '--prod dev' argument")
		return 1;
	}
	const isProd = process.argv[envIndex] === "prod";

	const isClearOnly = process.argv.includes("--clear-only")

	const prismaOld = new PrismaOldClient();
	const prismaNext = new PrismaNextClient();
	const prismaNextProd = new PrismaNextProdClient();

	const oldDb = prismaOld;
	const newDb = isProd ? prismaNextProd : prismaNext;

	await clearNew(newDb);
	console.log("\n");
	if (!isClearOnly) await copyFromOldToNew(oldDb, newDb);

	await prismaOld.$disconnect();
	await prismaNext.$disconnect();
	await prismaNextProd.$disconnect();

	return 0
}

main().then((code) => process.exit(code));