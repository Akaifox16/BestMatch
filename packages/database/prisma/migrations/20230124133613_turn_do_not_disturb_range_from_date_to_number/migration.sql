/*
  Warnings:

  - Changed the type of `start` on the `DoNotDisturb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stop` on the `DoNotDisturb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DoNotDisturb" DROP COLUMN "start",
ADD COLUMN     "start" INTEGER NOT NULL,
DROP COLUMN "stop",
ADD COLUMN     "stop" INTEGER NOT NULL;
