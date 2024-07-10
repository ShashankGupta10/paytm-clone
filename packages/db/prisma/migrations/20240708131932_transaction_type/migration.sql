/*
  Warnings:

  - Added the required column `transactionType` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Deposit', 'Withdraw');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "transactionType" "TransactionType" NOT NULL;
