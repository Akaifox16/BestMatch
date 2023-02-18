/*
  Warnings:

  - Added the required column `do_not_disturb_weight` to the `CalculatedPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loudness_weight` to the `CalculatedPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messiness_weight` to the `CalculatedPreference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CalculatedPreference" ADD COLUMN     "do_not_disturb_weight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "loudness_weight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "messiness_weight" DOUBLE PRECISION NOT NULL;
