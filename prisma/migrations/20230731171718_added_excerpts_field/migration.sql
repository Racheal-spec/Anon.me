/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(165)`.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "excerpts" VARCHAR(200) NOT NULL DEFAULT '',
ALTER COLUMN "title" SET DATA TYPE VARCHAR(165);
