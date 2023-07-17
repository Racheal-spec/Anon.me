/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "uniqueid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueid_key" ON "User"("uniqueid");
