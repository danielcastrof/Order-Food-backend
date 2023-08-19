/*
  Warnings:

  - You are about to alter the column `description` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(800)`.
  - Added the required column `obs` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "description" SET DATA TYPE VARCHAR(800);

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "obs" VARCHAR(800) NOT NULL;
