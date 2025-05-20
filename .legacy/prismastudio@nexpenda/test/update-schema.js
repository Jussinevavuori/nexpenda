const path = require("path")
const fs = require("fs-extra")
const chalk = require("chalk")

console.log()

try {
	const source = path.join(__dirname, "../../server@nexpenda/prisma/schema.prisma")
	const target = path.join(__dirname, "./prisma/schema.prisma")
	fs.copyFileSync(source, target)
	console.log(chalk.green(`Succesfully copied schema.prisma`))
} catch (e) {
	console.log(chalk.red(`An error occured while copying schema.prisma`), e)
}

try {
	const source = path.join(__dirname, "../../server@nexpenda/prisma/.test_env")
	const target = path.join(__dirname, "./prisma/.env")
	fs.copyFileSync(source, target)
	console.log(chalk.green(`Succesfully copied .env`))
} catch (e) {
	console.log(chalk.red(`An error occured while copying .env`), e)
}

console.log()