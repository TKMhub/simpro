/*
  Warnings:

  - You are about to drop the `Contents` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('TOOL', 'TEMPLATE');

-- DropForeignKey
ALTER TABLE "Contents" DROP CONSTRAINT "Contents_authorId_fkey";

-- DropTable
DROP TABLE "Contents";

-- DropEnum
DROP TYPE "ContentsType";

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "deliveryType" "DeliveryType" NOT NULL,
    "url" TEXT,
    "filePath" TEXT,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "starRating" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
