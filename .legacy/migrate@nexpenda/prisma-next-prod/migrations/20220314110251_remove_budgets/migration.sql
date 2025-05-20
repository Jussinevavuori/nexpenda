/*
  Warnings:

  - You are about to drop the `budget_category_inclusions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `budgets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "budget_category_inclusions" DROP CONSTRAINT "budget_category_inclusions_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "budget_category_inclusions" DROP CONSTRAINT "budget_category_inclusions_category_id_fkey";

-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_uid_fkey";

-- DropTable
DROP TABLE "budget_category_inclusions";

-- DropTable
DROP TABLE "budgets";
