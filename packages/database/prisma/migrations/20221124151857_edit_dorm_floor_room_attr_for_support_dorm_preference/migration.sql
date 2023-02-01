/*
  Warnings:

  - Added the required column `close_to_transit` to the `Dorm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_canteen` to the `Dorm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_laundry` to the `Dorm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_minimart` to the `Dorm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `close_to_shower_room` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `close_to_stair` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dorm" ADD COLUMN     "close_to_transit" "YesNo" NOT NULL,
ADD COLUMN     "has_canteen" "YesNo" NOT NULL,
ADD COLUMN     "has_laundry" "YesNo" NOT NULL,
ADD COLUMN     "has_minimart" "YesNo" NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "close_to_shower_room" "YesNo" NOT NULL,
ADD COLUMN     "close_to_stair" "YesNo" NOT NULL;
