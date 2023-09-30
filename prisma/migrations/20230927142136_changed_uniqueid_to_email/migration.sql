/*
  Warnings:

  - You are about to drop the column `uniqueid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- DropIndex
DROP INDEX "User_uniqueid_key";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uniqueid",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
