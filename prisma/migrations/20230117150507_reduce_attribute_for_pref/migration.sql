/*
  Warnings:

  - The values [PREMIUM_BUFFET] on the enum `DormType` will be removed. If these variants are still used in the database, this will fail.
  - The values [PREMIUM_BUFFET] on the enum `DormTypePrefer` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `close_to_transit` on the `Dorm` table. All the data in the column will be lost.
  - You are about to drop the column `has_canteen` on the `Dorm` table. All the data in the column will be lost.
  - You are about to drop the column `has_laundry` on the `Dorm` table. All the data in the column will be lost.
  - You are about to drop the column `has_minimart` on the `Dorm` table. All the data in the column will be lost.
  - You are about to drop the column `close_to_transit` on the `DormPreference` table. All the data in the column will be lost.
  - You are about to drop the column `has_canteen` on the `DormPreference` table. All the data in the column will be lost.
  - You are about to drop the column `has_laundry` on the `DormPreference` table. All the data in the column will be lost.
  - You are about to drop the column `has_minimart` on the `DormPreference` table. All the data in the column will be lost.
  - You are about to drop the column `has_computer_room` on the `Floor` table. All the data in the column will be lost.
  - You are about to drop the column `bed_time_hi` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `bed_time_lo` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `keep_clean` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `loud_player` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `close_to_shower_room` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `close_to_stair` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `resident_limit` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `close_to_computer_room` on the `RoomPreference` table. All the data in the column will be lost.
  - You are about to drop the column `close_to_shower_room` on the `RoomPreference` table. All the data in the column will be lost.
  - You are about to drop the column `close_to_stair` on the `RoomPreference` table. All the data in the column will be lost.
  - You are about to drop the column `residents_limit` on the `RoomPreference` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dorm_preference_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mate_pref_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner_id]` on the table `DormPreference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pref_owner_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `DormPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residents_limit` to the `DormPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loudness` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messiness` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pref_owner_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DormType_new" AS ENUM ('BUFFET', 'RENOVATED', 'MONTHLY');
ALTER TABLE "Dorm" ALTER COLUMN "dorm_type" TYPE "DormType_new" USING ("dorm_type"::text::"DormType_new");
ALTER TYPE "DormType" RENAME TO "DormType_old";
ALTER TYPE "DormType_new" RENAME TO "DormType";
DROP TYPE "DormType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "DormTypePrefer_new" AS ENUM ('BUFFET', 'RENOVATED', 'MONTHLY', 'IGNORE');
ALTER TABLE "DormPreference" ALTER COLUMN "dorm_type" TYPE "DormTypePrefer_new" USING ("dorm_type"::text::"DormTypePrefer_new");
ALTER TYPE "DormTypePrefer" RENAME TO "DormTypePrefer_old";
ALTER TYPE "DormTypePrefer_new" RENAME TO "DormTypePrefer";
DROP TYPE "DormTypePrefer_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_dorm_preference_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_mate_pref_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_id_fkey";

-- DropIndex
DROP INDEX "User_dorm_preference_id_key";

-- DropIndex
DROP INDEX "User_mate_pref_id_key";

-- DropIndex
DROP INDEX "User_profile_id_key";

-- AlterTable
ALTER TABLE "Dorm" DROP COLUMN "close_to_transit",
DROP COLUMN "has_canteen",
DROP COLUMN "has_laundry",
DROP COLUMN "has_minimart";

-- AlterTable
ALTER TABLE "DormPreference" DROP COLUMN "close_to_transit",
DROP COLUMN "has_canteen",
DROP COLUMN "has_laundry",
DROP COLUMN "has_minimart",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "residents_limit" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "Floor" DROP COLUMN "has_computer_room";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bed_time_hi",
DROP COLUMN "bed_time_lo",
DROP COLUMN "keep_clean",
DROP COLUMN "loud_player",
ADD COLUMN     "loudness" INTEGER NOT NULL,
ADD COLUMN     "messiness" INTEGER NOT NULL,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "pref_owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "close_to_shower_room",
DROP COLUMN "close_to_stair",
DROP COLUMN "resident_limit";

-- AlterTable
ALTER TABLE "RoomPreference" DROP COLUMN "close_to_computer_room",
DROP COLUMN "close_to_shower_room",
DROP COLUMN "close_to_stair",
DROP COLUMN "residents_limit";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date_of_birth",
DROP COLUMN "dorm_preference_id",
DROP COLUMN "mate_pref_id",
DROP COLUMN "profile_id",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "personal_id" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Activity";

-- DropEnum
DROP TYPE "ThreeChoice";

-- DropEnum
DROP TYPE "YesNo";

-- CreateTable
CREATE TABLE "DoNotDisturb" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMPTZ NOT NULL,
    "stop" TIMESTAMPTZ NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "DoNotDisturb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DormPreference_owner_id_key" ON "DormPreference"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_owner_id_key" ON "Profile"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_pref_owner_id_key" ON "Profile"("pref_owner_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_pref_owner_id_fkey" FOREIGN KEY ("pref_owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoNotDisturb" ADD CONSTRAINT "DoNotDisturb_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DormPreference" ADD CONSTRAINT "DormPreference_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
