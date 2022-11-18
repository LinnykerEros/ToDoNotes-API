/*
  Warnings:

  - You are about to drop the column `date` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "date",
DROP COLUMN "link";
