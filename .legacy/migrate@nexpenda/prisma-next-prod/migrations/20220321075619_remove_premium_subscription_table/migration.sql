/*
  Warnings:

  - You are about to drop the `premium_subscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "premium_subscriptions" DROP CONSTRAINT "premium_subscriptions_uid_fkey";

-- DropTable
DROP TABLE "premium_subscriptions";
