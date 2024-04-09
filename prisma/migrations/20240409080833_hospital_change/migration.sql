/*
  Warnings:

  - Added the required column `hospital` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_hospitalH_No_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "hospital" TEXT NOT NULL;
