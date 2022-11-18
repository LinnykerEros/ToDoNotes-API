/*
  Warnings:

  - You are about to drop the column `permission` on the `users` table. All the data in the column will be lost.
  - Made the column `password_hash` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "permission",
ALTER COLUMN "password_hash" SET NOT NULL,
ALTER COLUMN "password_hash" DROP DEFAULT;
