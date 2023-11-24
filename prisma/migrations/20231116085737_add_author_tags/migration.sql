-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "authorId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
