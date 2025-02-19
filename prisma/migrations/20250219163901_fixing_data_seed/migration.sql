/*
  Warnings:

  - You are about to drop the column `retaurantId` on the `MenuCategory` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionMetod` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `OrderProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `restaurantId` to the `MenuCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumptionMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuCategory" DROP CONSTRAINT "MenuCategory_retaurantId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "retaurantId",
ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "consumptionMetod",
ADD COLUMN     "consumptionMethod" "ConsumptionMethod" NOT NULL;

-- AlterTable
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OrderProduct_id_seq";

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
