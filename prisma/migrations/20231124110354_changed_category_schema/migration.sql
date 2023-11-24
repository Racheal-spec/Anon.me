/*
  Warnings:

  - You are about to drop the column `authorId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_authorId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "authorId";
