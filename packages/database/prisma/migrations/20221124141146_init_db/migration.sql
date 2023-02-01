-- CreateEnum
CREATE TYPE "DormType" AS ENUM ('BUFFET', 'PREMIUM_BUFFET', 'MONTHLY');

-- CreateEnum
CREATE TYPE "DormTypePrefer" AS ENUM ('BUFFET', 'PREMIUM_BUFFET', 'MONTHLY', 'IGNORE');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "ThreeChoice" AS ENUM ('YES', 'NO', 'IGNORE');

-- CreateEnum
CREATE TYPE "Activity" AS ENUM ('CAFE', 'PLAY', 'REST', 'DRINK');

-- CreateEnum
CREATE TYPE "Zone" AS ENUM ('DESERT', 'JUNGLE');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "personal_id" INTEGER NOT NULL,
    "sex" "Sex" NOT NULL,
    "profile_id" TEXT,
    "mate_pref_id" TEXT,
    "dorm_preference_id" TEXT,
    "roomId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "loud_player" "ThreeChoice" NOT NULL,
    "bed_time_lo" TIMESTAMP(3) NOT NULL,
    "bed_time_hi" TIMESTAMP(3) NOT NULL,
    "keep_clean" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DormPreference" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "has_canteen" "ThreeChoice" NOT NULL,
    "has_minimart" "ThreeChoice" NOT NULL,
    "has_laundry" "ThreeChoice" NOT NULL,
    "close_to_transit" "ThreeChoice" NOT NULL,
    "dorm_type" "DormTypePrefer" NOT NULL,
    "room_pref_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DormPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomPreference" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "zone" "Zone" NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "residents_limit" INTEGER NOT NULL,
    "close_to_computer_room" "ThreeChoice" NOT NULL,
    "close_to_shower_room" "ThreeChoice" NOT NULL,
    "close_to_stair" "ThreeChoice" NOT NULL,

    CONSTRAINT "RoomPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dorm" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "dorm_type" "DormType" NOT NULL,

    CONSTRAINT "Dorm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "dormId" TEXT NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "has_computer_room" "YesNo" NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "floorId" TEXT,
    "room_number" INTEGER NOT NULL,
    "resident_limit" INTEGER NOT NULL,
    "zone" "Zone" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_personal_id_key" ON "User"("personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_id_key" ON "User"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_mate_pref_id_key" ON "User"("mate_pref_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_dorm_preference_id_key" ON "User"("dorm_preference_id");

-- CreateIndex
CREATE UNIQUE INDEX "DormPreference_room_pref_id_key" ON "DormPreference"("room_pref_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mate_pref_id_fkey" FOREIGN KEY ("mate_pref_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_dorm_preference_id_fkey" FOREIGN KEY ("dorm_preference_id") REFERENCES "DormPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DormPreference" ADD CONSTRAINT "DormPreference_room_pref_id_fkey" FOREIGN KEY ("room_pref_id") REFERENCES "RoomPreference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_dormId_fkey" FOREIGN KEY ("dormId") REFERENCES "Dorm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
