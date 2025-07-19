/*
  Warnings:

  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ContentsType" AS ENUM ('TOOL', 'TEMPLATE');

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_authorId_fkey";

-- DropTable
DROP TABLE "Asset";

-- DropEnum
DROP TYPE "AssetType";

-- CreateTable
CREATE TABLE "Contents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "type" "ContentsType" NOT NULL,
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
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Contents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contents" ADD CONSTRAINT "Contents_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
