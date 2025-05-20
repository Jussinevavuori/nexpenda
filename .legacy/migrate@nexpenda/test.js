const { PrismaClient: PrismaNextProdClient } = require("@internal/prisma-next-prod/prisma/client")
const c = require("chalk");

const cl = console.log;

async function main() {
	const db = new PrismaNextProdClient();

	const {Transactions} = await db.dbUser.findFirst({
		where: {
			email: "atmocrafter@gmail.com"
		},
		select: {
			Transactions: {
				select: {
					comment: true,
					integerAmount: true,
					time: true,
				},
				orderBy: {
					time: "desc"
				},
				take: 12
			}
		}
	})

	for(const t of Transactions) {
		cl(`${t.time.toLocaleDateString()} ${t.integerAmount/100}€ ${t.comment}`)
	}

	await db.$disconnect();
	return 0
}

main().then((code) => process.exit(code));