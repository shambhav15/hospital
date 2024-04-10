/*
  Warnings:

  - You are about to drop the column `hospital` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalH_No` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "hospital",
DROP COLUMN "hospitalH_No";
