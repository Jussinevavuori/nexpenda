import { PrismaClient } from "@prisma/client";

(async function main() {
	const prisma = new PrismaClient();

	console.log(
		"Deleted",
		(await prisma.transaction.deleteMany({})).count,
		"transaction"
	);
	console.log(
		"Deleted",
		(await prisma.transactionSchedule.deleteMany({})).count,
		"transactionSchedule"
	);
	console.log(
		"Deleted",
		(await prisma.preference.deleteMany({})).count,
		"preference"
	);
	console.log(
		"Deleted",
		(await prisma.budgetEntry.deleteMany({})).count,
		"budgetEntry"
	);
	console.log("Deleted", (await prisma.budget.deleteMany({})).count, "budget");
	console.log(
		"Deleted",
		(await prisma.category.deleteMany({})).count,
		"category"
	);
	console.log(
		"Deleted",
		(await prisma.feedback.deleteMany({})).count,
		"feedback"
	);
	console.log(
		"Deleted",
		(await prisma.verificationToken.deleteMany({})).count,
		"verificationToken"
	);
	console.log(
		"Deleted",
		(await prisma.account.deleteMany({})).count,
		"account"
	);
	console.log("Deleted", (await prisma.user.deleteMany({})).count, "user");
	console.log(
		"Deleted",
		(await prisma.session.deleteMany({})).count,
		"session"
	);

	return 0;
})().then((code) => process.exit(code));
