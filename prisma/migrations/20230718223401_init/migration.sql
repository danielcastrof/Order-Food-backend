-- CreateEnum
CREATE TYPE "_Role" AS ENUM ('USER', 'GUEST', 'EMPLOYEE', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "role" "_Role" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
