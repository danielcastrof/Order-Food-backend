/*
  Warnings:

  - Added the required column `category` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ALMOCO', 'BEBIDAS', 'SOBREMESAS', 'PETISCOS', 'EXECUTIVO', 'DRINKS', 'BURGERS', 'PIZZA', 'SORVETES', 'ACAI');

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "category" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Categoria";
