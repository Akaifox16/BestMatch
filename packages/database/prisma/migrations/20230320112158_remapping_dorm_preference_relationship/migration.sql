/*
  Warnings:

  - You are about to drop the column `room_pref_id` on the `DormPreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dorm_pref_id]` on the table `RoomPreference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dorm_pref_id` to the `RoomPreference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DormPreference" DROP CONSTRAINT "DormPreference_room_pref_id_fkey";

-- DropIndex
DROP INDEX "DormPreference_room_pref_id_key";

-- AlterTable
ALTER TABLE "DormPreference" DROP COLUMN "room_pref_id";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "owner_id" DROP NOT NULL,
ALTER COLUMN "pref_owner_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RoomPreference" ADD COLUMN     "dorm_pref_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomPreference_dorm_pref_id_key" ON "RoomPreference"("dorm_pref_id");

-- AddForeignKey
ALTER TABLE "RoomPreference" ADD CONSTRAINT "RoomPreference_dorm_pref_id_fkey" FOREIGN KEY ("dorm_pref_id") REFERENCES "DormPreference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
